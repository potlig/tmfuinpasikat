var http = require('http'),
    httpProxy = require('http-proxy');
const port = 3002
//
// Create your proxy server and set the target in the options.
//
httpProxy.createProxyServer({target:'http://localhost:8080'}).listen(port, ()=>{
	console.log("listening to port:" + port)
}); // See (†)

//
// Create your target server
//
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(80);