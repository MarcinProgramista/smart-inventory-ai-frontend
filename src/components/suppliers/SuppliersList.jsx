/* eslint-disable no-unused-vars */
import styled from "styled-components";
import {
  ActionButton,
  PageWrapper,
  Table,
  TableWrapper,
  Td,
  Th,
  Tr,
} from "../shared/table/Table.styles";
import ListHeader from "../shared/header/ListHeader";
import { Pencil, Trash2 } from "lucide-react";

const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  opacity: 0.7;
`;
export default function SuppliersList({
  suppliers,
  query,
  onAdd,
  onEdit,
  onDelete,
}) {
  const isEmpty = suppliers.length === 0;
  const isSearching = query && query.length > 0;
  return (
    <PageWrapper>
      <ListHeader heading="Suppliers" onAdd={onAdd} addTitle="Add Supplier" />
      {isEmpty ? (
        <EmptyState>
          <p>You don't have any suppliers yet.</p>
        </EmptyState>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <Tr>
                <Th>Name</Th>
                <Th>City</Th>
                <Th>Country</Th>
                <Th>Contact</Th>
                <Th>Action</Th>
              </Tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <Tr key={s.id}>
                  <Td>{s.name}</Td>
                  <Td>{s.city}</Td>
                  <Td>{s.country}</Td>
                  <Td>
                    {s.first_name ? `${s.first_name} ${s.last_name}` : "-"}
                  </Td>
                  <Td>
                    <ActionButton onClick={() => onEdit(s)}>
                      <Pencil size={16} />
                    </ActionButton>
                    <ActionButton $delete onClick={() => onDelete(s)}>
                      <Trash2 size={16} />
                    </ActionButton>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </PageWrapper>
  );
}
