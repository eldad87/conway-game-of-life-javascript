'use strict';

class Cell {

    constructor(isActive) {
        this._state = isActive;
        this.neighbors = [];
        this.age = 0;
    }

    /**
     * Set state
     * @param state
     */
    set state(state) {
        // 000001 -> 000010
        this._state = this._state << 1;
        if(state) {
            // 000010 -> 000011
            this._state = this._state | 1;
        }

        this.age++;
    }

    /**
     * Get state
     * @returns {boolean}
     */
    get state() {
        return ((this._state & 1) === 1);
    }

    get previousState() {
        return this.getStateByCycle(1);
    }

    /**
     * Check if this cell lived X cycles ago
     *  0 is current cycle,
     *  0 is prev cycle
     *  n cycles ago
     * @param cyclesAgo
     * @returns bool
     */
    getStateByCycle(cyclesAgo) {
        return (this._state >> cyclesAgo) & 1 === 1;
    }

    /**
     * Change the cell's state according to the game rules
     * @returns {Cell}
     */
    evolve() {
        let livingNeighborsCount = 0;
        for(let i = 0; i < this.neighbors.length; i++) {
            livingNeighborsCount +=
                (this.neighbors[i].age > this.age
                    ? this.neighbors[i].previousState
                    : this.neighbors[i].state) ? 1 : 0
        }

        this.state = (
            3 === livingNeighborsCount ||
            (
                true === this.state &&
                2 === livingNeighborsCount
            )
        );

        return this;
    }
}

module.exports = Cell;