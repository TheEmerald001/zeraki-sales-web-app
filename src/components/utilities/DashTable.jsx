import React, { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DashTable = ({ rows, columns }) => {
  const [pageSize, setPageSize] = useState(5);

  return (
    <Box
      sx={{
        "& .MuiDataGrid-root": {
          backgroundColor: "#f0f0f0",
        },
        
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "primary.lightest_gray",
          fontSize: 16,
        },
      }}
    >
      <DataGrid
        getRowId={(row) =>
          row.code || row.id
        }
        rows={rows}
        columns={columns}
        autoHeight
        sx={{  p: 2, m: 1 }}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 15, 20, 25]}
        onPageSizeChange={(newValue) => setPageSize(newValue)}        
      />
    </Box>
  );
};

export default DashTable;
