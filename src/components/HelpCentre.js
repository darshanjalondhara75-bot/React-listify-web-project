import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLayoutDetails } from '../context/LayoutContext';
import { ThemeContext } from '../App';
import PageHeader from './PageHeader';

const HelpCentre = () => {
  const { userRole } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'How can I contact customer support?',
      answer: 'You can reach our support team via email, live chat, or phone between 9 AM and 8 PM (Mon–Sat). Our goal is to resolve all customer queries within 24 hours.',
    },
    {
      id: 2,
      question: 'Do you offer discounts or loyalty rewards?',
      answer: 'Yes! We regularly provide exclusive discounts, festival offers, and cashback deals. You can also join our Loyalty Program to earn points on every purchase and redeem them for future discounts.',
    },
    {
      id: 3,
      question: 'Are my personal details safe with you?',
      answer: 'Absolutely. We use advanced encryption and secure payment gateways to protect your data. We never share your personal information with third parties without your consent.',
    },
    {
      id: 4,
      question: 'How can I cancel my order?',
      answer: 'You can cancel your order before it\'s shipped by visiting the "My Orders" page and clicking Cancel Order. Once dispatched, cancellation may not be possible, but you can still request a return after delivery.',
    },
    {
      id: 5,
      question: 'What should I do if I receive a damaged or incorrect product?',
      answer: 'We\'re sorry for the inconvenience! Please contact our support team within 48 hours of delivery with images of the product and packaging. Our team will arrange a replacement or refund after verifying the issue.',
    },
    {
      id: 6,
      question: 'Do you offer international shipping?',
      answer: 'Currently, we deliver only within select countries. International shipping availability depends on the product and destination. Shipping charges and customs duties, if applicable, will be displayed during checkout.',
    },
    {
      id: 7,
      question: 'How do I track my order?',
      answer: 'Once your order is shipped, you\'ll receive a tracking link via SMS or email. You can also log in to your account and view real-time updates on your order status under the "My Orders" section.',
    },
    {
      id: 8,
      question: 'Can I return or exchange a product?',
      answer: 'Yes, you can return or exchange most items within 7 days of delivery, provided the product is unused, undamaged, and in its original packaging. Certain categories like hygiene or perishable goods may not be eligible for returns.',
    },
    {
      id: 9,
      question: 'How long does delivery usually take?',
      answer: 'Delivery times vary based on your location and the product type. Standard delivery typically takes 3–7 business days, while express delivery options may arrive within 1–2 days in select areas.',
    },
    {
      id: 10,
      question: 'What payment methods do you accept?',
      answer: 'We accept a wide range of payment options, including credit/debit cards, UPI, net banking, PayPal, and digital wallets. All transactions are securely processed through trusted gateways to ensure your data remains safe.',
    },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setQuestion('');
    setAnswer('');
  };
  const handleEditOpen = (faq) => {
    setEditingFaqId(faq.id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
    setOpenEdit(true);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
    setEditingFaqId(null);
    setEditQuestion('');
    setEditAnswer('');
  };
  const handleCreate = () => {
    toast.error("You don't have permission to perform this action");
    handleClose();
  };
  const handleUpdate = () => {
    toast.error("You don't have permission to perform this action");
    handleEditClose();
  };
  const handleDelete = () => {
    toast.error("You don't have permission to perform this action");
  };

  useLayoutDetails({ title: "Help Centre" });

  return (
    <>
      <PageHeader title="Help Center" subtitle="Manage FAQs and user help content" />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<AddIcon />}
          size="medium"
          onClick={handleOpen}
        >
          Add FAQs
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="faq-dialog-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="faq-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" color="text.primary">Create New FAQs</Typography>
          <IconButton onClick={handleClose} color="error">
            <i className="tabler-x"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Question"
            variant="filled"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Answer"
            variant="filled"
            multiline
            rows={3}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={handleClose} variant="text" color="error">
            Cancel
          </Button>
          <Button onClick={handleCreate} variant="contained" color="error">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="edit-faq-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="edit-faq-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" color="text.primary">Edit FAQs</Typography>
          <IconButton onClick={handleEditClose} color="error">
            <i className="tabler-x"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Question"
            variant="outlined"
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Answer"
            variant="outlined"
            multiline
            rows={3}
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={handleEditClose} variant="text" color="error">
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained" color="error">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {faqs.map((faq, index) => (
        <Paper
          key={faq.id}
          className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiAccordion-root MuiAccordion-rounded MuiAccordion-gutters"
          sx={{ mb: 1 }}
          style={{ "--Paper-shadow": "var(--mui-shadows-1)", "--Paper-overlay": "var(--mui-overlays-1)" }}
        >
          <Accordion defaultExpanded={index === 0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${faq.id}a-content`}
              id={`panel${faq.id}a-header`}
              className="MuiAccordionSummary-gutters"
            >
              <Typography variant="body1">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ textAlign: 'left', fontWeight: 400 }}>{faq.answer}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 2 }}>
                <IconButton
                  size="small"
                  aria-label="Edit FAQ"
                  onClick={() => handleEditOpen(faq)}
                  sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                >
                  <EditIcon size={20} />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="Delete FAQ"
                  onClick={handleDelete}
                  sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'error.lighter' } }}
                >
                  <DeleteIcon size={20} />
                </IconButton>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Paper>
      ))}
    </>
  );
};

export default HelpCentre;

