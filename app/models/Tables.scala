// package models
// // AUTO-GENERATED Slick data model
// /** Stand-alone Slick data model for immediate use */
// object Tables extends {
//   val profile = slick.jdbc.PostgresProfile
// } with Tables

// /** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
// trait Tables {
//   val profile: slick.jdbc.JdbcProfile
//   import profile.api._
//   import slick.model.ForeignKeyAction
//   // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
//   import slick.jdbc.{GetResult => GR}

//   /** DDL for all tables. Call .create to execute. */
//   lazy val schema: profile.SchemaDescription = Booking.schema ++ Clinic.schema ++ User.schema
//   @deprecated("Use .schema instead of .ddl", "3.0")
//   def ddl = schema

//   /** Entity class storing rows of table Booking
//    *  @param id Database column id SqlType(int4), PrimaryKey
//    *  @param clinicid Database column clinicId SqlType(int4)
//    *  @param userid Database column userId SqlType(int4)
//    *  @param time Database column time SqlType(date) */
//   case class BookingRow(id: Int, clinicid: Int, userid: Int, time: java.sql.Date)
//   /** GetResult implicit for fetching BookingRow objects using plain SQL queries */
//   implicit def GetResultBookingRow(implicit e0: GR[Int], e1: GR[java.sql.Date]): GR[BookingRow] = GR{
//     prs => import prs._
//     BookingRow.tupled((<<[Int], <<[Int], <<[Int], <<[java.sql.Date]))
//   }
//   /** Table description of table Booking. Objects of this class serve as prototypes for rows in queries. */
//   class Booking(_tableTag: Tag) extends profile.api.Table[BookingRow](_tableTag, "Booking") {
//     def * = (id, clinicid, userid, time) <> (BookingRow.tupled, BookingRow.unapply)
//     /** Maps whole row to an option. Useful for outer joins. */
//     def ? = ((Rep.Some(id), Rep.Some(clinicid), Rep.Some(userid), Rep.Some(time))).shaped.<>({r=>import r._; _1.map(_=> BookingRow.tupled((_1.get, _2.get, _3.get, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

//     /** Database column id SqlType(int4), PrimaryKey */
//     val id: Rep[Int] = column[Int]("id", O.PrimaryKey)
//     /** Database column clinicId SqlType(int4) */
//     val clinicid: Rep[Int] = column[Int]("clinicId")
//     /** Database column userId SqlType(int4) */
//     val userid: Rep[Int] = column[Int]("userId")
//     /** Database column time SqlType(date) */
//     val time: Rep[java.sql.Date] = column[java.sql.Date]("time")

//     /** Foreign key referencing Clinic (database name FK_21) */
//     lazy val clinicFk = foreignKey("FK_21", clinicid, Clinic)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
//     /** Foreign key referencing User (database name FK_24) */
//     lazy val userFk = foreignKey("FK_24", userid, User)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
//   }
//   /** Collection-like TableQuery object for table Booking */
//   lazy val Booking = new TableQuery(tag => new Booking(tag))

//   /** Entity class storing rows of table Clinic
//    *  @param id Database column id SqlType(int4), PrimaryKey
//    *  @param name Database column name SqlType(bpchar), Length(50,false)
//    *  @param address Database column address SqlType(text) */
//   case class ClinicRow(name: String, address: String)
//   /** GetResult implicit for fetching ClinicRow objects using plain SQL queries */
//   implicit def GetResultClinicRow(implicit  e0: GR[String]): GR[ClinicRow] = GR{
//     prs => import prs._
//     ClinicRow.tupled(( <<[String], <<[String]))
//   }
//   /** Table description of table Clinic. Objects of this class serve as prototypes for rows in queries. */
//   class Clinic(_tableTag: Tag) extends profile.api.Table[ClinicRow](_tableTag, "Clinic") {
//     def * = ( name, address) <> (ClinicRow.tupled, ClinicRow.unapply)
//     /** Maps whole row to an option. Useful for outer joins. */
//     def ? = (( Rep.Some(name), Rep.Some(address))).shaped.<>({r=>import r._; _1.map(_=> ClinicRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

//     /** Database column id SqlType(int4), PrimaryKey */
//     // val id: Rep[Int] = column[Int]("id", O.PrimaryKey)
//     /** Database column name SqlType(bpchar), Length(50,false) */
//     val name: Rep[String] = column[String]("name", O.Length(50,varying=false))
//     /** Database column address SqlType(text) */
//     val address: Rep[String] = column[String]("address")
//   }
//   /** Collection-like TableQuery object for table Clinic */
//   lazy val Clinic = new TableQuery(tag => new Clinic(tag))

