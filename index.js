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
var colors = require('colors');
var Diff = require('diff');

// Extract the block of code to be compared
var regex = /^\s*```(?:.*[\r\n]+)?((?:.*[\r\n]+)+?)??\s*```$/igm;

/*
 * render diff code block as markdown
 */
function renderAsMarkdown(method,oldStr,newStr,options){
    var showMarkdownDiffCode = "";
    var diff;
    switch (method) {
        case "diffChars":
            options = Object.assign({}, (options || {}),{"ignoreCase":false});
            diff = Diff.diffChars(oldStr, newStr,options);
            showMarkdownDiffCode = processSimpleTypeAsMarkdown(diff,showMarkdownDiffCode)
            break; 
        case "diffWords":
            options = Object.assign({}, (options || {}),{"ignoreCase":false});
            diff = Diff.diffWords(oldStr, newStr,options);
            showMarkdownDiffCode = processSimpleTypeAsMarkdown(diff,showMarkdownDiffCode)
            break; 
        case "diffWordsWithSpace":
            options = Object.assign({}, (options || {}),{"ignoreCase":false});
            diff = Diff.diffWordsWithSpace(oldStr, newStr,options);
            showMarkdownDiffCode = processSimpleTypeAsMarkdown(diff,showMarkdownDiffCode)
            break; 
        case "diffLines":
            options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
            diff = Diff.diffLines(oldStr, newStr,options);
            showMarkdownDiffCode = processSimpleTypeAsMarkdown(diff,showMarkdownDiffCode)
            break; 
        case "diffTrimmedLines":
            options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
            diff = Diff.diffTrimmedLines(oldStr, newStr,options);
            showMarkdownDiffCode = processComplexTypeAsMarkdown(diff,showMarkdownDiffCode)
            break; 
        case "diffSentences":
            options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
            diff = Diff.diffSentences(oldStr, newStr,options);
            showMarkdownDiffCode = processComplexTypeAsMarkdown(diff,showMarkdownDiffCode)
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
            var diffObj = [];
            diff.forEach(function(part){
                // Render as markdown result
                var modifier = part.added ? "+ " : part.removed ? "- " : "  ";
                part.value.split("\n").forEach(function(item){
                    if(item){
                        if(item == "{" || item == "}"){
                            showMarkdownDiffCode +=  item + "\n";
                        }else{
                            showMarkdownDiffCode += modifier + item + "\n";
                        }
                    }
                });
            });
            break;
        case "diffArrays":
            // Render as markdown result
            if(Object.prototype.toString.call(oldStr) === '[object String]'){
                oldStr = JSON.parse(oldStr);
            }
            if(Object.prototype.toString.call(newStr) === '[object String]'){
                newStr = JSON.parse(newStr);
            }
            diff = Diff.diffArrays(oldStr, newStr);
            var diffArr = [];
            diff.forEach(function(part){
                var modifier = part.added ? "+ " : part.removed ? "- " : "  ";
                part.value.forEach(function(item){
                    if(item){
                        diffArr.push(modifier + item);
                    }
                });
            });
            showMarkdownDiffCode += "[\n";
            diffArr.forEach(function(diffItem){
                showMarkdownDiffCode += diffItem + "\n";
            });
            showMarkdownDiffCode += "]";
            break;
    }
    return showMarkdownDiffCode;
}

/*
 * process simple type for rendering as markdown
 */
function processSimpleTypeAsMarkdown(diff,showMarkdownDiffCode){
    diff.forEach(function(part){
        // Render as markdown result
        var modifier = part.added ? "+ " : part.removed ? "- " : "  ";
        showMarkdownDiffCode += modifier + part.value + "\n";
    });
    return showMarkdownDiffCode;
}

/*
 * process complex type for rendering as markdown
 */
function processComplexTypeAsMarkdown(diff,showMarkdownDiffCode){
    diff.forEach(function(part){
        // Render as markdown result
        var modifier = part.added ? "+ " : part.removed ? "- " : "  ";
        part.value.split("\n").forEach(function(item,index){
            if(item){
                showMarkdownDiffCode += modifier + item + "\n";
            }
        });
    });
    return showMarkdownDiffCode;
}

