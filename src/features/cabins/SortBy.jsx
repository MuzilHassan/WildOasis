import { useSearchParams } from "react-router-dom";
import Select from "../../ui/Select";

function SortBy({
  options = [
    { value: "name-asc", label: "Sort from A-Z" },
    { value: "name-dsc", label: "Sort from Z-A" },
    { value: "regularPrice-asc", label: "sort by price in asc" },
    { value: "regularPrice-dsc", label: "sort by price in dsc" },
    { value: "maxCapacity-asc", label: "sort by room capacity in asc" },
    { value: "maxCapacity-dsc", label: "sort by room capacity in dsc" },
  ],
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (value) => {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };
  return <Select options={options} handleChange={handleChange} />;
}

export default SortBy;
