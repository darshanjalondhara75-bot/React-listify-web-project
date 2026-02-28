import React, { createContext, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from './actions/auth';
import Default from './components/Default';

// Admin dashboard pages (match sidebar routes in `components/Layout.js`)
import Dashboard from './components/Dashboard';
import UserPage from './components/User';
import VerificationPage from './components/Verification';
import CategoriesPage from './components/Categories';
import AttributesPage from './components/Attributes';



import AdVideo from './components/AdVideo';
import FeatureAdvertisement from './components/FeatureAdvertisement';
import AccessRoles from './components/AccessRoles';
import Staff from './components/Staff';
import Banner from './components/Banner';
import VerificationFields from './components/VerificationFields';
import Nations from './components/Nations';
import States from './components/States';
import Cities from './components/Cities';
import Report from './components/Report';
import ReportReason from './components/ReportReason';
import SendNotification from './components/SendNotification';


import LoginPage from './components/Login';

export const ThemeContext = createContext({
  userRole: null,
});

import { LayoutProvider } from './context/LayoutContext';
import Layout from './components/Layout';

function App() {
  const auth = (() => {
    try {
      return isAuthenticated();
    } catch {
      return {};
    }
  })();
  const user = auth?.user ?? null;

  const contextValue = useMemo(() => {
    const userRole = user?.role ?? 'admin';
    return { userRole };
  }, [user]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <LayoutProvider>
        <BrowserRouter>
          <Toaster />
          <ToastContainer position='top-center' />
          <Routes>
            {/* Login page outside Layout */}
            <Route path='/login' element={<LoginPage />} />

            {/* Routes wrapped in Layout */}
            <Route element={<Layout />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/users' element={<UserPage />} />
              <Route path='/verification' element={<VerificationPage />} />
              <Route path='/categories' element={<CategoriesPage />} />
              <Route path='/attributes' element={<AttributesPage />} />

              <Route path='/ad-video' element={<AdVideo />} />
              <Route path='/feature-advertisement' element={<FeatureAdvertisement />} />
              <Route path='/access-roles' element={<AccessRoles />} />
              <Route path='/staff' element={<Staff />} />
              <Route path='/banners' element={<Banner />} />
              <Route path='/verification-fields' element={<VerificationFields />} />
              <Route path='/nations' element={<Nations />} />
              <Route path='/states' element={<States />} />
              <Route path='/cities' element={<Cities />} />
              <Route path='/report' element={<Report />} />
              <Route path='/report-reason' element={<ReportReason />} />
              <Route path='/send-notification' element={<SendNotification />} />


              <Route path='*' element={<Default />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LayoutProvider>
    </ThemeContext.Provider>
  );
}

export default App;

