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

module.exports = {
    blocks: {
        diff: {
            process: function process(block) {
                // one =  [
                //         "Vue",
                //         "Python",
                //         "Java",
                //         "flutter",
                //         "springboot",
                //         "docker",
                //         "React",
                //         "小程序"
                // ];
                // other = [
                //         "Vuejs",
                //         "Python",
                //         "Js",
                //         "flutter",
                //         "springboot",
                //         "docker",
                //         "React"
                // ];

                // console.log("diffArrays:one<-->other");
                // console.log(one);
                // console.log(other);
                // console.log();

                // // diffArrays
                // showDiffCode = [];
                // diff = Diff.diffArrays(one, other);
                // console.log(diff);
                // diff.forEach(function(part){
                //     var color = part.added ? '+' :
                //     part.removed ? '-' : '';

                //     var value = [];
                //     part.value.forEach(function(item){
                //         value.push(color+item);
                //     });
                //     showDiffCode = showDiffCode.concat(value);
                // });
                // console.log("diffArrays");
                // console.log(showDiffCode);
                // console.log();

                var pluginConfig = this.options.pluginsConfig["diff"] || {};
                var blockConfig = block || {};
                var rawBody = block.body;
                console.log(rawBody);

                // var result,type,text;
                // if ((result = regex.exec(rawBody)) !== null) {
                //     type = result[1];
                //     if(type){
                //         type = type.trim();
                //     }
                //     text = escapeHTML(JSON.stringify(result[2]));
                // }

                var pluginMethod = pluginConfig.method || "diffLines";
                var blockMethod = blockConfig.kwargs.method;
                if(!blockMethod){
                    blockMethod = pluginMethod;
                }

                // 新字符串相对于旧字符串发生了哪些改变
                var oldArr = 'beep boop';
                var newArr = 'beep boob blah';

                // 支持方法:diffChars diffWords diffWordsWithSpace diffLines diffTrimmedLines diffSentences diffCss
                // diffJson diffArrays

                // diffChars
                var showDiffCode = "";
                var diff = Diff.diffChars(one, other);
                diff.forEach(function(part){
                    var modifier = part.added ? "+" : part.removed ? "-" : "";
                    showDiffCode += modifier + part.value + '\n';
                });
                console.log("diffChars");
                console.log(showDiffCode);
                console.log();

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