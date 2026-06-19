/* eslint-disable no-unused-vars */
import ListHeader from "../shared/header/ListHeader";
import { PageWrapper, Table, Td, Th, Tr } from "../shared/table/Table.styles";
import useExportItems from "../../hooks/useExportItems";
import Pagination from "../shared/Pagination";

import useCategories from "../../hooks/useCategories";
import useSuppliers from "../../hooks/useSuppliers";
import StockLegend from "./StockLegend";
import { ChevronDown, ChevronUp } from "lucide-react";
function SortIcon({ active, order }) {
  if (!active) return null;
  return order === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
}
export default function ItemsList({
  items,
  onAdd,
  query,
  categoryId,
  supplierId,
  stock,
  page,
  limit,
  total,
  sortBy,
  sortOrder,
  onQueryChange,
  onCategoryChange,
  onSupplierChange,
  onStockChange,
  onSortChange,
  onPrev,
  onNext,
  stockCounts,
}) {
  const { exportCSV, exportPDF } = useExportItems();
  const categories = useCategories();
  const suppliers = useSuppliers();
  const toggleSort = (field) => {
    if (sortBy === field) {
      onSortChange(field, sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSortChange(field, "asc");
    }
  };
  return (
    <PageWrapper>
      <ListHeader
        onAdd={onAdd}
        onExportCSV={() => exportCSV(items)}
        onExportPDF={() => exportPDF(items)}
        heading="Items"
        addTitle="Add Item"
      />
      <StockLegend
        value={stock}
        onChange={onStockChange}
        counts={stockCounts}
      />
      <PageWrapper>
        <Table>
          <thead>
            <Tr>
              <Th
                onClick={() => toggleSort("name")}
                style={{ cursor: "pointer" }}
              >
                Name <SortIcon active={sortBy === "name"} order={sortOrder} />
              </Th>
            </Tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </PageWrapper>
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
