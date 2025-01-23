import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { da } from "date-fns/locale";

function useCabins() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { isPending, data };
}

export default useCabins;
