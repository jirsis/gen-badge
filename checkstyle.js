var fs = require('fs');
var cheerio = require('cheerio');

var calculateColor = function(status){
  if(status === 0 ){
    return 'brightgreen';
  }else if (status > 0 && status <= 2000){
    return 'green';
  }else if (status > 2000 && status <= 4000){
    return 'yellowgreen';
  }else if (status > 4000 && status <= 6000){
    return 'yellow';
  }else if (status > 6000 && status <= 8000){
    return 'orange';
  }else {
    return 'red';
  }
}


var analyze = function(budge, shields){
  fs.readFile(budge.path+budge.file+'.xml', function(err, data){
    var $ = cheerio.load(data.toString(), {xmlMode: true});
    budge.status = $('error').toArray().length+ ' errors';
    budge.color = calculateColor(budge.status);
    shields(budge);
  });
}

module.exports.analysis = function(data, shields){
  data.file = 'checkstyle-result'
  data.subject= 'checkstyle';
  data.status= 'fail';
  data.color= 'BF00FF';
  analyze(data, shields);
};
