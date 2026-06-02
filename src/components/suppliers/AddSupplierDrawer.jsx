/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import EntityDrawer from "../shared/drawer/EntityDrawer";
import { validateSupplier } from "./supplier.utils";
import styled from "styled-components";
import RegisterButton from "../ui/buttons/RegisterButton";
const EMPTY_FORM = {
  name: "",
  street: "",
  postal_code: "",
  city: "",
  country: "PL",
  contact_id: "",
};
const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
`;
const Footer = styled.div`
  margin-top: auto;
  padding-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  border-top: 1px solid rgba(0, 180, 255, 0.1);
`;
export default function AddSupplierDrawer({
  open,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name ?? "",
        street: initialData.street ?? "",
        postal_code: initialData.postal_code ?? "",
        city: initialData.city ?? "",
        country: initialData.country ?? "PL",
        contact_id: initialData.contact_id ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setErrors({});
  }, [initialData, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateSupplier(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  };
  return (
    <EntityDrawer
      open={open}
      title={initialData ? "Edit supplier" : "Add supplier"}
      onClose={onClose}
    >
      <Form onSubmit={handleSubmit}>
        <Footer>
          <RegisterButton
            type="button"
            $variant="secondary"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </RegisterButton>

          <RegisterButton type="submit" disabled={submitting}>
            {submitting ? "Saving..." : initialData ? "Save changes" : "Add"}
          </RegisterButton>
        </Footer>
      </Form>
    </EntityDrawer>
  );
}
