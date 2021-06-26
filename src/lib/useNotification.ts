import { useCallback } from "react";
import { store } from "react-notifications-component";

export const useNotification = () => {
  const success = useCallback((title: string, message: string) => {
    store.addNotification({
      title,
      message,
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  }, []);

  const error = useCallback((title: string, message: string) => {
    store.addNotification({
      title,
      message,
      type: "danger",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  }, []);

  return {
    success,
    error,
  };
};