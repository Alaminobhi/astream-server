const spawn = require('child_process').spawn;
const fs = require('fs');
const path = require('path');
const ffmpegPath = require('ffmpeg-static');
const {fork} = require("child_process") 
const {Worker} = require('worker_threads');


exports.routers = (app) => {

    app.get("/", function (req, res) {
        res.sendFile(__dirname + "/index.html");
      });

      app.get("/worker", function (req, res) {
        let worker = new Worker('./worker.js');

        worker.send()

        worker.on('message', (data)=>{
          res.status(200).json({data});

        })
        
      });


      app.post("/isprime", (req, res) => {
    
        const childProcess = fork('./isprime.js');
        childProcess.send(req.body)
        childProcess.on("message", (data) => {
          res.status(200).json({hhhhh: 'gggg', ffff: 'fffff'})
        })
    } )
      
      app.get('/aaa', async function (req, res) {
      
        try {
          const videoPath = await path.join(__dirname, './videos/ok.mp4');
         
          const rtmp ='rtmps://live-api-s.facebook.com:443/rtmp/FB-295762333426359-0-AbzApvze1_PMJT3u';
          const rtmp1 ='rtmps://live-api-s.facebook.com:443/rtmp/FB-295759806759945-0-Aby3KvhPH_btY43I';
          const rtmp2 ='rtmp://localhost:1935/live/STREAM_NAME';
        //   const {fileurl, loop, rtmp} =req.body; 
      
        const ffmpegCommand =['-stream_loop', '-1', '-re', '-i', videoPath, '-c:v', 'libx264', '-preset', 'veryfast', '-maxrate', '3000k',
         '-bufsize', '6000k', '-pix_fmt', 'yuv420p', '-g', '50', '-c:a', 'aac', '-b:a', '160k', '-ac', '2', '-ar', '44100',
          '-f', 'flv', rtmp];

          const ffmpegCommand1 =['-stream_loop', '-1', '-re', '-i', videoPath, '-c:v', 'libx264', '-preset', 'veryfast', '-maxrate', '3000k',
         '-bufsize', '6000k', '-pix_fmt', 'yuv420p', '-g', '50', '-c:a', 'aac', '-b:a', '160k', '-ac', '2', '-ar', '44100',
          '-f', 'flv', rtmp1];
          const ffmpegCommand2 =['-stream_loop', '-1', '-re', '-i', videoPath, '-c:v', 'libx264', '-preset', 'veryfast', '-maxrate', '3000k',
         '-bufsize', '6000k', '-pix_fmt', 'yuv420p', '-g', '50', '-c:a', 'aac', '-b:a', '160k', '-ac', '2', '-ar', '44100',
          '-f', 'flv', rtmp2];
          
      
        //   streamingProcess = spawn(ffmpegPath, ffmpegCommand);
          console.log('asdfghjkl');   
        // streamingProcess = spawn(ffmpegPath, ffmpegCommand);
        // streamingProcess = spawn(ffmpegPath, ffmpegCommand1);
        // streamingProcess = spawn(ffmpegPath, ffmpegCommand2);

        if (ffmpegCommand) {
            streamingProcess = spawn(ffmpegPath, ffmpegCommand);
        }
        if (ffmpegCommand1) {
            streamingProcess = spawn(ffmpegPath, ffmpegCommand1);
        }
        if (ffmpegCommand2) {
            streamingProcess = spawn(ffmpegPath, ffmpegCommand2);
        }

    //       streamingProcess.stdout.on('data', (data) => {
    //         console.log("fhuhuh", data.toString());
             
    //       });
    //       streamingProcess.stderr.on('data', (data) => {
    //     console.log(data.toString());
    //       });
    //       streamingProcess.on('close', (code) => {
    //     console.log(`child process exited with code ${code}`);
    //   });
    //   // Handle errors
    //   streamingProcess.on('error', (err) => {
    //     // res.send("spawning ffmpeg", err);
    //       console.error(`Error spawning ffmpeg: ${err}`);
    //   });
        }
        
        catch (error) {
          console.log('hhhhhh', error);
        }
      
      })
      
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
      
      
      app.post('/added-stream', async function (req, res) {
        const {fileurl, loop, urlkey} =req.body;
          console.log('huihuygygyug', fileurl, loop, urlkey);
      
        //   fs.readFile( __dirname + "/" + "videos/ok.mp4", 'utf8', function (err, data) {
        //     console.log( data );
        //     res.end( data ); 
        //  });
         
      
        try {
          // const filePath = await path.join(__dirname, './videos/ok.mp4');
          // const videoPath = await "./videos/ok.mp4";
          const videoPath = await "https://astream-server.vercel.app/video-live";
      
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
          res.send({hi: "hhhhhhh hgygygyg hgygyg", error});
           console.log(error);
         }
        
        }); 
      
        app.get("/stream", async function (req, res) {
          const {fileurl, loop, urlkey} =req.body;
          console.log('huihuygygyug', fileurl, loop, urlkey);
          const filePath = await path.join(__dirname, './videos/ok.mp4');
          const url ='rtmps://live-api-s.facebook.com:443/rtmp/FB-246363178443448-0-AbzNhl9Dkqj2GHtF';
          try {
            const ffmpegProcess = await spawn(ffmpegPath, ['-stream_loop', '-1', '-re', '-i', filePath, 
            '-c', 'copy',
            '-f', 'flv', url,]);
            
      
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
              // res.send("spawning ffmpeg", err);
                console.error(`Error spawning ffmpeg: ${err}`);
            });
            // res.send({hi: "start stream"});
        // res.send({hhhhhh: 'gggggggg'})
      
       } catch (error) {
        res.status(500).json({startERR: 'ERR Start Stream'})
       }
        }); 
      
        app.get('/added-stream2', async function (req, res) {
          // const {fileurl, loop, urlkey} =req.body;
          //   console.log('huihuygygyug', fileurl, loop, urlkey);
        
          //   fs.readFile( __dirname + "/" + "videos/ok.mp4", 'utf8', function (err, data) {
          //     console.log( data );
          //     res.end( data );
          //  });
           
         
          try {
            const filePath = await path.join(__dirname, './videos/ok.mp4');
            // const videoPath = await "https://astream-server.vercel.app/video-live";
        
            const url ='rtmps://live-api-s.facebook.com:443/rtmp/FB-246363178443448-0-AbzNhl9Dkqj2GHtF';
            // const url1 ='FB-231542346605076-0-AbyE4AmCXITp4eKd';
        
             const ffmpegProcess = await spawn(ffmpegPath, ['-stream_loop', '-1', '-re', '-i', filePath, 
                '-c', 'copy',
                '-f', 'flv', url,]);
        
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
                  // res.send("spawning ffmpeg", err);
                    console.error(`Error spawning ffmpeg: ${err}`);
                });
                res.statusText({hi: "start stream"});
            // res.send({hhhhhh: 'gggggggg'})
          
           } catch (error) {
            res.status({hi: "error stream", error});
             console.log(error);
           }
          
          });
}