package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import models.Tables._
import scala.concurrent.Future
import play.api.libs.json._
import scala.util.{Failure, Success}

class UserRepository(db: Database)(implicit ec: ExecutionContext) {    
    def getUser(email: String, password: String): Future[Tables.UserRow] = {
        db.run(User.filter(userRow => userRow.email === email && userRow.password === password).result.head)
    }

    def createUser(firstname: String,lastname: String, password: String, email: String): Future[Option[Int]] = {
         val matches = db.run(User.filter(userRow => userRow.email === email).result)      
         
         val usersList = db.run(User.result)

         val aggList = for {
             f1Result <- matches
             f2Result <- usersList
         } yield(f1Result, f2Result)

         // hack method to auto-increment

         aggList.flatMap { value =>
            println(value)
            if (value._1.isEmpty) {
                val newId = value._2.length + 1
                 db.run(User += Tables.UserRow(newId, firstname, lastname, password, "salt", false, email, false))
                    .flatMap { addCount => 
                        println(addCount)
                        if (addCount > 0) db.run(User.filter(userRow => userRow.email === email).result)
                            .map(_.headOption.map(_.id))
                        else Future.successful(None)
                    }
            } 
            else Future.successful(None)
         }
    }

}
