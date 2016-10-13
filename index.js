'use strict'

const thrift = require('thrift')
const hello = require('./gen-nodejs/hello')
const Response = require('./gen-nodejs/hello_types').Response
const Exception = require('./gen-nodejs/hello_types.js').Exception

let persons = []

const error = (errno, errmsg) => new Exception({ errno, errmsg })

var helloHandler = {
  getPerson(userId, result) {
    let person = persons.filter(p => p.id == userId)[0]
    result(null, person)
  },
  getPersons(result) {
    result(null, persons)
  },
  addPerson(person, result) {
    persons.push(person)
    result(null, true)
  },
  delPerson(userId, result) {
    persons = persons.filter(p => p.id != userId)
    result(null, true)
  }
}

var helloSvcOpt = {
  handler: helloHandler,
  processor: hello,
  protocol: thrift.TJSONProtocol,
  transport: thrift.TBufferedTransport
}

var serverOpt = {
  files: './public',
  services: {
    '/hello': helloSvcOpt
  }
}

thrift.createWebServer(serverOpt).listen(4000)
