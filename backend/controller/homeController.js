const homeController = (req, res, next) => {
  res.send(
    '<h1 style="text-align:center">Backend server is working at home ( / ) route ...</h1>'
  );
};

module.exports = homeController;
