const response500 = (item = "", res, custom_message = null) => {
  res.statusCode = 500;
  res.setHeader("Content-Type", "application/json");
  return res.json({
    error: custom_message
      ? custom_message
      : `We failed to add this ${item} into the system.`,
  });
};

const response401 = (error, res) => {
  res.statusCode = 401;
  res.setHeader("Content-Type", "application/json");
  return res.json({
    error,
  });
};

const response404 = (item, res, custom_message = null) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  return res.json({
    error: custom_message
      ? custom_message
      : `This ${item} is not found in the system.`,
  });
};

const response403 = (operation, route, res) => {
  res.statusCode = 403;
  return res.end(`${operation} operation not supported on ${route}`);
};

const response200 = (data, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  return res.json(data);
};

module.exports = {
  response500,
  response401,
  response404,
  response403,
  response200,
};
