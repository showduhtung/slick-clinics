// @GENERATOR:play-routes-compiler
// @SOURCE:/Users/showduhtung/Projects/workProjects/scala-play-react-seed/conf/routes
// @DATE:Wed Nov 25 15:29:49 EST 2020


package router {
  object RoutesPrefix {
    private var _prefix: String = "/"
    def setPrefix(p: String): Unit = {
      _prefix = p
    }
    def prefix: String = _prefix
    val byNamePrefix: Function0[String] = { () => prefix }
  }
}
