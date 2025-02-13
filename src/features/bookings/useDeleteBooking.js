import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

function useDeleteBooking() {
  const queryClinet = useQueryClient();
  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteBooking(id),

    onSuccess: () => {
      queryClinet.invalidateQueries({ active: true });
      toast.success("data deleted successfully");
    },
    onError: (error) => toast.error(error.message),
  });
  return { isDeleting, mutate };
}

export default useDeleteBooking;
