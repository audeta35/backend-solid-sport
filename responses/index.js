'use strict';

exports.success = (res, value) => {
  const result = {
    status: {
      code: 200,
      message: "success",
    },
    result: value,
  };
  res.status(200).json(result);
  res.end();
};

exports.notFound = res => {
  const result = {
    code: 404,
    message: 'No entry found'
  };
  res.status(404).json(result);
  res.end();
};