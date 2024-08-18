const Option = require('../models/option');

module.exports = {
  async createOption(req, res) {
    try {
      const { product_id, title, shape, radius, type, values } = req.body;
      const newOption = await Option.create({ product_id, title, shape, radius, type, values });
      return res.status(201).json(newOption);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar opção' });
    }
  },

  async getOptionById(req, res) {
    try {
      const option = await Option.findByPk(req.params.id);
      if (!option) {
        return res.status(404).json({ error: 'Opção não encontrada' });
      }
      return res.status(200).json(option);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar opção' });
    }
  },

  async updateOption(req, res) {
    try {
      const { product_id, title, shape, radius, type, values } = req.body;
      const option = await Option.findByPk(req.params.id);
      if (!option) {
        return res.status(404).json({ error: 'Opção não encontrada' });
      }
      await option.update({ product_id, title, shape, radius, type, values });
      return res.status(200).json(option);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar opção' });
    }
  },

  async deleteOption(req, res) {
    try {
      const option = await Option.findByPk(req.params.id);
      if (!option) {
        return res.status(404).json({ error: 'Opção não encontrada' });
      }
      await option.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar opção' });
    }
  },
};
