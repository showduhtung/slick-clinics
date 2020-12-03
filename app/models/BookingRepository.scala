package models

import models.Tables._
import java.sql.Date
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import scala.concurrent.Future
import java.util.Calendar


class BookingRepository(db: Database)(implicit ec: ExecutionContext) {    
    val calendar = Calendar.getInstance()
    def getUserBookings(userId: Int): Future[Seq[Tables.BookingRow]] = db.run (
        Booking.filter(bookRow => bookRow.userid === userId).result
    )
    
    def getClinicBookings(clinicId: Int): Future[Seq[Tables.BookingRow]] = db.run (
        Booking.filter(bookRow => bookRow.clinicid === clinicId).result
    )
    def createBooking(time: String, date: String, userId: Int, clinicId: Int): Future[Option[Tables.BookingRow]]= {
        // long javadate = 
        // val javaDate = new Date(calendar.getTimeInMillis())
        val javaDate = Date.valueOf(date)
        
        val BookingsList= db.run (Booking.result)

        BookingsList.flatMap { bookings =>
            val newId = bookings.length + 1
            db.run(Booking += Tables.BookingRow(newId, clinicId, userId, javaDate, time))
            .flatMap {
                addCount =>
                if (addCount > 0) db.run(Booking.filter(booking => booking.date === javaDate).result)
                    .map(_.headOption)
                else Future.successful(None)
            }
        }
    }
}
