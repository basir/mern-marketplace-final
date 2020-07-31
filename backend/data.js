import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Basir',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: 'Top Shoes',
        logo: '/images/logo1.png',
        description: 'best shoes sellers',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'John',
      email: 'seller@example.com',
      password: bcrypt.hashSync('1234', 8),
      isSeller: true,
      seller: {
        name: 'Niki Shoes',
        logo: '/images/logo2.png',
        description: 'great shoes sellers',
        rating: 4.0,
        numReviews: 450,
      },
    },
    {
      name: 'Sara',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
    },
  ],
  products: [
    {
      price: 135,
      countInStock: 10,
      rating: 0,
      numReviews: 0,
      name: "PUMA Men's Tazon 6 FM Running Shoe",
      image: '/images/p1.jpg',
      brand: 'Puma',
      category: 'Shoes',
      description:
        '100% Synthetic Leather\nImported\nRubber sole\nSynthetic leather upper\nMidfoot saddle for maximum fit',
    },
    {
      price: 126,
      countInStock: 5,
      rating: 5,
      numReviews: 1,
      name: 'Converse Chuck Taylor All Star High Top Sneaker',
      image: '/images/p2.jpg',
      brand: 'Converse',
      category: 'Shoes',
      description:
        'Canvas\nImported\nRubber sole\nShaft measures approximately high-top from arch\nPlatform measures approximately 1 inches\nShoes availavble are in UK sizes. Refer size chart for US size conversion\nLace-up, high-top sneaker',
    },
    {
      price: 160,
      countInStock: 10,
      rating: 3,
      numReviews: 1,
      name: "New Balance Women's Fresh Foam 1165 V1 Walking Shoe",
      image: '/images/p3.jpg',
      brand: 'New Balance',
      category: 'Shoes',
      description:
        '100% Synthetic\nImported\nRubber sole\nSynthetic/mesh upper\nFresh Foam midsole cushioning is engineered for precision comfort\nRubber outsole',
    },
    {
      price: 84,
      countInStock: 10,
      rating: 4,
      numReviews: 1,
      name: "Under Armour Men's Sway Running Shoe",
      image: '/images/p4.jpg',
      brand: 'Under Armour',
      category: 'Shoes',
      description:
        'Textile\nImported\nRubber sole\nShaft measures approximately low-top from arch\nNEUTRAL: For runners who need a balance of flexibility & cushioning.',
    },
    {
      price: 120,
      countInStock: 20,
      rating: 4,
      numReviews: 2,
      name: "PUMA Women's Tazon 5 Cross-Training Shoe",
      image: '/images/p5.jpg',
      brand: 'Puma',
      category: 'Shoes',
      description:
        '100% Leather/Synthetic\nImported\nRubber sole\nLace-up athletic shoe featuring breathable perforated side panels and toe\nPadded tongue and collar\nCushioned foam midsole\nHigh-rebound EcoOrthoLite sockliner',
    },
    {
      price: 99,
      countInStock: 20,
      rating: 1.5,
      numReviews: 2,
      name: 'Fila Kids Disruptor Ii Repeat Big Sneaker',
      image: '/images/p6.jpg',
      brand: 'Fila',
      category: 'Shoes',
      description:
        'Synthetic\nImported\nLeather: Cowhide\nRubber sole\nLace-up at top\nImported, China\nLow tops',
    },
  ],
};
export default data;
