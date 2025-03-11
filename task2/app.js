
const express = require('express');
const { Product, Category, ProductDetail } = require('./db');
const app = express();

app.use(express.json());
app.get('/api/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const sortBy = req.query.sortBy || 'id';

  try {
    const { count, rows } = await Product.findAndCountAll({
      include: [Category, ProductDetail],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, 'ASC']]
    });

    res.json({
      items: rows,
      total: count,
      page,
      pageSize
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Category, ProductDetail]
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body, {
      include: [ProductDetail]
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});