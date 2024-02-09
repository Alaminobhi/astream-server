var gtts = require('node-gtts')('en');
var path = require('path');
const gTTS = require('gtts');
const axios = require('axios');
const PlayHT = require('playht');
const fs = require('fs');

process.on("message", message => {
    console.log(message);
      
      const jsonResponse = texttomp3(message);
      process.send(jsonResponse);
      // process.exit();
  })


  async function texttomp3(message) {
    const {fileurl, loop, rtmp} = message;
      let startTime = new Date();
      let endTime = new Date();
      let isPrime = true;
      PlayHT.init({
        apiKey: '02988d4a759e480fad9355d6487a9fae',
        userId: 'prbO4DEWGKe7emwFsG7uN2PUjv63',
      });

      try {
        const output2Path = path.join(__dirname, 'audios', Date.now()+'text2.mp3');


        // const options = {
        //   method: 'GET',
        //   url: 'https://api.play.ht/api/v2/voices',
        //   headers: {
        //     accept: 'application/json',
        //     AUTHORIZATION: '02988d4a759e480fad9355d6487a9fae',
        //     'X-USER-ID': 'prbO4DEWGKe7emwFsG7uN2PUjv63'
        //   }
        // };
        
        // axios
        //   .request(options)
        //   .then(function (response) {
        //     // console.log(response.data);
        //     response.data.map(getFullName);

        //     function getFullName(item) {
        //         if ('English (US)' === item.language) {
                    
        //         }
        //         return console.log(item.language);
        //     }
            
        //   })
        //   .catch(function (error) {
        //     console.error(error);
        //   });


            const options2 = {
            method: 'GET',
            url: 'https://api.play.ht/api/v2/cloned-voices',
            headers: {
                accept: 'application/json',
                AUTHORIZATION: '02988d4a759e480fad9355d6487a9fae',
                'X-USER-ID': 'prbO4DEWGKe7emwFsG7uN2PUjv63'
            }
            };

            axios
            .request(options2)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });


           // Create a file stream
      const fileStream = fs.createWriteStream(output2Path);

      // configure your stream
const streamingOptions = {
  // must use turbo for the best latency
  voiceEngine: "PlayHT2.0-turbo",
  // this voice id can be one of our prebuilt voices or your own voice clone id, refer to the`listVoices()` method for a list of supported voices.
  voiceId:
    "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
  // you can pass any value between 8000 and 48000, 24000 is default
  sampleRate: 24000,
  // the generated audio encoding, supports 'raw' | 'mp3' | 'wav' | 'ogg' | 'flac' | 'mulaw'
  outputFormat: 'mp3',
  // playback rate of generated speech
  speed: 1,
};

// start streaming!
const text = "Hey, this is Jennifer from Play. Please hold on a moment, let me just um pull up your details real quick."
const stream = await PlayHT.stream(text, streamingOptions);

stream.on("data", (chunk) => {
  // Do whatever you want with the stream, you could save it to a file, stream it in realtime to the browser or app, or to a telephony system
});
      // Pipe stream into file
      stream.pipe(fileStream);



        // let speech = 'Welcome to GeeksforGeeks';
        // const  gtts2 = await new gTTS(speech, 'en');
        
        // gtts2.save(output2Path, function (err, result){
        //     if(err) { throw new Error(err); }
        //     console.log("Text to speech converted!");
        // });
  
        // var text = "how are you"
        //   const outputPath = path.join(__dirname, 'audios', Date.now()+'text.mp3');
        // //   var voice = new gtts(text,'en');
        //   gtts.save(outputPath, 'I love you', function() {
        //     console.log('save done');
        //   })

        //  onno akti

        //   voice.save(outputPath, (err, result) =>{

        //     if (err) {
        //         fs.unlinkSync(outputPath)
        //         return 'unable to convert to mp3'
        //     } else {
        //         var down = '';
        //         down.download(outputPath, (err) =>{
        //             if (err) {
        //             fs.unlinkSync(outputPath)
        //              return 'unable to convert to mp3'
        //             }
        //             // fs.unlinkSync(outputPath)
        //         })
        //     }
        //   })

        
        }
        
        catch (error) {
          console.log('err', error);
          return {error}
        }
  
  
      return {
        livestatus: "Start Live Stream", videourl: 'live'
          }
  
  }