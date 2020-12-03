package models

import models.Tables._
import play.api.libs.json._
import scala.concurrent.ExecutionContext
import scala.concurrent.Future
import scala.util.{Failure, Success}
import slick.jdbc.PostgresProfile.api._

class UserRepository(db: Database)(implicit ec: ExecutionContext) {    

    def getUser(email: String, password: String): Future[Tables.UserRow] = {
        db.run(User.filter(userRow => userRow.email === email && userRow.password === password).result.head)
    }

    def getAllUsers: Future[Seq[Tables.UserRow]]= {
        db.run(User.result)
    }

    def createUser(firstname: String,lastname: String, password: String, email: String): Future[Option[Int]] = {
         val userExist = db.run(User.filter(userRow => userRow.email === email).result)      
         val usersList = db.run(User.result)
         val resolvedUsers = for {
             f1Result <- userExist
             f2Result <- usersList
         } yield(f1Result, f2Result)

         // hack method to auto-increment
         resolvedUsers.flatMap { value =>
            if (value._1.isEmpty) {
                val newId = value._2.length + 1
                 db.run(User += Tables.UserRow(newId, firstname, lastname, password, "salt", false, email, false))
                    .flatMap { addCount => 
                        if (addCount > 0) db.run(User.filter(userRow => userRow.email === email).result)
                            .map(_.headOption.map(_.id))
                        else Future.successful(None)
                    }
            } 
            else Future.successful(None)
         }
    }

}
