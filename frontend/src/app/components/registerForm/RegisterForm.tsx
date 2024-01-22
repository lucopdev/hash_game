/**
 * Nome do Programa: RegisterForm.tsx
 * Descrição: Cria o formulário de entrada, tanto o de registro quanto o de login.
 * Autor: Lucas Rosa
 * Data de Criação: 10 de janeiro de 2024
 * Versão: 0.0.1
 */
'use client';

import AppContext from '@/context/AppContext';
import IAppContextProps from '@/interfaces/IAppContextProps';
import LoginFormValue from '@/interfaces/ILoginFormValue';
import IFormSubmit from '@/interfaces/IFormSubmit';
import { fetchApiLogin, fetchApiRegister } from '@/utils/userAPI';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@components/registerForm/registerform.css';

export default function RegisterForm(props: any) {
  const router = useRouter();
  const [formValues, setFormValues] = useState<LoginFormValue>({
    username: '',
    password: '',
  });

  const [errorModal, setErrorModal] = useState<string>('');
  const { socket, player, setPlayer, setChatName } = useContext<IAppContextProps>(
    AppContext as React.Context<IAppContextProps>
  );

  const submitFunction = async (e: FormEvent<HTMLFormElement>): Promise<IFormSubmit> => {
    e.preventDefault();
    const payload = {
      username: formValues.username,
      password: formValues.password,
    };

    joinLobby(payload.username);

    if (player) {
      setPlayer((prevState: any) => ({
        ...prevState,
        username: payload.username,
      }));
    }

    setChatName(payload.username);

    let login = null;
    let register = null;

    try {
      if (props.buttonType === 'login') {
        login = await fetchApiLogin(payload);
      } else {
        register = await fetchApiRegister(payload);
      }

      if (register && register.status === 'ERROR') {
        setErrorModal(register.error.issues[0].message);
      }
      if (login && login.status === 'ERROR') {
        setErrorModal('Verify your username or password');
      }

      return { status: 'SUCCESSFULL', message: 'Form successfully submited' };
    } catch (e) {
      return { status: 'ERROR', message: 'Impossible to submit form' };
    } finally {
      if (register !== null && register.status === 'SUCCESSFUL') {
        props.closeFunction();
      }

      if (login !== null && login.status === 'SUCCESSFUL') {
        const token = JSON.stringify(login.token);
        
        document.cookie = `token=${token}`;
        router.push('/');
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorModal('');
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const joinLobby = (chatName: string) => {
    if (socket) {
      document.cookie = `player=${JSON.stringify({
        id: socket.id,
        username: chatName,
      })}`;

      socket.offAny();
    }
  };

  return (
    <form
      onSubmit={submitFunction}
      className={`registerform flex flex-col justify-center items-center w-[450px] h-64 overflow-hidden ${
        props.buttonType === 'login' ? 'bg-green-500' : 'bg-blue-500'
      }`}
    >
      <fieldset className="flex flex-col items-center w-[90%] h-56 bg-zinc-800">
        <p className="absolute overflow-hidden">{errorModal}</p>
        <div className="flex flex-col justify-evenly items-center mt-4 h-[150px]">
          <input
            className="w-44 rounded text-black"
            type="text"
            placeholder="username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
          />
          <input
            className="w-44 rounded text-black"
            type="password"
            placeholder="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className={`border-2 rounded p-1 w-24 ${
            props.buttonType === 'login' ? 'bg-green-500' : 'bg-blue-500'
          }`}
        >
          {props.buttonType === 'login' ? 'Log in' : 'Register'}
        </button>
      </fieldset>
    </form>
  );
}
