/**
 * Nome do Programa: Chat.tsx
 * Descrição: Cria o chat onde os jogadores podem conversar.
 * Autor: Lucas Rosa
 * Data de Criação: 10 de janeiro de 2024
 * Versão: 0.0.1
 */

'use client';

import AppContext from '@/context/AppContext';
import IAppContextProps from '@/interfaces/IAppContextProps';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import '@components/chat/chat.css';

export default function Chat() {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [chatText, setChatText] = useState<string>('');
  const [counter, setCounter] = useState<number>(0);
  const [socketMsgRecived, setSocketMgsRecived] = useState<JSX.Element[]>([]);
  const { chatName, socket } = useContext<IAppContextProps>(
    AppContext as React.Context<IAppContextProps>
  );

  const messagesRef = useRef<HTMLDivElement>(null);

  const msgReciveFunc = (message: string) => {
    setSocketMgsRecived((prevState: any) => [...prevState, message]);
  };

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
    if (socket) {
      socket.on('recivedMessage', msgReciveFunc);

      return () => {
        socket.off('recivedMessage', msgReciveFunc);
      };
    }
  }, [socket, socketMsgRecived]);

  const emitMsg = () => {
    if (!clearChat()) {
      socket.emit('message', `${chatName}: ${chatText}`); //tenho que fazer uma emissão para cada player no socket?
      setChatText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    setCounter((prevCounter) => prevCounter + 1);
    if (e.key === 'Enter') {
      emitMsg();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setChatText(value);
  };

  const clearChat = () => {
    if (chatText.toLocaleLowerCase() === '/clear') {
      setChatText('');
      setSocketMgsRecived([]);

      return true;
    }
  };
  return (
    <div className="chat-main flex flex-col ">
      <div className="chat-main-inner border-r-2 rounded-l">
        <div
          ref={messagesRef}
          className="chat-display flex flex-col w-[250px] h-[450px] border justify-between items-center bg-blue-800 border-r-4 shadow-lg overflow-auto"
        >
          <div id="output" className="flex flex-col w-[100%] pt-5 pl-2">
            <h1 className="font-bold m-5">Be Polite with others :)</h1>
            <div className="mb-[20px]">
              {socketMsgRecived.map((message, i) => (
                <p key={i}>{message}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="chat-inputs-main flex w-[100%] justify-start items-center">
          <input
            onKeyDown={(e) => handleKeyPress(e)}
            onChange={handleChange}
            value={chatText}
            className="flex text-white font-medium w-[100%] h-[30px] bg-slate-500 bg-opacity-20 resize-none overflow-hidden outline-none focus:border pl-2"
            disabled={isDisabled}
          />
          <button
            onClick={emitMsg}
            className="w-[70px] h-[30px] font-medium bg-green-500 hover:bg-green-600 active:bg-green-600 shadow-md border border-green-500 transition-transform transform active:scale-95"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
