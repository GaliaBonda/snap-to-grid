import React, { useState, useEffect, MouseEvent } from 'react';
import './dragobj.scss';

export default function DragObject(props: {
  x: number, y: number, tileSize: number, size: { width: number, height: number }
}): JSX.Element {
  const { x, y, tileSize, size } = props;
  const [isDragging, setDragging] = useState(false);
  const object = document.querySelector('.object') as HTMLElement;
  const [currentObj, setCurrentObj] = useState(object);
  const [shift, setShift] = useState({ shiftX: 0, shiftY: 0 });
  const [isSnapped, setSnapped] = useState(false);
  const grid = document.getElementById('grid');
  

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', draggObject);
      document.addEventListener('mouseup', stopDragging);
    }
    return function cleanup() {
        document.removeEventListener('mousemove', draggObject);
        document.removeEventListener('mouseup', stopDragging);
    };
  });
  
  const draggObject = (e: globalThis.MouseEvent): void => {
    if (!currentObj) return;
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
    const leftPosition = (e.clientX >= x + tileSize / 2 && e.clientX <= x + tileSize) ?
      x + tileSize + 'px' :
      e.clientX - - shift.shiftX + 'px';
    const topPosition = (e.clientY >= y + tileSize / 2 && e.clientY <= y + tileSize) ?
      y + tileSize + 'px' :
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
      shiftX: event.clientX - currentObj.getBoundingClientRect().left,
      shiftY: event.clientY - currentObj.getBoundingClientRect().top})
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
      const leftPosition = (event.clientX >= x + tileSize / 2 && event.clientX <= x + tileSize) ?
      x + tileSize + 'px' :
      x + 'px';
    const topPosition = (event.clientY >= y + tileSize / 2 && event.clientY <= y + tileSize) ?
      y + tileSize + 'px' :
      y + 'px';
    currentObj.style.left = leftPosition;
    currentObj.style.top = topPosition;
    }
  };
  const preventDefaultDropping = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };
  
return (
    <div>
      <div className='object' onMouseDown={startDragging}
        onDrop={preventDefaultDropping}
      onDragEnter={preventDefaultDropping}
      style={{ width: size.width, height: size.height }}>
      </div>
    </div>
  );
}