import React, { useState, useEffect, ChangeEvent } from 'react';
import DragObject from '../DragObject/DragObject';
import Grid from '../Grid/Grid';
import './widget.scss';

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
    const objects = document.querySelectorAll('.object');
    // if (document.elementFromPoint(e.clientX, e.clientY)?.className === 'grid') {
    //   objects.forEach((obj) => (obj as HTMLElement).style.display = 'none');
    // let tile = document.elementFromPoint(e.clientX, e.clientY);
    // if (tile && tile.className == 'tile') {
    //     setCurrentTile({x: tile.getBoundingClientRect().left, y: tile.getBoundingClientRect().top});
    // }
    // objects.forEach((obj) => (obj as HTMLElement).style.display = 'block');
    // }
    objects.forEach((obj) => (obj as HTMLElement).style.display = 'none');
    let tile = document.elementFromPoint(e.clientX, e.clientY);
    if (tile && tile.className == 'tile') {
        setCurrentTile({x: tile.getBoundingClientRect().left, y: tile.getBoundingClientRect().top});
    }
    objects.forEach((obj) => (obj as HTMLElement).style.display = 'block');
    
  }
  
const getGridDimension = (e: ChangeEvent) => {
    const inputValue = Number.parseInt((e.target as HTMLInputElement).value);
    setGridDim(inputValue);
  }
  
return (
    <div>
      <div className='widget'>
        <label className='widget-label' htmlFor='gridDim'>Enter dimension of the GRID (number of tiles in a row): </label>
      <input className='widget-input' type='number' id='gridDim' onChange={getGridDimension}/>
        <div className='widget-main'>
          <div className='objects-panel'>
          <DragObject x={currentTile.x} y={currentTile.y} tileSize={gridSize / gridDim}
            size={{ width: 40, height: 40 }} />
          <DragObject x={currentTile.x} y={currentTile.y} tileSize={gridSize / gridDim}
            size={{ width: 100, height: 40 }} />
          <DragObject x={currentTile.x} y={currentTile.y} tileSize={gridSize / gridDim}
            size={{ width: 20, height: 150 }} />
          <DragObject x={currentTile.x} y={currentTile.y} tileSize={gridSize / gridDim}
            size={{ width: 200, height: 150 }} />
          <DragObject x={currentTile.x} y={currentTile.y} tileSize={gridSize / gridDim}
            size={{ width: 200, height: 200 }} />
          </div>
          <Grid dimension={gridDim} size={gridSize} />
        </div>
      </div>
    </div>
  );
}