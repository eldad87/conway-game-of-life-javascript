const assert = require('assert');
const Cell = require("../src/cell");
const Organism = require("../src/organism");

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

describe('Organism', function() {

    const height = 10;
    const width = 10;
    let organism = new Organism(height, width);

    describe('Check created Cells', function() {
        it('Should contain 100 cells', function() {
            assert.equal(height * width, organism._cells.length);
        });
    });

    describe('Check Wrap Coordinate', function() {
        it('Should return [1,1]', function() {
            let [x, y] = organism._wrapCoordinate(11, 11);
            assert.equal(1, x);
            assert.equal(1, y);
        });

        it('Should return [9,9]', function() {
            let [x, y] = organism._wrapCoordinate(-1, -1);
            assert.equal(9, x);
            assert.equal(9, y);
        });
    });

    describe('Check Coordinate to index', function() {
        it('Should return 11', function() {
            let index = organism._coordinateToIndex(1, 1);
            assert.equal(11, index);
        });

        it('Should return 202', function() {
            let index = organism._coordinateToIndex(2, 2);
            assert.equal(22, index);
        });
    });

    describe('Check get cell by coordinate', function() {
        let organism = new Organism(height, width);
        // Black Magic
        organism._cells[ 0 ] = 'first cell';
        organism._cells[ height * width -1 ] = 'last cell';

        it('Should return "first cell"', function() {
            let cell = organism._getCell(0, 0);
            assert.equal('first cell', cell);
        });

        it('Should return "last cell"', function() {
            let cell = organism._getCell( height -1, width -1);
            assert.equal('last cell', cell);
        });
    });

    describe('Check Set-Cell-state', function() {
        it('Should have a live cell at 0,0', function() {
            organism.setCellActiveState([[0, 0]], true);
            let cell = organism._getCell(0, 0);
            assert.equal(true, cell.state);
        });

        it('Should have a live cell at 9,9', function() {
            organism.setCellActiveState([[9, 9]], true);
            let cell = organism._getCell(9, 9);
            assert.equal(true, cell.state);
        });


        it('Should have a live cell at 1,1 using wrap', function() {
            organism.setCellActiveState([[11, 11]], true);
            let cell = organism._getCell(1, 1);
            assert.equal(true, cell.state);
        });

        it('Should have only dead cells, except for 2,2', function() {
            organism.setCellActiveState([[2, 2]]);
            let cell = organism._getCell(3, 3);
            assert.equal(false, cell.state);
        });
    });

    describe('Check get cells', function() {
        let activeCells = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]];
        let organism = new Organism(5, 5);
        organism.setCellActiveState(activeCells);

        let evolvedCells = organism.cells;
        activeCells.forEach( (data) => {
            assert.equal(true, evolvedCells[data[0]][data[1]]);
        } )
    });

    describe('Check evolution', function() {
        let organism = new Organism(5, 5);

        /**
         * 0 0 0 0 0
         * 0 0 0 0 0
         * 0 1 1 1 0
         * 0 0 0 0 0
         * 0 0 0 0 0
         */
        organism.setCellActiveState([[2, 1], [2, 2], [2, 3]]);

        /**
         * 0 0 0 0 0
         * 0 0 1 0 0
         * 0 0 1 0 0
         * 0 0 1 0 0
         * 0 0 0 0 0
         */
        organism.evolve();

        let evolvedCells = organism.cells;
        assert.equal(true, evolvedCells[1][2]);
        assert.equal(true, evolvedCells[2][2]);
        assert.equal(true, evolvedCells[3][2]);

        /**
         * 0 0 0 0 0
         * 0 0 0 0 0
         * 0 1 1 1 0
         * 0 0 0 0 0
         * 0 0 0 0 0
         */
        organism.evolve();
        evolvedCells = organism.cells;
        assert.equal(true, evolvedCells[2][1]);
        assert.equal(true, evolvedCells[2][2]);
        assert.equal(true, evolvedCells[2][3]);
    });
});