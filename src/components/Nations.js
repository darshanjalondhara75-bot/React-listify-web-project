import React, { useState, useEffect } from 'react';
import { useLayoutDetails } from '../context/LayoutContext';
import { Paper, Select, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Pagination, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Snackbar, Alert, Autocomplete, FormControl } from '@mui/material';
import { IconPlus, IconEye, IconTrash, IconChevronUp, IconChevronDown, IconX } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import StatusToggle from './StatusToggle';
import PageHeader from './PageHeader';


// Sample data for autocomplete options
const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Italy',
  'Spain', 'Australia', 'Japan', 'China', 'India', 'Brazil', 'Mexico'
];

const countryCodes = {
  'United States': 'us',
  'Canada': 'ca',
  'United Kingdom': 'gb',
  'Germany': 'de',
  'France': 'fr',
  'Italy': 'it',
  'Spain': 'es',
  'Australia': 'au',
  'Japan': 'jp',
  'China': 'cn',
  'India': 'in',
  'Brazil': 'br',
  'Mexico': 'mx'
};

const states = {
  'United States': ['California', 'New York', 'Texas', 'Florida', 'Illinois'],
  'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba'],
  'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  'Germany': ['Bavaria', 'Berlin', 'Hamburg', 'North Rhine-Westphalia', 'Baden-Württemberg'],
  'France': ['Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Rhône-Alpes', 'Nord-Pas-de-Calais'],
  'India': ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan'],
  'Italy': ['Lombardy', 'Lazio', 'Sicily', 'Veneto', 'Tuscany'],
  'Spain': ['Madrid', 'Catalonia', 'Andalusia', 'Valencia', 'Galicia'],
  'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia'],
  'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Hokkaido', 'Fukuoka'],
  'China': ['Guangdong', 'Jiangsu', 'Shandong', 'Zhejiang', 'Sichuan'],
  'Brazil': ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia', 'Paraná'],
  'Mexico': ['Mexico City', 'Jalisco', 'Nuevo León', 'Puebla', 'Guanajuato']
};

