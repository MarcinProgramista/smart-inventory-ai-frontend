import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ActionsWrapper = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.6rem;
`;
const ActionCard = styled.button`
  padding: 1.6rem;
  border-radius: 16px;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  /*Holograficzne szkł */
  background: rgba(0, 70, 120, 0.25);
  color: #9deaff;
  border: 1px solid rgba(0, 220, 255, 0.7);
  backdrop-filter: blur(12px) saturate(180%);

  /* 3d holo shadow */
  box-shadow:
    0 0 18px rgba(0, 200, 255, 0.65),
    inset 0 0 18px rgba(0, 200, 255, 0.35),
    0 18px 28px rgba(0, 120, 255, 0.35);
  transition: 0.25s ease;
  transform: perspective(900px) translateZ(0px);
  &:hover {
    transform: perspective(900px) translateZ(18px);
    box-shadow:
      0 0 25px rgba(0, 240, 255, 0.9),
      inset rgba(0, 200, 255, 0.55),
      0 12px 36px rgba(0, 200, 255, 0.45);
    background: rgba(0, 90, 150, 0.32);
    border-color: #00eaff;
  }
  &:active {
    transform: perspective(900px) translateZ(8px);
  }
`;
export default function QucikActions() {
  const navigate = useNavigate();
  return (
    <ActionsWrapper>
      <ActionCard onClick={() => navigate("/items")}>📋 View Items</ActionCard>
      <ActionCard onClick={() => navigate("/items?add=true")}>
        ➕ Add Item
      </ActionCard>
      <ActionCard onClick={() => navigate("/items/incoming")}>
        📦 Add Stock
      </ActionCard>
      <ActionCard onClick={() => navigate("/suppliers")}>
        🏭 Suppliers
      </ActionCard>
      <ActionCard onClick={() => navigate("/items/outgoing")}>
        📤 Remove Stock
      </ActionCard>
    </ActionsWrapper>
  );
}
