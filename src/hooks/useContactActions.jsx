import { axiosPrivate } from "../api/axios";
import API_CONFIG from "../config/api";

export default function useContactActions({ showToast }) {
  const addContact = async (payload) => {
    try {
      await axiosPrivate.post(API_CONFIG.ENDPOINTS.CONTACTS, payload);
      showToast("Contact added");
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to add contact";
      showToast(message, "error");
      throw error;
    }
  };
  const updateContact = async (id, payload) => {
    try {
      await axiosPrivate.patch(
        `${API_CONFIG.ENDPOINTS.CONTACTS}/${id}`,
        payload,
      );

      showToast("Contact updated");
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to update contact";

      showToast(message, "error");

      throw error;
    }
  };
  const deleteContact = async (contact) => {
    try {
      await axiosPrivate.delete(
        `${API_CONFIG.ENDPOINTS.CONTACTS}/${contact.id}`,
      );
      showToast(`Deleted contact: ${contact.first_name} ${contact.last_name}`);
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to delete contact";
      showToast(message, "error");
      throw error;
    }
  };
  return {
    addContact,
    updateContact,
    deleteContact,
  };
}
