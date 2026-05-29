import styled from "styled-components";

/* eslint-disable no-unused-vars */
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
export default function AddContactDrawer({
  open,
  onClose,
  onSubmit,
  initialData = null,
}) {
  if (!open) return null;

  return <Backdrop onClick={onClose}>Add contact</Backdrop>;
}
