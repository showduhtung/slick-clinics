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
      val loggedInUser = model.getUser(reqBody.email, reqBody.password)

      loggedInUser.flatMap { user =>

        println("@#$@#$@#$", user.id)
        println(user.isAdmin)
        val newToken = session.generateToken(user.id, user.isAdmin)
        newToken.flatMap { token => 
          Future{
            Ok(Json.obj("accessToken"-> token, "isAdmin" -> user.isAdmin))
          }
        }
      }
    }
  
  }
}

