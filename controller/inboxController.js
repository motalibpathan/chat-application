async function getInbox(req, res, next) {
  console.log(req);
  res.render("inbox");
}

module.exports = {
  getInbox,
};
