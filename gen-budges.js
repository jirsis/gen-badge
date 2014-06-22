var fs = require('fs');
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
      data.path= process.argv[2];
      switch (val){
      case 'checkstyle-result.xml':
        data = checkstyle.analysis(data);
        shields.budge(data);
        break;
      case 'findbugs.xml':
        data = findbugs.analysis(data);
        shields.budge(data);
        break;
      case 'pmd.xml':
        data = pmd.analysis(data);
        shields.budge(data);
        break;
      }
    });
  }
});
