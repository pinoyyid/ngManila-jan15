/// <reference path="defs/express/express.d.ts"/>
var NgTodo;
(function (NgTodo) {
    var Main = (function () {
        function Main() {
            this.express = require('express');
            this.path = require('path');
            // Constants
            this.PORT = 8080;
            // App
            this.app = this.express();
            this.app.use(this.express.bodyParser());
            // ROUTES 
            this.app.use(this.express.static(this.path.join(__dirname, '../app'))); //  "public" off of current is root
            this.app.get('/tasks/v1/lists/MDM4NjIwODI0NzAwNDQwMjQ2MjU6OTEzMzE4NTkxOjA/tasks', this.getList);
            this.app.post('/tasks/v1/lists/MDM4NjIwODI0NzAwNDQwMjQ2MjU6OTEzMzE4NTkxOjA/tasks', this.postInsert);
            this.app.put('/tasks/v1/lists/MDM4NjIwODI0NzAwNDQwMjQ2MjU6OTEzMzE4NTkxOjA/tasks/*', this.postInsert);
            this.app.patch('/tasks/v1/lists/MDM4NjIwODI0NzAwNDQwMjQ2MjU6OTEzMzE4NTkxOjA/tasks/*', this.postInsert);
            this.app.options(/.*/, this.options);
            this.app.listen(this.PORT);
            console.log('Running on http://localhost:' + this.PORT);
        }
        /**
        * do CORS preflight
        Access-Control-Allow-Origin: http://yourdomain.com
        Access-Control-Allow-Methods: GET, POST
        Access-Control-Allow-Headers: X-Custom-Header
        'Access-Control-Allow-Origin': req.headers.origin,
        */
        Main.prototype.options = function (req, res) {
            res.set({
                'Access-Control-Allow-Origin': req.headers.origin,
                'Access-Control-Allow-Headers': 'Authorization, X-Custom-Header, Content-Type',
                'Access-Control-Allow-Methods:': 'GET, POST, PUT, PATCH, DELETE'
            });
            res.json('OK');
        };
        Main.prototype.addCorsHeader = function (req, res) {
            res.set({
                'Access-Control-Allow-Origin': req.headers.origin
            });
        };
        /** process an list get
        // return an object containing an items array
        // NB. There is no server side persistence, so although an insert was "successful", nothing is actually saved nor returned by the list method
        */
        Main.prototype.getList = function (req, res) {
            // check for a valid auth header
            var error = {
                message: '',
                status: 0
            };
            if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer') != 0) {
                error.status = 401;
                error.message = "Missing 'Authorization: Bearer xxx' header";
                console.error("thjis", this);
                myapp.addCorsHeader(req, res);
                res.status(error.status).json(error);
                console.log(res);
                return;
            }
            var resp = {
                "kind": "tasks#tasks",
                "etag": "etag1",
                "items": []
            };
            resp.items.push({
                id: "id-1",
                title: "title-1"
            });
            resp.items.push({
                id: "id-2",
                title: "title-2"
            });
            resp.items.push({
                id: "id-3",
                title: "title-3"
            });
            resp.items.push({
                id: "id-4",
                title: "title-4"
            });
            myapp.addCorsHeader(req, res);
            res.json(resp);
        };
        /** process an insert POST
  // a successful insert returns the task with a valid ID
  // NB. There is no server side persistence, so although an insert was "successful", nothing is actually saved nor returned by the list method
  */
        Main.prototype.postInsert = function (req, res) {
            // default error object
            var error = {
                message: '',
                status: 0
            };
            console.log(req.headers);
            console.log(req.body);
            // check for a valid auth header
            if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer') != 0) {
                error.status = 401;
                error.message = "Missing 'Authorization: Bearer xxx' header";
                myapp.addCorsHeader(req, res);
                res.status(error.status).json(error);
                return;
            }
            // check task contains a title
            if (!req.body.title) {
                error.status = 400;
                error.message += ' Missing title';
            }
            // reject any client format errors
            if (error.status > 0) {
                res.status(error.status).json(error);
                return;
            }
            // here for a valid request
            // add a random ID (for a POST/insert only) and return task object
            if (req.method == 'POST') {
                req.body.id = "id" + new Date().valueOf();
            }
            myapp.addCorsHeader(req, res);
            res.json(req.body);
        };
        return Main;
    })();
    NgTodo.Main = Main;
})(NgTodo || (NgTodo = {}));
// run the app
var myapp = new NgTodo.Main();
