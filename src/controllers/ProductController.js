const Product = require('../models/Product');

const ProductController = {
  async getProducts(req, res) {
    try {
      const { limit = 12, page = 1, fields, match, category_ids, 'price-range': priceRange } = req.query;
      const attributes = fields ? fields.split(',').map(field => field.trim()) : null;
      const where = {};

      if (match) {
        where.name = { [Op.iLike]: `%${match}%` };
        where.description = { [Op.iLike]: `%${match}%` };
    }

      if (category_ids) {
        where.category_ids = { [Op.overlap]: category_ids.split(',').map(Number) };
    }

      if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        where.price = { [Op.between]: [min, max] };
    }

      const products = await Product.findAndCountAll({
        where,
        attributes,
        limit: limit === '-1' ? null : parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
    });

      res.status(200).json({
        data: products.rows,
        total: products.count,
        limit: parseInt(limit),
        page: parseInt(page),
    });

    } catch (error) {
      res.status(400).json({ error: 'Erro ao buscar produtos' });
    }
    },

  async getProductById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao buscar produto' });
    }
    },

  async createProduct(req, res) {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar produto' });
    }
    },

  async updateProduct(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }
      await product.update(req.body);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Erro ao atualizar produto' });
    }
    },

  async deleteProduct(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }
      await product.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar produto' });
    }
    },
    };

module.exports = ProductController;
