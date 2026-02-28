import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, IconButton, Button, Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Avatar, FormControl, Select, MenuItem, Pagination, Autocomplete, TextField, Stack, Chip } from '@mui/material';
import { Close as CloseIcon, Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, PlayArrow as PlayArrowIcon, Upload as UploadIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useLayoutDetails } from '../context/LayoutContext';
import PageHeader from './PageHeader';
import { toast } from 'react-toastify';

const initialAdVideos = [
  {
    id: 1,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    status: 'live',
    adDetails: {
      title: 'Xbox Series X 1TB',
      shortDesc: 'Powerful 4K Gaming with Original Accessories',
      price: '$ 1800',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1760784871428-3368.webp'
    },
    video: {
      thumbnail: 'https://placehold.co/600x400?text=Xbox+Series+X',
      url: 'https://vjs.zencdn.net/v/oceans.mp4',
      alt: 'Xbox series 1TB'
    },
    description: 'Microsoft Xbox Series X, 1TB SSD, 4K Gaming Console. Comes with original controller and box.',
    counts: { shares: 0, likes: 0 },
    created: '12/12/2025, 2:39:12 PM'
  },
  {
    id: 2,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    status: 'live',
    adDetails: {
      title: 'Xbox Series X 1TB',
      shortDesc: 'Powerful 4K Gaming with Original Accessories',
      price: '$ 1800',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1760784871428-3368.webp'
    },
    video: {
      thumbnail: 'https://placehold.co/600x400?text=Xbox+Series+X',
      url: 'https://vjs.zencdn.net/v/oceans.mp4',
      alt: 'Xbox series X 1TB '
    },
    description: 'Microsoft Xbox Series X, 1TB SSD, 4K Gaming Console. Comes with original controller and box.',
    counts: { shares: 0, likes: 0 },
    created: '12/12/2025, 2:38:45 PM'
  },
  {
    id: 3,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    status: 'live',
    adDetails: {
      title: 'Nintendo Switch OLED Model',
      shortDesc: 'Portable + Dock Mode Hybrid Console',
      price: '$ 3937.91',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1765533276175-4989.webp'
    },
    video: {
      thumbnail: 'https://placehold.co/600x400?text=Nintendo+Switch',
      url: 'https://vjs.zencdn.net/v/oceans.mp4',
      alt: 'Nintendo switch OLED model '
    },
    description: 'Nintendo Switch OLED (White Joy-Con). Perfect for handheld and TV gaming, includes charging dock.',
    counts: { shares: 0, likes: 0 },
    created: '12/12/2025, 2:35:22 PM'
  },
  {
    id: 4,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    status: 'live',
    adDetails: {
      title: 'Nintendo Switch OLED Model',
      shortDesc: 'Portable + Dock Mode Hybrid Console',
      price: '$ 3937.91',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1765533276175-4989.webp'
    },
    video: {
      thumbnail: 'https://placehold.co/600x400?text=Nintendo+Switch',
      url: 'https://vjs.zencdn.net/v/oceans.mp4',
      alt: 'Nintendo switch OLED model '
    },
    description: 'Nintendo Switch OLED (White Joy-Con). Perfect for handheld and TV gaming, includes charging dock.',
    counts: { shares: 0, likes: 0 },
    created: '12/12/2025, 2:35:04 PM'
  },
  {
    id: 5,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    status: 'live',
    adDetails: {
      title: 'Yamaha P-45 Digital Piano',
      shortDesc: '88-Key Weighted Keyboard for Beginners & Pros',
      price: '$ 4860',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1765514595886-9775.webp'
    },
    video: {
      thumbnail: 'https://placehold.co/600x400?text=Yamaha+Piano',
      url: 'https://vjs.zencdn.net/v/oceans.mp4',
      alt: 'Yamaha piano 🎹'
    },
    description: 'Enjoy a realistic piano experience with this 88-key weighted digital piano. Features touch-sensitive keys, built-in voices, and recording functions. Compact and portable design perfect for home practice, music lessons, and performances. Compatible with headphones for silent practice.',
    counts: { shares: 0, likes: 0 },
    created: '12/12/2025, 2:29:26 PM'
  },
  {
    id: 6,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    status: 'live',
    adDetails: {
      title: 'Yamaha P-45 Digital Piano',
      shortDesc: '88-Key Weighted Keyboard for Beginners & Pros',
      price: '$ 4860',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1765514595886-9775.webp'
    },
    video: {
      thumbnail: 'https://placehold.co/600x400?text=Yamaha+Piano',
      url: 'https://vjs.zencdn.net/v/oceans.mp4',
      alt: 'Yamaha piano 🎹'
    },
    description: 'Enjoy a realistic piano experience with this 88-key weighted digital piano. Features touch-sensitive keys, built-in voices, and recording functions. Compact and portable design perfect for home practice, music lessons, and performances. Compatible with headphones for silent practice.',
    counts: { shares: 0, likes: 0 },
    created: '12/12/2025, 2:28:43 PM'
  },
  {
    id: 7,
    user: { name: 'David John', avatar: 'https://placehold.co/100x100?text=Avatar' },
    status: 'live',
    adDetails: {
      title: 'Lamborghini Huracán EVO',
      shortDesc: 'The Ultimate Expression of Power & Precision',
      price: '$ 5000',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1765532660023-4863.webp'
    },
    video: {
      thumbnail: 'https://placehold.co/600x400?text=Lamborghini',
      url: 'https://vjs.zencdn.net/v/oceans.mp4',
      alt: 'New 2025'
    },
    description: 'The Lamborghini Huracán EVO represents the evolution of the iconic Huracán lineup, blending aerodynamic artistry with heart-pounding performance. Powered by a 5.2L V10 engine delivering 640 HP, this masterpiece accelerates from 0–100 km/h in just 2.9 seconds, offering an unmatched driving experience.',
    counts: { shares: 0, likes: 1 },
    created: '11/12/2025, 5:37:27 PM'
  },
  {
    id: 8,
    user: { name: 'David John', avatar: 'https://placehold.co/100x100?text=Avatar' },
    status: 'live',
    adDetails: {
      title: 'Aldo Blush-pink luggage Bag For Women',
      shortDesc: 'Aldo Purse',
      price: '$ 999',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1762347507435-1486.webp'
    },
    video: {
      thumbnail: 'https://placehold.co/600x400?text=Aldo+Bag',
      url: 'https://vjs.zencdn.net/v/oceans.mp4',
      alt: 'New Arrival - Grogeus Bag'
    },
    description: 'Blush-pink luggage tag and gleaming pyramid charm add playful color to this structured pebble-grain tote, whose vertical stitched panels and gold hardware frame an interior built for all-day living.',
    counts: { shares: 0, likes: 0 },
    created: '11/7/2025, 5:24:34 PM'
  },
  {
    id: 9,
    user: { name: 'David John', avatar: 'https://placehold.co/100x100?text=Avatar' },
    status: 'live',
    adDetails: {
      title: 'Lamborghini Huracán EVO',
      shortDesc: 'The Ultimate Expression of Power & Precision',
      price: '$ 5000',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1765532660023-4863.webp'
    },
    video: {
      thumbnail: 'https://placehold.co/600x400?text=Lamborghini',
      url: 'https://vjs.zencdn.net/v/oceans.mp4',
      alt: 'Sports Car Speed High'
    },
    description: 'The Lamborghini Huracán EVO represents the evolution of the iconic Huracán lineup, blending aerodynamic artistry with heart-pounding performance.',
    counts: { shares: 0, likes: 1 },
    created: '11/5/2025, 6:18:42 PM'
  },
  {
    id: 10,
    user: { name: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    status: 'live',
    adDetails: {
      title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
      shortDesc: 'Industry-leading ANC with 30 hours battery life',
      price: '$ 4000',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1760694082790-4898.webp'
    },
    video: {
      thumbnail: 'https://placehold.co/600x400?text=Sony+Headphones',
      url: 'https://vjs.zencdn.net/v/oceans.mp4',
      alt: 'Sony headphones '
    },
    description: "Experience ultimate silence and clarity with Sony's WH-1000XM5. Featuring adaptive noise cancellation, premium sound tuning, and lightweight comfort.",
    counts: { shares: 0, likes: 1 },
    created: '10/17/2025, 3:13:07 PM'
  }
];

const AdVideo = () => {
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoError, setVideoError] = useState(null);
  const [page, setPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [userFilter, setUserFilter] = useState('ALL');
  const [adFilter, setAdFilter] = useState('ALL');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEditVideo, setSelectedEditVideo] = useState(null);
  const [selectedUploader, setSelectedUploader] = useState(null);
  const [selectedAdForVideo, setSelectedAdForVideo] = useState(null);
  const [caption, setCaption] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [editUploader, setEditUploader] = useState('');
  const [editAd, setEditAd] = useState('');
  const [editCaption, setEditCaption] = useState('');
  const [editVideoFile, setEditVideoFile] = useState(null);
  const [editThumbnailFile, setEditThumbnailFile] = useState(null);
  const [expandedAdDetails, setExpandedAdDetails] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState(null);
  const [autoThumbnailUrl, setAutoThumbnailUrl] = useState(null);

  const generateVideoThumbnail = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      video.src = URL.createObjectURL(file);
      video.muted = true;
      video.playsInline = true;

      video.onloadedmetadata = () => {
        video.currentTime = 0.5; // Seek a bit into the video to avoid black frames
      };

      video.onseeked = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        URL.revokeObjectURL(video.src);
        resolve(dataUrl);
      };

      video.onerror = () => {
        console.error('Thumbnail generation failed');
        resolve('https://placehold.co/600x400?text=No+Thumbnail');
      };
    });
  };

  // Delete State
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // const { token } = isAuthenticated(); // Removed API check



  const [adVideos, setAdVideos] = useState(() => {
    const saved = localStorage.getItem('mockAdVideos');
    let data = saved ? JSON.parse(saved) : initialAdVideos;

    // Migration: Update Liam Thompson's avatar and fix broken video URLs
    const newAvatar = 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg';
    const sampleVideoUrl = 'https://vjs.zencdn.net/v/oceans.mp4';
    let migrated = false;

    const updatedData = data.map(video => {
      let needsUpdate = false;
      const updatedVideo = { ...video };

      if (video.user.name === 'Liam Thompson' && video.user.avatar !== newAvatar) {
        updatedVideo.user = { ...updatedVideo.user, avatar: newAvatar };
        needsUpdate = true;
      }

      // Fix broken placeholder video URLs or legacy sample URLs
      const currentUrl = video.video.url || '';
      if (currentUrl.includes('placehold.co') || currentUrl.includes('mov_bbb.mp4') || currentUrl === 'https://placehold.co/100x100?text=Ad+Video+URL') {
        updatedVideo.video = {
          ...updatedVideo.video,
          url: sampleVideoUrl,
          thumbnail: (video.video.thumbnail && video.video.thumbnail.includes('placehold.co'))
            ? `https://placehold.co/600x400?text=${encodeURIComponent(video.adDetails.title)}`
            : video.video.thumbnail
        };
        needsUpdate = true;
      }


      // Restore ad detail avatars
      const avMapping = {
        'Xbox Series X 1TB': 'https://listify.codderlab.com/uploads/adListing/1760784871428-3368.webp',
        'Nintendo Switch OLED Model': 'https://listify.codderlab.com/uploads/adListing/1765533276175-4989.webp',
        'Yamaha P-45 Digital Piano': 'https://listify.codderlab.com/uploads/adListing/1765514595886-9775.webp',
        'Lamborghini Huracán EVO': 'https://listify.codderlab.com/uploads/adListing/1765532660023-4863.webp',
        'Aldo Blush-pink luggage Bag For Women': 'https://listify.codderlab.com/uploads/adListing/1762347507435-1486.webp',
        'Sony WH-1000XM5 Wireless Noise Cancelling Headphones': 'https://listify.codderlab.com/uploads/adListing/1760694082790-4898.webp'
      };

      if (updatedVideo.adDetails && updatedVideo.adDetails.avatar && updatedVideo.adDetails.avatar.includes('placehold.co')) {
        const title = updatedVideo.adDetails.title;
        if (avMapping[title]) {
          updatedVideo.adDetails = { ...updatedVideo.adDetails, avatar: avMapping[title] };
          needsUpdate = true;
        }
      }
      if (needsUpdate) migrated = true;
      return updatedVideo;
    });

    if (migrated) {
      localStorage.setItem('mockAdVideos', JSON.stringify(updatedData));
    }

    return migrated ? updatedData : data;
  });

  useEffect(() => {
    console.log('AdVideo Component Loaded. Current Video URLs:', adVideos.map(v => v.video.url));
  }, [adVideos]);





  const userOptions = [
    { value: 'ALL', label: 'Select User' },
    { value: 'Liam Thompson', label: 'Liam Thompson', avatar: 'https://listify.codderlab.com/uploads/user/1770978181926-3755.jpg' },
    { value: 'David John', label: 'David John', avatar: 'https://placehold.co/100x100?text=Avatar' },
  ];

  const adOptions = [
    { value: 'ALL', label: 'Select Ad' },
    {
      value: 'Xbox Series X 1TB',
      label: 'Xbox Series X 1TB',
      price: '$ 1800',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1760784871428-3368.webp',
      shortDesc: 'Powerful 4K Gaming with Original Accessories'
    },
    {
      value: 'Nintendo Switch OLED Model',
      label: 'Nintendo Switch OLED Model',
      price: '$ 3937.91',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1765533276175-4989.webp',
      shortDesc: 'Portable + Dock Mode Hybrid Console'
    },
    {
      value: 'Yamaha P-45 Digital Piano',
      label: 'Yamaha P-45 Digital Piano',
      price: '$ 4860',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1765514595886-9775.webp',
      shortDesc: '88-Key Weighted Keyboard for Beginners & Pros'
    },
    {
      value: 'Lamborghini Huracán EVO',
      label: 'Lamborghini Huracán EVO',
      price: '$ 5000',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1765532660023-4863.webp',
      shortDesc: 'The Ultimate Expression of Power & Precision'
    },
    {
      value: 'Aldo Blush-pink luggage Bag For Women',
      label: 'Aldo Blush-pink luggage Bag For Women',
      price: '$ 999',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1762347507435-1486.webp',
      shortDesc: 'Aldo Purse'
    },
    {
      value: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
      label: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
      price: '$ 4000',
      avatar: 'https://listify.codderlab.com/uploads/adListing/1760694082790-4898.webp',
      shortDesc: 'Industry-leading ANC with 30 hours battery life'
    },
  ];

  const handleCreateAdVideo = async () => {
    if (!selectedUploader || !selectedAdForVideo || !caption || !videoFile) {
      toast.error('Please fill in all required fields and upload a video.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Find selected metadata
      const user = userOptions.find(u => u.label === selectedUploader);
      const ad = adOptions.find(a => a.label === selectedAdForVideo);

      const videoUrl = URL.createObjectURL(videoFile);
      const thumbUrl = thumbnailFile ? URL.createObjectURL(thumbnailFile) : (autoThumbnailUrl || videoUrl);

      const newVideo = {
        id: Date.now(),
        user: {
          name: selectedUploader,
          avatar: user?.avatar || 'https://listify.codderlab.com/uploads/user/default-avatar.jpg'
        },
        adDetails: {
          title: selectedAdForVideo,
          shortDesc: ad?.shortDesc || caption.substring(0, 50),
          price: ad?.price || '$ 0.00',
          avatar: ad?.avatar || 'https://listify.codderlab.com/uploads/adListing/default-ad.webp'
        },
        video: {
          thumbnail: thumbUrl,
          url: videoUrl,
          alt: caption
        },
        description: caption,
        counts: { shares: 0, likes: 0 },
        created: new Date().toLocaleString(),
        isTemporary: true
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const updatedVideos = [newVideo, ...adVideos];
      setAdVideos(updatedVideos);
      localStorage.setItem('mockAdVideos', JSON.stringify(updatedVideos.filter(v => !v.isTemporary))); // Manually update localStorage
      toast.success('Ad video created successfully!');

      // Reset filters to show new entry
      setUserFilter('ALL');
      setAdFilter('ALL');
      setPage(0);
      setAddDialogOpen(false);

      // Clear forms
      setSelectedUploader(null);
      setSelectedAdForVideo(null);
      setCaption('');
      setVideoFile(null);
      setThumbnailFile(null);
      setVideoPreviewUrl(null);
      setThumbnailPreviewUrl(null);
      setAutoThumbnailUrl(null);
    } catch (error) {
      console.error('Create failed:', error);
      toast.error('Failed to create ad video.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handlePaginationChange = (event, value) => {
    setPage(value - 1);
  };

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter videos based on selected filters
  const filteredVideos = adVideos.filter(video => {
    const userMatch = userFilter === 'ALL' || video.user.name === userFilter;
    const adMatch = adFilter === 'ALL' || video.adDetails.title === adFilter;
    return userMatch && adMatch;
  });

  // Paginate the filtered videos
  const paginatedVideos = filteredVideos.slice(
    page * entriesPerPage,
    page * entriesPerPage + entriesPerPage
  );

  const handleEditVideoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast.error('Video file size too large. Max 50MB.');
        return;
      }
      setEditVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);

      // Auto-generate thumbnail
      const autoThumb = await generateVideoThumbnail(file);
      setAutoThumbnailUrl(autoThumb);

      if (!editThumbnailFile) {
        setThumbnailPreviewUrl(null); // Show auto thumb if no manual thumb
      }
    }
  };

  const handleEditThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file for the thumbnail.');
        return;
      }
      setEditThumbnailFile(file);
      setThumbnailPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast.error('Video file size too large. Max 50MB.');
        return;
      }
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);

      // Auto-generate thumbnail
      const autoThumb = await generateVideoThumbnail(file);
      setAutoThumbnailUrl(autoThumb);

      // Reset thumbnail if new video is uploaded
      setThumbnailFile(null);
      setThumbnailPreviewUrl(null);
    }
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file for the thumbnail.');
        return;
      }
      setThumbnailFile(file);
      setThumbnailPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleOpenAddDialog = () => {
    setSelectedUploader(null);
    setSelectedAdForVideo(null);
    setCaption('');
    setVideoFile(null);
    setThumbnailFile(null);
    setVideoPreviewUrl(null);
    setThumbnailPreviewUrl(null);
    setAutoThumbnailUrl(null);
    setAddDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!editUploader || !editAd || !editCaption) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Find selected ad metadata
      const adMetadata = adOptions.find(a => a.label === editAd);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const updatedVideos = adVideos.map(video => {
        if (video.id === selectedEditVideo.id) {
          let newVideoUrl = video.video.url;
          let newThumbnailUrl = video.video.thumbnail;

          if (editVideoFile) {
            newVideoUrl = URL.createObjectURL(editVideoFile);
            newThumbnailUrl = editThumbnailFile ? URL.createObjectURL(editThumbnailFile) : (autoThumbnailUrl || newVideoUrl);
          } else if (editThumbnailFile) {
            newThumbnailUrl = URL.createObjectURL(editThumbnailFile);
          }

          return {
            ...video,
            user: { ...video.user, name: editUploader },
            adDetails: {
              ...video.adDetails,
              title: editAd,
              price: adMetadata?.price || video.adDetails.price,
              avatar: adMetadata?.avatar || video.adDetails.avatar,
              shortDesc: adMetadata?.shortDesc || video.adDetails.shortDesc
            },
            video: {
              ...video.video,
              alt: editCaption,
              url: newVideoUrl,
              thumbnail: newThumbnailUrl
            },
            description: editCaption,
            isTemporary: false
          };
        }
        return video;
      });

      setAdVideos(updatedVideos);
      localStorage.setItem('mockAdVideos', JSON.stringify(updatedVideos.filter(v => !v.isTemporary))); // Manually update localStorage
      toast.success('Ad video updated successfully!');
      setEditDialogOpen(false);
      setSelectedEditVideo(null);
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update ad video.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    /* RESTORE ALL ADS IF NEEDED */
    const restoreAllAds = () => {
      setAdVideos(initialAdVideos);
      localStorage.setItem('mockAdVideos', JSON.stringify(initialAdVideos));
    };
    if (!videoToDelete) return;

    setIsDeleting(true);
    try {
      // await deleteAdVideo(videoToDelete.id, token); // Removed API call

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedVideos = adVideos.filter(v => v.id !== videoToDelete.id);
      // DO NOT update localStorage here to keep deletion temporary (restored on refresh)
      // localStorage.setItem('mockAdVideos', JSON.stringify(updatedVideos));

      setAdVideos(updatedVideos);
      toast.success('Ad video deleted temporarily (refresh to restore)!');
      setOpenDeleteDialog(false);
      setVideoToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete ad video.');
    } finally {
      setIsDeleting(false);
    }
  };



  useLayoutDetails({ title: "Ad Videos" });

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader
          title="Ad Videos"
          subtitle="Manage video advertisements and content"
        />
        <Button
          variant="contained"
          color="error"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
          sx={{ borderRadius: 2 }}
        >
          Add Ad Video
        </Button>
      </div>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
          <div className="flex items-center justify-between px-0 py-4">
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <FormControl size="small" sx={{ minWidth: 250 }}>
                <Select
                  value={userFilter}
                  onChange={(e) => {
                    setUserFilter(e.target.value);
                    setPage(0);
                  }}
                  variant="outlined"
                  color="error"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-primary)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-secondary)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e74c3c', borderWidth: '2px' }
                  }}
                >
                  {userOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 250 }}>
                <Select
                  value={adFilter}
                  onChange={(e) => {
                    setAdFilter(e.target.value);
                    setPage(0);
                  }}
                  variant="outlined"
                  color="error"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-primary)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-secondary)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e74c3c', borderWidth: '2px' }
                  }}
                >
                  {adOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>USER</TableCell>
                  <TableCell align="left" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>AD DETAILS</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>VIDEO</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>AD DESCRIPTION</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>COUNTS</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>CREATED</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedVideos.map((video) => (
                  <TableRow
                    key={video.id}
                    hover
                  >
                    <TableCell sx={{ verticalAlign: 'middle', py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, whiteSpace: 'nowrap' }}>
                        <Avatar src={video.user.avatar} alt={video.user.name} sx={{ width: 40, height: 40 }} />
                        <Typography variant="body2">
                          {video.user.name}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="left" sx={{ textAlign: 'left !important', pl: '16px !important', pr: '0 !important', verticalAlign: 'top', py: 2, display: 'table-cell !important' }}>
                      <Box sx={{ display: 'flex !important', alignItems: 'center !important', justifyContent: 'flex-start !important', gap: 1, width: '100% !important', m: 0, p: 0, textAlign: 'left !important' }}>
                        <Avatar
                          src={video.adDetails.avatar}
                          alt={video.adDetails.title}
                          sx={{ width: 65, height: 65, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0, m: 0 }}
                        />
                        <Box sx={{ display: 'flex !important', flexDirection: 'column !important', gap: 0, alignItems: 'flex-start !important', minWidth: 0, textAlign: 'left !important', p: 0, m: 0 }}>
                          <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.1, textAlign: 'left !important', fontSize: '0.875rem', p: 0, m: 0, width: '100% !important' }}>
                            {video.adDetails.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ display: 'block !important', lineHeight: 1, textAlign: 'left !important', fontSize: '0.8rem', fontWeight: 400, p: 0, m: 0, mt: 0, width: '100% !important' }}>
                            {expandedAdDetails[video.id] ? video.adDetails.shortDesc : video.adDetails.shortDesc}
                          </Typography>
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => setExpandedAdDetails(prev => ({ ...prev, [video.id]: !prev[video.id] }))}
                            sx={{
                              p: 0,
                              m: 0,
                              mt: -2, // Even more negative margin
                              minHeight: 'auto !important',
                              minWidth: 'auto !important',
                              width: 'fit-content !important',
                              fontSize: '0.75rem',
                              fontWeight: 'bold',
                              color: '#ff4d4f',
                              textTransform: 'none',
                              textAlign: 'left !important',
                              justifyContent: 'flex-start !important',
                              display: 'flex !important',
                              '&:hover': { background: 'transparent', textDecoration: 'underline' }
                            }}
                          >
                            {expandedAdDetails[video.id] ? 'Read Less' : 'Read More'}
                          </Button>
                          <Typography variant="body2" sx={{ color: 'text.primary', mt: 0, textAlign: 'left !important', fontSize: '0.875rem', p: 0, m: 0, width: '100% !important' }}>
                            {video.adDetails.price}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>


                    <TableCell>
                      <Box
                        sx={{
                          position: 'relative',
                          width: 70,
                          height: 70,
                          cursor: 'pointer',
                          borderRadius: 2,
                          overflow: 'hidden',
                          mx: 'auto',
                          boxShadow: 2,
                          '&:hover': {
                            transform: 'scale(1.05)',
                            transition: 'transform 0.2s ease-in-out'
                          }
                        }}
                        onClick={() => {
                          setSelectedVideo(video);
                          setVideoError(null);
                          setDialogOpen(true);
                        }}
                      >
                        <img
                          src={video.video.thumbnail}
                          alt={video.video.alt}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            transition: 'background-color 0.2s ease-in-out',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.6)'
                            }
                          }}
                        >
                          <PlayArrowIcon sx={{ color: 'white', fontSize: 36 }} />
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell align="left" sx={{ maxWidth: 300 }}>
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="body2" align="left" sx={{ mb: 1, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: expandedDescriptions[video.id] ? 'none' : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textAlign: 'left' }}>
                          {video.description}
                        </Typography>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => setExpandedDescriptions(prev => ({
                            ...prev,
                            [video.id]: !prev[video.id]
                          }))}
                          sx={{ p: 0, minHeight: 'auto', fontSize: '0.75rem', textTransform: 'none', textAlign: 'left', alignSelf: 'flex-start', justifyContent: 'flex-start', display: 'flex', mt: -1 }}
                        >
                          {expandedDescriptions[video.id] ? 'Read Less' : 'Read More'}
                        </Button>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                      <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Typography variant="body2">
                          <strong>Shares:</strong> {video.counts.shares}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Likes:</strong> {video.counts.likes}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                        {video.created}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          onClick={() => {
                            setSelectedEditVideo(video);
                            setEditUploader(video.user.name);
                            setEditAd(video.adDetails.title);
                            setEditCaption(video.video.alt);
                            setEditVideoFile(null);
                            setEditThumbnailFile(null);
                            setVideoPreviewUrl(null);
                            setThumbnailPreviewUrl(null);
                            setEditDialogOpen(true);
                          }}
                          aria-label="Edit Video"
                          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                        >
                          <IconEdit size={18} />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setVideoToDelete(video);
                            setOpenDeleteDialog(true);
                          }}
                          aria-label="Delete Video"
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
          </TableContainer>

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
                Showing {page * entriesPerPage + 1} to {Math.min((page + 1) * entriesPerPage, filteredVideos.length)} of {filteredVideos.length} entries
              </div>
            </div>
            <Pagination
              count={Math.ceil(filteredVideos.length / entriesPerPage)}
              page={page + 1}
              onChange={handlePaginationChange}
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

        {/* Video Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="md"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              borderRadius: 2
            }
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={selectedVideo?.adDetails?.avatar}
                alt={selectedVideo?.adDetails?.title}
                sx={{ width: 50, height: 50 }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {selectedVideo?.adDetails?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedVideo?.adDetails?.shortDesc}
                </Typography>
              </Box>
            </Box>
            <IconButton
              aria-label="close"
              onClick={() => setDialogOpen(false)}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                color: 'grey.500'
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {selectedVideo && (
              <Box>
                <video
                  key={selectedVideo.id + (selectedVideo.video.url)}
                  controls
                  playsInline
                  style={{
                    width: '100%',
                    maxHeight: '70vh',
                    borderRadius: 8,
                    backgroundColor: '#000'
                  }}
                  poster={selectedVideo.video.thumbnail}
                  onError={(e) => {
                    const videoTag = e.target;
                    console.error('Video error details:', {
                      url: selectedVideo.video.url,
                      id: selectedVideo.id,
                      error: videoTag.error ? {
                        code: videoTag.error.code,
                        message: videoTag.error.message
                      } : 'Unknown error',
                      networkState: videoTag.networkState,
                      readyState: videoTag.readyState
                    });
                    setVideoError('Video failed to load. Please check your internet connection or try a different video. (Error Code: ' + (videoTag.error ? videoTag.error.code : 'Unknown') + ')');
                  }}
                  onLoadedData={() => {
                    console.log('Video loaded successfully:', selectedVideo.video.url);
                    setVideoError(null);
                  }}
                >
                  <source src={selectedVideo.video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {videoError && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      bgcolor: 'error.light',
                      border: '1px solid',
                      borderColor: 'error.main',
                      borderRadius: 1,
                      color: 'error.dark'
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Error: {videoError}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Description
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {selectedVideo.description}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', gap: 4 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Posted by
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Avatar src={selectedVideo.user.avatar} sx={{ width: 24, height: 24 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                        {selectedVideo.user.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Created
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, mt: 0.5, color: 'text.primary' }}>
                      {selectedVideo.created}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Engagement
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, mt: 0.5, color: 'text.primary' }}>
                      {selectedVideo.counts.likes} likes • {selectedVideo.counts.shares} shares
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Ad Video Dialog */}
        <Dialog
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              borderRadius: 2,
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column'
            }
          }}
        >
          <DialogTitle sx={{
            pb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Add New Ad Video</Typography>
            <IconButton
              onClick={() => setAddDialogOpen(false)}
              sx={{ color: 'grey.500' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 3, overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
              <Autocomplete
                fullWidth
                options={userOptions.slice(1).map(opt => opt.label)}
                value={selectedUploader}
                onChange={(e, value) => setSelectedUploader(value)}
                renderInput={(params) => <TextField {...params} label="Select Uploader" placeholder="Search users" required />}
              />
              <Autocomplete
                fullWidth
                options={adOptions.slice(1).map(opt => opt.label)}
                value={selectedAdForVideo}
                onChange={(e, value) => setSelectedAdForVideo(value)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Ad" placeholder="Search ads" required />
                )}
                onInputChange={(e, value) => {
                  if (value && !caption) setCaption(value);
                }}
              />
              <TextField
                fullWidth
                label="Caption"
                placeholder="Enter caption/description"
                multiline
                rows={3}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
              />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <input
                  accept="video/*"
                  style={{ display: 'none' }}
                  id="video-upload"
                  type="file"
                  onChange={handleVideoUpload}
                />
                <label htmlFor="video-upload">
                  <Button
                    variant="outlined"
                    color="error"
                    component="span"
                    startIcon={<UploadIcon />}
                    fullWidth
                    sx={{
                      py: 1,
                      borderRadius: 1,
                      textTransform: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    Upload File
                  </Button>
                </label>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Accepted formats: video/*
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    Select a video file. A thumbnail will be generated automatically.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Custom thumbnail (optional)</Typography>
                  <Chip label="Using auto" size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                </Box>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="thumbnail-upload"
                  type="file"
                  onChange={handleThumbnailUpload}
                />
                <label htmlFor="thumbnail-upload">
                  <Button
                    variant="outlined"
                    color="error"
                    component="span"
                    startIcon={<UploadIcon />}
                    fullWidth
                    sx={{
                      py: 1,
                      borderRadius: 1,
                      textTransform: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    Upload File
                  </Button>
                </label>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Accepted formats: image/*
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    If you don’t pick an image, we’ll use the auto-generated thumbnail.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>
                {videoPreviewUrl && (
                  <Box sx={{ width: '100%', borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider', bgcolor: 'black' }}>
                    <video
                      src={videoPreviewUrl}
                      controls
                      style={{ width: '100%', height: '100%', display: 'block', maxHeight: 200 }}
                    />
                  </Box>
                )}
                {(thumbnailPreviewUrl || autoThumbnailUrl) && (
                  <Box sx={{ width: '100%', borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                    <img
                      alt="Thumbnail preview"
                      src={thumbnailPreviewUrl || autoThumbnailUrl}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', maxHeight: 200 }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{
            px: 3,
            py: 2,
            gap: 2
          }}>
            <Button
              variant="outlined"
              onClick={() => setAddDialogOpen(false)}
              disabled={isSubmitting}
              sx={{
                minWidth: 100,
                borderColor: 'grey.400',
                color: 'grey.600',
                '&:hover': { borderColor: 'grey.600', bgcolor: 'grey.50' }
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={isSubmitting}
              onClick={handleCreateAdVideo}
              sx={{
                minWidth: 100,
                bgcolor: '#ff4d4d',
                '&:hover': { bgcolor: '#ff3333' }
              }}
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Ad Video Dialog */}
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              borderRadius: 2,
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column'
            }
          }}
        >
          <DialogTitle sx={{
            pb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Edit Ad Video</Typography>
            <IconButton
              onClick={() => setEditDialogOpen(false)}
              sx={{ color: 'grey.500' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 3, overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
              <Autocomplete
                fullWidth
                disabled
                options={userOptions.slice(1).map(opt => opt.label)}
                value={editUploader}
                onChange={(e, value) => {
                  setEditUploader(value);
                }}
                renderInput={(params) => <TextField {...params} label="Select Uploader" placeholder="Search users" required />}
              />
              <Autocomplete
                fullWidth
                options={adOptions.slice(1).map(opt => opt.label)}
                value={editAd}
                onChange={(e, value) => {
                  setEditAd(value);
                  if (!editCaption || editCaption === '') setEditCaption(value); // Auto-fill caption if empty
                }}
                renderInput={(params) => <TextField {...params} label="Select Ad" placeholder="Search ads" required />}
              />
              <TextField
                fullWidth
                label="Caption"
                placeholder="Enter caption/description"
                multiline
                rows={3}
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
                required
              />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <input
                  accept="video/*"
                  style={{ display: 'none' }}
                  id="edit-video-upload"
                  type="file"
                  onChange={handleEditVideoChange}
                />
                <label htmlFor="edit-video-upload">
                  <Button
                    variant="outlined"
                    color="error"
                    component="span"
                    startIcon={<UploadIcon />}
                    fullWidth
                    sx={{
                      py: 1,
                      borderRadius: 1,
                      textTransform: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    Upload File
                  </Button>
                </label>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Accepted formats: video/*
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    Select a video file. A thumbnail will be generated automatically.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Custom thumbnail (optional)</Typography>
                  <Chip label="Using auto" size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                </Box>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="edit-thumbnail-upload"
                  type="file"
                  onChange={handleEditThumbnailChange}
                />
                <label htmlFor="edit-thumbnail-upload">
                  <Button
                    variant="outlined"
                    color="error"
                    component="span"
                    startIcon={<UploadIcon />}
                    fullWidth
                    sx={{
                      py: 1,
                      borderRadius: 1,
                      textTransform: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    Upload File
                  </Button>
                </label>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Accepted formats: image/*
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    If you don’t pick an image, we’ll use the auto-generated thumbnail.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>
                {(videoPreviewUrl || selectedEditVideo?.video.url) && (
                  <Box sx={{ width: '100%', borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider', bgcolor: 'black' }}>
                    <video
                      src={videoPreviewUrl || selectedEditVideo?.video.url}
                      key={videoPreviewUrl || selectedEditVideo?.video.url}
                      controls
                      style={{ width: '100%', height: '100%', display: 'block', maxHeight: 200 }}
                    />
                  </Box>
                )}
                {(thumbnailPreviewUrl || autoThumbnailUrl || selectedEditVideo?.video.thumbnail) && (
                  <Box sx={{ width: '100%', borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                    <img
                      alt="Thumbnail preview"
                      src={thumbnailPreviewUrl || autoThumbnailUrl || selectedEditVideo?.video.thumbnail}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', maxHeight: 200 }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{
            px: 3,
            py: 2,
            gap: 2
          }}>
            <Button
              variant="outlined"
              onClick={() => setEditDialogOpen(false)}
              disabled={isSubmitting}
              sx={{
                minWidth: 100,
                borderColor: 'grey.400',
                color: 'grey.600',
                '&:hover': { borderColor: 'grey.600', bgcolor: 'grey.50' }
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleUpdate}
              disabled={isSubmitting}
              sx={{
                minWidth: 100,
                bgcolor: '#ff4d4d', // Use a brighter red as in the image
                '&:hover': { bgcolor: '#ff3333' }
              }}
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Ad Video Dialog */}
        <Dialog open={openDeleteDialog} onClose={() => !isDeleting && setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 1, pt: 3 }}>
            <Box sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)', p: 1.5, borderRadius: '50%', mb: 2 }}>
              <IconTrash size={32} color="#e74c3c" />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Delete Ad Video</Typography>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
            <Typography variant="body1">Are you sure you want to delete <strong>{videoToDelete?.adDetails?.title}</strong>'s video?</Typography>
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
      </Box >
    </>
  );
};

export default AdVideo;

