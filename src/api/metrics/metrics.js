import { moduleAxios } from "../axios";

// i. Fetch total collections made
export const getCollections = async () => {
  return await moduleAxios.get(`/collections`);
};

// Fetch due Invoices
export const getInvoices = async () => {
  return await moduleAxios.get(`/invoices`);
};
