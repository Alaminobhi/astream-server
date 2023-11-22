const express = require('express');
const app = express();
const http = require("http");
// const {Server} = require("uws");
const bodyParser = require('body-parser');
const cors = require("cors");
const NodeMediaServer = require('node-media-server');
const mediaRoutes = require("./routes/media");
const path = require("path");
const connectToDB = require('./utils/database');
const fs = require('fs');
const {fork} = require("child_process") 

app.server = http.createServer(app);
// app.wss = new Server({server: app.server});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connectToDB();
app.use(cors({exposedHeaders: '*'}));
// app.wss.on('connection', (ws) => {
//   console.log();
// })

app.use("/api/v1/media", mediaRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/isprime", (req, res) => {
    
  const childProcess = fork('./isprime.js');
  childProcess.send(req.body)
  childProcess.on("message", (data) => {
    res.status(200).json({hhhhh: 'gggg', ffff: 'fffff'})
  })
});

app.get('/video-live', async function(req, res){
  
  const range = req.headers.range;
  if(!range){
      res.status(400).send("Requires Range header");
  }
  const video = 'https://www.youtube.com/watch?v=RLzC55ai0eo'; 
  // const videoPath = "./videos/ok.mp4";
  const videoPath = await path.join(__dirname, './videos/ok.mp4');
  
  const videoSize = fs.statSync(videoPath).size;
  // console.log("size of video is:", videoSize);
  const CHUNK_SIZE = 10**6; //1 MB
  const start = Number(range.replace(/\D/g, "")); 
  const end = Math.min(start + CHUNK_SIZE , videoSize-1);
  const contentLength = end-start+1;
  const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": 'bytes',
      "Content-Length": contentLength,
      "Content-Type": "video/mp4"
  }
  res.writeHead(206,headers);
  const videoStream = fs.createReadStream(videoPath, {start, end});
  videoStream.pipe(res);

});

// app.routers = routers(app);

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  },
  // relay: {
  //   ffmpeg: ffmpegPath,
  //   tasks: [
  //     {
  //       app: 'live',
  //       mode: 'push',
  //       edge: 'rtmps://live-api-s.facebook.com:443/rtmp/FB-239969042429073-0-AbzreEAxwYFPsX18',
  //     }
  //   ]
  // }
};

var nms = new NodeMediaServer(config)
nms.run();

 

const PORT = process.env.PORT || 5000;
var server = app.server.listen(PORT, () => {
  
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at", host, port)
  console.log(`server is running on port ${PORT}`);
});