import AppContext from '@/context/AppContext';
import IAppContextProps from '@/interfaces/IAppContextProps';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

function GetUpButton() {
  const router = useRouter();
  const { socket } = useContext<IAppContextProps>(AppContext as React.Context<IAppContextProps>);

  const getUp = () => {
    if (socket) {
      socket.emit('disconnectRoomFunction');
      socket.offAny();
    }
    
    router.push('/waitingroom');
  };

  return (
    <div>
      <button onClick={getUp} className="border mt-2 p-2 rounded bg-green-500 hover:bg-green-600 active:bg-green-600 shadow-md border border-green-500 transition-transform transform active:scale-95">
        Back to Lobby
      </button>
    </div>
  );
}

export default GetUpButton;
