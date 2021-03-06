"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid = /** @class */ (function () {
    function Grid(rows, cols) {
        if (rows == undefined)
            throw new Error('Number of rows can\'t be undefined.');
        if (cols == undefined)
            throw new Error('Number of cols can\'t be undefined.');
        if (rows < 1)
            throw new Error('Number of rows must be >1');
        if (cols < 1)
            throw new Error('Number of cols must be >1');
        this._rows = rows;
        this._cols = cols;
        var arrsize = rows * cols;
        this.cells = new Array(arrsize);
    }
    Grid.prototype.arrayPosition = function (row, col) {
        return row * this.cols + col;
    };
    Grid.prototype.getRow = function (row) {
        var sRow = this.sanitizeRow(row);
        var result = [];
        for (var i = 0; i < this.cols; i++) {
            var arrpos = this.arrayPosition(sRow, i);
            result.push(this.cells[arrpos]);
        }
        return result;
    };
    Grid.prototype.getCol = function (col) {
        var sCol = this.sanitizeCol(col);
        var result = [];
        for (var i = 0; i < this.rows; i++) {
            var arrpos = this.arrayPosition(i, sCol);
            result.push(this.cells[arrpos]);
        }
        return result;
    };
    Grid.prototype.sanitizeRow = function (row) {
        if (!this.isRowValid(row))
            throw new Error("Row index must be >0 and <" + this.rows + ", but was " + row + ".");
        var sanitized;
        if (row < 0) {
            sanitized = row % (-this.rows) + this.rows;
        }
        else {
            sanitized = row % this.rows;
        }
        return sanitized;
    };
    Grid.prototype.sanitizeCol = function (col) {
        if (!this.isColValid(col))
            throw new Error("Col index must be >0 and <" + this.cols + ", but was " + col + ".");
        var sanitized;
        if (col < 0) {
            sanitized = col % (-this.cols) + this.cols;
        }
        else {
            sanitized = col % this.cols;
        }
        return sanitized;
    };
    Grid.prototype.isRowValid = function (row) {
        if (this.wrapRows)
            return true;
        if (row < 0)
            return false;
        if (row > this.rows)
            return false;
        return true;
    };
    Grid.prototype.isColValid = function (col) {
        if (this.wrapCols)
            return true;
        if (col < 0)
            return false;
        if (col > this.cols)
            return false;
        return true;
    };
    Grid.prototype.valueAt = function (row, col) {
        var sRow = this.sanitizeRow(row);
        var sCol = this.sanitizeCol(col);
        var arrpos = this.arrayPosition(sRow, sCol);
        return this.cells[arrpos];
    };
    Grid.prototype.valueAtOrUndefined = function (row, col) {
        if (!this.isRowValid(row))
            return undefined;
        if (!this.isColValid(col))
            return undefined;
        return this.valueAt(row, col);
    };
    Grid.prototype.insert = function (value, row, col) {
        var sRow = this.sanitizeRow(row);
        var sCol = this.sanitizeCol(col);
        var arrpos = this.arrayPosition(sRow, sCol);
        this.cells[arrpos] = value;
    };
    Grid.prototype.getCols = function () {
        var result = [];
        for (var i = 0; i < this.cols; i++) {
            result.push(this.getCol(i));
        }
        return result;
    };
    Grid.prototype.getRows = function () {
        var result = [];
        for (var i = 0; i < this.rows; i++) {
            result.push(this.getRow(i));
        }
        return result;
    };
    Grid.prototype.fill = function (value) {
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i] = value;
        }
    };
    Grid.prototype.getNeighbours = function (row, col) {
        var sRow = this.sanitizeRow(row);
        var sCol = this.sanitizeCol(col);
        var resultUnfiltered = [];
        // Col left of cell
        resultUnfiltered.push(this.valueAtOrUndefined(row + 1, col - 1));
        resultUnfiltered.push(this.valueAtOrUndefined(row, col - 1));
        resultUnfiltered.push(this.valueAtOrUndefined(row - 1, col - 1));
        // Col containing cell
        resultUnfiltered.push(this.valueAtOrUndefined(row + 1, col));
        resultUnfiltered.push(this.valueAtOrUndefined(row - 1, col));
        // Col right of cell
        resultUnfiltered.push(this.valueAtOrUndefined(row + 1, col + 1));
        resultUnfiltered.push(this.valueAtOrUndefined(row, col + 1));
        resultUnfiltered.push(this.valueAtOrUndefined(row - 1, col + 1));
        return resultUnfiltered.filter(function (value) { return (value !== undefined) ? true : false; });
    };
    Grid.prototype.toArray = function () {
        var result = [];
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) {
                var arrpos = this.arrayPosition(row, col);
                result[arrpos] = this.cells[arrpos];
            }
        }
        return result;
    };
    Grid.fromArray = function (array, rows, cols) {
        var result = new Grid(rows, cols);
        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
                var arrpos = row * cols + col;
                result.insert(array[arrpos], row, col);
            }
        }
        return result;
    };
    Object.defineProperty(Grid.prototype, "wrapRows", {
        get: function () {
            return this._wrapRows;
        },
        set: function (val) {
            this._wrapRows = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "wrapCols", {
        get: function () {
            return this._wrapCols;
        },
        set: function (val) {
            this._wrapCols = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "cols", {
        get: function () {
            return this._cols;
        },
        enumerable: true,
        configurable: true
    });
    return Grid;
}());
exports.Grid = Grid;
