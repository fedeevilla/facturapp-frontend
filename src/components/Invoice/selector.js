/* eslint-disable no-loop-func */
import moment from "moment";
import * as R from "ramda";

const lastMonthsFromToday = () => {
  const date = new Date();
  let lastMonths = [];
  for (let i = 0; i < 12; i++) {
    lastMonths.push(moment(date).subtract(i, "months").format("YYYYMM"));
  }

  return lastMonths;
};
const groupingInvoices = (invoices) => {
  const mappingInvoices = invoices.map((i) => {
    return {
      ...i,
      group: moment(i.date).format("YYYYMM"),
    };
  });

  return R.groupBy(R.prop("group"))(mappingInvoices);
};

export const lastInterannualAmount = (invoices) => {
  const groupping = groupingInvoices(invoices);
  const lastMonths = lastMonthsFromToday();

  let suma = 0;
  for (let i = 0; i < 12; i++) {
    !R.isNil(groupping[lastMonths[i]]) &&
      R.forEach((i) => (suma += i.amount), groupping[lastMonths[i]]);
  }

  return suma;
};

export const lastInterannualAmountNext = (invoices) => {
  const groupping = groupingInvoices(invoices);
  const lastMonths = lastMonthsFromToday();

  let suma = 0;
  for (let i = 0; i < 12; i++) {
    !R.isNil(groupping[lastMonths[i]]) &&
      R.forEach((i) => (suma += i.amount), groupping[lastMonths[i]]);
  }

  return suma;
};

export const lastYearAmount = (invoices) => {
  const groupping = groupingInvoices(invoices);
  const date = new Date();
  const lastYear = moment(date).subtract(1, "year").format("YYYY");

  let suma = 0;
  const keys = R.keys(groupping).filter((k) => k.includes(lastYear));
  keys.forEach((k) =>
    groupping[k].forEach((invoice) => {
      suma += invoice.amount;
    })
  );

  return suma;
};

export const thisMonthAmount = (invoices) => {
  const groupping = groupingInvoices(invoices);
  const date = new Date();
  const thisMonth = moment(date).format("YYYYMM");

  let suma = 0;
  !R.isNil(groupping[thisMonth]) &&
    R.forEach((i) => (suma += i.amount), groupping[thisMonth]);

  return suma;
};

export const lastMonthAmount = (invoices) => {
  const groupping = groupingInvoices(invoices);
  const date = new Date();
  const lastMonth = moment(date).subtract(1, "month").format("YYYYMM");

  let suma = 0;
  !R.isNil(groupping[lastMonth]) &&
    R.forEach((i) => (suma += i.amount), groupping[lastMonth]);

  return suma;
};

export const lastYearPartialAmount = (invoices) => {
  const year = new Date().getFullYear().toString();
  let suma = 0;

  R.forEach((i) => {
    if (year === moment(i.date).format("YYYY")) {
      suma += i.amount;
    }
  }, invoices);
  return suma;
};

export const months = () => {
  const res = [];
  const date = moment();
  for (let i = 0; i < 12; i++) {
    res.push(date.format("MMM-YY"));
    date.add(-1, "months");
  }
  return R.reverse(res);
};

export const amountPerMonth = (invoices) => {
  const groupping = groupingInvoices(invoices);
  const lastMonths = lastMonthsFromToday();

  const res = [];
  for (let i = 0; i < 12; i++) {
    let suma = 0;
    !R.isNil(groupping[lastMonths[i]]) &&
      R.forEach((i) => (suma += i.amount), groupping[lastMonths[i]]);
    res.push(suma);
  }

  return R.reverse(res);
};
