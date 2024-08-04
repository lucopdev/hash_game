'use client';

import React from 'react';

import Board from '@/app/components/board/Board';
import '@components/board/board.css';
import '@/app/(gameRoom)/table/[numberRoom]/table.css';

function Table({ params }: { params: { roomNumber: number } }) {
  return (
    <main className="table-main flex flex-col items-center justify-evenly w-screen h-screen bg-blue-300">
      <div className="table-outer flex flex-col items-center justify-evenly w-[1000px] h-[80%]">
        <h1>ROOM {params.roomNumber}</h1>
        <Board />
      </div>
    </main>
  );
}

export default Table;
