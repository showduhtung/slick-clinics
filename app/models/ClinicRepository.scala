package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import models.Tables._
import scala.concurrent.Future
import scala.concurrent.duration.Duration
import scala.concurrent.Await

class ClinicRepository(db: Database)(implicit ec: ExecutionContext) {    
    def getClinics(): Future[Seq[Tables.ClinicRow]] = db.run (
        Clinic.result
    )

    def getClinicById(id: Int): Tables.ClinicRow = {
        val result = db.run(Clinic.filter(clnc => clnc.id === id).result.head)
        Await.result(result, Duration(1, "seconds"))

    }

    def createClinic(name: String, address: String): Future[Option[Tables.ClinicRow]]= {
        val clinicExist = db.run(Clinic.filter(clinicRow => clinicRow.name === name).result)
        val clinicsList= db.run(Clinic.result)
        val resolvedClinics = for {
            f1Result <- clinicExist
            f2Result <- clinicsList
        } yield(f1Result, f2Result)

        resolvedClinics.flatMap { value =>
            if (value._1.isEmpty) {
                val newId = value._2.length + 1
                db.run(Clinic += Tables.ClinicRow(newId, name, address)).flatMap { addCount => 
                    if (addCount > 0) db.run(Clinic.filter(clinicRow => clinicRow.name === name).result)
                        .map(_.headOption)
                     else Future.successful(None)   
                }
            }
            else Future.successful(Some(value._1.head))
        }
    }
}
