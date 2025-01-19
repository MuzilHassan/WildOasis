import supabase from "./supabase";
export const getCabins = async () => {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error(error);
  return cabins;
};

export const deleteCabin = async (cabinId) => {
  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const insetCabin = async (cabin) => {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabin])
    .select();
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data;
};
