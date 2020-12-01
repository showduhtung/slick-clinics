package controllers

import models._
import javax.inject._
import play.api.Configuration
import play.api.db.slick.DatabaseConfigProvider
import play.api.db.slick.HasDatabaseConfigProvider
import play.api.http.HttpErrorHandler
import play.api.libs.json._
import play.api.mvc._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import slick.jdbc.JdbcProfile

@Singleton
class AuthController @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents,
 ) extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile]{

  private val model = new UserRepository(db)
  private val session = new SessionRepository(db)

  def withJsonBody[A](f: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(a, path) => f(a)
        case e @ JsError(_) => Future.successful(Redirect("/error"))
      }
    }.getOrElse(Future.successful(Redirect(routes.FrontendController.index)))
  }

  implicit val userDataReads = Json.reads[UserResponse]

  def login = Action.async { implicit request: Request[AnyContent]=>
    withJsonBody[UserResponse] { reqBody =>
      val loggedInUser = model.getUser("shaun.tung@gmail.com", "password")
      val token = session.generateToken(1, true)
      val resolvedUsers = for {
        a <- loggedInUser
        b <- token
      } yield(a, b)

      
      resolvedUsers.flatMap { value => 
        val user = value._1
        val token = value._2
        loggedInUser.map(user => Ok(Json.obj(
          "id" -> user.id, 
          "email" -> user.email, 
          "password" -> user.password, 
          "firstName" -> user.firstname, 
          "lastName" -> user.lastname, 
          "isAdmin" -> user.isadmin, 
          "accessToken"-> token
        )))
      }

    }
  
  }
}