const cities = {
  'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
  'New York': ['New York City', 'Buffalo', 'Rochester', 'Syracuse'],
  'Ontario': ['Toronto', 'Ottawa', 'Hamilton', 'Kitchener'],
  'England': ['London', 'Manchester', 'Birmingham', 'Liverpool'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
  // Added cities for United States
  'Texas': ['Houston', 'San Antonio', 'Dallas', 'Austin'],
  'Florida': ['Jacksonville', 'Miami', 'Tampa', 'Orlando'],
  'Illinois': ['Chicago', 'Aurora', 'Naperville', 'Joliet'],
  // Added cities for Canada
  'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau'],
  'British Columbia': ['Vancouver', 'Surrey', 'Burnaby', 'Richmond'],
  'Alberta': ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge'],
  'Manitoba': ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson'],
  // Added cities for United Kingdom
  'Scotland': ['Glasgow', 'Edinburgh', 'Aberdeen', 'Dundee'],
  'Wales': ['Cardiff', 'Swansea', 'Newport', 'Wrexham'],
  'Northern Ireland': ['Belfast', 'Derry', 'Lisburn', 'Newry'],
  // Added cities for India
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner'],
  // Added cities for Germany
  'Bavaria': ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg'],
  'Berlin': ['Berlin', 'Potsdam', 'Cottbus', 'Frankfurt (Oder)'],
  'Hamburg': ['Hamburg', 'Bergedorf', 'Harburg', 'Altona'],
  'North Rhine-Westphalia': ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen'],
  'Baden-Württemberg': ['Stuttgart', 'Karlsruhe', 'Mannheim', 'Freiburg'],
  // Added cities for France
  'Île-de-France': ['Paris', 'Boulogne-Billancourt', 'Saint-Denis', 'Argenteuil'],
  'Provence-Alpes-Côte d\'Azur': ['Marseille', 'Nice', 'Toulon', 'Aix-en-Provence'],
  'Rhône-Alpes': ['Lyon', 'Saint-Étienne', 'Grenoble', 'Villeurbanne'],
  'Nord-Pas-de-Calais': ['Lille', 'Roubaix', 'Tourcoing', 'Calais'],
  // Added cities for new states
  'Lombardy': ['Milan', 'Bergamo', 'Brescia', 'Como'],
  'Lazio': ['Rome', 'Latina', 'Viterbo', 'Rieti'],
  'Madrid': ['Madrid', 'Alcalá de Henares', 'Getafe', 'Leganés'],
  'Catalonia': ['Barcelona', 'L\'Hospitalet de Llobregat', 'Badalona', 'Terrassa'],
  'New South Wales': ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast'],
  'Victoria': ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo'],
  'Tokyo': ['Shinjuku', 'Shibuya', 'Minato', 'Chiyoda'],
  'Guangdong': ['Guangzhou', 'Shenzhen', 'Dongguan', 'Foshan'],
  'São Paulo': ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo'],
  'Mexico City': ['Iztapalapa', 'Gustavo A. Madero', 'Álvaro Obregón', 'Tlalpan'],

  // Additional Cities for Italy
  'Sicily': ['Palermo', 'Catania', 'Messina', 'Syracuse'],
  'Veneto': ['Venice', 'Verona', 'Padua', 'Vicenza'],
  'Tuscany': ['Florence', 'Pisa', 'Siena', 'Lucca'],

  // Additional Cities for Spain
  'Andalusia': ['Seville', 'Málaga', 'Granada', 'Córdoba'],
  'Valencia': ['Valencia', 'Alicante', 'Elche', 'Castellón'],
  'Galicia': ['Vigo', 'A Coruña', 'Ourense', 'Lugo'],

  // Additional Cities for Australia
  'Queensland': ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Townsville'],
  'Western Australia': ['Perth', 'Bunbury', 'Geraldton', 'Kalgoorlie'],
  'South Australia': ['Adelaide', 'Mount Gambier', 'Whyalla', 'Gawler'],

  // Additional Cities for Japan
  'Osaka': ['Osaka', 'Sakai', 'Higashiosaka', 'Hirakata'],
  'Kyoto': ['Kyoto', 'Uji', 'Kameoka', 'Maizuru'],
  'Hokkaido': ['Sapporo', 'Asahikawa', 'Hakodate', 'Kushiro'],
  'Fukuoka': ['Fukuoka', 'Kitakyushu', 'Kurume', 'Omuta'],

  // Additional Cities for China
  'Jiangsu': ['Nanjing', 'Suzhou', 'Wuxi', 'Changzhou'],
  'Shandong': ['Qingdao', 'Jinan', 'Yantai', 'Weifang'],
  'Zhejiang': ['Hangzhou', 'Ningbo', 'Wenzhou', 'Shaoxing'],
  'Sichuan': ['Chengdu', 'Mianyang', 'Nanchong', 'Luzhou'],

  // Additional Cities for Brazil
  'Rio de Janeiro': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu'],
  'Minas Gerais': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora'],
  'Bahia': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari'],
  'Paraná': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa'],

  // Additional Cities for Mexico
  'Jalisco': ['Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tonalá'],
  'Nuevo León': ['Monterrey', 'Apodaca', 'Guadalupe', 'San Nicolás de los Garza'],
  'Puebla': ['Puebla', 'Tehuacán', 'Cholula', 'Atlixco'],
  'Guanajuato': ['León', 'Irapuato', 'Celaya', 'Salamanca']
};

