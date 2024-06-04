import React from 'react';
import { TextField, Button, Box, Card, CardContent, Grid } from '@mui/material';

export default function CreatorEditeProfile() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic here
  };

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="70vh">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card sx={{ maxWidth: 900 }}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  // Add any required props here
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  // Add any required props here
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  name="email"
                  // Add any required props here
                />
                <TextField
                  label="Adrisse"
                  variant="outlined"
                  name="Adresse"
                  // Add any required props here
                />
                <Button variant="contained" type="submit">Submit</Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
