import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiOutlineDuplicate } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import useCreateCabin from "./useCreateCabin";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  const { name, maxCapacity, image, discount, regularPrice, id } = cabin;

  const { isPending, mutate } = useDeleteCabin();
  const { isCreating, mutate: mutateCreate } = useCreateCabin();
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <TableRow role="row">
        <Img src={`${image}`} alt="cabin_image" />
        <Cabin>{name}</Cabin>
        <div>Can fit upto {maxCapacity} peoples</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount}</Discount>
        <div>
          <button disabled={isPending} onClick={() => mutate(id)}>
            <HiOutlineTrash />
          </button>
          <button onClick={() => setShowForm((state) => !state)}>
            <BiEdit />
          </button>
          <button
            disabled={isCreating}
            onClick={() =>
              mutateCreate({
                maxCapacity,
                image,
                discount,
                regularPrice,
                name: `Copy of ${name}`,
              })
            }
          >
            <HiOutlineDuplicate />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabin={cabin} />}
    </>
  );
}

export default CabinRow;
