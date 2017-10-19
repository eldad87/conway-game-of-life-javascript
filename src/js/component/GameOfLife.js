import React, { Component } from 'react';
import Organism from '../organism';

import '../../css/gol.css';

export default class GameOfLife extends Component {
    constructor(props) {
        super(props);

        this.organism = new Organism(100, 100);

        this.state = {
            isRunning: false,
            cellDimension: 5,
            width: this.organism.width,
            height: this.organism.height,
            cells: this.organism.cells
        };
    }

    _syncStateWithOrganism() {
        this.setState({
            width: this.organism.width,
            height: this.organism.height,
            cells: this.organism.cells,
        });
    }

    setWidth(event) {
        this.organism.width = event.target.value;
        this._syncStateWithOrganism();
    }

    setHeight(event) {
        this.organism.height = event.target.value;
        this._syncStateWithOrganism();
    }

    randomActiveCellGenerator() {
        let randomActiveCells = [];
        for(let x = 0; x < this.organism.height; x++) {
            for(let y = 0; y < this.organism.width; y++) {
                if(Math.floor(Math.random() * 2) == 1) {
                    randomActiveCells.push([x, y]);
                }
            }
        }

        this.organism.setCellActiveState(randomActiveCells);
        this._syncStateWithOrganism();
    }

    evolve() {
        this.organism.evolve();
        this._syncStateWithOrganism();
    }

    render() {
        return (
            <section id="game-of-life">
                <h2>Game Of Life</h2>

                <div className="organism" style={{width: this.state.width * this.state.cellDimension}}>
                    {this.state.cells.map((row, x) => {
                        return row.map((cell, y) => {
                            return <div name={x + '-' + y} key={x, y}
                                        style={
                                            {width: this.state.cellDimension, height: this.state.cellDimension}
                                        }
                                        className={'cell' + (cell ? ' alive' : '')
                                        }></div>
                        })
                    })}
                </div>

                <div className='menu'>
                    <label> Width:
                        <input key='setWidth' value={this.state.width} onChange={this.setWidth.bind(this)} />
                    </label>
                    <label> Height:
                        <input key='setHeight' value={this.state.height} onChange={this.setHeight.bind(this)} />
                    </label>

                    <input type='button' onClick={this.randomActiveCellGenerator.bind(this)} value='Randomize' />
                    <input type='button' onClick={this.evolve.bind(this)} value='Evolve' />
                </div>

            </section>
        );
    }
}