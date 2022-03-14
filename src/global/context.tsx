import { createContext, useReducer, ReactNode, useContext } from 'react';

type State = { userName: string; city: string };
type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_CITY'; payload: string };
type Dispatch = (action: Action) => void;
type UserProviderProps = { children?: ReactNode };
type ContextType = { state: State; dispatch: Dispatch } | undefined;

const UserContext = createContext<ContextType>(undefined);

const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        userName: action.payload,
      };
    case 'SET_CITY':
      return {
        ...state,
        city: action.payload,
      };
    default:
      return state;
  }
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, { userName: '', city: '' });
  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserName = () => {
  const context = useContext(UserContext);
  if (context) {
    const value: [userName: string, dispatch: Dispatch] = [
      context?.state.userName,
      context?.dispatch,
    ];
    return value;
  }
  throwError('useUserName');
};

const useCity = () => {
  const context = useContext(UserContext);
  if (context) {
    const value: [city: string, dispatch: Dispatch] = [
      context?.state.city,
      context?.dispatch,
    ];
    return value;
  }
  throwError('useCity');
};

const throwError = (hookName: string) => {
  throw new Error(`${hookName} is not being used inside of UserProvider`);
};

export { UserProvider, useUserName, useCity };
