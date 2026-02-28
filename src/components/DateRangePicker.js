import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,

} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function DateRangePicker({ open, onClose, onApply, onClear }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleApply = () => {
    onApply({
      startDate: startDate ? startDate.format('MM/DD/YYYY') : null,
      endDate: endDate ? endDate.format('MM/DD/YYYY') : null
    });
    onClose();
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    onClear();
    onClose();
  };

  const handleClose = () => {
    setStartDate(null);
    setEndDate(null);
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
          }
        }}
      >
        <DialogTitle sx={{
          fontSize: '1.25rem',
          fontWeight: 600,
          pb: 1,
          color: '#000000ff'
        }}>
          Select Date Range
        </DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            format="MM/DD/YYYY"
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true,
                sx: {
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }
              }
            }}
          />

          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            format="MM/DD/YYYY"
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true,
                sx: {
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }
              }
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button
            onClick={handleClear}
            color="error"
            sx={{
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Clear
          </Button>
          <Button
            onClick={handleApply}
            variant="contained"
            color="error"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              px: 3
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

export default DateRangePicker;

