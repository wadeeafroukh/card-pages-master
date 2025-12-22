import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function successMsg(message: string) {
    toast.success(message, {
        position: "top-center"
    })
}
export function updateMsg(message: string) {
    toast.info(message, {
        position: "top-center"
    })
}
export function errorMsg(message: string,) {
  toast.warning(message, {
    position: "top-center",
    autoClose: 5000,
  });
}
