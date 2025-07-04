const User = require('../../models/User');

// Get All Users
const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// Update User Role or Info
const updateUser = async (req, res) => {
  const { name, role } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = name || user.name;
  user.role = role || user.role;
  await user.save();

  res.json({ message: 'User updated', user });
};

// Delete User
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.remove();
  res.json({ message: 'User deleted' });
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
};
