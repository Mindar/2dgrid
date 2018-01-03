export declare class Grid<T> {
    private cells;
    private rows;
    private cols;
    private wrapRows;
    private wrapCols;
    constructor(rows: number, cols: number);
    private arrayPosition(row, col);
    getRow(row: number): T[];
    getCol(col: number): T[];
    sanitizeRow(row: number): number;
    sanitizeCol(col: number): number;
    isRowValid(row: number): boolean;
    isColValid(col: number): boolean;
    valueAt(row: number, col: number): T;
    isEmtpy(row: number, col: number): boolean;
    insert(value: T, row: number, col: number): void;
}
