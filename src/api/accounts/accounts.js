import moduleAxios from "../axios";

// implements apis for school account actions
// A. Invoices

// i. Invoice a school-create new invoice
export const createInvoice = async (
  invoice_number,
  due_date,
  amount,
  product,
  status,

  school_ref
) => {
  return await moduleAxios.post(`/invoices`, {
    invoice_number,
    due_date,
    amount,
    product,
    status,

    school_ref,
  });
};

// ii. Update a school Invoice - change details including status
export const updateInvoice = async (
  due_date,
  amount,
  product,
  status,

  invoice_id
) => {
  return await moduleAxios.patch(`/invoices/${invoice_id}`, {
    due_date,
    amount,
    product,
    status,
  });
};

// iii. Delete a school onvoice - delete from DB
export const deleteInvoice = async (invoice_id) => {
  return await moduleAxios.delete(`/invoices/${invoice_id}`);
};


// B. Collections
// i. create a collection entry
export const createCollection = async (
  invoice_number,
  date_created,
  date_updated,
  amount,
  status,

  school_ref,
  invoice_ref
) => {
  return await moduleAxios.post(`/collections`, {
    invoice_number,
    date_created,
    date_updated,
    amount,
    status,

    school_ref,
    invoice_ref,
  });
};

// ii. update collection status
export const updateCollection = async (
  date_updated,
  amount,
  status,

  collection_ref
) => {
  return await moduleAxios.patch(`/collections/${collection_ref}`, {
    date_updated,
    amount,
    status,
  });
};
