const Cell = require("./cell");

class Organism {
    /**
     * Create our organism
     * @param height
     * @param width
     */
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this._cells = [];

        for(let x = 0; x < height; x++) {
            for(let y = 0; y < width; y++) {
                this._cells.push(new Cell(false));
            }
        }

        for(let x = 0; x < height; x++) {
            for(let y = 0; y < width; y++) {
                this._cells[this._coordinateToIndex(x, y)].neghbors = this._getNeighbors(x, y);
            }
        }
    }

    /**
     * Set the given coordinates as active
     * @param coordinates<[x, y]>
     * @returns {Organism}
     */
    setCellActiveState(coordinates) {
        let activeIndexes = coordinates.map( (coordinate) => this._coordinateToIndex(coordinate[0], coordinate[1]) );
        for(let i = 0; i < this._cells.length; i++) {
            this._cells[i].state = (activeIndexes.indexOf(i) >= 0);
        }

        return this;
    }

    /**
     * Evolve our cells
     * @returns {Organism}
     */
    evolve() {
        this._cells.forEach( (cell, index) =>
            cell.evolve());
        return this;
    }

    /**
     * Get a 2D structure with cell state (bool)
     * @returns {Array}
     */
    get cells() {
        let finalArr = new Array(this.height)
            .fill()
            .map( () => new Array(this.width) );

        for(let x = 0; x < this.height; x++) {
            for(let y = 0; y < this.width; y++) {
                finalArr[x][y] = this._getCell(x, y).state;
            }
        }

        return finalArr;
    }

    /**
     * Get cell by coordinate
     * @param x
     * @param y
     * @returns Cell
     * @private
     */
    _getCell(x, y) {
        return this._cells[this._coordinateToIndex(x, y)];
    }

    /**
     * Get all (8) surrounding neighbors
     *  of a given coordinate
     * @param x
     * @param y
     * @returns [number,number,number,number,number,number,number,number]
     * @private
     */
    _getNeighbors(x, y) {
        return [
            this._getCell(x +1, y -1),  //NW
            this._getCell(x +1, y),     //N
            this._getCell(x +1, y +1),  //NE
            this._getCell(x, y -1),     //W
            this._getCell(x, y +1),     //E
            this._getCell(x -1, y -1),  //SW
            this._getCell(x -1, y),     //S
            this._getCell(x -1, y +1),  //SE
        ];
    }

    /**
     * Convert a 2D coordinate to a numeric index location
     *  on a 1D Array
     * @param x
     * @param y
     * @returns number
     * @private
     */
    _coordinateToIndex(x, y) {
        let [wrapX, wrapY] = this._wrapCoordinate(x, y);
        return wrapX * this.height + wrapY;
    }

    /**
     * Make our structure of cells to behive like a sphere
     *  By wrapping the edges
     * @param x
     * @param y
     * @returns [number, number]
     * @private
     */
    _wrapCoordinate(x , y) {
        x = x % this.height;
        if(x < 0) {
            x += this.height;
        }

        y = y % this.width;
        if(y < 0) {
            y += this.width;
        }

        return [x, y];
    }
}

module.exports = Organism;