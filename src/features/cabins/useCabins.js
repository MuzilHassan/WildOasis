import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabins() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { isPending, data };
}

export default useCabins;
