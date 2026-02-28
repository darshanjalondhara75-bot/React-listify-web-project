import './Dashboard.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, IconButton } from '@mui/material';
import { FaEye, FaBan } from "react-icons/fa";
import ActivityChart from './ActivityChart';
import DateRangePicker from './DateRangePicker';
import PageHeader from './PageHeader';
import { useLayoutDetails } from '../context/LayoutContext';

function Dashboard() {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dateRangeDialogOpen, setDateRangeDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const navigate = useNavigate();

  // State for recent users with ability to remove/block
  const [recentUsers, setRecentUsers] = useState([
    {
      id: 1,
      name: 'Jessie Aaro',
      email: 'jessieaaro@gmail.com',
      method: 'Google',
      date: 'about 4 hours ago',
      avatar: 'https://placehold.co/100x100?text=Avatar',
      status: 'active'
    },
    {
      id: 2,
      name: 'Wear shop',
      email: 'wearshop12@gmail.com',
      method: 'Google',
      date: 'about 4 hours ago',
      avatar: 'https://placehold.co/100x100?text=Avatar',
      status: 'active'
    },
    {
      id: 3,
      name: 'Thomas',
      email: 'thomas@gmail.com',
      method: 'Email',
      date: '25 days ago',
      avatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png',
      status: 'active'
    },
    {
      id: 4,
      name: 'Robert',
      email: 'robert@gmail.com',
      method: 'Email',
      date: 'about 1 month ago',
      avatar: 'https://listify.codderlab.com/uploads/user/1762231996733-4975.jpg',
      status: 'active'
    },
    {
      id: 5,
      name: 'Emily Parker',
      email: 'emilyparker@gmail.com',
      method: 'Email',
      date: 'about 2 months ago',
      avatar: 'https://placehold.co/100x100?text=Avatar',
      status: 'active'
    },
    {
      id: 6,
      name: 'Liam Thompson',
      email: 'thompsonliam563@gmail.com',
      method: 'Google',
      date: '2 months ago',
      avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg',
      status: 'active'
    }
  ]);

  const latestAds = [
    {
      title: 'white plain shirt',
      user: 'Thomas',
      userAvatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png',
      category: 'Men - Shirt',
      price: '$810.00',
      date: 'about 4 hours ago',
      type: 'buy now',
      status: 'live',
      image: 'https://placehold.co/100x100?text=Ad+Image'
    },
    {
      title: 'Aldo Blush-pink luggage Bag For Women',
      user: 'David John',
      userAvatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png',
      category: 'Handbags & Wallets',
      price: '$999.00',
      date: 'about 1 month ago',
      type: 'buy now',
      status: 'live',
      image: 'https://placehold.co/100x100?text=Ad+Image'
    },
    {
      title: '2019 Lamborghini Aventador',
      user: 'David John',
      userAvatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png',
      category: 'Cars',
      price: '$50000.00',
      date: 'about 1 month ago',
      type: 'not for sale',
      status: 'soft rejected',
      image: 'https://placehold.co/100x100?text=Ad+Image'
    },
    {
      title: 'Nice shade Curtain',
      user: 'David John',
      userAvatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png',
      category: 'Curtains & Blinds',
      price: '$5000.00',
      date: 'about 2 months ago',
      type: 'buy now',
      status: 'live',
      image: 'https://placehold.co/100x100?text=Ad+Image'
    },
    {
      title: 'VisionX One — AI-Enhanced Smart Glasses',
      user: 'David John',
      userAvatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png',
      category: 'Smart Gadgets',
      price: '$1000.00',
      date: 'about 2 months ago',
      type: 'not for sale',
      status: 'live',
      image: 'https://placehold.co/100x100?text=Ad+Image'
    }
  ];


  // Handle user removal/block
  const handleRemoveUser = (user) => {
    setSelectedUser(user);
    setConfirmDialogOpen(true);
  };

  const confirmRemoveUser = () => {
    if (selectedUser) {
      setRecentUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === selectedUser.id
            ? { ...user, status: 'blocked' }
            : user
        )
      );
    }
    setConfirmDialogOpen(false);
    setSelectedUser(null);
  };

  const handleViewUser = (user) => {
    navigate('/users', { state: { searchTerm: user.email } });
  };

  const cancelRemoveUser = () => {
    setConfirmDialogOpen(false);
    setSelectedUser(null);
  };

  // Date range picker handlers
  const handleDateRangeOpen = () => {
    setDateRangeDialogOpen(true);
  };

  const handleDateRangeClose = () => {
    setDateRangeDialogOpen(false);
  };

  const handleDateRangeApply = (range) => {
    setDateRange(range);
    console.log('Date range applied:', range);
    // Here you can implement filtering logic based on the selected date range
  };

  const handleDateRangeClear = () => {
    setDateRange({ startDate: null, endDate: null });
    console.log('Date range cleared');
    // Here you can implement logic to clear any active filters
  };

  useLayoutDetails({
    title: "Dashboard",
  });


  // Filter out blocked users from display
  const activeUsers = recentUsers.filter(user => user.status !== 'blocked');

  return (
    <>
      {/* Main Dashboard Content */}
      <div className="flex justify-between items-center">
        <PageHeader
          title="Dashboard"
          subtitle="Overview of platform activity and insights"
        />
        <Button variant="outlined" color="error" onClick={handleDateRangeOpen}>
          Filter By Date
        </Button>
      </div>

      <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-5" style={{ width: '100%' }}>
        {/* Statistics Section */}
        <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-lg-12">
          <div className="MuiBox-root">
            <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root">
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{
                  fontSize: '18px',
                  fontWeight: 500,
                  mb: 0.5,
                  textAlign: 'left',
                  color: 'var(--mainDark)'
                }}>Statistics</Typography>
                <Typography variant="body2" sx={{
                  fontSize: '13px',
                  color: 'var(--secondaryText)',
                  textAlign: 'left'
                }}>Combined view of users, sellers, and ads activity</Typography>
              </Box>
              <div className="MuiCardContent-root flex justify-between flex-wrap gap-4 max-md:pbe-6 max-[1060px]:pbe-[74px] max-[1200px]:pbe-[52px] max-[1320px]:pbe-[74px] max-[1501px]:pbe-[52px] mui-1ivfigu">
                <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-4 mui-1xyjxug">
                  <div
                    className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-md-3 MuiGrid2-grid-lg-2 flex items-center gap-4 cursor-pointer mui-15rav8"
                    onClick={() => navigate('/users')}
                  >
                    <div className="MuiAvatar-root MuiAvatar-rounded MuiAvatar-colorDefault" style={{ backgroundColor: 'rgba(40, 199, 111, 0.16)', color: 'rgb(40, 199, 111)', minWidth: 40, height: 40 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h5 className="MuiTypography-root MuiTypography-h5 mui-x4hp1k">{activeUsers.length}</h5>
                      <p className="MuiTypography-root MuiTypography-body2 text-nowrap mui-nigd51">Total Users</p>
                    </div>
                  </div>
                  <div
                    className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-md-3 MuiGrid2-grid-lg-2 flex items-center gap-4 cursor-pointer mui-15rav8"
                    onClick={() => navigate('/users')}
                  >
                    <div className="MuiAvatar-root MuiAvatar-rounded MuiAvatar-colorDefault" style={{ backgroundColor: 'rgba(255, 76, 81, 0.16)', color: 'rgb(255, 76, 81)', minWidth: 40, height: 40 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                        <path d="M5.7 5.7l12.6 12.6"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h5 className="MuiTypography-root MuiTypography-h5 mui-x4hp1k">{recentUsers.filter(u => u.status === 'blocked').length}</h5>
                      <p className="MuiTypography-root MuiTypography-body2 text-nowrap mui-nigd51">Blocked Users</p>
                    </div>
                  </div>
                  <div
                    className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-md-3 MuiGrid2-grid-lg-2 flex items-center gap-4 cursor-pointer mui-15rav8"
                    onClick={() => navigate('/categories')}
                  >
                    <div className="MuiAvatar-root MuiAvatar-rounded MuiAvatar-colorDefault" style={{ backgroundColor: 'rgba(255, 159, 67, 0.16)', color: 'rgb(255, 159, 67)', minWidth: 40, height: 40 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 4h6v6h-6l0 -6"></path>
                        <path d="M14 4h6v6h-6l0 -6"></path>
                        <path d="M4 14h6v6h-6l0 -6"></path>
                        <path d="M14 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h5 className="MuiTypography-root MuiTypography-h5 mui-x4hp1k">30</h5>
                      <p className="MuiTypography-root MuiTypography-body2 text-nowrap mui-nigd51">Total Categories</p>
                    </div>
                  </div>
                  <div
                    className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-md-3 MuiGrid2-grid-lg-2 flex items-center gap-4 cursor-pointer mui-15rav8"
                    onClick={() => navigate('/verification')}
                  >
                    <div className="MuiAvatar-root MuiAvatar-rounded MuiAvatar-colorDefault" style={{ backgroundColor: 'rgba(40, 199, 111, 0.16)', color: 'rgb(40, 199, 111)', minWidth: 40, height: 40 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 12l5 5l10 -10"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h5 className="MuiTypography-root MuiTypography-h5 mui-x4hp1k">16</h5>
                      <p className="MuiTypography-root MuiTypography-body2 text-nowrap mui-nigd51">Approved Ads</p>
                    </div>
                  </div>
                  <div
                    className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-md-3 MuiGrid2-grid-lg-2 flex items-center gap-4 cursor-pointer mui-15rav8"
                    onClick={() => navigate('/attributes')}
                  >
                    <div className="MuiAvatar-root MuiAvatar-rounded MuiAvatar-colorDefault" style={{ backgroundColor: 'rgba(255, 159, 67, 0.16)', color: 'rgb(255, 159, 67)', minWidth: 40, height: 40 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M13 5h8"></path>
                        <path d="M13 9h5"></path>
                        <path d="M13 15h8"></path>
                        <path d="M13 19h5"></path>
                        <path d="M3 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4"></path>
                        <path d="M3 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h5 className="MuiTypography-root MuiTypography-h5 mui-x4hp1k">30</h5>
                      <p className="MuiTypography-root MuiTypography-body2 text-nowrap mui-nigd51">Attributes</p>
                    </div>
                  </div>
                  <div
                    className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-md-3 MuiGrid2-grid-lg-2 flex items-center gap-4 cursor-pointer mui-15rav8"
                    onClick={() => navigate('/ad-video')}
                  >
                    <div className="MuiAvatar-root MuiAvatar-rounded MuiAvatar-colorDefault" style={{ backgroundColor: 'rgba(128, 131, 144, 0.16)', color: 'rgb(128, 131, 144)', minWidth: 40, height: 40 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="m15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14zM3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h5 className="MuiTypography-root MuiTypography-h5 mui-x4hp1k">10</h5>
                      <p className="MuiTypography-root MuiTypography-body2 text-nowrap mui-nigd51">Ad Videos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Overview Chart */}
        <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-lg-12">
          <div className="MuiBox-root">
            <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root">
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{
                  fontSize: '18px',
                  fontWeight: 500,
                  mb: 0.5,
                  textAlign: 'left',
                  color: 'var(--mainDark)'
                }}>Activity Overview</Typography>
                <Typography variant="body2" sx={{
                  fontSize: '13px',
                  color: 'var(--secondaryText)',
                  textAlign: 'left'
                }}>Combined view of users, sellers, and ads activity</Typography>
              </Box>
              <div className="MuiCardContent-root">
                <div className="MuiBox-root">
                  <div style={{ minHeight: '350px' }}>
                    <ActivityChart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Users and Latest Ads */}
        <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-lg-6">
          <div className="MuiBox-root">
            <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root">
              <div className="MuiCardHeader-root">
                <div className="MuiCardHeader-content">
                  <span className="MuiTypography-root MuiTypography-h5 MuiCardHeader-title">Recent Users</span>
                </div>
              </div>
              <div className="MuiCardContent-root">
                <div className="MuiBox-root">
                  {activeUsers.map((user, index) => (
                    <div key={user.id} className="MuiBox-root user-item-left">
                      <div className="MuiAvatar-root MuiAvatar-rounded">
                        {user.avatar ? (
                          <img alt={user.name} className="MuiAvatar-img" src={user.avatar} />
                        ) : (
                          <div className="avatar-content">{user.name.charAt(0)}</div>
                        )}
                      </div>
                      <div className="username-left-section">
                        <p className="MuiTypography-root MuiTypography-body1 username-text">{user.name}</p>
                      </div>
                      <div className="user-meta-right-section">
                        <p className="MuiTypography-root MuiTypography-body2 user-email">{user.email}</p>
                        <div className={`MuiChip-root MuiChip-tonal MuiChip-sizeSmall ${user.method === 'Google' ? 'MuiChip-colorError MuiChip-tonalError' : 'MuiChip-colorPrimary MuiChip-tonalPrimary'}`}>
                          <span className="MuiChip-label MuiChip-labelSmall">{user.method}</span>
                        </div>
                        <span className="MuiTypography-root MuiTypography-caption user-date">{user.date}</span>
                      </div>
                      <div className="user-actions" style={{ display: 'flex', gap: '8px' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewUser(user)}
                          aria-label="View User"
                          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                        >
                          <FaEye size={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveUser(user)}
                          aria-label="Block User"
                          sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'error.lighter' } }}
                        >
                          <FaBan size={18} />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="MuiCardActions-root MuiCardActions-spacing">

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-lg-6">
          <div className="MuiBox-root">
            <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root">
              <div className="MuiCardHeader-root">
                <div className="MuiCardHeader-content">
                  <span className="MuiTypography-root MuiTypography-h5 MuiCardHeader-title">Latest Ads</span>
                </div>
              </div>
              <div className="MuiCardContent-root">
                <div className="latest-ads-container">
                  {latestAds.map((ad, index) => (
                    <div key={index} className="ad-item">
                      <div className="ad-image-container">
                        <img
                          alt={ad.title}
                          className="ad-image"
                          src={ad.image}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
                          }}
                        />
                      </div>
                      <div className="ad-content">
                        <h6 className="ad-title">{ad.title}</h6>
                        <div className="ad-meta">
                          <div className="ad-seller-info">
                            <img
                              alt={ad.user}
                              className="ad-seller-avatar"
                              src={ad.userAvatar}
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${ad.user}&background=random`;
                              }}
                            />
                            <span className="ad-seller-name">{ad.user}</span>
                          </div>
                          <div className="ad-details">
                            <span className="ad-category">{ad.category}</span>
                            <span className="ad-price">{ad.price}</span>
                            <div className="ad-meta-info">
                              <span className={`ad-status ${ad.status.replace(/\s+/g, '-')}`}>{ad.status}</span>
                              <span className="ad-date">{ad.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="MuiCardActions-root MuiCardActions-spacing">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={cancelRemoveUser}>
        <DialogTitle>Confirm Block User</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.primary">
            Are you sure you want to block {selectedUser?.name}? This action can be reversed later.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelRemoveUser} color="error">
            Cancel
          </Button>
          <Button onClick={confirmRemoveUser} color="error" variant="contained">
            Block User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Date Range Picker Dialog */}
      <DateRangePicker
        open={dateRangeDialogOpen}
        onClose={handleDateRangeClose}
        onApply={handleDateRangeApply}
        onClear={handleDateRangeClear}
      />
    </>
  );
}

export default Dashboard;

