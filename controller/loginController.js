async function getLogin(req, res, next) {
  res.render("index", {
    title: "Login - Chat application",
  });
}

module.exports = {
  getLogin,
};
