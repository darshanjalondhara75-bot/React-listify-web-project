import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  TextField,
  Menu,
} from '@mui/material';
import { IconPlus, IconEye, IconTrash, IconX } from '@tabler/icons-react';
import { useLayoutDetails } from '../context/LayoutContext';
import StatusToggle from './StatusToggle';
import PageHeader from './PageHeader';

const initialStates = [
  { _id: '1', name: 'Fier County', code: '-', country: '-', created: 'Dec 15, 2025', updated: 'Dec 15, 2025', status: true },
  { _id: '2', name: 'Verbano-Cusio-Ossola', code: 'VB', country: 'Italy', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '3', name: 'Vicenza', code: 'VI', country: 'Italy', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '4', name: 'Vercelli', code: 'VC', country: 'Italy', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '5', name: 'Verona', code: 'VR', country: 'Italy', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '6', name: 'Rovigo', code: 'RO', country: 'Italy', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '7', name: 'Sardinia', code: '88', country: 'Italy', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '8', name: 'Nuoro', code: 'NU', country: 'Italy', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '9', name: 'Padua', code: 'PD', country: 'Italy', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '10', name: 'Friuli–Venezia Giulia', code: '36', country: 'Italy', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '11', name: 'Gorizia', code: 'GO', country: 'Italy', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '12', name: 'Calabria', code: '78', country: 'Italy', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '13', name: 'Agrigento', code: 'AG', country: 'Italy', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '14', name: 'Wiltshire', code: 'WIL', country: 'United Kingdom', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '15', name: 'Stockport', code: 'SKP', country: 'United Kingdom', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '16', name: 'Rhondda Cynon Taf', code: 'RCT', country: 'United Kingdom', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '17', name: 'Newry, Mourne and Down', code: 'NMD', country: 'United Kingdom', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '18', name: 'London Borough of Tower Hamlets', code: 'TWH', country: 'United Kingdom', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '19', name: 'Lisburn City Council', code: 'LSB', country: 'United Kingdom', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '20', name: 'Fermanagh and Omagh', code: 'FMO', country: 'United Kingdom', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '21', name: 'County Durham', code: 'DUR', country: 'United Kingdom', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '22', name: 'Causeway Coast and Glens', code: 'CCG', country: 'United Kingdom', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '23', name: 'Angus', code: 'ANS', country: 'United Kingdom', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '24', name: 'Sindh', code: 'SD', country: 'Pakistan', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '25', name: 'Khyber Pakhtunkhwa', code: 'KP', country: 'Pakistan', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '26', name: 'Gilgit-Baltistan', code: 'GB', country: 'Pakistan', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '27', name: 'Azad Kashmir', code: 'JK', country: 'Pakistan', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '28', name: 'Bumthang District', code: '33', country: 'Bhutan', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '29', name: 'Lhuntse District', code: '44', country: 'Bhutan', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '30', name: 'Haa District', code: '13', country: 'Bhutan', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '31', name: 'Dagana District', code: '22', country: 'Bhutan', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '32', name: 'Creuse', code: '23', country: 'France', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '33', name: 'Doubs', code: '25', country: 'France', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '34', name: 'Allier', code: '03', country: 'France', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '35', name: 'Alpes-de-Haute-Provence', code: '04', country: 'France', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '36', name: 'Alpes-Maritimes', code: '06', country: 'France', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '37', name: 'Ain', code: '01', country: 'France', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '38', name: 'West Bengal', code: 'WB', country: 'India', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '39', name: 'Telangana', code: 'TG', country: 'India', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '40', name: 'Tripura', code: 'TR', country: 'India', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '41', name: 'Uttarakhand', code: 'UK', country: 'India', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '42', name: 'Tamil Nadu', code: 'TN', country: 'India', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '43', name: 'Jharkhand', code: 'JH', country: 'India', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '44', name: 'Karnataka', code: 'KA', country: 'India', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '45', name: 'Kerala', code: 'KL', country: 'India', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '46', name: 'Ladakh', code: 'LA', country: 'India', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '47', name: 'Chandigarh', code: 'CH', country: 'India', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '48', name: 'Bihar', code: 'BR', country: 'India', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '49', name: 'Assam', code: 'AS', country: 'India', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '50', name: 'Andhra Pradesh', code: 'AP', country: 'India', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
];

const States = () => {
  const [states, setStates] = useState(initialStates);
  const [page, setPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedStateDetails, setSelectedStateDetails] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [stateToDelete, setStateToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load states from localStorage on mount
  useEffect(() => {
    const savedStates = localStorage.getItem('states_data');
    if (savedStates) {
      try {
        const parsed = JSON.parse(savedStates);
        // Normalize status: default to true if undefined
        // Reset isDeleted to false to restore items on refresh
        const normalized = parsed.map((state, idx) => ({
          ...state,
          _id: state._id || `migrated-${state.name}-${idx}`,
          status: state.isDeleted ? true : (state.status !== false ? true : false),
          isDeleted: false // Restore deleted items on refresh
        }));
        setStates(normalized);
      } catch (error) {
        // If parsing fails, reset to initial states
        localStorage.setItem('states_data', JSON.stringify(initialStates));
        setStates(initialStates);
      }
    } else {
      // First time load - initialize with all states
      localStorage.setItem('states_data', JSON.stringify(initialStates));
      setStates(initialStates);
    }
  }, []);

  // Save states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('states_data', JSON.stringify(states.filter(s => !s.isTemporary)));
  }, [states]);

  const handleConfirmDelete = () => {
    if (!stateToDelete) return;

    setIsDeleting(true);
    setTimeout(() => {
      // Soft delete: mark as deleted instead of removing
      const newStates = states.map(s =>
        s._id === stateToDelete._id
          ? { ...s, isDeleted: true, status: false }
          : s
      );

      setStates(newStates);
      setIsDeleting(false);
      setOpenDeleteDialog(false);
      setStateToDelete(null);
      toast.success('State deleted successfully');
    }, 1000);
  };

  // Filter out deleted states for display
  const visibleStates = states.filter(state => !state.isDeleted);
  const displayedStates = visibleStates.slice((page - 1) * entriesPerPage, page * entriesPerPage);

  useLayoutDetails({ title: "States" });

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader title="States" subtitle="Manage state records and country associations" />
        <Button variant="contained" color="error" startIcon={<IconPlus />} onClick={() => setDialogOpen(true)}>
          Add State
        </Button>
      </div>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
          <div className="overflow-x-auto">
            <Table className="table_table__cB3AL">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>NAME</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>CODE</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>COUNTRY</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>CREATED DATE</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>UPDATED DATE</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedStates.map((state, index) => (
                  <TableRow key={index} sx={{
                    opacity: state.status ? 1 : 0.6,
                    filter: state.status ? 'none' : 'grayscale(0.5)',
                    transition: 'opacity 0.3s ease, filter 0.3s ease',
                    backgroundColor: state.status ? 'inherit' : '#fcfcfc'
                  }}>
                    <TableCell><Typography variant="body2" className="capitalize cursor-pointer" onClick={() => {
                      setSelectedStateDetails(state);
                      setDetailsDialogOpen(true);
                    }}>{state.name}</Typography></TableCell>
                    <TableCell><Typography variant="body2" className="capitalize">{state.code}</Typography></TableCell>
                    <TableCell><Typography variant="body2" className="capitalize">{state.country}</Typography></TableCell>
                    <TableCell>
                      <StatusToggle
                        currentStatus={state.status}
                        onToggle={async (newStatus) => {
                          await new Promise(resolve => setTimeout(resolve, 500));
                          setStates(prev => prev.map(s => s._id === state._id ? { ...s, status: newStatus === 'active' } : s));
                        }}
                        activeStatus="active"
                        inactiveStatus="inactive"
                      />
                    </TableCell>
                    <TableCell><Typography variant="body2" className="capitalize">{state.created}</Typography></TableCell>
                    <TableCell><Typography variant="body2" className="capitalize">{state.updated}</Typography></TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          onClick={() => {
                            setSelectedStateDetails(state);
                            setDetailsDialogOpen(true);
                          }}
                          aria-label="View State"
                          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                        >
                          <IconEye size={18} />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setStateToDelete(state);
                            setOpenDeleteDialog(true);
                          }}
                          aria-label="Delete State"
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
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap', gap: 2 }}>
            <div className="flex items-center gap-2">
              <FormControl size="small" className="MuiFormControl-root MuiTextField-root max-sm:is-full sm:is-[70px] mui-1o5v172">
                <Select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(e.target.value)}
                  variant="outlined"
                  color="error"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--border-primary)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--border-secondary)'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e74c3c',
                      borderWidth: '2px'
                    }
                  }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
              <div>Showing {(page - 1) * entriesPerPage + 1} to {Math.min(page * entriesPerPage, visibleStates.length)} of {visibleStates.length} entries</div>
            </div>
            <Pagination
              count={Math.ceil(visibleStates.length / entriesPerPage)}
              page={page}
              onChange={(event, value) => setPage(value)}
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
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={() => setMenuOpen(false)}>
          {initialStates.map(state => <MenuItem key={state.name} onClick={() => { toast.info(`Selected ${state.name}`); setMenuOpen(false); }}>{state.name}</MenuItem>)}
        </Menu>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 600, fontSize: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Select State
            <IconButton color="error" onClick={() => setDialogOpen(false)}>
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <Autocomplete
                fullWidth
                options={initialStates.map(s => s.name)}
                value={selectedState}
                onChange={(event, newValue) => setSelectedState(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="States"
                    placeholder="Select a state"
                    variant="outlined"
                    color="error"
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--border-primary)'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--border-secondary)'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e74c3c',
                        borderWidth: '2px'
                      }
                    }}
                  />
                )}
              />
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ p: 2, gap: 1 }}>
            <Button
              onClick={() => { setDialogOpen(false); setSelectedState(null); }}
              variant="outlined"
              sx={{
                borderColor: 'var(--border-primary)',
                color: 'var(--text-primary)',
                '&:hover': {
                  borderColor: 'var(--accent-color)',
                  backgroundColor: 'transparent'
                }
              }}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                if (selectedState) {
                  // In ID-based system, we always add a new entry (duplicates allowed)
                  const stateToAdd = initialStates.find(s => s.name === selectedState);
                  if (stateToAdd) {
                    setStates([{ ...stateToAdd, _id: Date.now().toString(), isDeleted: false, status: true, isTemporary: true }, ...states]);
                    toast.success("State added successfully");
                    setSelectedState(null);
                    setDialogOpen(false);
                  } else {
                    toast.error("State not found");
                    setDialogOpen(false);
                  }
                } else {
                  toast.error("Please select a state to add");
                }
              }}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={detailsDialogOpen} onClose={() => setDetailsDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            State Details
            <IconButton onClick={() => setDetailsDialogOpen(false)}>
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                variant="outlined"
                color="error"
                label="State Name"
                value={selectedStateDetails?.name || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                margin="dense"
                sx={{ mb: 0 }}
              />
              <TextField
                variant="outlined"
                color="error"
                label="State Code"
                value={selectedStateDetails?.code || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                margin="dense"
                sx={{ mb: 0 }}
              />
              <TextField
                variant="outlined"
                color="error"
                label="Latitude"
                value=""
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                margin="dense"
                sx={{ mb: 0 }}
              />
              <TextField
                variant="outlined"
                color="error"
                label="Longitude"
                value=""
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                margin="dense"
                sx={{ mb: 0 }}
              />
              <TextField
                variant="outlined"
                color="error"
                label="Type"
                value="Auto"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                margin="dense"
                sx={{ mb: 0 }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setDetailsDialogOpen(false)}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openDeleteDialog} onClose={() => !isDeleting && setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 1, pt: 3 }}>
            <Box sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)', p: 1.5, borderRadius: '50%', mb: 2 }}>
              <IconTrash size={32} color="#e74c3c" />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Delete State</Typography>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
            <Typography variant="body1">Are you sure you want to delete <strong>{stateToDelete?.name}</strong>?</Typography>
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
      </Box>
    </>
  );
};

export default States;


