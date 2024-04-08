import React, { useState } from 'react';
import { Box, InputLabel, TextField, Divider, Typography } from "@mui/material";

const Earthquakes = () => {
  const [name, setName] = useState('Stranger');

  return (
    <Box>
      <Typography variant='h5'>Hello, {name}!</Typography>
      <Divider sx={{marginTop: 3, marginBottom: 3}} />
      <InputLabel htmlFor="name">Say hello to:</InputLabel>
      <TextField id="name" value={name} onChange={(e) => setName(e.target.value)} />
    </Box>
  );
};

export default Earthquakes;