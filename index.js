const express = require('express');
const app = express();
const http = require("http");
// const {Server} = require("uws");
const bodyParser = require('body-parser');
const cors = require("cors");
const {routers} = require('./router');
const NodeMediaServer = require('node-media-server');
const ffmpegPath = require('ffmpeg-static');
const os = require('os');
const cluster = require('cluster');
const { exit } = require('process');
const cpuNums = os.cpus().length


app.server = http.createServer(app);
// app.wss = new Server({server: app.server});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({exposedHeaders: '*'}));
// app.wss.on('connection', (ws) => {
//   console.log();
// })
app.routers = routers(app);




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
  relay: {
    ffmpeg: ffmpegPath,
    tasks: [
      {
        app: 'live',
        mode: 'push',
        edge: 'rtmps://live-api-s.facebook.com:443/rtmp/FB-239969042429073-0-AbzreEAxwYFPsX18',
      }
    ]
  }
};

var nms = new NodeMediaServer(config)
nms.run();

 

const PORT = process.env.PORT || 5000;
var server = app.server.listen(PORT, () => {
  
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
  console.log(`server is running on port ${PORT}`);
});