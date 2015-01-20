// Wrapped in JavaScript, to avoid cross-origin restrictions, created using wrap-in-js.sh
define(function() {
return '/**\n' +
' * Server-side TypeScript worker.\n' +
' *\n' +
' * @copyright 2011, Ajax.org B.V.\n' +
' * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>\n' +
' */\n' +
'define("ext/cloud9-typescript/cloud9-typescript-worker", ["require", "exports", "module"], function(require, exports, module) {\n' +
'    \n' +
'var baseLanguageHandler = require("ext/linereport/linereport_base");\n' +
'var handler = module.exports = Object.create(baseLanguageHandler);\n' +
'\n' +
'handler.disabled = false;\n' +
'\n' +
'handler.handlesLanguage = function(language) {\n' +
'    return language === \'typescript\';\n' +
'};\n' +
'\n' +
'handler.init = function(callback) {\n' +
'    handler.initReporter("tsc --help", "npm install -g typescript", function(err, output) {\n' +
'        if (err) {\n' +
'            console.log("Unable to install typescript\\n" + output);\n' +
'            handler.disabled = true;\n' +
'        }\n' +
'        callback();\n' +
'    });\n' +
'};\n' +
'\n' +
'handler.analyze = function(doc, fullAst, callback) {\n' +
'    if (handler.disabled)\n' +
'        return callback();\n' +
'    handler.invokeReporter("tsc " + handler.path.replace(/.*\\/workspace/, handler.workspaceDir), this.$postProcess, callback);\n' +
'};\n' +
'\n' +
'/**\n' +
' * Postprocess output to match the expected format of\n' +
' * line:column: error message.\n' +
' */\n' +
'handler.$postProcess = function(line) {\n' +
'    return line.replace(/^(.*?)\\((\\d+),(\\d+)\\): (.*)/, "$2:$3: $4");\n' +
'};\n' +
'\n' +
'});\n' +
'\n' +
'\n' +
'';});
