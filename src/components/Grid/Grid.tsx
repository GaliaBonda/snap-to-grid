import React from 'react';
import ITile from '../../interfaces/ITile';
import Tile from '../Tile/Tile';
import './grid.scss';

export default function Grid(props: { dimension: number, size: number }) {
  const { dimension, size } = props;
  const tileSize = size / dimension;
  const tiles: ITile[] = [];
  for (let i = 0; i < dimension * dimension; i++) {
    const tile: ITile = {size: tileSize, id: size + i};
    tiles.push(tile);
  }
  const items = tiles.map((item) => {
    return (
      <Tile size={item.size} key={item.id} id={item.id} />
    );
  });
return (
    <div className='grid' style={{width: size, height: size}} id='grid'>
    {items}
    </div>
  );
}