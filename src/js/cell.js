class Cell {

    constructor(isActive) {
        this._state = isActive;
        this.neghbors = [];
        this.age = 0;
    }

    /**
     * Set state
     * @param state
     */
    set state(state) { //state
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

    evolve() {
        let totalActive = 0;
        for(let i = 0; i < this.neghbors.length; i++) {
            totalActive +=
                (this.neghbors[i].age > this.age
                    ? this.neghbors[i].previousState
                    : this.neghbors[i].state) ? 1 : 0
        }

        this.state = (
            3 === totalActive ||
            (
                true === this.state &&
                2 === totalActive
            )
        );

        return this;
    }
}

module.exports = Cell;