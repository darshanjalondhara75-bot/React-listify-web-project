import React, { useState, useEffect } from 'react';
import { useLayoutDetails } from '../context/LayoutContext';
import PageHeader from './PageHeader';
import { Paper, Select, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Pagination, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Autocomplete, Typography, FormControl, InputLabel, OutlinedInput, FormHelperText, Snackbar, Alert } from '@mui/material';
import { IconPlus, IconEdit, IconTrash, IconChevronRight, IconChevronDown, IconChevronUp, IconX, IconUpload, IconLoader2 } from '@tabler/icons-react';
import StatusToggle from './StatusToggle';
import { toast } from 'react-toastify';


const initialCategories = [
  {
    _id: '1',
    name: 'Consoles and Video games',
    slug: 'consoles-and-video-games',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 1:05:04 PM',
    updated: '11/20/2025, 10:25:24 AM',
    image: 'https://listify.codderlab.com/uploads/category/1760600104404-9596.png',
    hasSub: false,
    level: 0,
    parent: null
  },
  {
    _id: '2',
    name: 'Sports Equipment',
    slug: 'sports-equipment',
    status: true,
    subCategories: 2,
    customFields: 0,
    created: '10/16/2025, 1:04:48 PM',
    updated: '10/16/2025, 1:04:48 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760600088171-8925.png',
    hasSub: true,
    level: 0,
    parent: null
  },
  {
    _id: '3',
    name: 'Cycling',
    slug: 'cycling',
    status: true,
    subCategories: 1,
    customFields: 0,
    created: '10/16/2025, 2:18:29 PM',
    updated: '10/16/2025, 2:18:29 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760604509389-225.webp',
    hasSub: true,
    level: 1,
    parent: 'sports-equipment'
  },
  {
    _id: '4',
    name: '4 wheeler',
    slug: '4-wheeler',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/28/2025, 10:39:06 AM',
    updated: '10/28/2025, 10:39:06 AM',
    image: 'https://listify.codderlab.com/uploads/category/1761628146841-7499.png',
    hasSub: false,
    level: 2,
    parent: 'cycling'
  },
  {
    name: 'Rafting',
    slug: 'rafting',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 2:22:28 PM',
    updated: '10/16/2025, 2:22:28 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760604748871-5954.webp',
    hasSub: false,
    level: 1,
    parent: 'sports-equipment'
  },
  {
    name: 'Pets',
    slug: 'pets',
    status: true,
    subCategories: 2,
    customFields: 0,
    created: '10/16/2025, 1:04:16 PM',
    updated: '10/16/2025, 1:04:16 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760600056666-2161.png',
    hasSub: true,
    level: 0,
    parent: null
  },
  {
    name: 'Dogs',
    slug: 'dogs',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 2:31:08 PM',
    updated: '10/16/2025, 2:31:08 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760605268426-2103.webp',
    hasSub: false,
    level: 1,
    parent: 'pets'
  },
  {
    name: 'Horse',
    slug: 'horse',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '11/24/2025, 10:07:25 AM',
    updated: '11/24/2025, 10:07:25 AM',
    image: 'https://listify.codderlab.com/uploads/category/1763959045482-5219.jpg',
    hasSub: false,
    level: 1,
    parent: 'pets'
  },
  {
    name: 'Computer & Networking',
    slug: 'computer-networking',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 1:03:57 PM',
    updated: '12/17/2025, 9:34:55 AM',
    image: 'https://listify.codderlab.com/uploads/category/1760600037354-1522.png',
    hasSub: false,
    level: 0,
    parent: null
  },
  {
    name: 'Camera & Imaging',
    slug: 'camera-imaging',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 1:03:43 PM',
    updated: '10/16/2025, 1:03:43 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760600023290-288.png',
    hasSub: false,
    level: 0,
    parent: null
  },
  {
    name: 'Musical Instruments',
    slug: 'musical-instruments',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 1:02:40 PM',
    updated: '10/18/2025, 4:54:44 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760599960838-1591.png',
    hasSub: false,
    level: 0,
    parent: null
  },
  {
    name: 'Cosmetic',
    slug: 'cosmetic',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 1:01:18 PM',
    updated: '10/16/2025, 1:01:18 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760599878321-2082.png',
    hasSub: false,
    level: 0,
    parent: null
  },
  {
    name: 'Properties',
    slug: 'properties',
    status: true,
    subCategories: 2,
    customFields: 0,
    created: '10/16/2025, 1:00:53 PM',
    updated: '10/16/2025, 1:00:53 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760599853355-4384.png',
    hasSub: true,
    level: 0,
    parent: null
  },
  {
    name: 'Property For Sale',
    slug: 'property-for-sale',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 2:29:02 PM',
    updated: '10/16/2025, 2:29:02 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760605142411-9003.webp',
    hasSub: false,
    level: 1,
    parent: 'properties'
  },
  {
    name: 'Property For Rent',
    slug: 'property-for-rent',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 2:29:30 PM',
    updated: '10/16/2025, 2:29:30 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760605170758-9647.webp',
    hasSub: false,
    level: 1,
    parent: 'properties'
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    status: true,
    subCategories: 3,
    customFields: 0,
    created: '10/16/2025, 1:00:36 PM',
    updated: '10/16/2025, 1:00:36 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760599836898-5161.png',
    hasSub: true,
    level: 0,
    parent: null
  },
  {
    name: 'Shoes',
    slug: 'shoes',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 2:32:24 PM',
    updated: '10/16/2025, 2:32:24 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760605344536-4963.webp',
    hasSub: false,
    level: 1,
    parent: 'fashion'
  },
  {
    name: 'Clothing',
    slug: 'clothing',
    status: true,
    subCategories: 1,
    customFields: 0,
    created: '10/16/2025, 2:33:33 PM',
    updated: '10/16/2025, 2:33:33 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760605413560-1089.webp',
    hasSub: true,
    level: 1,
    parent: 'fashion'
  },
  {
    name: 'Men - Shirt',
    slug: 'men-shirt',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '11/6/2025, 3:46:56 PM',
    updated: '11/6/2025, 3:46:56 PM',
    image: 'https://listify.codderlab.com/uploads/category/1762424216858-1449.webp',
    hasSub: false,
    level: 2,
    parent: 'clothing'
  },
  {
    name: 'Handbags & Wallets',
    slug: 'handbags-wallets',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/17/2025, 9:47:18 AM',
    updated: '10/17/2025, 9:47:18 AM',
    image: 'https://listify.codderlab.com/uploads/category/1760674638454-9203.webp',
    hasSub: false,
    level: 1,
    parent: 'fashion'
  },
  {
    name: 'Automotive & Vehicles',
    slug: 'automotive-vehicles',
    status: true,
    subCategories: 2,
    customFields: 0,
    created: '10/16/2025, 12:59:55 PM',
    updated: '10/16/2025, 2:23:35 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760599795423-4927.png',
    hasSub: true,
    level: 0,
    parent: null
  },
  {
    name: 'Cars',
    slug: 'cars',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 2:26:21 PM',
    updated: '10/16/2025, 2:26:21 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760604981815-9268.webp',
    hasSub: false,
    level: 1,
    parent: 'automotive-vehicles'
  },
  {
    name: 'Bikes',
    slug: 'bikes',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 2:27:26 PM',
    updated: '10/16/2025, 2:27:26 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760605046145-4538.webp',
    hasSub: false,
    level: 1,
    parent: 'automotive-vehicles'
  },
  {
    name: 'Furniture & Features',
    slug: 'furniture-features',
    status: true,
    subCategories: 1,
    customFields: 0,
    created: '10/16/2025, 12:57:28 PM',
    updated: '10/16/2025, 12:57:28 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760599648349-6839.png',
    hasSub: true,
    level: 0,
    parent: null
  },
  {
    name: 'Curtains & Blinds',
    slug: 'curtains-blinds',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 2:04:12 PM',
    updated: '10/16/2025, 2:04:12 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760603652325-4145.webp',
    hasSub: false,
    level: 1,
    parent: 'furniture-features'
  },
  {
    name: 'Mobile Phone',
    slug: 'mobile-phone',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 12:57:02 PM',
    updated: '10/16/2025, 12:57:02 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760599622907-677.png',
    hasSub: false,
    level: 0,
    parent: null
  },
  {
    name: 'Electronics & Appliances',
    slug: 'electronics-appliances',
    status: true,
    subCategories: 3,
    customFields: 0,
    created: '10/16/2025, 12:52:05 PM',
    updated: '10/16/2025, 12:52:05 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760599325550-6670.png',
    hasSub: true,
    level: 0,
    parent: null
  },
  {
    name: 'Headphones',
    slug: 'headphones',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 2:10:40 PM',
    updated: '10/16/2025, 2:10:40 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760604040340-1589.webp',
    hasSub: false,
    level: 1,
    parent: 'electronics-appliances'
  },
  {
    name: 'Smart Watches',
    slug: 'smart-watches',
    status: true,
    subCategories: 0,
    customFields: 0,
    created: '10/16/2025, 2:12:50 PM',
    updated: '10/16/2025, 2:12:50 PM',
    image: 'https://listify.codderlab.com/uploads/category/1760604170746-6300.webp',
    hasSub: false,
    level: 1,
    parent: 'electronics-appliances'
  }
];

