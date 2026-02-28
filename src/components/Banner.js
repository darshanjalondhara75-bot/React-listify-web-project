import React, { useState, useEffect } from 'react';
import { useLayoutDetails } from '../context/LayoutContext';
import { Paper, Button, IconButton, Avatar, Typography, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, FormControl, Select, MenuItem } from '@mui/material';
import { IconPlus, IconEdit, IconTrash, IconX, IconUpload } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import StatusToggle from './StatusToggle';
import PageHeader from './PageHeader';

function Banner() {

  const initialBanners = [
    {
      image: "https://listify.codderlab.com/uploads/banner/1760695225116-6247.jpg",
      url: "https://image.com",
      createdDate: "Oct 17, 2025",
      lastUpdated: "Oct 18, 2025",
      status: true,
    },
    {
      image: "https://listify.codderlab.com/uploads/banner/1760605478192-1026.png",
      url: "",
      createdDate: "Oct 16, 2025",
      lastUpdated: "Oct 16, 2025",
      status: true,
    },
  ];

  const [banners, setBanners] = useState(initialBanners);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [editUrl, setEditUrl] = useState('');
  const [editFile, setEditFile] = useState(null);
  const [createUrl, setCreateUrl] = useState('');
  const [createFile, setCreateFile] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);



  const handleStatusToggle = (index) => {
    const updatedBanners = [...banners];
    updatedBanners[index].status = !updatedBanners[index].status;
    setBanners(updatedBanners);
  };

  const handleEdit = (index) => {
    const banner = banners[index];
    setSelectedBanner(banner);
    setEditUrl(banner.url);
    setEditFile(null);
    setEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedBanner) return;

    const file = editFile;
    const url = editUrl;

    // Size validation for new image (2MB)
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("Image size too large. Please upload an image smaller than 2MB.");
      return;
    }

    const updateBannerData = (imageData) => {
      const updatedBanners = banners.map(b => {
        if (b === selectedBanner) {
          return {
            ...b,
            image: imageData || b.image,
            url: url,
            lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          };
        }
        return b;
      });

      setBanners(updatedBanners);
      toast.success("Banner updated successfully");
      setEditDialogOpen(false);
      setSelectedBanner(null);
      setEditUrl('');
      setEditFile(null);
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateBannerData(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      updateBannerData(null);
    }
  };

  const handleCreate = () => {
    if (!createUrl || !createFile) {
      toast.error("Please provide both a URL and an image.");
      return;
    }

    if (createFile.size > 2 * 1024 * 1024) {
      toast.error("Image size too large. Please upload an image smaller than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newBanner = {
        image: reader.result,
        url: createUrl,
        createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: true,
      };

      const updatedBanners = [...banners, newBanner];
      setBanners(updatedBanners);

      toast.success("New banner created successfully");
      setCreateDialogOpen(false);
      setCreateUrl('');
      setCreateFile(null);
    };
    reader.readAsDataURL(createFile);
  };




  const handleConfirmDelete = async () => {
    if (!bannerToDelete) return;

    setIsDeleting(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const updatedBanners = banners.filter(b => b !== bannerToDelete);
      setBanners(updatedBanners);
      toast.success("Banner deleted successfully");
      setOpenDeleteDialog(false);
      setBannerToDelete(null);
    } catch (err) {
      toast.error("Failed to delete banner");
    } finally {
      setIsDeleting(false);
    }
  };

  useLayoutDetails({ title: "Banners" });

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader title="Banners" subtitle="Manage home screen banners and promotional images" />
        <Box>
          <Button
            variant="contained"
            color="error"
            startIcon={<IconPlus />}
            onClick={() => setCreateDialogOpen(true)}
          >
            Add Banner
          </Button>
        </Box>
      </div>
      <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>

        <div className="overflow-x-auto">
          <Table className="table_table__cB3AL">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>IMAGE / NAME</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>REDIRECT URL</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>CREATED DATE</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>LAST UPDATED</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>STATUS</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {banners.map((banner, index) => (
                <TableRow
                  key={index}
                  sx={{
                    opacity: banner.status ? 1 : 0.6,
                    filter: banner.status ? 'none' : 'grayscale(0.5)',
                    transition: 'opacity 0.3s ease, filter 0.3s ease',
                    backgroundColor: banner.status ? 'inherit' : '#fcfcfc'
                  }}
                >
                  <TableCell>
                    <Avatar variant="rounded" src={banner.image} alt="Banner" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      <a href={banner.url} target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                        {banner.url || '-'}
                      </a>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{banner.createdDate}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{banner.lastUpdated}</Typography>
                  </TableCell>
                  <TableCell>
                    <StatusToggle
                      currentStatus={banner.status}
                      onToggle={async (newStatus) => {
                        await new Promise(resolve => setTimeout(resolve, 500));
                        handleStatusToggle(index);
                      }}
                      activeStatus="active"
                      inactiveStatus="inactive"
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                      <IconButton
                        onClick={() => handleEdit(index)}
                        aria-label="Edit Banner"
                        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                      >
                        <IconEdit size={18} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setBannerToDelete(banner);
                          setOpenDeleteDialog(true);
                        }}
                        aria-label="Delete Banner"
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
      </Paper>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Typography variant="h5">
            Edit Banner
          </Typography>
          <IconButton
            onClick={() => setEditDialogOpen(false)}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <IconX />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Redirect URL"
              placeholder="https://example.com"
              value={editUrl}
              onChange={(e) => setEditUrl(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <input
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                id="upload-button-file"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => setEditFile(e.target.files[0])}
              />
              <label htmlFor="upload-button-file">
                <Button
                  variant="outlined"
                  color="error"
                  component="span"
                  startIcon={<IconUpload />}
                  fullWidth
                >
                  Change Image
                </Button>
              </label>
              <Typography variant="caption" sx={{ display: 'block' }}>
                Accepted formats: JPEG (JPG), PNG, GIF, WebP
              </Typography>

              <Box sx={{ mt: 0 }}>
                <img
                  alt="Banner preview"
                  src={editFile ? URL.createObjectURL(editFile) : selectedBanner?.image}
                  style={{
                    maxWidth: '100%',
                    objectFit: 'contain',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px'
                  }}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="tonal" color="error" onClick={() => setEditDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h5">
            Create New Banner
          </Typography>
          <IconButton
            onClick={() => setCreateDialogOpen(false)}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <IconX />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Redirect URL"
              placeholder="https://example.com"
              value={createUrl}
              onChange={(e) => setCreateUrl(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <input
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                id="upload-button-file-create"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => setCreateFile(e.target.files[0])}
              />
              <label htmlFor="upload-button-file-create">
                <Button
                  variant="outlined"
                  color="error"
                  component="span"
                  startIcon={<IconUpload />}
                  fullWidth
                >
                  Upload Image
                </Button>
              </label>
              <Typography variant="caption" sx={{ display: 'block' }}>
                Accepted formats: JPEG (JPG), PNG, GIF, WebP
              </Typography>

              {createFile && (
                <Box sx={{ mt: 0 }}>
                  <img
                    alt="Banner preview"
                    src={URL.createObjectURL(createFile)}
                    style={{
                      maxWidth: '100%',
                      objectFit: 'contain',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px'
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="tonal" color="error" onClick={() => setCreateDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={() => !isDeleting && setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 1, pt: 3 }}>
          <Box sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)', p: 1.5, borderRadius: '50%', mb: 2 }}>
            <IconTrash size={32} color="#e74c3c" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Delete Banner</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
          <Typography variant="body1">Are you sure you want to delete this banner?</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>This action cannot be undone for this session.</Typography>
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

export default Banner;

