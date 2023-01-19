
# Express

## Overview

[Express](https://expresspos.onrender.com/) is a point-of-sale system built upon efficiency, ease of access and sleek visuals. We created Express in order to upgrade restaurant owners’ existing point-of-sale technologies. Users of our system are able to add, replace and delete food items and categories from their restaurant's catalog. The checkout system we have implemented is smooth, intuitive, and seamless. Users are able to view a live data visualization depicting the current order. Users are also able to view the system's past order history.

![Screenshot](./frontend/public/img/Express%20Menu%20Screenshot.png)

## Technologies & Libraries

- MERN Stack:
  - MongoDB - NoSQL database management program which uses JSON-like documents
  - Express - Backend web application for building RESTful APIs with Node.js
  - React - Open source frontend library
  - Node.js - Open source backend JavaScript runtime environment
- Nivo - Data visualization library built on top of D3 & React
- Panera Bread menu items including product names & images

## Code Snippet - PATCH method Express.js route for updating a product (with error handling)

```js
router.patch("/:productId", validateProductInput, async (req, res, next) => {
  Product.findByIdAndUpdate(
    req.params.productId,
    {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    },
    { new: true }
  )
    .then((docs) => {
      return res.json(docs);
    })
    .catch((err) => {
      const error = new Error("Product can't be updated.");
      error.statusCode = 422;
      error.errors = { message: "Invalid product input values." };
      return next(error);
    });
});
```

## Code Snippet - Sample Product Category Thunk Action & Reducer Using React-Redux

```js
export const fetchCategoriesAsync = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/categories");
    const data = await res.json();
    const products = data.reduce((prev, curr) => {
      prev[curr._id] = curr;
      return prev;
    }, {});
    return dispatch(receiveCategories(products));
  } catch (err) {
    const res = await err.json();
    if (res.statusCode >= 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES: {
      return {
        ...state,
        entities: action.payload,
        ids: Object.keys(action.payload),
      };
    }
    case RECEIVE_CATEGORY: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload._id]: action.payload,
        },
        ids: [...Object.keys(state.entities), action.payload._id],
      };
    }
    default:
      return state;
  }
};
```

## Future Implementations
 - Data analytics pertaining to order history
 - Further admin functionalities including registering a new store and the ability to switch between stores and their respective menu items
