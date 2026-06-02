/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import EntityDrawer from "../shared/drawer/EntityDrawer";
import { mapBackendSupplierErrors, validateSupplier } from "./supplier.utils";
import styled from "styled-components";
import RegisterButton from "../ui/buttons/RegisterButton";
import Input from "../common/Input";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateSupplier(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setSubmitting(true);

      await onSubmit(form);

      setForm(EMPTY_FORM);
      setErrors({});
      onClose();
    } catch (err) {
      const backendErrors = err?.response?.data?.errors || [];

      const nextErrors = mapBackendSupplierErrors(backendErrors);

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <EntityDrawer
      open={open}
      title={initialData ? "Edit supplier" : "Add supplier"}
      onClose={onClose}
    >
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          name="city"
          value={form.city}
          onChange={handleChange}
          error={errors.city}
        />
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
