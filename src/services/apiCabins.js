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

export const insetEditCabin = async (cabin, id) => {
  const isUrl = typeof cabin?.image == "string";

  const imageName = `${Math.random()}${cabin.image.name}`.replaceAll("/", "");
  const imageUrl = isUrl
    ? cabin.image
    : `https://jpndrdzsjohlfanrgzmy.supabase.co/storage/v1/object/public/cabin_images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...cabin, image: imageUrl }]).select();
  if (id)
    query = query
      .update({ ...cabin, image: imageUrl })
      .eq("id", id)
      .select();
  const { data, error } = await query;

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  if (isUrl) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin_images")
    .upload(imageName, cabin.image, {
      cacheControl: "3600",
      upsert: false,
    });
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Couldnp't upload image therefore  cabin is not created");
  }

  return data;
};
