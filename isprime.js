const spawn = require('child_process').spawn;
const path = require('path');
const ffmpegPath = require('ffmpeg-static');
const ytdl = require('ytdl-core');
const fs = require('fs');

process.on("message", message => {
  // console.log(message);
    
    const jsonResponse = isPrime(message);
    process.send(jsonResponse);
    // process.exit();
})


async function isPrime(message) {
  const {fileurl, loop, rtmp} = message;

    try {

        const videoPath = path.join(__dirname, 'videos', fileurl);
        const audioPath = path.join(__dirname, 'videos', 'pura video dekhne kelia link par click kore.mp3');
        const inputPath1 = path.join(__dirname, 'videos', 'mqdefault.jpg');
        const inputPath2 = path.join(__dirname, 'videos', 'sddefault (1).jpg');
        const inputPath3 = path.join(__dirname, 'videos', 'sddefault.jpg');
        const inputPath4 = path.join(__dirname, 'videos', 'sddefault (2).jpg');
        const inputPath5 = path.join(__dirname, 'videos', 'sddefault (1).jpg');
        const inputPath6 = path.join(__dirname, 'videos', 'sddefault.jpg');

    
        const controller = new AbortController();
        const { signal } = controller; 
        const ffmpegCommand3 =['-loop', '1', '-t', '10000', '-i', videoPath, '-i', audioPath, '-c:v', 'libx264', '-preset', 'veryfast','-b:v', '1000k', '-maxrate', '1000k',
       '-bufsize', '1500k', '-pix_fmt', 'yuv420p','-r', '30', '-g', '60', '-c:a', 'aac', '-b:a', '128k', '-ac', '2', '-ar', '44100',
        '-f', 'flv', rtmp];
        const ffmpegCommand2 =['-loop', '1', '-t', '1000', '-i', videoPath,
        '-loop', '1', '-t', '500', '-i', inputPath2,
        '-loop', '1', '-t', '500', '-i', inputPath3,
        '-loop', '1', '-t', '500', '-i', inputPath4,
        '-loop', '1', '-t', '500', '-i', inputPath5,
        '-loop', '1', '-t', '500', '-i', inputPath6,
        '-i', audioPath,
         '-filter_complex',
          "[0:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=out:st=1000:d=1[v0]; \
            [1:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=500:d=1[v1]; \
            [2:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=500:d=1[v2]; \
            [3:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=500:d=1[v3]; \
            [4:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=500:d=1[v4]; \
            [5:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=500:d=1[v5]; \
            [v0][v1][v2][v3][v4][v5]concat=n=6:v=1:a=0,format=yuv420p[v]",
             '-map',"[v]", '-map', '6:a', '-preset', 'veryfast','-b:v', '1000k', '-maxrate', '1000k',
             '-bufsize', '1500k', '-pix_fmt', 'yuv420p','-r', '30', '-g', '60', '-c:a', 'aac', '-b:a', '64k', '-ac', '2', '-ar', '44100',
              '-f', 'flv', rtmp];
        const ffmpeg2 = ['-loop', '1', '-framerate', '30', '-i', videoPath, '-i', audioPath, '-c:v', 'libx264','-preset', 'veryfast','-b:v', '1000k', '-maxrate', '1000k',
        '-bufsize', '1500k', '-pix_fmt', 'yuv420p', '-g', '60', '-c:a', 'aac', '-b:a', '192k', '-t', '3000',
        '-f', 'flv', rtmp];

      const ffmpegCommand =['-stream_loop', loop, '-re', '-i', videoPath, '-c:v', 'libx264', '-preset', 'veryfast','-b:v', '1000k', '-maxrate', '1000k',
       '-bufsize', '1500k', '-pix_fmt', 'yuv420p','-r', '30', '-g', '60', '-c:a', 'aac', '-b:a', '64k', '-ac', '2', '-ar', '44100',
        '-f', 'flv', rtmp];
    
          streamingProcess = spawn(ffmpegPath, ffmpeg2, { signal });
      
    
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
        console.log('err', error);
        return {error}
      }


    return {
      livestatus: "Start Live Stream", videourl: 'live'
        }

}