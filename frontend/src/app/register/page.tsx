'use client';

import { useEffect, useState } from 'react';
import './register.css';
import RegisterForm from '@/app/components/registerForm/RegisterForm';
import deleteCookies from '@/utils/deleteCookies';

export default function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    deleteCookies(['player', 'token'], ['/', '/table']);
  },[])

  const registerFunction = () => {
    setIsModalOpen(true);
  };

  const closeFunction = () => {
    setIsModalOpen(false);
  };
  // COLOCAR OS BOTOES DE CRIAR CONTA E FECHAR O MODAL NO COMPONENTE FILHO
  return (
    <div className="login flex w-screen mt-[10%] flex-col justify-center items-center overflow-hidden">
      <h1 className="text-shadow flex flex-col justify-center items-center text-2xl m-2 text-white antialiased">
        HASH GAME <p>ONLINE</p>
      </h1>
      <RegisterForm buttonType={'login'} />
      <button onClick={registerFunction} className="mt-5">
        Create account
      </button>
      {isModalOpen && (
        <div className="modal fade-in absolute top-0 flex flex-col pt-[100px] items-center w-screen h-screen bg-zinc-800 bg-opacity-80">
          <div className="flex flex-col justify-center items-center w-[100%] h-[75%] rounded bg-zinc-900 bg-opacity-80">
            <h1 className="text-[30px] mb-[35px]">Create account</h1>
            <RegisterForm closeFunction={closeFunction} buttonType={'register'} />
          </div>
          <button onClick={closeFunction}>Close</button>
        </div>
      )}
    </div>
  );
}
