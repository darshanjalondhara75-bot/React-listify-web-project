import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./User.css";
import { useLayoutDetails } from '../context/LayoutContext';
import PageHeader from './PageHeader';
import { IconUsers, IconGenderFemale, IconGenderMale, IconBuildingStore, IconX, IconBan } from '@tabler/icons-react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Menu, MenuItem, IconButton, FormControl, InputLabel, Select, Typography, Box, Paper, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputAdornment } from '@mui/material';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const initialUsers = [
  {
    _id: "1",
    name: "Thomas",
    email: "thomas@gmail.com",
    avatar: "https://listify.codderlab.com/uploads/user/1763961871514-6243.png",
    follows: 0,
    followings: 2,
    friends: 0,
    number: "698563999",
    isSeller: true,
    ads: 10,
    loginType: "Email",
    time: "11/24/2025, 10:53:03 AM",
    status: "Offline",
    verified: false,
  },
  {
    _id: "3",
    name: "Emily Parker",
    email: "emilyparker@gmail.com",
    avatar: "https://listify.codderlab.com/uploads/user/1762231996733-4975.jpg",
    follows: 0,
    followings: 0,
    friends: 0,
    number: "7896545698",
    isSeller: false,
    ads: 0,
    loginType: "Email",
    time: "11/4/2025, 10:18:01 AM",
    status: "Offline",
    verified: false,
  },
  {
    _id: "4",
    name: "Liam Thompson",
    email: "thompsonliam563@gmail.com",
    avatar: "https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg",
    follows: 1,
    followings: 0,
    friends: 0,
    number: "899888569",
    isSeller: true,
    ads: 12,
    loginType: "Google",
    time: "10/17/2025, 2:58:03 PM",
    status: "Offline",
    verified: true,
  },
  {
    _id: "5",
    name: "David John",
    email: "davidjohn@gmail.com",
    avatar: "https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif",
    follows: 1,
    followings: 0,
    friends: 0,
    number: "+917986541236",
    isSeller: true,
    ads: 6,
    loginType: "Email",
    time: "10/16/2025, 2:14:00 PM",
    status: "Offline",
    verified: true,
  },
];

