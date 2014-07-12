var fs = require('fs');
var cheerio = require('cheerio');
var coloursValues = require('./colours').colours;
var colours = require('./colours');

var calculateColor = function(info, warning, error){
  var color = colours.calculate(info, 8000);
  color = Math.max(color, colours.calculate(warning, 200));
  color = Math.max(color, colours.calculate(error, 20));
  return coloursValues[color];
}

var analyze = function(budge, shields){
  fs.readFile(budge.path+budge.file+'.xml', function(err, data){
    var $ = cheerio.load(data.toString(), {xmlMode: true});
    var infos = 0;
    var warnings = 0;
    var errors = 0;
    $('error').toArray().forEach(function(item){
      if($(item).attr('severity') === 'warning'){
        warnings++;
      }else if($(item).attr('severity') === 'info'){
        infos++;
      }else {
        errors++;
      }
    });
    budge.status = 'E:'+errors + ' W:' + warnings + ' I:'+infos+' errors';
    budge.color = calculateColor(infos, warnings, errors);
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
