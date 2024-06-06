const express = require("express");
const jadwalMakanRoutes = require("./routes/jadwalMakan.route");
const jadwalVitaminRoutes = require("./routes/jadwalVitamin.route");
const jadwalMainRoutes = require("./routes/jadwalMain.route");
const { body, validationResult } = require("express-validator");
const { authentificateToken } = require("./middlewares/auth");
const app = express();

app.use(express.json());

app.use("/jadwalmakans", jadwalMakanRoutes);
app.use("/jadwalmains", jadwalMainRoutes);
app.use("/jadwalvitamins", jadwalVitaminRoutes);

app.listen(3000);