export default function UserPage() {
  const location = useLocation();
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Check if the saved data contains Robert or has the wrong number of default users
      if (parsed.length !== initialUsers.length || parsed.some(u => u.name === "Robert" || u.name === "Michael Brown")) {
        return initialUsers;
      }
      return parsed.map((u, idx) => ({
        ...u,
        _id: u._id || u.id?.toString() || `migrated-user-${idx}`
      }));
    }
    return initialUsers;
  });

  useEffect(() => {
    localStorage.setItem('users_data', JSON.stringify(users.filter(u => !u.isTemporary)));
  }, [users]);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDateDialog, setOpenDateDialog] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState('All');
  const [verification, setVerification] = useState('All');
  const [userType, setUserType] = useState('All');
  const [action, setAction] = useState('Select Action');
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');
  const [activeSearchTerm, setActiveSearchTerm] = useState(location.state?.searchTerm || '');

  const handleSearchClick = () => {
    setActiveSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (location.state?.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    }
  }, [location.state]);

  const handleEntriesChange = (value) => {
    setEntriesPerPage(parseInt(value));
    setCurrentPage(1); // reset to first page
  };

  const handleMenuOpen = (event, user) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedUser(null);
  };

  const handleAction = (action) => {
    if (selectedUser) {
      if (action === 'Block') {
        setUsers(prev => prev.map(u => u._id === selectedUser._id ? { ...u, status: 'Blocked' } : u));
        toast.success(`User ${selectedUser.name} blocked`);
      } else if (action === 'Delete') {
        setUsers(prev => prev.filter(u => u._id !== selectedUser._id));
        toast.success(`User ${selectedUser.name} deleted`);
      }
    }
    handleMenuClose();
  };

  const filteredUsers = users.filter(user =>
    (status === 'All' || user.status === status) &&
    (verification === 'All' || (verification === 'Verified' ? user.verified : !user.verified)) &&
    (userType === 'All' || (userType === 'Seller' ? user.isSeller : !user.isSeller)) &&
    (activeSearchTerm === '' ||
      user.name.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(activeSearchTerm.toLowerCase())
    )
  );
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  const totalRows = entriesPerPage;

  useLayoutDetails({ title: "User Management" });

  return (
    <>

      <PageHeader
        title="User Management"
        subtitle="Administration panel for managing users and account status"
      />

      {/* TOP CARDS */}
      <div className="stats-grid">
        <div className="stat-card-item">
          <div className="stat-card-body">
            <div className="stat-card-info">
              <p className="stat-label">Total Users</p>
              <h4 className="stat-value">{users.length}</h4>
            </div>
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(40, 199, 111, 0.16)', color: 'rgb(40, 199, 111)' }}>
              <IconUsers size={24} stroke={2} />
            </div>
          </div>
        </div>

        <div className="stat-card-item">
          <div className="stat-card-body">
            <div className="stat-card-info">
              <p className="stat-label">Females</p>
              <h4 className="stat-value">0</h4>
            </div>
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(255, 76, 81, 0.16)', color: 'rgb(255, 76, 81)' }}>
              <IconGenderFemale size={24} stroke={2} />
            </div>
          </div>
        </div>
        <div className="stat-card-item">
          <div className="stat-card-body">
            <div className="stat-card-info">
              <p className="stat-label">Males</p>
              <h4 className="stat-value">0</h4>
            </div>
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(255, 159, 67, 0.16)', color: 'rgb(255, 159, 67)' }}>
              <IconGenderMale size={24} stroke={2} />
            </div>
          </div>
        </div>
        <div className="stat-card-item">
          <div className="stat-card-body">
            <div className="stat-card-info">
              <p className="stat-label">Sellers</p>
              <h4 className="stat-value">{users.filter(u => u.isSeller).length}</h4>
            </div>
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(0, 186, 209, 0.16)', color: 'rgb(0, 186, 209)' }}>
              <IconBuildingStore size={24} stroke={2} />
            </div>
          </div>
        </div>
      </div>
      <Box sx={{ mb: 3 }} />

      {/* FILTERS AND TABLE */}
      <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
          <Box className="filter-selects" sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1.5 }}>
            <FormControl variant="outlined" fullWidth>
              <Select
                size="small"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
                variant="outlined"
                color="error"
                IconComponent={IconChevronDown}
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
                <MenuItem value="All">Select Status</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Offline">Offline</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <Select
                size="small"
                value={action}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'Block') {
                    setUsers(prev => prev.map(u => ({ ...u, status: 'Blocked' })));
                  } else if (val === 'Unblock') {
                    setUsers(prev => prev.map(u => ({ ...u, status: 'Online' })));
                  }
                  setAction(val);
                }}
                variant="outlined"
                color="error"
                IconComponent={IconChevronDown}
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
                <MenuItem value="Select Action">Select Action</MenuItem>
                <MenuItem value="Block">Block</MenuItem>
                <MenuItem value="Unblock">Unblock</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <Select
                size="small"
                value={verification}
                onChange={(e) => setVerification(e.target.value)}
                fullWidth
                variant="outlined"
                color="error"
                IconComponent={IconChevronDown}
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
                <MenuItem value="All">Select Verification</MenuItem>
                <MenuItem value="Verified">Verified</MenuItem>
                <MenuItem value="Not Verified">Not Verified</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <Select
                size="small"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                fullWidth
                variant="outlined"
                color="error"
                IconComponent={IconChevronDown}
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
                <MenuItem value="All">Select User or Seller</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Seller">Seller</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className="filter-controls">
            <div className="entry-select">
            </div>
            <div className="search-section" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', gap: '10px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>
                  Search user by name, email, uniqueID
                </Typography>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <TextField
                    size="small"
                    placeholder="Search User"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    variant="outlined"
                    color="error"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconSearch size={18} style={{ color: 'var(--text-secondary)' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      width: '300px',
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                        '& fieldset': {
                          borderColor: 'var(--border-primary)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'var(--border-secondary)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#e74c3c',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiInputBase-input': {
                        fontSize: '0.875rem',
                        fontFamily: "'Public Sans', sans-serif",
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleSearchClick}
                    sx={{
                      height: '40px', // Matches the default small TextField height roughly
                      textTransform: 'none',
                      fontWeight: 600,
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: 'none',
                        backgroundColor: '#c0392b'
                      }
                    }}
                  >
                    Search
                  </Button>
                </div>
              </Box>
            </div>
          </div>
        </Box>

        {/* USER TABLE */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>USER</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>FOLLOWS</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>FOLLOWINGS</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>FRIENDS</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>NUMBER</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>STATUS</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>LOGIN TYPE</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>REGISTERED TIME</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedUsers.map((u) => (
                <TableRow key={u._id}>
                  <TableCell align="left" sx={{ textAlign: 'left !important', pl: '16px !important', pr: '0 !important', verticalAlign: 'middle', py: 2, display: 'table-cell !important' }}>
                    <Box sx={{ display: 'flex !important', alignItems: 'center !important', justifyContent: 'flex-start !important', gap: 1, width: '100% !important', m: 0, p: 0, textAlign: 'left !important' }}>
                      {u.avatar ? (
                        <img src={u.avatar} alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                      ) : (
                        <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary', flexShrink: 0 }}>
                          <IconUsers size={20} />
                        </Box>
                      )}
                      <Box sx={{ display: 'flex !important', flexDirection: 'column !important', gap: 0, alignItems: 'flex-start !important', minWidth: 0, textAlign: 'left !important', p: 0, m: 0 }}>
                        <Typography variant="body2" className="capitalize" sx={{ color: 'text.primary', lineHeight: 1.1, textAlign: 'left !important', fontSize: '0.925rem', fontWeight: 600, p: 0, m: 0, width: '100% !important' }}>
                          {u.name}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'block !important', lineHeight: 1, textAlign: 'left !important', fontSize: '0.8rem', fontWeight: 400, color: 'text.secondary', p: 0, m: 0, width: '100% !important', mt: '-16px !important' }}>
                          {u.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{u.follows}</TableCell>
                  <TableCell>{u.followings}</TableCell>
                  <TableCell>{u.friends}</TableCell>
                  <TableCell>{u.number}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      {u.status === "Online" ? (
                        <Typography sx={{ fontWeight: 500, fontSize: '0.75rem', px: 1, py: 0.5, borderRadius: 1, bgcolor: 'success.lighter', color: 'success.main', textTransform: 'capitalize' }}>Online</Typography>
                      ) : u.status === "Blocked" ? (
                        <Typography sx={{ fontWeight: 500, fontSize: '0.75rem', px: 1, py: 0.5, borderRadius: 1, bgcolor: 'error.lighter', color: 'error.main', textTransform: 'capitalize' }}>Blocked</Typography>
                      ) : (
                        <Typography sx={{ fontWeight: 500, fontSize: '0.75rem', px: 1, py: 0.5, borderRadius: 1, bgcolor: 'action.hover', color: 'text.secondary', textTransform: 'capitalize' }}>Offline</Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.75rem', px: 1, py: 0.5, borderRadius: 1, bgcolor: 'primary.lighter', color: 'primary.main', textTransform: 'capitalize', display: 'inline-block' }}>{u.loginType}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{u.time}</TableCell>
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
                onChange={(e) => handleEntriesChange(e.target.value)}
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
            <div>Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} entries</div>
          </div>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
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

      <Dialog open={openDateDialog} onClose={() => setOpenDateDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 600, fontSize: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>Select Date Range</Typography>
          <IconButton color="error" onClick={() => setOpenDateDialog(false)}>
            <IconX />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={setStartDate}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    color: 'error',
                    sx: {
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
                    }
                  }
                }}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={setEndDate}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    color: 'error',
                    sx: {
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
                    }
                  }
                }}
              />
            </Box>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => { setStartDate(null); setEndDate(null); }}
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
            Clear
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => setOpenDateDialog(false)}
            sx={{
              fontWeight: 600,
              px: 3
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

