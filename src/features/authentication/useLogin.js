import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: () => {
      navigate("/");
      toast.success("Login successfull");
    },
    onError: (error) => {
      console.log(error);
      toast.error("User email or password is incorrect");
    },
  });

  return { mutate, isPending };
}

export default useLogin;
