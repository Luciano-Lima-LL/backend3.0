// src/controllers/CategoryController.jsconstCategory = require('../models/Category');

module.exports = {
  getCategories(req, res) {
    const { limit = 12, page = 1, fields = 'name,slug', use_in_menu } = req.query;
    const attributes = fields.split(',').map(field => field.trim());

    const where = use_in_menu !== undefined ? { use_in_menu: use_in_menu === 'true' } : {};

    Category.findAndCountAll({
      attributes,
      where,
      limit: limit === '-1' ? undefined : parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    })
    .then(result => {
      const { count, rows } = result;
      res.status(200).json({
        data: rows,
        total: count,
        limit: parseInt(limit),
        page: parseInt(page),
      });
    })
    .catch(error => {
      res.status(400).json({ error: 'Erro ao buscar categorias' });
    });
  },

  getCategoryById(req, res) {
    Category.findByPk(req.params.id)
      .then(category => {
        if (!category) {
          return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        res.status(200).json(category);
      })
      .catch(error => {
        res.status(500).json({ error: 'Erro ao buscar categoria' });
      });
  },

  createCategory(req, res) {
    const { name, slug, use_in_menu } = req.body;
    Category.create({ name, slug, use_in_menu })
      .then(newCategory => {
        res.status(201).json(newCategory);
      })
      .catch(error => {
        res.status(400).json({ error: 'Erro ao criar categoria' });
      });
  },

  updateCategory(req, res) {
    Category.findByPk(req.params.id)
      .then(category => {
        if (!category) {
          return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        const { name, slug, use_in_menu } = req.body;
        return category.update({ name, slug, use_in_menu });
      })
      .then(() => {
        res.status(204).send();
      })
      .catch(error => {
        res.status(400).json({ error: 'Erro ao atualizar categoria' });
      });
  },

  deleteCategory(req, res) {
    Category.findByPk(req.params.id)
      .then(category => {
        if (!category) {
          return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        return category.destroy();
      })
      .then(() => {
        res.status(204).send();
      })
      .catch(error => {
        res.status(500).json({ error: 'Erro ao deletar categoria' });
      });
  },
};
