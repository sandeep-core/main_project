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
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(req.params.id); 
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err.message); 
    res.status(500).json({ message: 'Server error deleting user' });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
};
