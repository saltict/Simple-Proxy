import {createContext} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";

export interface ThemeContextInterface {
  themeName: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}
export const ThemeContext = createContext<ThemeContextInterface>({themeName: 'light', setTheme: (theme: 'dark' | 'light') => {}});

export function ThemeContextProvider({children}) {
  const [themeName, setTheme] = useLocalStorage<'dark' | 'light'>('theme-name', 'light');

  return <ThemeContext.Provider value={{themeName, setTheme}}>
    {children}
  </ThemeContext.Provider>
}