import moduleAxios from "../axios";

//  Implements API Endpoints for School (and actions)
//  i. View all schools
export const getSchools = async () => {
  return await moduleAxios.get(`/schools`);
};

//  ii. Search Schools by name
export const serchSchools = async (name) => {
  return await moduleAxios.get(`/schools?name=${name}`);
};

//  iii. Display schools by type
export const getSchoolByType = async (school_type) => {
  return await moduleAxios.get(`/schools?school_type=${school_type}`);
};

//  iv. Display schools by products
export const getSchoolByProduct = async (product) => {
  return await moduleAxios.get(`/schools?product=${product}`);
};

//  v. View school Details: In details(metadata+finance overview)
export const getSchoolDetail = async (school_code) => {
  return await moduleAxios.get(`/schools/${school_code}`);
};

//  vi. View School Invoices
export const getSchoolInvoices = async (school_code) => {
  return await moduleAxios.get(`/invoices?school_ref${school_code}`);
};

//  vii. Invoice a school - this should be in accounts

//  viii. View school Collections
export const getSchoolCollections = async (school_code) => {
  return await moduleAxios.get(`/collections?school_ref=${school_code}`);
};

//  ix. Make collections from school - this should be in accounts
