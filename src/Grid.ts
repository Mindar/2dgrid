export class Grid <T> {
	private cells: T[];
	private _rows: number;
	private _cols: number;
	private _wrapRows: boolean;
	private _wrapCols: boolean;

	constructor(rows: number, cols: number){
		if(rows == undefined) throw new Error('Number of rows can\'t be undefined.');
		if(cols == undefined) throw new Error('Number of cols can\'t be undefined.');
		if(rows < 1) throw new Error('Number of rows must be >1');
		if(cols < 1) throw new Error('Number of cols must be >1');

		this._rows = rows;
		this._cols = cols;
		const arrsize = rows * cols;
		this.cells = new Array(arrsize);
	}

	private arrayPosition(row: number, col: number): number{
		return row * this.cols + col;
	}

	public getRow(row: number): T[]{
		const sRow = this.sanitizeRow(row);
		const result: T[] = [];

		for(let i = 0; i < this.cols; i++){
			const arrpos = this.arrayPosition(sRow, i);
			result.push(this.cells[arrpos]);
		}

		return result;
	}

	public getCol(col: number): T[]{
		const sCol = this.sanitizeCol(col);
		const result: T[] = [];

		for(let i = 0; i < this.rows; i++){
			const arrpos = this.arrayPosition(i, sCol);
			result.push(this.cells[arrpos]);
		}

		return result;
	}

	public sanitizeRow(row: number): number{
		if(!this.isRowValid(row)) throw new Error(`Row index must be >0 and <${this.rows}, but was ${row}.`);
		
		let sanitized: number;
		
		if(row < 0){
			sanitized = row % (-this.rows) + this.rows;
		} else {
			sanitized = row % this.rows;
		}

		return sanitized;
	}

	public sanitizeCol(col: number): number{
		if(!this.isColValid(col)) throw new Error(`Col index must be >0 and <${this.cols}, but was ${col}.`);
		
		let sanitized: number;
		
		if(col < 0){
			sanitized = col % (-this.cols) + this.cols;
		} else {
			sanitized = col % this.cols;
		}

		return sanitized;
	}

	public isRowValid(row: number): boolean{
		if(this.wrapRows) return true;

		if(row < 0) return false;
		if(row > this.rows) return false;

		return true;
	}

	public isColValid(col: number): boolean{
		if(this.wrapCols) return true;

		if(col < 0) return false;
		if(col > this.cols) return false;

		return true;
	}

	public valueAt(row: number, col: number): T {
		const sRow = this.sanitizeRow(row);
		const sCol = this.sanitizeCol(col);

		const arrpos = this.arrayPosition(sRow, sCol);
		return this.cells[arrpos];
	}

	public valueAtOrUndefined(row: number, col: number): T | undefined {
		if(!this.isRowValid(row)) return undefined;
		if(!this.isColValid(col)) return undefined;

		return this.valueAt(row, col);
	}

	public insert(value: T, row: number, col: number): void{
		const sRow = this.sanitizeRow(row);
		const sCol = this.sanitizeCol(col);

		const arrpos = this.arrayPosition(sRow, sCol);
		this.cells[arrpos] = value;
	}

	public getCols(): Array<Array<T>>{
		const result = [];
		for(let i = 0; i < this.cols; i++){
			result.push(this.getCol(i));
		}
		return result;
	}

	public getRows(): Array<Array<T>>{
		const result = [];
		for(let i = 0; i < this.rows; i++){
			result.push(this.getRow(i));
		}
		return result;
	}

	public fill(value: T): void{
		for(let i = 0; i < this.cells.length; i++){
			this.cells[i] = value;
		}
	}

	public getNeighbours(row: number, col:number): T[]{
		const sRow = this.sanitizeRow(row);
		const sCol = this.sanitizeCol(col);

		const resultUnfiltered: any[] = [];

		// Col left of cell
		resultUnfiltered.push(this.valueAtOrUndefined(row + 1, col - 1));
		resultUnfiltered.push(this.valueAtOrUndefined(row    , col - 1));
		resultUnfiltered.push(this.valueAtOrUndefined(row - 1, col - 1));

		// Col containing cell
		resultUnfiltered.push(this.valueAtOrUndefined(row + 1, col));
		resultUnfiltered.push(this.valueAtOrUndefined(row - 1, col));
		
		// Col right of cell
		resultUnfiltered.push(this.valueAtOrUndefined(row + 1, col + 1));
		resultUnfiltered.push(this.valueAtOrUndefined(row    , col + 1));
		resultUnfiltered.push(this.valueAtOrUndefined(row - 1, col + 1));

		return resultUnfiltered.filter((value) => (value !== undefined) ? true : false);
	}

	public toArray(): T[]{
		const result = [];

		for(let row = 0; row < this.rows; row++){
			for(let col = 0; col < this.cols; col++){
				const arrpos = this.arrayPosition(row, col);

				result[arrpos] = this.cells[arrpos];
			}
		}

		return result;
	}

	public static fromArray<T>(array: T[], rows: number, cols: number): Grid<T>{
		const result = new Grid<T>(rows, cols);

		for(let row = 0; row < rows; row++){
			for(let col = 0; col < cols; col++){
				const arrpos = row * cols + col;

				result.insert(array[arrpos], row, col);
			}
		}

		return result;
	}

	public get wrapRows(): boolean{
		return this._wrapRows;
	}
	public get wrapCols(): boolean{
		return this._wrapCols;
	}
	public set wrapRows(val: boolean){
		this._wrapRows = val;
	}
	public set wrapCols(val: boolean){
		this._wrapCols = val;
	}

	public get rows(){
		return this._rows;
	}

	public get cols(){
		return this._cols;
	}
}