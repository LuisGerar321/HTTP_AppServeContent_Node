const http = require("http");
const  fs = require("fs");
const  handler = require("./src/handlers");


const PORT =  3000;

const myRouter = (path)=>{
        // console.log(path.split("?"));
        const routes = {
                "/":handler.welcome,
                "/books": handler.GetPostDelete,
                "/file-viewer": handler.Viewer,
                "/server-status": handler.ServerStatus
                //Working in that!!!!!!
                // "/file-viewer": handler.
        }

        // if( routes[path.split("?")[0]] === "/file-viewer"  ){

        // }

        if( routes[path.split("?")[0]]){
                return routes[   path.split("?")[0]    ]; 
        }
        return handler.NotFound;
}


const server  =  http.createServer( ( request, response) =>{
        const route = myRouter(request.url);
        return route(request, response);
})


server.listen( PORT, ()=>{
        console.log(`Server running in http://localhost:${PORT}`);
})