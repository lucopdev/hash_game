import { ReactNode } from 'react';

interface ChildrenNode {
  children: ReactNode;
}

export const metadata = {
  title: 'Game Room',

};

export default async function({ children }: ChildrenNode) {
  return <>{children}</>;
};

// pesquisar generatemetadata nextJS dinamic
