import React from "react";
import { useSelector } from "react-redux";
import { selectSchoolCollections, selectSchoolInvoices } from "../../features/school/schoolSlice";
import { Card, Typography, Icon, Box, Grid } from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";

const FinanceCard = () => {
    const schoolInvoices = useSelector(selectSchoolInvoices)
    const schoolCollections = useSelector(selectSchoolCollections)
    function calculateAccountSummary(invoices, collections) {
        // Calculate the sum of amounts in the invoices array
        const invoicedAmounts = invoices.reduce((total, invoice) => {
            return total + parseFloat(invoice.amount);
        }, 0);
    
        // Calculate the sum of amounts from valid collections
        const collectedAmounts = collections.reduce((total, collection) => {
            if (collection.status === "valid") {
                return total + parseFloat(collection.amount);
            }
            return total;
        }, 0);
    
        // Calculate the account balance
        const accountBalance = collectedAmounts - invoicedAmounts;
    
        // Create the account summary object
        const account = {
            invoiced_amounts: invoicedAmounts,
            collected_amounts: collectedAmounts,
            account_balance: accountBalance
        };
    
        return account;
    }
    const accountSmmary= calculateAccountSummary(schoolInvoices, schoolCollections)
    console.log(accountSmmary)

    return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={12} >
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 2,
            margin: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
            <Icon><AccountBalanceIcon color="primary"/></Icon>
          </Box>
          <Box>
            <Typography fontWeight="400">Account Balance</Typography>
            <Typography variant="h6" fontWeight="600">
              Kes. {accountSmmary.account_balance}
            </Typography>
          </Box>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={5} >
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 2,
            margin: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
            <Icon><ReceiptIcon color="primary"/></Icon>
          </Box>
          <Box>
            <Typography fontWeight="400">Invoiced Amount:</Typography>
            <Typography variant="h6" fontWeight="600">
              Kes. {accountSmmary.invoiced_amounts}
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={5} >
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 2,
            margin: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
            <Icon><LibraryAddCheckIcon sx={{ color: "primary.main" }} /></Icon>
          </Box>
          <Box>
            <Typography fontWeight="400">Payment Collections</Typography>
            <Typography variant="h6" fontWeight="600">
            Kes. {accountSmmary.collected_amounts}
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FinanceCard;
