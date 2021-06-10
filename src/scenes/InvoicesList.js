import React, { useMemo, useState } from "react";
import moment from "moment";
import * as R from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { EditIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Stack,
  Text,
  IconButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import { isLoading } from "../utils/actions";
import {
  deleteInvoice,
  DELETE_INVOICE,
  duplicateInvoice,
  DUPLICATE_INVOICE,
} from "../store/actions/invoices";
import Balances from "../components/Balances";
import ReportInvoices from "../components/Invoice/ReportInvoices";
import Limits from "../components/Limits";

import NewInvoice from "./NewInvoice";
import { PROVIDER } from "./selector";

const InvoiceItem = ({ invoice, setInvoice }) => {
  const idLoading = useSelector(({ invoices }) => invoices.idLoading);
  const deleting = useSelector((state) => isLoading(DELETE_INVOICE, state));
  const duplicating = useSelector((state) =>
    isLoading(DUPLICATE_INVOICE, state)
  );

  const dispatch = useDispatch();

  return (
    <Stack
      isInline
      _hover={{ background: "green.100" }}
      alignItems="center"
      borderLeftColor="blue.400"
      borderLeftRadius={4}
      borderLeftWidth="5px"
      justifyContent="space-between"
      padding="2"
      shadow="md"
    >
      <Stack>
        <Text fontSize="xs" textAlign="center">
          {moment(invoice.date).format("DD/MM/YYYY")}
        </Text>
        <Text fontSize="xs" fontWeight="bold" textAlign="center">
          {moment(invoice.date).format("HH:mm:ss")}
        </Text>
      </Stack>
      <Text>{PROVIDER[invoice.provider]}</Text>
      <Text>Factura {invoice.type}</Text>
      <Text fontWeight="bold">${invoice.amount.toFixed(2)}</Text>
      <Stack direction={{ base: "column", md: "column", lg: "row" }}>
        <IconButton
          icon={<EditIcon />}
          size="xs"
          onClick={() => setInvoice(invoice)}
        />
        <IconButton
          icon={<DeleteIcon />}
          isLoading={deleting && idLoading === invoice._id}
          size="xs"
          onClick={() => dispatch(deleteInvoice(invoice._id))}
        />
        <IconButton
          icon={<AddIcon />}
          isLoading={duplicating && idLoading === invoice._id}
          size="xs"
          onClick={() =>
            dispatch(
              duplicateInvoice({
                ...invoice,
                date: new Date().getTime(),
              })
            )
          }
        />
      </Stack>
    </Stack>
  );
};

const InvoicesList = () => {
  const user = useSelector(({ user }) => user);
  const [invoice, setInvoice] = useState(null);
  const invoices = useSelector(({ invoices }) => invoices.list);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sortedInvoices = useMemo(
    () => R.sort(R.descend(R.prop("date")), invoices || []),
    [invoices]
  );

  return (
    <Stack
      direction={{ base: "column", md: "column", lg: "row" }}
      spacing={12}
      padding={{ lg: 10, base: 2, md: 5 }}
    >
      <Stack
        width={{ base: "100%", md: "100%", lg: "50%" }}
        minWidth={{ base: "100%", md: "100%", lg: "470px" }}
        maxWidth={{ base: "100%", md: "100%", lg: "470px" }}
      >
        <Stack justifyContent="flex-start" spacing={12}>
          <ReportInvoices invoices={sortedInvoices} />
          {user.isPremiun && <Balances />}
          <Limits />
        </Stack>
      </Stack>
      <Stack width="100%">
        <Button
          colorScheme="blue"
          onClick={() => {
            setInvoice(null);
            onOpen();
          }}
        >
          Nueva factura
        </Button>
        {sortedInvoices.map((invoice) => (
          <InvoiceItem
            key={invoice._id}
            invoice={invoice}
            setInvoice={(invoice) => {
              setInvoice(invoice);
              onOpen();
            }}
          />
        ))}
      </Stack>
      <NewInvoice invoice={invoice} isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default InvoicesList;
