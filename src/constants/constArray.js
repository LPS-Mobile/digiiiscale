import fragments from "../public/images/fragments.jpg";
import blueDream from "../public/images/blueDream.jpg";
import brownies from "../public/images/brownies.jpg";
import chevyChase from "../public/images/chevy_chase.jpg";



export const HAMBURGER_ITEMS = [
  { name: "Settings", href: "/" },
  { name: "Change App Skin", href: "/" },
  { name: "Kilograms", otherName: "Grams" },
  { name: "State Laws", href: "/state-of-laws" },
  { name: "Digiscale Delivery", href: "/set-location" },
  { name: "Request for Pickup", href: "/register-pickup" },
  { name: "Digiscale Partners", href: "/digiscale-partners" },
];

export const UNAUTH_USER = [
  { name: "Login", href: "/login" },
  { name: "Kg", otherName: "Grams" },
]
export const PARENT_ORDER_OPTIONS = [
  {
    categoryNameID: "rollingGreens",
    url: fragments,
    street: "Rolling Greens, 20 East",
    phone: "555-248-2459",
    rating: "4.5",
    childrenOrder: {
      id: 1,
      url: blueDream,
      selectProductID: "flower",
      childrenOrderData: [
        {
          url: fragments,
          price: "$40.00",
          text: "Blue Dream 1/8 oz",
        },
        {
          url: null,
          price: "24% THC",
          text: "Hybrid",
        },
      ],
    },
  },

  {
    categoryNameID: "hamiltonGoods",
    url: chevyChase,
    street: "Hamilton's Goods, 55 West Road",
    phone: "555-248-2459",
    rating: "3.5",
    childrenOrder: {
      id: 2,
      url: brownies,
      selectProductID: "nonflower",
      childrenOrderData: [
        {
          url: fragments,
          price: "$19.99",
          text: "Nathan's Brownies: Macadamia Nut",
        },
        {
          url: null,
          price: "100mg",
          text: "Edible",
        },
      ],
    },
  },
];


export const ROLLING_OPTIONS = [
  { id: "", name: "All Products", isDotHide: true },
  { id: "rollingGreens", name: "Rolling Greens", isDotHide: true },
  { id: "hamiltonGoods", name: "Hamilton's Goods", isDotHide: true },
];

export const PRODUCTS = [
  { id: "", name: "All Products", isDotHide: true },
  { id: "Flower", name: "Flower" },
  { id: "NonFlower", name: "Non-Flower" },
  { id: "MiscellaniesProduct", name: "Miscellanies Products" },
];


export const STATES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']