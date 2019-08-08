"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("rxjs/Rx");
var AsyncPipeService = (function () {
    function AsyncPipeService(currentState) {
        this.currentState = currentState;
        this._subject = new Rx_1.BehaviorSubject(this.currentState);
        this.model = this._subject.asObservable();
    }
    AsyncPipeService.prototype.triggerUpdate = function (model) {
        this.currentState = model;
        this._subject.next(model);
        return this.model;
    };
    return AsyncPipeService;
}());
exports.AsyncPipeService = AsyncPipeService;
