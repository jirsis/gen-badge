var cheerio = require('cheerio');
var fs = require('fs');

var coloursValues = require('./colours').colours;
var colours = require('./colours');

var calculateColor = function(info, minor, mayor, critical, blocker){
  var color = colours.calculate(info, 1000);
  color = Math.max(color, colours.calculate(minor, 750));
  color = Math.max(color, colours.calculate(mayor, 400));
  color = Math.max(color, colours.calculate(critical, 50));
  color = Math.max(color, colours.calculate(blocker, 10));
  return coloursValues[color];
}

var analyze = function(budge, shields){
  fs.readFile(budge.path+budge.subject+'.xml', function(err, data){
    var $ = cheerio.load(data.toString(), {xmlMode: true});
    var blockers = criticals = mayors = minors = infos = 0;
    $('violation').toArray().forEach(function(item){
      if($(item).attr('priority') === '5'){
        infos++;
      }else if($(item).attr('priority') === '4'){
        minors++;
      }else if($(item).attr('priority') === '3'){
        mayors++;
      }else if($(item).attr('priority') === '2'){
        criticals++;
      }else {
        blockers++;
      }
    });
    budge.status = 'B:'+blockers+' C:'+criticals + ' M:'+mayors+' m:'+minors + ' i:'+infos+ ' violations';
    budge.color = calculateColor(infos, minors, mayors, criticals, blockers);
    shields(budge);
  });
}

module.exports.analysis = function(data, shields){
  data.subject= 'pmd';
  data.status= 'fail';
  data.color= '01A9DB';
  analyze(data, shields);
}
