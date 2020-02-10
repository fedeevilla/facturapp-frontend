/* eslint-disable no-loop-func */
import moment from "moment";
import * as R from "ramda";

const groupingInvoices = invoices => {
  const mappingInvoices = invoices.map(i => {
    return {
      ...i,
      group: moment(i.date).format("YYYYMM")
    };
  });

  return R.groupBy(R.prop("group"))(mappingInvoices);
};

export const lastYeartAmount = invoices => {
  const groupping = groupingInvoices(invoices);

  const date = new Date();
  const lastMonths = [];
  for (let i = 1; i < 13; i++) {
    lastMonths.push(
      date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2)
    );
    date.setMonth(date.getMonth() - 1);
  }

  let suma = 0;
  for (let i = 0; i < 12; i++) {
    !R.isNil(groupping[lastMonths[i]]) &&
      R.forEach(i => (suma += i.amount), groupping[lastMonths[i]]);
  }

  return suma;
};

export const thisMonthAmount = invoices => {
  const groupping = groupingInvoices(invoices);

  const date = new Date();
  const thisMonth =
    date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2);
  let suma = 0;
  !R.isNil(groupping[thisMonth]) &&
    R.forEach(i => (suma += i.amount), groupping[thisMonth]);

  return suma;
};

export const lastMonthAmount = invoices => {
  const groupping = groupingInvoices(invoices);

  const date = new Date();
  const thisMonth = date.getFullYear() + ("0" + date.getMonth()).slice(-2);
  let suma = 0;
  !R.isNil(groupping[thisMonth]) &&
    R.forEach(i => (suma += i.amount), groupping[thisMonth]);

  return suma;
};

export const lastYearAmount = invoices => {
  const year = new Date().getFullYear().toString();
  let suma = 0;

  R.forEach(i => {
    if (year === moment(i.date).format("YYYY")) {
      suma += i.amount;
    }
  }, invoices);
  return suma;
};
