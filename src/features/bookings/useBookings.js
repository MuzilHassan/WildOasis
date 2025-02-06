import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useBookings() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { isPending, data, isError, error };
}

export default useBookings;
