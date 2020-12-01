package models

object CodeGen extends App {
    slick.codegen.SourceCodeGenerator.run(
        "slick.jdbc.PostgresProfile",
        "org.postgresql.Driver",
        "jdbc:postgresql://localhost/slickclinics?user=stung&password=password",
        "/Users/showduhtung/Projects/learnScala/scala-play-react-seed/app",
        "models", None, None, true, false
    )
}