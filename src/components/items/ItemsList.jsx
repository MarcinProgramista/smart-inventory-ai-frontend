/* eslint-disable no-unused-vars */
import ListHeader from "../shared/header/ListHeader";
import { PageWrapper } from "../shared/table/Table.styles";
import useExportItems from "../../hooks/useExportItems";
import Pagination from "../shared/Pagination";

import useCategories from "../../hooks/useCategories";
import useSuppliers from "../../hooks/useSuppliers";
import StockLegend from "./StockLegend";
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
