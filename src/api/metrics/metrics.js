import moduleAxios from "../axios";

// implements apis that return data from the server
// A. Top Card Metrics
// i. Total collections made
export const getCollections = async () => {
    return await moduleAxios.get(`/collections`);
};
// ii. Show total signs ups and per product signups - utilize the schools api
// iii. Show total revenue collected and per product revenue - utilize collections
// iv. Show bounced cheques - utilize invoices and filter status
// v. show failed collections - utilize collections


// B. Target Visualization
// i. show target data per product versus achievement utilize schools

// C. Signups overview
// i. display signup per type of school per product - utilize schools

// D. Upcoming Invoices
// Display invoice list due soon
export const getDueCollections = async () => {
    return await moduleAxios.get(`/invoices?_limit=10`);
};