/*
 * render diff code block as console
 */
function renderAsConsole(method,oldStr,newStr,options){
    var showConsoleDiffCode = "";
    var diff;
    switch (method) {
        case "diffChars":
            options = Object.assign({}, (options || {}),{"ignoreCase":false});
            diff = Diff.diffChars(oldStr, newStr,options);
            showConsoleDiffCode = processSimpleTypeAsConsole(diff,showConsoleDiffCode);
          break; 
        case "diffWords":
            options = Object.assign({}, (options || {}),{"ignoreCase":false});
            diff = Diff.diffWords(oldStr, newStr,options);
            showConsoleDiffCode = processSimpleTypeAsConsole(diff,showConsoleDiffCode);
            break; 
        case "diffWordsWithSpace":
            options = Object.assign({}, (options || {}),{"ignoreCase":false});
            diff = Diff.diffWordsWithSpace(oldStr, newStr,options);
            showConsoleDiffCode = processSimpleTypeAsConsole(diff,showConsoleDiffCode);
            break; 
        case "diffLines":
            options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
            diff = Diff.diffLines(oldStr, newStr,options);
            showConsoleDiffCode = processSimpleTypeAsConsole(diff,showConsoleDiffCode);
            break; 
        case "diffTrimmedLines":
            options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
            diff = Diff.diffTrimmedLines(oldStr, newStr,options);
            showConsoleDiffCode = processComplexTypeAsConsole(diff,showConsoleDiffCode);
            break; 
        case "diffSentences":
            options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
            diff = Diff.diffSentences(oldStr, newStr,options);
            showConsoleDiffCode = processComplexTypeAsConsole(diff,showConsoleDiffCode);
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
            var diffObj = [];
            diff.forEach(function(part){
                // Render as console resulut
                var color = part.added ? 'green' : part.removed ? 'red' : 'grey';
                var colorCode = part.value;
                colorCode.split("\n").forEach(function(item,index){
                    if(item){
                        if ('[object String]' === Object.prototype.toString.call(item)){
                            showConsoleDiffCode += item[color] + "\n";
                        }else{
                            showConsoleDiffCode += colors[color](item) + "\n";
                        }
                    }
                });
            });
            break;
        case "diffArrays":
            if(Object.prototype.toString.call(oldStr) === '[object String]'){
                oldStr = JSON.parse(oldStr);
            }
            if(Object.prototype.toString.call(newStr) === '[object String]'){
                newStr = JSON.parse(newStr);
            }
            diff = Diff.diffArrays(oldStr, newStr);

            // Render as console resulut
            var consoleDiffArr = [];
            diff.forEach(function(part){
                var color = part.added ? 'green' : part.removed ? 'red' : 'grey';
                var colorCode = part.value;
                colorCode.forEach(function(item){
                    if(item){
                        if ('[object String]' === Object.prototype.toString.call(item)){
                            consoleDiffArr.push(item[color]);
                        }else{
                            consoleDiffArr.push(colors[color](item));
                        }
                    }
                });
            });
            showConsoleDiffCode += "[\n";
            consoleDiffArr.forEach(function(diffItem){
                showConsoleDiffCode += "  " + diffItem + "\n";
            });
            showConsoleDiffCode += "]";
            break;
    }
    return showConsoleDiffCode;
}

/*
 * process simple type for rendering as console
 */
function processSimpleTypeAsConsole(diff,showConsoleDiffCode){
    diff.forEach(function(part){
        // Render as console resulut
        var color = part.added ? "green" : part.removed ? "red" : "grey";
        var colorCode = part.value;
        if ('[object String]' === Object.prototype.toString.call(colorCode)){
            showConsoleDiffCode += colorCode[color];
        }else{
            showConsoleDiffCode += colors[color](colorCode);
        }
    });
    return showConsoleDiffCode;
}

/*
 * process complex type for rendering as console
 */
