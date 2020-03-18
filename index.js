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
                var oldArr = textArr[0];
                var newArr = textArr[1];
                
                var showDiffCode = "",diff;
                switch (method) {
                    case "diffChars":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false});
                        diff = Diff.diffChars(oldArr, newArr,options);
                        diff.forEach(function(part){
                            var modifier = part.added ? "+ " : part.removed ? "- " : " ";
                            showDiffCode += modifier + part.value + '\n';
                        });
                      break; 
                    case "diffWords":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false});
                        diff = Diff.diffWords(oldArr, newArr,options);
                        diff.forEach(function(part){
                            var modifier = part.added ? "+ " : part.removed ? "- " : " ";
                            showDiffCode += modifier + part.value + '\n';
                        });
                        break; 
                    case "diffWordsWithSpace":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false});
                        diff = Diff.diffWordsWithSpace(oldArr, newArr,options);
                        diff.forEach(function(part){
                            var modifier = part.added ? "+ " : part.removed ? "- " : " ";
                            showDiffCode += modifier + part.value + '\n';
                        });
                        break; 
                    case "diffLines":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
                        diff = Diff.diffLines(oldArr, newArr,options);
                        diff.forEach(function(part){
                            var modifier = part.added ? "+ " : part.removed ? "- " : " ";
                            showDiffCode += modifier + part.value + '\n';
                        });
                        break; 
                    case "diffTrimmedLines":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
                        diff = Diff.diffTrimmedLines(oldArr, newArr,options);
                        diff.forEach(function(part){
                            var modifier = part.added ? "+ " : part.removed ? "- " : " ";
                            showDiffCode += modifier + part.value + '\n';
                        });
                        break; 
                    case "diffSentences":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
                        diff = Diff.diffSentences(oldArr, newArr,options);
                        diff.forEach(function(part){
                            var modifier = part.added ? "+ " : part.removed ? "- " : " ";
                            showDiffCode += modifier + part.value + '\n';
                        });
                        break; 
                    case "diffCss":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
                        diff = Diff.diffCss(oldArr, newArr,options);
                        diff.forEach(function(part){
                            var modifier = part.added ? "+ " : part.removed ? "- " : " ";
                            showDiffCode += modifier + part.value + '\n';
                        });
                        break; 
                    case "diffJson":
                        options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
                        diff = Diff.diffJson(oldArr, newArr,options);
                        diff.forEach(function(part){
                            var modifier = part.added ? "+ " : part.removed ? "- " : " ";
                            showDiffCode += modifier + part.value + '\n';
                        });
                        break;
                    case "diffArrays":
                        showDiffCode = [];
                        diff = Diff.diffArrays(oldArr, newArr);
                        diff.forEach(function(part){
                            var modifier = part.added ? "+ " : part.removed ? "- " : " ";
                            var valueArr = [];
                            part.value.forEach(function(item){
                                valueArr.push(modifier + item + '\n');
                            });
                            showDiffCode = showDiffCode.concat(valueArr);
                        });
                        break; 
                }

                var markdownCode = '```diff\n'+(showDiffCode)+'\n```';
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