import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router';
import { ThemeContext } from '../App';
import LayoutContext from '../context/LayoutContext';
import './Dashboard.css';
import { Menu, MenuItem, IconButton } from '@mui/material';
import ProfileMenu from './ProfileMenu';
import Sidebar from './Sidebar';
import { isAuthenticated } from '../actions/auth';

function Layout() {
  const auth = isAuthenticated();
  const user = auth && auth.user ? auth.user : null;
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useContext(ThemeContext);
  const { title, filter } = useContext(LayoutContext);
  const [activeNavItem, setActiveNavItem] = useState(() => {
    // Try to get the last active item from localStorage
    const path = localStorage.getItem('activeNavItem') || location.pathname;
    return path === '/' ? '/dashboard' : path;
  });

  // State to track sidebar collapse and hover status
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sidebarCollapsed') === 'true';
  });
  const [isHovered, setIsHovered] = useState(false);

  // Mobile drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Toggle sidebar collapse (Desktop)
  const handleToggleSidebar = () => {
    setIsCollapsed(prev => {
      const newState = !prev;
      localStorage.setItem('sidebarCollapsed', newState);
      return newState;
    });
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  // Update active navigation item and close mobile drawer on navigation
  useEffect(() => {
    const currentPath = location.pathname === '/' ? '/dashboard' : location.pathname;
    setActiveNavItem(currentPath);
    localStorage.setItem('activeNavItem', currentPath);
    setIsMobileOpen(false); // Close mobile drawer when navigating
  }, [location.pathname]);

  // Function to handle navigation item click
  const handleNavItemClick = (path) => {
    setActiveNavItem(path);
    localStorage.setItem('activeNavItem', path);
    navigate(path);
  };

  return (
    <div className={`dashboard-layout ${isCollapsed ? 'sidebar-collapsed' : ''} ${isHovered ? 'sidebar-hovered' : ''}`}>
      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${isMobileOpen ? 'visible' : ''}`}
        style={{ display: isMobileOpen ? 'block' : 'none' }}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Left Sidebar */}
      <aside
        className={`sidebar ${isCollapsed ? 'sidebar-collapsed collapsed' : ''} ${isHovered ? 'hovered' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}
        style={{ width: isCollapsed && !isHovered ? 70 : 260 }}
        onMouseEnter={() => !isMobileOpen && isCollapsed && setIsHovered(true)}
        onMouseLeave={() => !isMobileOpen && isCollapsed && setIsHovered(false)}
      >
        <div className="sidebar-header">
          <div onClick={() => handleNavItemClick('/dashboard')} style={{ cursor: 'pointer', textDecoration: 'none', flexShrink: 0 }}>
            <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img width="34" height="34" alt="logo" src="https://listify.codderlab.com/images/logo/main-logo-outline.png" />
              {(!isCollapsed || isHovered) && <span className="sidebar-logo-text" style={{ fontSize: '22px', fontWeight: 'bold', color: '#10163a', marginLeft: '2px' }}>Listify</span>}
            </div>
          </div>
          {(!isCollapsed || isHovered) && (
            <span role="button" tabIndex="0" onClick={handleToggleSidebar} style={{ display: 'flex', cursor: 'pointer', color: '#000' }} className="sidebar-toggle-btn mui-toggle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isCollapsed ? (
                  <circle cx="12" cy="12" r="9" />
                ) : (
                  <>
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="1" />
                  </>
                )}
              </svg>
            </span>
          )}

          {/* Close button for mobile */}
          <IconButton
            onClick={() => setIsMobileOpen(false)}
            className="mobile-close-btn"
            size="small"
            sx={{
              display: { xs: 'flex', md: 'none' }, // Only show on mobile
              color: '#000'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </IconButton>
        </div>

        <div className="scrollbar-container" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: 0 }}>
          <Sidebar activeNavItem={activeNavItem} handleNavItemClick={handleNavItemClick} />
        </div>
      </aside>


      {/* Main Content */}
      <div className="main-section">
        <div className="top-toolbar">
          <div className="header-left">
            {/* Mobile Hamburger Button */}
            <IconButton
              sx={{ display: { md: 'none' }, marginRight: 1 }}
              onClick={() => setIsMobileOpen(true)}
            >
              <i className="fas fa-bars"></i>
            </IconButton>
          </div>

          {/* Profile - Right Side */}
          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto' }}>
            {filter}
            <div className="header-right">
              <ProfileMenu user={user} />
            </div>
          </div>
        </div>

        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
