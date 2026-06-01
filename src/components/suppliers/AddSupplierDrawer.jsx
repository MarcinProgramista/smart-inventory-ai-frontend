/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import EntityDrawer from "../shared/drawer/EntityDrawer";
const EMPTY_FORM = {
  name: "",
  street: "",
  postal_code: "",
  city: "",
  country: "PL",
  contact_id: "",
};
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
  return (
    <EntityDrawer
      open={open}
      title={initialData ? "Edit supplier" : "Add supplier"}
      onClose={onClose}
    ></EntityDrawer>
  );
}