function processComplexTypeAsConsole(diff,showConsoleDiffCode){
    diff.forEach(function(part){
        // Render as console resulut
        var color = part.added ? 'green' : part.removed ? 'red' : 'grey';
        var colorCode = part.value;
        colorCode.split("\n").forEach(function(item,index){
            if(item){
                if ('[object String]' === Object.prototype.toString.call(item)){
                    showConsoleDiffCode += item[color] + "\n";
                }else{
                    showConsoleDiffCode += colors[color](item) + "\n";
                }
            }
        });
    });
    return showConsoleDiffCode;
}

/*
 * render diff code block as html
 */
function renderAsHtml(method,oldStr,newStr,options){
    var showHtmlDiffCode = "";
    var diff;
    switch (method) {
        case "diffChars":
            options = Object.assign({}, (options || {}),{"ignoreCase":false});
            diff = Diff.diffChars(oldStr, newStr,options);
            showHtmlDiffCode = processSimpleTypeAsHtml(diff,showHtmlDiffCode);
          break; 
        case "diffWords":
            options = Object.assign({}, (options || {}),{"ignoreCase":false});
            diff = Diff.diffWords(oldStr, newStr,options);
            showHtmlDiffCode = processSimpleTypeAsHtml(diff,showHtmlDiffCode);
            break; 
        case "diffWordsWithSpace":
            options = Object.assign({}, (options || {}),{"ignoreCase":false});
            diff = Diff.diffWordsWithSpace(oldStr, newStr,options);
            showHtmlDiffCode = processSimpleTypeAsHtml(diff,showHtmlDiffCode);
            break; 
        case "diffLines":
            options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
            diff = Diff.diffLines(oldStr, newStr,options);
            showHtmlDiffCode = processSimpleTypeAsHtml(diff,showHtmlDiffCode);
            break; 
        case "diffTrimmedLines":
            options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
            diff = Diff.diffTrimmedLines(oldStr, newStr,options);
            showHtmlDiffCode = processComplexTypeAsHtml(diff,showHtmlDiffCode);
            break; 
        case "diffSentences":
            options = Object.assign({}, (options || {}),{"ignoreCase":false,"newlineIsToken":false});
            diff = Diff.diffSentences(oldStr, newStr,options);
            showHtmlDiffCode = processComplexTypeAsHtml(diff,showHtmlDiffCode);
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
            var diffObj = [];
            diff.forEach(function(part){
                // Render as html resulut
                var styleColor = part.added ? 'text-decoration: none;color: #406619;background: #eaf2c2' : part.removed ? 'text-decoration: none;color: #b30000;background: #fadad7;' : 'text-decoration: none;color: grey;background: #cccccc;';
                var spanColorCode = part.value;
                spanColorCode.split("\n").forEach(function(item,index){
                    if(item){
                        if(item == "{" || item == "}"){
                            showHtmlDiffCode += `<span style="${styleColor}">${item}</span><br>`;
                        }else{
                            showHtmlDiffCode += `&nbsp;&nbsp;<span style="${styleColor}">${item}</span><br>`;
                        }
                    }
                });
            });
            break;
        case "diffArrays":
            if(Object.prototype.toString.call(oldStr) === '[object String]'){
                oldStr = JSON.parse(oldStr);
            }
            if(Object.prototype.toString.call(newStr) === '[object String]'){
                newStr = JSON.parse(newStr);
            }
            diff = Diff.diffArrays(oldStr, newStr);
            
            // Render as html resulut
            var htmlDiffArr = [];
            diff.forEach(function(part){
                var styleColor = part.added ? 'text-decoration: none;color: #406619;background: #eaf2c2' : part.removed ? 'text-decoration: none;color: #b30000;background: #fadad7;' : 'text-decoration: none;color: grey;background: #cccccc;';
                var spanColorCode = part.value;
                spanColorCode.forEach(function(item){
                    if(item){
                        htmlDiffArr.push(`<span style="${styleColor}">${item}</span>`);
                    }
                });
            });
            showHtmlDiffCode += '<span style="text-decoration: none;color: grey;background: #cccccc;">[</span><br>';
            htmlDiffArr.forEach(function(diffItem){
                showHtmlDiffCode += "&nbsp;&nbsp;" + diffItem + "<br>";
            });
            showHtmlDiffCode += '<span style="text-decoration: none;color: grey;background: #cccccc;">]</span><br>';
            break;
    }
    return showHtmlDiffCode;
}

