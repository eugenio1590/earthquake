import React, { FunctionComponent } from "react";
import {
  FormControl,
  InputLabel,
  Select, SelectChangeEvent,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText
} from "@mui/material";

import { Type } from "./models/Magnitude";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

interface Props {
  value: string[],
  onChange: (types: string[]) => void
}

const MagnitudeTypeSelect: FunctionComponent<Props> = (props: Props) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const { target: { value } } = event;
    props.onChange(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="magnitude-type-label">Mag Type</InputLabel>
      <Select
        labelId="magnitude-type-label"
        id="magnitude-type-select"
        multiple
        value={props.value}
        onChange={handleChange}
        input={<OutlinedInput label="Mag Type" />}
        renderValue={(selected: string[]) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {Object.values(Type).map((type) => (
          <MenuItem key={type} value={type}>
            <Checkbox checked={props.value.indexOf(type) > -1} />
            <ListItemText primary={type} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default MagnitudeTypeSelect;