import React, { useState } from 'react';
import { useLayoutDetails } from '../context/LayoutContext';
import PageHeader from './PageHeader';
import { Box, Button, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Chip, IconButton, Pagination, Dialog, DialogTitle, DialogContent, Typography, FormControl } from '@mui/material';
import DateRangePicker from './DateRangePicker';
import { IconClock, IconCheck, IconX, IconFile } from '@tabler/icons-react';

function VerificationPage() {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [dateRangeDialogOpen, setDateRangeDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState({ src: '', title: '' });
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [currentRejectId, setCurrentRejectId] = useState(null);
  const [rejectReasonText, setRejectReasonText] = useState('');

  // Unified state for all verification requests
  const [verificationRequests, setVerificationRequests] = useState([
    {
      requestId: 'VER-20251017-20427',
      user: {
        name: 'Alice Smith',
        id: 'as456def',
        avatar: 'https://listify.codderlab.com/uploads/user/1762231996733-4975.jpg'
      },
      idType: 'Driving License',
      submitTime: '10/15/2025, 2:30:45 PM',
      status: 'Pending',
      reviewedTime: '-',
      rejectionReason: '-',
      documents: { front: 'https://placehold.co/100x100?text=ID+Document', back: 'https://placehold.co/100x100?text=ID+Document' }
    },
    {
      requestId: 'VER-20251017-20428',
      user: {
        name: 'Bob Johnson',
        id: 'bj789ghi',
        avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif'
      },
      idType: 'National ID',
      submitTime: '10/14/2025, 9:15:20 AM',
      status: 'Pending',
      reviewedTime: '-',
      rejectionReason: '-',
      documents: { front: 'https://placehold.co/100x100?text=ID+Document', back: 'https://placehold.co/100x100?text=ID+Document' }
    },
    {
      requestId: 'VER-20251017-20426',
      user: {
        name: 'John Doe',
        id: 'jd123abc',
        avatar: 'https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif'
      },
      idType: 'Passport',
      submitTime: '10/16/2025, 10:20:15 AM',
      status: 'Pending',
      reviewedTime: '-',
      rejectionReason: '-',
      documents: { front: 'https://placehold.co/100x100?text=ID+Document', back: 'https://placehold.co/100x100?text=ID+Document' }
    },
    {
      requestId: 'VER-20251017-20425',
      user: {
        name: 'David John',
        id: 'djh63oic79',
        avatar: 'https://listify.codderlab.com/uploads/user/1763961871514-6243.png'
      },
      idType: 'Aadhar Card',
      submitTime: '10/17/2025, 11:36:02 AM',
      status: 'Pending',
      reviewedTime: '-',
      rejectionReason: '-',
      documents: {
        front: 'https://placehold.co/100x100?text=ID+Document',
        back: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyNTAiIHJ4PSIxNSIgcnk9IjE1IiBmaWxsPSIjZmZmIiBzdHJva2U9IiM1NTUiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxyZWN0IHg9IjIwNSIgeT0iMzAiIHdpZHRoPSIxOTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZjk5MzMiLz4KICA8cmVjdCB4PSIyMDUiIHk9IjQ1IiB3aWR0aD0iMTkwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMTM4ODA4Ii8+CiAgPHRleHQgeD0iMzUyIiB5PSI4NSIgZm9udC1mYW1pbHk9ImFyaWFsIiBmb250LXNpemU9IjQwIiBmaWxsPSIjZDAyYzJiIj4mI3gyNjAwOzwvdGV4dD4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjYwIiByPSIyNSIgZmlsbD0iI2NjYyIvPgogIDx0ZXh0IHg9IjUwIiB5PSI2NSIgZm9udC1mYW1pbHk9ImFyaWFsIiBmb250LXNpemU9IjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FbWJsZW08L3RleHQ+CiAgPHRleHQgeD0iMzAiIHk9IjExMCIgZm9udC1mYW1pbHk9ImFyaWFsIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iYm9sZCI+QUREUkVTEzwvdGV4dD4KICA8cmVjdCB4PSIzMCIgeT0iMTIwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjYiIHJ4PSIyIiBmaWxsPSIjZWVlIi8+CiAgPHJlY3QgeD0iMzAiIHk9IjEzNSIgd2lkdGg9IjE4MCIgaGVpZ2h0PSI2IiByeD0iMiIgZmlsbD0iI2VlZSIvPgogIDxyZWN0IHg9IjMwIiB5PSIxNTAiIHdpZHRoPSIxNDAiIGhlaWdodD0iNiIgcng9IjIiIGZpbGw9IiNlZWUiLz4KICA8cmVjdCB4PSIyNDAiIHk9IjEyMCIgd2lkdGg9IjEzMCIgaGVpZ2h0PSI2IiByeD0iMiIgZmlsbD0iI2VlZSIvPgogIDxyZWN0IHg9IjI0MCIgeT0iMTM1IiB3aWR0aD0iMTMwIiBoZWlnaHQ9IjYiIHJ4PSIyIiBmaWxsPSIjZWVlIi8+CiAgPHJlY3QgeD0iMjQwIiB5PSIxNTAiIHdpZHRoPSIxMzAiIGhlaWdodD0iNiIgcng9IjIiIGZpbGw9IiNlZWUiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjIwMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgbGV0dGVyLXNwYWNpbmc9IjIiPjEyMzQgNTY3OCA5MDEwPC90ZXh0PgogIDxyZWN0IHg9IjAiIHk9IjIzNSIgd2lkdGg9IjQwMCIgaGVpZ2h0PSI1IiBmaWxsPSIjZDAyYzJiIi8+Cjwvc3ZnPg=='
      }
    }
  ]);

  const handleDateRangeOpen = () => {
    setDateRangeDialogOpen(true);
  };

  const handleDateRangeClose = () => {
    setDateRangeDialogOpen(false);
  };

  const handleDateRangeApply = (range) => {
    setDateRange(range);
    console.log('Date range applied:', range);
  };

  const handleDateRangeClear = () => {
    setDateRange({ startDate: null, endDate: null });
    console.log('Date range cleared');
  };

  const handleImageOpen = (src, title) => {
    setCurrentImage({ src, title });
    setImageDialogOpen(true);
  };

  const handleImageClose = () => {
    setImageDialogOpen(false);
    setCurrentImage({ src: '', title: '' });
  };

  const handleApprove = (id) => {
    setVerificationRequests(prev => prev.map(req =>
      req.requestId === id ? { ...req, status: 'Approved', reviewedTime: new Date().toLocaleString() } : req
    ));
  };

  const handleReject = (id) => {
    setCurrentRejectId(id);
    setRejectDialogOpen(true);
  };

  const handleRejectClose = () => {
    setRejectDialogOpen(false);
    setCurrentRejectId(null);
    setRejectReasonText('');
  };

  const handleRejectSubmit = () => {
    if (currentRejectId) {
      setVerificationRequests(prev => prev.map(req =>
        req.requestId === currentRejectId ? { ...req, status: 'Rejected', reviewedTime: new Date().toLocaleString(), rejectionReason: rejectReasonText } : req
      ));
    }
    handleRejectClose();
  };



  useLayoutDetails({ title: "Verification" });

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader
          title="Verification"
          subtitle="Manage user verification requests and approvals"
        />
        <Button variant="outlined" color="error" onClick={handleDateRangeOpen}>
          Filter By Date
        </Button>
      </div>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>REQUEST ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>USER</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>ID TYPE</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>SUBMIT TIME</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>ACTIONS</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>DOCUMENTS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {verificationRequests.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      opacity: row.status === 'Rejected' ? 0.6 : 1,
                      filter: row.status === 'Rejected' ? 'grayscale(0.5)' : 'none',
                      transition: 'opacity 0.3s ease, filter 0.3s ease',
                      backgroundColor: row.status === 'Rejected' ? '#fcfcfc' : 'inherit'
                    }}
                  >
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.requestId}</TableCell>
                    <TableCell align="left" sx={{ textAlign: 'left !important', pl: '16px !important', pr: '0 !important', verticalAlign: 'middle', py: 2, display: 'table-cell !important' }}>
                      <Box sx={{ display: 'flex !important', alignItems: 'center !important', justifyContent: 'flex-start !important', gap: 1, width: '100% !important', m: 0, p: 0, textAlign: 'left !important' }}>
                        <Avatar src={row.user.avatar} sx={{ width: 32, height: 32, flexShrink: 0, m: 0 }} />
                        <Box sx={{ display: 'flex !important', flexDirection: 'column !important', gap: 0, alignItems: 'flex-start !important', minWidth: 0, textAlign: 'left !important', p: 0, m: 0 }}>
                          <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.1, textAlign: 'left !important', fontSize: '0.925rem', p: 0, m: 0, width: '100% !important' }}>{row.user.name}</Typography>
                          <Typography variant="body2" sx={{ display: 'block !important', lineHeight: 1, textAlign: 'left !important', fontSize: '0.8rem', fontWeight: 400, color: 'text.primary', p: 0, m: 0, mt: '-16px !important', width: '100% !important' }}>{row.user.id}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{row.idType}</TableCell>
                    <TableCell>{row.submitTime}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        color={row.status === 'Approved' ? 'success' : row.status === 'Rejected' ? 'error' : 'warning'}
                        variant="outlined"
                        size="small"
                        sx={{
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleApprove(row.requestId)}
                          sx={{ color: 'text.secondary', '&:hover': { color: 'success.main', bgcolor: 'success.lighter' } }}
                        >
                          <IconCheck size={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleReject(row.requestId)}
                          sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'error.lighter' } }}
                        >
                          <IconX size={18} />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleImageOpen(row.documents.front, 'Front Image')}
                          sx={{ color: 'text.secondary', '&:hover': { color: 'info.main', bgcolor: 'info.lighter' } }}
                        >
                          <IconFile size={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleImageOpen(row.documents.back, 'Back Image')}
                          sx={{ color: 'text.secondary', '&:hover': { color: 'info.main', bgcolor: 'info.lighter' } }}
                        >
                          <IconFile size={18} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap' }}>
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
              <div>Showing 1 to {verificationRequests.length} of {verificationRequests.length} entries</div>
            </div>
            <Pagination
              count={1}
              page={1}
              onChange={() => { }}
              showFirstButton
              showLastButton
              variant="outlined"
              shape="rounded"
              color="error"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderColor: 'rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'error.light',
                    backgroundColor: 'rgba(231, 76, 60, 0.04)',
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
      </Box>

      {/* Image Dialog */}
      < Dialog open={imageDialogOpen} onClose={handleImageClose} maxWidth="md" fullWidth >
        <DialogTitle>
          <Typography variant="h6" color="text.primary">{currentImage.title}</Typography>
          <Button onClick={handleImageClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <IconX />
          </Button>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: '100%', height: 400 }}>
            <img
              src={currentImage.src}
              alt={currentImage.title}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
        </DialogContent>
      </Dialog >

      {/* Reject Reason Dialog */}
      <Dialog
        open={rejectDialogOpen}
        onClose={handleRejectClose}
        maxWidth="sm"
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Reject Verification Request</Typography>
          <IconButton onClick={handleRejectClose} size="small">
            <IconX />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please provide a reason for rejecting this verification request:
          </Typography>
          <FormControl fullWidth>
            <textarea
              rows="4"
              placeholder="Enter rejection reason..."
              value={rejectReasonText}
              onChange={(e) => setRejectReasonText(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                borderColor: 'rgba(0, 0, 0, 0.23)',
                resize: 'none',
                fontFamily: 'inherit',
                fontSize: '1rem',
                outline: 'none',
              }}
              className="focus:border-red-500 focus:ring-1 focus:ring-red-500 border"
            />
          </FormControl>
        </DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, p: 2, pt: 0 }}>
          <Button
            variant="contained"
            onClick={handleRejectClose}
            sx={{
              backgroundColor: '#f5f5f5',
              color: '#333',
              boxShadow: 'none',
              fontWeight: 500,
              '&:hover': { backgroundColor: '#e0e0e0', boxShadow: 'none' }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleRejectSubmit}
            sx={{ boxShadow: 'none', fontWeight: 500 }}
          >
            Submit
          </Button>
        </Box>
      </Dialog>

      <DateRangePicker
        open={dateRangeDialogOpen}
        onClose={handleDateRangeClose}
        onApply={handleDateRangeApply}
        onClear={handleDateRangeClear}
      />
    </>
  );
}

export default VerificationPage;

