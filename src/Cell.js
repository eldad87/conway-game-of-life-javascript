class Cell {

    constructor(isActive) {
        this.status = isActive;
    }

    /**
     * Set Cell's activation status
     * @param status
     */
    set status(status) {
        // 000001 -> 000010
        this._status = this._status << 1;
        if(status) {
            // 000010 -> 000011
            this._status = this._status | 1;
        }
    }

    /**
     * Get activation status
     * @returns boolean
     */
    get status() {
        return this._status & 1 === 1;
    }

    get previousStatus() {
        return this.getStatusByCycle(1);
    }

    /**
     * Check if this cell lived X cycles ago
     *  0 is current cycle,
     *  0 is prev cycle
     *  n cycles ago
     * @param cyclesAgo
     * @returns bool
     */
    getStatusByCycle(cyclesAgo) {
        return (this._status >> cyclesAgo) & 1 === 1;
    }
}

module.exports = Cell;