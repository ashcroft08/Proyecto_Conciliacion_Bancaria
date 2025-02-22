import { toast, Bounce } from 'react-toastify';

const CustomToast = (message, type = 'success') => {
    const options = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
    };

    switch (type) {
        case 'success':
            toast.success(message, options);
            break;
        case 'error':
            toast.error(message, options);
            break;
        case 'info':
            toast.info(message, options);
            break;
        case 'warning':
            toast.warn(message, options);
            break;
        default:
            toast(message, options);
            break;
    }
};

export default CustomToast;