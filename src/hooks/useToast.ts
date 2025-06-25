import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info";

type ToastOptions = {
  type?: ToastType;
  title: string;
  description?: string;
  visibilityTime?: number;
};

export const showToast = ({
  type = "success",
  title,
  description,
  visibilityTime = 1500,
}: ToastOptions) => {
  Toast.show({
    type,
    text1: title,
    text2: description,
    position: "bottom",
    autoHide: true,
    visibilityTime,
    avoidKeyboard: true,
  });
};
