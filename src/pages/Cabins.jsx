import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import { useState } from "react";
import Modal from "../ui/Modal";

function Cabins() {
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowModal((state) => !state)}>
          {showModal ? "Close Form" : "Add Cabin"}
        </Button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CreateCabinForm onClose={() => setShowModal(false)} />
          </Modal>
        )}
      </Row>
    </>
  );
}

export default Cabins;
