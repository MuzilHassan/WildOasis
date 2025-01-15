import supabase from "./supabase";
export const getCabins = async () => {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) console.log(error);
  console.log(cabins, "pop");
  return cabins;
};
