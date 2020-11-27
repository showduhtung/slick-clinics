// @GENERATOR:play-routes-compiler
// @SOURCE:/Users/showduhtung/Projects/workProjects/scala-play-react-seed/conf/routes
// @DATE:Wed Nov 25 15:29:49 EST 2020

import play.api.routing.JavaScriptReverseRoute


import _root_.controllers.Assets.Asset

// @LINE:6
package controllers.javascript {

  // @LINE:9
  class ReverseHomeController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:10
    def getClinics: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HomeController.getClinics",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/getClinics"})
        }
      """
    )
  
    // @LINE:9
    def appSummary: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HomeController.appSummary",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/summary"})
        }
      """
    )
  
  }

  // @LINE:6
  class ReverseFrontendController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:13
    def assetOrDefault: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.FrontendController.assetOrDefault",
      """
        function(file0) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + (""" + implicitly[play.api.mvc.PathBindable[String]].javascriptUnbind + """)("file", file0)})
        }
      """
    )
  
    // @LINE:6
    def index: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.FrontendController.index",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + """"})
        }
      """
    )
  
  }


}
