import { moduleAxios } from "../axios";

//  Implements API Endpoints for School (and actions)
//  i. View all schools
export const getSchools = async () => {
  return await moduleAxios.get(`/schools`);
};

// ii. Create a new School
export const createSchool = async (school_details) => {
  return await moduleAxios.post(`/schools`, school_details);
};

//  iii. View school Details with invoices
export const getSchoolInvoiceDetail = async (school_code) => {
  return await moduleAxios.get(`/schools/${school_code}?_embed=invoices`);
};

//  iv. View school Details with collections
export const getSchoolCollectionDetail = async (school_code) => {
  return await moduleAxios.get(`/schools/${school_code}?_embed=collections`);
};

