export declare class Grid<T> {
    private cells;
    private _rows;
    private _cols;
    private _wrapRows;
    private _wrapCols;
    constructor(rows: number, cols: number);
    private arrayPosition(row, col);
    getRow(row: number): T[];
    getCol(col: number): T[];
    sanitizeRow(row: number): number;
    sanitizeCol(col: number): number;
    isRowValid(row: number): boolean;
    isColValid(col: number): boolean;
    valueAt(row: number, col: number): T;
    valueAtOrUndefined(row: number, col: number): T | undefined;
    insert(value: T, row: number, col: number): void;
    getCols(): Array<Array<T>>;
    getRows(): Array<Array<T>>;
    fill(value: T): void;
    getNeighbours(row: number, col: number): T[];
    toArray(): T[];
    static fromArray<T>(array: T[], rows: number, cols: number): Grid<T>;
    wrapRows: boolean;
    wrapCols: boolean;
    readonly rows: number;
    readonly cols: number;
}
