// Type definitions for Angular JS 1.0
// Project: http://angularjs.org
// Definitions by: Diego Vilar <http://github.com/diegovilar>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


/// <reference path="jquery.d.ts" />

declare var MediaStreamTrack: {
    getSources(cb:(sourceinfos:{})=>void):void;
};

declare var navigator: {
    getUserMedia(o:any, cb1:any, cb2: any):void;
}


declare var Navigator: {
    getUserMedia(o:any, cb1:any, cb2: any):void;
}

//     $observe(name: string, fn:(value?:any)=>any):void;
