name := """scala-play-react-seed"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala).settings(
  watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
)

resolvers += Resolver.sonatypeRepo("snapshots")

scalaVersion := "2.13.1"

libraryDependencies ++= Seq(
  guice,
  "com.h2database" % "h2" % "1.4.199",
  "com.typesafe.play" %% "play-slick" % "5.0.0",
  "com.typesafe.play" %% "play-json" % "2.8.0",
  "com.typesafe.slick" %% "slick-codegen" % "3.3.2",
  "com.typesafe.slick" %% "slick-hikaricp" % "3.3.2",
  "org.postgresql" % "postgresql" % "42.2.11",
  "org.mindrot" % "jbcrypt" % "0.4",
)

