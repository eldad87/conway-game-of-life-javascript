class Cell {
    constructor(isActive) {
        this.isActive = isActive;
    }

    /**
     * Set Cell's activation status
     * @param isActive
     */
    set isActive(isActive) {
        // 000001 -> 000010
        this._isActive = this._isActive << 1;
        if(isActive) {
            // 000010 -> 000011
            this._isActive = this._isActive | 1;
        }
    }

    /**
     * Get activation status
     * @returns boolean
     */
    get isActive() {
        return this._isActive & 1 === 1;
    }

    /**
     * Check if this cell lived X cycles ago
     *  0 is current cycle,
     *  0 is prev cycle
     *  n cycles ago
     * @param cyclesAgo
     * @returns bool
     */
    getActivationCycle(cyclesAgo) {
        return (this._isActive >> cyclesAgo) & 1 === 1;
    }
}

module.exports = Cell;