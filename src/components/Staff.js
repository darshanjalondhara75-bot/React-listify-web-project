import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Pagination,
  Switch,
  FormControl,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Avatar,
  Chip,
  Divider,
  TextField,
  Autocomplete,
} from '@mui/material';
import { IconEye, IconEdit, IconTrash, IconPencil, IconPlus, IconX, IconUser, IconBriefcase, IconList, IconPlus as IconAdd, IconEdit as IconModify, IconTrash as IconDelete } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { useLayoutDetails } from '../context/LayoutContext';
import PageHeader from './PageHeader';
import StatusToggle from './StatusToggle';

function Staff() {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [editingPasswordStaff, setEditingPasswordStaff] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffPassword, setNewStaffPassword] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('');

  // Delete State
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const roleModules = {
    'Order Manager': [
      { name: 'User', permissions: ['List', 'Create', 'Edit', 'Delete'] },
      { name: 'Verification', permissions: ['List', 'Create', 'Edit', 'Delete'] },
      { name: 'Attributes', permissions: ['List', 'Delete'] },


      { name: 'Ad Video', permissions: ['List', 'Create', 'Edit'] },
    ],
    'Customer Support Executive': [
      { name: 'User', permissions: ['List', 'Create', 'Edit', 'Delete'] },
      { name: 'Verification', permissions: ['List', 'Create', 'Edit', 'Delete'] },
      { name: 'Attributes', permissions: ['List', 'Delete'] },


      { name: 'Ad Video', permissions: ['List', 'Create', 'Edit'] },
    ],
    'Return/Refund Specialist': [
      { name: 'User', permissions: ['List', 'Create', 'Edit', 'Delete'] },
      { name: 'Verification', permissions: ['List', 'Create', 'Edit', 'Delete'] },
      { name: 'Attributes', permissions: ['List', 'Delete'] },


      { name: 'Ad Video', permissions: ['List', 'Create', 'Edit'] },
    ],
    'Store Manager': [
      { name: 'User', permissions: ['List', 'Create', 'Edit', 'Delete'] },
      { name: 'Verification', permissions: ['List', 'Create', 'Edit', 'Delete'] },
      { name: 'Attributes', permissions: ['List', 'Delete'] },


      { name: 'Ad Video', permissions: ['List', 'Create', 'Edit'] },
    ],
  };

  const initialStaff = [
    {
      _id: '1',
      name: 'Rohan Sharma',
      email: 'rohan@listify.com',
      phone: '123456',
      role: 'Order Manager',
      status: true,
    },
    {
      _id: '2',
      name: 'Divya Kapoor',
      email: 'divya@listify.com',
      phone: '123456',
      role: 'Customer Support Executive',
      status: true,
    },
    {
      _id: '3',
      name: 'Ananya Iyer',
      email: 'ananya@listify.com',
      phone: '123456',
      role: 'Return/Refund Specialist',
      status: true,
    },
    {
      _id: '4',
      name: 'Sneha Patel',
      email: 'sneha@listify.com',
      phone: '123456',
      role: 'Store Manager',
      status: true,
    },
  ];

  const [staff, setStaff] = useState(initialStaff);

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusToggle = (id) => {
    setStaff(prev => prev.map(member =>
      member._id === id ? { ...member, status: !member.status } : member
    ));
  };

  const handleSaveEdit = () => {
    setStaff(prev => prev.map(member =>
      member._id === editingStaff._id ? editingStaff : member
    ));
    setEditDialogOpen(false);
    setEditingStaff(null);
    toast.success("Staff updated successfully");
  };

  const handleView = (id) => {
    const member = staff.find(s => s._id === id);
    setSelectedStaff(member);
    setViewDialogOpen(true);
  };

  const handleEdit = (id) => {
    const member = staff.find(s => s._id === id);
    setEditingStaff(member);
    setEditDialogOpen(true);
  };

  const handleEditPassword = (id) => {
    const member = staff.find(s => s._id === id);
    setEditingPasswordStaff(member);
    setPasswordDialogOpen(true);
  };

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success(`Password updated for ${editingPasswordStaff?.name}`);
    setPasswordDialogOpen(false);
    setNewPassword('');
    setConfirmPassword('');
    setEditingPasswordStaff(null);
  };

  const handleDelete = (member) => {
    setStaffToDelete(member);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!staffToDelete) return;

    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStaff(prev => prev.filter(s => s._id !== staffToDelete._id));
      toast.success("Staff member removed temporarily (refresh to restore)");
      setOpenDeleteDialog(false);
      setStaffToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete staff member.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreate = () => {
    if (!newStaffName || !newStaffEmail || !newStaffRole) {
      toast.error("Please fill all fields");
      return;
    }
    const newMember = {
      _id: Date.now().toString(),
      name: newStaffName,
      email: newStaffEmail,
      phone: '123456',
      role: newStaffRole,
      status: true,
      isTemporary: true
    };
    setStaff(prev => [newMember, ...prev]);
    setAddDialogOpen(false);
    setNewStaffName('');
    setNewStaffEmail('');
    setNewStaffPassword('');
    setNewStaffRole('');
    toast.success("Staff created successfully");
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(staff.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const displayedStaff = staff.slice(startIndex, endIndex);

  useLayoutDetails({ title: "Staff" });

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader
          title="Staff"
          subtitle="Manage administrative staff and accounts"
        />
        <Button
          variant="contained"
          color="error"
          startIcon={<IconPlus />}
          className="mui-ir293k"
          onClick={() => setAddDialogOpen(true)}
        >
          Create Staff
        </Button>
      </div>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
          <div className="overflow-x-auto">
            <Table className="table_table__cB3AL">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>NAME</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>EMAIL</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>ROLE</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedStaff.map((member) => (
                  <TableRow
                    key={member._id}
                    sx={{
                      opacity: member.status ? 1 : 0.6,
                      filter: member.status ? 'none' : 'grayscale(0.5)',
                      transition: 'opacity 0.3s ease, filter 0.3s ease',
                      backgroundColor: member.status ? 'inherit' : '#fcfcfc'
                    }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3 MuiBox-root mui-0">
                        <Typography variant="body2">
                          {member.name}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {member.email}
                      </Typography>
                      <Typography variant="body2">
                        {member.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {member.role}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <StatusToggle
                        currentStatus={member.status}
                        onToggle={async (newStatus) => {
                          await new Promise(resolve => setTimeout(resolve, 500));
                          handleStatusToggle(member._id);
                        }}
                        activeStatus="active"
                        inactiveStatus="inactive"
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          onClick={() => handleView(member._id)}
                          aria-label="View Staff"
                          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                        >
                          <IconEye size={18} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleEdit(member._id)}
                          aria-label="Edit Staff Details"
                          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                        >
                          <IconEdit size={18} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleEditPassword(member._id)}
                          aria-label="Edit Staff Password"
                          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                        >
                          <IconPencil size={18} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(member)}
                          aria-label="Delete Staff"
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
                  onChange={handleEntriesPerPageChange}
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
                Showing {startIndex + 1} to {Math.min(endIndex, staff.length)} of {staff.length} entries
              </div>
            </div>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
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

        <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Typography variant="h5">
              {selectedStaff?.role} Permissions
            </Typography>
            <Typography variant="body1" className="mt-2">
              This Staff has access to {roleModules[selectedStaff?.role]?.length || 0} modules with various permission levels.
            </Typography>
            <IconButton
              onClick={() => setViewDialogOpen(false)}
              style={{ position: 'absolute', right: 8, top: 8 }}
            >
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers className="pt-2">
            <Stack>
              {roleModules[selectedStaff?.role]?.map((module, index) => (
                <Paper key={index} elevation={0} className="p-4 border rounded-md mb-3">
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center">
                      <Avatar color="error" skin="light">
                        <IconBriefcase />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">{module.name}</Typography>
                        <Typography variant="caption">Module permissions</Typography>
                      </Box>
                    </Stack>
                    <Chip size="small" variant="outlined" color="error" label={`Total: ${module.permissions.length}`} />
                  </Box>
                  <Divider />
                  <Stack direction="row" spacing={1}>
                    {module.permissions.map((perm) => {
                      let color = 'secondary';
                      if (perm === 'Create') color = 'primary';
                      else if (perm === 'Edit') color = 'warning';
                      else if (perm === 'Delete') color = 'error';
                      let icon;
                      if (perm === 'List') icon = <IconList />;
                      else if (perm === 'Create') icon = <IconAdd />;
                      else if (perm === 'Edit') icon = <IconModify />;
                      else if (perm === 'Delete') icon = <IconDelete />;
                      return (
                        <Chip
                          key={perm}
                          variant="outlined"
                          size="medium"
                          color={color}
                          icon={icon}
                          label={perm}
                        />
                      );
                    })}
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </DialogContent>
          <DialogActions className="pt-6">
            <Button color="error" onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Edit Staff
            </Typography>
            <IconButton
              color="error"
              onClick={() => setEditDialogOpen(false)}
              size="small"
            >
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                color="error"
                label="Staff Name"
                placeholder="Enter staff name"
                value={editingStaff?.name || ''}
                onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
              />
              <TextField
                fullWidth
                variant="outlined"
                color="error"
                label="Staff Email"
                placeholder="Enter staff email"
                value={editingStaff?.email || ''}
                onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })}
              />
              <Autocomplete
                fullWidth
                options={['Order Manager', 'Customer Support Executive', 'Return/Refund Specialist', 'Store Manager']}
                value={editingStaff?.role || ''}
                onChange={(e, newValue) => setEditingStaff({ ...editingStaff, role: newValue })}
                renderInput={(params) => <TextField {...params} variant="outlined" color="error" label="Role" placeholder="Select role" />}
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
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, pt: 2, gap: 1 }}>
            <Button variant="outlined" color="error" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleSaveEdit}>
              Update
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Update Password</Typography>
            <IconButton
              color="error"
              onClick={() => setPasswordDialogOpen(false)}
              size="small"
            >
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                color="error"
                label="New Password"
                placeholder="Enter new password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                fullWidth
                variant="outlined"
                color="error"
                label="Confirm Password"
                placeholder="Enter confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, pt: 2, gap: 1 }}>
            <Button variant="outlined" color="error" onClick={() => setPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleUpdatePassword}>
              Update
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Add New Staff
            </Typography>
            <IconButton
              color="error"
              onClick={() => setAddDialogOpen(false)}
              size="small"
            >
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                color="error"
                label="Staff Name"
                placeholder="Enter staff name"
                value={newStaffName}
                onChange={(e) => setNewStaffName(e.target.value)}
              />
              <TextField
                fullWidth
                variant="outlined"
                color="error"
                label="Staff Email"
                placeholder="Enter staff email"
                value={newStaffEmail}
                onChange={(e) => setNewStaffEmail(e.target.value)}
              />
              <TextField
                fullWidth
                variant="outlined"
                color="error"
                label="Staff Password"
                placeholder="Enter staff password"
                type="password"
                value={newStaffPassword}
                onChange={(e) => setNewStaffPassword(e.target.value)}
              />
              <Autocomplete
                fullWidth
                options={['Order Manager', 'Customer Support Executive', 'Return/Refund Specialist', 'Store Manager']}
                value={newStaffRole}
                onChange={(e, newValue) => setNewStaffRole(newValue)}
                renderInput={(params) => <TextField {...params} variant="outlined" color="error" label="Role" placeholder="Select role" />}
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
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, pt: 2, gap: 1 }}>
            <Button variant="outlined" color="error" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleCreate}>
              Create
            </Button>
          </DialogActions>
        </Dialog>


        {/* Delete Staff Dialog */}
        <Dialog open={openDeleteDialog} onClose={() => !isDeleting && setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 1, pt: 3 }}>
            <Box sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)', p: 1.5, borderRadius: '50%', mb: 2 }}>
              <IconTrash size={32} color="#e74c3c" />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Delete Staff</Typography>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
            <Typography variant="body1">Are you sure you want to remove <strong>{staffToDelete?.name}</strong>?</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>This removal is temporary and will be restored on page refresh.</Typography>
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
      </Box >
    </>
  );
}

export default Staff;

