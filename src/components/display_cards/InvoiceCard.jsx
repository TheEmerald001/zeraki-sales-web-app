import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSchoolDetails,
  setSchoolInvoices,
} from "../../features/school/schoolSlice.js";
import { Card, CardHeader, Typography, Button } from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateInvoiceForm from "../forms/CreateInvoiceForm.jsx";
import InvoicesTable from "../tables/InvoicesTable.jsx";
import { getSchoolInvoiceDetail } from "../../api/schools/schools.js";

const InvoiceCard = () => {
  const schoolDetails = useSelector(selectSchoolDetails);
  const [invoiceAction, setInvoiceAction] = useState("view");
  const dispatch = useDispatch();
  const fetchAndUpdateInvoices = () => {
    getSchoolInvoiceDetail(schoolDetails.id).then((res) => {
      dispatch(setSchoolInvoices({ schoolInvoices: res.data.invoices }));
    });
  };
  useEffect(() => {
    fetchAndUpdateInvoices();
  }, []);

  return (
    <Card>
      <CardHeader
        title={
          <Typography sx={{ fontWeight: "700" }}>
            {schoolDetails.name}
          </Typography>
        }
        action={
          <Button
            aria-label="settings"
            variant="outlined"
            onClick={() => setInvoiceAction("create")}
          >
            Invoice School
          </Button>
        }
      />
      {invoiceAction === "create" && (
        <CreateInvoiceForm
          schoolId={schoolDetails.id}
          schoolName={schoolDetails.name}
          updateInvoiceList={fetchAndUpdateInvoices}
          closeCreationForm={setInvoiceAction}
        />
      )}
      {invoiceAction !== "create" && (
        <InvoicesTable updateInvoiceList={fetchAndUpdateInvoices} />
      )}
    </Card>
  );
};
export default InvoiceCard;
