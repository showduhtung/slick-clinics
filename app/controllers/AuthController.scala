package controllers
import javax.inject._
import play.api.Configuration
import play.api.http.HttpErrorHandler
import play.api.mvc._
import models._
import play.api.libs.json.Json

import play.api.db.slick.DatabaseConfigProvider
import play.api.db.slick.HasDatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import play.api.libs.json.JsArray

@Singleton
class AuthController @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents,
 ) extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile]{

  private val model = new UserRepository(db)

  def login = Action.async { implicit request: Request[AnyContent]=>
    val content = request.body
    val jsonObject = content.asJson
    val users = model.getUser("shaun.tung@gmail.com", "password")

    // create token
    // Redirect()
    users.map(user => Ok(Json.obj("id" -> user.id, "email" -> user.email, "password" -> user.password, "firstName" -> user.firstname, "lastName" -> user.lastname, "isAdmin" -> user.isadmin, "accessToken"-> "accessToken")))
    
  }


}
