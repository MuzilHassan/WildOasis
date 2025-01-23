import toast from "react-hot-toast";
import { insetEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCreateCabin() {
  const query = useQueryClient();
  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: insetEditCabin,
    onSuccess: () => {
      query.invalidateQueries("cabins");
      toast.success("cabin data added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isCreating, mutate };
}

export default useCreateCabin;