//   /** Entity class storing rows of table User
//    *  @param id Database column id SqlType(int4), PrimaryKey
//    *  @param firstname Database column firstName SqlType(bpchar), Length(50,false)
//    *  @param lastname Database column lastName SqlType(bpchar), Length(50,false)
//    *  @param password Database column password SqlType(bpchar), Length(50,false)
//    *  @param salt Database column salt SqlType(bpchar), Length(50,false)
//    *  @param isAdmin Database column isAdmin SqlType(bool)
//    *  @param email Database column email SqlType(bpchar), Length(50,false)
//    *  @param disabled Database column disabled SqlType(bool) */
//   case class UserRow(firstname: String, lastname: String, password: String, salt: String, isAdmin: Boolean, email: String, disabled: Boolean)
//   /** GetResult implicit for fetching UserRow objects using plain SQL queries */
//   implicit def GetResultUserRow(implicit e0: GR[String], e1: GR[Boolean]): GR[UserRow] = GR{
//     prs => import prs._
//     UserRow.tupled((<<[String], <<[String], <<[String], <<[String], <<[Boolean], <<[String], <<[Boolean]))
//   }
//   /** Table description of table User. Objects of this class serve as prototypes for rows in queries. */
//   class User(_tableTag: Tag) extends profile.api.Table[UserRow](_tableTag, "User") {
//     def * = (firstname, lastname, password, salt, isAdmin, email, disabled) <> (UserRow.tupled, UserRow.unapply)
//     /** Maps whole row to an option. Useful for outer joins. */
//     def ? = (( Rep.Some(firstname), Rep.Some(lastname), Rep.Some(password), Rep.Some(salt), Rep.Some(isAdmin), Rep.Some(email), Rep.Some(disabled))).shaped.<>({r=>import r._; _1.map(_=> UserRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

//     /** Database column id SqlType(int4), PrimaryKey */
//     // val id: Rep[Int] = column[Int]("id", O.PrimaryKey)
//     /** Database column firstName SqlType(bpchar), Length(50,false) */
//     val firstname: Rep[String] = column[String]("firstName", O.Length(50,varying=false))
//     /** Database column lastName SqlType(bpchar), Length(50,false) */
//     val lastname: Rep[String] = column[String]("lastName", O.Length(50,varying=false))
//     /** Database column password SqlType(bpchar), Length(50,false) */
//     val password: Rep[String] = column[String]("password", O.Length(50,varying=false))
//     /** Database column salt SqlType(bpchar), Length(50,false) */
//     val salt: Rep[String] = column[String]("salt", O.Length(50,varying=false))
//     /** Database column isAdmin SqlType(bool) */
//     val isAdmin: Rep[Boolean] = column[Boolean]("isAdmin")
//     /** Database column email SqlType(bpchar), Length(50,false) */
//     val email: Rep[String] = column[String]("email", O.Length(50,varying=false))
//     /** Database column disabled SqlType(bool) */
//     val disabled: Rep[Boolean] = column[Boolean]("disabled")
//   }
//   /** Collection-like TableQuery object for table User */
//   lazy val User = new TableQuery(tag => new User(tag))

//   /** Entity class storing rows of table Session
//    *  @param token Database column id SqlType(int4), PrimaryKey
//    *  @param userid Database column userId SqlType(int4)
//    *  @param expiration Database column time SqlType(date) */
//   case class SessionRow(token: String, userId: Int, expiration: java.sql.Date)
//   /** GetResult implicit for fetching SessionRow objects using plain SQL queries */
//   implicit def GetResultSessiongRow(implicit e0: GR[Int], e1: GR[String], e2: GR[java.sql.Date]): GR[SessionRow] = GR{
//     prs => import prs._
//     SessionRow.tupled((<<[String], <<[Int], <<[java.sql.Date]))
//   }
//   /** Table description of table Session. Objects of this class serve as prototypes for rows in queries. */
//   class Session(_tableTag: Tag) extends profile.api.Table[SessionRow](_tableTag, "Session") {
//     def * = (token, userid, expiration) <> (SessionRow.tupled, SessionRow.unapply)
//     /** Maps whole row to an option. Useful for outer joins. */
//     def ? = (( Rep.Some(token), Rep.Some(userid), Rep.Some(expiration))).shaped.<>({r=>import r._; _1.map(_=> SessionRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

