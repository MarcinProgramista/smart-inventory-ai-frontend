import useAxiosPrivate from "./useAxiosPrivate";
import API_CONFIG from "../config/api";

export default function useSupplierActions({ showToast }) {
  const axiosPrivate = useAxiosPrivate();

  const addSupplier = async (payload) => {
    try {
      await axiosPrivate.post(API_CONFIG.ENDPOINTS.SUPPLIERS, payload);

      showToast("Supplier added");
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to add supplier";

      showToast(message, "error");
      throw error;
    }
  };

  const updateSupplier = async (id, payload) => {
    try {
      await axiosPrivate.patch(
        `${API_CONFIG.ENDPOINTS.SUPPLIERS}/${id}`,
        payload,
      );

      showToast("Supplier updated");
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to update supplier";

      showToast(message, "error");
      throw error;
    }
  };

  const deleteSupplier = async (supplier) => {
    try {
      await axiosPrivate.delete(
        `${API_CONFIG.ENDPOINTS.SUPPLIERS}/${supplier.id}`,
      );

      showToast(`Deleted supplier: ${supplier.name}`, "error");
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to delete supplier";

      showToast(message, "error");
      throw error;
    }
  };

  return {
    addSupplier,
    updateSupplier,
    deleteSupplier,
  };
}
