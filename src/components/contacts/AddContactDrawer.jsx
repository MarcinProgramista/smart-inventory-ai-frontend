/* eslint-disable react-hooks/set-state-in-effect */
import styled from "styled-components";
import NeonCardBright from "../ui/NeonCardBright";
import Logo from "../ui/Logo";
import { useEffect, useState } from "react";
import {
  formatPhone,
  normalizePhone,
  validateContact,
  mapBackendContactErrors,
} from "./contact.utilis";
import Input from "../common/Input";
import RegisterButton from "../ui/buttons/RegisterButton";

/* eslint-disable no-unused-vars */
const EMPTY_FORM = {
  first_name: "",
  last_name: "",
  email: "",
  role: "",
  mobile_phone: "",
};
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  z-index: 9999;
  justify-content: center;
  align-items: center;
`;
const ModalBox = styled(NeonCardBright)`
  width: 520px;
  max-width: 95%;
  padding: 2.4rem;
  position: relative;
`;
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
export default function AddContactDrawer({
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
        first_name: initialData.first_name ?? "",
        last_name: initialData.last_name ?? "",
        email: initialData.email ?? "",
        role: initialData.role ?? "",
        mobile_phone: initialData.mobile_phone ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setErrors({});
  }, [initialData, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile_phone") {
      setForm((prev) => ({
        ...prev,
        mobile_phone: normalizePhone(value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateContact(form);

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

      const nextErrors = mapBackendContactErrors(backendErrors);

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Backdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Logo>{initialData ? "Edit contact" : "Add contact"}</Logo>
        <Form onSubmit={handleSubmit}>
          <Input
            name="first_name"
            placeholder="First name"
            value={form.first_name}
            onChange={handleChange}
            error={errors.first_name}
          />
          <Input
            name="last_name"
            placeholder="Last name"
            value={form.last_name}
            onChange={handleChange}
            error={errors.last_name}
          />
          <Input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            error={errors.role}
          />
          <Input
            name="mobile_phone"
            placeholder="+48 ___-___-___"
            value={formatPhone(form.mobile_phone, true)}
            onChange={handleChange}
            error={errors.mobile_phone}
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
      </ModalBox>
    </Backdrop>
  );
}
