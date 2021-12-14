import React, { useState, useEffect, ChangeEvent } from 'react';
import DragObject from '../DragObject/DragObject';
import Grid from '../Grid/Grid';
import './widget.scss';

const objectsSet = [
  { width: 40, height: 40, type: 'square' },
  { width: 100, height: 40, type: 'square' },
  { width: 20, height: 150, type: 'square' },
  { width: 100, height: 40, type: 'ellipse' },
  { width: 70, height: 70, type: 'circle' },
  { width: 80, height: 80, type: 'star' }
];

export default function Widget() {
  const gridSize = window.innerWidth / 2;
  const [currentTile, setCurrentTile] = useState({
    x: 0,
    y: 0
  });
  const startDimension = 10;
  const [gridDim, setGridDim] = useState(startDimension);
  useEffect(() => {
    document.addEventListener('mousemove', defineTile);
    return function cleanup() {
            document.removeEventListener('mousemove', defineTile);
        };
  });
  const defineTile = (e: globalThis.MouseEvent): void => {
    const objects = document.querySelectorAll('.obj-to-hide');
    objects.forEach((obj) => (obj as HTMLElement).style.zIndex = '-1');
    let tile = document.elementFromPoint(e.clientX, e.clientY);
    if (tile && tile.className == 'tile') {
        setCurrentTile({x: tile.getBoundingClientRect().left, y: tile.getBoundingClientRect().top});
    }
    objects.forEach((obj) => (obj as HTMLElement).style.zIndex = '1');
    
  }
const getGridDimension = (e: ChangeEvent) => {
    const inputValue = Number.parseInt((e.target as HTMLInputElement).value);
    setGridDim(inputValue);
  }
  const dragObj = objectsSet.map((item) => {
        return (
          <DragObject x={currentTile.x} y={currentTile.y} tileSize={gridSize / gridDim}
            size={{ width: item.width, height: item.height }} type={item.type}/>
        );
      });
return (
  <div>
    <div className='widget'>
      <label className='widget-label' htmlFor='gridDim'>Enter dimension of the GRID (number of tiles in a row): </label>
    <input className='widget-input' type='number' id='gridDim' onChange={getGridDimension}/>
      <div className='widget-main'>
        <div className='objects-panel'>
          {dragObj}
        </div>
        <Grid dimension={gridDim} size={gridSize} />
      </div>
    </div>
    </div>
  );
}