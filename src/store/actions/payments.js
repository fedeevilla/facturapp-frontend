import { makeAction } from "async-action-creator";
import { createApiThunk } from "../../utils/thunk";
import api from "../../utils/api";

export const FETCH_PAYMENTS = makeAction("payments/FETCH_PAYMENTS");
export const CREATE_PAYMENT = makeAction("recipes/CREATE_PAYMENT");
export const DELETE_PAYMENT = makeAction("recipes/DELETE_PAYMENT");
export const UPDATE_PAYMENT = makeAction("recipes/UPDATE_PAYMENT");

export const fetchPayments = createApiThunk({
  action: FETCH_PAYMENTS,
  request: async () => await api.payments.fetch(),
  rejectedMessage: {
    message: "Error",
    description: "No se pudo cargar la lista de pagos"
  }
});

export const createPayment = createApiThunk({
  action: CREATE_PAYMENT,
  request: async data => await api.payments.create(data),
  resolvedMessage: {
    message: "Éxito",
    description: "El pago se guardó correctamente"
  },
  rejectedMessage: {
    message: "Error",
    description: "Hubo un problema al guardar el pago"
  }
});

export const deletePayment = createApiThunk({
  action: DELETE_PAYMENT,
  request: async _id => {
    await api.payments.delete(_id);
    return _id;
  },
  resolvedMessage: {
    message: "Éxito",
    description: "El pago se eliminó correctamente"
  },
  rejectedMessage: {
    message: "Error",
    description: "Hubo un problema al eliminar el pago"
  }
});

export const updatePayment = createApiThunk({
  action: UPDATE_PAYMENT,
  request: async ({ idPayment, formData }) =>
    await api.payments.update(idPayment, formData),
  resolvedMessage: {
    message: "Éxito",
    description: "El pago se actualizó correctamente"
  },
  rejectedMessage: {
    message: "Error",
    description: "Hubo un problema al actualizar el pago"
  }
});
