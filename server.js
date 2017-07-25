const http = require('http');
const fs   = require('fs');
const url  = require('url');
const querystring = require('querystring');
const mongo =require("./src/mongo");	
const testmongo = mongo();


const localServer = http.createServer(function(req ,res){
	const method = req.method;
	const parsedUrl = url.parse(req.url);
	const parsedQuery = querystring.parse(parsedUrl.query);	
	const uri = parsedUrl.pathname.slice(1);
	if (method === "POST"){
		if (uri === "addUser"){
			let body = '';
			req.on("data", function(data){
				body+=data;				
			})
			req.on("end", function(){
				const foo =JSON.parse(body);
				testmongo.setItem(foo);
				res.end();
			})
			return ;
		}
	}
	if(method === "POST"){
		if(uri === "findUsers"){
			let body = "";
			req.on("data", function(data){
				body +=data;
			})
			req.on("end",function(){
				const foo =JSON.parse(body);
				const newArr = testmongo.find(foo);
				res.end(JSON.stringify(newArr));
			})
			return ;
		}
		
	}	

	fs.readFile(uri,function(err,data){
		if(err)
			console.log(err);
		res.writeHead(200, {'Content-Type': 'text/html'});	
		res.end(data)
	})
	
})
localServer.listen(8000);
console.log("server is running");

