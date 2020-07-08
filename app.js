const express = require('express');
const port = process.env.PORT || 3000;
const app = require('http').Server(express());

app.listen(port);
console.log(`Server listening on port ${port}`);