import styled from "styled-components";
import NeonCardBright from "../../ui/NeonCardBright";
import Logo from "../../ui/Logo";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  z-index: 9998;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled(NeonCardBright)`
  width: 520px;
  max-width: 95%;
  padding: 2.4rem;
  position: relative;
`;

export default function EntityDrawer({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Logo>{title}</Logo>
        {children}
      </ModalBox>
    </Backdrop>
  );
}
