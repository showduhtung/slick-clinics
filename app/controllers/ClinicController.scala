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
class ClinicController @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {

  private val model = new ClinicRepository(db)
  private val session = new SessionRepository(db)

  def withJsonBody[A](f: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
    println(request.body.asJson)
    request.body.asJson.map { body =>
        Json.fromJson[A](body) match {
            case JsSuccess(a, path) => f(a)
            case e @ JsError(_) => Future.successful(Redirect("/error"))
        }
    }.getOrElse(Future.successful(Redirect(routes.FrontendController.index)))
  }

  def appSummary = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed!"))
  }
  
  def getClinics = Action.async { implicit request =>
    val token = request.headers.get("Authorization")
    if (session.checkTokenExpiration(token)) {
      val clinicList = model.getClinics()
      clinicList.map{
        clinics => Ok(JsArray(clinics.map(clinic => Json.obj("id" -> clinic.id, "name" -> clinic.name, "address" -> clinic.address))))
      } 
    }
    else Future(Unauthorized("No session available"))
  }

  implicit val readCreateClinic = Json.reads[CreateClinicModel]

  def createClinic = Action.async { implicit request =>
    val token = request.headers.get("Authorization")
    if (session.checkTokenExpiration(token) ) {
      if (session.checkAdminPrivilege(token)) {
        withJsonBody[CreateClinicModel] { ccm =>
          model.createClinic(ccm.name, ccm.address).map { clinic =>
        
            clinic match {
              case Some(clinic) => 
                // if (clinic.name == ccm.name) Conflict(Json.toJson("message" -> "Already exists"))
                // else 
                Created(Json.obj("id"-> clinic.id, "name" -> clinic.name, "address" -> clinic.address))
               case  None => ServiceUnavailable(Json.toJson("message" -> "Something went wrong"))
            }
          }
        }
      } else Future(Unauthorized("You're not an admin!"))
    } else Future(Unauthorized("No session available"))
  }
}


  

