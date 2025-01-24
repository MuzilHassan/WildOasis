import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateSetting() {
  const query = useQueryClient();

  const { isPending: isEditing, mutate: mutateEdit } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      query.invalidateQueries("settings");
      toast.success("Settings updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isEditing, mutateEdit };
}

export default useUpdateSetting;