const Nations = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const initialNations = [
    {
      _id: '1',
      name: 'Afghanistan',
      region: 'Asia',
      subRegion: 'Southern Asia',
      native: 'افغانستان',
      flag: 'https://flagcdn.com/w40/af.png',
      currency: 'AFN',
      currencyName: 'Afghan afghani',
      currencySymbol: '؋',
      latitude: 33,
      longitude: 65,
      status: true
    },
    {
      _id: '2',
      name: 'Italy',
      region: 'Europe',
      subRegion: 'Southern Europe',
      native: 'Italia',
      flag: 'https://flagcdn.com/w40/it.png',
      currency: 'EUR',
      currencyName: 'Euro',
      currencySymbol: '€',
      latitude: 41.8719,
      longitude: 12.5674,
      status: true
    },
    {
      _id: '3',
      name: 'United Kingdom',
      region: 'Europe',
      subRegion: 'Northern Europe',
      native: 'United Kingdom',
      flag: 'https://flagcdn.com/w40/gb.png',
      currency: 'GBP',
      currencyName: 'British pound',
      currencySymbol: '£',
      latitude: 54,
      longitude: -2,
      status: true
    },
    {
      _id: '4',
      name: 'Pakistan',
      region: 'Asia',
      subRegion: 'Southern Asia',
      native: 'Pakistan',
      flag: 'https://flagcdn.com/w40/pk.png',
      currency: 'PKR',
      currencyName: 'Pakistani rupee',
      currencySymbol: '₨',
      latitude: 30.3753,
      longitude: 69.3451,
      status: true
    },
    {
      _id: '5',
      name: 'Bhutan',
      region: 'Asia',
      subRegion: 'Southern Asia',
      native: 'ʼbrug-yul',
      flag: 'https://flagcdn.com/w40/bt.png',
      currency: 'BTN',
      currencyName: 'Bhutanese ngultrum',
      currencySymbol: 'Nu.',
      latitude: 27.5142,
      longitude: 90.4336,
      status: true
    },
    {
      _id: '6',
      name: 'France',
      region: 'Europe',
      subRegion: 'Western Europe',
      native: 'France',
      flag: 'https://flagcdn.com/w40/fr.png',
      currency: 'EUR',
      currencyName: 'Euro',
      currencySymbol: '€',
      latitude: 46.2276,
      longitude: 2.2137,
      status: true
    },
    {
      _id: '7',
      name: 'India',
      region: 'Asia',
      subRegion: 'Southern Asia',
      native: 'भारत',
      flag: 'https://flagcdn.com/w40/in.png',
      currency: 'INR',
      currencyName: 'Indian rupee',
      currencySymbol: '₹',
      latitude: 20.5937,
      longitude: 78.9629,
      status: true
    },
    {
      _id: '8',
      name: 'Canada',
      region: 'Americas',
      subRegion: 'Northern America',
      native: 'Canada',
      flag: 'https://flagcdn.com/w40/ca.png',
      currency: 'CAD',
      currencyName: 'Canadian dollar',
      currencySymbol: '$',
      latitude: 56.1304,
      longitude: -106.3468,
      status: true
    }
  ];

  const [nations, setNations] = useState(() => {
    const savedNations = localStorage.getItem('nations_data');
    let loadedNations = [];
    if (savedNations) {
      try {
        const parsed = JSON.parse(savedNations);
        loadedNations = parsed.map((nation, idx) => ({
          ...nation,
          _id: nation._id || `migrated-${nation.name}-${idx}`,
          status: nation.isDeleted ? true : (nation.status !== false ? true : false),
          isDeleted: false, // Restore deleted items on refresh
          flag: countryCodes[nation.name] ? `https://flagcdn.com/w40/${countryCodes[nation.name]}.png` : nation.flag
        }));
      } catch (e) {
        console.error("Error parsing nations_data", e);
        loadedNations = initialNations;
      }
    } else {
      loadedNations = initialNations;
    }

    // Ensure all initial nations are present (especially Canada)
    const initialNationsMap = new Map(initialNations.map(n => [n.name, n]));
    const loadedNationsMap = new Map(loadedNations.map(n => [n.name, n]));

    initialNations.forEach(nation => {
      if (!loadedNationsMap.has(nation.name)) {
        loadedNations.push(nation);
      }
    });

    return loadedNations;
  });

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [countryError, setCountryError] = useState(false);
  const [countryErrorMessage, setCountryErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedNation, setSelectedNation] = useState(null);

  // Save nations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('nations_data', JSON.stringify(nations.filter(n => !n.isTemporary)));
  }, [nations]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [nationToDelete, setNationToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!nationToDelete) return;

    setIsDeleting(true);

    // Soft delete: mark as deleted instead of removing
    const newList = nations.map(item =>
      item._id === nationToDelete._id
        ? { ...item, isDeleted: true, status: false }
        : item
    );

    setNations(newList);

    setOpenDeleteDialog(false);
    setNationToDelete(null);
    toast.success('Nation deleted successfully');
    setIsDeleting(false);
  };





  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const getVisibleNations = () => {
    // If no sort column is selected, return the list in its current order (insertion order)
    if (!sortColumn) {
      return nations.filter(n => !n.isDeleted);
    }

    const sorted = [...nations].sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    // Filter out deleted items
    return sorted.filter(n => !n.isDeleted);
  };

  const handleOpenAddDialog = () => setOpenAddDialog(true);

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setSelectedCountry(null);
    setSelectedState(null);
    setSelectedCity(null);
    setCountryError(false);
    setCountryErrorMessage('');
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedNation(null);
  };

  const handleCreateNation = () => {
    // Validation
    if (!selectedCountry) {
      setCountryError(true);
      setCountryErrorMessage('Please select a country');
      toast.error('Please select a country');
      return;
    }

    // Simulate successful creation
    const newNation = {
      _id: Date.now().toString(),
      name: selectedCountry,
      region: 'Custom',
      subRegion: selectedState || 'N/A',
      native: selectedCountry,
      flag: `https://flagcdn.com/w40/${countryCodes[selectedCountry] || 'un'}.png`,
      currency: 'USD',
      currencyName: 'US Dollar',
      currencySymbol: '$',
      latitude: 0,
      longitude: 0,
      status: true,
      isTemporary: true
    };

    // Add to nations list (prepend to show at top)
    setNations(prev => [newNation, ...prev]);

    // Show success message
    toast.success('Country created successfully!');

    // Close dialog
    handleCloseAddDialog();
  };

  // Get states based on selected country
  const getStatesForCountry = (country) => {
    return states[country] || [];
  };

  // Get cities based on selected state
  const getCitiesForState = (state) => {
    return cities[state] || [];
  };

  const visibleNations = getVisibleNations();
  const totalPages = Math.ceil(visibleNations.length / entriesPerPage);

  // Auto-pagination: If current page is empty and we're not on the first page, go back
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [visibleNations.length, totalPages, currentPage]);

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const displayedNations = visibleNations.slice(startIndex, endIndex);

  useLayoutDetails({ title: "Nations" });

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader title="Nations" subtitle="Manage and monitor all nations" />
        <Button variant="contained" color="error" startIcon={<IconPlus />} onClick={handleOpenAddDialog}>
          Add Nation
        </Button>
      </div>

      <Box sx={{ width: '100%' }}>

        <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: 'none', margin: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', select: 'none' }} onClick={() => handleSort('name')}>
                      NAME
                      {sortColumn === 'name' && (
                        sortDirection === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', select: 'none' }} onClick={() => handleSort('region')}>
                      REGION
                      {sortColumn === 'region' && (
                        sortDirection === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', select: 'none' }} onClick={() => handleSort('subRegion')}>
                      SUB-REGION
                      {sortColumn === 'subRegion' && (
                        sortDirection === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', select: 'none' }} onClick={() => handleSort('native')}>
                      NATIVE
                      {sortColumn === 'native' && (
                        sortDirection === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>FLAG</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', select: 'none' }} onClick={() => handleSort('currency')}>
                      CURRENCY
                      {sortColumn === 'currency' && (
                        sortDirection === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', select: 'none' }} onClick={() => handleSort('currencySymbol')}>
                      SYMBOL
                      {sortColumn === 'currencySymbol' && (
                        sortDirection === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedNations.map((nation, index) => (
                  <TableRow key={index} sx={{
                    opacity: nation.status ? 1 : 0.6,
                    filter: nation.status ? 'none' : 'grayscale(0.5)',
                    transition: 'opacity 0.3s ease, filter 0.3s ease',
                    backgroundColor: nation.status ? 'inherit' : '#fcfcfc'
                  }}>
                    <TableCell>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {nation.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {nation.region}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {nation.subRegion}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {nation.native}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <img
                        alt={`${nation.name} flag`}
                        width="32"
                        height="24"
                        src={nation.flag}
                        style={{ borderRadius: 3, objectFit: 'cover' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {nation.currency}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {nation.currencySymbol}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <StatusToggle
                        currentStatus={nation.status}
                        onToggle={async (newStatus) => {
                          await new Promise(resolve => setTimeout(resolve, 500));
                          setNations(prev => prev.map(n => n._id === nation._id ? { ...n, status: newStatus === 'active' } : n));
                        }}
                        activeStatus="active"
                        inactiveStatus="inactive"
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          aria-label="View Details"
                          onClick={() => {
                            setSelectedNation(nation);
                            setOpenDetailsDialog(true);
                          }}
                          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' } }}
                        >
                          <IconEye size={18} />
                        </IconButton>
                        <IconButton
                          aria-label="Delete Nation"
                          onClick={() => {
                            setNationToDelete(nation);
                            setOpenDeleteDialog(true);
                          }}
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
              <div>
                Showing {startIndex + 1} to {Math.min(endIndex, visibleNations.length)} of {visibleNations.length} entries
              </div>
            </div>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
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

        <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
            Create Country
            <IconButton onClick={handleCloseAddDialog} size="small">
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Autocomplete
                options={countries}
                value={selectedCountry}
                onChange={(event, newValue) => {
                  setSelectedCountry(newValue);
                  setSelectedState(null); // Reset state when country changes
                  setSelectedCity(null); // Reset city when country changes
                  setCountryError(false); // Clear error when user selects a country
                  setCountryErrorMessage('');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    color="error"
                    label="Country"
                    placeholder="Select a country"
                    error={countryError}
                    helperText={countryErrorMessage}
                  />
                )}
                freeSolo
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
              <Autocomplete
                options={selectedCountry ? getStatesForCountry(selectedCountry) : []}
                value={selectedState}
                onChange={(event, newValue) => {
                  setSelectedState(newValue);
                  setSelectedCity(null); // Reset city when state changes
                }}
                disabled={!selectedCountry}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    color="error"
                    label="States"
                    placeholder={selectedCountry ? "Select a state" : "Select country first"}
                  />
                )}
                freeSolo
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
              <Autocomplete
                options={selectedState ? getCitiesForState(selectedState) : []}
                value={selectedCity}
                onChange={(event, newValue) => {
                  setSelectedCity(newValue);
                }}
                disabled={!selectedState}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    color="error"
                    label="Cities"
                    placeholder={selectedState ? "Select a city" : "Select states first"}
                  />
                )}
                freeSolo
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
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, pt: 2, gap: 1 }}>
            <Button onClick={handleCloseAddDialog} variant="tonal" color="error">
              Cancel
            </Button>
            <Button onClick={handleCreateNation} variant="contained" color="error">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Country Details
            <IconButton onClick={handleCloseDetailsDialog}>
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {selectedNation && (
              <Box>
                <TextField
                  variant="outlined"
                  color="error"
                  label="Country Name"
                  value={selectedNation.name}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  variant="outlined"
                  color="error"
                  label="Native Name"
                  value={selectedNation.native}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  variant="outlined"
                  color="error"
                  label="Region"
                  value={selectedNation.region}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  variant="outlined"
                  color="error"
                  label="Subregion"
                  value={selectedNation.subRegion}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  variant="outlined"
                  color="error"
                  label="Latitude"
                  value={selectedNation.latitude}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  variant="outlined"
                  color="error"
                  label="Longitude"
                  value={selectedNation.longitude}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  variant="outlined"
                  color="error"
                  label="Currency Code"
                  value={selectedNation.currency}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  variant="outlined"
                  color="error"
                  label="Currency Name"
                  value={selectedNation.currencyName}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  variant="outlined"
                  color="error"
                  label="Currency Symbol"
                  value={selectedNation.currencySymbol}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                  sx={{ mb: 2 }}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleCloseDetailsDialog} variant="contained" color="error">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDeleteDialog} onClose={() => !isDeleting && setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 1, pt: 3 }}>
            <Box sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)', p: 1.5, borderRadius: '50%', mb: 2 }}>
              <IconTrash size={32} color="#e74c3c" />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Delete Nation</Typography>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
            <Typography variant="body1">Are you sure you want to delete <strong>{nationToDelete?.name}</strong>?</Typography>
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

export default Nations;
