const { getProductsInCategory } = require("./woo-helpers");
const { extractFieldsFromMeta } = require("./acf-helpers");
const { saveToCSV } = require("./csv-export");

const categoryId = 66377; // Change Cat ID
const acfFields = [
    "part_number", 
    "manufacturer", 
    "short_description", 
    "detail_description",
    "image_url",
    "datasheet_url",
    "product_type",
    "voltage", 
    "operating_temperature", 
    "series",
    "series_url",
    "supplier_device_package",
    "package",
    "spq",
    "quantity",
    "additional_key_information"
]; // Change Fields to Export
const allProducts = [];

(async () => {
  let page = 1;
  let totalCount = 0;

  while (true) {
    const res = await getProductsInCategory(categoryId, page);
    const products = res.data;

    if (!products.length) break;

    for (const p of products) {
      const acfData = extractFieldsFromMeta(p, acfFields);
      allProducts.push({
        id: p.id,
        name: p.name,
        sku: p.sku,
        ...acfData,
      });
    }

    totalCount += products.length;
    console.log(`✅ Fetched page ${page} – total products retrieved so far: ${totalCount}`);

    page++;
  }

  saveToCSV(allProducts, `category-${categoryId}.csv`);
})();
