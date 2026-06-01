import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportSuppliersToCSV(suppliers) {
  if (!suppliers || suppliers.length === 0) return;

  const headers = [
    "Name",
    "Street",
    "Postal Code",
    "City",
    "Country",
    "Contact",
  ];

  const rows = suppliers.map((s) => [
    s.name || "",
    s.street || "",
    s.postal_code || "",
    s.city || "",
    s.country || "",
    s.first_name ? `${s.first_name} ${s.last_name}` : "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    ),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "suppliers.csv";
  link.click();

  URL.revokeObjectURL(url);
}

export function exportSuppliersToPDF(suppliers) {
  if (!suppliers || suppliers.length === 0) return;

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Suppliers", 14, 15);

  const tableColumn = [
    "Name",
    "Street",
    "Postal Code",
    "City",
    "Country",
    "Contact",
  ];

  const tableRows = suppliers.map((s) => [
    s.name || "",
    s.street || "",
    s.postal_code || "",
    s.city || "",
    s.country || "",
    s.first_name ? `${s.first_name} ${s.last_name}` : "",
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 25,
    styles: {
      fontSize: 9,
    },
    headStyles: {
      fillColor: [30, 144, 255],
    },
  });

  doc.save("suppliers.pdf");
}
