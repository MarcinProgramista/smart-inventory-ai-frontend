import ListHeader from "../shared/header/ListHeader";
import { PageWrapper } from "../shared/table/Table.styles";
import useExportItems from "../../hooks/useExportItems";
export default function ItemsList({ items, onAdd }) {
  const { exportCSV, exportPDF } = useExportItems();
  return (
    <PageWrapper>
      <ListHeader
        onAdd={onAdd}
        onExportCSV={() => exportCSV(items)}
        onExportPDF={() => exportPDF(items)}
        heading="Items"
        addTitle="Add Item"
      />
    </PageWrapper>
  );
}
