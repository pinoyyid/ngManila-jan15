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
            this.app.use(this.express.static(this.path.join(__dirname, 'views'))); //  "public" off of current is root
            this.app.get('/tasks/v1/lists/tasklist/tasks', this.getList);
            this.app.post('/tasks/v1/lists/tasklist/tasks', this.postInsert);
            this.app.listen(this.PORT);
            console.log('Running on http://localhost:' + this.PORT);
        }
        // process an list get
        // return an object containing an items array
        // NB. There is no server side persistence, so although an insert was "successful", nothing is actually saved nor returned by the list method
        //
        Main.prototype.getList = function (req, res) {
            var resp = { "kind": "tasks#tasks", "etag": "etag1", "items": [] };
            resp.items.push({ id: "id-1", title: "title-1" });
            resp.items.push({ id: "id-2", title: "title-2" });
            resp.items.push({ id: "id-3", title: "title-3" });
            resp.items.push({ id: "id-4", title: "title-4" });
            res.json(resp);
        };
        // process an insert POST
        // a successful insert returns the task with a valid ID
        // NB. There is no server side persistence, so although an insert was "successful", nothing is actually saved nor returned by the list method
        //
        Main.prototype.postInsert = function (req, res) {
            // default error object
            var error = { message: '', status: 0 };
            console.log(req.headers);
            console.log(req.body);
            // check for a valid auth header
            if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer') != 0) {
                error.status = 400;
                error.message = "Missing 'Authorization: Bearer xxx' header";
                res.status(error.status).json(error);
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
            // add a random ID and return task object
            req.body.id = "id" + new Date().valueOf();
            res.json(req.body);
        };
        return Main;
    })();
    NgTodo.Main = Main;
})(NgTodo || (NgTodo = {}));
// run the app
var myapp = new NgTodo.Main();
