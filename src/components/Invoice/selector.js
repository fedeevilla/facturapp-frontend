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
      // eslint-disable-next-line no-loop-func
      groupping[lastMonths[i]].map(i => (suma += i.amount));
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
    groupping[thisMonth].map(i => (suma += i.amount));

  return suma;
};

export const lastMonthAmount = invoices => {
  const groupping = groupingInvoices(invoices);

  const date = new Date();
  const thisMonth = date.getFullYear() + ("0" + date.getMonth()).slice(-2);
  let suma = 0;
  !R.isNil(groupping[thisMonth]) &&
    groupping[thisMonth].map(i => (suma += i.amount));

  return suma;
};