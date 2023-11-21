const express = require('express');
const os = require('os');
const cluster = require('cluster');
const { exit } = require('process');
const cpuNums = os.cpus().length

if(cluster.isMaster) {
  for (let i = 0; i < cpuNums; i++) {
    cluster.fork()
    
  }

  cluster.on('exit', () => {
 cluster.fork();
  })
} else {
  const app = express();
  app.get('/ddd', async function (req, res) {

   let result = 0;
   for (let i = 0; i < 10000; i++) {
    result += i;
    
   }
   return res.json({processId: process.pid, result});

  });

  app.listen(4000, () => {
    console.log(`server is running on port ${4000}, ${process.pid}`);
  })

}