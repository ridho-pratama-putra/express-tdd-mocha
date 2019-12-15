const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose
  .connect(
    `mongodb://localhost:27017/express-tdd-mocha`, {useNewUrlParser: true}
  )
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });

const userRouter = require('./routes/user');

app.use("/api/users", userRouter);

app.use((request, response, error) => {
  next(createError(404));
});

app.use((request, response, error) => {
  response.locals.message = error.message;
  response.status(error.status || 500);
  response.send(error);
});

module.exports = app;


