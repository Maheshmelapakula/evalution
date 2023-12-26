const bcrypt = require('bcrypt');
const Usermodel = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone_number, department } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    const user = await Usermodel.create({
      name,
      email,
      password: hashedPassword, 
      phone_number,
      department,
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
