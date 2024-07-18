import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = (message, mode) => {
  toast[mode](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default ToastMessage;