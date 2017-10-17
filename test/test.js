const assert = require('assert');
const Cell = require("./../src/Cell");
const Coordinate = require("./../src/Coordinate");
const Organism = require("./../src/Organism");

describe('Cell', function() {

    describe('Check if Active', function() {
        let cell = new Cell(true);

        it('Should be active', function() {
            assert.equal(true, cell.status);
        });
    });

    describe('Check if In-Active', function() {
        let cell = new Cell(false);

        it('Should be in-active', function() {
            assert.equal(false, cell.status);
        });
    });

    describe('Check if used to be Active', function() {
        let cell = new Cell(true);
        cell.status = false;

        it('Should be active', function() {
            assert.equal(true, cell.previousStatus);
        });
    });

    describe('Check if used to be In-Active', function() {
        let cell = new Cell(false);
        cell.status = true;

        it('Should be in-active', function() {
            assert.equal(false, cell.previousStatus);
        });
    });

    describe('Check status cycle', function() {
        let cell = new Cell(true);  // 4
        cell.status = false;      // 3
        cell.status = false;      // 2
        cell.status = true;       // 1 prev
        cell.status = true;       // 0 Current
        // 11001

        it('Should be active', function() {
            assert.equal(true, cell.getStatusByCycle(0));
        });

        it('Should have been active 1 cycle ago', function() {
            assert.equal(true, cell.getStatusByCycle(1));
        });

        it('Should have been in-active 2 cycles ago', function() {
            assert.equal(false, cell.getStatusByCycle(2));
        });

        it('Should have been in-active 3 cycles ago', function() {
            assert.equal(false, cell.getStatusByCycle(3));
        });

        it('Should have been in-active 4 cycles ago', function() {
            assert.equal(true, cell.getStatusByCycle(4));
        });
    });
});

describe('Coordinate', function() {

    const rows = 100;
    const cols = 100;

    describe('Check Coordinate', function() {
        it('Should construct Coordinate(1, 1)', function() {
            let coordinate = new Coordinate(1, 1);
            assert.equal(1, coordinate.x);
            assert.equal(1, coordinate.y);
        });
    });

    describe('Check index to Coordinate', function() {
        it('Should return 101', function() {
            let coordinate = new Coordinate(1, 1);
            assert.equal(101, Coordinate.coordinateToIndex(coordinate, rows));
        });

        if('Should return 202 Coordinate', function() {
                let coordinate = new Coordinate(2, 2);
                assert.equal(202, Coordinate.coordinateToIndex(coordinate, rows));
            });
    });

    describe('Check Coordinate to index', function() {
        it('Should return Coordinate(1, 1)', function() {
            let coordinate = Coordinate.indexToCoordinate(101, rows, cols);
            assert.equal(1, coordinate.x);
            assert.equal(1, coordinate.y);
        });

        it('Should return Coordinate(2, 2)', function() {
            let coordinate = Coordinate.indexToCoordinate(202, rows, cols);
            assert.equal(2, coordinate.x);
            assert.equal(2, coordinate.y);
        });
    })
});