const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname;
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.md':'text/markdown','.png':'image/png','.json':'application/json'};
http.createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end()}
 const target=path.resolve(root,'.'+(pathname==='/'?'/design-system.html':pathname));
 if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end()}
 fs.readFile(target,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found')}res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data)});
}).listen(Number(process.env.PORT||4174),'127.0.0.1',()=>console.log('Carte kit: http://127.0.0.1:'+(process.env.PORT||4174)));
