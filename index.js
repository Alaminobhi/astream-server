const express = require('express');
const app = express();
const http = require("http");

const cors = require("cors");
const spawn = require('child_process').spawn;
const fs = require('fs');

const ffmpegPath = require('ffmpeg-static');

const httpServer = http.createServer(app);
const path = require('path');

app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get('/video-live', function(req, res){
  
  const range = req.headers.range;
  if(!range){
      res.status(400).send("Requires Range header");
  }
  const video = 'https://www.youtube.com/watch?v=RLzC55ai0eo'; 
  const videoPath = "./videos/ok.mp4";
  
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


app.post('/added-stream', async (req, res) => {
  const {fileurl, loop, urlkey} =req.body;
    console.log('huihuygygyug', fileurl, loop, urlkey);

  //   fs.readFile( __dirname + "/" + "videos/ok.mp4", 'utf8', function (err, data) {
  //     console.log( data );
  //     res.end( data );
  //  });
   

  try {
    const filePath = await path.join(__dirname, './videos/ok.mp4');
    const videoPath = await "./videos/ok.mp4";

    const url ='rtmps://live-api-s.facebook.com:443/rtmp/FB-246363178443448-0-AbzNhl9Dkqj2GHtF';
    const url1 ='FB-231542346605076-0-AbyE4AmCXITp4eKd';


     const ffmpegProcess = await spawn(ffmpegPath, ['-stream_loop', loop, '-re', '-i', videoPath, 
        '-c', 'copy',
        '-f', 'flv', urlkey,]);

        ffmpegProcess.stdout.on('data', (data) => {
              console.log("fhuhuh", data.toString());
              
            });
        ffmpegProcess.stderr.on('data', (data) => {
          
              console.log(data.toString());
            });
        ffmpegProcess.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
        // Handle errors
        ffmpegProcess.on('error', (err) => {
          res.send("spawning ffmpeg", err);
            console.error(`Error spawning ffmpeg: ${err}`);
        });
        res.send({hi: "hhhhhhh hgygygyg hgygyg"});
  
   } catch (error) {
    res.send({hi: "hhhhhhh hgygygyg hgygyg"}, error);
     console.log(error);
   }
  
  });

  app.get('/added-stream', async (req, res) => {
    const {fileurl, loop, urlkey} =req.body;
      console.log('huihuygygyug', fileurl, loop, urlkey);
  
    //   fs.readFile( __dirname + "/" + "videos/ok.mp4", 'utf8', function (err, data) {
    //     console.log( data );
    //     res.end( data );
    //  });
     
  
    try {
      const filePath = await path.join(__dirname, './videos/ok.mp4');
      const videoPath = await "./videos/ok.mp4";
  
      const url ='rtmps://live-api-s.facebook.com:443/rtmp/FB-246363178443448-0-AbzNhl9Dkqj2GHtF';
      const url1 ='FB-231542346605076-0-AbyE4AmCXITp4eKd';
  
  
       const ffmpegProcess = await spawn(ffmpegPath, ['-stream_loop', loop, '-re', '-i', videoPath, 
          '-c', 'copy',
          '-f', 'flv', urlkey,]);
  
          ffmpegProcess.stdout.on('data', (data) => {
                console.log("fhuhuh", data.toString());
                
              });
          ffmpegProcess.stderr.on('data', (data) => {
            
                console.log(data.toString());
              });
          ffmpegProcess.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
          });
          // Handle errors
          ffmpegProcess.on('error', (err) => {
            res.send("spawning ffmpeg", err);
              console.error(`Error spawning ffmpeg: ${err}`);
          });
          res.send({hi: "hhhhhhh hgygygyg hgygyg"});
    
     } catch (error) {
      res.send({hi: "hhhhhhh hgygygyg hgygyg"}, error);
       console.log(error);
     }
    
    });

const PORT = process.env.PORT || 5000;
var server = httpServer.listen(PORT, () => {
  
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
  console.log(`server is running on port ${PORT}`);
});