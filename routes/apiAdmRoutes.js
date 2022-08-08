const express = require("express");
const router = express.Router();
const checkJwt = require("express-jwt");
const checkToken = require("../middlewares/checkToken")

// router.get("/ruta-privada", checkJwt({ secret: "UnStringMuySecreto", algorithms: ["HS256"] }), (req, res) => {

//     // 🟢 Si el JWT es válido, el payload del mismo queda disponible aquí adentro vía el objeto `req.user`.
//     // 🔴 De lo contrario, el middleware responde con un status 401.
//     });

router.get("/private", checkToken, (req,res) => {
    res.send("pasaste loki")
})

module.exports = router;