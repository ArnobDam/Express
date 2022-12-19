const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const Product = require("../models/Product");

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

// Create tweets
const products = [];

for (let i = 0; i < NUM_SEED_PRODUCT; i++) {
  products.push(
    new Product({
      name: faker.commerce.product(),
      price: (Math.random() * (20 - 1) + 1) * 100 + 99,
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.food()
      // imageUrl: "https://spirit.scene7.com/is/image/Spirit/01406669-a?$Detail$",
    })
  );
}

const insertSeeds = () => {
  console.log("Resetting db and seeding users and products...");

  User.collection
    .drop()
    .then(() => User.insertMany(users))
    .then(() => {
      console.log("Done!");
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });

  Product.collection
    .drop()
    .then(() => Product.insertMany(products))
    .then(() => {
      console.log("Done!");
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
