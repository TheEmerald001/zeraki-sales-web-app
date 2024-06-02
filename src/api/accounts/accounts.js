import { moduleAxios } from "../axios";

// implements apis for school account actions
// A. Invoices

// i. Invoice a school-create new invoice
export const createInvoice = async (
  invoice_number,
  due_date,
  amount,
  product,

  schoolId,
  schoolName
) => {
  return await moduleAxios.post(`/invoices`, {
    invoice_number,
    due_date,
    amount,
    product,
    status: "UNPAID",

    schoolId,
    schoolName,
  });
};

// ii. Update a school Invoice - change details including status
export const updateInvoice = async (
  invoice_number,
  due_date,
  amount,
  product,

  invoice_id
) => {
  return await moduleAxios.patch(`/invoices/${invoice_id}`, {
    invoice_number,
    due_date,
    amount,
    product,
  });
};

// iii. Delete a school onvoice - delete from DB
export const deleteInvoice = async (invoice_id) => {
  return await moduleAxios.delete(`/invoices/${invoice_id}`);
};

// B. Collections
// i. create a collection entry
export const createCollection = async (
  amount,
  date_created,
  channel,
  status,

  collection_number,
  invoice_number,
  school_reg,

  schoolId,
  invoiceId
) => {
  return await moduleAxios.post(`/collections`, {
    amount,
    date_created,
    date_updated: date_created,
    channel,
    status,

    collection_number,
    invoice_number,
    school_reg,

    schoolId,
    invoiceId,
  });
};

// ii. update collection status
export const updateCollection = async (
  status,

  collection_ref
) => {
  return await moduleAxios.patch(`/collections/${collection_ref}`, {
    date_updated: new Date(),
    status,
  });
};

// get due invoices
export const getDueInvoices = async () => {
  return await moduleAxios.get(`/invoices?_embed=school`);
};

export const updateInvoiceStatus = async (status, invoiceId) => {
  return await moduleAxios.patch(`/invoices/${invoiceId}`, {
    status,
  });
};
