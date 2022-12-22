const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");

const NUM_SEED_USERS = 10;
const NUM_SEED_PRODUCT = 30;

// Create users
const users = [];

users.push(
  new User({
    username: "admin",
    email: "admin@express.com",
    hashedPassword: bcrypt.hashSync("ExpressPOS", 10),
  })
);

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
    })
  );
}

// Create categories
const categories = [];

const categoryTitles = ["Sandwiches", "Salads", "Soups", "Drinks", "Bakery"];

for (let i = 0; i < categoryTitles.length; i++) {
  categories.push(
    new Category({
      title: categoryTitles[i],
    })
  );
}

// Create products
const products = [];

const sandwiches = [
  "Chipotle Chicken Avocado Melt",
  "Signature Take Chicken",
  "Toasted Frontega Chicken",
  "Toasted Steak & White Cheddar",
  "Smokehouse BBQ Chicken",
  "Spicy Take Chicken",
  "Tuna Salad",
  "Classic Grilled Cheese",
  "Bacon Turkey Bravo",
  "Napa Almond Chicken",
  "Roasted Turkey & Avocado BLT",
  "Mediterranean Veggie",
];

const sandwichPrices = [
  1079, 1639, 1079, 1209, 969, 1639, 969, 839, 1079, 1209, 989, 969,
];

const sandwichImgUrl = [
  "https://tb-static.uber.com/prod/image-proc/processed_images/dbce0591ad848026485c8fa7ee6e3d24/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/d85f04686965d1479bd6dff350468086/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/d0d9ae8ec16d7e25db813edfecb1e2fd/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/04c0e85153458caf6b7c2b46edd2cf42/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/5677f5b4fc995314c7952615fb026bfc/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/7cc2093d76b39a3465124fccdd80634c/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/b612cb9e666a894b3cff4126d1268ade/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/fb2fe933f1e7459dc6548a9264b6970f/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/633e77947a698fbef12175a5c42510ca/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/171d15fb8e35009b1188175973984a4e/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/600eed5aef31e9fbd2734364372a6dec/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/9bbaf9b942a0b46d0d2e2eb454e7e105/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
];

for (let i = 0; i < sandwiches.length; i++) {
  products.push(
    new Product({
      name: sandwiches[i],
      category: categories[0],
      price: sandwichPrices[i],
      imageUrl: sandwichImgUrl[i],
    })
  );
}

const salads = [
  "Chicken Caesar Salad",
  "Green Goddess Cobb Salad",
  "Greek Salad",
  "Fuji Apple Salad",
  "Asian Sesame Salad",
  "Citrus Asian Crunch Salad",
  "BBQ Chicken Salad",
  "Caesar Salad",
];

const saladPrices = [1079, 1229, 869, 1079, 1079, 1229, 1079, 869];

const saladImgUrl = [
  "https://tb-static.uber.com/prod/image-proc/processed_images/71be995854fe740308caa6ece4a7d82e/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/a4ead3db1faf8a9ef5beae0f78b38904/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/be21e7087f959cad74cffedee1397051/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/65ee2ea9b46120676c382f61b8fee3fa/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/edd11bfc2fdd6815ecaa0ca0273f26d0/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/a227cd0f32b756d93d7d784c64cec40e/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/2c442dc27e19b9dbeb44a877350066b5/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/1721ffcc91080d55c5a4ffd30aae57a7/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
];

for (let i = 0; i < salads.length; i++) {
  products.push(
    new Product({
      name: salads[i],
      category: categories[1],
      price: saladPrices[i],
      imageUrl: saladImgUrl[i],
    })
  );
}

const soups = [
  "Broccoli Cheddar",
  "Homestyle Chicken Noodle",
  "Creamy Tomato",
  "Cream of Chicken & Wild Rice",
  "Vegetarian Autumn Squash",
  "Bistro French Onion",
];

const soupPrices = [859, 859, 969, 859, 859, 859];

const soupImgUrl = [
  "https://tb-static.uber.com/prod/image-proc/processed_images/125eef24429ec5e684b69f657bb53975/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/0fd3d96cbe2b6ef1a7df92b645849d0f/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/3ce724a5798155124c7889d4149ce739/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/116325a6f76e3f9f9725df77016f9f45/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/56da86edeb253d448eaf01333c5054b7/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/e2301673a014e29223bfe28a461c9133/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
];