const Categories = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState({});
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('desc');

  const [categories, setCategories] = useState(initialCategories);


  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress to JPEG with 0.7 quality
        };
        img.onerror = (error) => reject(error);
        img.src = event.target.result;
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };





  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [categoryName, setCategoryName] = useState('');
  const [slug, setSlug] = useState('');
  const [parentCategory, setParentCategory] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!categoryName.trim()) {
      tempErrors.name = "Category Name is required";
      isValid = false;
    }

    if (!slug.trim()) {
      tempErrors.slug = "Slug is required";
      isValid = false;
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      tempErrors.slug = "Slug must contain only lowercase letters, numbers, and hyphens";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSlugChange = (e) => {
    setSlug(e.target.value);
    if (errors.slug) {
      setErrors({ ...errors, slug: null });
    }
  };

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
    if (errors.name) {
      setErrors({ ...errors, name: null });
    }
  };



  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const handleStatusChange = async (categoryId, newStatus) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    setCategories(prev => {
      const updatedCategories = prev.map(cat =>
        cat._id === categoryId ? { ...cat, status: !cat.status } : cat
      );
      return updatedCategories;
    });
  };

  const getVisibleCategories = () => {
    const visible = [];

    // Helper function to sort categories based on current sort settings
    const sortCategories = (cats) => {
      return [...cats].sort((a, b) => {
        let aValue = a[sortColumn];
        let bValue = b[sortColumn];
        if (sortColumn === 'subCategories' || sortColumn === 'customFields') {
          aValue = Number(aValue);
          bValue = Number(bValue);
        }
        if (sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    };

    const sortedTopLevel = sortCategories(categories.filter(cat => cat.level === 0));

    const addCategory = (cat, visited = new Set()) => {
      if (visited.has(cat.slug)) return;

      const newVisited = new Set(visited);
      newVisited.add(cat.slug);

      visible.push(cat);
      if (cat.hasSub && expanded[cat.slug]) {
        const children = sortCategories(categories.filter(c => c.parent === cat.slug));
        if (children.length > 0) {
          children.forEach(child => addCategory(child, newVisited));
        } else {
          // Add "No subcategories found" row
          visible.push({
            type: 'no-sub',
            level: cat.level + 1,
            parent: cat.slug
          });
        }
      }
    };
    sortedTopLevel.forEach(cat => addCategory(cat));
    return visible;
  };

  const handleOpenAddDialog = () => setOpenAddDialog(true);

  const handleCloseAddDialog = () => {
    if (isSubmitting) return;
    setOpenAddDialog(false);
    setCategoryName('');
    setSlug('');
    setParentCategory(null);
    setUploadedFile(null);
    setErrors({});
  };

  const generateSlug = () => {
    const generated = categoryName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    setSlug(generated);
    if (errors.slug) {
      setErrors({ ...errors, slug: null });
    }
  };

  const handleCreateCategory = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let imageUrl = 'https://via.placeholder.com/40x40?text=NEW';
      if (uploadedFile) {
        imageUrl = await fileToBase64(uploadedFile);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newCat = {
        _id: Date.now().toString(),
        name: categoryName,
        slug: slug,
        status: true,
        subCategories: 0,
        customFields: 0,
        created: new Date().toLocaleString(),
        updated: new Date().toLocaleString(),
        image: imageUrl,
        hasSub: false,
        level: parentCategory ? (categories.find(c => c.slug === parentCategory)?.level || 0) + 1 : 0,
        parent: parentCategory,
        isTemporary: true
      };

      setCategories(prev => {
        const newCategories = [newCat, ...prev];
        return newCategories;
      });
      toast.success("Category created successfully");
      handleCloseAddDialog();
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenEditDialog = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setSlug(category.slug);
    setParentCategory(category.parent);
    setUploadedFile(null); // Reset file for editing
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingCategory(null);
    setCategoryName('');
    setSlug('');
    setParentCategory(null);
    setUploadedFile(null);
  };

  const handleUpdateCategory = async () => {
    try {
      let imageUrl = editingCategory.image;
      if (uploadedFile) {
        imageUrl = await fileToBase64(uploadedFile);
      }

      setCategories(prev => {
        const updatedCategories = prev.map(cat => {
          // If this is the category we are editing
          if (cat._id === editingCategory._id) {
            return {
              ...cat,
              name: categoryName,
              slug: slug,
              parent: parentCategory,
              image: imageUrl,
              updated: new Date().toLocaleString()
            };
          }
          // If this is a child of the category we are editing (by slug reference)
          if (cat.parent === editingCategory.slug && slug !== editingCategory.slug) {
            return { ...cat, parent: slug };
          }
          return cat;
        });
        return updatedCategories;
      });

      handleCloseEditDialog();
      toast.success("Category updated successfully");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  };

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (!categoryToDelete) return;

    setIsDeleting(true);
    // Simulate API call
    setTimeout(() => {
      setCategories(prev => {
        const remainingCategories = prev.filter(cat => cat._id !== categoryToDelete._id);
        return remainingCategories;
      });
      setIsDeleting(false);
      setOpenDeleteDialog(false);
      setCategoryToDelete(null);
      toast.success('Category deleted successfully');
    }, 1000);
  };

  const visibleCategories = getVisibleCategories();

  const totalPages = Math.ceil(visibleCategories.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const displayedCategories = visibleCategories.slice(startIndex, endIndex);



  useLayoutDetails({ title: "Categories" });

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader
          title="Categories"
          subtitle="Manage platform categories and subcategory structure"
        />
        <Button variant="contained" color="error" startIcon={<IconPlus />} onClick={handleOpenAddDialog}>
          Add Category
        </Button>
      </div>
      <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
          <Table sx={{ minWidth: 1000 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 250, fontWeight: 600, fontSize: '0.875rem' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', select: 'none' }} onClick={() => handleSort('name')}>
                    NAME
                    {sortColumn === 'name' && (
                      sortDirection === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', select: 'none' }} onClick={() => handleSort('slug')}>
                    SLUG
                    {sortColumn === 'slug' && (
                      sortDirection === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', select: 'none' }} onClick={() => handleSort('status')}>
                    STATUS
                    {sortColumn === 'status' && (
                      sortDirection === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', select: 'none', justifyContent: 'center' }} onClick={() => handleSort('subCategories')}>
                    SUB CATEGORIES
                    {sortColumn === 'subCategories' && (
                      sortDirection === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', select: 'none', justifyContent: 'center' }} onClick={() => handleSort('customFields')}>
                    CUSTOM FIELDS
                    {sortColumn === 'customFields' && (
                      sortDirection === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', select: 'none' }} onClick={() => handleSort('created')}>
                    CREATED
                    {sortColumn === 'created' && (
                      sortDirection === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', select: 'none' }} onClick={() => handleSort('updated')}>
                    UPDATED
                    {sortColumn === 'updated' && (
                      sortDirection === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedCategories.map((item, i) => {
                if (item.type === 'no-sub') {
                  return (
                    <TableRow key={`no-sub-${item.parent}`} sx={{ backgroundColor: '#f9f9f9' }}>
                      <TableCell colSpan={8} sx={{ pl: `${item.level * 2}rem !important`, fontStyle: 'italic', color: 'text.disabled' }}>
                        <Box sx={{ py: 1 }}>
                          No subcategories found
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                } else {
                  const category = item;
                  return (
                    <TableRow
                      key={category._id}
                      sx={{
                        opacity: category.status ? 1 : 0.6,
                        filter: category.status ? 'none' : 'grayscale(0.5)',
                        transition: 'opacity 0.3s ease, filter 0.3s ease',
                        backgroundColor: category.status ? 'inherit' : '#fcfcfc'
                      }}
                    >
                      <TableCell sx={{ minHeight: 70, pl: `${category.level * 2}rem !important` }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {category.hasSub ? (
                            <IconButton size="small" onClick={() => setExpanded(prev => ({ ...prev, [category.slug]: !prev[category.slug] }))}>
                              {expanded[category.slug] ? <IconChevronDown /> : <IconChevronRight />}
                            </IconButton>
                          ) : (
                            <div style={{ width: 32 }} />
                          )}
                          <img
                            src={category.image}
                            alt="Category"
                            style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }}
                          />
                          <div style={{ cursor: 'default', whiteSpace: 'nowrap' }}>
                            {category.name}
                            {category.level > 0 && (
                              <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                                (Level {category.level})
                              </Typography>
                            )}
                          </div>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.875rem', backgroundColor: '#fafafa' }}>{category.slug}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <StatusToggle
                          currentStatus={category.status}
                          onToggle={(newStatus) => handleStatusChange(category.slug, newStatus)}
                          activeStatus={true}
                          inactiveStatus={false}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{category.subCategories}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{category.customFields}</TableCell>
                      <TableCell sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{category.created}</TableCell>
                      <TableCell sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{category.updated}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Box display="flex" alignItems="center" gap={1} justifyContent="center">
                          <IconButton
                            onClick={() => handleOpenEditDialog(category)}
                            aria-label="Edit Category"
                            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                          >
                            <IconEdit size={18} />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteCategory(category)}
                            aria-label="Delete Category"
                            sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'error.lighter' } }}
                          >
                            <IconTrash size={18} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}

            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap', gap: 2 }}>
          <div className="flex items-center gap-2">
            <FormControl size="small" className="MuiFormControl-root MuiTextField-root max-sm:is-full sm:is-[70px] mui-1o5v172">
              <Select
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                variant="outlined"
                color="error"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-primary)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-secondary)' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e74c3c', borderWidth: '2px' }
                }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
            <div>Showing {startIndex + 1} to {Math.min(endIndex, visibleCategories.length)} of {visibleCategories.length} entries</div>
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
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
          <Typography variant="h6" fontWeight="600">Add New Category</Typography>
          <IconButton onClick={handleCloseAddDialog} size="small" disabled={isSubmitting}>
            <IconX />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Category Name"
              placeholder="e.g. Smart Electronics"
              value={categoryName}
              onChange={handleCategoryNameChange}
              fullWidth
              variant="outlined"
              color="error"
              error={!!errors.name}
              helperText={errors.name}
              disabled={isSubmitting}
            />

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              <TextField
                label="Slug"
                placeholder="e.g. smart-electronics"
                value={slug}
                onChange={handleSlugChange}
                fullWidth
                variant="outlined"
                color="error"
                error={!!errors.slug}
                helperText={errors.slug || "Lowercase letters, numbers, and hyphens only"}
                disabled={isSubmitting}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={generateSlug}
                disabled={!categoryName.trim() || isSubmitting}
                sx={{ height: 56, minWidth: 100 }}
              >
                Generate
              </Button>
            </Box>

            <Autocomplete
              options={categories.filter(c => c.slug !== slug).map(cat => ({ label: cat.name, value: cat.slug }))}
              value={parentCategory ? { label: categories.find(cat => cat.slug === parentCategory)?.name, value: parentCategory } : null}
              onChange={(e, newValue) => setParentCategory(newValue?.value || null)}
              disabled={isSubmitting}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  color="error"
                  label="Parent Category (Optional)"
                  placeholder="Search parent category"
                />
              )}
              fullWidth
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <input
                accept="image/*"
                id="upload-button-file"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => setUploadedFile(e.target.files[0])}
                disabled={isSubmitting}
              />
              <label htmlFor="upload-button-file">
                <Button
                  variant="outlined"
                  color="error"
                  component="span"
                  startIcon={<IconUpload />}
                  fullWidth
                  disabled={isSubmitting}
                >
                  Upload Category Image
                </Button>
              </label>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                Accepted formats: .jpg, .png, .webp (Max 2MB)
              </Typography>

              {uploadedFile && (
                <Box sx={{ mt: 1, position: 'relative', width: 'fit-content' }}>
                  <img
                    alt="Preview"
                    src={URL.createObjectURL(uploadedFile)}
                    style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8, border: '1px solid #e0e0e0' }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      bgcolor: 'background.paper',
                      boxShadow: 1,
                      '&:hover': { bgcolor: 'error.lighter', color: 'error.main' }
                    }}
                    onClick={() => setUploadedFile(null)}
                    disabled={isSubmitting}
                  >
                    <IconX size={16} />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseAddDialog} variant="outlined" color="inherit" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateCategory}
            variant="contained"
            color="error"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <IconLoader2 className="animate-spin" /> : null}
          >
            {isSubmitting ? 'Creating...' : 'Create Category'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          Edit Category
          <IconButton onClick={handleCloseEditDialog} size="small" color="error">
            <IconX />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Category Name"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              fullWidth
              variant="outlined"
              color="error"
              size="small"
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
            <Box>
              <TextField
                label="Slug"
                placeholder="category-slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                fullWidth
                variant="outlined"
                color="error"
                helperText="Lowercase, numbers, hyphens only"
                size="small"
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
              <Button
                variant="outlined"
                color="error"
                onClick={generateSlug}
                disabled={!categoryName.trim()}
                sx={{ mt: 1.5, alignSelf: 'flex-start' }}
              >
                Generate
              </Button>
            </Box>
            <Autocomplete
              options={categories.map(cat => ({ label: cat.name, value: cat.slug }))}
              value={parentCategory ? { label: categories.find(cat => cat.slug === parentCategory)?.name, value: parentCategory } : null}
              onChange={(e, newValue) => setParentCategory(newValue?.value || null)}
              renderInput={(params) => <TextField {...params} variant="outlined" color="error" label="Parent Category (Optional)" placeholder="Search or pick a parent" size="small" sx={{
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
              }} />}
              fullWidth
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <input
                accept="image/*"
                id="upload-button-file-edit"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => setUploadedFile(e.target.files[0])}
              />
              <label htmlFor="upload-button-file-edit">
                <Button variant="outlined" color="error" component="span" startIcon={<IconUpload />} fullWidth>
                  Upload File
                </Button>
              </label>
              <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                Accepted formats: image/*
              </Typography>
              {(uploadedFile || editingCategory?.image) && (
                <Box sx={{ mt: 0 }}>
                  <img
                    alt="Preview"
                    src={uploadedFile ? URL.createObjectURL(uploadedFile) : editingCategory.image}
                    style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: 4, border: '1px solid #e0e0e0' }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, pt: 2, gap: 1 }}>
          <Button onClick={handleCloseEditDialog} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleUpdateCategory} variant="contained" color="error">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={() => !isDeleting && setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 1, pt: 3 }}>
          <Box sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)', p: 1.5, borderRadius: '50%', mb: 2 }}>
            <IconTrash size={32} color="#e74c3c" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Delete Category</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
          <Typography variant="body1">Are you sure you want to delete <strong>{categoryToDelete?.name}</strong>?</Typography>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Categories;




