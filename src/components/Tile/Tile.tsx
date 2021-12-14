import React from 'react';
import './tile.scss';

export default function Tile(props: { size: number, id: number }) {
  const { size, id } = props;
return (
  <div className="tile" style={{ width: size, height: size }} id={id.toString()}>
    </div>
  );
}