for (let i = 0; i < soups.length; i++) {
  products.push(
    new Product({
      name: soups[i],
      category: categories[2],
      price: soupPrices[i],
      imageUrl: soupImgUrl[i],
    })
  );
}

const drinks = [
  "Passion Papaya Iced Green Tea",
  "Strawberry Banana Smoothie",
  "Pepsi",
  "Celsius",
  "Strawberry Lemon Mint",
  "Diet Pepsi",
  "Orange Juice",
  "Sierra Mist",
  "Bottled Water",
];

const drinkPrices = [379, 859, 269, 379, 269, 509, 369, 419, 369];

// const drinkImgUrl = [
//   "https://tb-static.uber.com/prod/image-proc/processed_images/ec65244a126cc29ebef7afce1f686726/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
//   "https://tb-static.uber.com/prod/image-proc/processed_images/45720ac75f43550505e1d43441c4b3e1/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
//   "https://tb-static.uber.com/prod/image-proc/processed_images/205b132d6cde1a2b7ff563d0591ba42e/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
//   "https://tb-static.uber.com/prod/image-proc/processed_images/d7805cf320f4c450c6c5dbe092f45bef/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
//   "https://tb-static.uber.com/prod/image-proc/processed_images/0ce72ece078ffc67a349f52615e36bbf/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
//   "https://tb-static.uber.com/prod/image-proc/processed_images/25fd40ee01d2ff02cbc5d0cf2fccef3e/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
//   "https://tb-static.uber.com/prod/image-proc/processed_images/5bd773c2cc2af98febb0ad83c8ec02e9/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
//   "https://tb-static.uber.com/prod/image-proc/processed_images/66700e2953699e834540b4313e9aeaea/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
//   "https://tb-static.uber.com/prod/image-proc/processed_images/3d8ca669b613b1a1f0910c8729b42448/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
// ];

const drinkImgUrl = [
  "https://cdn.shopify.com/s/files/1/0297/8132/7932/products/iced_TropicalGreenGlass.png?v=1598298624",
  "https://www.dynamicgreens.com/app/uploads/2015/09/low-fat-smoothies.png",
  "https://www.pepsico.com/images/default-source/products-brands/pepsi_12oz.png?sfvrsn=46c9ae09_0",
  "https://www.kroger.com/product/images/large/front/0088939200362",
  "https://cdn.sanity.io/images/vrmk0jny/production/287f504d28e6ecba831327f69be337a2c9396382-404x404.png?q=20&auto=format",
  "https://popmenucloud.com/cdn-cgi/image/width=1920,height=1920,format=auto,fit=scale-down/tfxzsylp/6074068f-3526-4f2f-b545-82430a7bc400.png",
  "https://vivavillamexicangrill.com/wp-content/uploads/2021/01/16-1.png",
  "https://www.pepsicoproductfacts.com/content/image/products-thumbs/Sierra_12_thumb.png?r=20221017",
  "https://cdn.shopify.com/s/files/1/0051/7262/5477/products/FW_2021_1500ml_900x900_3d63739b-efa0-4905-ab0d-28ffdf6d23f7_grande.png?v=1622553333",
];

for (let i = 0; i < drinks.length; i++) {
  products.push(
    new Product({
      name: drinks[i],
      category: categories[3],
      price: drinkPrices[i],
      imageUrl: drinkImgUrl[i],
    })
  );
}

const bakery = [
  "Chocolate Cookie",
  "Brownie",
  "Mitten Cookie",
  "Candy Cookie",
  "Lemon Drop Cookie",
  "Blueberry Bagel",
  "Plain Bagel",
  "Everything Bagel",
];

const bakeryPrices = [369, 459, 409, 369, 369, 229, 229, 229];

const bakeryImgUrl = [
  "https://tb-static.uber.com/prod/image-proc/processed_images/992dde13d83201ba74e39333d87b081a/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/cfefcd6c21a92092aa578a3d93b65531/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/512937066705ac458067f5cd04309995/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/286bcd3364e29bcd4eeb81e52c6526e3/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/d6ed2008ac6665f3be267ad28af275a8/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/e2edd7bfb5a5094bb58879b3292a628d/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/445aaf039fd8ab76e698725ed4e6cbb7/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
  "https://tb-static.uber.com/prod/image-proc/processed_images/438b175c8b682b9a1fbbd78086f7f062/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
];

