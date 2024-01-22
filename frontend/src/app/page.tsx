'use client';

import { useEffect } from 'react';
import { fetchAuth } from '@/utils/userAPI';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const verifyFunction = async () => {
    if (document.cookie) {
      const token = document.cookie.split(';')[1].split('"')[1];
      const verifyToken = await fetchAuth({ token });

      if (verifyToken.status !== 'SUCCESSFUL') {
        router.push('/register');
      } else {
        router.push('/waitingroom');
      }
    } else {
      router.push('/register');
    }

    // document.cookie = `token=''`; // habilita a desconexão automática ao atualizar a pagina
  };

  useEffect(() => {
    verifyFunction();
  }, []);
  return (
    <>
    </>
  );
}
