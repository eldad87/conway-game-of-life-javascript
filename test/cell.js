const assert = require('assert');
const Cell = require("../src/cell");

describe('Cell', function() {

    describe('Check if Active', function() {
        let cell = new Cell(true);

        it('Should be active', function() {
            assert.equal(true, cell.state);
        });
    });

    describe('Check if In-Active', function() {
        let cell = new Cell(false);

        it('Should be in-active', function() {
            assert.equal(false, cell.state);
        });
    });

    describe('Check if used to be Active', function() {
        let cell = new Cell(true);
        cell.state = false;

        it('Should be active', function() {
            assert.equal(true, cell.previousState);
        });
    });

    describe('Check if used to be In-Active', function() {
        let cell = new Cell(false);
        cell.state = true;

        it('Should be in-active', function() {
            assert.equal(false, cell.previousState);
        });
    });

    describe('Check status cycle', function() {
        let cell = new Cell(true);  // 4
        cell.state = false;      // 3
        cell.state = false;      // 2
        cell.state = true;       // 1 prev
        cell.state = true;       // 0 Current
        // 11001

        it('Should be active', function() {
            assert.equal(true, cell.getStateByCycle(0));
        });

        it('Should have been active 1 cycle ago', function() {
            assert.equal(true, cell.getStateByCycle(1));
        });

        it('Should have been in-active 2 cycles ago', function() {
            assert.equal(false, cell.getStateByCycle(2));
        });

        it('Should have been in-active 3 cycles ago', function() {
            assert.equal(false, cell.getStateByCycle(3));
        });

        it('Should have been in-active 4 cycles ago', function() {
            assert.equal(true, cell.getStateByCycle(4));
        });
    });
});