gen-bugde
=========

Generate bugdes of pmd, checkstyle, findbugs with the [shields.io](http://shields.io) style

usage
=========
````
npm install
./gen-budge <absolute target dir to analyze>
````

The result generate a set of budges into the target dir:
* pmd.svg ![pmd example ok](http://img.shields.io/badge/pmd-0 violations-brightgreen.svg)
* checkstyle.svg ![checkstyle example ok](http://img.shields.io/badge/checkstyle-0 errors-brightgreen.svg)
* findbugs.svg ![findbugs example ok](http://img.shields.io/badge/findbugs-0 bugs-brightgreen.svg)
