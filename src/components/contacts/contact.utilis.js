export const normalizePhone = (value = "") => {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("48")) {
    digits = digits.slice(2);
  }
  return digits.slice(0, 9);
};

export const format = (digits = "", withPrefix = false) => {
  if (!digits) return withPrefix ? "+48" : "-";
  const clean = normalizePhone(digits);
  if (clean.length !== 9) return withPrefix ? "+48" + clean : clean;
  const formatted = `${clean.slice(0, 3)}-${clean.slice(3, 6)}-${clean.slice(6)}`;
  return withPrefix ? `+48 ${formatted}` : formatted;
};

export function normalizeContactPayload(form) {
  return {
    first_name: form.first_name?.trim() || "",
    last_name: form.last_name?.trim() || "",
    email: form.email?.trim() || "",
    role: form.role?.trim() || "",
    mobile_phone: normalizePhone(form.mobile_phone),
  };
}

export function validateContact(form) {
  const errors = {};
  if (!form.first_name || form.first_name.trim().length < 2) {
    errors.first_name = "Min. 2 characters";
  }
  if (!form.email && !form.mobile_phone) {
    errors.email = "At least one contact method is required";
    errors.mobile_phone = "At least one contact method is required";
  }
  if (form.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      errors.email = "Invalid email format";
    }
  }
  return errors;
}
