var fs = require('fs');
var cheerio = require('cheerio');

var colors = ['brightgreen', 'green', 'yellowgreen', 'yellow', 'orange', 'red'];

var calculateColorInfos = function(infos){
  var color;
  if(infos === 0 ){
    color = 0;
  }else if (infos > 0 && infos <= 2000){
    color = 1;
  }else if (infos > 2000 && infos <= 4000){
    color = 2;
  }else if (infos > 4000 && infos <= 6000){
    color = 3;
  }else if (infos > 6000 && infos <= 8000){
    color = 4;
  }else {
    color = 5;
  }
  return color;
}

var calculateColorWarnings = function(warnings, color){
  var warningColor;
  if(warnings === 0){
    warningColor = 0;
  }else if(warnings > 0 && warnings <= 25){
    warningColor = 1;
  }else if(warnings > 25 && warnings <= 75){
    warningColor = 2;
  }else if (warnings > 75 && warnings <= 125){
    warningColor = 3;
  }else if (warnings > 125 && warnings <= 200){
    warningColor = 4;
  }else{
    warningColor = 5;
  }
  return Math.max(color, warningColor);
}

var calculateColorErrors = function(errors, color){
  var errorColor;
  if(errors === 0){
    errorColor = 0;
  }else if(errors > 0 && errors <= 5){
    errorColor = 1;
  }else if(errors > 5 && errors <= 10){
    errorColor = 2;
  }else if (errors > 10 && errors <= 15){
    errorColor = 3;
  }else if (errors > 15 && errors <= 20){
    errorColor = 4;
  }else{
    errorColor = 5;
  }

  return Math.max(color, errorColor);
}

var calculateColor = function(info, warning, error){
  var color = calculateColorInfos(info);
  color = calculateColorWarnings(warning, color);
  color = calculateColorErrors(error, color);
  return colors[color];
}


var analyze = function(budge, shields){
  fs.readFile(budge.path+budge.file+'.xml', function(err, data){
    var $ = cheerio.load(data.toString(), {xmlMode: true});
    var infos = 0;
    var warnings = 0;
    var errors = 0;
    budge.status = $('error').toArray().length+ ' errors';
    $('error').toArray().forEach(function(item, id){
      if($(item).attr('severity') === 'warning'){
        warnings++;
      }else if($(item).attr('severity') === 'info'){
        infos++;
      }else {
        errors++;
      }
    });
    budge.status = 'E:'+errors + ' W:' + warnings + ' I:'+infos;
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
