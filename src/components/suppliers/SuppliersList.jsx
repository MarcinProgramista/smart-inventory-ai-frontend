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
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  SortAscIcon,
  SortDescIcon,
  Trash2,
} from "lucide-react";
import { exportSuppliersToCSV, exportSuppliersToPDF } from "./export.utilis";
import Pagination from "../shared/Pagination";

const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  opacity: 0.7;
`;

function SortIcon({ active, order }) {
  if (!active) return null;
  return order === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
}

export default function SuppliersList({
  suppliers,
  query,
  page,
  limit,
  total,
  onPrev,
  onNext,
  onAdd,
  onEdit,
  onDelete,
  sortOrder,
  sortBy,
  onSortChange,
}) {
  const isEmpty = suppliers.length === 0;
  const isSearching = query && query.length > 0;

  return (
    <PageWrapper>
      <ListHeader
        heading="Suppliers"
        onAdd={onAdd}
        onExportCSV={() => exportSuppliersToCSV(suppliers)}
        onExportPDF={() => exportSuppliersToPDF(suppliers)}
        addTitle="Add Supplier"
      />
      {isEmpty ? (
        <EmptyState>
          <p>You don't have any suppliers yet.</p>
        </EmptyState>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <Tr>
                <Th
                  onClick={() =>
                    onSortChange("name", sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  Name
                  <SortIcon active={sortBy === "name"} order={sortOrder} />
                </Th>
                <Th>Street</Th>
                <Th
                  onClick={() =>
                    onSortChange("city", sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  City
                  <SortIcon active={sortBy === "city"} order={sortOrder} />
                </Th>

                <Th>Contact</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Action</Th>
              </Tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <Tr key={s.id}>
                  <Td>{s.name}</Td>
                  <Td>{s.street}</Td>
                  <Td>
                    {s.country}
                    {s.postal_code} {s.city}
                  </Td>
                  <Td>
                    {s.first_name ? `${s.first_name} ${s.last_name}` : "-"}
                  </Td>
                  <Td>{s.email ? s.email : "-"}</Td>
                  <Td>{s.mobile_phone ? s.mobile_phone : "-"}</Td>
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
      <Pagination
        page={page}
        totalPages={Math.ceil(total / limit)}
        canPrev={page > 1}
        canNext={page < Math.ceil(total / limit)}
        onPrev={onPrev}
        onNext={onNext}
      />
    </PageWrapper>
  );
}
