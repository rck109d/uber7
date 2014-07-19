package uber
import static spark.Spark.*
import spark.*
class Server {
  static void main(args) {
    setPort(80)
    externalStaticFileLocation('src/main/web/')
    get(new Route('/about') {
      public Object handle(Request request, Response response) {
        response.type 'text/plain'
        return "uber 7"
      }
    })
  }
}
