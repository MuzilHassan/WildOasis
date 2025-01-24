import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import useSettings from "./useSettings";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isPending,
    data: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isEditing, mutateEdit } = useUpdateSetting();

  const handleBlur = (e) => {
    const { name, value } = e.target;

    mutateEdit({ [name]: value });
  };
  if (isPending) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          name="minBookingLength"
          defaultValue={minBookingLength}
          onBlur={handleBlur}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          name="maxBookingLength"
          defaultValue={maxBookingLength}
          onBlur={handleBlur}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          name="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
          onBlur={handleBlur}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          name="breakfastPrice"
          defaultValue={breakfastPrice}
          onBlur={handleBlur}
          disabled={isEditing}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
