var fs = require('fs');
var path = require('path');
var checkstyle = require('./checkstyle');
var pmd = require('./pmd');
var findbugs = require('./findbugs');
var shields = require('./shields');

if (process.argv.length!==3){
  console.log('Usage: ');
  console.log('  ' + process.argv[1]+' <target directory>');
  process.exit(-1);
}

fs.readdir(process.argv[2], function(err, files){
  if(files === undefined){
    console.log('Target not found or empty');
    console.log('try \'mvn verify site\' to regenerate the files')
  }else{
    files.forEach(function(val, index, array){
      var data = {};
      data.path= path.resolve(process.argv[2])+path.sep;
      switch (val){
      case 'checkstyle-result.xml':
        checkstyle.analisys(data, shields.budge);
        break;
      case 'findbugs.xml':
        findbugs.analisys(data, shields.budge);
        break;
      case 'pmd.xml':
        pmd.analisys(data, shields.budge);

        break;
      }
    });
  }
});
