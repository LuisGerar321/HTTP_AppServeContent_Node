const {request } =  require("http");
const fs  = require("fs");
const os = require("os");


const welcome = ( request, response)=>{
        response.writeHead(200, { "Content-Type":  "text/html" } );
        const html  = fs.readFileSync(  "./src/public/index.html",  "utf-8");
        response.write(html);
        response.end();
};

const GetPostDelete = (request, response)=>{
        var item = null;
        switch(request.method){
                case "POST":
                        request.on("data", (chunck)=>{
                                item =  chunck.toString();
                                console.log(  item    );
                                //Adding a new element  into file//
                                fs.appendFile('./src/public/db.txt', `${item}\n`, function (err) {
                                        if (err) throw err;
                                        console.log('Data was saved succesfully...');
                                });

                                response.writeHead(200, { "Content-type":  "text/html" } );
                                response.end( item)
                        }); 
                        break;
                case "GET":
                        response.writeHead(200, { "Content-Type":  "text/json" } );
                        const items =  fs.readFileSync("./src/public/db.txt", "utf-8" )
                        response.write(items);
                        response.end();
                        break;
                case "DELETE":
                        response.writeHead(200, { "Content-Type":  "text/txt" } );
                        fs.writeFileSync("./src/public/db.txt","" ,"utf-8" )
                        response.write("Done");
                        response.end();
                        break;
        }
};

const Viewer =  ( request, response ) =>{

        const url = request.url;
        const atribute = url.split('?')[1].split('=')[0];
        const file = url.split('?')[1].split('=')[1];

        if(atribute === "name"){
                
                try{
                        response.writeHead(200, { "Content-Type":  "text/txt" } );
                        const items =  fs.readFileSync(`./src/public/${file}`, "utf-8" )
                        response.write(items);
                        response.end();
                }catch(e){
                        response.writeHead(404, { "Content-type":  "text/html" } );
                        response.end(  `<h1>404 - Not Found:</h1><br> <h2>The file does not exist</h2>` )
                }  


        }  
        response.writeHead(400, { "Content-type":  "text/html" } );
        response.end(  `<h1>400 Bad Request:</h1><br> <h2>The server cannot or will not process the request due to something that is perceived to be a client error</h2>` )

        
        

}

const ServerStatus = (request, response)=>{
        const status = { 
                hostname: os.hostname(),
                cpusAvailable: os.cpus().length,
                architecture: os.arch(),
                uptime: os.uptime(),
                userinfo: os.userInfo(),
                memoryAvailable: `${os.freemem()/1024} kB`,
        }

        response.writeHead(200, { 'Content-Type': 'text/json' });
        response.write(JSON.stringify(status));
        response.end();
}

const NotFound = (request, response)=>{
        response.writeHead(404,  { "Content-Type": "text/html"} );
        const html = fs.readFileSync(  "./src/public/404.html", "utf-8");
        response.write(html);
        response.end();
}

module.exports = {
        welcome,
        GetPostDelete,
        NotFound,
        Viewer,
        ServerStatus
}