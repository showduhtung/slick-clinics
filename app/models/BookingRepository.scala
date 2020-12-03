package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import models.Tables._
import scala.concurrent.Future

class BookingRepository(db: Database)(implicit ec: ExecutionContext) {    
    def getUserBookings(userId: Int): Future[Seq[Tables.BookingRow]] = db.run (
        Booking.filter(bookRow => bookRow.userid === userId).result
    )
    
    def getClinicBookings(clinicId: Int): Future[Seq[Tables.BookingRow]] = db.run (
        Booking.filter(bookRow => bookRow.clinicid === clinicId).result
    )
    // def createBooking(name: String, address: String): Future[Option[Tables.BookingRow]]= {
    //     val BookingExist = db.run(Booking.filter(BookingRow => BookingRow.name === name).result)
    //     val BookingsList= db.run(Booking.result)
    //     val resolvedBookings = for {
    //         f1Result <- BookingExist
    //         f2Result <- BookingsList
    //     } yield(f1Result, f2Result)

    //     resolvedBookings.flatMap { value =>
    //         if (value._1.isEmpty) {
    //             val newId = value._2.length + 1
    //             db.run(Booking += Tables.BookingRow(newId, name, address)).flatMap { addCount => 
    //                 if (addCount > 0) db.run(Booking.filter(BookingRow => BookingRow.name === name).result)
    //                     .map(_.headOption)
    //                  else Future.successful(None)   
    //             }
    //         }
    //         else Future.successful(Some(value._1.head))
    //     }
    // }
}
