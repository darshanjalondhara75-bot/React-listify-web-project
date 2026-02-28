import React, { useState, useEffect } from 'react';
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
  Stack,
  Avatar,
  Chip,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { IconPlus, IconEye, IconEdit, IconTrash, IconX, IconBriefcase, IconList, IconUser, IconShieldStar, IconListDetails, IconClock, IconDirectionArrows, IconVideo, IconPlayCard, IconLibrary, IconLayoutDashboard, IconShieldLock, IconUserCog, IconSlideshow, IconMessageUser, IconLayout, IconWorld, IconMap, IconFlare, IconFileDescription, IconFileTypeDoc, IconBell, IconPencil, IconHeadset, IconSettingsCog } from '@tabler/icons-react/dist/cjs/tabler-icons-react';
const IconAdd = IconPlus;
const IconModify = IconEdit;
const IconDelete = IconTrash;
import { toast } from 'react-toastify';
import { useLayoutDetails } from '../context/LayoutContext';
import PageHeader from './PageHeader';
import StatusToggle from './StatusToggle';

function AccessRoles() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [roles, setRoles] = useState(() => {
    const savedRolesStr = localStorage.getItem('accessRoles');
    const savedRoles = savedRolesStr ? JSON.parse(savedRolesStr) : [];

    const defaults = [
      {
        id: 1,
        name: 'Return/Refund Specialist',
        created: '10/17/2025, 3:27:37 PM',
        updated: '11/20/2025, 10:33:26 AM',
        status: true,
        modules: [
          { name: 'Articles', permissions: ['List', 'Create', 'Edit', 'Delete'] },
          { name: 'Help Center', permissions: ['List', 'Create', 'Edit', 'Delete'] },
          { name: 'Setting', permissions: ['List', 'Create', 'Edit', 'Delete'] },
          { name: 'Profile', permissions: ['List', 'Create', 'Edit', 'Delete'] },
        ],
      },
      {
        id: 2,
        name: 'Customer Support Executive',
        created: '10/17/2025, 3:27:06 PM',
        updated: '10/17/2025, 3:27:06 PM',
        status: true,
        modules: [
          { name: 'Articles', permissions: ['List', 'Create', 'Edit', 'Delete'] },
          { name: 'Help Center', permissions: ['List', 'Create', 'Edit', 'Delete'] },
          { name: 'Setting', permissions: ['List', 'Create', 'Edit', 'Delete'] },
          { name: 'Profile', permissions: ['List', 'Create', 'Edit', 'Delete'] },
        ],
      },
      {
        id: 3,
        name: 'Order Manager',
        created: '10/17/2025, 3:26:40 PM',
        updated: '10/28/2025, 9:58:46 AM',
        status: true,
        modules: [
          { name: 'Articles', permissions: ['List', 'Create', 'Edit', 'Delete'] },
          { name: 'Help Center', permissions: ['List', 'Create', 'Edit', 'Delete'] },
          { name: 'Setting', permissions: ['List', 'Create', 'Edit', 'Delete'] },
          { name: 'Profile', permissions: ['List', 'Create', 'Edit', 'Delete'] },
        ],
      },
      {
        id: 4,
        name: 'Product Manager',
        created: '10/17/2025, 3:26:17 PM',
        updated: '10/17/2025, 3:26:17 PM',
        status: true,
        modules: [
          { name: 'Articles', permissions: ['List', 'Create', 'Edit', 'Delete'] },
          { name: 'Help Center', permissions: ['List', 'Create', 'Edit', 'Delete'] },
          { name: 'Setting', permissions: ['List', 'Create', 'Edit', 'Delete'] },
          { name: 'Profile', permissions: ['List', 'Create', 'Edit', 'Delete'] },
        ],
      },
      {
        id: 5,
        name: 'Store Manager',
        created: '10/17/2025, 3:24:04 PM',
        updated: '10/17/2025, 3:25:44 PM',
        status: true,
        modules: [
          { name: 'Articles', permissions: ['List', 'Create', 'Edit', 'Delete'] },
          { name: 'Help Center', permissions: ['List', 'Create', 'Edit', 'Delete'] },
          { name: 'Setting', permissions: ['List', 'Create', 'Edit', 'Delete'] },
          { name: 'Profile', permissions: ['List', 'Create', 'Edit', 'Delete'] },
        ],
      },
    ];

    // Merge defaults with saved roles (prioritize saved ones for same IDs)
    const combinedRoles = [...defaults];
    savedRoles.forEach(saved => {
      const index = combinedRoles.findIndex(d => d.id === saved.id);
      if (index !== -1) {
        combinedRoles[index] = saved;
      } else {
        combinedRoles.push(saved);
      }
    });

    // Reset session-based soft delete on load and filter out "Darshan" entry
    return combinedRoles
      .filter(r => r.name !== 'Darshan') // Remove Darshan entry
      .map(r => ({ ...r, isDeleted: false }));
  });

  // Save roles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('accessRoles', JSON.stringify(roles.filter(r => !r.isTemporary)));
  }, [roles]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedRoleForEdit, setSelectedRoleForEdit] = useState(null);
  const [roleName, setRoleName] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const initialPermissionsState = {
    customerManagement: {
      all: false,
      modules: {
        User: { all: false, list: false, create: false, edit: false, delete: false },
        Verification: { all: false, list: false, create: false, edit: false, delete: false }
      }
    },
    categoryManagement: {
      all: false,
      modules: {
        Categories: { all: false, list: false, create: false, edit: false, delete: false },
        Attributes: { all: false, list: false, create: false, edit: false, delete: false }
      }
    },
    advertisementManagement: {
      all: false,
      modules: {
        'Ad Video': { all: false, list: false, create: false, edit: false, delete: false }
      }
    },
    packageManagement: {
      all: false,
      modules: {
        'Feature Advertisement': { all: false, list: false, create: false, edit: false, delete: false }
      }
    },
    staffManagement: {
      all: false,
      modules: {
        'Access Roles': { all: false, list: false, create: false, edit: false, delete: false },
        Staff: { all: false, list: false, create: false, edit: false, delete: false }
      }
    },
    homeScreenManagement: {
      all: false,
      modules: {
        Banners: { all: false, list: false, create: false, edit: false, delete: false },
        'Verification Fields': { all: false, list: false, create: false, edit: false, delete: false }
      }
    },
    reports: {
      all: false,
      modules: {
        Report: { all: false, list: false, create: false, edit: false, delete: false },
        'Report Reason': { all: false, list: false, create: false, edit: false, delete: false }
      }
    },
    notifications: {
      all: false,
      modules: {
        'Send Notification': { all: false, list: false, create: false, edit: false, delete: false }
      }
    },
    locationManagement: {
      all: false,
      modules: {
        Nations: { all: false, list: false, create: false, edit: false, delete: false },
        States: { all: false, list: false, create: false, edit: false, delete: false },
        Cities: { all: false, list: false, create: false, edit: false, delete: false }
      }
    }
  };

  const [permissions, setPermissions] = useState(initialPermissionsState);

  // Helper to map UI permissions state to simple module permissions array
  const mapPermissionsToModules = (perms) => {
    const modules = [];
    Object.keys(perms).forEach(sectionKey => {
      const section = perms[sectionKey];
      Object.keys(section.modules).forEach(moduleName => {
        const modulePerms = section.modules[moduleName];
        const activePerms = [];
        if (modulePerms.list) activePerms.push('List');
        if (modulePerms.create) activePerms.push('Create');
        if (modulePerms.edit) activePerms.push('Edit');
        if (modulePerms.delete) activePerms.push('Delete');

        if (activePerms.length > 0) {
          modules.push({
            name: moduleName,
            permissions: activePerms
          });
        }
      });
    });
    return modules;
  };

  // Helper to map module permissions array back to UI permissions state
  const mapModulesToPermissions = (modules) => {
    // Start with a clean slate (all false)
    const newPermissions = JSON.parse(JSON.stringify(initialPermissionsState));

    modules.forEach(module => {
      // Find which section this module belongs to
      Object.keys(newPermissions).forEach(sectionKey => {
        if (newPermissions[sectionKey].modules[module.name]) {
          const modState = newPermissions[sectionKey].modules[module.name];
          module.permissions.forEach(p => {
            if (p === 'List') modState.list = true;
            if (p === 'Create') modState.create = true;
            if (p === 'Edit') modState.edit = true;
            if (p === 'Delete') modState.delete = true;
          });
          // Check if all individual permissions are true to set 'all'
          modState.all = modState.list && modState.create && modState.edit && modState.delete;
        }
      });
    });

    // Update section 'all' if all its modules have 'all' true
    Object.keys(newPermissions).forEach(sectionKey => {
      const section = newPermissions[sectionKey];
      const moduleKeys = Object.keys(section.modules);
      section.all = moduleKeys.every(m => section.modules[m].all);
    });

    return newPermissions;
  };

  const resetPermissions = () => {
    setPermissions(JSON.parse(JSON.stringify(initialPermissionsState)));
    setRoleName('');
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  const handleAddRole = () => {
    resetPermissions();
    setCreateDialogOpen(true);
  };

  const handleStatusToggle = (id) => {
    setRoles(roles.map(r => r.id === id ? { ...r, status: !r.status } : r));
  };

  const handleView = (id) => {
    const role = roles.find(r => r.id === id);
    setSelectedRole(role);
    setViewDialogOpen(true);
  };

  const handleEdit = (id) => {
    const role = roles.find(r => r.id === id);
    setSelectedRoleForEdit(role);
    setRoleName(role.name);
    setPermissions(mapModulesToPermissions(role.modules || []));
    setEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    const role = roles.find(r => r.id === id);
    setRoleToDelete(role);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!roleToDelete) return;
    setIsDeleting(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setRoles(roles.map(r => r.id === roleToDelete.id ? { ...r, isDeleted: true } : r));
    toast.success("Role deleted successfully (Session-based)");
    setOpenDeleteDialog(false);
    setRoleToDelete(null);
    setIsDeleting(false);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSectionAllChange = (section) => (event) => {
    const checked = event.target.checked;
    setPermissions(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        all: checked,
        modules: Object.keys(prev[section].modules).reduce((acc, module) => ({
          ...acc,
          [module]: { all: checked, list: checked, create: checked, edit: checked, delete: checked }
        }), {})
      }
    }));
  };

  const handleModuleAllChange = (section, module) => (event) => {
    const checked = event.target.checked;
    setPermissions(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        modules: {
          ...prev[section].modules,
          [module]: { all: checked, list: checked, create: checked, edit: checked, delete: checked }
        }
      }
    }));
  };

  const handlePermissionChange = (section, module, perm) => (event) => {
    const checked = event.target.checked;
    setPermissions(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        modules: {
          ...prev[section].modules,
          [module]: {
            ...prev[section].modules[module],
            [perm]: checked,
            all: perm === 'all' ? checked : prev[section].modules[module].all && checked
          }
        }
      }
    }));
  };

  const handleUpdateRole = () => {
    if (!roleName.trim()) {
      toast.error("Please enter a role name");
      return;
    }
    if (selectedRoleForEdit) {
      setRoles(roles.map(r => r.id === selectedRoleForEdit.id ? {
        ...r,
        name: roleName,
        updated: new Date().toLocaleString(),
        modules: mapPermissionsToModules(permissions),
        isTemporary: false
      } : r));
      toast.success("Role updated successfully");
      setEditDialogOpen(false);
    }
  };

  const handleCreateRole = () => {
    if (!roleName.trim()) {
      toast.error("Please enter a role name");
      return;
    }
    const newRole = {
      id: roles.length > 0 ? Math.max(...roles.map(r => r.id)) + 1 : 1,
      name: roleName,
      created: new Date().toLocaleString(),
      updated: new Date().toLocaleString(),
      status: true,
      modules: mapPermissionsToModules(permissions),
      isTemporary: true
    };
    setRoles([newRole, ...roles]);
    toast.success("Role created successfully");
    setCreateDialogOpen(false);
  };

  const filteredRoles = roles.filter(r => !r.isDeleted);
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedRoles = filteredRoles.slice(startIndex, endIndex);

  useLayoutDetails({ title: "Access Roles" });

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader
          title="Access Roles"
          subtitle="Manage administrative roles and permissions"
        />
        <Button
          variant="contained"
          color="error"
          startIcon={<IconPlus />}
          onClick={handleAddRole}
          className="mui-ir293k"
        >
          Create New Role
        </Button>
      </div>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>

          <div className="overflow-x-auto">
            <Table className="table_table__cB3AL">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>NAME</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>CREATED</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>UPDATED</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedRoles.map((role) => (
                  <TableRow
                    key={role.id}
                    sx={{
                      opacity: role.status ? 1 : 0.6,
                      filter: role.status ? 'none' : 'grayscale(0.5)',
                      transition: 'opacity 0.3s ease, filter 0.3s ease',
                      backgroundColor: role.status ? 'inherit' : '#fcfcfc'
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2">
                        {role.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {role.created}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {role.updated}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <StatusToggle
                        currentStatus={role.status}
                        onToggle={async (newStatus) => {
                          await new Promise(resolve => setTimeout(resolve, 500));
                          handleStatusToggle(role.id);
                        }}
                        activeStatus="active"
                        inactiveStatus="inactive"
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          onClick={() => handleView(role.id)}
                          aria-label="View Role"
                          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                        >
                          <IconEye size={18} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleEdit(role.id)}
                          aria-label="Edit Role"
                          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                        >
                          <IconEdit size={18} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(role.id)}
                          aria-label="Delete Role"
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
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
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
                Showing {startIndex + 1} to {Math.min(endIndex, filteredRoles.length)} of {filteredRoles.length} entries
              </div>
            </div>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              color="error"
              shape="rounded"
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
        </Paper>

        <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle id="_r_1d_" sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {selectedRole?.name} Permissions
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                This role has access to {selectedRole?.modules?.length || 0} modules with various permission levels.
              </Typography>
            </Box>
            <IconButton
              onClick={() => setViewDialogOpen(false)}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                color: 'text.secondary',
                '&:hover': { color: 'error.main' }
              }}
            >
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: '24px !important', pt: '8px !important' }}>
            <Stack>
              {selectedRole?.modules?.map((module, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '8px',
                    mb: 3
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                    <Stack direction="row" alignItems="center" spacing={3}>
                      <Avatar
                        variant="rounded"
                        sx={{
                          bgcolor: 'primary.lighter',
                          color: 'primary.main',
                          width: 38,
                          height: 38
                        }}
                      >
                        <IconBriefcase size={22} />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {module.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Module permissions
                        </Typography>
                      </Box>
                    </Stack>
                    <Chip
                      size="small"
                      variant="tonal"
                      color="secondary"
                      label={`Total: ${module.permissions.length}`}
                      sx={{ borderRadius: '4px' }}
                    />
                  </Box>
                  <Divider sx={{ mb: 4 }} />
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {module.permissions.map((perm) => {
                      let color = 'secondary';
                      let icon;
                      if (perm === 'List') {
                        color = 'secondary';
                        icon = <IconList size={18} />;
                      } else if (perm === 'Create') {
                        color = 'primary';
                        icon = <IconAdd size={18} />;
                      } else if (perm === 'Edit') {
                        color = 'warning';
                        icon = <IconModify size={18} />;
                      } else if (perm === 'Delete') {
                        color = 'error';
                        icon = <IconDelete size={18} />;
                      }
                      return (
                        <Chip
                          key={perm}
                          variant="outlined"
                          color={color}
                          icon={icon}
                          label={perm}
                          sx={{
                            borderRadius: '8px',
                            '& .MuiChip-label': { px: 2 }
                          }}
                        />
                      );
                    })}
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ pt: 6, pb: 4, px: 6 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setViewDialogOpen(false)}
              sx={{ minWidth: 100 }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>Edit Role</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                This role has access to 3 modules with various permission levels.
              </Typography>
            </Box>
            <IconButton
              onClick={() => setEditDialogOpen(false)}
              style={{ position: 'absolute', right: 8, top: 8 }}
            >
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '70vh' }}>
            <Box className="mb-4">
              <TextField
                label="Role Name"
                fullWidth
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Enter Role Name"
                sx={{ mt: 1.5 }}
              />
            </Box>
            <Divider />
            <Stack>
              {/* CUSTOMER MANAGEMENT */}
              <Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>CUSTOMER MANAGEMENT</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.customerManagement.all}
                        onChange={handleSectionAllChange('customerManagement')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Box sx={{ minWidth: 700 }}>
                    <Paper variant="outlined" className="p-2" sx={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(permissions.customerManagement.modules).map(([module, perms]) => (
                            <TableRow key={module}>
                              <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  {module === 'User' && <IconUser />}
                                  {module === 'Verification' && <IconShieldStar />}
                                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                    <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                  </Box>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Checkbox
                                    color="error"
                                    checked={perms.all}
                                    onChange={handleModuleAllChange('customerManagement', module)}
                                  />
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Checkbox
                                    color="error"
                                    checked={perms.list}
                                    onChange={handlePermissionChange('customerManagement', module, 'list')}
                                  />
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Checkbox
                                    color="error"
                                    checked={perms.create}
                                    onChange={handlePermissionChange('customerManagement', module, 'create')}
                                  />
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Checkbox
                                    color="error"
                                    checked={perms.edit}
                                    onChange={handlePermissionChange('customerManagement', module, 'edit')}
                                  />
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Checkbox
                                    color="error"
                                    checked={perms.delete}
                                    onChange={handlePermissionChange('customerManagement', module, 'delete')}
                                  />
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  </Box>
                </Box>
              </Box>

              {/* Repeat for other sections */}
              {/* CATEGORY MANAGEMENT */}
              <Box className="mt-4">
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>CATEGORY MANAGEMENT</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.categoryManagement.all}
                        onChange={handleSectionAllChange('categoryManagement')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Box sx={{ minWidth: 700 }}>
                    <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(permissions.categoryManagement.modules).map(([module, perms]) => (
                            <TableRow key={module}>
                              <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  {module === 'Categories' && <IconListDetails />}
                                  {module === 'Attributes' && <IconList />}
                                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                    <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                  </Box>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('categoryManagement', module)} />
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('categoryManagement', module, 'list')} />
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('categoryManagement', module, 'create')} />
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('categoryManagement', module, 'edit')} />
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('categoryManagement', module, 'delete')} />
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  </Box>
                </Box>
              </Box>

              {/* ADVERTISEMENT MANAGEMENT */}
              <Box className="mt-4">
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>ADVERTISEMENT MANAGEMENT</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.advertisementManagement.all}
                        onChange={handleSectionAllChange('advertisementManagement')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Box sx={{ minWidth: 700 }}>
                    <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(permissions.advertisementManagement.modules).map(([module, perms]) => (
                            <TableRow key={module}>
                              <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  {module === 'Ads Listing' && <IconListDetails />}
                                  {module === 'Pending Ads' && <IconClock />}
                                  {module === 'Tip' && <IconDirectionArrows />}
                                  {module === 'Ad Video' && <IconVideo />}
                                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                    <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                  </Box>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('advertisementManagement', module)} />
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('advertisementManagement', module, 'list')} />
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('advertisementManagement', module, 'create')} />
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('advertisementManagement', module, 'edit')} />
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('advertisementManagement', module, 'delete')} />
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  </Box>
                </Box>
              </Box>

              {/* PACKAGE MANAGEMENT */}
              <Box className="mt-4">
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>PACKAGE MANAGEMENT</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.packageManagement.all}
                        onChange={handleSectionAllChange('packageManagement')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(permissions.packageManagement.modules).map(([module, perms]) => (
                        <TableRow key={module}>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              {module === 'Subscription Plan' && <IconPlayCard />}
                              {module === 'Purchase History' && <IconLibrary />}
                              {module === 'Feature Advertisement' && <IconLayoutDashboard />}
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', textAlign: 'left' }}>{module}</Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', textAlign: 'left' }}>{module}</Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('packageManagement', module)} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('packageManagement', module, 'list')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('packageManagement', module, 'create')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('packageManagement', module, 'edit')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('packageManagement', module, 'delete')} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Box>

              {/* STAFF MANAGEMENT */}
              <Box className="mt-4">
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>STAFF MANAGEMENT</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.staffManagement.all}
                        onChange={handleSectionAllChange('staffManagement')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(permissions.staffManagement.modules).map(([module, perms]) => (
                        <TableRow key={module}>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              {module === 'Access Roles' && <IconShieldLock />}
                              {module === 'Staff' && <IconUserCog />}
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', textAlign: 'left' }}>{module}</Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', textAlign: 'left' }}>{module}</Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('staffManagement', module)} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('staffManagement', module, 'list')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('staffManagement', module, 'create')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('staffManagement', module, 'edit')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('staffManagement', module, 'delete')} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Box>

              {/* HOME SCREEN MANAGEMENT */}
              <Box className="mt-4">
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>HOME SCREEN MANAGEMENT</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.homeScreenManagement.all}
                        onChange={handleSectionAllChange('homeScreenManagement')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(permissions.homeScreenManagement.modules).map(([module, perms]) => (
                        <TableRow key={module}>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              {module === 'Banners' && <IconSlideshow />}
                              {module === 'Verification Fields' && <IconLayout />}
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', textAlign: 'left' }}>{module}</Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', textAlign: 'left' }}>{module}</Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('homeScreenManagement', module)} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('homeScreenManagement', module, 'list')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('homeScreenManagement', module, 'create')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('homeScreenManagement', module, 'edit')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('homeScreenManagement', module, 'delete')} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Box>

              {/* REPORTS */}
              <Box className="mt-4">
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>REPORTS</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.reports.all}
                        onChange={handleSectionAllChange('reports')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(permissions.reports.modules).map(([module, perms]) => (
                        <TableRow key={module}>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              {module === 'Report' && <IconFileDescription />}
                              {module === 'Report Reason' && <IconFileTypeDoc />}
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', textAlign: 'left' }}>{module}</Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', textAlign: 'left' }}>{module}</Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('reports', module)} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('reports', module, 'list')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('reports', module, 'create')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('reports', module, 'edit')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('reports', module, 'delete')} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Box>

              {/* NOTIFICATIONS */}
              <Box className="mt-4">
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>NOTIFICATIONS</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.notifications.all}
                        onChange={handleSectionAllChange('notifications')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(permissions.notifications.modules).map(([module, perms]) => (
                        <TableRow key={module}>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              {module === 'Send Notification' && <IconBell />}
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', textAlign: 'left' }}>{module}</Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', textAlign: 'left' }}>{module}</Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('notifications', module)} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('notifications', module, 'list')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('notifications', module, 'create')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('notifications', module, 'edit')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('notifications', module, 'delete')} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Box>







              {/* LOCATION MANAGEMENT */}
              <Box className="mt-4">
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>LOCATION MANAGEMENT</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.locationManagement.all}
                        onChange={handleSectionAllChange('locationManagement')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(permissions.locationManagement.modules).map(([module, perms]) => (
                        <TableRow key={module}>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              {module === 'Nations' && <IconWorld />}
                              {module === 'States' && <IconMap />}
                              {module === 'Cities' && <IconFlare />}
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', textAlign: 'left' }}>{module}</Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', textAlign: 'left' }}>{module}</Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('locationManagement', module)} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('locationManagement', module, 'list')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('locationManagement', module, 'create')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('locationManagement', module, 'edit')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('locationManagement', module, 'delete')} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions className="p-3">
            <Button variant="outlined" color="error" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleUpdateRole}>
              Update Role
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>Create Role</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                This role has access to 0 modules with various permission levels.
              </Typography>
            </Box>
            <IconButton
              onClick={() => setCreateDialogOpen(false)}
              style={{ position: 'absolute', right: 8, top: 8 }}
            >
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '70vh' }}>
            <Box className="mb-4">
              <TextField
                label="Role Name"
                fullWidth
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Enter Role Name"
                sx={{ mt: 1.5 }}
              />
            </Box>
            <Divider />
            <Stack>
              {/* CUSTOMER MANAGEMENT */}
              <Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>CUSTOMER MANAGEMENT</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.customerManagement.all}
                        onChange={handleSectionAllChange('customerManagement')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Box sx={{ minWidth: 700 }}>
                    <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(permissions.customerManagement.modules).map(([module, perms]) => (
                            <TableRow key={module}>
                              <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  {module === 'User' && <IconUser />}
                                  {module === 'Verification' && <IconShieldStar />}
                                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                    <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                  </Box>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('customerManagement', module)} /></Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('customerManagement', module, 'list')} /></Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('customerManagement', module, 'create')} /></Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('customerManagement', module, 'edit')} /></Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('customerManagement', module, 'delete')} /></Box>
                              </TableCell >
                            </TableRow >
                          ))
                          }
                        </TableBody >
                      </Table >
                    </Paper >
                  </Box >
                </Box >
              </Box >

              {/* CATEGORY MANAGEMENT */}
              <Box className="mt-4" >
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>CATEGORY MANAGEMENT</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.categoryManagement.all}
                        onChange={handleSectionAllChange('categoryManagement')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Box sx={{ minWidth: 700 }}>
                    <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(permissions.categoryManagement.modules).map(([module, perms]) => (
                            <TableRow key={module}>
                              <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  {module === 'Categories' && <IconListDetails />}
                                  {module === 'Attributes' && <IconList />}
                                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                    <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                  </Box>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('categoryManagement', module)} /></Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('categoryManagement', module, 'list')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('categoryManagement', module, 'create')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('categoryManagement', module, 'edit')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('categoryManagement', module, 'delete')} /></Box>
                              </TableCell >
                            </TableRow >
                          ))
                          }
                        </TableBody >
                      </Table >
                    </Paper >
                  </Box >
                </Box >
              </Box >

              {/* ADVERTISEMENT MANAGEMENT */}
              <Box className="mt-4" >
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>ADVERTISEMENT MANAGEMENT</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.advertisementManagement.all}
                        onChange={handleSectionAllChange('advertisementManagement')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Box sx={{ minWidth: 700 }}>
                    <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(permissions.advertisementManagement.modules).map(([module, perms]) => (
                            <TableRow key={module}>
                              <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  {module === 'Ads Listing' && <IconListDetails />}
                                  {module === 'Pending Ads' && <IconClock />}
                                  {module === 'Tip' && <IconDirectionArrows />}
                                  {module === 'Ad Video' && <IconVideo />}
                                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                    <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                  </Box>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('advertisementManagement', module)} /></Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('advertisementManagement', module, 'list')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('advertisementManagement', module, 'create')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('advertisementManagement', module, 'edit')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('advertisementManagement', module, 'delete')} /></Box>
                              </TableCell >
                            </TableRow >
                          ))}
                        </TableBody >
                      </Table >
                    </Paper >
                  </Box >
                </Box >
              </Box >

              {/* PACKAGE MANAGEMENT */}
              <Box className="mt-4" >
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>PACKAGE MANAGEMENT</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.packageManagement.all}
                        onChange={handleSectionAllChange('packageManagement')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Box sx={{ minWidth: 700 }}>
                    <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(permissions.packageManagement.modules).map(([module, perms]) => (
                            <TableRow key={module}>
                              <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  {module === 'Subscription Plan' && <IconPlayCard />}
                                  {module === 'Purchase History' && <IconLibrary />}
                                  {module === 'Feature Advertisement' && <IconLayoutDashboard />}
                                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                    <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                  </Box>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('packageManagement', module)} /></Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('packageManagement', module, 'list')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('packageManagement', module, 'create')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('packageManagement', module, 'edit')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('packageManagement', module, 'delete')} /></Box>
                              </TableCell >
                            </TableRow >
                          ))}
                        </TableBody >
                      </Table >
                    </Paper >
                  </Box >
                </Box >
              </Box >

              {/* STAFF MANAGEMENT */}
              <Box className="mt-4" >
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>STAFF MANAGEMENT</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.staffManagement.all}
                        onChange={handleSectionAllChange('staffManagement')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Box sx={{ minWidth: 700 }}>
                    <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(permissions.staffManagement.modules).map(([module, perms]) => (
                            <TableRow key={module}>
                              <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  {module === 'Access Roles' && <IconShieldLock />}
                                  {module === 'Staff' && <IconUserCog />}
                                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                    <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                  </Box>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('staffManagement', module)} /></Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('staffManagement', module, 'list')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('staffManagement', module, 'create')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('staffManagement', module, 'edit')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('staffManagement', module, 'delete')} /></Box>
                              </TableCell >
                            </TableRow >
                          ))}
                        </TableBody >
                      </Table >
                    </Paper >
                  </Box >
                </Box >
              </Box >

              {/* HOME SCREEN MANAGEMENT */}
              <Box className="mt-4" >
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>HOME SCREEN MANAGEMENT</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.homeScreenManagement.all}
                        onChange={handleSectionAllChange('homeScreenManagement')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Box sx={{ minWidth: 700 }}>
                    <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(permissions.homeScreenManagement.modules).map(([module, perms]) => (
                            <TableRow key={module}>
                              <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  {module === 'Banners' && <IconSlideshow />}
                                  {module === 'Verification Fields' && <IconLayout />}
                                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                    <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                  </Box>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('homeScreenManagement', module)} /></Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('homeScreenManagement', module, 'list')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('homeScreenManagement', module, 'create')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('homeScreenManagement', module, 'edit')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('homeScreenManagement', module, 'delete')} /></Box>
                              </TableCell >
                            </TableRow >
                          ))}
                        </TableBody >
                      </Table >
                    </Paper >
                  </Box >
                </Box >
              </Box >

              {/* REPORTS */}
              <Box className="mt-4">
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>REPORTS</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.reports.all}
                        onChange={handleSectionAllChange('reports')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Box sx={{ minWidth: 700 }}>
                    <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(permissions.reports.modules).map(([module, perms]) => (
                            <TableRow key={module}>
                              <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  {module === 'Report' && <IconFileDescription />}
                                  {module === 'Report Reason' && <IconFileTypeDoc />}
                                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                    <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                  </Box>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('reports', module)} /></Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('reports', module, 'list')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('reports', module, 'create')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('reports', module, 'edit')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('reports', module, 'delete')} /></Box>
                              </TableCell >
                            </TableRow >
                          ))}
                        </TableBody >
                      </Table >
                    </Paper >
                  </Box >
                </Box >
              </Box >

              {/* NOTIFICATIONS */}
              <Box className="mt-4">
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>NOTIFICATIONS</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.notifications.all}
                        onChange={handleSectionAllChange('notifications')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Box sx={{ minWidth: 700 }}>
                    <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(permissions.notifications.modules).map(([module, perms]) => (
                            <TableRow key={module}>
                              <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  {module === 'Send Notification' && <IconBell />}
                                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                    <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'left' }}>{module}</Typography>
                                  </Box>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('notifications', module)} /></Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('notifications', module, 'list')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('notifications', module, 'create')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('notifications', module, 'edit')} /></Box>
                              </TableCell >
                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('notifications', module, 'delete')} /></Box>
                              </TableCell >
                            </TableRow >
                          ))}
                        </TableBody >
                      </Table >
                    </Paper >
                  </Box >
                </Box >
              </Box >

              {/* LOCATION MANAGEMENT */}
              <Box className="mt-4">
                <Stack direction="row" alignItems="center" justifyContent="space-between" className="mb-2">
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', letterSpacing: '0.2px', textTransform: 'uppercase' }}>LOCATION MANAGEMENT</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="error"
                        size="small"
                        checked={permissions.locationManagement.all}
                        onChange={handleSectionAllChange('locationManagement')}
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Grant all in section</Typography>}
                    labelPlacement="start"
                    sx={{ mr: 0 }}
                  />
                </Stack>
                <Paper variant="outlined" className="p-2">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MODULE</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ALL</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">LIST</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">CREATE</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">EDIT</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">DELETE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(permissions.locationManagement.modules).map(([module, perms]) => (
                        <TableRow key={module}>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              {module === 'Nations' && <IconWorld />}
                              {module === 'States' && <IconMap />}
                              {module === 'Cities' && <IconFlare />}
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, textAlign: 'left' }}>
                                <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: '#444', textAlign: 'left' }}>{module}</Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'block', textAlign: 'left' }}>{module}</Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.all} onChange={handleModuleAllChange('locationManagement', module)} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.list} onChange={handlePermissionChange('locationManagement', module, 'list')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.create} onChange={handlePermissionChange('locationManagement', module, 'create')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.edit} onChange={handlePermissionChange('locationManagement', module, 'edit')} />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox color="error" checked={perms.delete} onChange={handlePermissionChange('locationManagement', module, 'delete')} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Box >
            </Stack >
          </DialogContent >
          <DialogActions className="p-3">
            <Button variant="outlined" color="error" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleCreateRole}>
              Create Role
            </Button>
          </DialogActions>
        </Dialog >
      </Box >
      <Dialog open={openDeleteDialog} onClose={() => !isDeleting && setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 1, pt: 3 }}>
          <Box sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)', p: 1.5, borderRadius: '50%', mb: 2 }}>
            <IconTrash size={32} color="#e74c3c" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Delete Role</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
          <Typography variant="body1">Are you sure you want to delete <strong>{roleToDelete?.name}</strong>?</Typography>
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

export default AccessRoles;

