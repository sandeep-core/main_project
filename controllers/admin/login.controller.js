export default (req, res) => {
    const { email, password } = req.body;
    if (email === 'piyushsir@gmail.com' && password === 'team123') {
      req.session.user = { email }; // session set
      return res.redirect('/admin/dashboard');
  } else {
      return res.render('admin/login', { error: 'Invalid email or password' });
  }
};