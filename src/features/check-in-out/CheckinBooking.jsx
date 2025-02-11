import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import Checkbox from "../../ui/Checkbox";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import useCheckin from "./useCheckin";
import useSettings from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirm, setConfirm] = useState(false);
  const [wantBreakfast, setWantBreakfast] = useState(false);

  const { data: booking = {}, isPending } = useBooking();
  const { data: { breakfastPrice } = {} } = useSettings();
  const { isCheckin, mutate } = useCheckin();
  const {
    id: bookingId,

    isPaid,
    status,
    totalPrice,
    hasBreakfast,
    numGuests,
    numNights,
  } = booking;

  const addBreakfastPrice = breakfastPrice * numGuests * numNights;

  useEffect(() => {
    setConfirm(isPaid ?? false);
  }, [isPaid]);
  function handleCheckin() {
    if (!confirm) return;
    if (wantBreakfast) {
      const extrasObject = {
        extrasPrice: addBreakfastPrice,
        hasBreakfast: true,
        totalPrice: totalPrice + addBreakfastPrice,
      };
      mutate({ bookingId, extrasObject });
    } else {
      mutate({ bookingId, extrasObject: {} });
    }
  }

  if (isPending) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id={bookingId}
            onChange={() => {
              setWantBreakfast((state) => !state);
            }}
            checked={wantBreakfast}
          >
            Do you want to add breakfast for {formatCurrency(addBreakfastPrice)}{" "}
            amount
          </Checkbox>
        </Box>
      )}{" "}
      <Box>
        <Checkbox
          id={bookingId}
          onChange={() => {
            setConfirm((state) => !state);
          }}
          checked={confirm}
          disabled={confirm}
        >
          Please confirm that guest has paid the due amount
        </Checkbox>
      </Box>
      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={handleCheckin} disabled={!confirm || isCheckin}>
            Check in booking #{bookingId}
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
