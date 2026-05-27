import { ChevronDown, ChevronUp } from "lucide-react";
import styled from "styled-components";
import { PageWrapper } from "../shared/table/Table.styles";

/* eslint-disable no-unused-vars */
const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  opacity: 0.7;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 15px;
`;
function SortIcon({ active, order }) {
  if (!active) return null;
  return order === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
}
export default function ContactList({
  contacts,
  query,
  page,
  limit,
  total,
  onPrev,
  onNext,
  onEdit,
  onDelete,
  onAdd,
  sortBy,
  sortOrder,
  onSortChange,
}) {
  return (
    <>
      <PageWrapper></PageWrapper>
    </>
  );
}
