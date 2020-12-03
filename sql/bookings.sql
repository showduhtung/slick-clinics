CREATE TABLE "public"."Booking"
(
 "id"       int NOT NULL,
 "clinicId" int NOT NULL,
 "userId"   int NOT NULL,
 "date"     date NOT NULL,
 "time"     varchar(50) NOT NULL,
 CONSTRAINT "PK_booking" PRIMARY KEY ( "id" ),
 CONSTRAINT "FK_21" FOREIGN KEY ( "clinicId" ) REFERENCES "public"."Clinic" ( "id" ),
 CONSTRAINT "FK_24" FOREIGN KEY ( "userId" ) REFERENCES "public"."User" ( "id" )
);

CREATE INDEX "fkIdx_21" ON "public"."Booking"
(
 "clinicId"
);

CREATE INDEX "fkIdx_24" ON "public"."Booking"
(
 "userId"
);

