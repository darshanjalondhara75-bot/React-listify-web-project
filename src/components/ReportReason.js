import React, { useState, useEffect } from 'react';
import { useLayoutDetails } from '../context/LayoutContext';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Pagination
} from '@mui/material';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import StatusToggle from './StatusToggle';
import PageHeader from './PageHeader';

const ReportReason = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [reasonToDelete, setReasonToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const defaultReportReasons = [
    {
      _id: '1',
      title: 'Harassment or Abusive Behavior',
      createdAt: 'Oct 17, 2025',
      updatedAt: 'Oct 17, 2025',
      status: true
    },
    {
      _id: '2',
      title: 'Unrealistic or Fake Pricing',
      createdAt: 'Oct 17, 2025',
      updatedAt: 'Oct 17, 2025',
      status: true
    },
    {
      _id: '3',
      title: 'Fake or Misleading Product',
      createdAt: 'Oct 17, 2025',
      updatedAt: 'Oct 17, 2025',
      status: true
    }
  ];

  const [reportReasons, setReportReasons] = useState(() => {
    const saved = localStorage.getItem('report_reasons_v1');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((reason, idx) => ({
        ...reason,
        _id: reason._id || reason.id?.toString() || `migrated-reason-${idx}`,
        isDeleted: reason.isDeleted || false
      }));
    }
    return defaultReportReasons;
  });

  // Persist changes to localStorage to keep additions and edits
  useEffect(() => {
    localStorage.setItem('report_reasons_v1', JSON.stringify(reportReasons.filter(r => !r.isTemporary)));
  }, [reportReasons]);

  // Deletion is soft and reset on refresh as per the initialization logic above.

  const handleAdd = () => {
    setEditMode(false);
    setSelectedReason(null);
    setTitle('');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTitle('');
    setEditMode(false);
    setSelectedReason(null);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error('Reason Title is required');
      return;
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    if (editMode && selectedReason) {
      setReportReasons(prev => {
        const updated = prev.map(reason =>
          reason._id === selectedReason._id
            ? { ...reason, title, updatedAt: currentDate }
            : reason
        );
        return updated;
      });
      toast.success('Report Reason updated successfully');
    } else {
      setReportReasons(prev => {
        const newReason = {
          _id: Date.now().toString(),
          title,
          createdAt: currentDate,
          updatedAt: currentDate,
          status: true,
          isDeleted: false,
          isTemporary: true
        };
        const newList = [newReason, ...prev];
        return newList;
      });
      toast.success('Report Reason added successfully');
    }

    handleCloseDialog();
  };

  const handleEdit = (reason) => {
    setEditMode(true);
    setSelectedReason(reason);
    setTitle(reason.title);
    setOpenDialog(true);
  };

  const handleOpenDeleteDialog = (reason) => {
    setReasonToDelete(reason);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (!reasonToDelete) return;

    setIsDeleting(true);
    // Simulate API call
    setTimeout(() => {
      setReportReasons(prev => {
        const updated = prev.map(reason =>
          reason._id === reasonToDelete._id ? { ...reason, isDeleted: true } : reason
        );
        return updated;
      });

      setIsDeleting(false);
      setOpenDeleteDialog(false);
      setReasonToDelete(null);
      toast.success('Report Reason deleted successfully');
    }, 1000);
  };



  useLayoutDetails({ title: "Report Reason" });

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader title="Report Reason" subtitle="Manage predefined report reasons for user complaints" />
        <Button
          variant="contained"
          color="error"
          startIcon={<IconPlus />}
          onClick={handleAdd}
        >
          Add New Reason
        </Button>
      </div>
      <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
        <TableContainer>
          <Table aria-label="report reasons table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>TITLE</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>CREATED AT</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>UPDATED AT</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>STATUS</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportReasons.filter(r => !r.isDeleted).map((reason) => (
                <TableRow key={reason._id} sx={{
                  opacity: reason.status ? 1 : 0.6,
                  filter: reason.status ? 'none' : 'grayscale(0.5)',
                  transition: 'opacity 0.3s ease, filter 0.3s ease',
                  backgroundColor: reason.status ? 'inherit' : '#fcfcfc'
                }}>
                  <TableCell>
                    <Typography variant="body2">{reason.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{reason.createdAt}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{reason.updatedAt}</Typography>
                  </TableCell>
                  <TableCell>
                    <StatusToggle
                      currentStatus={reason.status}
                      onToggle={async (newStatus) => {
                        await new Promise(resolve => setTimeout(resolve, 500));
                        setReportReasons(prev => {
                          const updated = prev.map(r =>
                            r._id === reason._id ? { ...r, status: newStatus === 'active' } : r
                          );
                          return updated;
                        });
                      }}
                      activeStatus="active"
                      inactiveStatus="inactive"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" gap={1}>
                      <IconButton
                        aria-label="Edit Report Reason"
                        onClick={() => handleEdit(reason)}
                        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                      >
                        <IconEdit size={18} />
                      </IconButton>
                      <IconButton
                        aria-label="Delete Report Reason"
                        onClick={() => handleOpenDeleteDialog(reason)}
                        sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'error.lighter' } }}
                      >
                        <IconTrash size={18} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap', gap: 2 }}>
          <div className="flex items-center gap-2">
            <FormControl size="small" className="MuiFormControl-root MuiTextField-root max-sm:is-full sm:is-[70px] mui-1o5v172">
              <Select
                value={10}
                variant="outlined"
                color="error"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-primary)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-secondary)' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e74c3c', borderWidth: '2px' }
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
            <div>Showing 1 to {reportReasons.length} of {reportReasons.length} entries</div>
          </div>
          <Pagination
            count={1}
            page={1}
            showFirstButton
            showLastButton
            variant="outlined"
            shape="rounded"
            color="error"
            sx={{
              '& .MuiPaginationItem-root': {
                borderColor: 'var(--border-primary)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                '&:hover': {
                  borderColor: 'var(--border-secondary)',
                  backgroundColor: 'var(--bg-tertiary)',
                },
              },
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#e74c3c !important',
                color: '#fff',
                borderColor: '#e74c3c',
                '&:hover': {
                  backgroundColor: '#c0392b !important',
                },
              },
            }}
          />
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>{editMode ? 'Edit Report Reason' : 'Add New Report Reason'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Reason Title"
            fullWidth
            variant="outlined"
            placeholder="Enter report reason title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error" variant="tonal">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="error" variant="contained">
            {editMode ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => !isDeleting && setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 1, pt: 3 }}>
          <Box sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)', p: 1.5, borderRadius: '50%', mb: 2 }}>
            <IconTrash size={32} color="#e74c3c" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Delete Report Reason</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
          <Typography variant="body1">Are you sure you want to delete <strong>{reasonToDelete?.title}</strong>?</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'center', gap: 2 }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            disabled={isDeleting}
            variant="outlined"
            sx={{ minWidth: 100, color: 'text.secondary', borderColor: 'rgba(0,0,0,0.1)' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            sx={{ minWidth: 100 }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReportReason;

