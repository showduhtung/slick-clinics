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

  def appSummary = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed!"))
  }
  
  def getClinics = Action.async { implicit request =>
    val token = request.headers.get("authorization")
    if (session.checkTokenExpiration(token)) {
      val clinicList = model.getClinics()
      clinicList.map{
        clinics => Ok(JsArray(clinics.map(clinic => Json.obj("id" -> clinic.id, "name" -> clinic.name, "address" -> clinic.address))))
      } 
    }
    else Future(NotFound("no token available"))

  }
}
