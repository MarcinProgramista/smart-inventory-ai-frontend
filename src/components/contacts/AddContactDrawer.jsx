import styled from "styled-components";
import NeonCardBright from "../ui/NeonCardBright";

/* eslint-disable no-unused-vars */
const EMPTY_FORM = {
  first_name: "",
  last_name: "",
  email: "",
  role: "",
  mobile_phone: "",
};
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  z-index: 9999;
  justify-content: center;
  align-items: center;
`;
const ModalBox = styled(NeonCardBright)`
  width: 520px;
  max-width: 95%;
  padding: 2.4rem;
  position: relative;
`;
export default function AddContactDrawer({
  open,
  onClose,
  onSubmit,
  initialData = null,
}) {
  if (!open) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>Add contact</ModalBox>
    </Backdrop>
  );
}
