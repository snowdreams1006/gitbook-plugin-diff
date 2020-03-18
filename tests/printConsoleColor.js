require('colors');
var Diff = require('diff');

function testDiffChars(){
    var oldStr = 'cat';
    var newStr = 'cap';

    console.log('>>>diffChars<<<');
    console.log(oldStr);
    console.log(newStr);
    console.log();

    var diff = Diff.diffChars(oldStr, newStr);
    diff.forEach(function(part){
        var color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
    });
    console.log();
}

testDiffChars();

function testDiffWords(){
    var oldStr = 'beep boop  ';
    var newStr = 'beep boob blah';

    console.log('>>>diffWords<<<');
    console.log(oldStr);
    console.log(newStr);
    console.log();

    var diff = Diff.diffWords(oldStr, newStr);
    diff.forEach(function(part){
        var color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
    });
    console.log();
}

testDiffWords();

function testDiffWordsWithSpace(){
    var oldStr = 'beep boop  ';
    var newStr = 'beep boob blah';
    
    console.log('>>>diffWordsWithSpace<<<');
    console.log(oldStr);
    console.log(newStr);
    console.log();

    var diff = Diff.diffWordsWithSpace(oldStr, newStr);
    diff.forEach(function(part){
        var color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
    });
    console.log();
}

testDiffWordsWithSpace();

function testDiffLines(){
    var oldStr = `
        beep boop
        the cat is palying with cap
        what
    `;
    var newStr = `
        beep boob blah
        the cat is palying with cap
        who
    `;
    
    console.log('>>>diffLines<<<');
    console.log(oldStr);
    console.log(newStr);
    console.log();

    var diff = Diff.diffLines(oldStr, newStr);
    diff.forEach(function(part){
        var color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
    });
    console.log();
}

testDiffLines();

function testDiffTrimmedLines(){
    var oldStr = `
        beep boop
        the cat is palying with cap
        what
    `;
    var newStr = `
        beep boob blah
        the cat is palying with cap
        who
    `;
    
    console.log('>>>diffTrimmedLines<<<');
    console.log(oldStr);
    console.log(newStr);
    console.log();

    var diff = Diff.diffTrimmedLines(oldStr, newStr);
    diff.forEach(function(part){
        var color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
    });
    console.log();
}

testDiffTrimmedLines();

function testDiffSentences(){
    var oldStr = `
        beep boop
        the cat is palying with cap
        what
    `;
    var newStr = `
        beep boob blah
        the cat is palying with cap
        who
    `;
    
    console.log('>>>diffSentences<<<');
    console.log(oldStr);
    console.log(newStr);
    console.log();

    var diff = Diff.diffSentences(oldStr, newStr);
    diff.forEach(function(part){
        var color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
    });
    console.log();
}

testDiffSentences();

function testDiffCss(){
    var oldStr = `
        .markdown-section h1, .markdown-section h2, .markdown-section h3, .markdown-section h4, .markdown-section h5, .markdown-section h6 {
            margin-top: 1.275em;
            margin-bottom: .85em;
            font-weight: 700;
        }
    `;
    var newStr = `
        .markdown-section h1, .markdown-section h2, .markdown-section h3, .markdown-section h4, .markdown-section h5, .markdown-section h6 {
            margin-top: 1.5em;
            margin-bottom: 1em;
        }
    `;
    
    console.log('>>>diffCss<<<');
    console.log(oldStr);
    console.log(newStr);
    console.log();

    var diff = Diff.diffCss(oldStr, newStr);
    diff.forEach(function(part){
        var color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
    });
    console.log();
}

testDiffCss();

function testDiffJson(){
    var oldStr = {
      "name": "gitbook-plugin-simple-mind-map",
      "version": "0.2.1",
      "description": "A gitBook plugin for generating and exporting mind map within markdown"
    };
    var newStr = {
      "name": "gitbook-plugin-diff",
      "version": "0.2.1",
      "description": "A gitbook plugin for showing the differences between the codes within markdown"
    };
    
    console.log('>>>diffJson<<<');
    console.log(oldStr);
    console.log(newStr);
    console.log();

    if(Object.prototype.toString.call(oldStr) === '[object String]'){
        oldStr = JSON.parse(oldStr);
    }
    if(Object.prototype.toString.call(newStr) === '[object String]'){
        newStr = JSON.parse(newStr);
    }
    var diff = Diff.diffJson(oldStr, newStr);
    diff.forEach(function(part){
        var color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
    });
    console.log();
}

testDiffJson();

function testDiffArrays(){
    var colors = require('colors/safe');

    var oldStr = [
        "Vue",
        "Python",
        "Java",
        "flutter",
        "springboot",
        "docker",
        "React",
        "小程序"
    ];
    var newStr = [
        "Vuejs",
        "Nodejs",
        "Java",
        "flutter",
        "springboot",
        "docker",
        "React"
    ];
    
    console.log('>>>diffArrays<<<');
    console.log(oldStr);
    console.log(newStr);
    console.log();

    if(Object.prototype.toString.call(oldStr) === '[object String]'){
        oldStr = JSON.parse(oldStr);
    }
    if(Object.prototype.toString.call(newStr) === '[object String]'){
        newStr = JSON.parse(newStr);
    }
    var diff = Diff.diffArrays(oldStr, newStr);
    diff.forEach(function(part){
        var color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';

        process.stderr.write(colors[color](part.value));
    });
    console.log();
}

testDiffArrays();