//     /** Database column id SqlType(int4), PrimaryKey */
//     // val id: Rep[Int] = column[Int]("id", O.PrimaryKey)
//     /** Database column clinicId SqlType(int4) */
//     val token: Rep[String] = column[String]("token")
//     /** Database column userId SqlType(int4) */
//     val userid: Rep[Int] = column[Int]("userId")
//     /** Database column time SqlType(date) */
//     val expiration: Rep[java.sql.Date] = column[java.sql.Date]("expiration")

//     /** Foreign key referencing User (database name FK_33) */
//     lazy val userFk = foreignKey("FK_33", userid, User)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
//   }
//   /** Collection-like TableQuery object for table Session */
//   lazy val Session = new TableQuery(tag => new Session(tag))


// }




package models
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object Tables extends {
  val profile = slick.jdbc.PostgresProfile
} with Tables

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait Tables {
  val profile: slick.jdbc.JdbcProfile
  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = Booking.schema ++ Clinic.schema ++ User.schema
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table Booking
   *  @param id Database column id SqlType(int4), PrimaryKey
   *  @param clinicid Database column clinicId SqlType(int4)
   *  @param userid Database column userId SqlType(int4)
   *  @param time Database column time SqlType(date) */
  case class BookingRow(id: Int, clinicid: Int, userid: Int, time: java.sql.Date)
  /** GetResult implicit for fetching BookingRow objects using plain SQL queries */
  implicit def GetResultBookingRow(implicit e0: GR[Int], e1: GR[java.sql.Date]): GR[BookingRow] = GR{
    prs => import prs._
    BookingRow.tupled((<<[Int], <<[Int], <<[Int], <<[java.sql.Date]))
  }
  /** Table description of table Booking. Objects of this class serve as prototypes for rows in queries. */
  class Booking(_tableTag: Tag) extends profile.api.Table[BookingRow](_tableTag, "Booking") {
    def * = (id, clinicid, userid, time) <> (BookingRow.tupled, BookingRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(clinicid), Rep.Some(userid), Rep.Some(time))).shaped.<>({r=>import r._; _1.map(_=> BookingRow.tupled((_1.get, _2.get, _3.get, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(int4), PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.PrimaryKey)
    /** Database column clinicId SqlType(int4) */
    val clinicid: Rep[Int] = column[Int]("clinicId")
    /** Database column userId SqlType(int4) */
    val userid: Rep[Int] = column[Int]("userId")
    /** Database column time SqlType(date) */
    val time: Rep[java.sql.Date] = column[java.sql.Date]("time")

    /** Foreign key referencing Clinic (database name FK_21) */
    lazy val clinicFk = foreignKey("FK_21", clinicid, Clinic)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing User (database name FK_24) */
    lazy val userFk = foreignKey("FK_24", userid, User)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table Booking */
  lazy val Booking = new TableQuery(tag => new Booking(tag))

  /** Entity class storing rows of table Clinic
   *  @param id Database column id SqlType(int4), PrimaryKey
   *  @param name Database column name SqlType(bpchar), Length(50,false)
   *  @param address Database column address SqlType(text) */
  case class ClinicRow(id: Int, name: String, address: String)
  /** GetResult implicit for fetching ClinicRow objects using plain SQL queries */
  implicit def GetResultClinicRow(implicit e0: GR[Int], e1: GR[String]): GR[ClinicRow] = GR{
    prs => import prs._
    ClinicRow.tupled((<<[Int], <<[String], <<[String]))
  }
  /** Table description of table Clinic. Objects of this class serve as prototypes for rows in queries. */
  class Clinic(_tableTag: Tag) extends profile.api.Table[ClinicRow](_tableTag, "Clinic") {
    def * = (id, name, address) <> (ClinicRow.tupled, ClinicRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(name), Rep.Some(address))).shaped.<>({r=>import r._; _1.map(_=> ClinicRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(int4), PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.PrimaryKey)
    /** Database column name SqlType(bpchar), Length(50,false) */
    val name: Rep[String] = column[String]("name", O.Length(50,varying=false))
    /** Database column address SqlType(text) */
    val address: Rep[String] = column[String]("address")
  }
  /** Collection-like TableQuery object for table Clinic */
  lazy val Clinic = new TableQuery(tag => new Clinic(tag))

  /** Entity class storing rows of table User
   *  @param id Database column id SqlType(int4), PrimaryKey
   *  @param firstname Database column firstName SqlType(bpchar), Length(50,false)
   *  @param lastname Database column lastName SqlType(bpchar), Length(50,false)
   *  @param password Database column password SqlType(bpchar), Length(50,false)
   *  @param salt Database column salt SqlType(bpchar), Length(50,false)
   *  @param isAdmin Database column isAdmin SqlType(bool)
   *  @param email Database column email SqlType(bpchar), Length(50,false)
   *  @param disabled Database column disabled SqlType(bool) */
  case class UserRow(id: Int, firstname: String, lastname: String, password: String, salt: String, isAdmin: Boolean, email: String, disabled: Boolean)
  /** GetResult implicit for fetching UserRow objects using plain SQL queries */
  implicit def GetResultUserRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Boolean]): GR[UserRow] = GR{
    prs => import prs._
    UserRow.tupled((<<[Int], <<[String], <<[String], <<[String], <<[String], <<[Boolean], <<[String], <<[Boolean]))
  }
  /** Table description of table User. Objects of this class serve as prototypes for rows in queries. */
  class User(_tableTag: Tag) extends profile.api.Table[UserRow](_tableTag, "User") {
    def * = (id, firstname, lastname, password, salt, isAdmin, email, disabled) <> (UserRow.tupled, UserRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(firstname), Rep.Some(lastname), Rep.Some(password), Rep.Some(salt), Rep.Some(isAdmin), Rep.Some(email), Rep.Some(disabled))).shaped.<>({r=>import r._; _1.map(_=> UserRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get, _8.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(int4), PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.PrimaryKey)
    /** Database column firstName SqlType(bpchar), Length(50,false) */
    val firstname: Rep[String] = column[String]("firstName", O.Length(50,varying=false))
    /** Database column lastName SqlType(bpchar), Length(50,false) */
    val lastname: Rep[String] = column[String]("lastName", O.Length(50,varying=false))
    /** Database column password SqlType(bpchar), Length(50,false) */
    val password: Rep[String] = column[String]("password", O.Length(50,varying=false))
    /** Database column salt SqlType(bpchar), Length(50,false) */
    val salt: Rep[String] = column[String]("salt", O.Length(50,varying=false))
    /** Database column isAdmin SqlType(bool) */
    val isAdmin: Rep[Boolean] = column[Boolean]("isAdmin")
    /** Database column email SqlType(bpchar), Length(50,false) */
    val email: Rep[String] = column[String]("email", O.Length(50,varying=false))
    /** Database column disabled SqlType(bool) */
    val disabled: Rep[Boolean] = column[Boolean]("disabled")
  }
  /** Collection-like TableQuery object for table User */
  lazy val User = new TableQuery(tag => new User(tag))


  /** Entity class storing rows of table Session
   *  @param id Database column id SqlType(int4), PrimaryKey
   *  @param token Database column id SqlType(int4), PrimaryKey
   *  @param userid Database column userId SqlType(int4)
   *  @param expiration Database column time SqlType(date) */
  case class SessionRow(id: Int, token: String, userId: Int, expiration: java.sql.Date)
  /** GetResult implicit for fetching SessionRow objects using plain SQL queries */
  implicit def GetResultSessiongRow(implicit e0: GR[Int], e1: GR[String], e2: GR[java.sql.Date]): GR[SessionRow] = GR{
    prs => import prs._
    SessionRow.tupled((<<[Int], <<[String], <<[Int], <<[java.sql.Date]))
  }
  /** Table description of table Session. Objects of this class serve as prototypes for rows in queries. */
  class Session(_tableTag: Tag) extends profile.api.Table[SessionRow](_tableTag, "Session") {
    def * = (id, token, userid, expiration) <> (SessionRow.tupled, SessionRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(token), Rep.Some(userid), Rep.Some(expiration))).shaped.<>({r=>import r._; _1.map(_=> SessionRow.tupled((_1.get, _2.get, _3.get, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(int4), PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.PrimaryKey)
    /** Database column clinicId SqlType(int4) */
    val token: Rep[String] = column[String]("token")
    /** Database column userId SqlType(int4) */
    val userid: Rep[Int] = column[Int]("userId")
    /** Database column time SqlType(date) */
    val expiration: Rep[java.sql.Date] = column[java.sql.Date]("expiration")

    /** Foreign key referencing User (database name FK_33) */
    lazy val userFk = foreignKey("FK_33", userid, User)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table Session */
  lazy val Session = new TableQuery(tag => new Session(tag))


}