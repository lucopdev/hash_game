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
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@components/registerForm/registerform.css';

export default function RegisterForm(props: any) {
  const router = useRouter();
  const { closeFunction, buttonType } = props;

  const [errorModal, setErrorModal] = useState<string>('');
  const [formValues, setFormValues] = useState<LoginFormValue>({
    email: '',
    username: '',
    password: '',
  });
  const { socket, player, setPlayer, setChatName } = useContext<IAppContextProps>(
    AppContext as React.Context<IAppContextProps>
  );

  const submitFunction = async (e: FormEvent<HTMLFormElement>): Promise<IFormSubmit> => {
    e.preventDefault();
    const payload = {
      email: formValues.email,
      username: formValues.username,
      password: formValues.password,
    };

    if (player) {
      setPlayer((prevState: any) => ({
        ...prevState,
        username: payload.username,
      }));
    }

    setChatName(payload?.username);

    let login = null;
    let register = null;

    try {
      if (buttonType === 'login') {
        login = await fetchApiLogin(payload);
        joinLobby(login.username);
      } else {
        register = await fetchApiRegister(payload);
      }

      if (register && register.status === 'ERROR') {
        setErrorModal(register.error.issues[0].message);
      }
      if (login && login.status === 'ERROR') {
        setErrorModal('Verify your email or password');
      }

      return { status: 'SUCCESSFULL', message: 'Form successfully submited' };
    } catch (e) {
      return { status: 'ERROR', message: 'Impossible to submit form' };
    } finally {
      if (register !== null && register.status === 'SUCCESSFUL') {
        closeFunction();
      }

      if (login !== null && login.status === 'SUCCESSFUL') {
        const token = JSON.stringify(login.token);

        document.cookie = `token=${token}`;
        router.push('/waitingroom');
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

  const joinLobby = (chatName: string | undefined) => {
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
        buttonType === 'login' ? 'bg-green-500' : 'bg-blue-500'
      }`}
    >
      <fieldset className="flex flex-col items-center w-[90%] h-56 bg-zinc-800">
        <p className="absolute overflow-hidden">{errorModal}</p>
        <div className="flex flex-col justify-evenly items-center mt-4 h-[150px]">
          <input
            className="w-44 rounded text-black"
            type="email"
            placeholder="email"
            name="email"
            value={formValues?.email}
            onChange={handleChange}
          />
          <input
            hidden={buttonType === 'login'}
            className="w-44 rounded text-black"
            type="text"
            placeholder="username"
            name="username"
            value={formValues?.username}
            onChange={handleChange}
            maxLength={10}
          />
          <input
            className="w-44 rounded text-black"
            type="password"
            placeholder="password"
            name="password"
            value={formValues?.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className={`border-2 rounded p-1 w-24 ${
            buttonType === 'login' ? 'bg-green-500' : 'bg-blue-500'
          }`}
        >
          {buttonType === 'login' ? 'Log in' : 'Register'}
        </button>
      </fieldset>
    </form>
  );
}
