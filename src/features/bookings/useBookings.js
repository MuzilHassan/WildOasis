import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/globalConstants";

function useBookings() {
  const [searchParams] = useSearchParams();
  const query = useQueryClient();
  const filterValue = searchParams.get("status");
  const sort = searchParams.get("sort") || "startDate-desc";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { feild: "status", value: filterValue, operator: "eq" };
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const {
    isPending,
    isError,
    data: { bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings(filter, sort, page),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    query.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings(filter, sort, page + 1),
    });
  if (page > 1)
    query.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings(filter, sort, page - 1),
    });

  return { isPending, bookings, count, isError, error };

  ///Anoter option will be using infinite queries to implement infinite scrolling unless data loading completed.
}

export default useBookings;
