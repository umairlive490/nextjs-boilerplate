import { createContext } from 'react';
import type { GlobalContext } from '@types';

const AppContext = createContext({} as GlobalContext);

export default AppContext;
