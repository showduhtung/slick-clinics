package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import models.Tables._
import scala.concurrent.Future

class UserRepository(db: Database)(implicit ec: ExecutionContext) {    
    def getUser(email: String, password: String): Future[Tables.UserRow] = {
        db.run(User.filter(userRow => userRow.email === email && userRow.password === password).result.head)
    }

}
