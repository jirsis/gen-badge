var fs = require('fs');
var https = require('https');
var path = require('path');

var shields = function(badge){
  var url ='https://img.shields.io/badge/'
    + badge.subject + '-'
    + badge.status + '-'
    + badge.color + '.svg'
    + '?style=flat';
  console.log("shield url: "+url);
  https.get(url, function(res) {
    if (res.statusCode === 200) {
      var file = fs.createWriteStream(badge.subject+'.svg');
      res.pipe(file);
      console.log('Generated '+path.resolve(badge.path+badge.subject)+'.svg');
    }else{
      console.log("Got error: ", res.statusCode);
    }
  }).on('error', function(e) {
    console.log("Got error: ", e);
  });
}

module.exports.badge = shields;
