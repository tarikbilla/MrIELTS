import { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export function AdminContextProvider({ children }) {
  const successToast = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 15000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const warningToast = (message) => {
    toast.warn(message, {
      position: 'top-right',
      autoClose: 15000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };
  
  const failedToast = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 15000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <ToastContext.Provider value={{ successToast, warningToast, failedToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
