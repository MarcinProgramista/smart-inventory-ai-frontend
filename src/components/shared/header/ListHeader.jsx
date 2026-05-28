import { ArrowLeft, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import NeonButton from "../../ui/buttons/NeonButton";
import { ButtonRow, Header } from "./ListHeader.styles";

export default function ListHeader({
  onAdd,
  onExportCSV,
  onExportPDF,
  heading,
  addTitle,
}) {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <h1>{heading}</h1>
      </Header>

      <ButtonRow>
        <NeonButton onClick={() => navigate("/home")}>
          <ArrowLeft /> Back
        </NeonButton>

        <NeonButton onClick={onAdd}>
          <PlusCircle />
          {addTitle}
        </NeonButton>
        <NeonButton onClick={onExportCSV}>Export CSV</NeonButton>
        <NeonButton onClick={onExportPDF}>Export PDF</NeonButton>
      </ButtonRow>
    </>
  );
}
