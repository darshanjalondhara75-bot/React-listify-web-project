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
} from '@mui/material';
import { IconPlus, IconEye, IconTrash, IconX } from '@tabler/icons-react';
import { useLayoutDetails } from '../context/LayoutContext';
import StatusToggle from './StatusToggle';
import PageHeader from './PageHeader';

const initialCities = [
  { _id: '1', name: 'Rocca Imperiale', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '2', name: 'Pavigliana', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '3', name: 'Parenti', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '4', name: 'Monterosso Calabro', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '5', name: 'Marcellina', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '6', name: 'Laganadi', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '7', name: 'Dipignano', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '8', name: 'Diamante', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '9', name: 'Delianuova', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '10', name: 'Cittadella del Capo', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '11', name: 'Cirò Marina', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '12', name: 'Cirò', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '13', name: 'Cinque Frondi', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '14', name: 'Casabona', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '15', name: 'Brognaturo', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '16', name: 'Badolato', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '17', name: 'Africo Nuovo', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '18', name: 'Acri', code: '-', state: 'Calabria', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '19', name: 'Umerkot District', code: '-', state: 'Sindh', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '20', name: 'Rohri', code: '-', state: 'Sindh', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '21', name: 'Karaundi', state: 'Sindh', code: '-', latitude: '26.89709', longitude: '68.40643', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '22', name: 'Chuhar Jamali', state: 'Sindh', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '23', name: 'Mardan', state: 'Khyber Pakhtunkhwa', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '24', name: 'Muzaffarābād', state: 'Azad Kashmir', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '25', name: 'Jakar', state: 'Bumthang District', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '26', name: 'Lhuentse', state: 'Lhuntse District', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '27', name: 'Ha', state: 'Haa District', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '28', name: 'Wangdue Phodrang', state: 'Dagana District', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '29', name: 'Kakinada', state: 'Andhra Pradesh', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '30', name: 'Kaikalur', state: 'Andhra Pradesh', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '31', name: 'Dhone', state: 'Andhra Pradesh', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '32', name: 'Dharmavaram', state: 'Andhra Pradesh', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '33', name: 'Darsi', state: 'Andhra Pradesh', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '34', name: 'Amalapuram', state: 'Andhra Pradesh', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '35', name: 'Akkarampalle', state: 'Andhra Pradesh', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '36', name: 'Akividu', state: 'Andhra Pradesh', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
  { _id: '37', name: 'Akasahebpet', state: 'Andhra Pradesh', code: '-', created: 'Oct 17, 2025', updated: 'Oct 17, 2025', status: true },
];

const Cities = () => {
  const [cities, setCities] = useState(initialCities);
  const [page, setPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedCityDetails, setSelectedCityDetails] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', state: '' });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [cityToDelete, setCityToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load cities from localStorage on mount
  useEffect(() => {
    const savedCities = localStorage.getItem('cities_data');
    if (savedCities) {
      try {
        const parsed = JSON.parse(savedCities);
        // Normalize status: default to true if undefined
        // Reset isDeleted to false to restore items on refresh
        const normalized = parsed.map((city, idx) => ({
          ...city,
          _id: city._id || `migrated-${city.name}-${idx}`,
          status: city.isDeleted ? true : (city.status !== false ? true : false),
          isDeleted: false // Restore deleted items on refresh
        }));
        setCities(normalized);
      } catch (error) {
        // If parsing fails, reset to initial cities
        localStorage.setItem('cities_data', JSON.stringify(initialCities));
        setCities(initialCities);
      }
    } else {
      // First time load - initialize with all cities
      localStorage.setItem('cities_data', JSON.stringify(initialCities));
      setCities(initialCities);
    }
  }, []);

  // Save cities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cities_data', JSON.stringify(cities.filter(c => !c.isTemporary)));
  }, [cities]);

  const handleConfirmDelete = () => {
    if (!cityToDelete) return;

    setIsDeleting(true);
    setTimeout(() => {
      // Soft delete: mark as deleted instead of removing
      const newCities = cities.map(c =>
        c._id === cityToDelete._id
          ? { ...c, isDeleted: true, status: false }
          : c
      );

      setCities(newCities);
      setIsDeleting(false);
      setOpenDeleteDialog(false);
      setCityToDelete(null);
      toast.success('City deleted successfully');
    }, 1000);
  };

  // Filter out deleted cities for display
  const visibleCities = cities.filter(city => !city.isDeleted);
  const displayedCities = visibleCities.slice((page - 1) * entriesPerPage, page * entriesPerPage);

  // Save cities to localStorage whenever they change


  useLayoutDetails({ title: "Cities" });

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader title="Cities" subtitle="Manage city records and country associations" />
        <Button variant="contained" color="error" startIcon={<IconPlus />} onClick={() => setDialogOpen(true)}>
          Add City
        </Button>
      </div>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
          <div className="overflow-x-auto">
            <Table className="table_table__cB3AL">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>NAME</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>STATE</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>CREATED DATE</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>UPDATED DATE</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedCities.map((city, index) => (
                  <TableRow key={index} sx={{
                    opacity: city.status ? 1 : 0.6,
                    filter: city.status ? 'none' : 'grayscale(0.5)',
                    transition: 'opacity 0.3s ease, filter 0.3s ease',
                    backgroundColor: city.status ? 'inherit' : '#fcfcfc'
                  }}>
                    <TableCell><Typography variant="body2" className="capitalize">{city.name}</Typography></TableCell>
                    <TableCell><Typography variant="body2" className="capitalize">{city.state}</Typography></TableCell>
                    <TableCell>
                      <StatusToggle
                        currentStatus={city.status}
                        onToggle={async (newStatus) => {
                          await new Promise(resolve => setTimeout(resolve, 500));
                          setCities(prev => prev.map(c => c._id === city._id ? { ...c, status: newStatus === 'active' } : c));
                        }}
                        activeStatus="active"
                        inactiveStatus="inactive"
                      />
                    </TableCell>
                    <TableCell><Typography variant="body2" className="capitalize">{city.created}</Typography></TableCell>
                    <TableCell><Typography variant="body2" className="capitalize">{city.updated}</Typography></TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          onClick={() => {
                            setSelectedCityDetails(city);
                            setDetailsDialogOpen(true);
                          }}
                          aria-label="View City"
                          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                        >
                          <IconEye size={18} />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setCityToDelete(city);
                            setOpenDeleteDialog(true);
                          }}
                          aria-label="Delete City"
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
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>
              <div>Showing {(page - 1) * entriesPerPage + 1} to {Math.min(page * entriesPerPage, visibleCities.length)} of {visibleCities.length} entries</div>
            </div>
            <Pagination
              count={Math.ceil(visibleCities.length / entriesPerPage)}
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
      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, fontSize: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Select City
          <IconButton color="error" onClick={() => setDialogOpen(false)}>
            <IconX />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <Autocomplete
              fullWidth
              options={initialCities.map(c => c.name)}
              value={null}
              onChange={(event, newValue) => setSelectedCity(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Cities"
                  placeholder="Select a city"
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
            onClick={() => { setDialogOpen(false); setSelectedCity(null); }}
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
              if (selectedCity) {
                // Check if city exists in current list (hidden or visible)
                const existingCity = cities.find(c => c.name === selectedCity);

                if (existingCity) {
                  if (existingCity.isDeleted) {
                    // Restore deleted city
                    setCities(prev => prev.map(c =>
                      c.name === selectedCity
                        ? { ...c, isDeleted: false, status: true }
                        : c
                    ));
                    toast.success("City restored successfully");
                    setSelectedCity(null);
                    setDialogOpen(false);
                  } else {
                    toast.info("City is already in the list");
                    setDialogOpen(false);
                    setSelectedCity(null);
                  }
                } else {
                  // Add new city
                  const cityToAdd = initialCities.find(c => c.name === selectedCity);
                  if (cityToAdd) {
                    setCities([{ ...cityToAdd, _id: Date.now().toString(), isDeleted: false, status: true, isTemporary: true }, ...cities]);
                    toast.success("City added successfully");
                    setSelectedCity(null);
                    setDialogOpen(false);
                  } else {
                    toast.error("City not found");
                    setDialogOpen(false);
                  }
                }
              } else {
                toast.error("Please select a city to add");
              }
            }}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={detailsDialogOpen} onClose={() => setDetailsDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          City Details
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
              value={selectedCityDetails?.state || ''}
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
              label="City Name"
              value={selectedCityDetails?.name || ''}
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
              value={selectedCityDetails?.latitude || ''}
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
              value={selectedCityDetails?.longitude || ''}
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
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Delete City</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
          <Typography variant="body1">Are you sure you want to delete <strong>{cityToDelete?.name}</strong>?</Typography>
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

export default Cities;

