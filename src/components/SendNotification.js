import React, { useState } from 'react';
import { useLayoutDetails } from '../context/LayoutContext';
import {
  Box,
  Typography,
  Button,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Pagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  InputLabel
} from '@mui/material';
import { IconPlus, IconTrash, IconX, IconUpload } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import PageHeader from './PageHeader';

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 2,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 3,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 4,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 5,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 6,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: 'Xbox Series X 1TB',
    title: '💰 New Offer Received!',
    message: '📢 Kavkaz Express offered ₹1500 on your ad "Xbox Series X 1TB"',
    sendTo: 'single'
  },
  {
    id: 7,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 8,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 9,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 10,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 11,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 12,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 13,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: 'Canon EOS R6 Mark',
    title: '💰 New Offer Received!',
    message: '📢 Thomas offered ₹1 on your ad "Canon EOS R6 Mark"',
    sendTo: 'single'
  },
  {
    id: 14,
    user: { name: 'David John', avatar: 'https://placehold.co/100x100?text=Avatar' },
    ad: 'Samsung galaxy s25',
    title: '💰 New Offer Received!',
    message: '📢 Thomas offered ₹22 on your ad "Samsung galaxy s25"',
    sendTo: 'single'
  },
  {
    id: 15,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: 'Xbox Series X 1TB',
    title: '💰 New Offer Received!',
    message: '📢 Thomas offered ₹1 on your ad "Xbox Series X 1TB"',
    sendTo: 'single'
  },
  {
    id: 16,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 17,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 18,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: 'Inflatable Whitewater Raft 6-Person',
    title: '💰 New Offer Received!',
    message: '📢 Thomas offered ₹1 on your ad "Inflatable Whitewater Raft 6-Person"',
    sendTo: 'single'
  },
  {
    id: 19,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: 'TP-Link AC1750 Smart Wi-Fi Routerr',
    title: '💰 New Offer Received!',
    message: '📢 Thomas offered ₹5000 on your ad "TP-Link AC1750 Smart Wi-Fi Routerr"',
    sendTo: 'single'
  },
  {
    id: 20,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 21,
    user: { name: 'Thomas', avatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png' },
    ad: 'Cute Pocket Wallet',
    title: '⚡ New Bid Alert!',
    message: '🎉 Flutter Developer just placed a bid of 💰 1000!',
    sendTo: 'single'
  },
  {
    id: 22,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 23,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 24,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 25,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    title: '💰 New Offer Received!',
    message: '📢 Thomas offered ₹2000 on your ad "Sony WH-1000XM5 Wireless Noise Cancelling Headphones"',
    sendTo: 'single'
  },
  {
    id: 26,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 27,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 28,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: 'Inflatable Whitewater Raft 6-Person',
    title: '💰 New Offer Received!',
    message: '📢 Bill offered ₹5 on your ad "Inflatable Whitewater Raft 6-Person"',
    sendTo: 'single'
  },
  {
    id: 29,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 30,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 31,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 32,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png' },
    ad: 'Samsung galaxy s25',
    title: '💰 New Offer Received!',
    message: '📢 iTechiOSam offered ₹20 on your ad "Samsung galaxy s25"',
    sendTo: 'single'
  },
  {
    id: 33,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png' },
    ad: 'Lamborghini Huracán EVO',
    title: '💰 New Offer Received!',
    message: '📢 Thomas offered ₹5555555555 on your ad "Lamborghini Huracán EVO"',
    sendTo: 'single'
  },
  {
    id: 34,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 35,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 36,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 37,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 38,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 39,
    user: { name: 'Emily Parker', avatar: 'https://listify.codderlab.com/uploads/user/1762231996733-4975.jpg' },
    ad: '-',
    title: '📩 Verification Request Submitted',
    message: 'We\'ve received your verification request ✅ Our team is reviewing it, and you\'ll be notified once it\'s approved 🔍',
    sendTo: 'single'
  },
  {
    id: 40,
    user: { name: 'Robert', avatar: 'https://listify.codderlab.com/uploads/user/1762231996733-4975.jpg' },
    ad: '-',
    title: '📩 Verification Request Submitted',
    message: 'We\'ve received your verification request ✅ Our team is reviewing it, and you\'ll be notified once it\'s approved 🔍',
    sendTo: 'single'
  },
  {
    id: 41,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 42,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 43,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 44,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 45,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: 'Lamborghini Huracán EVO',
    title: '💰 New Offer Received!',
    message: '📢 Ivan offered ₹20000000 on your ad "Lamborghini Huracán EVO"',
    sendTo: 'single'
  },
  {
    id: 46,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: '2019 Lamborghini Aventador',
    title: '⚡ New Bid Alert!',
    message: '🎉 Thomas just placed a bid of 💰 5525555!',
    sendTo: 'single'
  },
  {
    id: 47,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 48,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 49,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 50,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 51,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 52,
    user: { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 53,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: 'Canon EOS R6 Mark',
    title: '💰 New Offer Received!',
    message: '📢 Roger offered ₹1000 on your ad "Canon EOS R6 Mark"',
    sendTo: 'single'
  },
  {
    id: 54,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: 'Yamaha P-45 Digital Piano',
    title: '💰 New Offer Received!',
    message: '📢 Roger offered ₹500 on your ad "Yamaha P-45 Digital Piano"',
    sendTo: 'single'
  },
  {
    id: 55,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 56,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    title: '💰 New Offer Received!',
    message: '📢 David John offered ₹3200 on your ad "Sony WH-1000XM5 Wireless Noise Cancelling Headphones"',
    sendTo: 'single'
  },
  {
    id: 57,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: 'Canon EOS R6 Mark',
    title: '💰 New Offer Received!',
    message: '📢 Thomas offered ₹15000 on your ad "Canon EOS R6 Mark"',
    sendTo: 'single'
  },
  {
    id: 58,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: 'TP-Link AC1750 Smart Wi-Fi Router',
    title: '💰 New Offer Received!',
    message: '📢 Thomas offered ₹12000 on your ad "TP-Link AC1750 Smart Wi-Fi Router"',
    sendTo: 'single'
  },
  {
    id: 59,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: 'Nintendo Switch OLED Model',
    title: '💰 New Offer Received!',
    message: '📢 Test offered ₹55 on your ad "Nintendo Switch OLED Model"',
    sendTo: 'single'
  },
  {
    id: 60,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: 'Xbox Series X 1TB',
    title: '💰 New Offer Received!',
    message: '📢 Test offered ₹60 on your ad "Xbox Series X 1TB"',
    sendTo: 'single'
  },
  {
    id: 61,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    title: '💰 New Offer Received!',
    message: '📢 Thomas offered ₹2000 on your ad "Sony WH-1000XM5 Wireless Noise Cancelling Headphones"',
    sendTo: 'single'
  },
  {
    id: 62,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  },
  {
    id: 63,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    ad: '-',
    title: '🌟 You Have a New Follower! 🤝',
    message: '💌 Someone just joined your circle! Tap to see your new connection ✨',
    sendTo: 'single'
  }
];

const SendNotification = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState(new Set());
  const [open, setOpen] = useState(false);
  const [userTarget, setUserTarget] = useState('all');
  const [selectedAd, setSelectedAd] = useState(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [notifications, setNotifications] = useState(mockNotifications);

  // No longer syncing to localStorage. Changes are temporary and reset on refresh.

  // No longer syncing automatically to allow temporary deletions
  // React.useEffect(() => {
  //   localStorage.setItem('notifications_list', JSON.stringify(notifications));
  // }, [notifications]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const totalEntries = notifications.length;

  // Mock ads for autocomplete
  const mockAds = [
    'Xbox Series X 1TB',
    'Canon EOS R6 Mark',
    'Samsung galaxy s25',
    'TP-Link AC1750 Smart Wi-Fi Router',
    'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    'Lamborghini Huracán EVO',
    'Nintendo Switch OLED Model'
  ];

  const handleDelete = (id) => {
    const notif = notifications.find(n => n.id === id);
    if (notif) {
      setNotificationToDelete(notif);
      setOpenDeleteDialog(true);
    }
  };

  const handleConfirmDelete = () => {
    if (!notificationToDelete) return;

    setIsDeleting(true);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notificationToDelete.id));

      setIsDeleting(false);
      setOpenDeleteDialog(false);
      setNotificationToDelete(null);
      toast.success('Notification deleted successfully');
    }, 500);
  };

  const userOptions = [
    { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg', email: 'thompsonliam563@gmail.com' },
    { name: 'David John', avatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png', email: 'davidjohn@gmail.com' },
    { name: 'Thomas', avatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png', email: 'thomas@gmail.com' },
    { name: 'Robert', avatar: 'https://listify.codderlab.com/uploads/user/1762231996733-4975.jpg', email: 'robert@gmail.com' },
    { name: 'Emily Parker', avatar: 'https://listify.codderlab.com/uploads/user/1762231996733-4975.jpg', email: 'emilyparker@gmail.com' },
  ];

  const [selectedUser, setSelectedUser] = useState(null);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSendNotification = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    if (!title.trim() || !message.trim()) {
      toast.error('Title and message are required');
      return;
    }

    const newNotification = {
      id: Date.now(),
      user: userTarget === 'single' && selectedUser
        ? { name: selectedUser.name, avatar: selectedUser.avatar }
        : { name: 'Admin', avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif' },
      ad: selectedAd || '-',
      title: title.trim(),
      message: message.trim(),
      image: imagePreview,
      sendTo: userTarget === 'single' && selectedUser ? `single (${selectedUser.name})` : userTarget
    };

    setNotifications([newNotification, ...notifications]);

    toast.success("Notification sent successfully");
    setOpen(false);
    // Reset form
    setUserTarget('all');
    setSelectedAd(null);
    setTitle('');
    setMessage('');
    setUploadedFile(null);
    setImagePreview(null);
    setSelectedUser(null);
  };

  const displayedNotifications = notifications.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  useLayoutDetails({ title: "Send Notification" });

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader title="Notifications" subtitle="Manage user notifications and system alert messages" />
        <Button
          variant="contained"
          color="error"
          startIcon={<IconPlus />}
          onClick={handleSendNotification}
          className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedError MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorError  MuiButton-root MuiButton-contained MuiButton-containedError MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorError  max-sm:is-full mui-ir293k"
        >
          Send Notification
        </Button>
      </div>
      <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>

        <div className="overflow-x-auto">
          <Table className="table_table__cB3AL">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>USER</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>AD</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>TITLE</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>MESSAGE</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>SEND TO</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar src={notification.image || notification.user.avatar} alt={notification.user.name} sx={{ width: 40, height: 40 }} />
                      <div className="flex flex-col">
                        <Typography variant="body2">{notification.user.name}</Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{notification.ad}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{notification.title}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                      <Typography variant="body2" align="left" sx={{ textAlign: 'left', wordBreak: 'break-word' }}>
                        {expanded.has(notification.id) ? notification.message : (notification.message.length > 50 ? notification.message.slice(0, 50) + '...' : notification.message)}
                      </Typography>
                      <Button
                        variant="text"
                        color="error"
                        size="small"
                        onClick={() => setExpanded(prev => {
                          const newSet = new Set(prev);
                          if (newSet.has(notification.id)) {
                            newSet.delete(notification.id);
                          } else {
                            newSet.add(notification.id);
                          }
                          return newSet;
                        })}
                        sx={{
                          padding: 0,
                          minWidth: 'auto',
                          mt: 1,
                          textAlign: 'left',
                          alignSelf: 'flex-start',
                          textTransform: 'none',
                          fontWeight: 600
                        }}
                      >
                        {expanded.has(notification.id) ? 'Read Less' : 'Read More'}
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{notification.sendTo}</Typography>
                  </TableCell>
                  <TableCell className="pl-4">
                    <IconButton
                      onClick={() => handleDelete(notification.id)}
                      aria-label="Delete Notification"
                      sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'error.lighter' } }}
                    >
                      <IconTrash size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap', gap: 2 }}>
            <div className="flex items-center gap-2">
              <FormControl size="small" className="MuiFormControl-root MuiTextField-root max-sm:is-full sm:is-[70px] mui-1o5v172">
                <Select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(e.target.value)}
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
              <div>Showing {startEntry} to {endEntry} of {totalEntries} entries</div>
            </div>
            <Pagination
              count={Math.ceil(notifications.length / entriesPerPage)}
              page={currentPage}
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
        </div>
      </Paper>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>Add New Notification</Typography>
          <IconButton onClick={handleClose} size="small" color="error">
            <IconX />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>User Target</InputLabel>
              <Select
                value={userTarget}
                onChange={(e) => setUserTarget(e.target.value)}
                label="User Target"
                color="error"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      '& .MuiMenuItem-root': {
                        fontSize: '0.95rem',
                        padding: '10px 16px'
                      }
                    }
                  }
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active Users</MenuItem>
                <MenuItem value="inactive">Inactive Users</MenuItem>
                <MenuItem value="single">Single User</MenuItem>
              </Select>
            </FormControl>

            {userTarget === 'single' && (
              <Autocomplete
                options={userOptions}
                getOptionLabel={(option) => option.name}
                value={selectedUser}
                onChange={(event, newValue) => setSelectedUser(newValue)}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <Avatar src={option.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                    {option.name} ({option.email})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select User"
                    variant="outlined"
                    color="error"
                    placeholder="Search user..."
                  />
                )}
              />
            )}
            <Autocomplete
              options={mockAds}
              value={selectedAd}
              onChange={(event, newValue) => setSelectedAd(newValue)}
              renderInput={(params) => <TextField {...params} variant="outlined" color="error" label="Ads" placeholder="Select an ad" />}
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
              label="Title"
              placeholder="Enter notification title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              variant="outlined"
              color="error"
            />
            <TextField
              label="Message"
              placeholder="Type your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              variant="outlined"
              color="error"
              multiline
              rows={4}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <input
                type="file"
                accept="image/*"
                id="upload-button-file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setUploadedFile(file);
                      setImagePreview(reader.result); // This is the base64 string
                    };
                    reader.readAsDataURL(file);
                  } else {
                    setUploadedFile(null);
                    setImagePreview(null);
                  }
                }}
              />
              <label htmlFor="upload-button-file" style={{ width: '100%' }}>
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<IconUpload />}
                  fullWidth
                  color="error"
                >
                  Upload File
                </Button>
              </label>
              <Typography variant="caption" sx={{ display: 'block' }}>
                Accepted formats: image/*
              </Typography>
              {imagePreview && (
                <Box sx={{ mt: 0 }}>
                  <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '4px', border: '1px solid #e0e0e0' }} />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleCreate} variant="contained" color="error">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => !isDeleting && setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 1, pt: 3 }}>
          <Box sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)', p: 1.5, borderRadius: '50%', mb: 2 }}>
            <IconTrash size={32} color="#e74c3c" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Delete Notification</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
          <Typography variant="body1">Are you sure you want to delete this notification?</Typography>
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
};

export default SendNotification;


