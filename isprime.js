const spawn = require('child_process').spawn;
const fs = require('fs');
const path = require('path');
const ffmpegPath = require('ffmpeg-static');

process.on("message", message => {
  console.log(message);
    
    const jsonResponse = isPrime(message);
    process.send(jsonResponse);
    // process.exit();
})


function isPrime(message) {
  const {fileurl, loop, rtmp} = message;
    let startTime = new Date();
    let endTime = new Date();
    let isPrime = true;
    
    try {
        const videoPath = path.join(__dirname, './videos/ok.mp4');
    
        const controller = new AbortController();
        const { signal } = controller;
       
        const rtmp0 ='rtmps://live-api-s.facebook.com:443/rtmp/FB-295762333426359-0-AbzApvze1_PMJT3u';
        const rtmp1 ='rtmps://live-api-s.facebook.com:443/rtmp/FB-295759806759945-0-Aby3KvhPH_btY43I';
        const rtmp2 ='rtmp://localhost:1935/live/STREAM_NAME';
      //   const {fileurl, loop, rtmp} =req.body;  
    
      const ffmpegCommand =['-stream_loop', loop, '-re', '-i', videoPath, '-c:v', 'libx264', '-preset', 'veryfast', '-maxrate', '3000k',
       '-bufsize', '6000k', '-pix_fmt', 'yuv420p', '-g', '50', '-c:a', 'aac', '-b:a', '160k', '-ac', '2', '-ar', '44100',
        '-f', 'flv', rtmp];
    
          streamingProcess = spawn(ffmpegPath, ffmpegCommand, { signal });
      
    
          streamingProcess.stdout.on('data', (data) => {
            console.log("fhuhuh", data.toString());
           
          });
          streamingProcess.stderr.on('data', (data) => {
        console.log(data.toString());
          });
          streamingProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
      // Handle errors
      streamingProcess.on('error', (err) => {
        // res.send("spawning ffmpeg", err);
          console.error(`Error spawning ffmpeg: ${err}`);
      });
      }
      
      catch (error) {
        console.log('hhhhhh', error);
      }


    return {
        "number" : 1,
        "isPrime": isPrime,
        "time": endTime.getTime() - startTime.getTime()
        }

}