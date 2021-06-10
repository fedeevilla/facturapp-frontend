import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as R from "ramda";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  CREATE_INVOICE,
  UPDATE_INVOICE,
  createInvoice,
  updateInvoice,
} from "../store/actions/invoices";
import { isLoading } from "../utils/actions";

import { PROVIDER } from "./selector";
// import "react-day-picker/lib/style.css";

const NewInvoice = ({ invoice, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const isCreating = useSelector((state) => isLoading(CREATE_INVOICE, state));
  const isUpdating = useSelector((state) => isLoading(UPDATE_INVOICE, state));
  const loading = useMemo(() => isCreating || isUpdating, [
    isCreating,
    isUpdating,
  ]);

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const { register, handleSubmit } = useForm();
  const [date, setDate] = useState(R.propOr(Date.now(), "date", invoice));

  const onSubmit = async (values) => {
    if (!date) return;

    if (!invoice) {
      await dispatch(
        createInvoice({
          ...values,
          date: new Date(date).getTime(),
        })
      );
    } else {
      await dispatch(
        updateInvoice({
          idInvoice: invoice._id,
          formData: {
            ...values,
            date: new Date(date).getTime(),
          },
        })
      );
    }
    onClose();
  };

  return (
    <Modal
      finalFocusRef={finalRef}
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>FACTURA</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ReactDatePicker
              isClearable={false}
              required
              selected={date}
              onChange={setDate}
              dateFormat="dd/MM/yyyy"
            />
            <NumberInput
              precision={2}
              step={10000}
              defaultValue={R.propOr(0, "amount", invoice)}
              marginTop="2"
              paddingRight="4.5rem"
              placeholder="Monto"
            >
              <NumberInputField
                name="amount"
                ref={register({
                  required: true,
                })}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Select
              ref={register({
                required: true,
              })}
              defaultValue={R.propOr("C", "provider", invoice)}
              marginTop="2"
              name="provider"
            >
              <option value="A">{PROVIDER["A"]}</option>
              <option value="B">{PROVIDER["B"]}</option>
              <option value="C">{PROVIDER["C"]}</option>
              <option value="E">{PROVIDER["E"]}</option>
            </Select>
            <Select
              ref={register({
                required: true,
              })}
              defaultValue={R.propOr("C", "type", invoice)}
              marginTop="2"
              name="type"
            >
              <option value="A">Factura A</option>
              <option value="B">Factura B</option>
              <option value="C">Factura C</option>
              <option value="E">Factura E</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" isLoading={loading} mr={3} type="submit">
              Guardar
            </Button>
            <Button onClick={onClose}>Salir</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default NewInvoice;
