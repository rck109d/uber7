package uber
import static spark.Spark.*
import spark.*
class Server {
    static void addGetRoute(route, closure) {
        get(new Route(route) {
            public Object handle(Request request, Response response) {
                return closure(request, response)
            }
        })
    }
    static void main(args) {
        externalStaticFileLocation('src/main/web/')
        addGetRoute('/about') {Request request, Response response ->
            response.type 'text/plain'
            return "uber 7"
        }
    }
}
