import React, { useState } from 'react';
import { useCatering } from '../context/CateringContext';
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
  CheckCircle2 
} from 'lucide-react';

export const AdminPortal = () => {
  const { 
    setIsAdminMode,
    adminAuth, 
    setAdminAuth,
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

  const [adminTab, setAdminTab] = useState('packages');
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Modal / Form state for Package
  const [pkgModalOpen, setPkgModalOpen] = useState(false);
  const [editingPkgId, setEditingPkgId] = useState(null);
  const [pkgForm, setPkgForm] = useState({
    name: '',
    subtitle: '',
    pricePerPlate: 650,
    minGuests: 100,
    popular: false,
    tag: '',
    image: '',
    description: '',
    welcomeDrinksStr: '',
    startersStr: '',
    mainCourseStr: '',
    dessertsStr: ''
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

  const [notice, setNotice] = useState(null);
  const showNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

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
  };

  // Package CRUD
  const openNewPackageModal = () => {
    setEditingPkgId(null);
    setPkgForm({
      name: '',
      subtitle: '',
      pricePerPlate: 650,
      minGuests: 100,
      popular: false,
      tag: 'New Celebration Package',
      image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=900&q=80',
      description: '',
      welcomeDrinksStr: 'Elaneer Payasam Shot, Spiced Panakam, Rose Badam Milk',
      startersStr: 'Medu Vada with 3 Chutneys, Vazhaipoo Cutlet, Crispy Gobi 65',
      mainCourseStr: 'Seeraga Samba Ghee Rice, Arachivitta Sambar, Mysore Rasam, Avial, Paruppu Usili, Madurai Parotta, Curd Rice, Appalam',
      dessertsStr: 'Kashi Halwa, Melt-in-mouth Mysore Pak, Kumbakonam Filter Coffee'
    });
    setPkgModalOpen(true);
  };

  const openEditPackageModal = (pkg) => {
    setEditingPkgId(pkg.id);
    setPkgForm({
      name: pkg.name || '',
      subtitle: pkg.subtitle || '',
      pricePerPlate: pkg.pricePerPlate || 650,
      minGuests: pkg.minGuests || 100,
      popular: !!pkg.popular,
      tag: pkg.tag || '',
      image: pkg.image || '',
      description: pkg.description || '',
      welcomeDrinksStr: (pkg.welcomeDrinks || []).join(', '),
      startersStr: (pkg.starters || []).join(', '),
      mainCourseStr: (pkg.mainCourse || []).join(', '),
      dessertsStr: (pkg.desserts || []).join(', ')
    });
    setPkgModalOpen(true);
  };

  const handleSavePackage = (e) => {
    e.preventDefault();
    const pkgPayload = {
      name: pkgForm.name,
      subtitle: pkgForm.subtitle,
      pricePerPlate: Number(pkgForm.pricePerPlate) || 500,
      minGuests: Number(pkgForm.minGuests) || 50,
      popular: pkgForm.popular,
      tag: pkgForm.tag,
      image: pkgForm.image,
      description: pkgForm.description,
      welcomeDrinks: pkgForm.welcomeDrinksStr.split(',').map(s => s.trim()).filter(Boolean),
      starters: pkgForm.startersStr.split(',').map(s => s.trim()).filter(Boolean),
      mainCourse: pkgForm.mainCourseStr.split(',').map(s => s.trim()).filter(Boolean),
      desserts: pkgForm.dessertsStr.split(',').map(s => s.trim()).filter(Boolean),
    };

    if (editingPkgId) {
      updatePackage(editingPkgId, pkgPayload);
      showNotice('Package updated successfully!');
    } else {
      addPackage(pkgPayload);
      showNotice('New Package created successfully!');
    }
    setPkgModalOpen(false);
  };

  const handleDeletePackage = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the package "${name}"?`)) {
      deletePackage(id);
      showNotice(`Package "${name}" deleted.`);
    }
  };

  // Product CRUD
  const openNewProductModal = () => {
    setEditingProdId(null);
    setProdForm({
      name: '',
      category: 'Signature Sweets',
      price: 350,
      weightsStr: '250g, 500g, 1kg',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      description: '',
      badge: 'Fresh Batch',
      inStock: true
    });
    setProdModalOpen(true);
  };

  const openEditProductModal = (prod) => {
    setEditingProdId(prod.id);
    setProdForm({
      name: prod.name || '',
      category: prod.category || 'Signature Sweets',
      price: prod.price || 300,
      weightsStr: (prod.weights || []).join(', '),
      rating: prod.rating || 5.0,
      image: prod.image || '',
      description: prod.description || '',
      badge: prod.badge || '',
      inStock: prod.inStock !== false
    });
    setProdModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const prodPayload = {
      name: prodForm.name,
      category: prodForm.category,
      price: Number(prodForm.price) || 200,
      weights: prodForm.weightsStr.split(',').map(s => s.trim()).filter(Boolean),
      rating: Number(prodForm.rating) || 5.0,
      image: prodForm.image,
      description: prodForm.description,
      badge: prodForm.badge,
      inStock: prodForm.inStock
    };

    if (editingProdId) {
      updateProduct(editingProdId, prodPayload);
      showNotice('Product updated successfully!');
    } else {
      addProduct(prodPayload);
      showNotice('New Product added to artisanal pantry!');
    }
    setProdModalOpen(false);
  };

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the product "${name}"?`)) {
      deleteProduct(id);
      showNotice(`Product "${name}" removed.`);
    }
  };

  // Gallery CRUD
  const openNewGalleryModal = () => {
    setEditingGalId(null);
    setGalForm({
      title: '',
      category: 'Weddings',
      year: new Date().getFullYear().toString(),
      location: 'Grand Ballroom, Chennai',
      guests: '800 Guests',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
      description: 'Traditional South Indian wedding banquet presentation with authentic brassware.'
    });
    setGalModalOpen(true);
  };

  const openEditGalleryModal = (gal) => {
    setEditingGalId(gal.id);
    setGalForm({
      title: gal.title || '',
      category: gal.category || 'Weddings',
      year: gal.year || '2024',
      location: gal.location || '',
      guests: gal.guests || '',
      image: gal.image || '',
      description: gal.description || ''
    });
    setGalModalOpen(true);
  };

  const handleSaveGallery = (e) => {
    e.preventDefault();
    const galPayload = {
      title: galForm.title,
      category: galForm.category,
      year: galForm.year,
      location: galForm.location,
      guests: galForm.guests,
      image: galForm.image,
      description: galForm.description
    };

    if (editingGalId) {
      updateGalleryItem(editingGalId, galPayload);
      showNotice('Gallery photo updated successfully!');
    } else {
      addGalleryItem(galPayload);
      showNotice('New photo added to gallery!');
    }
    setGalModalOpen(false);
  };

  const handleDeleteGallery = (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from the gallery?`)) {
      deleteGalleryItem(id);
      showNotice(`Gallery item removed.`);
    }
  };

  // Password screen
  if (!adminAuth) {
    return (
      <div className="min-h-screen bg-[#faf6ee] text-[#1a2d24] flex flex-col justify-center items-center p-4 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-md w-full bg-[#0d2e24] text-[#faf5ea] border-2 border-[#d4af37] rounded-3xl p-8 shadow-2xl space-y-6 text-center">
          
          <div className="w-20 h-20 rounded-full border-2 border-[#d4af37] mx-auto overflow-hidden shadow-xl bg-[#faf5eb] p-1">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#f5d77f] font-bold">Secure Staff Access</span>
            <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#fffdf7]">
              Admin Control Suite
            </h2>
            <p className="text-xs text-stone-300">
              South Delicious Catering • Internal Management Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-xs uppercase tracking-wider text-stone-200 font-bold flex items-center justify-between">
                <span>Admin Passcode</span>
                <span className="text-[10px] text-[#f5d77f] font-normal">(Default: admin123)</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter admin passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-[#faf5eb] border-2 border-[#d4af37] rounded-xl px-4 py-3 text-sm text-[#0d2e24] placeholder-stone-500 font-bold focus:outline-none shadow-inner"
                />
                <Lock className="w-4 h-4 text-[#996e14] absolute right-3.5 top-3.5" />
              </div>
            </div>

            {authError && (
              <div className="text-xs text-red-200 bg-red-900/60 p-2.5 rounded-lg border border-red-500">
                Invalid passcode. Please enter <strong>admin123</strong> or click quick unlock below.
              </div>
            )}

            <button
              type="submit"
              className="w-full gold-button-gradient font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              Sign In to Admin Portal
            </button>
          </form>

          {/* Quick Demo Bypass */}
          <div className="pt-2 border-t border-emerald-900 space-y-2">
            <button
              onClick={() => {
                setAdminAuth(true);
                setAuthError(false);
              }}
              className="text-xs text-[#f5d77f] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer font-semibold"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Quick Unlock (Developer / Reviewer Mode)</span>
            </button>

            <div>
              <button
                onClick={() => setIsAdminMode(false)}
                className="text-xs text-stone-300 hover:text-white flex items-center justify-center gap-1 mx-auto pt-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf6ee] text-[#1c2e26] flex flex-col justify-between">
      
      {/* Toast Alert Notice */}
      {notice && (
        <div className="fixed top-5 right-5 z-50 bg-[#0d2e24] border-2 border-[#d4af37] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#f5d77f]" />
          <span className="text-sm font-semibold">{notice}</span>
        </div>
      )}

      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0d2e24] text-[#faf5ea] border-b-2 border-[#d4af37]/60 shadow-xl px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border-2 border-[#d4af37] overflow-hidden shadow bg-[#faf5eb]">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-royal text-lg font-bold text-[#fffdf7]">
                  South Delicious Catering
                </span>
                <span className="bg-[#d4af37] text-[#0d2e24] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase shadow">
                  Admin Suite
                </span>
              </div>
              <p className="text-[11px] text-stone-300">
                CRUD Management • Packages, Products, Gallery & Leads
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminMode(false)}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#faf5eb] text-[#0d2e24] hover:bg-[#ede3ce] border border-[#d4af37] flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
            >
              <Eye className="w-4 h-4 text-[#996e14]" />
              <span className="hidden sm:inline">View Public Website</span>
              <span className="sm:hidden">Live Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-stone-300 hover:text-red-400 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              title="Lock / Logout"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Metric Cards Row in Warm Cream & Gold */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#ffffff] p-5 rounded-2xl border-2 border-[#d4af37]/40 shadow-md flex items-center justify-between">
            <div>
              <div className="text-xs text-stone-500 uppercase font-bold">Packages</div>
              <div className="font-royal text-2xl font-extrabold text-[#0d2e24]">{packages.length}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0d2e24] flex items-center justify-center text-[#f5d77f]">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#ffffff] p-5 rounded-2xl border-2 border-[#d4af37]/40 shadow-md flex items-center justify-between">
            <div>
              <div className="text-xs text-stone-500 uppercase font-bold">Products</div>
              <div className="font-royal text-2xl font-extrabold text-[#0d2e24]">{products.length}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0d2e24] flex items-center justify-center text-[#f5d77f]">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#ffffff] p-5 rounded-2xl border-2 border-[#d4af37]/40 shadow-md flex items-center justify-between">
            <div>
              <div className="text-xs text-stone-500 uppercase font-bold">Gallery Photos</div>
              <div className="font-royal text-2xl font-extrabold text-[#0d2e24]">{gallery.length}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0d2e24] flex items-center justify-center text-[#f5d77f]">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#ffffff] p-5 rounded-2xl border-2 border-[#d4af37]/40 shadow-md flex items-center justify-between">
            <div>
              <div className="text-xs text-stone-500 uppercase font-bold">Customer Leads</div>
              <div className="font-royal text-2xl font-extrabold text-[#0d2e24]">{inquiries.length}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0d2e24] flex items-center justify-center text-[#f5d77f]">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-[#d4af37]/30 pb-4">
          <button
            onClick={() => setAdminTab('packages')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              adminTab === 'packages'
                ? 'bg-[#0d2e24] text-[#f5d77f] border-2 border-[#d4af37] shadow-md'
                : 'bg-[#ffffff] text-stone-700 hover:text-[#0d2e24] border border-[#d4af37]/40'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Manage Packages ({packages.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('products')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              adminTab === 'products'
                ? 'bg-[#0d2e24] text-[#f5d77f] border-2 border-[#d4af37] shadow-md'
                : 'bg-[#ffffff] text-stone-700 hover:text-[#0d2e24] border border-[#d4af37]/40'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Manage Products ({products.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('gallery')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              adminTab === 'gallery'
                ? 'bg-[#0d2e24] text-[#f5d77f] border-2 border-[#d4af37] shadow-md'
                : 'bg-[#ffffff] text-stone-700 hover:text-[#0d2e24] border border-[#d4af37]/40'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Manage Gallery ({gallery.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('inquiries')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              adminTab === 'inquiries'
                ? 'bg-[#0d2e24] text-[#f5d77f] border-2 border-[#d4af37] shadow-md'
                : 'bg-[#ffffff] text-stone-700 hover:text-[#0d2e24] border border-[#d4af37]/40'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Customer Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('settings')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              adminTab === 'settings'
                ? 'bg-[#0d2e24] text-[#f5d77f] border-2 border-[#d4af37] shadow-md'
                : 'bg-[#ffffff] text-stone-700 hover:text-[#0d2e24] border border-[#d4af37]/40'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset & Settings</span>
          </button>
        </div>

        {/* TAB 1: PACKAGES CRUD */}
        {adminTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-royal text-2xl font-bold text-[#0d2e24]">Catering Packages Manager</h3>
                <p className="text-xs text-stone-600">
                  Add, modify or delete catering packages with custom items (drinks, starters, main course, desserts).
                </p>
              </div>

              <button
                onClick={openNewPackageModal}
                className="gold-button-gradient font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Package</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className="bg-[#ffffff] rounded-2xl border-2 border-[#d4af37]/40 overflow-hidden shadow-md flex flex-col justify-between p-6 space-y-4"
                >
                  <div className="flex gap-4 items-start">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name} 
                      className="w-24 h-24 rounded-xl object-cover border border-[#d4af37]/40 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] bg-[#0d2e24] text-[#f5d77f] font-bold px-2 py-0.5 rounded-full">
                          {pkg.tag || 'Package'}
                        </span>
                        <span className="text-xs text-stone-500 font-semibold">Min {pkg.minGuests} Guests</span>
                      </div>
                      <h4 className="font-royal text-lg font-bold text-[#0d2e24] leading-tight mb-1">
                        {pkg.name}
                      </h4>
                      <p className="text-xs text-[#996e14] font-bold">{pkg.subtitle}</p>
                      <div className="font-royal text-lg font-extrabold text-[#0d2e24] mt-1">
                        ₹{pkg.pricePerPlate} <span className="text-xs font-normal text-stone-600">/ plate</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="bg-[#faf5eb] p-3 rounded-xl border border-[#d4af37]/30 grid grid-cols-2 gap-2 text-[11px] text-stone-700 font-medium">
                    <div>Welcome Drinks: <strong className="text-[#0d2e24]">{pkg.welcomeDrinks?.length || 0}</strong></div>
                    <div>Starters: <strong className="text-[#0d2e24]">{pkg.starters?.length || 0}</strong></div>
                    <div>Main Course: <strong className="text-[#0d2e24]">{pkg.mainCourse?.length || 0}</strong></div>
                    <div>Desserts: <strong className="text-[#0d2e24]">{pkg.desserts?.length || 0}</strong></div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                    <button
                      onClick={() => openEditPackageModal(pkg)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#faf5eb] text-[#0d2e24] hover:bg-[#ede3ce] border border-[#d4af37]/60 flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#996e14]" />
                      <span>Edit Package</span>
                    </button>
                    <button
                      onClick={() => handleDeletePackage(pkg.id, pkg.name)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CRUD */}
        {adminTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-royal text-2xl font-bold text-[#0d2e24]">Artisanal Products Manager</h3>
                <p className="text-xs text-stone-600">
                  Manage Mysore Pak sweets, gunpowder podis, filter coffee decoctions and pickles with weight variants.
                </p>
              </div>

              <button
                onClick={openNewProductModal}
                className="gold-button-gradient font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div 
                  key={prod.id}
                  className="bg-[#ffffff] rounded-2xl border-2 border-[#d4af37]/40 overflow-hidden shadow-md p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="flex gap-3">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-20 h-20 rounded-xl object-cover border border-[#d4af37]/40 shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-[#996e14] font-bold uppercase">{prod.category}</span>
                      <h4 className="font-royal text-base font-bold text-[#0d2e24] truncate">{prod.name}</h4>
                      <div className="font-royal text-lg font-extrabold text-[#0d2e24]">₹{prod.price}</div>
                      <div className="text-[11px] text-stone-500 font-medium">
                        Weights: {prod.weights?.join(', ') || 'Standard'}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2">
                    {prod.description}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-200">
                    <span className="text-[#0d2e24] font-bold">{prod.badge || 'Available'}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditProductModal(prod)}
                        className="p-1.5 rounded-lg bg-[#faf5eb] text-[#0d2e24] hover:bg-[#ede3ce] border border-[#d4af37]/50 cursor-pointer shadow-sm"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id, prod.name)}
                        className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 cursor-pointer"
                        title="Delete"
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

        {/* TAB 3: GALLERY CRUD */}
        {adminTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-royal text-2xl font-bold text-[#0d2e24]">Gallery Photos Manager</h3>
                <p className="text-xs text-stone-600">
                  Upload and manage banquet photos through the years (2014-2026).
                </p>
              </div>

              <button
                onClick={openNewGalleryModal}
                className="gold-button-gradient font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item) => (
                <div 
                  key={item.id}
                  className="bg-[#ffffff] rounded-2xl border-2 border-[#d4af37]/40 overflow-hidden shadow-md group flex flex-col justify-between"
                >
                  <div className="relative h-44 overflow-hidden bg-stone-100">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-2 left-2 bg-[#0d2e24]/90 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] text-[#f5d77f] font-bold uppercase shadow">
                      {item.category} • {item.year}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="font-royal text-base font-bold text-[#0d2e24] truncate">{item.title}</h4>
                    <p className="text-xs text-stone-600 line-clamp-2">{item.description}</p>
                    <div className="text-[11px] text-stone-500 font-medium">{item.location} • {item.guests}</div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                      <button
                        onClick={() => openEditGalleryModal(item)}
                        className="p-1.5 rounded-lg bg-[#faf5eb] text-[#0d2e24] hover:bg-[#ede3ce] border border-[#d4af37]/50 cursor-pointer shadow-sm"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGallery(item.id, item.title)}
                        className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 cursor-pointer"
                        title="Delete"
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

        {/* TAB 4: INQUIRIES & LEADS */}
        {adminTab === 'inquiries' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-royal text-2xl font-bold text-[#0d2e24]">Customer Inquiries & Quotes</h3>
              <p className="text-xs text-stone-600">
                Live leads submitted by visitors requesting banqueting bookings and package quotes.
              </p>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-[#ffffff] p-12 text-center rounded-2xl border border-stone-300 text-stone-500 space-y-2">
                <Inbox className="w-12 h-12 mx-auto text-[#c59b27]/60" />
                <p>No customer inquiries received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div 
                    key={inq.id}
                    className="bg-[#ffffff] p-6 rounded-2xl border-2 border-[#d4af37]/40 shadow-md space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-royal text-lg font-bold text-[#0d2e24]">{inq.name}</h4>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                            inq.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800 border border-green-300' 
                              : inq.status === 'Contacted'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}>
                            {inq.status || 'New Lead'}
                          </span>
                        </div>
                        <div className="text-xs text-stone-500 flex items-center gap-4 mt-1 font-medium">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#c59b27]" />
                            <a href={`tel:${inq.phone}`} className="text-[#0d2e24] hover:underline font-bold">{inq.phone}</a>
                          </span>
                          {inq.email && <span>{inq.email}</span>}
                          <span>Received: {inq.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={inq.status || 'New'}
                          onChange={(e) => {
                            updateInquiryStatus(inq.id, e.target.value);
                            showNotice(`Status updated to "${e.target.value}"`);
                          }}
                          className="bg-[#faf5eb] text-xs text-[#0d2e24] font-bold border border-[#d4af37] rounded-lg px-2.5 py-1.5 focus:outline-none shadow-sm"
                        >
                          <option value="New">Status: New</option>
                          <option value="Contacted">Status: Contacted</option>
                          <option value="Confirmed">Status: Confirmed</option>
                          <option value="Archived">Status: Archived</option>
                        </select>

                        <button
                          onClick={() => {
                            if (window.confirm('Delete this inquiry?')) {
                              deleteInquiry(inq.id);
                              showNotice('Inquiry deleted.');
                            }
                          }}
                          className="p-1.5 text-stone-400 hover:text-red-500 bg-stone-100 rounded-lg cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-700">
                      <div><strong className="text-stone-500">Occasion:</strong> {inq.eventType}</div>
                      <div><strong className="text-stone-500">Package:</strong> <span className="text-[#0d2e24] font-bold">{inq.selectedPackage}</span></div>
                      <div><strong className="text-stone-500">Guest Count:</strong> {inq.guestCount} guests</div>
                      {inq.eventDate && <div><strong className="text-stone-500">Event Date:</strong> {inq.eventDate}</div>}
                    </div>

                    {inq.notes && (
                      <div className="bg-[#faf5eb] p-3 rounded-xl border border-[#d4af37]/30 text-xs text-stone-700">
                        <strong className="text-stone-500">Special Notes:</strong> {inq.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: SETTINGS & RESTORE */}
        {adminTab === 'settings' && (
          <div className="bg-[#ffffff] p-8 rounded-3xl border-2 border-[#d4af37]/40 max-w-2xl mx-auto space-y-6 shadow-xl">
            <div className="space-y-1 text-center">
              <RotateCcw className="w-10 h-10 text-[#0d2e24] mx-auto mb-2" />
              <h3 className="font-royal text-2xl font-bold text-[#0d2e24]">Restore Factory Data</h3>
              <p className="text-xs text-stone-600">
                You can easily restore all the original authentic South Indian catering packages, products, and gallery images curated for South Delicious Catering.
              </p>
            </div>

            <div className="bg-[#faf5eb] p-4 rounded-2xl border border-[#d4af37]/50 text-xs text-stone-700 space-y-2">
              <p className="font-bold text-[#0d2e24]">Note regarding persistence:</p>
              <p>
                All your additions, edits, and deletions are saved in browser LocalStorage. Clicking "Reset to Factory Defaults" will safely restore all initial packages (Kalyana Virundhu, Raja Bhojanam, etc.), products (Mysore Pak, Podis, etc.), and gallery showcases.
              </p>
            </div>

            <button
              onClick={() => {
                if (window.confirm('Reset all packages, products, and gallery to original South Delicious Catering data?')) {
                  resetToFactoryDefaults();
                  showNotice('System successfully restored to authentic factory defaults!');
                }
              }}
              className="w-full gold-button-gradient font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md cursor-pointer"
            >
              Reset to Factory Defaults
            </button>
          </div>
        )}

      </main>

      {/* Package Modal */}
      {pkgModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#faf5eb] rounded-3xl border-2 border-[#d4af37] shadow-2xl p-6 sm:p-8 text-[#1c2e26] space-y-5 my-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h3 className="font-royal text-2xl font-bold text-[#0d2e24]">
                {editingPkgId ? 'Edit Catering Package' : 'Create New Catering Package'}
              </h3>
              <button 
                onClick={() => setPkgModalOpen(false)}
                className="text-stone-500 hover:text-black p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold uppercase tracking-wider">Package Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kalyana Virundhu (Grand Feast)"
                    value={pkgForm.name}
                    onChange={(e) => setPkgForm({ ...pkgForm, name: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold uppercase tracking-wider">Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g. Traditional 24+ Item Banana Leaf Spread"
                    value={pkgForm.subtitle}
                    onChange={(e) => setPkgForm({ ...pkgForm, subtitle: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold uppercase tracking-wider">Price Per Plate (₹) *</label>
                  <input
                    type="number"
                    required
                    value={pkgForm.pricePerPlate}
                    onChange={(e) => setPkgForm({ ...pkgForm, pricePerPlate: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold uppercase tracking-wider">Minimum Guest Count *</label>
                  <input
                    type="number"
                    required
                    value={pkgForm.minGuests}
                    onChange={(e) => setPkgForm({ ...pkgForm, minGuests: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold uppercase tracking-wider">Promotional Tag / Badge</label>
                  <input
                    type="text"
                    placeholder="e.g. Most Popular for Weddings"
                    value={pkgForm.tag}
                    onChange={(e) => setPkgForm({ ...pkgForm, tag: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold uppercase tracking-wider">Image URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={pkgForm.image}
                    onChange={(e) => setPkgForm({ ...pkgForm, image: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>

              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold uppercase tracking-wider">Package Description</label>
                <textarea
                  rows="2"
                  value={pkgForm.description}
                  onChange={(e) => setPkgForm({ ...pkgForm, description: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-stone-200">
                <div className="space-y-1">
                  <label className="text-[#0d2e24] font-bold uppercase tracking-wider">
                    1. Welcome Drinks (comma-separated)
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Elaneer Payasam Shot, Panakam, Badam Milk..."
                    value={pkgForm.welcomeDrinksStr}
                    onChange={(e) => setPkgForm({ ...pkgForm, welcomeDrinksStr: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3 py-2 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#0d2e24] font-bold uppercase tracking-wider">
                    2. Starters & Appetizers (comma-separated)
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Medu Vada, Vazhaipoo Cutlet, Crispy Gobi 65..."
                    value={pkgForm.startersStr}
                    onChange={(e) => setPkgForm({ ...pkgForm, startersStr: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3 py-2 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#0d2e24] font-bold uppercase tracking-wider">
                    3. Main Course & Rice Varieties (comma-separated)
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Jeera Samba Rice, Arachivitta Sambar, Rasam, Avial, Paruppu Usili, Parotta, Curd Rice..."
                    value={pkgForm.mainCourseStr}
                    onChange={(e) => setPkgForm({ ...pkgForm, mainCourseStr: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3 py-2 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#0d2e24] font-bold uppercase tracking-wider">
                    4. Desserts & Filter Coffee (comma-separated)
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Kashi Halwa, Ghee Mysore Pak, Paal Payasam, Kumbakonam Filter Coffee..."
                    value={pkgForm.dessertsStr}
                    onChange={(e) => setPkgForm({ ...pkgForm, dessertsStr: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3 py-2 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPkgModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-stone-600 hover:text-black bg-stone-200 cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="gold-button-gradient font-bold px-6 py-2.5 rounded-xl uppercase tracking-wider cursor-pointer shadow-md"
                >
                  {editingPkgId ? 'Update Package' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {prodModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#faf5eb] rounded-3xl border-2 border-[#d4af37] shadow-2xl p-6 sm:p-8 text-[#1c2e26] space-y-4 my-8"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-royal text-xl font-bold text-[#0d2e24]">
                {editingProdId ? 'Edit Product' : 'Add New Artisanal Product'}
              </h3>
              <button 
                onClick={() => setProdModalOpen(false)}
                className="text-stone-500 hover:text-black p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-stone-700 font-bold uppercase tracking-wider">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Desi Ghee Mysore Pak"
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold uppercase tracking-wider">Category</label>
                  <input
                    type="text"
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold uppercase tracking-wider">Base Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold uppercase tracking-wider">
                  Available Weights (comma-separated) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="250g, 500g, 1kg"
                  value={prodForm.weightsStr}
                  onChange={(e) => setProdForm({ ...prodForm, weightsStr: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold uppercase tracking-wider">Image URL</label>
                <input
                  type="text"
                  value={prodForm.image}
                  onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold uppercase tracking-wider">Description</label>
                <textarea
                  rows="2"
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProdModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:text-black bg-stone-200 cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="gold-button-gradient font-bold px-6 py-2 rounded-xl uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {galModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#faf5eb] rounded-3xl border-2 border-[#d4af37] shadow-2xl p-6 sm:p-8 text-[#1c2e26] space-y-4 my-8"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-royal text-xl font-bold text-[#0d2e24]">
                {editingGalId ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}
              </h3>
              <button 
                onClick={() => setGalModalOpen(false)}
                className="text-stone-500 hover:text-black p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-stone-700 font-bold uppercase tracking-wider">Photo Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Wedding Banana Leaf Service"
                  value={galForm.title}
                  onChange={(e) => setGalForm({ ...galForm, title: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold uppercase tracking-wider">Category</label>
                  <input
                    type="text"
                    value={galForm.category}
                    onChange={(e) => setGalForm({ ...galForm, category: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold uppercase tracking-wider">Year</label>
                  <input
                    type="text"
                    value={galForm.year}
                    onChange={(e) => setGalForm({ ...galForm, year: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold uppercase tracking-wider">Location / Venue</label>
                  <input
                    type="text"
                    placeholder="e.g. Leela Palace, Chennai"
                    value={galForm.location}
                    onChange={(e) => setGalForm({ ...galForm, location: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold uppercase tracking-wider">Guest Count</label>
                  <input
                    type="text"
                    placeholder="e.g. 1,200 Guests"
                    value={galForm.guests}
                    onChange={(e) => setGalForm({ ...galForm, guests: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold uppercase tracking-wider">Image URL *</label>
                <input
                  type="text"
                  required
                  placeholder="https://..."
                  value={galForm.image}
                  onChange={(e) => setGalForm({ ...galForm, image: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold uppercase tracking-wider">Description</label>
                <textarea
                  rows="2"
                  value={galForm.description}
                  onChange={(e) => setGalForm({ ...galForm, description: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#d4af37]/60 rounded-xl px-3.5 py-2 text-[#0d2e24] focus:outline-none focus:border-[#d4af37] shadow-sm"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setGalModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:text-black bg-stone-200 cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="gold-button-gradient font-bold px-6 py-2 rounded-xl uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Footer */}
      <footer className="bg-[#0d2e24] border-t-2 border-[#d4af37]/40 py-4 px-8 text-center text-xs text-[#ded8cc]">
        South Delicious Catering Admin Suite • Strict Internal Access Only
      </footer>

    </div>
  );
};
