import React, { useState } from 'react';
import { useLayoutDetails } from '../context/LayoutContext';
import { Paper, Select, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Box, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Autocomplete, FormControlLabel, Typography, Menu, FormControl, Avatar } from '@mui/material';
import { IconPlus, IconEdit, IconTrash, IconPencil, IconX, IconUpload, IconCheck, IconLoader2 } from '@tabler/icons-react';
import StatusToggle from './StatusToggle';
import { toast } from 'react-toastify';
import PageHeader from './PageHeader';

const Attributes = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const typeOptions = [
    { value: 'All', label: 'All Types' },
    { value: 'Number', label: 'Number' },
    { value: 'Text', label: 'Text' },
    { value: 'File', label: 'File' },
    { value: 'Radio', label: 'Radio' },
    { value: 'Dropdown', label: 'Dropdown' },
    { value: 'Checkboxes', label: 'Checkboxes' },
  ];

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('attributes_categories');
    return saved ? JSON.parse(saved) : [
      { _id: '1', name: 'Smart Gadgets' },
      { _id: '2', name: 'Shoes' },
      { _id: '3', name: 'Property For Rent' },
      { _id: '4', name: 'Property For Sale' },
      { _id: '5', name: 'Bikes' }
    ];
  });
  const [loading, setLoading] = useState(false);

  const categoryOptions = [
    { value: 'All', label: 'All Categories' },
    ...categories.map(cat => ({ value: cat.name, label: cat.name, id: cat._id }))
  ];

  const [typeFilter, setTypeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeMenuAnchorEl, setTypeMenuAnchorEl] = useState(null);
  const [categoryMenuAnchorEl, setCategoryMenuAnchorEl] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [valuesInput, setValuesInput] = useState('');
  const [valuesList, setValuesList] = useState(['Yes', 'No']);
  const [editedRequired, setEditedRequired] = useState(false);
  const [editedStatus, setEditedStatus] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openValuesDialog, setOpenValuesDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [attributeToDelete, setAttributeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Values CRUD State
  const [isValueSaving, setIsValueSaving] = useState(false);
  const [openValueDeleteDialog, setOpenValueDeleteDialog] = useState(false);
  const [valueToDeleteIndex, setValueToDeleteIndex] = useState(null);
  const [isValueDeleting, setIsValueDeleting] = useState(false);

  // Production-Ready State: Previews and Errors
  const [editedFile, setEditedFile] = useState(null);
  const [editedPreview, setEditedPreview] = useState(null);
  const [addFile, setAddFile] = useState(null);
  const [addPreview, setAddPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditedFile(file); // Keep file object for validation if needed, though we use base64 for storage
          setEditedPreview(reader.result);
        } else {
          setAddFile(file);
          setAddPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (isEdit = false) => {
    const newErrors = {};
    const name = isEdit ? editedName : addName;
    const category = isEdit ? editedCategory : addCategory;
    const type = isEdit ? editedFieldType : addFieldType;

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!category) newErrors.category = 'Category is required';
    if (!type) newErrors.fieldType = 'Field type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
    setErrors({});
    setEditedPreview(null);
    setEditedFile(null);
    setValuesInput('');
    setIsSaving(false);
  };

  const handleCloseAdd = () => {
    setOpenAddDialog(false);
    setAddName('');
    setAddCategory('');
    setAddFieldType('');
    setAddMinLength('');
    setAddMaxLength('');
    setValuesList([]);
    setAddRequired(false);
    setAddStatus(true);
    setAddFile(null);
    setAddPreview(null);
    setErrors({});
    setValuesInput('');
  };
  const [addCategory, setAddCategory] = useState('');
  const [addName, setAddName] = useState('');
  const [addFieldType, setAddFieldType] = useState('Number');
  const [addMinLength, setAddMinLength] = useState('');
  const [addMaxLength, setAddMaxLength] = useState('');
  const [addRequired, setAddRequired] = useState(false);
  const [addStatus, setAddStatus] = useState(true);
  const [editedName, setEditedName] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editedFieldType, setEditedFieldType] = useState('');
  const [editedMinLength, setEditedMinLength] = useState('');
  const [editedMaxLength, setEditedMaxLength] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const defaultAttributes = [
    {
      _id: '1',
      name: 'Warranty',
      category: { name: 'Smart Gadgets', _id: '1' },
      fieldType: 'Radio',
      required: true,
      status: true,
      created: '10/17/2025, 10:37:29 AM',
      image: 'https://placehold.co/100x100?text=Attribute',
      values: ['Yes', 'No']
    },
    {
      _id: '2',
      name: 'Brand',
      category: { name: 'Shoes', _id: '2' },
      fieldType: 'Dropdown',
      required: true,
      status: true,
      created: '10/16/2025, 6:17:33 PM',
      image: 'https://placehold.co/100x100?text=Attribute',
      values: ['Nike', 'Adidas', 'Puma']
    },
    {
      _id: '3',
      name: 'Color',
      category: { name: 'Shoes', _id: '2' },
      fieldType: 'Checkboxes',
      required: true,
      status: true,
      created: '10/16/2025, 6:16:24 PM',
      image: 'https://placehold.co/100x100?text=Attribute',
      values: ['Red', 'Blue', 'Black']
    },
    {
      _id: '4',
      name: 'Furnishing',
      category: { name: 'Property For Rent', _id: '3' },
      fieldType: 'Radio',
      required: true,
      status: true,
      created: '10/16/2025, 3:50:37 PM',
      image: 'https://placehold.co/100x100?text=Attribute',
      values: ['Furnished', 'Unfurnished', 'Semi-Furnished']
    },
    {
      _id: '5',
      name: 'Parking',
      category: { name: 'Property For Sale', _id: '4' },
      fieldType: 'Radio',
      required: true,
      status: true,
      created: '10/16/2025, 3:49:42 PM',
      image: 'https://placehold.co/100x100?text=Attribute',
      values: ['No', '1', '2+']
    },
    {
      _id: '6',
      name: 'Bedrooms',
      category: { name: 'Property For Sale', _id: '4' },
      fieldType: 'Number',
      required: true,
      status: true,
      created: '10/16/2025, 3:47:00 PM',
      image: 'https://placehold.co/100x100?text=Attribute',
      values: []
    },
    {
      _id: '7',
      name: 'Carpet Area',
      category: { name: 'Property For Sale', _id: '4' },
      fieldType: 'Number',
      required: true,
      status: true,
      created: '10/16/2025, 3:48:00 PM',
      image: 'https://placehold.co/100x100?text=Attribute',
      values: []
    },
    {
      _id: '8',
      name: 'Brand',
      category: { name: 'Bikes', _id: '5' },
      fieldType: 'Dropdown',
      required: true,
      status: true,
      created: '10/16/2025, 3:43:09 PM',
      image: 'https://placehold.co/100x100?text=Attribute',
      values: ['Honda', 'Yamaha', 'Suzuki', 'Royal Enfield']
    },
    {
      _id: '9',
      name: 'Fuel',
      category: { name: 'Cars', _id: '6' },
      fieldType: 'Radio',
      required: true,
      status: true,
      created: '10/16/2025, 3:40:55 PM',
      image: 'https://placehold.co/100x100?text=Attribute',
      values: ['Petrol', 'Diesel', 'Electric', 'Hybrid']
    },
    {
      _id: '10',
      name: 'Car Brand',
      category: { name: 'Cars', _id: '6' },
      fieldType: 'Dropdown',
      required: true,
      status: true,
      created: '10/16/2025, 3:38:01 PM',
      image: 'https://placehold.co/100x100?text=Attribute',
      values: ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes']
    }
  ];

  const [attributesList, setAttributesList] = useState(() => {
    const saved = localStorage.getItem('attributes_list');
    if (saved) {
      let parsed = JSON.parse(saved);
      // Normalize status and reset isDeleted on refresh
      parsed = parsed.map((attr, idx) => ({
        ...attr,
        _id: attr._id || `migrated-attr-${idx}`,
        status: attr.isDeleted ? true : (attr.status !== false ? true : false),
        isDeleted: false // Restore deleted items on refresh
      }));

      // Merge missing defaults
      defaultAttributes.forEach(defAttr => {
        if (!parsed.some(p => p._id === defAttr._id)) {
          parsed.push(defAttr);
        }
      });
      return parsed;
    }
    return defaultAttributes;
  });

  const handleSaveEdit = async () => {
    if (!validateForm(true)) return;

    setIsSaving(true);

    // Determine the category object
    const selectedCat = categories.find(c => c.name === editedCategory) || { name: editedCategory, _id: 'temp-cat-id' };

    const updatedAttr = {
      ...selectedAttribute,
      name: editedName,
      category: selectedCat,
      fieldType: editedFieldType,
      minLength: editedMinLength,
      maxLength: editedMaxLength,
      required: editedRequired,
      status: editedStatus,
      values: valuesList,
      image: editedPreview || selectedAttribute.image, // Use the base64 preview string
    };

    const newList = attributesList.map(attr =>
      attr._id === selectedAttribute._id ? updatedAttr : attr
    );
    setAttributesList(newList);
    localStorage.setItem('attributes_list', JSON.stringify(newList.filter(attr => !attr.isTemporary)));

    toast.success('Attribute updated successfully');
    handleCloseEdit();
    setIsSaving(false);
  };

  const handleSaveAdd = async () => {
    if (!validateForm(false)) return;

    setIsSaving(true);

    // Determine the category object
    const selectedCat = categories.find(c => c.name === addCategory) || { name: addCategory, _id: 'temp-cat-id' };

    const newAttr = {
      _id: Date.now().toString(),
      name: addName,
      category: selectedCat,
      fieldType: addFieldType,
      minLength: addMinLength,
      maxLength: addMaxLength,
      required: addRequired,
      status: addStatus,
      isDeleted: false,
      values: valuesList,
      image: addPreview || 'https://placehold.co/40x40', // Use Base64 preview
      created: new Date().toLocaleString(),
      isTemporary: true
    };

    const newList = [newAttr, ...attributesList];
    setAttributesList(newList);
    localStorage.setItem('attributes_list', JSON.stringify(newList.filter(attr => !attr.isTemporary)));

    toast.success('Attribute created successfully');
    handleCloseAdd();
    setIsSaving(false);
  };

  const handleConfirmDelete = async () => {
    if (!attributeToDelete) return;

    setIsDeleting(true);

    // Soft delete: mark as deleted instead of removing
    const newList = attributesList.map(attr =>
      attr._id === attributeToDelete._id
        ? { ...attr, isDeleted: true, status: false }
        : attr
    );

    setAttributesList(newList);
    localStorage.setItem('attributes_list', JSON.stringify(newList.filter(attr => !attr.isTemporary)));

    setOpenDeleteDialog(false);
    setAttributeToDelete(null);
    toast.success('Attribute deleted successfully');
    setIsDeleting(false);
  };

  const handleStatusToggle = async (attributeId, newStatus) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newList = attributesList.map(attr =>
      attr._id === attributeId ? { ...attr, status: newStatus === 'Active' } : attr
    );
    setAttributesList(newList);
    localStorage.setItem('attributes_list', JSON.stringify(newList.filter(attr => !attr.isTemporary)));
  };

  const updateAttributeValues = async (newValues) => {
    if (!selectedAttribute) return false;

    const updatedAttr = { ...selectedAttribute, values: newValues };

    const newList = attributesList.map(a =>
      a._id === selectedAttribute._id ? updatedAttr : a
    );
    setAttributesList(newList);
    localStorage.setItem('attributes_list', JSON.stringify(newList.filter(attr => !attr.isTemporary)));

    setSelectedAttribute(updatedAttr);
    return true;
  };

  const handleAddValue = async () => {
    if (!valuesInput.trim()) return;
    if (valuesList.includes(valuesInput.trim())) {
      toast.error('Value already exists');
      return;
    }

    const newValue = valuesInput.trim();
    setIsValueSaving(true);

    const updatedValues = [...valuesList, newValue];
    const success = await updateAttributeValues(updatedValues);

    if (success) {
      setValuesList(updatedValues);
      setValuesInput('');
      toast.success('Value added successfully');
    }
    setIsValueSaving(false);
  };

  const handleEditValueSave = async (index) => {
    if (!editValue.trim()) return;
    if (valuesList[index] === editValue.trim()) {
      setEditingIndex(null);
      return;
    }
    if (valuesList.some((v, i) => i !== index && v === editValue.trim())) {
      toast.error('Value already exists');
      return;
    }

    setIsValueSaving(true);

    const updatedValues = [...valuesList];
    updatedValues[index] = editValue.trim();

    const success = await updateAttributeValues(updatedValues);

    if (success) {
      setValuesList(updatedValues);
      setEditingIndex(null);
      toast.success('Value updated successfully');
    }
    setIsValueSaving(false);
  };

  const handleConfirmDeleteValue = async () => {
    if (valueToDeleteIndex === null) return;

    setIsValueDeleting(true);

    const updatedValues = valuesList.filter((_, i) => i !== valueToDeleteIndex);
    const success = await updateAttributeValues(updatedValues);

    if (success) {
      setValuesList(updatedValues);
      setOpenValueDeleteDialog(false);
      setValueToDeleteIndex(null);
      toast.success('Value deleted successfully');
    }
    setIsValueDeleting(false);
  };

  const filteredAttributes = attributesList.filter(attr => {
    if (attr.isDeleted) return false; // Filter out deleted items

    const selectedTypeLabel = typeOptions.find(o => o.value === typeFilter)?.label;
    const typeMatch = typeFilter === 'All' || attr.fieldType === selectedTypeLabel;
    const categoryName = attr.category?.name || attr.category;
    const categoryMatch = categoryFilter === 'All' || categoryName === categoryFilter;
    return typeMatch && categoryMatch;
  });

  const totalPages = Math.ceil(filteredAttributes.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const sliced = filteredAttributes.slice(startIndex, endIndex);
  const padded = [...sliced, ...Array(Math.max(0, entriesPerPage - sliced.length)).fill({})];
  const displayedAttributes = padded;



  useLayoutDetails({ title: "Attributes" });

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader title="Attributes" subtitle="Manage product attributes and specifications" />
        <Button variant="contained" color="error" startIcon={<IconPlus />} onClick={() => setOpenAddDialog(true)} className="add-attribute-btn">
          Add Attribute
        </Button>
      </div>

      <Box sx={{ width: '100%' }}>

        <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={(e) => setTypeMenuAnchorEl(e.currentTarget)}
                sx={{ minWidth: 120, textTransform: 'none' }}
              >
                {typeOptions.find(o => o.value === typeFilter)?.label || 'All Types'}
              </Button>
              <Menu
                anchorEl={typeMenuAnchorEl}
                open={Boolean(typeMenuAnchorEl)}
                onClose={() => setTypeMenuAnchorEl(null)}
              >
                {typeOptions.map(option => (
                  <MenuItem
                    key={option.value}
                    selected={typeFilter === option.value}
                    onClick={() => { setTypeFilter(option.value); setCurrentPage(1); setTypeMenuAnchorEl(null); }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Menu>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={(e) => setCategoryMenuAnchorEl(e.currentTarget)}
                sx={{ minWidth: 150, textTransform: 'none' }}
              >
                {categoryOptions.find(o => o.value === categoryFilter)?.label || 'All Categories'}
              </Button>
              <Menu
                anchorEl={categoryMenuAnchorEl}
                open={Boolean(categoryMenuAnchorEl)}
                onClose={() => setCategoryMenuAnchorEl(null)}
              >
                {categoryOptions.map(option => (
                  <MenuItem
                    key={option.value}
                    selected={categoryFilter === option.value}
                    onClick={() => { setCategoryFilter(option.value); setCurrentPage(1); setCategoryMenuAnchorEl(null); }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>IMAGE / NAME</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>CATEGORY</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>FIELD TYPE</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>REQUIRED</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>CREATED</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedAttributes.map((attr, index) => (
                  <TableRow
                    key={attr._id || index}
                    sx={{
                      opacity: attr.status ? 1 : 0.6,
                      filter: attr.status ? 'none' : 'grayscale(0.5)',
                      transition: 'opacity 0.3s ease, filter 0.3s ease',
                      backgroundColor: attr.status ? 'inherit' : '#fcfcfc'
                    }}
                  >
                    {attr.name ? (
                      <>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                              src={attr.image}
                              alt={attr.name}
                              variant="rounded"
                              sx={{ width: 40, height: 40 }}
                            />
                            <Typography variant="body2">{attr.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{attr.category?.name || attr.category}</TableCell>
                        <TableCell>
                          <Chip label={attr.fieldType} variant="outlined" size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={attr.required ? 'Yes' : 'No'}
                            size="small"
                            sx={{
                              backgroundColor: attr.required ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
                              color: attr.required ? '#2ecc71' : '#e74c3c',
                              borderColor: 'transparent',
                              fontWeight: 500
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <StatusToggle
                            currentStatus={attr.status ? 'Active' : 'Inactive'}
                            onToggle={(newStatus) => handleStatusToggle(attr._id, newStatus)}
                            activeStatus="Active"
                            inactiveStatus="Inactive"
                          />
                        </TableCell>
                        <TableCell>{new Date(attr.createdAt || attr.created).toLocaleString()}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <IconButton
                              onClick={() => {
                                setSelectedAttribute(attr);
                                setEditedName(attr.name);
                                setEditedCategory(attr.category?.name || attr.category);
                                setEditedFieldType(attr.fieldType);
                                setEditedMinLength(attr.minLength || '');
                                setEditedMaxLength(attr.maxLength || '');
                                setEditedRequired(attr.required);
                                setEditedStatus(attr.status);
                                setValuesList(attr.values || []);
                                setEditedPreview(attr.image);
                                setOpenEditDialog(true);
                              }}
                              aria-label="Edit Attribute"
                              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                            >
                              <IconEdit size={18} />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setAttributeToDelete(attr);
                                setOpenDeleteDialog(true);
                              }}
                              aria-label="Delete Attribute"
                              sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'error.lighter' } }}
                            >
                              <IconTrash size={18} />
                            </IconButton>
                            <IconButton
                              onClick={() => { setSelectedAttribute(attr); setValuesList(attr.values || []); setOpenValuesDialog(true); }}
                              aria-label="Manage Values"
                              sx={{ color: 'text.secondary', '&:hover': { color: 'info.main', bgcolor: 'info.lighter' } }}
                            >
                              <IconPencil size={18} />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap', gap: 2 }}>
            <div className="flex items-center gap-2">
              <FormControl size="small" className="MuiFormControl-root MuiTextField-root max-sm:is-full sm:is-[70px] mui-1o5v172">
                <Select
                  value={entriesPerPage}
                  onChange={(e) => { setEntriesPerPage(e.target.value); setCurrentPage(1); }}
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
              <div>Showing {startIndex + 1} to {Math.min(endIndex, filteredAttributes.length)} of {filteredAttributes.length} entries</div>
            </div>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
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
        <Dialog open={openEditDialog} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Edit Attribute</Typography>
            <IconButton onClick={handleCloseEdit} size="small">
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 3, overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Autocomplete
                options={categoryOptions.filter(opt => opt.value !== 'All')}
                value={categoryOptions.find(opt => opt.label === editedCategory) || null}
                onChange={(event, newValue) => {
                  if (newValue) setEditedCategory(newValue.label);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Categories"
                    variant="outlined"
                    color="error"
                    error={!!errors.category}
                    helperText={errors.category}
                  />
                )}
                fullWidth
                disabled
                slotProps={{
                  paper: {
                    sx: {
                      maxHeight: 300,
                      '& .MuiAutocomplete-option': {
                        fontSize: '0.95rem',
                        padding: '10px 16px'
                      }
                    }
                  }
                }}
              />
              <TextField
                label="Name"
                placeholder="e.g. warranty"
                value={editedName}
                onChange={(e) => {
                  setEditedName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                fullWidth
                variant="outlined"
                color="error"
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Field Type"
                select
                value={editedFieldType}
                onChange={(e) => {
                  setEditedFieldType(e.target.value);
                  if (errors.fieldType) setErrors({ ...errors, fieldType: '' });
                }}
                fullWidth
                variant="outlined"
                color="error"
                error={!!errors.fieldType}
                helperText={errors.fieldType}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        maxHeight: 300,
                        '& .MuiMenuItem-root': {
                          fontSize: '0.95rem',
                          padding: '10px 16px'
                        }
                      }
                    }
                  }
                }}
              >
                <MenuItem value="Radio">Radio</MenuItem>
                <MenuItem value="Dropdown">Dropdown</MenuItem>
                <MenuItem value="Checkboxes">Checkboxes</MenuItem>
                <MenuItem value="Number">Number</MenuItem>
                <MenuItem value="Text">Text</MenuItem>
                <MenuItem value="File">File</MenuItem>
              </TextField>

              {(editedFieldType === 'Text' || editedFieldType === 'Number') && (
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField
                    label="Min Length"
                    type="number"
                    value={editedMinLength}
                    onChange={(e) => setEditedMinLength(e.target.value)}
                    fullWidth
                    variant="outlined"
                    color="error"
                  />
                  <TextField
                    label="Max Length"
                    type="number"
                    value={editedMaxLength}
                    onChange={(e) => setEditedMaxLength(e.target.value)}
                    fullWidth
                    variant="outlined"
                    color="error"
                  />
                </Box>
              )}

              {(editedFieldType === 'Radio' || editedFieldType === 'Dropdown' || editedFieldType === 'Checkboxes') && (
                <Box sx={{ width: '100%', mb: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1.5, width: '100%', alignItems: 'flex-start' }}>
                    <TextField
                      label="Values"
                      placeholder="Type a value and press Enter…"
                      value={valuesInput}
                      onChange={(e) => setValuesInput(e.target.value)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      color="error"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && valuesInput.trim()) {
                          setValuesList([...valuesList, valuesInput.trim()]);
                          setValuesInput('');
                        }
                      }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ height: 40, minWidth: '80px' }}
                      onClick={() => {
                        if (valuesInput.trim()) {
                          setValuesList([...valuesList, valuesInput.trim()]);
                          setValuesInput('');
                        }
                      }}
                      disabled={!valuesInput.trim()}
                    >
                      Add
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5, justifyContent: 'flex-start', width: '100%' }}>
                    {valuesList.map((value, index) => (
                      <Chip
                        key={index}
                        label={value}
                        variant="outlined"
                        onDelete={() => setValuesList(valuesList.filter((_, i) => i !== index))}
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              )}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: 'fit-content', lineHeight: 1, display: 'flex', alignItems: 'center' }}>Required</Typography>
                  <StatusToggle
                    currentStatus={editedRequired ? 'live' : 'danger'}
                    onToggle={async (newStatus) => {
                      setEditedRequired(newStatus === 'live');
                      if (newStatus === 'live') setEditedStatus(true);
                    }}
                    activeStatus="live"
                    inactiveStatus="danger"
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: 'fit-content', lineHeight: 1, display: 'flex', alignItems: 'center' }}>Active</Typography>
                  <StatusToggle
                    currentStatus={editedStatus}
                    onToggle={async (newStatus) => {
                      setEditedStatus(newStatus === 'live');
                    }}
                    activeStatus="live"
                    inactiveStatus="danger"
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <input
                  accept="image/*"
                  id="edit-upload-button-file"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, true)}
                />
                <label htmlFor="edit-upload-button-file">
                  <Button variant="outlined" color="error" component="span" startIcon={<IconUpload />} fullWidth>
                    Upload File
                  </Button>
                </label>
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                  Accepted formats: image/*
                </Typography>
                {editedPreview && (
                  <Box sx={{ mt: 1, position: 'relative', width: 'fit-content' }}>
                    <img
                      alt="Preview"
                      src={editedPreview}
                      style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: 4, border: '1px solid #e0e0e0' }}
                    />
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: '#fff' } }}
                      onClick={() => { setEditedPreview(null); setEditedFile(null); }}
                    >
                      <IconX size={14} />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={handleCloseEdit} disabled={isSaving}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleSaveEdit}
              disabled={isSaving}
              sx={{ minWidth: 100 }}
            >
              {isSaving ? 'Updating...' : 'Update'}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openAddDialog} onClose={handleCloseAdd} maxWidth="md" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Add New Attribute</Typography>
            <IconButton onClick={handleCloseAdd}>
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 3, overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Autocomplete
                options={categoryOptions.filter(opt => opt.value !== 'All')}
                value={categoryOptions.find(opt => opt.value === addCategory) || null}
                onChange={(event, newValue) => {
                  setAddCategory(newValue ? newValue.value : '');
                  if (errors.category) setErrors({ ...errors, category: '' });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Categories"
                    placeholder="Select categories"
                    error={!!errors.category}
                    helperText={errors.category}
                  />
                )}
                fullWidth

              />
              <TextField
                label="Name"
                placeholder="e.g. warranty"
                value={addName}
                onChange={(e) => {
                  setAddName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                fullWidth
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Field Type"
                select
                value={addFieldType}
                onChange={(e) => {
                  setAddFieldType(e.target.value);
                  if (errors.fieldType) setErrors({ ...errors, fieldType: '' });
                }}
                fullWidth
                error={!!errors.fieldType}
                helperText={errors.fieldType}
              >
                <MenuItem value="Radio">Radio</MenuItem>
                <MenuItem value="Dropdown">Dropdown</MenuItem>
                <MenuItem value="Checkboxes">Checkboxes</MenuItem>
                <MenuItem value="Number">Number</MenuItem>
                <MenuItem value="Text">Text</MenuItem>
                <MenuItem value="File">File</MenuItem>
              </TextField>
              {(addFieldType === 'Text' || addFieldType === 'Number') && (
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField
                    label="Min Length"
                    type="number"
                    value={addMinLength}
                    onChange={(e) => setAddMinLength(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Max Length"
                    type="number"
                    value={addMaxLength}
                    onChange={(e) => setAddMaxLength(e.target.value)}
                    fullWidth
                  />
                </Box>
              )}

              {(addFieldType === 'Radio' || addFieldType === 'Dropdown' || addFieldType === 'Checkboxes') && (
                <Box sx={{ width: '100%', mb: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1.5, width: '100%', alignItems: 'flex-start' }}>
                    <TextField
                      label="Values"
                      placeholder="Type a value and press Enter…"
                      value={valuesInput}
                      onChange={(e) => setValuesInput(e.target.value)}
                      fullWidth
                      size="small"
                      variant="outlined"
                      color="error"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && valuesInput.trim()) {
                          setValuesList([...valuesList, valuesInput.trim()]);
                          setValuesInput('');
                        }
                      }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ height: 40, minWidth: '80px' }}
                      onClick={() => {
                        if (valuesInput.trim()) {
                          setValuesList([...valuesList, valuesInput.trim()]);
                          setValuesInput('');
                        }
                      }}
                      disabled={!valuesInput.trim()}
                    >
                      Add
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5, justifyContent: 'flex-start', width: '100%' }}>
                    {valuesList.map((value, index) => (
                      <Chip
                        key={index}
                        label={value}
                        variant="outlined"
                        onDelete={() => setValuesList(valuesList.filter((_, i) => i !== index))}
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              )}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: 'fit-content', lineHeight: 1, display: 'flex', alignItems: 'center' }}>Required</Typography>
                  <StatusToggle
                    currentStatus={addRequired ? 'live' : 'danger'}
                    onToggle={async (newStatus) => {
                      setAddRequired(newStatus === 'live');
                      if (newStatus === 'live') setAddStatus(true);
                    }}
                    activeStatus="live"
                    inactiveStatus="danger"
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: 'fit-content', lineHeight: 1, display: 'flex', alignItems: 'center' }}>Active</Typography>
                  <StatusToggle
                    currentStatus={addStatus}
                    onToggle={async (newStatus) => {
                      setAddStatus(newStatus === 'live');
                    }}
                    activeStatus="live"
                    inactiveStatus="danger"
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <input
                  accept="image/*"
                  id="add-upload-button-file"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, false)}
                />
                <label htmlFor="add-upload-button-file">
                  <Button variant="outlined" color="error" component="span" startIcon={<IconUpload />} fullWidth>
                    Upload File
                  </Button>
                </label>
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                  Accepted formats: image/*
                </Typography>
                {addPreview && (
                  <Box sx={{ mt: 1, position: 'relative', width: 'fit-content' }}>
                    <img
                      alt="Preview"
                      src={addPreview}
                      style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: 4, border: '1px solid #e0e0e0' }}
                    />
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: '#fff' } }}
                      onClick={() => { setAddPreview(null); setAddFile(null); }}
                    >
                      <IconX size={14} />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={handleCloseAdd} disabled={isSaving}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleSaveAdd}
              disabled={isSaving}
              sx={{ minWidth: 100 }}
            >
              {isSaving ? 'Creating...' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openValuesDialog} onClose={() => setOpenValuesDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Attribute Values</Typography>
            <IconButton onClick={() => setOpenValuesDialog(false)}>
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 0, overflowY: 'auto', maxHeight: '60vh' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.1)', display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Type a new value..."
                value={valuesInput}
                onChange={(e) => setValuesInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleAddValue();
                }}
                disabled={isValueSaving}
              />
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={handleAddValue}
                disabled={isValueSaving}
                sx={{ minWidth: 80 }}
              >
                {isValueSaving ? 'Adding...' : 'Add'}
              </Button>
            </Box>
            <Box>
              <Table className="table_table__cB3AL">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'center' }}>
                        <Typography variant="body1" fontWeight="medium">Value</Typography>
                        <i className="ri-arrow-down-s-line text-xl"></i>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body1" fontWeight="medium">Actions</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {valuesList.map((value, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {editingIndex === index ? (
                          <TextField
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            size="small"
                            fullWidth
                            autoFocus
                            disabled={isValueSaving}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') handleEditValueSave(index);
                            }}
                          />
                        ) : (
                          <Typography variant="body1" fontWeight="medium" textAlign="center">{value}</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
                          {editingIndex === index ? (
                            <>
                              <IconButton
                                size="small"
                                onClick={() => handleEditValueSave(index)}
                                disabled={isValueSaving}
                                sx={{ color: 'primary.main' }}
                              >
                                {isValueSaving ? <IconLoader2 size={18} className="animate-spin" /> : <IconCheck size={18} />}
                              </IconButton>
                              <IconButton size="small" onClick={() => setEditingIndex(null)} disabled={isValueSaving}>
                                <IconX size={18} />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <IconButton
                                size="small"
                                aria-label="Edit Values"
                                onClick={() => { setEditingIndex(index); setEditValue(value); }}
                                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                                disabled={isValueSaving}
                              >
                                <IconEdit size={18} />
                              </IconButton>
                              <IconButton
                                size="small"
                                aria-label="Delete Values"
                                onClick={() => {
                                  setValueToDeleteIndex(index);
                                  setOpenValueDeleteDialog(true);
                                }}
                                sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'error.lighter' } }}
                                disabled={isValueSaving}
                              >
                                <IconTrash size={18} />
                              </IconButton>
                            </>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </DialogContent>
        </Dialog>
        <Dialog open={openDeleteDialog} onClose={() => !isDeleting && setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 1, pt: 3 }}>
            <Box sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)', p: 1.5, borderRadius: '50%', mb: 2 }}>
              <IconTrash size={32} color="#e74c3c" />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Delete Attribute</Typography>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
            <Typography variant="body1">Are you sure you want to delete <strong>{attributeToDelete?.name}</strong>?</Typography>
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
        <Dialog open={openValueDeleteDialog} onClose={() => !isValueDeleting && setOpenValueDeleteDialog(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 1, pt: 3 }}>
            <Box sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)', p: 1.5, borderRadius: '50%', mb: 2 }}>
              <IconTrash size={32} color="#e74c3c" />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Delete Value</Typography>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
            <Typography variant="body1">Are you sure you want to delete <strong>{valueToDeleteIndex !== null ? valuesList[valueToDeleteIndex] : ''}</strong>?</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>This will remove the value from this attribute.</Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'center', gap: 2 }}>
            <Button
              onClick={() => setOpenValueDeleteDialog(false)}
              disabled={isValueDeleting}
              variant="outlined"
              sx={{ minWidth: 100, color: 'text.secondary', borderColor: 'rgba(0,0,0,0.1)' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmDeleteValue}
              disabled={isValueDeleting}
              sx={{ minWidth: 100 }}
            >
              {isValueDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Attributes;


