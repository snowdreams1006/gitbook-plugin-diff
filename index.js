/*
 *  ===============================================================
 *      snowdreams1006 is not just for programmers
 *  ===============================================================
 *
 *  - Document: index.js
 *  - Author: snowdreams1006
 *  - Description: Gitbook plugin index
 *  - Create Time: 2020-03-15
 */

var Diff = require('diff');

var regex = /^\s*```(?:.*[\r\n]+)?((?:.*[\r\n]+)+?)??\s*```$/igm;

module.exports = {
    blocks: {
        diff: {
            process: function process(block) {
                var pluginConfig = this.options.pluginsConfig["diff"] || {};
                var blockConfig = block || {};
                var rawBody = block.body;

                var result,textArr = [];
                while ((result = regex.exec(rawBody)) !== null) {
                    textArr.push(result[1]);
                }

                var pluginMethod = pluginConfig.method || "diffLines";
                var blockMethod = blockConfig.kwargs.method;
                var method = blockMethod;
                if(!method){
                    method = pluginMethod;
                }

                var pluginOptions = pluginConfig.options;
                var blockOptions = blockConfig.kwargs.options;
                var options = blockOptions;
                if(!options){
                    options = pluginOptions;
                }
                
                if (textArr.length != 2){
                    throw new Error('Only Support 2 code block');
                }
                var oldStr = textArr[0];
                var newStr = textArr[1];
                var showDiffCode = "";
                var diff;
                var markdownCode = "";
                switch (method) {
                    case "diffChars":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false});
                        diff = Diff.diffChars(oldStr, newStr,options);
                      break; 
                    case "diffWords":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false});
                        diff = Diff.diffWords(oldStr, newStr,options);
                        break; 
                    case "diffWordsWithSpace":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false});
                        diff = Diff.diffWordsWithSpace(oldStr, newStr,options);
                        break; 
                    case "diffLines":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
                        diff = Diff.diffLines(oldStr, newStr,options);
                        break; 
                    case "diffTrimmedLines":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
                        diff = Diff.diffTrimmedLines(oldStr, newStr,options);
                        break; 
                    case "diffSentences":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
                        diff = Diff.diffSentences(oldStr, newStr,options);
                        break; 
                    case "diffCss":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
                        diff = Diff.diffCss(oldStr, newStr,options);
                        break; 
                    case "diffJson":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
                        if(Object.prototype.toString.call(oldStr) === '[object String]'){
                            oldStr = JSON.parse(oldStr);
                        }
                        if(Object.prototype.toString.call(newStr) === '[object String]'){
                            newStr = JSON.parse(newStr);
                        }
                        diff = Diff.diffJson(oldStr, newStr);
                        break;
                    case "diffArrays":
                        if(Object.prototype.toString.call(oldStr) === '[object String]'){
                            oldStr = JSON.parse(oldStr);
                        }
                        if(Object.prototype.toString.call(newStr) === '[object String]'){
                            newStr = JSON.parse(newStr);
                        }
                        diff = Diff.diffArrays(oldStr, newStr);
                        break;
                }
                if(method == "diffJson"){
                    var diffObj = [];
                    diff.forEach(function(part){
                        var modifier = part.added ? "+   " : part.removed ? "-   " : "    ";
                        part.value.split("\n").forEach(function(item){
                            item = item.trim();
                            if(item){
                                if(item == "{" || item == "}"){
                                    showDiffCode +=  item + '\n';
                                }else{
                                    showDiffCode += modifier + item + '\n';
                                }
                            }
                        });
                    });
                }else if (method == "diffArrays"){
                    var diffArr = [];
                    diff.forEach(function(part){
                        var modifier = part.added ? "+   " : part.removed ? "-   " : "    ";
                        part.value.forEach(function(item){
                            item = item.trim();
                            if(item){
                                diffArr.push(modifier + item);
                            }
                        });
                    });
                    showDiffCode += '[  \n';
                    diffArr.forEach(function(diffItem){
                        showDiffCode += diffItem + "\n";
                    });
                    showDiffCode += ']'
                }else{
                    diff.forEach(function(part){
                        var modifier = part.added ? "+ " : part.removed ? "- " : "  ";
                        showDiffCode += modifier + part.value + '\n';
                    });
                }
                markdownCode = '```diff\n'+showDiffCode+'```';
                return new Promise(resolve => {
                    resolve(this.book.renderBlock('markdown', markdownCode) .then(function(html) {
                        return html;
                    }));
                }).then(res => {
                    return res;
                });
            }
        }
    }
};