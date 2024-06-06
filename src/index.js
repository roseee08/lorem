const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();

app.use(express.json());
app.get(
  "/hello",
  body("email").isEmail().withMessage("Not a valid e-mail address"),
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return res.send(`Hello, ${req.body.email}!`);
    }

    res.send({ errors: result.array() });
  }
);

app.listen(3000);
