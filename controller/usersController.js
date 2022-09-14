async function getUsers(req, res, next) {
  console.log(res.locals);
  res.render("users");
}

module.exports = {
  getUsers,
};
