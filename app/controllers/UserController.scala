package controllers

import models._
import javax.inject._
import play.api.db.slick.DatabaseConfigProvider
import play.api.db.slick.HasDatabaseConfigProvider
import play.api.libs.json._
import play.api.mvc._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import slick.jdbc.JdbcProfile


@Singleton
class UserController @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents,
 ) extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {
    private val model = new UserRepository(db)
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
    
    implicit val readCreateUser = Json.reads[CreateUserModel]

    def getAllUsers= Action.async { implicit request =>
        val token = request.headers.get("Authorization")
        if (session.checkTokenExpiration(token) ) {
            if (session.checkAdminPrivilege(token)) {
                val usersList = model.getAllUsers
                usersList.map{
                    users => Ok(JsArray(users.map(user => Json.obj("id" -> user.id,"isAdmin" -> user.isAdmin, "firstName" -> user.firstname, "lastName" -> user.lastname, "email" -> user.email))))
                } 
            } else Future(Unauthorized("You're not an admin!"))
        } else Future(Unauthorized("No session available"))
    }

    def createUser = Action.async { implicit request => 
        withJsonBody[CreateUserModel] {
            ud => model.createUser(ud.firstname, ud.lastname, ud.password, ud.email).map { id =>
                id match {
                    case Some(id) =>
                    Created(Json.toJson("message" -> "User Created"))
                    case None => NotFound(Json.toJson("message" -> "No user was found"))
                }                
            }
        }
    }

}
