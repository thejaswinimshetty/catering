import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_PACKAGES, 
  INITIAL_PRODUCTS, 
  INITIAL_GALLERY, 
  INITIAL_PORTFOLIO, 
  COMPANY_INFO,
  MASTER_MENU
} from '../data/initialData';

const CateringContext = createContext(null);

export const CateringProvider = ({ children }) => {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'services' | 'gallery' | 'products' | 'portfolio'
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminAuth, setAdminAuth] = useState(() => {
    return localStorage.getItem('sdc_admin_auth') === 'true';
  });

  // Data States with LocalStorage Persistence
  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem('sdc_packages');
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('sdc_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('sdc_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('sdc_portfolio');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  });

  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('sdc_inquiries');
    return saved ? JSON.parse(saved) : [
      {
        id: "inq-101",
        date: "2026-09-27",
        name: "Mr. Venkatesh Iyer",
        phone: "+91 98410 55432",
        email: "venkatesh.iyer@gmail.com",
        eventType: "Wedding Reception",
        guestCount: "450",
        selectedPackage: "Kalyana Virundhu (Grand Royal Wedding Feast)",
        eventDate: "2026-11-15",
        status: "New",
        notes: "Strict pure vegetarian with live hot filter coffee counter and jain menu options."
      }
    ];
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('sdc_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [masterMenu, setMasterMenu] = useState(() => {
    const saved = localStorage.getItem('sdc_master_menu');
    return saved ? JSON.parse(saved) : MASTER_MENU;
  });

  // Modal States
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedPackageForQuote, setSelectedPackageForQuote] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('sdc_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('sdc_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sdc_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('sdc_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('sdc_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('sdc_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sdc_master_menu', JSON.stringify(masterMenu));
  }, [masterMenu]);

  useEffect(() => {
    localStorage.setItem('sdc_admin_auth', adminAuth ? 'true' : 'false');
  }, [adminAuth]);

  // Packages CRUD
  const addPackage = (pkg) => {
    const newPkg = {
      ...pkg,
      id: `pkg-${Date.now()}`
    };
    setPackages(prev => [newPkg, ...prev]);
    return newPkg;
  };

  const updatePackage = (id, updated) => {
    setPackages(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deletePackage = (id) => {
    setPackages(prev => prev.filter(p => p.id !== id));
  };

  // Products CRUD
  const addProduct = (prod) => {
    const newProd = {
      ...prod,
      id: `prod-${Date.now()}`,
      rating: prod.rating || 5.0,
      reviews: prod.reviews || 1
    };
    setProducts(prev => [newProd, ...prev]);
    return newProd;
  };

  const updateProduct = (id, updated) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Gallery CRUD
  const addGalleryItem = (item) => {
    const newItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setGallery(prev => [newItem, ...prev]);
    return newItem;
  };

  const updateGalleryItem = (id, updated) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...updated } : g));
  };

  const deleteGalleryItem = (id) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  // Inquiries / Quotes
  const addInquiry = (inquiryData) => {
    const newInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    setInquiries(prev => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateInquiryStatus = (id, status) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
  };

  const deleteInquiry = (id) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));
  };

  // Cart operations
  const addToCart = (product, selectedWeight, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.weight === selectedWeight);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.price,
          weight: selectedWeight,
          image: product.image,
          quantity
        }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index, delta) => {
    setCart(prev => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) {
        return next.filter((_, i) => i !== index);
      }
      next[index].quantity = newQty;
      return next;
    });
  };

  const clearCart = () => setCart([]);

  // Menu Items CRUD
  const addMenuItem = (category, itemName) => {
    const trimmed = itemName?.trim();
    if (!trimmed) return false;
    setMasterMenu(prev => {
      const existing = prev[category] || [];
      if (existing.some(item => item.toLowerCase() === trimmed.toLowerCase())) {
        return prev;
      }
      return {
        ...prev,
        [category]: [...existing, trimmed]
      };
    });
    return true;
  };

  const updateMenuItem = (category, oldName, newName) => {
    const trimmed = newName?.trim();
    if (!trimmed) return false;
    setMasterMenu(prev => {
      const existing = prev[category] || [];
      return {
        ...prev,
        [category]: existing.map(item => item === oldName ? trimmed : item)
      };
    });
    return true;
  };

  const deleteMenuItem = (category, itemName) => {
    setMasterMenu(prev => {
      const existing = prev[category] || [];
      return {
        ...prev,
        [category]: existing.filter(item => item !== itemName)
      };
    });
  };

  const resetMasterMenu = () => {
    setMasterMenu(MASTER_MENU);
    localStorage.removeItem('sdc_master_menu');
  };

  // Reset to original factory defaults
  const resetToFactoryDefaults = () => {
    setPackages(INITIAL_PACKAGES);
    setProducts(INITIAL_PRODUCTS);
    setGallery(INITIAL_GALLERY);
    setPortfolio(INITIAL_PORTFOLIO);
    setMasterMenu(MASTER_MENU);
    localStorage.removeItem('sdc_packages');
    localStorage.removeItem('sdc_products');
    localStorage.removeItem('sdc_gallery');
    localStorage.removeItem('sdc_portfolio');
    localStorage.removeItem('sdc_master_menu');
  };

  // Helper to open quote modal with pre-selected package
  const openQuoteModalForPackage = (pkg) => {
    setSelectedPackageForQuote(pkg);
    setInquiryModalOpen(true);
  };

  return (
    <CateringContext.Provider value={{
      companyInfo: COMPANY_INFO,
      activeTab,
      setActiveTab,
      isAdminMode,
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
      portfolio,
      inquiries,
      addInquiry,
      updateInquiryStatus,
      deleteInquiry,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      masterMenu,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      resetMasterMenu,
      isCartOpen,
      setIsCartOpen,
      inquiryModalOpen,
      setInquiryModalOpen,
      selectedPackageForQuote,
      setSelectedPackageForQuote,
      openQuoteModalForPackage,
      resetToFactoryDefaults
    }}>
      {children}
    </CateringContext.Provider>
  );
};

export const useCatering = () => {
  const context = useContext(CateringContext);
  if (!context) {
    throw new Error('useCatering must be used within CateringProvider');
  }
  return context;
};
