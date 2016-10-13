struct Person {
  1: required i32 id
  2: required string name
  3: required i16 age
}

exception Exception {
  1: optional string errmsg
  2: optional i32 errno
}

service hello {
  Person getPerson(1: i32 userId) throws (1: Exception e)
  list<Person> getPersons() throws (1: Exception e)
  bool addPerson(1: Person person) throws (1: Exception e)
  bool delPerson(1: i32 userId) throws (1: Exception e)
}
