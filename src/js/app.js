import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/style.css';

import GameOfLife from './component/GameOfLife';

render(<GameOfLife />, document.getElementById('app'));
