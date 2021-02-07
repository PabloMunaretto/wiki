const express = require("express");
const app = express();
const volleyball = require('volleyball');
const nunjucks = require("nunjucks");
const path = require("path");
const bodyParser = require('body-parser')


const sequelize = require('./db') // REQUIRE archivo SEQUELIZE
const routes = require("./routes/index");


// MIDDLEWARES
app.engine("html", nunjucks.render); // como renderear templates html
app.set("view engine", "html"); // que extensiones de archivo tienen los templates
var env = nunjucks.configure("views", { noCache: true }); // donde encontrar las views
var AutoEscapeExtension = require("nunjucks-autoescape")(nunjucks);
env.addExtension('AutoEscapeExtension', new AutoEscapeExtension(env));

//login MIDDLEWARE
app.use(volleyball)

// Body-parsing de express
app.use(bodyParser.urlencoded({ extended: true })); // para HTML form submits app.use(bodyParser.json()); // seria para AJAX requests 
app.use(express.json());

// carpeta STATIC
//https://expressjs.com/es/starter/static-files.html
app.use(express.static(path.join(__dirname, '/public')));


app.use(routes); // SIEMPRE abajo del body-parsing

//ERROR MIDDLEWARE (va a lo ultimo) length = 4;
app.use((err, req, res, next) => {
    res.sendStatus(404).send(err)
})

sequelize.sync()
.then(() => {
    console.log('Conectado a la base de datos');
    app.listen(3000, () => {
        console.log('Servidor escuchando en el puerto 3000')
    });
})
.catch(err => console.log(err));

// User.sync({})
//     .then(function () {
//       return Page.sync({})
// })
//     .then(function () {
//     // asegurate de reemplazar el nombre de abajo con tu app de express
//     app.listen(3000, function () {
//         console.log('Server is listening on port 3000!');
// });
// })
//     .catch(console.error);