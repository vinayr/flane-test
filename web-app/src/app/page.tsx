'use client';

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import config from './config';

export default function HomePage() {
  const [event, setEvent] = useState('');

  const handleChange = (e: SelectChangeEvent) => {
    setEvent(e.target.value as string);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      topic: event,
      title: config.events[event].title,
      body: config.events[event].body,
    };

    try {
      const response = await fetch(`${config.apiUrl}/organizations/${config.organization.id}/notify`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      const json = await response.json();
      console.log(json);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 20 }}
      >
        <Typography component="h1" variant="h5">
          Event
        </Typography>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel id="demo-simple-select-label">Select Event</InputLabel>
          <Select value={event} label="Select Event" onChange={handleChange}>
            {Object.keys(config.events).map((key) => (
              <MenuItem key={key} value={key}>
                {config.events[key].text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField fullWidth margin="normal" label="Title" value={config.events[event]?.title || ''} />
        <TextField fullWidth margin="normal" label="Body" rows={3} multiline value={config.events[event]?.body || ''} />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Enter
        </Button>
      </Box>
    </Container>
  );
}
