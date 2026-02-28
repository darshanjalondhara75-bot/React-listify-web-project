import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  DialogActions,
  TextField,
} from '@mui/material';
import { IconEdit, IconTrash, IconX } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { useLayoutDetails } from '../context/LayoutContext';
import StatusToggle from './StatusToggle';
import PageHeader from './PageHeader';

function FeatureAdvertisement() {
  const [page, setPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    iosProductId: '',
    price: '',
    discount: '',
    description: '',
    days: '',
    advertisementLimit: '',
    image: null
  });
  const [packages, setPackages] = useState(() => {
    const defaultPackages = [
      {
        id: 1,
        name: 'Exclusive Package',
        description: 'Get your ad featured for 20 days with top priority visibility and maximum reach. Your listing will appear at the top of search results and category pages, ensuring premium exposure to potential buyers. This package includes advanced analytics, featured badges, and priority customer support to help you sell faster and more effectively.',
        price: 29,
        discount: 3,
        finalPrice: 28.13,
        days: 20,
        advertisementLimit: 5,
        status: true,
        image: 'https://placehold.co/100x100?text=Package'
      },
      {
        id: 2,
        name: 'Platinum Packaged',
        description: 'Boost your ad reach for 7 days with premium placement and special highlight badge. Stand out from competitors with eye-catching visual indicators and priority positioning in relevant categories. Includes featured homepage carousel placement, enhanced visibility in search results, and dedicated promotional support to maximize your listing performance.',
        price: 200,
        discount: 20,
        finalPrice: 160,
        days: 7,
        advertisementLimit: 2,
        status: true,
        image: 'https://placehold.co/100x100?text=Package'
      },
      {
        id: 3,
        name: 'Trial Package',
        description: 'Feature your ad for 3 days and get higher visibility on the home screen. Perfect for sellers who want to test the effectiveness of premium features without a long-term commitment. Your listing will be prominently displayed with increased exposure, helping you reach more potential buyers quickly and efficiently.',
        price: 100,
        discount: 15,
        finalPrice: 85,
        days: 3,
        advertisementLimit: 1,
        status: true,
        image: 'https://placehold.co/100x100?text=Package'
      }
    ];

    const savedPackages = localStorage.getItem('featurePackages');
    if (savedPackages) {
      let parsed = JSON.parse(savedPackages);
      // Restore ALL deleted packages on page refresh
      parsed.forEach(pkg => {
        if (pkg.isDeleted) {
          pkg.isDeleted = false;
          pkg.status = true; // Reset to enabled when restoring
        }
      });
      // Also restore any missing default packages
      defaultPackages.forEach(defPkg => {
        const existing = parsed.find(p => p.id === defPkg.id);
        if (!existing) {
          // Package is completely missing, add it back
          parsed.push(defPkg);
        } else if (existing.isDeleted) {
          // Package exists but is deleted, restore it but keep current status
          existing.isDeleted = false;
        }
      });
      return parsed;
    }
    return defaultPackages;
  });

  // Save packages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('featurePackages', JSON.stringify(packages.filter(p => !p.isTemporary)));
  }, [packages]);
  const [expandedDescriptions, setExpandedDescriptions] = useState(new Set());
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (id, newStatus) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setPackages(packages.map(p => p.id === id ? { ...p, status: newStatus === 'active' } : p));
  };

  const handleDeletePlan = (id) => {
    const pkg = packages.find(p => p.id === id);
    setPackageToDelete(pkg);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!packageToDelete) return;
    setIsDeleting(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setPackages(packages.map(p => p.id === packageToDelete.id ? { ...p, status: false, isDeleted: true } : p));
    toast.success("Package deleted successfully");
    setOpenDeleteDialog(false);
    setPackageToDelete(null);
    setIsDeleting(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setEntriesPerPage(event.target.value);
  };

  const handleOpenDialog = () => {
    setIsEditing(false);
    setEditingPlanId(null);
    setFormData({
      name: '',
      iosProductId: '',
      price: '',
      discount: '',
      description: '',
      days: '',
      advertisementLimit: '',
      image: null
    });
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (plan) => {
    setIsEditing(true);
    setEditingPlanId(plan.id);
    setFormData({
      name: plan.name,
      iosProductId: plan.iosProductId || '',
      price: plan.price.toString(),
      discount: plan.discount.toString(),
      description: plan.description,
      days: plan.days.toString(),
      advertisementLimit: plan.advertisementLimit.toString(),
      image: null
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsEditing(false);
    setEditingPlanId(null);
    setFormData({
      name: '',
      iosProductId: '',
      price: '',
      discount: '',
      description: '',
      days: '',
      advertisementLimit: '',
      image: null
    });
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  const handleFileChange = (event) => {
    setFormData(prev => ({
      ...prev,
      image: event.target.files[0]
    }));
  };

  const calculateFinalPrice = () => {
    const price = parseFloat(formData.price) || 0;
    const discount = parseFloat(formData.discount) || 0;
    return (price - (price * discount / 100)).toFixed(2);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      toast.error('Please fill in required fields');
      return;
    }

    const finalPrice = calculateFinalPrice();
    const planData = {
      name: formData.name,
      iosProductId: formData.iosProductId,
      description: formData.description,
      price: parseFloat(formData.price),
      discount: parseFloat(formData.discount) || 0,
      finalPrice: parseFloat(finalPrice),
      days: parseInt(formData.days) || 0,
      advertisementLimit: parseInt(formData.advertisementLimit) || 0,
      status: true,
      image: formData.image ? URL.createObjectURL(formData.image) : (isEditing ? packages.find(p => p.id === editingPlanId)?.image : 'https://via.placeholder.com/64')
    };

    if (isEditing && editingPlanId) {
      // Update existing plan
      setPackages(packages.map(plan =>
        plan.id === editingPlanId
          ? { ...plan, ...planData, isTemporary: false }
          : plan
      ));
      toast.success('Plan updated successfully!');
    } else {
      // Create new plan
      const newPlan = {
        id: packages.length + 1,
        ...planData,
        isTemporary: true
      };
      setPackages([...packages, newPlan]);
      toast.success('Plan created successfully!');
    }

    handleCloseDialog();
  };



  const filteredPackages = packages.filter(p => !p.isDeleted);
  useLayoutDetails({ title: "Feature Advertisement" });

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader title="Feature Advertisement" subtitle="Manage feature advertisement packages" />
        <Button
          variant="contained"
          color="error"
          startIcon={<i className="tabler-plus"></i>}
          onClick={handleOpenDialog}
          className="max-sm:is-full"
        >
          Add New Feature
        </Button>
      </div>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>

          <Box sx={{ overflowX: 'auto' }}>
            <TableContainer>
              <Table sx={{ tableLayout: 'fixed', minWidth: '1200px' }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 220, fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>Feature Name</TableCell>
                    <TableCell sx={{ width: 300, fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>Description</TableCell>
                    <TableCell sx={{ width: 90, fontWeight: 600, fontSize: '0.875rem', textAlign: 'center', whiteSpace: 'nowrap' }}>Price</TableCell>
                    <TableCell sx={{ width: 90, fontWeight: 600, fontSize: '0.875rem', textAlign: 'center', whiteSpace: 'nowrap' }}>Discount</TableCell>
                    <TableCell sx={{ width: 90, fontWeight: 600, fontSize: '0.875rem', textAlign: 'center', whiteSpace: 'nowrap' }}>Final Price</TableCell>
                    <TableCell sx={{ width: 90, fontWeight: 600, fontSize: '0.875rem', textAlign: 'center', whiteSpace: 'nowrap' }}>Days</TableCell>
                    <TableCell sx={{ width: 90, fontWeight: 600, fontSize: '0.875rem', textAlign: 'center', whiteSpace: 'nowrap' }}>Ads Limit</TableCell>
                    <TableCell sx={{ width: 100, fontWeight: 600, fontSize: '0.875rem', textAlign: 'center', whiteSpace: 'nowrap' }}>Status</TableCell>
                    <TableCell sx={{ width: 120, fontWeight: 600, fontSize: '0.875rem', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPackages.map((plan) => (
                    <TableRow
                      key={plan.id}
                      sx={{
                        height: 80,
                        '&:hover': { backgroundColor: 'var(--bg-tertiary)' },
                        backgroundColor: plan.status ? 'inherit' : '#fcfcfc',
                        opacity: plan.status ? 1 : 0.5,
                        transition: 'opacity 0.2s ease'
                      }}
                    >
                      <TableCell sx={{ verticalAlign: 'middle', px: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar src={plan.image} sx={{ width: 40, height: 40 }} variant="rounded" />
                          <Typography variant="body2" color="text.primary">
                            {plan.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ width: 300, verticalAlign: 'top', p: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <Typography
                            variant="body2"
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: expandedDescriptions.has(plan.id) ? 'none' : 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              fontWeight: 400,
                              lineHeight: 1.5,
                              color: 'text.secondary',
                              wordBreak: 'break-word',
                              overflowWrap: 'break-word',
                              whiteSpace: 'normal'
                            }}
                          >
                            {plan.description}
                          </Typography>
                          {plan.description.length > 50 && (
                            <Button
                              variant="text"
                              color="error"
                              size="small"
                              onClick={() => {
                                setExpandedDescriptions(prev => {
                                  const newSet = new Set(prev);
                                  if (newSet.has(plan.id)) {
                                    newSet.delete(plan.id);
                                  } else {
                                    newSet.add(plan.id);
                                  }
                                  return newSet;
                                });
                              }}
                              sx={{
                                minWidth: 'auto',
                                padding: '2px 0',
                                mt: -2,
                                textTransform: 'none',
                                fontSize: '13px',
                                fontWeight: 600,
                                textAlign: 'left',
                                alignSelf: 'flex-start',
                                '&:hover': { background: 'transparent', textDecoration: 'underline' }
                              }}
                            >
                              {expandedDescriptions.has(plan.id) ? 'Read Less' : 'Read More'}
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', px: 2 }}>
                        <Typography variant="body2">{plan.price}</Typography>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', px: 2 }}>
                        <Typography variant="body2">{plan.discount}%</Typography>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', px: 2 }}>
                        <Typography variant="body2" color="primary">${plan.finalPrice}</Typography>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', px: 2 }}>
                        <Typography variant="body2">{plan.days}</Typography>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', px: 2 }}>
                        <Typography variant="body2">{plan.advertisementLimit}</Typography>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', px: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <StatusToggle
                            currentStatus={plan.status}
                            onToggle={(newStatus) => handleStatusChange(plan.id, newStatus)}
                            activeStatus="active"
                            inactiveStatus="inactive"
                          />
                        </Box>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', px: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenEditDialog(plan)}
                            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                          >
                            <IconEdit size={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeletePlan(plan.id)}
                            sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'error.lighter' } }}
                          >
                            <IconTrash size={18} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredPackages.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                        <Typography variant="body2" color="text.secondary">No feature packages found</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap', gap: 2 }}>
            <div className="flex items-center gap-2">
              <FormControl size="small" className="MuiFormControl-root MuiTextField-root max-sm:is-full sm:is-[70px] mui-1o5v172">
                <Select
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(e.target.value);
                    setPage(1);
                  }}
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
              <div>
                Showing {filteredPackages.length > 0 ? 1 : 0} to {filteredPackages.length} of {filteredPackages.length} entries
              </div>
            </div>
            <Pagination
              count={Math.ceil(filteredPackages.length / entriesPerPage) || 1}
              page={page}
              onChange={handlePageChange}
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
        </Paper >
      </Box >

      {/* Create Plan Dialog */}
      < Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '12px',
          },
        }
        }
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {isEditing ? 'Edit Feature Ad Package' : 'Create Feature Ad Package'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              color="error"
              value={formData.name}
              onChange={handleInputChange('name')}
              required
            />
            <TextField
              label="iOS Product Id"
              fullWidth
              variant="outlined"
              color="error"
              value={formData.iosProductId}
              onChange={handleInputChange('iosProductId')}
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              variant="outlined"
              color="error"
              value={formData.price}
              onChange={handleInputChange('price')}
              inputProps={{ min: 0 }}
              required
            />
            <TextField
              label="Discount (%)"
              type="number"
              fullWidth
              variant="outlined"
              color="error"
              value={formData.discount}
              onChange={handleInputChange('discount')}
              inputProps={{ min: 0, max: 100 }}
            />
            <TextField
              label="Final Price"
              type="number"
              fullWidth
              value={calculateFinalPrice()}
              InputProps={{
                readOnly: true,
              }}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Description"
              fullWidth
              value={formData.description}
              onChange={handleInputChange('description')}
            />
            <TextField
              label="Days"
              type="number"
              fullWidth
              value={formData.days}
              onChange={handleInputChange('days')}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Advertisement Limit"
              type="number"
              fullWidth
              value={formData.advertisementLimit}
              onChange={handleInputChange('advertisementLimit')}
              inputProps={{ min: 0 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="upload-button-file">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  color="error"
                  tabIndex={0}
                  startIcon={<i className="tabler-upload text-[18px]"></i>}
                >
                  Upload Image
                </Button>
              </label>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Accepted formats: JPEG (JPG), PNG, GIF, WebP
              </Typography>
              {formData.image && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: 200,
                      objectFit: 'contain',
                      borderRadius: 4,
                      border: '1px solid #e0e0e0'
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="tonal" color="error" tabIndex={0}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="error" tabIndex={0}>
            {isEditing ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog >
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => !isDeleting && setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 1, pt: 3 }}>
          <Box sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)', p: 1.5, borderRadius: '50%', mb: 2 }}>
            <IconTrash size={32} color="#e74c3c" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Delete Package</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
          <Typography variant="body1">Are you sure you want to delete <strong>{packageToDelete?.name}</strong>?</Typography>
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
}

export default FeatureAdvertisement;

