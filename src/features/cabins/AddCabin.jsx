import Button from "../../ui/Button";

import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/ModalV2";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [showModal, setShowModal] = useState(false);
//   return (
//     <>
//       {" "}
//       <Button onClick={() => setShowModal((state) => !state)}>
//         {showModal ? "Close Form" : "Add Cabin"}
//       </Button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <CreateCabinForm onClose={() => setShowModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
