const assert = require('assert');
const Cell = require("./../src/Cell");
const Coordinate = require("./../src/Coordinate");

describe('Cell', function() {

    describe('Check if Active', function() {
        let cell = new Cell(true);

        it('Should be active', function() {
            assert.equal(true, cell.isActive);
        });
    });

    describe('Check if In-Active', function() {
        let cell = new Cell(false);

        it('Should be in-active', function() {
            assert.equal(false, cell.isActive);
        });
    });


    describe('Check activation cycle', function() {
        let cell = new Cell(true);  // 4
        cell.isActive = false;      // 3
        cell.isActive = false;      // 2
        cell.isActive = true;       // 1 prev
        cell.isActive = true;       // 0 Current
        // 11001

        it('Should be active', function() {
            assert.equal(true, cell.getActivationCycle(0));
        });

        it('Should have been active 1 cycle ago', function() {
            assert.equal(true, cell.getActivationCycle(1));
        });

        it('Should have been in-active 2 cycles ago', function() {
            assert.equal(false, cell.getActivationCycle(2));
        });

        it('Should have been in-active 3 cycles ago', function() {
            assert.equal(false, cell.getActivationCycle(3));
        });

        it('Should have been in-active 4 cycles ago', function() {
            assert.equal(true, cell.getActivationCycle(4));
        });
    });
});