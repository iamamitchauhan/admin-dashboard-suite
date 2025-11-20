import { toast as toastify, ToastOptions } from 'react-toastify';
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    toastify.success(
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5" />
        <span>{message}</span>
      </div>,
      { ...defaultOptions, ...options }
    );
  },
  
  error: (message: string, options?: ToastOptions) => {
    toastify.error(
      <div className="flex items-center gap-2">
        <XCircle className="h-5 w-5" />
        <span>{message}</span>
      </div>,
      { ...defaultOptions, ...options }
    );
  },
  
  warning: (message: string, options?: ToastOptions) => {
    toastify.warning(
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5" />
        <span>{message}</span>
      </div>,
      { ...defaultOptions, ...options }
    );
  },
  
  info: (message: string, options?: ToastOptions) => {
    toastify.info(
      <div className="flex items-center gap-2">
        <Info className="h-5 w-5" />
        <span>{message}</span>
      </div>,
      { ...defaultOptions, ...options }
    );
  },
};
