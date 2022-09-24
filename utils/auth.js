const fs = require('fs')
  
let publicKey = fs.readFileSync(`${__dirname}/publicKey.pem`)  //fs.readFileSync(path.join(__dirname, '/publicKey.pem'));
 

module.exports = { publicKey }