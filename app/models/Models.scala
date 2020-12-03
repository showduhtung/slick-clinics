package models

case class UserData(id: Int, firstname: String, lastname: String, password: String, salt: String, isAdmin: Boolean, email: String, disabled: Boolean)

case class UserResponse(email: String, password: String)

case class CreateUserModel(firstname: String, lastname: String, password: String, email: String)

case class Session(token: String, userId: Int, expiration: java.sql.Date)

case class CreateClinicModel(name: String, address: String)

case class GetBookingModel(userId: Int)

case class CreateBookingsModel(time: String, date: String, userId: Int, clinicId: Int)