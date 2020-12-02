CREATE TABLE "public"."Session"
(
 "id"         int NOT NULL,
 "token"      varchar(255) NOT NULL,
 "expiration" date NOT NULL,
 "userId"     int NOT NULL,
 CONSTRAINT "PK_session" PRIMARY KEY ( "id" ),
 CONSTRAINT "FK_33" FOREIGN KEY ( "userId" ) REFERENCES "public"."User" ( "id" )
);

CREATE INDEX "fkIdx_33" ON "public"."Session"
(
 "userId"
);


