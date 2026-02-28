import React, { useState, useMemo, useContext } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Pagination,
  Card,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
} from "@mui/material";
import {
  IconPlus,
  IconEye,
  IconX,
  IconCheck,
  IconTrash,
  IconEyeOff,
  IconAlertCircle,
  IconCircleCheck,
  IconCircleX,
  IconFileDescription,
  IconUser,
} from "@tabler/icons-react";
import { useLayoutDetails } from '../context/LayoutContext';
import { ThemeContext } from "../App";
import DateRangePicker from "./DateRangePicker";
import PageHeader from "./PageHeader";

const Report = () => {
  const { userRole } = useContext(ThemeContext);
  const [status, setStatus] = useState("1");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [expandedSubtitle, setExpandedSubtitle] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [cancelledDialogOpen, setCancelledDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [expandedStates, setExpandedStates] = useState({});
  const [dateRangeDialogOpen, setDateRangeDialogOpen] = useState(false);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(event.target.value);
  };

  const handleToggleSubtitle = () => {
    setExpandedSubtitle(!expandedSubtitle);
  };

  const handleToggleDescription = () => {
    setExpandedDescription(!expandedDescription);
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReport(null);
  };

  const handleResolveReport = (id) => {
    setSelectedReportId(id);
    setConfirmDialogOpen(true);
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
    setSelectedReportId(null);
  };

  const handleCancelResolve = () => {
    setConfirmDialogOpen(false);
    setCancelledDialogOpen(true);
  };

  const handleCloseCancelledDialog = () => {
    setCancelledDialogOpen(false);
    setSelectedReportId(null);
  };

  const handleRejectReport = (id) => {
    // In real app, update status via API
    toast.success("Report rejected");
  };

  const handleToggle = (id, field) => {
    setExpandedStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !(prev[id]?.[field] || false),
      },
    }));
  };

  const handleApplyDateRange = (dates) => {
    console.log('Applied dates:', dates);
    // Here you can filter the reports based on dates
  };

  const handleClearDateRange = () => {
    console.log('Cleared dates');
  };

  const defaultReports = [
    {
      id: 1,
      type: "ad",
      status: "1",
      statusActive: true,
      user: {
        name: "David John",
        id: "djh63oic79",
        avatar: "https://listify.codderlab.com/uploads/user/1763961871514-6243.png",
      },
      ad: {
        title: "Google Pixel 8 Pro",
        id: "ad123abc",
        image: "https://m.media-amazon.com/images/I/71Y9fGqS-UL._AC_SL1500_.jpg",
      },
      subtitle: "Smart. Powerful. Pure Google. Capture brilliance with AI-powered photography.",
      description: "Experience the best of Android with the Google Pixel 8 Pro, built for those who love innovation, speed, and stunning photography.",
      createdDate: "Oct 18, 2025",
      reason: "Inappropriate content",
      details: "The ad contains misleading information about the product features.",
    },
    {
      id: 2,
      type: "user",
      status: "1",
      statusActive: true,
      user: {
        name: "Emma Watson",
        id: "ew83xjk12",
        avatar: "https://listify.codderlab.com/uploads/user/1762231996733-4975.jpg",
      },
      ad: {
        title: "Apple MacBook Pro M3",
        id: "ad456def",
        image: "https://m.media-amazon.com/images/I/61fDeI+4MOL._AC_SL1500_.jpg",
      },
      subtitle: "Mind-blowing. Head-turning. The advanced M3 chip.",
      description: "MacBook Pro blasts forward with the M3 chip. Built on 3-nanometer technology, it brings massive performance and graphics upgrades. Ideal for professional workflows.",
      createdDate: "Oct 19, 2025",
      reason: "Spam",
      details: "User keeps posting the same ad multiple times a day.",
    },
    {
      id: 3,
      type: "ad",
      status: "1",
      statusActive: true,
      user: {
        name: "Michael Chen",
        id: "mc29pzq88",
        avatar: "https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif",
      },
      ad: {
        title: "Sony WH-1000XM5",
        id: "ad789ghi",
        image: "https://m.media-amazon.com/images/I/51aXvjzcukL._AC_SL1500_.jpg",
      },
      subtitle: "Industry-leading noise cancellation.",
      description: "Sony WH-1000XM5 headphones rewrite the rules for distraction-free listening. Exceptional call quality.",
      createdDate: "Oct 20, 2025",
      reason: "Fake product",
      details: "The images provided appear to be from a completely different model.",
    },
    {
      id: 4,
      type: "user",
      status: "1",
      statusActive: true,
      user: {
        name: "Sarah Miller",
        id: "sm11blc23",
        avatar: "https://listify.codderlab.com/uploads/user/1762231996733-4975.jpg",
      },
      ad: {
        title: "Nike Air Max 2024",
        id: "ad012jkl",
        image: "https://m.media-amazon.com/images/I/71XmP-O0vLL._AC_SL1500_.jpg",
      },
      subtitle: "Experience the next generation of Air.",
      description: "Step into the future with the Nike Air Max 2024. Featuring our most responsive cushioning system yet.",
      createdDate: "Oct 21, 2025",
      reason: "Abusive language",
      details: "The user left abusive comments on the seller's profile.",
    },
    {
      id: 5,
      type: "ad",
      status: "1",
      statusActive: true,
      user: {
        name: "Alex Johnson",
        id: "aj94ytn55",
        avatar: "https://listify.codderlab.com/uploads/user/1765964522251-6867.jfif",
      },
      ad: {
        title: "DJI Mini 4 Pro",
        id: "ad345mno",
        image: "https://m.media-amazon.com/images/I/61-Tq7-p4DL._AC_SL1500_.jpg",
      },
      subtitle: "Mini to the Max. Omnidirectional obstacle sensing.",
      description: "DJI Mini 4 Pro is our most advanced mini-camera drone to date. It integrates powerful imaging capabilities.",
      createdDate: "Oct 22, 2025",
      reason: "Wrong Category",
      details: "This item is listed under Smartphones instead of Electronics/Cameras.",
    }
  ];

  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('reports_list_v4');
    let data = defaultReports;
    if (saved) {
      let parsed = JSON.parse(saved);
      // Migration: Update placeholders to professional avatars
      data = parsed.map(report => {
        let updatedReport = { ...report, isDeleted: false, status: "1" };
        const defaultRef = defaultReports.find(d => d.id === report.id);
        if (defaultRef) {
          updatedReport.user = { ...updatedReport.user, avatar: defaultRef.user.avatar };
          if (updatedReport.ad) updatedReport.ad.image = defaultRef.ad.image;
        }
        return updatedReport;
      });
    }
    return data;
  });

  const handleDeleteReport = (id) => {
    setReportToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (reportToDelete) {
      const newList = reports.map(report =>
        report.id === reportToDelete ? { ...report, isDeleted: true } : report
      );
      setReports(newList);
      localStorage.setItem('reports_list_v4', JSON.stringify(newList));
      toast.success('Report deleted successfully');
      setDeleteDialogOpen(false);
      setReportToDelete(null);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setReportToDelete(null);
  };

  const handleConfirmResolve = () => {
    const newList = reports.map(report =>
      report.id === selectedReportId ? { ...report, status: "2" } : report
    );
    setReports(newList);
    // Left out localStorage so the status change drops on refresh
    setConfirmDialogOpen(false);
    setSuccessDialogOpen(true);
  };

  // Filtered reports based on status (and excluding deleted ones)
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      if (report.isDeleted) return false;
      const statusMatch = status === "all" || report.status === status;
      return statusMatch;
    });
  }, [status, reports]);

  useLayoutDetails({ title: "Reports" });

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader title="Report" subtitle="Manage reported ads, user issues, and moderation status" />
        <Button variant="contained" color="error" onClick={() => setDateRangeDialogOpen(true)}>
          Filter By Date
        </Button>
      </div>
      <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
        <div className="flex items-center justify-between px-0 py-4 flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">

            {/* Tabs removed as requested */}

          </div>

          <FormControl
            size="small"
            sx={{ minWidth: 120 }}
          >
            <Select
              value={status}
              onChange={handleStatusChange}
              displayEmpty
              inputProps={{ "aria-label": "Status" }}
              color="error"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-primary)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-secondary)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e74c3c', borderWidth: '2px' }
              }}
            >
              <MenuItem value="1">Pending</MenuItem>
              <MenuItem value="2">Solved</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="overflow-x-auto">
          <Table className="table_table__cB3AL">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>USER</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>AD TITLE</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>SUB TITLE</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>DESCRIPTION</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>CREATED DATE</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">STATUS</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id} sx={{
                  opacity: report.isDeleted ? 0.6 : 1,
                  filter: report.isDeleted ? 'grayscale(0.5)' : 'none',
                  transition: 'opacity 0.3s ease, filter 0.3s ease',
                  backgroundColor: report.isDeleted ? '#fcfcfc' : 'inherit'
                }}>
                  <TableCell align="left" sx={{ textAlign: 'left !important', pl: '16px !important', pr: '0 !important', verticalAlign: 'middle', py: 2, display: 'table-cell !important' }}>
                    <Box sx={{ display: 'flex !important', alignItems: 'center !important', justifyContent: 'flex-start !important', gap: 1, width: '100% !important', m: 0, p: 0, textAlign: 'left !important' }}>
                      <Avatar src={report.user.avatar} sx={{ width: 32, height: 32, flexShrink: 0, m: 0 }} />
                      <Box sx={{ display: 'flex !important', flexDirection: 'column !important', gap: 0, alignItems: 'flex-start !important', minWidth: 0, textAlign: 'left !important', p: 0, m: 0 }}>
                        <Typography variant="body2" className="capitalize" sx={{ color: 'text.primary', lineHeight: 1.1, textAlign: 'left !important', fontSize: '0.925rem', fontWeight: 600, p: 0, m: 0, width: '100% !important' }}>
                          {report.user.name}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'block !important', lineHeight: 1, textAlign: 'left !important', fontSize: '0.8rem', fontWeight: 400, color: 'text.secondary', p: 0, m: 0, width: '100% !important', mt: '-16px !important' }}>
                          {report.user.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="left" sx={{ textAlign: 'left !important', pl: '16px !important', pr: '0 !important', verticalAlign: 'middle', py: 2, display: 'table-cell !important' }}>
                    <Box sx={{ display: 'flex !important', alignItems: 'center !important', justifyContent: 'flex-start !important', gap: 1, width: '100% !important', m: 0, p: 0, textAlign: 'left !important' }}>
                      <Avatar
                        src={report.ad?.image || report.user.avatar}
                        variant="rounded"
                        sx={{ width: 40, height: 40, flexShrink: 0, m: 0 }}
                      />
                      <Box sx={{ display: 'flex !important', flexDirection: 'column !important', gap: 0, alignItems: 'flex-start !important', minWidth: 0, textAlign: 'left !important', p: 0, m: 0 }}>
                        <Typography variant="body2" className="capitalize" sx={{ color: 'text.primary', lineHeight: 1.1, textAlign: 'left !important', fontSize: '0.925rem', fontWeight: 600, p: 0, m: 0, width: '100% !important' }}>
                          {report.ad?.title || report.issue}
                        </Typography>
                        {report.ad?.id && (
                          <Typography variant="body2" sx={{ display: 'block !important', lineHeight: 1, textAlign: 'left !important', fontSize: '0.8rem', fontWeight: 400, color: 'text.secondary', p: 0, m: 0, width: '100% !important', mt: '-16px !important' }}>
                            {report.ad.id}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="left" sx={{ maxWidth: 200, verticalAlign: 'top', py: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                      <Typography variant="body2" sx={{ textAlign: 'left', display: 'block' }}>
                        {expandedStates[report.id]?.subtitle
                          ? report.subtitle
                          : report.subtitle.length > 35
                            ? report.subtitle.slice(0, 35) + "..."
                            : report.subtitle}
                      </Typography>
                      {report.subtitle.length > 35 && (
                        <Button
                          variant="text"
                          size="small"
                          color="error"
                          onClick={() => handleToggle(report.id, "subtitle")}
                          sx={{
                            p: 0,
                            m: 0,
                            mt: 0,
                            minHeight: 'auto',
                            minWidth: 'auto',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            textAlign: 'left',
                            justifyContent: 'flex-start',
                            '&:hover': { background: 'transparent', textDecoration: 'underline' }
                          }}
                        >
                          {expandedStates[report.id]?.subtitle ? 'Read Less' : 'Read More'}
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="left" sx={{ maxWidth: 200, verticalAlign: 'top', py: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                      <Typography variant="body2" sx={{ textAlign: 'left', display: 'block' }}>
                        {expandedStates[report.id]?.description
                          ? report.description
                          : report.description.length > 60
                            ? report.description.slice(0, 60) + "..."
                            : report.description}
                      </Typography>
                      {report.description.length > 60 && (
                        <Button
                          variant="text"
                          size="small"
                          color="error"
                          onClick={() => handleToggle(report.id, "description")}
                          sx={{
                            p: 0,
                            m: 0,
                            mt: 0,
                            minHeight: 'auto',
                            minWidth: 'auto',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            textAlign: 'left',
                            justifyContent: 'flex-start',
                            '&:hover': { background: 'transparent', textDecoration: 'underline' }
                          }}
                        >
                          {expandedStates[report.id]?.description ? 'Read Less' : 'Read More'}
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="left" sx={{ verticalAlign: 'top', py: 2 }}>
                    <Typography variant="body2" sx={{ textAlign: 'left' }}>
                      {report.createdDate}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ verticalAlign: 'top', py: 2 }}>
                    <Chip
                      label={
                        report.status === "1"
                          ? "Pending"
                          : report.status === "2"
                            ? "Solved"
                            : "Rejected"
                      }
                      color={
                        report.status === "1"
                          ? "warning"
                          : report.status === "2"
                            ? "success"
                            : "error"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="center" sx={{ verticalAlign: 'top', py: 2 }}>
                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                      <IconButton
                        aria-label="Mark as Solved"
                        onClick={() => handleResolveReport(report.id)}
                        sx={{ color: 'text.secondary', '&:hover': { color: 'success.main', bgcolor: 'success.lighter' } }}
                      >
                        <IconCheck size={18} />
                      </IconButton>
                      <IconButton
                        aria-label="Delete Report"
                        onClick={() => handleDeleteReport(report.id)}
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
              Showing {Math.min(1, filteredReports.length)} to{" "}
              {filteredReports.length} of {filteredReports.length} entries
            </div>
          </div>
          <Pagination
            count={Math.ceil(filteredReports.length / entriesPerPage)}
            variant="outlined"
            size="medium"
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
      </Paper>

      {/* Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Report Details</DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedReport.type === "ad" ? "Reported Ad" : "User Issue"}
              </Typography>
              <Box className="flex items-center gap-4 mb-4">
                <Avatar
                  src={selectedReport.user.avatar}
                  sx={{ width: 50, height: 50 }}
                />
                <Box>
                  <Typography variant="body1" fontWeight="medium">
                    {selectedReport.user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedReport.createdDate}
                  </Typography>
                </Box>
              </Box>
              {selectedReport.type === "ad" ? (
                <Box mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={selectedReport.ad?.image}
                    variant="rounded"
                    sx={{ width: 60, height: 60, border: '1px solid rgba(0,0,0,0.1)' }}
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Ad: {selectedReport.ad?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: '-16px !important' }}>
                      {selectedReport.subtitle}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box mb={2}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Issue: {selectedReport.issue}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedReport.subtitle}
                  </Typography>
                </Box>
              )}
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Reason:
                </Typography>
                <Typography variant="body2">
                  {selectedReport.reason}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Details:
                </Typography>
                <Typography variant="body2">
                  {selectedReport.details}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Full Description:
                </Typography>
                <Typography variant="body2">
                  {selectedReport.description}
                </Typography>
              </Box>
              <Box>
                <Chip
                  label={
                    selectedReport.status === "1"
                      ? "Pending"
                      : selectedReport.status === "2"
                        ? "Resolved"
                        : "Rejected"
                  }
                  color={
                    selectedReport.status === "1"
                      ? "warning"
                      : selectedReport.status === "2"
                        ? "success"
                        : "error"
                  }
                  size="small"
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Resolve Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelResolve}
        maxWidth="xs"
        fullWidth
        sx={{ minHeight: "400px" }}
      >
        <DialogContent className="flex items-center flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16">
          <IconAlertCircle size={88} className="mbe-6 text-warning" />
          <Typography variant="h5" color="text.primary" gutterBottom>
            Are you sure you want to solve?
          </Typography>
          <Typography variant="body1" color="text.primary">
            You won't be able to revert the report!
          </Typography>
        </DialogContent>
        <DialogActions className="justify-center pbs-0 sm:pbe-16 sm:pli-16">
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmResolve}
          >
            Yes, Solve report!
          </Button>
          <Button
            variant="tonal"
            color="error"
            onClick={handleCancelResolve}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={successDialogOpen}
        onClose={handleCloseSuccessDialog}
        maxWidth="xs"
        fullWidth
        sx={{ minHeight: "400px" }}
      >
        <DialogContent className="flex items-center flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16">
          <IconCircleCheck size={88} className="mbe-6 text-success" />
          <Typography variant="h5" color="text.primary" gutterBottom>
            Solved
          </Typography>
          <Typography variant="body1" color="text.primary">
            The report has been solved successfully.
          </Typography>
        </DialogContent>
        <DialogActions className="justify-center pbs-0 sm:pbe-16 sm:pli-16">
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseSuccessDialog}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 1, pt: 3 }}>
          <Box sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)', p: 1.5, borderRadius: '50%', mb: 2 }}>
            <IconTrash size={32} color="#e74c3c" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Delete Report</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
          <Typography variant="body1">Are you sure you want to delete this report?</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'center', gap: 2 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            variant="outlined"
            sx={{ minWidth: 100, color: 'text.secondary', borderColor: 'rgba(0,0,0,0.1)' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            sx={{ minWidth: 100 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancelled Dialog */}
      <Dialog
        open={cancelledDialogOpen}
        onClose={handleCloseCancelledDialog}
        maxWidth="xs"
        fullWidth
        sx={{ minHeight: "400px" }}
      >
        <DialogContent className="flex items-center flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16">
          <IconCircleX size={88} className="mbe-6 text-error" />
          <Typography variant="h6" color="text.primary" gutterBottom>
            Cancelled
          </Typography>
          <Typography variant="body1" color="text.primary">
            report solve cancelled.
          </Typography>
        </DialogContent>
        <DialogActions className="justify-center pbs-0 sm:pbe-16 sm:pli-16">
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseCancelledDialog}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <DateRangePicker
        open={dateRangeDialogOpen}
        onClose={() => setDateRangeDialogOpen(false)}
        onApply={handleApplyDateRange}
        onClear={handleClearDateRange}
      />

    </>
  );
};

export default Report;

