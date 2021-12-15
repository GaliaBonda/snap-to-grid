import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
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
  const startDimension = 10;
  const [currentTile, setCurrentTile] = useState({ x: 0, y: 0 });
  const [gridDim, setGridDim] = useState(startDimension);
  const tileSize = gridSize / gridDim
  const [isDragging, setDragging] = useState(false);
  const object = document.querySelector('.object') as HTMLElement;
  const [currentObj, setCurrentObj] = useState(object);
  const [shift, setShift] = useState({ shiftX: 0, shiftY: 0 });
  const [isSnapped, setSnapped] = useState(false);
  const grid = document.getElementById('grid');

  useEffect(() => {
    document.addEventListener('mousemove', defineTile);
     if (isDragging) {
      document.addEventListener('mousemove', draggObject);
      document.addEventListener('mouseup', stopDragging);
    }
    return function cleanup() {
      document.removeEventListener('mousemove', defineTile);
      document.removeEventListener('mousemove', draggObject);
      document.removeEventListener('mouseup', stopDragging);
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
    if (currentObj) currentObj.style.zIndex = '100';
  }

  const getGridDimension = (e: ChangeEvent) => {
    const inputValue = Number.parseInt((e.target as HTMLInputElement).value);
    setGridDim(inputValue);
  }
  
  const draggObject = (e: globalThis.MouseEvent): void => {
    currentObj.style.position = 'absolute';
    currentObj.style.zIndex = '1000';
    if (grid
      && e.clientX >= grid.getBoundingClientRect().left
      && e.clientY >= grid.getBoundingClientRect().top
      && e.clientX <= grid.getBoundingClientRect().right
      && e.clientY <= grid.getBoundingClientRect().bottom) {
      setSnapped(true);
      snapToGrid(e, currentObj);
    } else {
      currentObj.style.left = e.clientX - shift.shiftX + 'px';
      currentObj.style.top = e.clientY - shift.shiftY + 'px';
    }
      
  };

  const snapToGrid = (e: globalThis.MouseEvent, object: HTMLElement): void => {
    const leftPosition = (e.clientX >= currentTile.x + tileSize / 2 && e.clientX <= currentTile.x + tileSize) ?
      currentTile.x + tileSize + 'px' :
      e.clientX - shift.shiftX + 'px';
    const topPosition = (e.clientY >= currentTile.y + tileSize / 2 && e.clientY <= currentTile.y + tileSize) ?
      currentTile.y + tileSize + 'px' :
      e.clientY - shift.shiftY + 'px';
    object.style.left = leftPosition;
    object.style.top = topPosition;
  }

  const startDragging = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setCurrentObj(event.target as HTMLElement);
    if (currentObj) {
      setShift({
      shiftX: event.clientX - (event.target as HTMLElement).getBoundingClientRect().left,
      shiftY: event.clientY - (event.target  as HTMLElement).getBoundingClientRect().top})
    }
    setDragging(true);
  };
  
  const stopDragging = (event: globalThis.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setDragging(false);
    if (!currentObj) return;
    currentObj.style.zIndex = '10';
    if (isSnapped) {
      const leftPosition = (event.clientX >= currentTile.x + tileSize / 2 && event.clientX <= currentTile.x + tileSize) ?
        currentTile.x + tileSize + 'px' :
        currentTile.x + 'px';
      const topPosition = (event.clientY >= currentTile.y + tileSize / 2 && event.clientY <= currentTile.y + tileSize) ?
        currentTile.y + tileSize + 'px' :
        currentTile.y + 'px';
      currentObj.style.left = leftPosition;
      currentObj.style.top = topPosition;
    }
    setSnapped(false);
  };

  const preventDefaultDropping = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const dragObj = objectsSet.map((item, index) => {
        return (
          <DragObject size={{ width: item.width, height: item.height }} type={item.type} key={index}
            startDragging={startDragging} preventDefaultDropping={preventDefaultDropping}/>
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
