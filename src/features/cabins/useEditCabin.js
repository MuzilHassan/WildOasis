import toast from "react-hot-toast";
import { insetEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useEditCabin() {
  const query = useQueryClient();

  const { isPending: isEditing, mutate: mutateEdit } = useMutation({
    mutationFn: ({ cabin, id }) => insetEditCabin(cabin, id),
    onSuccess: () => {
      query.invalidateQueries("cabins");
      toast.success("cabin data edited successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isEditing, mutateEdit };
}

export default useEditCabin;
