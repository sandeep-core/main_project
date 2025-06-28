
export default (req, res) => {
  res.render("dashboard", {
    user: req.session.user,
    posts,
  });
};