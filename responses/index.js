'use strict';

exports.root = (res) => {
    res.send({
        status : "root",
        message : "welcome to solidsport api",
        code: 200
    })
}

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

exports.loginFailed = (res) => {
  res.status(403).send({
    status: 403,
    message: "Username Atau Password Salah",
  });
};

exports.loginSuccess = (res, rows, token) => {
  res.status(200).send({
    status: 200,
    result: rows,
    token: token
  });
};

exports.falseRequirement = (res, field) => {
  const result = {
    status: {
      code: 500,
      message: 'Form ' + field + ' tidak boleh kosong.'
    }
  };
  res.status(500).json({ results: result });
  res.end();
};