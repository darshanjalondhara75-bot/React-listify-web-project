import React, { useState, useEffect } from "react";
import { useLayoutDetails } from '../context/LayoutContext';
import { toast } from 'react-toastify';
import {
  Box,
  Card,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  TextField
} from "@mui/material";
import { IconPlus, IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import StatusToggle from './StatusToggle';
import PageHeader from './PageHeader';

const initialData = [
  {
    title: "Passport",
    created: "Oct 17, 2025",
    updated: "Nov 20, 2025",
    status: true
  },
  {
    title: "Aadhar Card",
    created: "Oct 16, 2025",
    updated: "Nov 20, 2025",
    status: true
  },
  {
    title: "Pan Card",
    created: "Oct 16, 2025",
    updated: "Nov 20, 2025",
    status: true
  }
];

export default function VerificationFields() {
  const [rows, setRows] = useState(() => {
    const savedFields = localStorage.getItem('verification_fields');
    if (savedFields) {
      try {
        const parsed = JSON.parse(savedFields);

        // Restore deleted items on refresh by resetting isDeleted
        let merged = parsed.map(field => ({
          ...field,
          status: field.status !== false,
          isDeleted: false
        }));

        // Merge missing initialData items (restores fully deleted default items)
        initialData.forEach(initItem => {
          if (!merged.some(m => m.title === initItem.title)) {
            merged.push(initItem);
          }
        });

        // De-duplicate items by title to prevent duplicates
        const uniqueItems = [];
        const seenTitles = new Set();
        merged.forEach(item => {
          const normalizedTitle = item.title.trim().toLowerCase();
          if (!seenTitles.has(normalizedTitle)) {
            seenTitles.add(normalizedTitle);
            uniqueItems.push(item);
          }
        });

        return uniqueItems;
      } catch (e) {
        console.error("Failed to parse verification_fields", e);
        return initialData;
      }
    }
    return initialData;
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);

  // Save initial data to localStorage if it doesn't exist
  // Automatically save to localStorage whenever rows change
  useEffect(() => {
    localStorage.setItem('verification_fields', JSON.stringify(rows.filter(r => !r.isTemporary)));
  }, [rows]);

  const toggleStatus = (index) => {
    const updated = [...rows];
    updated[index].status = !updated[index].status;
    setRows(updated);
    setRows(updated);
  };

  const handleAddId = () => {
    if (!newTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }

    const newId = {
      title: newTitle,
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      updated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: true,
      isTemporary: true
    };

    const updatedRows = [newId, ...rows];
    setRows(updatedRows);
    setNewDialogOpen(false);
    setNewTitle('');
    toast.success("ID Proof added successfully");
  };

  const handleUpdateId = () => {
    if (!editTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }

    const updatedRows = [...rows];
    updatedRows[editingIndex] = {
      ...updatedRows[editingIndex],
      title: editTitle,
      updated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isTemporary: false
    };

    setRows(updatedRows);
    setEditDialogOpen(false);
    setEditTitle('');
    setEditingIndex(null);
    toast.success("ID Proof updated successfully");
  };

  const handleDeleteClick = (index) => {
    setDeletingIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    const itemToDelete = rows[deletingIndex];
    if (!itemToDelete) return; // Safety check

    const isDefaultItem = initialData.some(
      defaultItem => defaultItem.title.toLowerCase() === itemToDelete.title.toLowerCase()
    );

    let updatedRows;
    if (isDefaultItem) {
      // Soft Delete: Hide but keep in storage so it can be restored on refresh
      updatedRows = [...rows];
      updatedRows[deletingIndex].isDeleted = true;
    } else {
      // Hard Delete: Permanently remove custom items
      updatedRows = rows.filter((_, i) => i !== deletingIndex);
    }

    setRows(updatedRows);
    setDeleteDialogOpen(false);
    setDeletingIndex(null);
    toast.success("ID Proof deleted successfully");
  };

  useLayoutDetails({ title: "ID Proof List" });

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader title="ID Proof List" subtitle="Manage accepted identification documents for verification" />
        <Button
          id="add-id-button"
          variant="contained"
          color="error"
          startIcon={<IconPlus size={18} />}
          onClick={() => setNewDialogOpen(true)}
        >
          Add ID
        </Button>
      </div>
      <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>


        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="table_table__cB3AL">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>TITLE</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>CREATED DATE</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>UPDATED DATE</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>STATUS</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>ACTION</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, index) => {
                if (row.isDeleted) return null;
                return (
                  <TableRow
                    key={index}
                    sx={{
                      opacity: row.status ? 1 : 0.6,
                      filter: row.status ? 'none' : 'grayscale(0.5)',
                      transition: 'opacity 0.3s ease, filter 0.3s ease',
                      backgroundColor: row.status ? 'inherit' : '#fcfcfc'
                    }}
                  >
                    <TableCell>
                      <Typography textTransform="capitalize">
                        {row.title}
                      </Typography>
                    </TableCell>

                    <TableCell>{row.created}</TableCell>
                    <TableCell>{row.updated}</TableCell>

                    <TableCell>
                      <StatusToggle
                        currentStatus={row.status}
                        onToggle={async (newStatus) => {
                          await new Promise(resolve => setTimeout(resolve, 500));
                          toggleStatus(index);
                        }}
                        activeStatus="active"
                        inactiveStatus="inactive"
                      />
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <IconButton
                          onClick={() => {
                            setEditingIndex(index);
                            setEditTitle(row.title);
                            setEditDialogOpen(true);
                          }}
                          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                        >
                          <IconEdit size={18} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(index)}
                          sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'error.lighter' } }}
                        >
                          <IconTrash size={18} />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
              <Typography variant="body2">Showing 1 to {rows.filter(r => !r.isDeleted).length} of {rows.filter(r => !r.isDeleted).length} entries</Typography>
            </div>
            <Pagination
              count={1}
              page={1}
              variant="outlined"
              shape="rounded"
              color="error"
              showFirstButton
              showLastButton
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
        </div>
      </Paper>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          Edit ID
          <IconButton onClick={() => setEditDialogOpen(false)} color="error" style={{ position: 'absolute', right: 8, top: 8 }}>
            <IconX size={18} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            label="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            fullWidth
            margin="dense"
            color="error"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'var(--border-primary)' },
                '&:hover fieldset': { borderColor: 'var(--border-secondary)' },
                '&.Mui-focused fieldset': { borderColor: '#e74c3c' }
              },
              '& .MuiInputLabel-root': { color: 'text.secondary' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#e74c3c' }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} variant="tonal" color="error">Cancel</Button>
          <Button onClick={handleUpdateId} variant="contained" color="error">Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={newDialogOpen} onClose={() => setNewDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          Create New ID
          <IconButton onClick={() => setNewDialogOpen(false)} color="error" style={{ position: 'absolute', right: 8, top: 8 }}>
            <IconX size={18} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            label="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            fullWidth
            margin="dense"
            color="error"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'var(--border-primary)' },
                '&:hover fieldset': { borderColor: 'var(--border-secondary)' },
                '&.Mui-focused fieldset': { borderColor: '#e74c3c' }
              },
              '& .MuiInputLabel-root': { color: 'text.secondary' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#e74c3c' }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewDialogOpen(false)} variant="tonal" color="error">Cancel</Button>
          <Button onClick={handleAddId} variant="contained" color="error">Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 1, pt: 3 }}>
          <Box sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)', p: 1.5, borderRadius: '50%', mb: 2 }}>
            <IconTrash size={32} color="#e74c3c" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Delete ID Proof?</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
          <Typography variant="body1">Are you sure you want to delete <strong>{deletingIndex !== null && rows[deletingIndex] ? rows[deletingIndex].title : ''}</strong>?</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'center', gap: 2 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            sx={{ minWidth: 100, color: 'text.secondary', borderColor: 'rgba(0,0,0,0.1)' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            sx={{ minWidth: 100 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}



