import IAppContextProps from '@/interfaces/IAppContextProps';
import { createContext } from 'react';

const AppContext = createContext<IAppContextProps | undefined>(undefined);

export default AppContext;
