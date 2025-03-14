import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

function useLgout() {
  const query = useQueryClient();
  const navogate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      query.clear();
      navogate("/login", { replace: true });
    },
  });
  return { isPending, mutate };
}

export default useLgout;
