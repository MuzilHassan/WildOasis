import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const clientQuery = useQueryClient();

  const { mutate: checkout, isPending: isOut } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`User with ID ${data.id} checked out`);
      clientQuery.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error(`Could not check out user ${err?.message}`);
    },
  });
  return { checkout, isOut };
}

export default useCheckout;