/*
 * process simple type for rendering as html
 */
function processSimpleTypeAsHtml(diff,showHtmlDiffCode){
    diff.forEach(function(part){
        // Render as html resulut
        var styleColor = part.added ? 'text-decoration: none;color: #406619;background: #eaf2c2' : part.removed ? 'text-decoration: none;color: #b30000;background: #fadad7;' : 'text-decoration: none;color: grey;background: #cccccc;';
        var spanColorCode = part.value;
        var suffix = spanColorCode.lastIndexOf("\n") != -1 ? "<br>" : "";
        showHtmlDiffCode += `<span style="${styleColor}">${spanColorCode}</span>${suffix}`;
    });
    return showHtmlDiffCode;
}

/*
 * process complex type for rendering as html
 */
function processComplexTypeAsHtml(diff,showHtmlDiffCode){
    diff.forEach(function(part){
        // Render as html resulut
        var styleColor = part.added ? 'text-decoration: none;color: #406619;background: #eaf2c2' : part.removed ? 'text-decoration: none;color: #b30000;background: #fadad7;' : 'text-decoration: none;color: grey;background: #cccccc;';
        var spanColorCode = part.value;
        spanColorCode.split("\n").forEach(function(item,index){
            if(item){
                showHtmlDiffCode += `<span style="${styleColor}">${item}</span><br>`;
            }
        });
    });
    return showHtmlDiffCode;
}

module.exports = {
    blocks: {
        diff: {
            process: function process(block) {
                // Gets the configuration of the current comparison object
                var pluginConfig = this.options.pluginsConfig["diff"] || {};
                var blockConfig = block || {};
                var rawBody = block.body;
                this.log.debug.ln('pluginConfig', pluginConfig);
                this.log.debug.ln('blockConfig', blockConfig);

                // Gets the contents of the comparison object
                var result,textArr = [];
                while ((result = regex.exec(rawBody)) !== null) {
                    textArr.push(result[1]);
                }

                // Sets the current object comparison method
                var pluginMethod = pluginConfig.method || "diffChars";
                var blockMethod = blockConfig.kwargs.method;
                var method = blockMethod;
                if(!method){
                    method = pluginMethod;
                }
                this.log.debug.ln('method', method);

                // Sets the current object comparison type
                var pluginType = pluginConfig.type || "markdown";
                var blockType = blockConfig.kwargs.type;
                var type = blockType;
                if(!type){
                    type = pluginType;
                }
                this.log.debug.ln('type', type);

                // Sets the current object comparison options
                var pluginOptions = pluginConfig.options;
                var blockOptions = blockConfig.kwargs.options;
                var options = blockOptions;
                if(!options){
                    options = pluginOptions;
                }
                this.log.debug.ln('options', options);
                
                // Gets the contents of the object to be compared
                if (textArr.length != 2){
                    throw new Error('Only Support 2 code block');
                }
                var oldStr = textArr[0];
                var newStr = textArr[1];
                this.log.debug.ln('oldStr', oldStr);
                this.log.debug.ln('newStr', newStr);

                // Render the comparison results
                switch (type) {
                    case "markdown":
                        // Render as markdown results
                        var showMarkdownDiffCode = renderAsMarkdown(method,oldStr,newStr,options);
                        var markdownCode = '```diff\n'+showMarkdownDiffCode+'```';
                        return new Promise(resolve => {
                            resolve(this.book.renderBlock('markdown', markdownCode).then(function(html) {
                                return html;
                            }));
                        }).then(res => {
                            return res;
                        });
                    case "console":
                        // Render as console results
                        var showConsoleDiffCode = renderAsConsole(method,oldStr,newStr,options)
                        console.log(showConsoleDiffCode);
                        return "";
                    case "html":
                        // Render as html results
                        var showHtmlDiffCode = renderAsHtml(method,oldStr,newStr,options)
                        return showHtmlDiffCode;
                }
            }
        }
    }
};