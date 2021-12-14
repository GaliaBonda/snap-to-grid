import React, { useState, useEffect, ChangeEvent } from 'react';
import DragObject from '../DragObject/DragObject';
import Grid from '../Grid/Grid';
import './widget.scss';
import image from '../../assets/circle.svg';

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
    // console.log(objects);
    // if (document.elementFromPoint(e.clientX, e.clientY)?.className === 'grid') {
    //   objects.forEach((obj) => (obj as HTMLElement).style.display = 'none');
    // let tile = document.elementFromPoint(e.clientX, e.clientY);
    // if (tile && tile.className == 'tile') {
    //     setCurrentTile({x: tile.getBoundingClientRect().left, y: tile.getBoundingClientRect().top});
    // }
    // objects.forEach((obj) => (obj as HTMLElement).style.display = 'block');
    // }
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
  
return (
  <div>
    {/* <img src={image} alt="circle" /> */}
      <div className='widget'>
        <label className='widget-label' htmlFor='gridDim'>Enter dimension of the GRID (number of tiles in a row): </label>
      <input className='widget-input' type='number' id='gridDim' onChange={getGridDimension}/>
        <div className='widget-main'>
          <div className='objects-panel'>
          <DragObject x={currentTile.x} y={currentTile.y} tileSize={gridSize / gridDim}
            size={{ width: 40, height: 40 }} type='square'/>
          <DragObject x={currentTile.x} y={currentTile.y} tileSize={gridSize / gridDim}
            size={{ width: 100, height: 40 }} type='square'/>
          <DragObject x={currentTile.x} y={currentTile.y} tileSize={gridSize / gridDim}
            size={{ width: 20, height: 150 }} type='square'/>
          <DragObject x={currentTile.x} y={currentTile.y} tileSize={gridSize / gridDim}
            size={{ width: 100, height: 150 }} type='ellipse'/>
          <DragObject x={currentTile.x} y={currentTile.y} tileSize={gridSize / gridDim}
            size={{ width: 70, height: 50 }} type='circle' />
          <DragObject x={currentTile.x} y={currentTile.y} tileSize={gridSize / gridDim}
            size={{ width: 80, height: 50 }} type='star'/>
          </div>
          <Grid dimension={gridDim} size={gridSize} />
        </div>
      </div>
    </div>
  );
}