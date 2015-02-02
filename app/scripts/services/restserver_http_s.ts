/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../common/todoItem.ts"/>
'use strict';

module Todo {
    /**
     * A class that handles inserting and listing to a REST service using $http
     */

    export class RestServer {
        sig = 'RestServer'; // I always do this to help debugging DI, and as my first test
        TASKLIST_ID = 'MDM4NjIwODI0NzAwNDQwMjQ2MjU6OTEzMzE4NTkxOjA';
        http: ng.IHttpService;


        //URL = "/tasks/v1/lists/tasklist/tasks"; // local test server URL on sme server
        URL = "http://localhost:8080/tasks/v1/lists/MDM4NjIwODI0NzAwNDQwMjQ2MjU6OTEzMzE4NTkxOjA/tasks"; // local test server URL on different server
        //URL = "https://www.googleapis.com/tasks/v1/lists/MDM4NjIwODI0NzAwNDQwMjQ2MjU6OTEzMzE4NTkxOjA/tasks"; // Google tasks

        static $inject = ['$http']; // Angular will inject the Data model service
        constructor($http) {
            this.http = $http;

            // set a default Authorization header to include an access token from somewhere
            $http.defaults.headers.common.Authorization = 'Bearer ' + this.getAccessToken();
        }


        /**
         * return an access token. Where an access token is fetched from varies from service to service.
         * In the case of Google, one would normally call gapi.auth.getToken()
         *
         * @return the access token string
         */
        getAccessToken(): string {
            return "ya29.DgEwFu3BiRl49KnUdfvHX07GkrlpeTrHZ-ytE5dZGiMAXipcpiyuiT4e7n_q7N7lul_ktOmEviR0pA";
        }


        /**
         * Insert a new Task by POSTing to Task endpoint
         */
        insert(todo: Todo, retryCounter ? : number): ng.IHttpPromise < any > {
            // post returns a promise. Assign it to a var so we can define an error function here
            // and also pass the promise to the caller to deal with success
            var promise = this.http.post(this.URL, {
                "title": todo.title
            });
            // deal with errors, eg authentication, retry with exponential backoff, report to user, etc
            promise.error((data, status, headers, config) => {
                    if (status == 401) {
                        console.warn("Need to acquire a new Access Token and resubmit");
                        //TODO fetch an access token from somewhere
                        retryCounter ? retryCounter-- : retryCounter = 5;
                        if (retryCounter > 1) {
                            this.update(todo, retryCounter);
                        }
                    }
                })
                // return the promise so the caller can deal with success
            return promise;
        }

        /**
         * Update an existing Task by PUTing to Task endpoint
         * logic is mich the same as insert
         */
        update(todo: Todo, retryCounter ? : number): ng.IHttpPromise < any > {
            var promise = this.http.put(this.URL + '/' + todo.id, todo);
            promise.error((data, status, headers, config) => {
                if (status == 401) {
                    console.warn("Need to acquire a new Access Token and resubmit");
                    //TODO fetch an access token from somewhere
                    retryCounter ? retryCounter-- : retryCounter = 5;
                    if (retryCounter > 1) {
                        this.update(todo, retryCounter);
                    }
                }
            })
            return promise;
        }

        /**
         * fetch list of Tasks by GETting from Task endpoint
         */
        list(retryCounter ? : number): ng.IHttpPromise < any > {
            var promise = this.http.get(this.URL);
            promise.error((data, status, headers, config) => {
                if (status == 401) {
                    console.warn("Need to acquire a new Access Token and resubmit");
                    retryCounter ? retryCounter-- : retryCounter = 5;
                    if (retryCounter > 1) {
                        this.list(retryCounter);
                    }

                }
            })
            return promise;
        }
    }
}

angular.module('ngtodoApp')
    .service('RestServer', Todo.RestServer);
