require('colors');
var Diff = require('diff');

function testDiffChars(){
    var oldStr = 'cat';
    var newStr = 'cap';
    console.log(oldStr,newStr);

    var diff = Diff.diffChars(oldStr, newStr);
    diff.forEach(function(part){
        var color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
    });
    console.log()
}

testDiffChars()

