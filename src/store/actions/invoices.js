import { makeAction } from "async-action-creator";
import { createApiThunk } from "../../utils/thunk";
import api from "../../utils/api";

export const FETCH_INVOICES = makeAction("invoices/FETCH_INVOICES");
export const CREATE_INVOICE = makeAction("recipes/CREATE_INVOICE");
export const DELETE_INVOICE = makeAction("recipes/DELETE_INVOICE");
export const UPDATE_INVOICE = makeAction("recipes/UPDATE_INVOICE");

export const fetchiInvoices = createApiThunk({
  action: FETCH_INVOICES,
  request: async () => await api.invoices.fetch(),
  rejectedMessage: {
    message: "Error",
    description: "No se pudo cargar la lista de facturas"
  }
});

export const createInvoice = createApiThunk({
  action: CREATE_INVOICE,
  request: async data => await api.invoices.create(data),
  resolvedMessage: {
    message: "Éxito",
    description: "La factura se guardó correctamente"
  },
  rejectedMessage: {
    message: "Error",
    description: "Hubo un problema al guardar la factura"
  }
});

export const deleteInvoice = createApiThunk({
  action: DELETE_INVOICE,
  request: async _id => {
    await api.invoices.delete(_id);
    return _id;
  },
  resolvedMessage: {
    message: "Éxito",
    description: "La factura se eliminó correctamente"
  },
  rejectedMessage: {
    message: "Error",
    description: "Hubo un problema al eliminar la factura"
  }
});

export const updateInvoice = createApiThunk({
  action: UPDATE_INVOICE,
  request: async ({ idInvoice, formData }) =>
    await api.invoices.update(idInvoice, formData),
  resolvedMessage: {
    message: "Éxito",
    description: "La factura se actualizó correctamente"
  },
  rejectedMessage: {
    message: "Error",
    description: "Hubo un problema al actualizar la factura"
  }
});
