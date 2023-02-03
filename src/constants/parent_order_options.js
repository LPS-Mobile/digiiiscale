import fragments from "../public/images/fragments.jpg";
import blueDream from "../public/images/blueDream.jpg";
import brownies from "../public/images/brownies.jpg";
import chevyChase from "../public/images/chevy_chase.jpg";

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
      selectProductID: "nonFlower",
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
