import {Bounce, ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = (mode,message) => {
  toast[mode](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    // transition:Bounce
  });
};

export default ToastMessage;