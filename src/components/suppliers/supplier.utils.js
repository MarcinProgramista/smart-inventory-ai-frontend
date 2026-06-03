export function normalizeSupplierPayload(form) {
  return {
    name: form.name?.trim() || "",
    street: form.street?.trim() || null,
    postal_code: form.postal_code?.trim() || null,
    city: form.city?.trim() || "",
    country: form.country?.trim().toUpperCase() || "PL",
    contact_id: form.contact_id || null,
  };
}
export function validateSupplier(form) {
  const errors = {};

  if (!form.name || form.name.trim().length < 2) {
    errors.name = "Min. 2 characters";
  }

  if (!form.city || form.city.trim().length < 2) {
    errors.city = "Min. 2 characters";
  }

  if (!form.country || form.country.trim().length !== 2) {
    errors.country = "Country code must have 2 characters";
  }

  const postalRegex = /^\d{2}-\d{3}$/;

  if (!form.postal_code || !postalRegex.test(form.postal_code.trim())) {
    errors.postal_code = "Format: 00-000";
  }

  return errors;
}
export const normalizePostalCode = (value = "") => {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 2) return digits;

  return `${digits.slice(0, 2)}-${digits.slice(2, 5)}`;
};

const errorMap = {
  "Supplier name": "name",
  "City is required": "city",
  "Invalid country code": "country",
  "Postal code": "postal_code",
  "Invalid contact_id": "contact_id",
};

export function mapBackendSupplierErrors(errors = []) {
  const result = {};

  errors.forEach((message) => {
    Object.entries(errorMap).forEach(([key, field]) => {
      if (message.includes(key)) {
        result[field] = message;
      }
    });
  });

  return result;
}
