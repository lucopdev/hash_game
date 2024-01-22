'use client';

import { useState } from 'react';
// import RegisterForm from '../components/registerForm/RegisterForm';
import './register.css';
import RegisterForm from '@/app/components/registerForm/RegisterForm';

export default function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const registerFunction = () => {
    setIsModalOpen(true);
  };

  const closeFunction = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="login flex w-screen mt-[10%] flex-col justify-center items-center overflow-hidden">
      <h1 className="text-shadow flex flex-col justify-center items-center text-2xl m-2 text-white antialiased">
        JOGO DA VELHA <p>ONLINE</p>
      </h1>
      <RegisterForm buttonType={'login'} />
      <button onClick={registerFunction} className="mt-5">
        Crie sua conta
      </button>
      {isModalOpen && (
        <div className="modal fade-in absolute top-0 flex flex-col pt-[100px] items-center w-screen h-screen bg-zinc-800 bg-opacity-80">
          <div className="flex flex-col justify-center items-center w-[100%] h-[75%] rounded bg-zinc-900 bg-opacity-80">
            <h1 className="text-[30px] mb-[35px]">Crie sua conta</h1>
            <RegisterForm closeFunction={closeFunction} buttonType={'register'} />
          </div>
          <button onClick={closeFunction}>Fechar</button>
        </div>
      )}
    </div>
  );
}
