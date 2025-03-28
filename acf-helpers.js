function extractFieldsFromMeta(product, fields) {
    const data = {};
    for (const key of fields) {
      const meta = product.meta_data?.find(m => m.key === key);
      data[key] = meta?.value ?? "";
    }
    return data;
}
  
module.exports = { extractFieldsFromMeta };
  