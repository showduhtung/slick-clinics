package models

import java.util.UUID
import java.sql.Date

import models.Tables._
import play.api.libs.json._
import scala.concurrent.ExecutionContext
import scala.concurrent.Future
import scala.collection.mutable
import scala.util.{Failure, Success}
import slick.jdbc.PostgresProfile.api._

import java.util.Calendar


class SessionRepository(db: Database)(implicit ec: ExecutionContext) {
  val calendar = Calendar.getInstance()
  private def checkExpirationDate(date: Date): Boolean = {
    val today = new Date(calendar.getTimeInMillis())
    date.after(today)
  }

  def getSession(token: String): Future[Tables.SessionRow] = {
    db.run(Session.filter(session => session.token === token).result.head)
  }

  def checkSession(token: String): Future[Boolean] = {
    db.run(Session.filter(session => session.token === token).result.head)
    .map(session => checkExpirationDate(session.expiration))
  }

  def generateToken(userId: Int, isAdmin: Boolean): Future[String] = {
    val token = s"$userId-token-${UUID.randomUUID()}-$isAdmin"
    val c = Calendar.getInstance()
    c.add(Calendar.DATE, 1)
    val expiration = new Date(c.getTimeInMillis())
    
    val sessionList = db.run(Session.result)
    sessionList.flatMap { sessions => 
      val newId = sessions.length + 1
      db.run(Session += Tables.SessionRow(newId, token, userId, expiration))
        .flatMap { addCount =>
          db.run(Session.filter(sesh => sesh.userid === userId).result)
            .map(_.head.token)
        }
    }
  }
}

