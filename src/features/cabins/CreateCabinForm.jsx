import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ onClose, cabin = {} }) {
  const { id: cabinId, ...values } = cabin;
  const isEdit = Boolean(cabinId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({ defaultValues: isEdit ? values : {} });

  const { isCreating, mutate } = useCreateCabin();
  const { isEditing, mutateEdit } = useEditCabin();

  const isPending = isCreating || isEditing;

  const onSubmit = (data) => {
    const image =
      typeof data?.image === "string" ? data?.image : data?.image[0];
    const cabin = { ...data, image: image };
    if (isEdit) mutateEdit({ cabin, id: cabinId });
    else
      mutate(cabin, {
        onSuccess: () => {
          onClose?.();
          reset();
        },
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormRow label={"name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", {
            required: "This Feild is required",
          })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isPending}
          {...register("maxCapacity", {
            required: "This Feild is required",
            min: 1,
            message: "Capacity should be atleast one",
          })}
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isPending}
          {...register("regularPrice", {
            required: "This Feild is required",
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isPending}
          defaultValue={0}
          {...register("discount", {
            required: "This Feild is required",
            validate: (value) =>
              parseFloat(value) <= parseFloat(getValues().regularPrice) ||
              "Discount cannot be greather then regular price",
          })}
        />
      </FormRow>

      <FormRow
        label={"Description for Website"}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          disabled={isPending}
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This Feild is required",
          })}
        />
      </FormRow>

      <FormRow label={"Image"}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isPending}
          {...register("image", {
            required: isEdit ? false : "This Feild is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isEdit ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
