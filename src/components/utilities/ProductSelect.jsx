import React, { useState } from 'react';
import { Autocomplete, TextField, Checkbox, ListItemText } from '@mui/material';

const products = ["Zeraki Analytics", "Zeraki Finance", "Zeraki Timetable"];

function ProductSelect() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleChange = (event, value) => {
    setSelectedProducts(value);
  };

  return (
    <Autocomplete
      multiple
      options={products}
      disableCloseOnSelect
      value={selectedProducts}
      onChange={handleChange}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            style={{ marginRight: 8 }}
            checked={selected}
          />
          <ListItemText primary={option} />
        </li>
      )}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Select Products" placeholder="Products" />
      )}
    />
  );
}

export default ProductSelect;
