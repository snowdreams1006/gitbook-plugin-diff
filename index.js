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

module.exports = {
    book: {
        assets: "./dist",
        js: ["bundle.js"],
    },
    blocks: {
        simplemindmap: {
            process: function process(block) {
                var one = 'beep boop';
                var other = 'beep boob blah';

                var diff = Diff.diffChars(one, other);
                // console.log(diff);

                diff.forEach(function(part){
                    // console.log(part);

                  // green for additions, red for deletions
                  // grey for common parts
                  var color = part.added ? 'green' :
                    part.removed ? 'red' : 'grey';
                  process.stderr.write(part.value[color]);
                });

                console.log();






                // var pluginConfig = this.options.pluginsConfig["simple-mind-map"] || {};
                // var blockConfig = block || {};
                // var styleConfig = Object.assign({},(pluginConfig.style || {}), (blockConfig.kwargs.style || {}));
                // var customStyle = '';
                // if(styleConfig){
                //     for (var style in styleConfig) { 
                //         if (Object.prototype.hasOwnProperty.call(styleConfig, style)) { 
                //             customStyle += style + ": " + styleConfig[style] + ";";
                //         }
                //     }
                // }
                // var rawBody = block.body;
                // var result,type,text;
                // if ((result = regex.exec(rawBody)) !== null) {
                //     type = result[1];
                //     if(type){
                //         type = type.trim();
                //     }
                //     text = escapeHTML(JSON.stringify(result[2]));
                // }
                // var pluginType = pluginConfig.type;
                // var blockType = blockConfig.kwargs.type;
                // if(blockType){
                //     type = blockType;
                // }else{
                //     if(!type){
                //         type = pluginType;
                //     }
                // }
                // block.body = '<svg class="simple-mind-map" style="'+(customStyle)+'" data-lang-type="'+(type)+'" data-plugin-config="'+(escapeHTML(JSON.stringify(pluginConfig)))+'" data-block-config="'+(escapeHTML(JSON.stringify(blockConfig)))+'" data-svg-text="'+(text)+'"></svg>';
                return block;
            }
        }
    }
};




// module.exports = {
//     hooks: {
//         "init": function() {
//             this.log.debug.ln('init', this.options.pluginsConfig['diff']);
//         },
//         "finish": function() {
//             this.log.debug.ln('finish', this.options.pluginsConfig['diff']);
//         }
//     }
// };

// var colors = require('colors');

// console.log('hello'.green); // outputs green text
// console.log('i like cake and pies'.underline.red); // outputs red underlined text
// console.log('inverse the color'.inverse); // inverses the color
// console.log('OMG Rainbows!'.rainbow); // rainbow
// console.log('Run the trap'.trap); // Drops the bass

// var colors = require('colors/safe');

// console.log(colors.green('hello')); // outputs green text
// console.log(colors.red.underline('i like cake and pies')); // outputs red underlined text
// console.log(colors.inverse('inverse the color')); // inverses the color
// console.log(colors.rainbow('OMG Rainbows!')); // rainbow
// console.log(colors.trap('Run the trap')); // Drops the bass

// var colors = require('colors/safe');

// var name = 'Marak';
// console.log(colors.green('Hello %s'), name);
// outputs -> 'Hello Marak'