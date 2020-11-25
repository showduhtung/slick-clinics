package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import models.Tables._
import scala.concurrent.Future

class ClinicRepository(db: Database)(implicit ec: ExecutionContext) {    
    def getClinics(): Future[Seq[Tables.ClinicRow]] = db.run (
        Clinic.result
    )
}
