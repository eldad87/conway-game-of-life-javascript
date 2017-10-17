class Coordinate {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Convert a Coordinate into an index of a 1D structure
     * @param coordinate
     * @param rows
     * @returns {*}
     */
    static coordinateToIndex(coordinate, rows) {
        return coordinate.x * rows + coordinate.y;
    }

    /**
     * Convert a 1D index into a Coordinate
     * @param index
     * @param rows
     * @param cols
     * @returns {Coordinate}
     */
    static indexToCoordinate(index, rows, cols) {
        let row = Math.floor(index / rows);
        let col = index % cols;
        return new Coordinate(row, col);
    }
}

module.exports = Coordinate;