/**
 * Server-side TypeScript worker.
 *
 * @copyright 2011, Ajax.org B.V.
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */
define("ext/cloud9-typescript/cloud9-typescript-worker", ["require", "exports", "module"], function(require, exports, module) {
    
var baseLanguageHandler = require("ext/linereport/linereport_base");
var handler = module.exports = Object.create(baseLanguageHandler);

handler.disabled = false;

handler.handlesLanguage = function(language) {
    return language === 'typescript';
};

handler.init = function(callback) {
    handler.initReporter("tsc --help", "npm install -g typescript", function(err, output) {
        if (err) {
            console.log("Unable to install typescript\n" + output);
            handler.disabled = true;
        }
        callback();
    });
};

handler.analyze = function(doc, fullAst, callback) {
    if (handler.disabled)
        return callback();
    handler.invokeReporter("tsc " + handler.path.replace(/.*\/workspace/, handler.workspaceDir), this.$postProcess, callback);
};

/**
 * Postprocess output to match the expected format of
 * line:column: error message.
 */
handler.$postProcess = function(line) {
    return line.replace(/^(.*?)\((\d+),(\d+)\): (.*)/, "$2:$3: $4");
};

});


