import React, { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CustomDataGrid = ({ rows, columns }) => {
  const [pageSize, setPageSize] = useState(25);

  return (
    <>
      <Box
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "primary.lightest_gray",
            fontSize: 16,
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row.id}
          rows={rows}
          columns={columns}
          autoHeight
          sx={{ mt: -3, p: 2, m: 1 }}
          pageSize={pageSize}
          rowsPerPageOptions={[25, 50, 100, 200, 400]}
          onPageSizeChange={(newValue) => setPageSize(newValue)}
        />
      </Box>
    </>
  );
};
export default CustomDataGrid;
