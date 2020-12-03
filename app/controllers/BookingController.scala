package controllers

import javax.inject._

import play.api.libs.json.Json
import play.api.mvc._
import models._

import play.api.db.slick.DatabaseConfigProvider
import play.api.db.slick.HasDatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import play.api.libs.json._

@Singleton
class BookingController @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {
  def withJsonBody[A](f: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
  request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
          case JsSuccess(a, path) => f(a)
          case e @ JsError(_) => Future.successful(Redirect("/error"))
      }
  }.getOrElse(Future.successful(Redirect(routes.FrontendController.index)))
}
  private val model = new BookingRepository(db)
  private val session = new SessionRepository(db)

  implicit val readCreateBookings = Json.reads[CreateBookingsModel]
  
  def createBooking = Action.async { implicit request =>
    withJsonBody[CreateBookingsModel] {
      cu => model.createBooking(cu.time, cu.date, cu.userId, cu.clinicId).map { booking =>
        booking match {
          case Some(booking) =>
          Created(Json.obj("id" -> booking.id, "clinicId" -> booking.clinicid, "userId" -> booking.userid, "date" -> booking.date, "time" -> booking.time))
          case None => NotFound(Json.toJson("message" -> "No booking was able to be created"))
        }
      }
    }
  }

  def getBookingsByUser(userId: Int) = Action.async { implicit request =>
    val token = request.headers.get("Authorization")
    if (session.checkTokenExpiration(token)) {
      val bookingList = model.getUserBookings(userId)
      bookingList.map{
        bookings => Ok(JsArray(bookings.map(booking => Json.obj("id" -> booking.id, "clinicId" -> booking.clinicid, "time" -> booking.time))))
      } 
    }
    else Future(Unauthorized("No session available"))
  }
}