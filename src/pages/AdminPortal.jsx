import React, { useState, useMemo } from 'react';
import { useCatering } from '../context/CateringContext';
import { MENU_GROUPS } from '../data/cateringMenuData';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  Package, 
  ShoppingBag, 
  Image as ImageIcon, 
  Inbox, 
  RotateCcw, 
  ArrowLeft, 
  Phone, 
  CheckCircle2,
  BookOpen,
  Wine,
  Utensils,
  Soup,
  IceCream,
  Search,
  MessageCircle,
  Calendar,
  Users,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
  ExternalLink,
  Filter
} from 'lucide-react';

export const AdminPortal = () => {
  const { 
    setIsAdminMode,
    adminAuth, 
    setAdminAuth,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    addDishToCategory,
    updateDishInCategory,
    deleteDishFromCategory,
    resetCategoriesToDefault,
    packages, 
    addPackage, 
    updatePackage, 
    deletePackage,
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    gallery, 
    addGalleryItem, 
    updateGalleryItem, 
    deleteGalleryItem,
    inquiries, 
    updateInquiryStatus, 
    deleteInquiry,
    resetToFactoryDefaults
  } = useCatering();

  const [adminTab, setAdminTab] = useState('orders'); // 'orders' | 'categories' | 'packages' | 'products' | 'gallery' | 'settings'
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  const [notice, setNotice] = useState(null);
  const showNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  // ─── Orders / Inquiries Tracker State ────────────────────────────────
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');

  const filteredOrders = useMemo(() => {
    let list = inquiries || [];
    if (orderStatusFilter !== 'all') {
      list = list.filter(inq => (inq.status || 'New') === orderStatusFilter);
    }
    if (orderSearch.trim().length > 0) {
      const q = orderSearch.toLowerCase().trim();
      list = list.filter(inq => 
        (inq.name && inq.name.toLowerCase().includes(q)) ||
        (inq.phone && inq.phone.toLowerCase().includes(q)) ||
        (inq.eventType && inq.eventType.toLowerCase().includes(q)) ||
        (inq.selectedPackage && inq.selectedPackage.toLowerCase().includes(q)) ||
        (inq.id && inq.id.toLowerCase().includes(q))
      );
    }
    return list;
  }, [inquiries, orderStatusFilter, orderSearch]);

  const orderStats = useMemo(() => {
    const list = inquiries || [];
    const total = list.length;
    const newLeads = list.filter(i => (i.status || 'New') === 'New').length;
    const contacted = list.filter(i => i.status === 'Contacted').length;
    const confirmed = list.filter(i => i.status === 'Confirmed').length;
    const totalPlates = list.reduce((sum, i) => sum + (parseInt(i.guestCount) || 0), 0);
    return { total, newLeads, contacted, confirmed, totalPlates };
  }, [inquiries]);

  // ─── Categories & Options State ─────────────────────────────────────
  const [catSearch, setCatSearch] = useState('');
  const [catGroupFilter, setCatGroupFilter] = useState('all');
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editingCatId, setEditingCatId] = useState(null);
  const [catForm, setCatForm] = useState({
    name: '',
    group: 'starters',
    page: 'Page 2',
    description: '',
    image: ''
  });

  const [expandedCategories, setExpandedCategories] = useState({});
  const [newDishInputs, setNewDishInputs] = useState({});
  const [editingDish, setEditingDish] = useState(null); // { catId, oldName }
  const [editingDishValue, setEditingDishValue] = useState('');

  const totalDishesCount = useMemo(() => {
    return (categories || []).reduce((sum, cat) => sum + (cat.items?.length || 0), 0);
  }, [categories]);

  const filteredCategoriesList = useMemo(() => {
    let list = categories || [];
    if (catGroupFilter !== 'all') {
      list = list.filter(c => c.group === catGroupFilter);
    }
    if (catSearch.trim().length > 0) {
      const q = catSearch.toLowerCase().trim();
      list = list.filter(c => 
        c.name.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q)) ||
        (c.items && c.items.some(dish => dish.toLowerCase().includes(q)))
      );
    }
    return list;
  }, [categories, catGroupFilter, catSearch]);

  // Category Actions
  const handleOpenAddCategory = () => {
    setEditingCatId(null);
    setCatForm({
      name: '',
      group: 'starters',
      page: 'Page Custom',
      description: '',
      image: ''
    });
    setCatModalOpen(true);
  };

  const handleOpenEditCategory = (cat) => {
    setEditingCatId(cat.id);
    setCatForm({
      name: cat.name,
      group: cat.group || 'starters',
      page: cat.page || 'Page Custom',
      description: cat.description || '',
      image: cat.image || ''
    });
    setCatModalOpen(true);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!catForm.name.trim()) {
      showNotice('Please enter a category name');
      return;
    }

    if (editingCatId) {
      updateCategory(editingCatId, catForm);
      showNotice(`Updated category "${catForm.name}" successfully!`);
    } else {
      addCategory(catForm);
      showNotice(`Added new category "${catForm.name}"!`);
    }
    setCatModalOpen(false);
  };

  const handleDeleteCategory = (cat) => {
    if (window.confirm(`Are you sure you want to delete category "${cat.name}" and its ${cat.items?.length || 0} dishes? This will update the website immediately.`)) {
      deleteCategory(cat.id);
      showNotice(`Category "${cat.name}" deleted.`);
    }
  };

  // Dish Actions inside Category
  const handleAddDish = (catId) => {
    const dishName = newDishInputs[catId]?.trim();
    if (!dishName) return;

    addDishToCategory(catId, dishName);
    setNewDishInputs(prev => ({ ...prev, [catId]: '' }));
    showNotice(`Added "${dishName}"! (Reflected on user page)`);
  };

  const handleSaveEditDish = (catId, oldName) => {
    const trimmed = editingDishValue.trim();
    if (!trimmed) {
      showNotice('Dish name cannot be empty');
      return;
    }
    updateDishInCategory(catId, oldName, trimmed);
    setEditingDish(null);
    setEditingDishValue('');
    showNotice(`Dish updated to "${trimmed}"!`);
  };

  const handleDeleteDish = (catId, dishName) => {
    if (window.confirm(`Remove "${dishName}" from this category?`)) {
      deleteDishFromCategory(catId, dishName);
      showNotice(`Removed "${dishName}".`);
    }
  };

  // ─── Modal / Form state for Package ───────────────────────────────────
  const [pkgModalOpen, setPkgModalOpen] = useState(false);
  const [editingPkgId, setEditingPkgId] = useState(null);
  const [pkgForm, setPkgForm] = useState({
    name: '',
    subtitle: '',
    pricePerPlate: 450,
    minGuests: 100,
    popular: false,
    tag: '',
    image: '',
    description: '',
    welcomeDrinksStr: '',
    startersStr: '',
    mainCourseStr: '',
    sweetsStr: ''
  });

  // Modal / Form state for Product
  const [prodModalOpen, setProdModalOpen] = useState(false);
  const [editingProdId, setEditingProdId] = useState(null);
  const [prodForm, setProdForm] = useState({
    name: '',
    category: 'Signature Sweets',
    price: 350,
    weightsStr: '250g, 500g, 1kg',
    rating: 5.0,
    image: '',
    description: '',
    badge: 'Artisanal Batch',
    inStock: true
  });

  // Modal / Form state for Gallery
  const [galModalOpen, setGalModalOpen] = useState(false);
  const [editingGalId, setEditingGalId] = useState(null);
  const [galForm, setGalForm] = useState({
    title: '',
    category: 'Weddings',
    year: '2024',
    location: '',
    guests: '',
    image: '',
    description: ''
  });

  const handleLogin = (e) => {
    e?.preventDefault();
    if (passcode.trim() === 'admin123' || passcode.trim() === 'ishwar' || passcode.trim() === 'southdelicious') {
      setAdminAuth(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setAdminAuth(false);
    setIsAdminMode(false);
    window.location.hash = '';
  };

  // ─── LOGIN GATE SCREEN ────────────────────────────────────────────────
  if (!adminAuth) {
    return (
      <div className="min-h-screen bg-[#071224] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#dfc17b]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-md w-full bg-[#0b1a30] text-[#fcfaf6] border-2 border-[#dfc17b] rounded-3xl p-8 shadow-2xl space-y-6 text-center">
          
          <div className="w-20 h-20 rounded-full border-2 border-[#dfc17b] mx-auto overflow-hidden shadow-xl bg-white flex items-center justify-center ring-2 ring-[#dfc17b]/40">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover scale-105" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#f3e9d2] font-bold">Secure Management Suite</span>
            <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#fcfaf6]">
              Admin Control Center
            </h2>
            <p className="text-xs text-stone-300">
              South Delicious Catering • Orders, Categories & Menu Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-xs uppercase tracking-wider text-stone-200 font-bold flex items-center justify-between">
                <span>Admin Passcode</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter admin passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-[#fcfaf6] border-2 border-[#dfc17b] rounded-xl px-4 py-3 text-sm text-[#0b1a30] placeholder-stone-500 font-bold focus:outline-none shadow-inner"
                />
                <Lock className="w-4 h-4 text-[#8e7235] absolute right-3.5 top-3.5" />
              </div>
            </div>

            {authError && (
              <div className="text-xs text-red-200 bg-red-900/60 p-2.5 rounded-lg border border-red-500">
                Invalid passcode. Please check your credentials and try again.
              </div>
            )}

            <button
              type="submit"
              className="w-full gold-button-gradient font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-xs uppercase tracking-wider cursor-pointer text-[#0b1a30]"
            >
              Sign In to Admin Portal
            </button>
          </form>

          {/* Navigation link to website */}
          <div className="pt-3 border-t border-[#dfc17b]/20">
            <button
              onClick={() => {
                setPasscode('');
                setAuthError(false);
                setAdminAuth(false);
                setIsAdminMode(false);
                window.location.hash = '';
              }}
              className="text-xs text-stone-300 hover:text-white flex items-center justify-center gap-1.5 mx-auto pt-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED ADMIN DASHBOARD ────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#fcfaf6] text-[#0b1a30] flex flex-col justify-between">
      
      {/* Toast Alert Notice */}
      {notice && (
        <div className="fixed top-5 right-5 z-50 bg-[#0b1a30] border-2 border-[#dfc17b] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#dfc17b]" />
          <span className="text-sm font-semibold">{notice}</span>
        </div>
      )}

      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0b1a30] text-[#fcfaf6] border-b-2 border-[#dfc17b]/60 shadow-xl px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border-2 border-[#dfc17b] overflow-hidden shadow bg-white flex items-center justify-center ring-1 ring-[#dfc17b]/40">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover scale-105" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-royal text-lg font-bold text-[#fcfaf6]">
                  South Delicious Catering
                </span>
                <span className="bg-[#dfc17b] text-[#0b1a30] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase shadow">
                  Admin Center
                </span>
              </div>
              <p className="text-[11px] text-[#f3e9d2] hidden sm:block">
                Real-Time Menu, Category & Customer Order Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setAdminAuth(false);
                setIsAdminMode(false);
                window.location.hash = '';
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-[#fcfaf6] border border-[#dfc17b]/40 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#dfc17b]" />
              <span>View Live Website</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-stone-300 hover:text-red-400 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              title="Lock / Logout"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex-1 space-y-8">
        
        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-[#dfc17b]/30 pb-4">
          
          {/* 1. Customer Orders & Inquiries */}
          <button
            onClick={() => setAdminTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              adminTab === 'orders'
                ? 'bg-[#0b1a30] text-[#dfc17b] border-2 border-[#dfc17b] shadow-md'
                : 'bg-white text-stone-700 hover:text-[#0b1a30] border border-stone-200'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Track Orders & Inquiries ({inquiries?.length || 0})</span>
            {orderStats.newLeads > 0 && (
              <span className="bg-[#dfc17b] text-[#0b1a30] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {orderStats.newLeads} New
              </span>
            )}
          </button>

          {/* 2. Menu Categories & Options */}
          <button
            onClick={() => setAdminTab('categories')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              adminTab === 'categories'
                ? 'bg-[#0b1a30] text-[#dfc17b] border-2 border-[#dfc17b] shadow-md'
                : 'bg-white text-stone-700 hover:text-[#0b1a30] border border-stone-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categories & Options ({categories?.length || 0})</span>
          </button>

          {/* 3. Packages */}
          <button
            onClick={() => setAdminTab('packages')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              adminTab === 'packages'
                ? 'bg-[#0b1a30] text-[#dfc17b] border-2 border-[#dfc17b] shadow-md'
                : 'bg-white text-stone-700 hover:text-[#0b1a30] border border-stone-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Packages ({packages.length})</span>
          </button>

          {/* 4. Products */}
          <button
            onClick={() => setAdminTab('products')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              adminTab === 'products'
                ? 'bg-[#0b1a30] text-[#dfc17b] border-2 border-[#dfc17b] shadow-md'
                : 'bg-white text-stone-700 hover:text-[#0b1a30] border border-stone-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pantry Products ({products.length})</span>
          </button>

          {/* 5. Gallery */}
          <button
            onClick={() => setAdminTab('gallery')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              adminTab === 'gallery'
                ? 'bg-[#0b1a30] text-[#dfc17b] border-2 border-[#dfc17b] shadow-md'
                : 'bg-white text-stone-700 hover:text-[#0b1a30] border border-stone-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery ({gallery.length})</span>
          </button>

          {/* 6. Settings */}
          <button
            onClick={() => setAdminTab('settings')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              adminTab === 'settings'
                ? 'bg-[#0b1a30] text-[#dfc17b] border-2 border-[#dfc17b] shadow-md'
                : 'bg-white text-stone-700 hover:text-[#0b1a30] border border-stone-200'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* TAB 1: TRACK CUSTOMER ORDERS & INQUIRIES                        */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {adminTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header & Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border-2 border-[#dfc17b]/40 shadow-sm">
                <div className="text-xs uppercase tracking-wider text-stone-500 font-bold">Total Orders / Inquiries</div>
                <div className="font-royal text-3xl font-extrabold text-[#0b1a30] mt-1">{orderStats.total}</div>
                <div className="text-[11px] text-stone-500 mt-1">Logged from website</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border-2 border-amber-300 shadow-sm">
                <div className="text-xs uppercase tracking-wider text-amber-700 font-bold">New Leads Pending</div>
                <div className="font-royal text-3xl font-extrabold text-amber-600 mt-1">{orderStats.newLeads}</div>
                <div className="text-[11px] text-stone-500 mt-1">Requires follow-up</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border-2 border-green-300 shadow-sm">
                <div className="text-xs uppercase tracking-wider text-green-700 font-bold">Confirmed Bookings</div>
                <div className="font-royal text-3xl font-extrabold text-green-700 mt-1">{orderStats.confirmed}</div>
                <div className="text-[11px] text-stone-500 mt-1">Ready for catering</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border-2 border-[#dfc17b]/40 shadow-sm">
                <div className="text-xs uppercase tracking-wider text-stone-500 font-bold">Estimated Plates</div>
                <div className="font-royal text-3xl font-extrabold text-[#0b1a30] mt-1">{orderStats.totalPlates.toLocaleString()}</div>
                <div className="text-[11px] text-stone-500 mt-1">Total banquet volume</div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search customer, phone, occasion..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#fcfaf6] border border-stone-300 rounded-xl text-xs text-[#0b1a30] focus:outline-none focus:border-[#dfc17b]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                {['all', 'New', 'Contacted', 'Confirmed', 'Completed', 'Archived'].map(status => (
                  <button
                    key={status}
                    onClick={() => setOrderStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      orderStatusFilter === status
                        ? 'bg-[#0b1a30] text-[#dfc17b] border border-[#dfc17b]'
                        : 'bg-[#fcfaf6] text-stone-700 hover:text-[#0b1a30] border border-stone-200'
                    }`}
                  >
                    {status === 'all' ? `All (${orderStats.total})` : status}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-stone-300 text-stone-500 space-y-2">
                <Inbox className="w-12 h-12 mx-auto text-[#dfc17b]" />
                <h4 className="font-royal text-lg font-bold text-[#0b1a30]">No customer orders found</h4>
                <p className="text-xs text-stone-500">When visitors request catering quotes or custom packages on the website, they appear here in real-time.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((inq) => {
                  const cleanPhone = inq.phone ? inq.phone.replace(/[^0-9]/g, '') : '';
                  const statusColor = 
                    inq.status === 'Confirmed' ? 'bg-green-100 text-green-800 border-green-300' :
                    inq.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                    inq.status === 'Contacted' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                    inq.status === 'Archived' ? 'bg-stone-100 text-stone-600 border-stone-300' :
                    'bg-amber-100 text-amber-800 border-amber-300';

                  return (
                    <div 
                      key={inq.id}
                      className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-[#dfc17b]/40 shadow-sm hover:shadow-md transition-all space-y-4"
                    >
                      {/* Top Bar: Name, Status, Date & Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h4 className="font-royal text-lg font-bold text-[#0b1a30]">{inq.name}</h4>
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusColor}`}>
                              {inq.status || 'New Lead'}
                            </span>
                            <span className="text-xs text-stone-400 font-mono">#{inq.id}</span>
                          </div>

                          <div className="text-xs text-stone-600 flex flex-wrap items-center gap-3 mt-1.5 font-medium">
                            <span className="flex items-center gap-1 font-bold text-[#0b1a30]">
                              <Phone className="w-3.5 h-3.5 text-[#8e7235]" />
                              <a href={`tel:${inq.phone}`} className="hover:underline">{inq.phone}</a>
                            </span>
                            {inq.email && <span>{inq.email}</span>}
                            <span>Received: {inq.date}</span>
                          </div>
                        </div>

                        {/* Status Updater Dropdown & Delete */}
                        <div className="flex items-center gap-2 shrink-0">
                          <select
                            value={inq.status || 'New'}
                            onChange={(e) => {
                              updateInquiryStatus(inq.id, e.target.value);
                              showNotice(`Order #${inq.id} status updated to "${e.target.value}"`);
                            }}
                            className="bg-[#fcfaf6] text-xs text-[#0b1a30] font-bold border-2 border-[#dfc17b] rounded-xl px-3 py-1.5 focus:outline-none shadow-xs cursor-pointer"
                          >
                            <option value="New">Status: New Lead</option>
                            <option value="Contacted">Status: Contacted</option>
                            <option value="Confirmed">Status: Confirmed</option>
                            <option value="Completed">Status: Completed</option>
                            <option value="Archived">Status: Archived</option>
                          </select>

                          {cleanPhone && (
                            <a
                              href={`https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(`Hello ${inq.name}! This is South Delicious Catering regarding your catering inquiry for ${inq.eventType}.`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl shadow-xs transition-colors"
                              title="Chat with Customer on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          )}

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete order #${inq.id} for ${inq.name}?`)) {
                                deleteInquiry(inq.id);
                                showNotice('Order record deleted.');
                              }
                            }}
                            className="p-2 text-stone-400 hover:text-red-500 bg-stone-100 rounded-xl cursor-pointer transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Event Overview Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#fcfaf6] p-3.5 rounded-xl border border-stone-200/80 text-xs">
                        <div>
                          <span className="text-stone-400 font-semibold block text-[10px] uppercase">Occasion</span>
                          <span className="text-[#0b1a30] font-bold">{inq.eventType}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 font-semibold block text-[10px] uppercase">Package</span>
                          <span className="text-[#0b1a30] font-bold">{inq.selectedPackage}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 font-semibold block text-[10px] uppercase">Guest Count</span>
                          <span className="text-[#0b1a30] font-bold">{inq.guestCount} Plates</span>
                        </div>
                        <div>
                          <span className="text-stone-400 font-semibold block text-[10px] uppercase">Event Date</span>
                          <span className="text-[#0b1a30] font-bold">{inq.eventDate || 'Not specified'}</span>
                        </div>
                      </div>

                      {/* Special Notes */}
                      {inq.notes && (
                        <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-xs text-amber-900">
                          <strong className="text-amber-800">Customer Requirements:</strong> {inq.notes}
                        </div>
                      )}

                      {/* Custom Tailored Dishes Picked by Customer */}
                      {inq.customDishes && inq.customDishes.length > 0 && (
                        <div className="bg-[#f9f4ea] p-3.5 rounded-xl border border-[#dfc17b]/60 space-y-2">
                          <div className="text-xs font-bold text-[#0b1a30] flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#8e7235]" />
                              <span>Custom Menu Selection ({inq.customDishes.length} dishes chosen):</span>
                            </span>
                            <span className="text-[10px] text-stone-500 font-normal">Pure Veg Feasts</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                            {inq.customDishes.map((dish, dIdx) => (
                              <span key={dIdx} className="text-[11px] bg-white border border-[#dfc17b]/70 px-2.5 py-0.5 rounded-full text-[#0b1a30] font-medium shadow-2xs">
                                {dish.name || dish} {dish.category && <span className="text-stone-400 text-[10px]">({dish.category})</span>}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* TAB 2: MANAGE MENU CATEGORIES & OPTIONS (DISHES)                 */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {adminTab === 'categories' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header & Category Actions */}
            <div className="bg-white rounded-3xl border-2 border-[#dfc17b]/50 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b1a30] text-[#dfc17b] text-xs font-bold uppercase tracking-wider mb-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Live Website Menu • {categories?.length || 0} Categories • {totalDishesCount} Total Options</span>
                  </div>
                  <h3 className="font-royal text-2xl font-bold text-[#0b1a30]">
                    Menu Categories & Dish Options Manager
                  </h3>
                  <p className="text-xs text-stone-600 max-w-2xl">
                    Add new categories, edit names or photos, delete categories, and add/edit/delete dishes inside each category. Any change here <strong>instantly updates the live user website</strong> in real-time!
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={handleOpenAddCategory}
                    className="gold-button-gradient font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer text-[#0b1a30]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Category</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Reset all categories and dishes back to the original 33 factory authentic menu categories? Custom items will be replaced.')) {
                        resetCategoriesToDefault();
                        showNotice('Restored original 33 categories!');
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#0b1a30] bg-[#fcfaf6] hover:bg-[#ede1c7] border border-[#dfc17b] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title="Restore Original Categories"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#8e7235]" />
                    <span className="hidden sm:inline">Reset Defaults</span>
                  </button>
                </div>
              </div>

              {/* Search & Group Filter */}
              <div className="pt-2 border-t border-stone-200/80 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search category or dish name..."
                    value={catSearch}
                    onChange={(e) => setCatSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#fcfaf6] border border-stone-300 rounded-xl text-xs text-[#0b1a30] focus:outline-none focus:border-[#dfc17b]"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 w-full md:w-auto no-scrollbar">
                  {MENU_GROUPS.map(g => (
                    <button
                      key={g.id}
                      onClick={() => setCatGroupFilter(g.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        catGroupFilter === g.id
                          ? 'bg-[#0b1a30] text-[#dfc17b] border border-[#dfc17b]'
                          : 'bg-[#fcfaf6] text-stone-700 hover:text-[#0b1a30] border border-stone-200'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Categories List with Nested Dish Management */}
            <div className="space-y-4">
              {filteredCategoriesList.map((cat) => {
                const isExpanded = expandedCategories[cat.id] ?? false;
                const draftDish = newDishInputs[cat.id] || '';

                return (
                  <div 
                    key={cat.id}
                    className="bg-white rounded-2xl border-2 border-[#dfc17b]/40 shadow-sm overflow-hidden transition-all"
                  >
                    {/* Category Top Banner */}
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-white to-[#fcfaf6]">
                      
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Category Thumbnail */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-[#dfc17b]/60 bg-stone-100 shrink-0 shadow-xs">
                          <img 
                            src={cat.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80'} 
                            alt={cat.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-royal text-base sm:text-lg font-bold text-[#0b1a30] truncate">
                              {cat.name}
                            </h4>
                            <span className="px-2 py-0.5 rounded-full bg-[#0b1a30] text-[#dfc17b] text-[10px] font-extrabold shrink-0">
                              {cat.items?.length || 0} Dishes
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-500">
                            <span className="font-semibold text-[#8e7235]">{cat.group}</span>
                            <span>•</span>
                            <span>{cat.page || 'Menu Book'}</span>
                          </div>

                          <p className="text-xs text-stone-600 line-clamp-1 mt-1">
                            {cat.description || 'Authentic pure vegetarian culinary delicacies.'}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenEditCategory(cat)}
                          className="px-3 py-1.5 rounded-xl border border-[#dfc17b] text-xs font-bold text-[#0b1a30] hover:bg-[#f6f1e5] transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#8e7235]" />
                          <span>Edit Category</span>
                        </button>

                        <button
                          onClick={() => handleDeleteCategory(cat)}
                          className="p-2 text-stone-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setExpandedCategories(prev => ({ ...prev, [cat.id]: !isExpanded }))}
                          className="px-3 py-1.5 rounded-xl bg-[#0b1a30] hover:bg-[#132a48] text-[#dfc17b] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide Options' : 'Manage Options'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                    </div>

                    {/* Expandable Options / Dishes Section */}
                    {isExpanded && (
                      <div className="p-4 sm:p-6 bg-[#fcfaf6] border-t border-[#dfc17b]/30 space-y-4 animate-fadeIn">
                        
                        {/* Quick Add New Dish Form */}
                        <div className="flex items-center gap-2 max-w-xl">
                          <input
                            type="text"
                            placeholder={`Add new dish to "${cat.name}"...`}
                            value={draftDish}
                            onChange={(e) => setNewDishInputs(prev => ({ ...prev, [cat.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleAddDish(cat.id);
                            }}
                            className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-[#dfc17b]/60 text-xs text-[#0b1a30] focus:outline-none focus:border-[#dfc17b] shadow-xs"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddDish(cat.id)}
                            className="gold-button-gradient px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer text-[#0b1a30]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Option</span>
                          </button>
                        </div>

                        {/* List of Dishes / Options in this category */}
                        {cat.items?.length === 0 ? (
                          <div className="text-center py-6 text-xs text-stone-400">
                            No dishes in this category yet. Type a dish name above and click "Add Option".
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                            {cat.items.map((dish, dIdx) => {
                              const isEditing = editingDish?.catId === cat.id && editingDish?.oldName === dish;

                              return (
                                <div
                                  key={dIdx}
                                  className="bg-white p-2.5 rounded-xl border border-stone-200/90 hover:border-[#dfc17b] flex items-center justify-between gap-2 shadow-2xs transition-all"
                                >
                                  {isEditing ? (
                                    <div className="flex items-center gap-1.5 w-full">
                                      <input
                                        type="text"
                                        autoFocus
                                        value={editingDishValue}
                                        onChange={(e) => setEditingDishValue(e.target.value)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') handleSaveEditDish(cat.id, dish);
                                          if (e.key === 'Escape') setEditingDish(null);
                                        }}
                                        className="flex-1 px-2 py-1 text-xs border border-[#dfc17b] rounded-lg font-bold text-[#0b1a30] focus:outline-none"
                                      />
                                      <button
                                        onClick={() => handleSaveEditDish(cat.id, dish)}
                                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                                        title="Save"
                                      >
                                        <Check className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => setEditingDish(null)}
                                        className="p-1 text-stone-400 hover:bg-stone-100 rounded"
                                        title="Cancel"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="flex items-center gap-2 min-w-0">
                                        {/* Veg Symbol */}
                                        <div className="w-3.5 h-3.5 border border-green-600 p-[1.5px] flex items-center justify-center shrink-0 rounded-xs bg-white">
                                          <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                                        </div>
                                        <span className="text-xs font-semibold text-[#0b1a30] truncate">{dish}</span>
                                      </div>

                                      <div className="flex items-center gap-1 shrink-0">
                                        <button
                                          onClick={() => {
                                            setEditingDish({ catId: cat.id, oldName: dish });
                                            setEditingDishValue(dish);
                                          }}
                                          className="p-1 text-stone-400 hover:text-[#0b1a30] hover:bg-stone-50 rounded transition-colors"
                                          title={`Edit "${dish}"`}
                                        >
                                          <Edit3 className="w-3 h-3" />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteDish(cat.id, dish)}
                                          className="p-1 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                          title={`Delete "${dish}"`}
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* TAB 3: PACKAGES CRUD                                            */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {adminTab === 'packages' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-royal text-2xl font-bold text-[#0b1a30]">Banqueting Packages</h3>
                <p className="text-xs text-stone-600">
                  Manage fixed rate per-plate packages presented on the user home page.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingPkgId(null);
                  setPkgForm({
                    name: '',
                    subtitle: '',
                    pricePerPlate: 450,
                    minGuests: 100,
                    popular: false,
                    tag: '',
                    image: '',
                    description: ''
                  });
                  setPkgModalOpen(true);
                }}
                className="gold-button-gradient font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer text-[#0b1a30]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Package</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className="bg-white rounded-2xl border-2 border-[#dfc17b]/40 shadow-sm p-6 space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-royal text-xl font-bold text-[#0b1a30]">{pkg.name}</h4>
                      <p className="text-xs text-[#8e7235] font-bold mt-0.5">{pkg.subtitle}</p>
                    </div>
                    <span className="font-royal text-xl font-extrabold text-[#0b1a30] bg-[#f9f4ea] px-3 py-1 rounded-xl border border-[#dfc17b]/60 shrink-0">
                      ₹{pkg.pricePerPlate}/plate
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2">{pkg.description}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-200 text-xs">
                    <span className="text-stone-500 font-medium">Min: {pkg.minGuests} guests</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete package "${pkg.name}"?`)) {
                            deletePackage(pkg.id);
                            showNotice(`Deleted package "${pkg.name}".`);
                          }
                        }}
                        className="p-1.5 text-stone-400 hover:text-red-500"
                        title="Delete Package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* TAB 4: PRODUCTS CRUD                                            */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {adminTab === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-royal text-2xl font-bold text-[#0b1a30]">Artisanal Pantry Products</h3>
                <p className="text-xs text-stone-600">
                  Manage heritage sweets, gunpowders, filter coffee blends, and pickles.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProdId(null);
                  setProdForm({
                    name: '',
                    category: 'Signature Sweets',
                    price: 350,
                    weightsStr: '250g, 500g, 1kg',
                    rating: 5.0,
                    image: '',
                    description: '',
                    badge: 'Artisanal Batch',
                    inStock: true
                  });
                  setProdModalOpen(true);
                }}
                className="gold-button-gradient font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer text-[#0b1a30]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((prod) => (
                <div key={prod.id} className="bg-white rounded-2xl border-2 border-[#dfc17b]/40 p-4 space-y-3 shadow-xs">
                  <div className="h-32 rounded-xl overflow-hidden bg-stone-100">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-royal text-sm font-bold text-[#0b1a30] line-clamp-1">{prod.name}</h5>
                    <span className="text-xs text-[#8e7235] font-bold">₹{prod.price}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                    <span className="text-[10px] text-stone-500 font-semibold">{prod.category}</span>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete product "${prod.name}"?`)) {
                          deleteProduct(prod.id);
                          showNotice(`Deleted "${prod.name}".`);
                        }
                      }}
                      className="text-stone-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* TAB 5: GALLERY CRUD                                             */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {adminTab === 'gallery' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-royal text-2xl font-bold text-[#0b1a30]">Gallery Visuals</h3>
                <p className="text-xs text-stone-600">Showcase banquet moments and leaf services.</p>
              </div>

              <button
                onClick={() => {
                  setEditingGalId(null);
                  setGalForm({
                    title: '',
                    category: 'Weddings',
                    year: '2024',
                    location: '',
                    guests: '',
                    image: '',
                    description: ''
                  });
                  setGalModalOpen(true);
                }}
                className="gold-button-gradient font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer text-[#0b1a30]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                  <div className="h-44 bg-stone-100 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3.5 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-xs text-[#0b1a30]">{item.title}</h5>
                      <span className="text-[10px] text-stone-500">{item.location}</span>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete photo "${item.title}"?`)) {
                          deleteGalleryItem(item.id);
                          showNotice(`Photo removed.`);
                        }
                      }}
                      className="text-stone-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* TAB 6: SETTINGS & FACTORY DEFAULTS                              */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {adminTab === 'settings' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#dfc17b]/40 max-w-xl mx-auto space-y-6 shadow-sm animate-fadeIn">
            <div>
              <h3 className="font-royal text-xl font-bold text-[#0b1a30]">Administrative Settings</h3>
              <p className="text-xs text-stone-600 mt-1">
                Manage data persistence, backup state, and master catering resets.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div className="p-4 rounded-2xl bg-[#fcfaf6] border border-[#dfc17b]/50 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wide text-[#0b1a30]">Reset Menu Categories & Dishes</h4>
                <p className="text-xs text-stone-600">
                  Restores the full 33 categories and 393+ authentic South Delicious Catering dishes from the official menu book.
                </p>
                <button
                  onClick={() => {
                    if (window.confirm('Restore authentic 33 menu categories?')) {
                      resetCategoriesToDefault();
                      showNotice('Restored original 33 categories!');
                    }
                  }}
                  className="px-4 py-2 bg-white border border-[#dfc17b] rounded-xl text-xs font-bold text-[#0b1a30] hover:bg-[#ede1c7] transition-colors cursor-pointer"
                >
                  Restore Menu Categories
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wide text-red-900">Factory Hard Reset</h4>
                <p className="text-xs text-red-700">
                  Clears all local storage, restores default packages, gallery items, products, and wipes customer test inquiries.
                </p>
                <button
                  onClick={() => {
                    if (window.confirm('Perform full factory hard reset? All customer test orders and custom changes will be restored to defaults.')) {
                      resetToFactoryDefaults();
                      resetCategoriesToDefault();
                      showNotice('Factory defaults restored.');
                    }
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Reset Everything to Factory Defaults
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ── MODAL: ADD / EDIT CATEGORY ── */}
      {catModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fcfaf6] border-2 border-[#dfc17b] max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfc17b]/40">
              <h3 className="font-royal text-xl font-bold text-[#0b1a30]">
                {editingCatId ? 'Edit Category' : 'Add New Menu Category'}
              </h3>
              <button onClick={() => setCatModalOpen(false)} className="text-stone-400 hover:text-[#0b1a30]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0b1a30]">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Sweets, Hot Soups, Malabar Tiffin..."
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dfc17b]/60 text-xs text-[#0b1a30] focus:outline-none focus:border-[#dfc17b]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0b1a30]">Menu Group *</label>
                  <select
                    value={catForm.group}
                    onChange={(e) => setCatForm({ ...catForm, group: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dfc17b]/60 text-xs text-[#0b1a30] font-semibold focus:outline-none"
                  >
                    <option value="drinks-soups">Welcome Drinks & Soups</option>
                    <option value="starters">Starters & Appetizers</option>
                    <option value="sweets">Royal Sweets & Halwa</option>
                    <option value="breads-dosas">Breads, Dosas & Idlis</option>
                    <option value="salads-raita">Salads & Raitas</option>
                    <option value="chats-kids">Chats & Kids Counter</option>
                    <option value="icecreams">Ice Creams & Kulfis</option>
                    <option value="fruits-special">Fruits & Tamboola</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0b1a30]">Menu Book Reference</label>
                  <input
                    type="text"
                    placeholder="e.g. Page 5, Chef Special"
                    value={catForm.page}
                    onChange={(e) => setCatForm({ ...catForm, page: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dfc17b]/60 text-xs text-[#0b1a30] focus:outline-none focus:border-[#dfc17b]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0b1a30]">Category Photo URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={catForm.image}
                  onChange={(e) => setCatForm({ ...catForm, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dfc17b]/60 text-xs text-[#0b1a30] focus:outline-none focus:border-[#dfc17b]"
                />
                <span className="text-[10px] text-stone-500">Leave blank to use default catering photography.</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0b1a30]">Short Description</label>
                <textarea
                  rows="2"
                  placeholder="Brief description displayed to users..."
                  value={catForm.description}
                  onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#dfc17b]/60 text-xs text-[#0b1a30] focus:outline-none focus:border-[#dfc17b]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCatModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="gold-button-gradient px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#0b1a30]"
                >
                  {editingCatId ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-4 border-t border-[#dfc17b]/30 text-center text-xs text-stone-500 bg-white">
        South Delicious Catering • Admin Suite • Authenticated Session
      </footer>

    </div>
  );
};
