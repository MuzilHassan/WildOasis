import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function useCheckin() {
  const obj = {
    isPaid: true,
    status: "checked-in",
  };
  const clientQuery = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isCheckin, mutate } = useMutation({
    mutationFn: (id) => updateBooking(id, obj),
    onError: (err) => toast.error("Can not check in user " + err?.message),
    onSuccess: (data) => {
      toast.success(`Guest with ${data.id} checked in successfully `);
      clientQuery.invalidateQueries({ active: true });
      navigate("/");
    },
  });

  return { isCheckin, mutate };
}

export default useCheckin;
