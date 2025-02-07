import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sort = searchParams.get("sort") || "startDate-desc";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { feild: "status", value: filterValue, operator: "eq" };
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["bookings", filter, sort],
    queryFn: () => getBookings(filter, sort),
  });

  return { isPending, data, isError, error };
}

export default useBookings;
