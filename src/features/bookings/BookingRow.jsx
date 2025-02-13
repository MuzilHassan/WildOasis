import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { Link } from "react-router-dom";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiOutlineEye,
} from "react-icons/hi2";
import useCheckout from "../check-in-out/useCheckout";
import Button from "../../ui/Button";
import Modal from "../../ui/ModalV2";
import { BiTrash } from "react-icons/bi";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;
const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* This ensures horizontal centering */
  gap: 4px;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const { checkout, isOut } = useCheckout();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { mutate: deleteBooking, isDeleting } = useDeleteBooking();
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <BtnContainer>
        <Link to={`${bookingId}`}>
          <HiOutlineEye />
        </Link>
        {status === "unconfirmed" && (
          <Link to={`/checkin/${bookingId}`} style={{ marginBottom: "3px" }}>
            <HiArrowDownOnSquare />
          </Link>
        )}
        {status === "checked-in" && (
          <button
            to={`/checkin/${bookingId}`}
            style={{
              marginBottom: "5px",
              border: "none",
              outline: "none",
              background: "none",
            }}
            disabled={isOut}
            onClick={() => checkout(bookingId)}
          >
            <HiArrowUpOnSquare />
          </button>
        )}
        <Modal>
          <Modal.Open opens={"delete-booking"}>
            <button
              style={{
                marginBottom: "5px",
                border: "none",
                outline: "none",
                background: "none",
              }}
            >
              <BiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name={"delete-booking"}>
            <ConfirmDelete
              onConfirm={() => deleteBooking(bookingId)}
              disabled={isDeleting}
              resourceName={`this booking wiht id ${bookingId}`}
            />
          </Modal.Window>
        </Modal>
      </BtnContainer>
    </Table.Row>
  );
}

export default BookingRow;
