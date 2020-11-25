CREATE TABLE "public"."User"
(
 "id"        int NOT NULL,
 "firstName" varchar(50) NOT NULL,
 "lastName"  varchar(50) NOT NULL,
 "password"  varchar(50) NOT NULL,
 "salt"      varchar(50) NOT NULL,
 "isAdmin"   boolean NOT NULL,
 "email"     varchar(50) NOT NULL,
 "disabled"  boolean NOT NULL,
 CONSTRAINT "PK_user" PRIMARY KEY ( "id" )
);

