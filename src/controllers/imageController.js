const Image = require('../models/image');

module.exports = {
  async createImage(req, res) {
    try {
      const { product_id, enabled, path } = req.body;
      const newImage = await Image.create({ product_id, enabled, path });
      return res.status(201).json(newImage);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar imagem' });
    }
  },

  async getImageById(req, res) {
    try {
      const image = await Image.findByPk(req.params.id);
      if (!image) {
        return res.status(404).json({ error: 'Imagem não encontrada' });
      }
      return res.status(200).json(image);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar imagem' });
    }
  },

  async updateImage(req, res) {
    try {
      const { product_id, enabled, path } = req.body;
      const image = await Image.findByPk(req.params.id);
      if (!image) {
        return res.status(404).json({ error: 'Imagem não encontrada' });
      }
      await image.update({ product_id, enabled, path });
      return res.status(200).json(image);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar imagem' });
    }
  },

  async deleteImage(req, res) {
    try {
      const image = await Image.findByPk(req.params.id);
      if (!image) {
        return res.status(404).json({ error: 'Imagem não encontrada' });
      }
      await image.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar imagem' });
    }
  },
};