for (let i = 0; i < bakery.length; i++) {
  products.push(
    new Product({
      name: bakery[i],
      category: categories[4],
      price: bakeryPrices[i],
      imageUrl: bakeryImgUrl[i],
    })
  );
}

// COMPLETELY RANDOM DATA
// for (let i = 0; i < NUM_SEED_PRODUCT; i++) {
//   products.push(
//     new Product({
//       name: faker.commerce.product(),
//       category: categories[Math.floor(Math.random() * categories.length)]._id,
//       price: (Math.random() * (20 - 1) + 1) * 100 + 99,
//       description: faker.commerce.productDescription(),
//       imageUrl: faker.image.food(),
//       // imageUrl: "https://spirit.scene7.com/is/image/Spirit/01406669-a?$Detail$",
//     })
//   );
// }

const ORDER_AMOUNT = 400;
const createOrders = [];
const discountChance = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 5,
];
let ORDER_NUMBER_INC = 1;

for (let i = 0; i < ORDER_AMOUNT; i++) {
  const TAX = 8.8875;
  let orderItems = [];
  let productArray = [];
  let productsCount = {};
  let totalPriceSum = 0;

  for (let y = 0; y < Math.floor(Math.random() * (10 - 1) + 1); y++) {
    let RANDOM_NUM = Math.floor(Math.random() * (products.length - 1));
    orderItems.push(products[RANDOM_NUM]);
    productsCount[products[RANDOM_NUM]._id] =
      (productsCount[products[RANDOM_NUM]._id] || 0) + 1;
  }

  console.log(orderItems);

  for (const product of orderItems) {
    let productObject = {};
    productObject["_id"] = product._id;
    productObject["name"] = product.name;
    productObject["quantity"] = productsCount[product._id];
    productObject["totalPrice"] = product.price * productObject["quantity"];

    productArray.push(productObject);
    totalPriceSum += productObject["totalPrice"];
  }

  // 2022-12-22T05:05:57.504+00:00

  let YEAR = Math.floor(Math.random() * 22);
  let MONTH = Math.floor(Math.random() * (12 - 1) + 1);
  let DAY = Math.floor(Math.random() * (28 - 1) + 1);

  if (YEAR < 10) YEAR = "0" + YEAR.toString();
  else YEAR.toString();

  if (MONTH < 10) MONTH = "0" + MONTH.toString();
  else MONTH.toString();

  if (DAY < 10) DAY = "0" + DAY.toString();
  else DAY.toString();

  let DATE = "20" + YEAR + "-" + MONTH + "-" + DAY + "T05:05:57.504+00:00";

  let discountPerc =
    discountChance[Math.floor(Math.random() * (discountChance.length - 1))];

  let discountAmount = totalPriceSum * (discountPerc / 100);

  createOrders.push(
    new Order({
      number: Math.floor(Date.now() / 1000000000) * 1000 + ORDER_NUMBER_INC,
      discountPercentage: discountPerc,
      products: productArray,
      totalPrice: Math.ceil((totalPriceSum - discountAmount) * (1 + TAX / 100)),
      subTotal: totalPriceSum,
      tax: TAX,
      createdAt: DATE,
      updatedAt: DATE,
    })
  );
  ORDER_NUMBER_INC++;
}

const insertSeeds = () => {
  console.log("Resetting db and seeding users and products...");

  User.collection
    .drop()
    .then(() => User.insertMany(users))
    .then(() => {
      console.log("Done making users!");
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });

  Category.collection
    .drop()
    .then(() => Product.collection.drop())
    .then(() => Category.insertMany(categories))
    .then(() => Product.insertMany(products))
    .then(() => {
      console.log("Done making items!");
      console.log("Done making categories!");
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });

  Order.collection
    .drop()
    .then(() => Order.insertMany(createOrders))
    .then(() => {
      console.log("Done making orders!");
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    insertSeeds();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
