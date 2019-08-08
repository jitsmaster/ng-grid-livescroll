"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DragSourceModel = (function () {
    function DragSourceModel(dragType, dragEvent, dataModel) {
        this.dragType = dragType;
        this.dragEvent = dragEvent;
        this.dataModel = dataModel;
    }
    return DragSourceModel;
}());
exports.DragSourceModel = DragSourceModel;
var Gravity = (function () {
    function Gravity() {
    }
    return Gravity;
}());
exports.Gravity = Gravity;
var DropTargetModel = (function () {
    function DropTargetModel(domNode, gravity, dragEvent, dataModel) {
        this.domNode = domNode;
        this.gravity = gravity;
        this.dragEvent = dragEvent;
        this.dataModel = dataModel;
    }
    DropTargetModel.prototype.acknowledgetDragBehavior = function () {
        this.dragEvent.preventDefault();
    };
    return DropTargetModel;
}());
exports.DropTargetModel = DropTargetModel;
var Coords = (function () {
    function Coords() {
    }
    return Coords;
}());
exports.Coords = Coords;
var BoxCoords = (function (_super) {
    __extends(BoxCoords, _super);
    function BoxCoords(node) {
        var _this = _super.call(this) || this;
        var styles = window.getComputedStyle(node);
        _this.x = node.scrollLeft;
        _this.y = node.scrollTop;
        _this.w = node.clientWidth;
        _this.h = node.clientHeight;
        _this.borderLeft = _this._processSize(styles.borderLeftWidth);
        _this.borderTop = _this._processSize(styles.borderTopWidth);
        return _this;
    }
    BoxCoords.prototype._processSize = function (sizeStr) {
        if (!sizeStr)
            return 0;
        if (sizeStr.indexOf("px") > -1)
            sizeStr = sizeStr.replace("px", "");
        var size = parseFloat(sizeStr);
        if (isNaN(size))
            return 0;
        return size;
    };
    /**
     * It is very important that w and h must be offset width and height
     */
    BoxCoords.prototype.getGravity = function (innerCoords) {
        //how offsetX and offsetY works:
        //left/top border is ignored, right/bottom border is included
        //so when calculating gravity, need to add the left/top border back
        var compensatedInnerCoords = {
            x: innerCoords.x + this.borderLeft,
            y: innerCoords.y + this.borderTop
        };
        //now use the compensated coords to compare against box
        return {
            horizontalPercentage: (compensatedInnerCoords.x / this.w) * 100,
            verticalPercentage: (compensatedInnerCoords.y / this.h) * 100
        };
    };
    return BoxCoords;
}(Coords));
exports.BoxCoords = BoxCoords;
