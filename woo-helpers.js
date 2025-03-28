const WooCommerceRestApi = require("woocommerce-rest-ts-api").default;
require('dotenv').config();

const api = new WooCommerceRestApi({
  url: process.env.WC_URL,
  consumerKey: process.env.WC_KEY,
  consumerSecret: process.env.WC_SECRET,
  version: "wc/v3",
  queryStringAuth: true,
  timeout: 300000
});

async function getProductsInCategory(categoryId, page = 1) {
  return api.get("products", {
    category: categoryId,
    per_page: 100,
    page,
  });
}

module.exports = { getProductsInCategory };
