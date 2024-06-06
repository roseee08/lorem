const express = require("express");
const jadwalMakananRoutes = require("./routes/jadwallMakanan.route");
const { body, validationResult } = require("express-validator");
const { authentificateToken } = require("./middlewares/auth");
const app = express();

app.use(express.json());

app.use("/jadwalmakanans", jadwalMakananRoutes);

app.listen(3000);
