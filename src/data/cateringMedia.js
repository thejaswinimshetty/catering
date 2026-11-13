// Curated high-definition food photography for South Delicious Catering
// Focused on authentic South Indian, North Indian, pure vegetarian wedding feast items

export const CATEGORY_IMAGES = {
  // 1. Drinks & Soups
  'welcome-drinks': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
  'soups': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
  'cold-soups': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',

  // 2. Starters & Appetizers
  'welcome-starters': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  'mushroom-starter': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
  'baby-corn-starter': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
  'dry-starters': 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
  'south-indian-starter': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
  'chef-specials': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',

  // 3. Royal Sweets & Halwa
  'sweet-with-stick': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
  'malai-sweets': 'https://images.unsplash.com/photo-1605197143977-90c741ee2b14?auto=format&fit=crop&w=600&q=80',
  'special-peta-sweets': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80',
  'kaaju-burfy-sweets': 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=600&q=80',
  'pistachio-burfy-sweets': 'https://images.unsplash.com/photo-1505253758473-96b3015f2169?auto=format&fit=crop&w=600&q=80',
  'special-dry-fruits-sweets': 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=600&q=80',
  'special-kova-burfy': 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80',
  'holige': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
  'halwa': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',

  // 4. Breads, Dosas & Idlis
  'south-indian-dosa': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
  'north-indian-breads': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80',
  'south-indian-breads': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
  'idli-kadabu': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
  'raita': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',

  // 5. Salads & Raitas
  'traditional-salads': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
  'overseas-salad': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',

  // 6. Chats & Kids Counter
  'bombay-chat': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  'beeda-bangarpet': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
  'kids-counter': 'https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=600&q=80',

  // 7. Ice Creams & Kulfis
  'ice-creams': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
  'special-icecream': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',

  // 8. Fruits & Tamboola
  'fruits-varieties': 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80',
  'imported-fruits': 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=600&q=80',
  'tamboola-water': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
};

// Dish-level keyword photo registry for accurate dish-level pictures
const DISH_KEYWORD_IMAGES = [
  // Drinks & Shakes
  { pattern: /(rose|gulkand|strawberry)/i, url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(badam|kesar|pista|pistachio.*milk)/i, url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(mango|butterscotch)/i, url: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80' },
  { pattern: /chocolate/i, url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(tender coconut|elaneer)/i, url: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(sugar cane|sugarcane|juice|grape|lime|punch|kiwi)/i, url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80' },
  { pattern: /faluda/i, url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80' },

  // Soups
  { pattern: /tomato/i, url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80' },
  { pattern: /mushroom.*soup/i, url: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(corn|sweetcorn)/i, url: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(broccoli|spinach|coriander|curry leaf|green)/i, url: 'https://images.unsplash.com/photo-1616853592507-2e0b6f749961?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(man chow|hot & sour|manchow)/i, url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80' },
  { pattern: /cold.*soup/i, url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80' },

  // Starters
  { pattern: /(french fries|fries|potato wedges|wedges)/i, url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80' },
  { pattern: /cheese ball/i, url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(paneer tikka|tikka|kabab)/i, url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(baby corn|babycorn|crispy corn)/i, url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(mushroom|mashroom)/i, url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(vada|vadai|bajjis?|pakoda|bonda)/i, url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(dates|kimiya)/i, url: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=600&q=80' },

  // Sweets & Halwa
  { pattern: /(rasmalai|malai|cham cham|rajbhog|angoori|rasgulla)/i, url: 'https://images.unsplash.com/photo-1605197143977-90c741ee2b14?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(kaju|kaaju|cashew)/i, url: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(pista|pistachio)/i, url: 'https://images.unsplash.com/photo-1505253758473-96b3015f2169?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(dry fruit|anjeer)/i, url: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(peta|petha)/i, url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(kova|khova|mawa|burfy|burfi|peda)/i, url: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(holige|obbattu|poli)/i, url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80' },
  { pattern: /halwa/i, url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(stick|lolly|candy)/i, url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80' },

  // Breads, Dosas, Idlis
  { pattern: /dosa/i, url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(naan|kulcha|tandoori roti)/i, url: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(parotta|poori|chapathi|roti)/i, url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(idli|kadabu)/i, url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80' },
  { pattern: /raita/i, url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80' },

  // Salads & Chats
  { pattern: /(kosambari|sprout|salad)/i, url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(pani puri|sev puri|bhel|chat|bangarpet)/i, url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(beeda|paan)/i, url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(popcorn|cotton candy|candy)/i, url: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=600&q=80' },

  // Ice Creams & Desserts
  { pattern: /(kulfi|matka)/i, url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80' },
  { pattern: /ice cream/i, url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80' },

  // Fruits & Tamboola
  { pattern: /(fruit|apple|melon|papaya|pineapple|kiwi)/i, url: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80' },
  { pattern: /(tamboola|water)/i, url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80' }
];

export const getDishImage = (dishName, categoryId) => {
  if (!dishName) return CATEGORY_IMAGES[categoryId] || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80';
  
  for (const item of DISH_KEYWORD_IMAGES) {
    if (item.pattern.test(dishName)) {
      return item.url;
    }
  }

  // Fallback to category photo or general Indian cuisine photo
  return CATEGORY_IMAGES[categoryId] || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80';
};
