import React, { useState, useEffect, MouseEvent } from 'react';
import './dragobj.scss';
import circle from '../../assets/circle.svg';
import ellipse from '../../assets/ellipse.svg';
import star from '../../assets/star.svg';


export default function DragObject(props: {
  size: { width: number, height: number },
  type: string,
  startDragging: (event: MouseEvent) => void,
  preventDefaultDropping: (event: MouseEvent) => void;
}): JSX.Element {
  const {size, type, startDragging, preventDefaultDropping } = props;
  
return (
  <div> 
    {(type === 'square') && (<div className='object obj-to-hide object-square' onMouseDown={startDragging}
        onDrop={preventDefaultDropping}
      onDragEnter={preventDefaultDropping}
      style={{ width: size.width, height: size.height }}></div>)}
    {(type === 'circle') && (<img src={circle} alt='circle' className='object obj-to-hide object-circle'
      onMouseDown={startDragging}
        onDrop={preventDefaultDropping}
      onDragEnter={preventDefaultDropping}
      style={{ width: size.width }} />)}
    {(type === 'ellipse') && (<img src={ellipse} alt='ellipse' className='object obj-to-hide object-ellipse' onMouseDown={startDragging}
        onDrop={preventDefaultDropping}
      onDragEnter={preventDefaultDropping}
      style={{ width: size.width }} />)}
    {(type === 'star') && (<img src={star} alt='star' className='object obj-to-hide object-star' onMouseDown={startDragging}
        onDrop={preventDefaultDropping}
      onDragEnter={preventDefaultDropping}
      style={{ width: size.width }} />)}
    </div>
  );
}