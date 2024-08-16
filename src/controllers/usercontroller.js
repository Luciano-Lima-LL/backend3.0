const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'firstname', 'surname', 'email'],
      });
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },

  async createUser(req, res) {
    const { firstname, surname, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'As senhas não coincidem' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        firstname,
        surname,
        email,
        password: hashedPassword,
      });
      return res.status(201).json({ id: newUser.id });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao cadastrar usuário' });
    }
  },

  async updateUser(req, res) {
    const { firstname, surname, email } = req.body;
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      await user.update({ firstname, surname, email });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      await user.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  },
};
