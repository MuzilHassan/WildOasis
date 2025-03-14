import { useQuery } from "@tanstack/react-query";
import { getSession } from "../../services/apiAuth";

function useUser() {
  const { isPending, data } = useQuery({
    queryKey: ["user"],
    queryFn: getSession,
  });
  return { isPending, data };
}

export default useUser;
