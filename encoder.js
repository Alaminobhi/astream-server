const spawn = require('child_process').spawn;
const path = require('path');
const ffmpegPath = require('ffmpeg-static');

// ffmpeg.setFfmpegPath(ffmpegStatic);
const axios = require('axios');
const ytdl = require('ytdl-core');
const fs = require('fs');
const readline = require('readline');

process.on("message", message => {
    console.log(message);
      
      const jsonResponse = ffmpegvideo(message);
      process.send(jsonResponse);
      // process.exit();
  })

const audioPath = path.join(__dirname, 'videos', 'Falling Up.mp3');

const inputPath1 = path.join(__dirname, 'videos', 'mqdefault.jpg');
const inputPath2 = path.join(__dirname, 'videos', 'sddefault (1).jpg');
const inputPath3 = path.join(__dirname, 'videos', 'sddefault.jpg');
const inputPath4 = path.join(__dirname, 'videos', 'sddefault (2).jpg');
const inputPath5 = path.join(__dirname, 'videos', 'sddefault (1).jpg');
const inputPath6 = path.join(__dirname, 'videos', 'sddefault.jpg');

const outputPath = path.join(__dirname, 'videos', 'hp.mp4');
const scaleOptions = ['scale=1280:720', 'scale=640:320'];
const videoCodec = 'libx264';
const x264Options = 'keyint=24:min-keyint=24:no-scenecut';
const videoBitrates = ['1000k', '2000k', '4000k'];


  async function ffmpegvideo(message) {
    const {fileurl, loop, rtmp} = message;
    const controller = new AbortController();
    const { signal } = controller; 
      
      try {


        const ffmpegCommand =['-loop', '1', '-t', '20', '-i', inputPath1,
          // '-loop', '1', '-t', '5', '-i', inputPath2,
          // '-loop', '1', '-t', '5', '-i', inputPath3,
          // '-loop', '1', '-t', '5', '-i', inputPath4,
          // '-loop', '1', '-t', '5', '-i', inputPath5,
          // '-loop', '1', '-t', '5', '-i', inputPath6,
          '-i', audioPath,
          // '-filter_complex',
          // "[0:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=out:st=20:d=1[v0]; [v0]concat=n=1:v=1:a=0,format=yuv420p[v]",
          //    '-map',"[v]", '-map', '1:a',
              '-shortest', outputPath];

          // const ffmpegCommand =['-loop', '1', '-t', '5', '-i', inputPath1,
          // '-loop', '1', '-t', '5', '-i', inputPath2,
          // '-loop', '1', '-t', '5', '-i', inputPath3,
          // '-loop', '1', '-t', '5', '-i', inputPath4,
          // '-loop', '1', '-t', '5', '-i', inputPath5,
          // '-loop', '1', '-t', '5', '-i', inputPath6,
          // '-i', audioPath,
          // '-filter_complex',
          // "[0:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=out:st=4:d=1[v0]; \
          //   [1:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v1]; \
          //   [2:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v2]; \
          //   [3:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v3]; \
          //   [4:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v4]; \
          //   [5:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v5]; \
          //   [v0][v1][v2][v3][v4][v5]concat=n=6:v=1:a=0,format=yuv420p[v]",
          //    '-map',"[v]", '-map', '6:a',
          //     '-shortest', outputPath];
    
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
  
          // // Run FFmpeg
          // ffmpeg(inputPath1)

          // // Input file
          
          // .input(inputPath1)
          // .loop()
          // .duration(60)
          // // .complexFilter(['fade=in:0:30', 'pad=640:480:0:40:violet'])
          // // .input(inputPath2)
          // // .loop()
          // // .duration(5)
          // // .input(inputPath3)
          // // .loop()
          // // .duration(5)
          // // .input(inputPath4)
          // // .loop()
          // // .duration(5)
          // // .input(inputPath5)
          // // .loop()
          // // .duration(5)
          // // .input(inputPath6)
          // // .loop()
          // // .duration(5)
          // .input(audioPath)
          // // .complexFilter(
          // // ["[0:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=out:st=4:d=1[v0]; \
          // // [1:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v1]; \
          // // [2:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v2]; \
          // // [3:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v3]; \
          // // [4:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v4]; \
          // // [5:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v5]; \
          // // [v0][v1][v2][v3][v4][v5]concat=n=6:v=1:a=0,format=yuv420p[v]"])
          // // .outputOptions([
          // //   '-map.[saveToFile]', "[v]", '-map', '6:a', '-shortest'
          // // ])
          
          // // Scale the video to 720 pixels in height. The -2 means FFmpeg should figure out the
          // // exact size of the other dimension. In other words, to make the video 720 pixels wide
          // // and make FFmpeg calculate its height, use scale=720:-2 instead.
          // .outputOptions('-vf','scale=-2:720')

          // // .complexFilter([
          // //   "[0:V]scale=1080:-1,pad=0:1920:0:(oh-ih)/2[vid];[vid][1:v]overlay"
          // // ])
          // // Output file
          // .saveToFile(outputPath)

          // // Log the percentage of work completed
          // .on('progress', (progress) => {
          //   if (progress.percent) {
          //     console.log(`Processing: ${Math.floor(progress.percent)}% done`);
          //   }
            
          //   console.log(`Processing: ${Math.floor(progress.toString())}% done`);
          // })

          // // The callback that is run when FFmpeg is finished
          // .on('end', () => {
          //   console.log('FFmpeg has finished.');
          // })

          // // The callback that is run when FFmpeg encountered an error
          // .on('error', (error) => {
          //   console.error(error);
          // });
        }
        
        catch (error) {
          console.log('hhhhhh', error);
          return {error}
        }
  
  
      return {
        livestatus: "Start Live Stream", videourl: 'live'
          }
  
  }