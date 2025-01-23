import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";

function useDeleteCabin() {
  const queryClinet = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: deleteCabin,

    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("data deleted successfully");
    },
    onError: (error) => toast.error(error.message),
  });
  return { isPending, mutate };
}

export default useDeleteCabin;
