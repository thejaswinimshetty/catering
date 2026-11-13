// Comprehensive authentic catering menu transcribed directly from South Delicious Catering Menu Book

export const MENU_GROUPS = [
  { id: 'all', label: 'All Categories' },
  { id: 'drinks-soups', label: 'Welcome Drinks & Soups' },
  { id: 'starters', label: 'Starters & Appetizers' },
  { id: 'sweets', label: 'Royal Sweets & Halwa' },
  { id: 'breads-dosas', label: 'Breads, Dosas & Idlis' },
  { id: 'salads-raita', label: 'Salads & Raitas' },
  { id: 'chats-kids', label: 'Chats & Kids Counter' },
  { id: 'icecreams', label: 'Ice Creams & Kulfis' },
  { id: 'fruits-special', label: 'Fruits & Tamboola' }
];

export const CATERING_CATEGORIES = [
  // 1. WELCOME DRINKS & SOUPS
  {
    id: 'welcome-drinks',
    group: 'drinks-soups',
    name: 'Welcome Drinks',
    page: 'Page 2',
    description: 'Refreshing faludas, fruit punches, thick milkshakes and traditional cool sips to welcome your guests.',
    icon: 'Wine',
    items: [
      'Faluda Rose Milk',
      'Faluda Badam Milk',
      'Gulkand Milk Shake',
      'Faluda Venila Shake',
      'Faluda Mango Shake',
      'Faluda Lichi Shake',
      'Faluda Strawberry Shake',
      'Chocolate Milk Shake',
      'Pistachio Milk Shake',
      'Kiwi Milk Shake',
      'Fruit Punch',
      'Fruit Milk Punch',
      'Butterscotch Shake',
      'Fresh Sugar Cane Juice',
      'Arabian Pulp Grape',
      'Mint Lime',
      'Cold Kesar Badam Milk',
      'Hot Badam Milk',
      'Fresh Tender Coconut'
    ]
  },
  {
    id: 'soups',
    group: 'drinks-soups',
    name: 'Hot Soups',
    page: 'Page 2',
    description: 'Aromatic, rich, and comforting freshly prepared vegetarian hot soups.',
    icon: 'Soup',
    items: [
      'Tomato Soup',
      'Veg Clear Soup',
      'French Onion Soup',
      'Cream of Mushroom Soup',
      'Cream of Broccoli Soup',
      'Cream of Sweetcorn Soup',
      'Cream of Coriander Soup',
      'Cream of Veg Soup',
      'Cream of Spring Onion Soup',
      'Cream of Spinach Soup',
      'Cream of Carrot & Beans Soup',
      'Cream of Green Peas Soup',
      'Cream of Sagu (Sabbaki) Soup',
      'Cream of Beetroot Soup',
      'Corn & Veg Soup',
      'Curry Leaf Soup',
      'Lemon Coriander Soup',
      'Veg Man Chow Soup',
      'Hot & Sour Soup',
      'Drum Stick Soup'
    ]
  },
  {
    id: 'cold-soups',
    group: 'drinks-soups',
    name: 'Cold Soups',
    page: 'Page 2',
    description: 'Cooling, refreshing gourmet cold soups for warm celebrations.',
    icon: 'Sparkles',
    items: [
      'Watermelon Cold Soup',
      'Cucumber Cold Soup'
    ]
  },

  // 2. STARTERS & APPETIZERS
  {
    id: 'welcome-starters',
    group: 'starters',
    name: 'Welcome Starters',
    page: 'Page 2',
    description: 'Crispy finger foods, cheese balls, and appetizing bites served on arrival.',
    icon: 'Utensils',
    items: [
      'Dry Fruit Fry Masala',
      'Jalapeño Cheese Ball',
      'Mushroom Cheese Ball',
      'Corn Cheese Ball',
      'Mix Veg Cheese Ball',
      'Mint Cheese Ball',
      'Crispy Paneer Ball',
      'Paneer Tikka',
      'Babycorn Lollipop',
      'French Fries',
      'Potato Wedges',
      'Kimiya Dates',
      'Crispy Corn'
    ]
  },
  {
    id: 'mushroom-starter',
    group: 'starters',
    name: 'Mushroom Starters',
    page: 'Page 6',
    description: 'Fresh button mushrooms tossed in ghee roast spices, Manchurian, and fiery pepper rubs.',
    icon: 'Flame',
    items: [
      'Mashroom Ghee Roast',
      'Mashroom Chilli',
      'Mashroom Manchurian',
      'Mashroom 65',
      'Mashroom Pepper Dry',
      'Mint Mashroom',
      'Schezwan Mashroom'
    ]
  },
  {
    id: 'baby-corn-starter',
    group: 'starters',
    name: 'Baby Corn Starters',
    page: 'Page 6',
    description: 'Golden crunchy baby corn lollipops, Manchurian, and pepper dry delicacies.',
    icon: 'Sparkles',
    items: [
      'Baby Corn Lollipop',
      'Baby Corn Manchurian',
      'Baby Corn Pepper Dry',
      'Baby Corn Chilli',
      'Mint Baby Corn Lollipop'
    ]
  },
  {
    id: 'dry-starters',
    group: 'starters',
    name: 'Dry Starters & Kababs',
    page: 'Page 6',
    description: 'Tantalizing vegetarian kababs, cutlets, rolls, and sizzling tawa subji.',
    icon: 'Utensils',
    items: [
      'Raw Jack Fruit Kabab',
      'Aloo Kabab',
      'Harabara Kebeb',
      'Veg Katlet',
      'Cheese Balls',
      'Paneer Sathey',
      'Veg Spring Roll',
      'Aloo Chilli',
      'Veg Ball Manchurian',
      'Aloo Manchurian',
      'Spanish Manchurian',
      'Suvarna Gadde Chilli',
      'Samosa',
      'Tawa Subji'
    ]
  },
  {
    id: 'south-indian-starter',
    group: 'starters',
    name: 'South Indian Starters & Bajjis',
    page: 'Page 6',
    description: 'Authentic hot bajjis, Maddur vada, Uddina vada, Mangalore bajjis, and rawa fries.',
    icon: 'Leaf',
    items: [
      'Chilli Bajji',
      'Cheese Chilli Stuff Bajji',
      'Raw Banana Bajji',
      'Aloo Bajji',
      'Hirekai Bajji',
      'Capsicum Bajji',
      'Veg Aloo Bonda',
      'Aloo Bonda',
      'Onion Pakoda',
      'Maddur Vada',
      'Masala Vada',
      'Uddina Vada',
      'Dahi Vada',
      'Dry Nuts Pakoda',
      'Manglore Bajji',
      'Raw Banana Rawa Fry',
      'Badanekai Rawa Fry',
      'Green Leaves Pakoda',
      'Corn Bonda',
      'Baby Corn Bajji',
      'Lady Finger Dry',
      'Raw Jackfruit Rawa Fry'
    ]
  },
  {
    id: 'chef-specials',
    group: 'starters',
    name: 'Chef House Specials',
    page: 'Page 16',
    description: 'Signature culinary specialties designed by our master chefs.',
    icon: 'Award',
    items: [
      'Kulfi Cone',
      'Till Toast',
      'Schezwan Boat',
      'Paneer Peshawari'
    ]
  },

  // 3. ROYAL SWEETS & HALWA
  {
    id: 'sweet-with-stick',
    group: 'sweets',
    name: 'Sweet With Stick',
    page: 'Page 2',
    description: 'Artisanal bite-sized sweets served gracefully on picks.',
    icon: 'Sparkles',
    items: [
      'Coffee Burfy',
      'Mini Angoor Malai',
      'Mini Cashew Burfy',
      'Mini Flavored Kova Burfy',
      'Cheese Pineapple Cherry'
    ]
  },
  {
    id: 'malai-sweets',
    group: 'sweets',
    name: 'Malai Sweets',
    page: 'Page 3',
    description: 'Luxurious cream rasgullas, chum chums, rasmalai, and kheer kadam made with pure milk.',
    icon: 'Sparkles',
    items: [
      'Cream Rasgulla',
      'Mango Rasgulla',
      'Strawberry Rasgulla',
      'Lichi Rasgulla',
      'Cream Chum Chum',
      'Peni Chum',
      'Rusk Cream Chum Chum',
      'Rose Chum Chum',
      'Kesar Chum Chum',
      'Chocolate Chum Chum',
      'Strawberry Chum Chum',
      'Madka Kesar Rasmalai',
      'Strawberry Rasmalai',
      'Mango Rasmalai',
      'Malai Sandwich',
      'Malai Pan Sandwich',
      'Pineapple Malai Sandwich',
      'Kesar Champakali',
      'Strawberry Champakali',
      'Rose Champakali',
      'Lichi Gulla',
      'Strawberry Gulla',
      'Mango Gulla',
      'Kheer Kadam',
      'Strawberry Kheer Kadam',
      'Mango Kheer Kadam',
      'Kesar Kheer Kadam',
      'Angoor Malai',
      'Rabadi Toast',
      'Rasmadhuri'
    ]
  },
  {
    id: 'special-peta-sweets',
    group: 'sweets',
    name: 'Special Peta Sweets',
    page: 'Page 3',
    description: 'Exquisite Agra style fruit rolls, peta sandwiches, and tawa mix sweets.',
    icon: 'Sparkles',
    items: [
      'Pappaya Pan',
      'Strawberry Peta Roll',
      'Mango Peta Roll',
      'Orange Peta Roll',
      'Glass Sandwich',
      'Peta Sandwich',
      'Pappaya Roll',
      'Navarthna Peta',
      'Mango Malai Peta Roll',
      'Lichi Flot',
      'Tawa Mix Sweets'
    ]
  },
  {
    id: 'kaaju-burfy-sweets',
    group: 'sweets',
    name: 'Kaaju & Almond Burfy Sweets',
    page: 'Page 3',
    description: 'Premium cashew nut diamonds, rolls, and almond cubes crafted with finest nuts.',
    icon: 'Award',
    items: [
      'Kaaju Diamond',
      'Kaaju Pistachio Roll',
      'Kaaju Almond Roll',
      'Kaaju Strawberry Roll',
      'Kaaju Pineapple Roll',
      'Kaaju Mango Roll',
      'Kaaju Watermelon',
      'Kaaju Samosa',
      'Kaaju Jamoon',
      'Kaaju Flower',
      'Kaju Pineapple Slice',
      'Almond Burfy Sweet',
      'Almond Diamond',
      'Almond Pistachio Roll',
      'Almond Strawberry Roll',
      'Almond Cube',
      'Almond Kaaju Cube',
      'Almond Mango Cube',
      'Tiranga Almond'
    ]
  },
  {
    id: 'pistachio-burfy-sweets',
    group: 'sweets',
    name: 'Pistachio Burfy Sweets',
    page: 'Page 4',
    description: 'Royal green pistachio rolls, cubes, and diamond confections.',
    icon: 'Sparkles',
    items: [
      'Pistachio Diamond',
      'Pistachio Badam Roll',
      'Pistachio Cube',
      'Pistachio Strawberry Roll',
      'Pistachio Cashew Roll',
      'Pistachio Vanilla Cube'
    ]
  },
  {
    id: 'special-dry-fruits-sweets',
    group: 'sweets',
    name: 'Special Dry Fruits Sweets',
    page: 'Page 4',
    description: 'Sugar-free & natural dry fruit delights, anjoor rolls, and sandwiches.',
    icon: 'Sparkles',
    items: [
      'Dry Fruit Delight',
      'Dry Fruits Sandwich',
      'Anjoor Dry Fruit King',
      'Dry Fruit Roll',
      'Dry Fruit Diamond'
    ]
  },
  {
    id: 'special-kova-burfy',
    group: 'sweets',
    name: 'Special Kova Burfy',
    page: 'Page 4',
    description: 'Rich slow-reduced milk kova burfies in chocolate, horlicks, bru coffee, and fruit notes.',
    icon: 'Sparkles',
    items: [
      'Choco Chip Burfy',
      'Chocolate Venila Burfy',
      'Bru Coffee Burfy',
      'Gulkand Burfy',
      'Boondi Burfy',
      'Horlicks Burfy',
      'Boost Burfy',
      'Fig Burfy',
      'Kova Dry Fruit Burfy',
      'Mango Burfy',
      'Strawberry Burfy',
      'Venila Burfy',
      'Milk Burfy',
      'Tiranga'
    ]
  },
  {
    id: 'holige',
    group: 'sweets',
    name: 'Holige (Poli / Obbattu)',
    page: 'Page 4',
    description: 'Traditional South Indian festival flatbread sweets stuffed with dhal, coconut, kova, and fruits.',
    icon: 'Leaf',
    items: [
      'Coconut Holige',
      'Dhal Holige',
      'Carrot Holige',
      'Kadlebele Holige',
      'Kova Holige',
      'Kashi Halwa Holige',
      'Fig Holige',
      'Dates Holige',
      'Gulkand Holige',
      '50 50 Holige',
      'Pineapple Holige',
      'Almond Holige',
      'Sajjige Holige',
      'Jamoon Holige'
    ]
  },
  {
    id: 'halwa',
    group: 'sweets',
    name: 'Halwa Varieties',
    page: 'Page 4',
    description: 'Warm pure desi ghee halwas made of carrot, kashi, almond, sorekai, and dry fruits.',
    icon: 'Flame',
    items: [
      'Carrot Halwa',
      'Kashi Halwa',
      'Almond Halwa',
      'Fig Halwa',
      'Moongdal Halwa',
      'Dry Fruit Halwa',
      'Sorekai Halwa',
      'Tawa Halwa',
      'Beetroot Halwa',
      'Jackfruit Halwa',
      'Chaina Grass Halva',
      'Bombay Halwa',
      'Pistachio Halwa'
    ]
  },

  // 4. BREADS, DOSAS & IDLIS
  {
    id: 'south-indian-dosa',
    group: 'breads-dosas',
    name: 'South Indian Bread Dosa',
    page: 'Page 6',
    description: 'Crisp hot tawa dosas prepared live: masala, chutney pudi, neer, mulbagilu, and ragi.',
    icon: 'Flame',
    items: [
      'Masala Dosa',
      'Set Dosa',
      'Chutney Pudi Dosa',
      'Mix Veg Dosa',
      'Neer Dosa',
      'Kaali Dosa',
      'Sagu Masala Dosa',
      'Carrot Dosa',
      'Ragi Dosa',
      'Paneer Dosa',
      'Mulbagilu Dosa'
    ]
  },
  {
    id: 'north-indian-breads',
    group: 'breads-dosas',
    name: 'North Indian Breads',
    page: 'Page 7',
    description: 'Clay-tandoor & tawa naans, kulchas, roomali rotis, and stuffed paratas.',
    icon: 'Utensils',
    items: [
      'Tawa Naan',
      'Naan',
      'Butter Garlic Naan',
      'Coriander Naan',
      'Roomali Roti',
      'Palak Roomali',
      'Mint Roomali',
      'Beetroot Roomali',
      'Kulcha',
      'Carrot Kulcha',
      'Coriander Kulcha',
      'Butter Garlic Kulcha',
      'Palak Kulcha',
      'Pulka',
      'Butter Pulka',
      'Aloo Parata',
      'Paneer Parata',
      'Channa Bathura',
      'Methi Roti',
      'Coin Parota',
      'Silvan Parota',
      'Verities Stuffed Paratas'
    ]
  },
  {
    id: 'south-indian-breads',
    group: 'breads-dosas',
    name: 'South Indian Breads & Rotis',
    page: 'Page 7',
    description: 'Heritage Akki roti, ragi rotti, jolada roti, poori varieties, and ragi mudde.',
    icon: 'Leaf',
    items: [
      'Akki Roti',
      'Ragi Rotti',
      'Moon Roti',
      'Jolada Roti',
      'Meeti Chapati',
      'Chapati',
      'Poori',
      'Palak Poori',
      'Beetroot Poori',
      'Mint Poori',
      'Ragi Mudde',
      'Bili Holige',
      'Aloo Holige'
    ]
  },
  {
    id: 'idli-kadabu',
    group: 'breads-dosas',
    name: 'Idli & Steamed Kadabu',
    page: 'Page 7',
    description: 'Steaming soft Tatte idlis, rawa idlis, avrekai idli, button idlis, and spicy kadabu.',
    icon: 'Utensils',
    items: [
      'Rice Idli',
      'Sabbaki Idli',
      'Rawa Idli',
      'Tatte Idli',
      'Avrekai Masala Idli',
      'Kotte Idli',
      'Cup Idli',
      'Button Idli',
      'Carrot Idli',
      'Corn Idli',
      'Steamed Spicy Kadabu'
    ]
  },
  {
    id: 'raita',
    group: 'breads-dosas',
    name: 'Raita Accompaniments',
    page: 'Page 7',
    description: 'Chilled spiced yogurt preparations with fresh cucumbers, boondi, pineapple, and fruits.',
    icon: 'Sparkles',
    items: [
      'Onion Cucumber Raita',
      'Onion Tomoto Raita',
      'Boondi Raita',
      'Pineapple Raita',
      'Veg Raita',
      'Fruits Raita'
    ]
  },

  // 5. SALADS & RAITAS
  {
    id: 'traditional-salads',
    group: 'salads-raita',
    name: "Salad 's & Kosambari",
    page: 'Page 11',
    description: 'Traditional auspicious moongdal & sprouts kosambari, peanut masala, and paneer stuff salads.',
    icon: 'Leaf',
    items: [
      'Moongdal Kosambari',
      'Sprouts Kosambari',
      'Penut Masala',
      'Sweet Corn + Pomegranate',
      'Dry Fruit Kosambri',
      'Jackfruit Stuff Kosambari',
      'Paneer Stuff Kosambari',
      'Aloo Channa Chat',
      'Fresh Fruit Salad',
      'Fresh Veg Cuttings'
    ]
  },
  {
    id: 'overseas-salad',
    group: 'salads-raita',
    name: "Oversea's Salads",
    page: 'Page 11',
    description: 'Continental salads: Russian, coleslaw, Mexican, and macaroni pasta salad.',
    icon: 'Sparkles',
    items: [
      'Russian Salad',
      'Coleslaw',
      'Mexican Salad',
      'Macaroni Pasta Salad',
      'Cucumber Salad'
    ]
  },

  // 6. CHATS & KIDS COUNTER
  {
    id: 'bombay-chat',
    group: 'chats-kids',
    name: 'Bombay Chat',
    page: 'Page 11',
    description: 'Tangy, spicy street chats including hot pav bhaji, samosa masala, and palak patta chat.',
    icon: 'Flame',
    items: [
      'Samosa Masala',
      'Kachori Masala',
      'Katlet',
      'Pav Bajji',
      'Vadapav',
      'Dahi Papdi',
      'Palak Patta Masala',
      'Palak Chat'
    ]
  },
  {
    id: 'beeda-bangarpet',
    group: 'chats-kids',
    name: 'Beeda & Bangarpet Chats',
    page: 'Page 16',
    description: 'Famous Banaras beeda, sweet paan, fire pan, crisp pani pooris, and Bangarpet chats.',
    icon: 'Sparkles',
    items: [
      'Banaras Beeda',
      'Sweet Paan',
      'Dates Paan',
      'Mogai Pan',
      'Fire Pan',
      'Bangarpet Chats',
      'Pani Poori',
      'Masala Poori',
      'Bhel Poori',
      'Ghee Bhel',
      'Ring Bhel',
      'Corn Bhel',
      'Sev Poori',
      'Tikki Poori',
      'Dahi Poori',
      'Dahi Boondi',
      'CCM Masala',
      'Moongdal Masala',
      'Tomoto Slice'
    ]
  },
  {
    id: 'kids-counter',
    group: 'chats-kids',
    name: "Kid's Counter",
    page: 'Page 16',
    description: 'Spiral potato twisters, cotton candy, crushed ice golas, and chocolate fountains for little guests.',
    icon: 'Sparkles',
    items: [
      'Potato Twiser',
      'Banana Twister',
      'Pop Corn (verities)',
      'Cotton Candy',
      'Crushed Ice Gola',
      'American Steam Corn',
      'Chocolate Fountain'
    ]
  },

  // 7. ICE CREAMS & DESSERTS
  {
    id: 'ice-creams',
    group: 'icecreams',
    name: 'Ice Creams',
    page: 'Page 11',
    description: 'Creamy scoops, slices, and cups in over a dozen delicious fruity and rich flavors.',
    icon: 'Sparkles',
    items: [
      'Cup / Slice / Scoop Service',
      'Vanilla',
      'Strawberry',
      'Tuttyfrutty',
      'American Vanilla',
      'Pineapple',
      'Kesar Pistachio',
      'Butterscotch',
      'Gulkand',
      'Nuts and Fruit',
      'Chocolate',
      'Mango',
      'Choco Chip',
      'Coffee',
      'Lichy',
      'Black Currant'
    ]
  },
  {
    id: 'special-icecream',
    group: 'icecreams',
    name: 'Special Ice Cream',
    page: 'Page 11',
    description: 'Showstopping theatrical desserts: fried ice cream, matka kesar kulfi, gudbud, smoke ice & cassata.',
    icon: 'Award',
    items: [
      'Madka Kesar Kulfy',
      'Stick Kulfy',
      'Gudbud',
      'Hot Chocolate Fudge',
      'Roasted Almond',
      'Rajbhog',
      'Pizza Ice Cream',
      'Dry Fruit Pizza',
      'Dip in Ice Cream',
      'Benne Gulkand',
      'Golden Cherry',
      'Cake Ice Cream',
      'Cassata',
      '2 in One',
      '3 in One',
      'Fried Ice Cream',
      'Pop Corn Ice Cream',
      'Stone Ice',
      'Shahi Kush',
      'Guava Ice Cream',
      'Watermelon Ice Cream',
      'Smoke Ice'
    ]
  },

  // 8. FRUITS & TAMBOOLA
  {
    id: 'fruits-varieties',
    group: 'fruits-special',
    name: 'Fruits Varieties',
    page: 'Page 16',
    description: 'Fresh seasonal hand-cut fruits served attractively on platters.',
    icon: 'Leaf',
    items: [
      'Apple',
      'Pineapple',
      'Sapota',
      'Grape',
      'Pappaya',
      'Watermelon'
    ]
  },
  {
    id: 'imported-fruits',
    group: 'fruits-special',
    name: 'Imported Fruits Counter',
    page: 'Page 16',
    description: 'Exotic premium imported fruits display: Australia grapes, kiwi, pears, litchi, and Kashmir apples.',
    icon: 'Award',
    items: [
      'Australia Grape',
      'Kiwi',
      'Pears',
      'Fig',
      'Litchi',
      'Strawberry',
      'Kashmir Apple',
      'Red Guava',
      'Cherry'
    ]
  },
  {
    id: 'tamboola-water',
    group: 'fruits-special',
    name: 'Tamboola & Packaged Water',
    page: 'Page 16',
    description: 'Traditional auspicious return gifts and sealed mineral water bottles.',
    icon: 'Sparkles',
    items: [
      'Cloth Bag (Printed)',
      'Fancy Bag (Printed)',
      'Bisleri (500 ml & 250 ml)',
      'Kinley (500 ml)',
      'Aquafina (500 ml)'
    ]
  }
];

export const TOTAL_MENU_ITEMS_COUNT = CATERING_CATEGORIES.reduce(
  (sum, cat) => sum + cat.items.length, 
  0
);
