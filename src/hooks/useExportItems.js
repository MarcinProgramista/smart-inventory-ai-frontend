import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function useExportItems() {
  const exportCSV = (items) => {
    if (!items?.length) return;
    const headers = ["Name", "Quantity", "Min", "Supplier", "Netto", "Brutto"];
    const rows = items.map((item) => [
      item.name,
      item.quantity,
      item.min_quantity,
      item.supplier_name || "-",
      item.price,
      (item.price * 1.23).toFixed(2),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "items.csv";
    a.click();
  };
  return { exportCSV };
}
