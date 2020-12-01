package models

case class UserData(id: Int, firstname: String, lastname: String, password: String, salt: String, isadmin: Boolean, email: String, disabled: Boolean)

case class UserResponse(email: String, password: String)

case class CreateUserModel(firstname: String, lastname: String, password: String, email: String)

case class Session(token: String, userId: Int, expiration: java.sql.Date)