// @GENERATOR:play-routes-compiler
// @SOURCE:/Users/showduhtung/Projects/workProjects/scala-play-react-seed/conf/routes
// @DATE:Wed Nov 25 15:29:49 EST 2020

import play.api.mvc.Call


import _root_.controllers.Assets.Asset

// @LINE:6
package controllers {

  // @LINE:9
  class ReverseHomeController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:10
    def getClinics(): Call = {
      
      Call("GET", _prefix + { _defaultPrefix } + "api/getClinics")
    }
  
    // @LINE:9
    def appSummary(): Call = {
      
      Call("GET", _prefix + { _defaultPrefix } + "api/summary")
    }
  
  }

  // @LINE:6
  class ReverseFrontendController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:13
    def assetOrDefault(file:String): Call = {
      
      Call("GET", _prefix + { _defaultPrefix } + implicitly[play.api.mvc.PathBindable[String]].unbind("file", file))
    }
  
    // @LINE:6
    def index(): Call = {
      
      Call("GET", _prefix)
    }
  
  }


}
