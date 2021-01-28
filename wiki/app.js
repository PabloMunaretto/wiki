const express = require("express");
const app = express(); // crea una instancia de una aplicación de express
const morgan = require("morgan") //middleware application logger
const nunjucks = require("nunjucks");
// const path = require("path");
const sequelize = require('./db') // REQUIRE SEQUELIZE
const { User, Page } = require('./models');
const bodyParser = require('body-parser')
// requerimos models, que exporta models? Objeto {User, Page} Lo importamos y lo desestructurizamos (agarramos las keys del objeto) 
const routes = require("./routes/index");

app.engine("html", nunjucks.render); // como renderear templates html
app.set("view engine", "html"); // que extensiones de archivo tienen los templates
var env = nunjucks.configure("views", { noCache: true }); // donde encontrar las views
var AutoEscapeExtension = require("nunjucks-autoescape")(nunjucks);
env.addExtension("AutoEscapeExtension", new AutoEscapeExtension(env));

// MORGAN
// setup the logger
app.use(morgan('combined'))


// Body-parsing de express
app.use(bodyParser.urlencoded({ extended: true })); // para HTML form submits app.use(bodyParser.json()); // seria para AJAX requests 
app.use(express.json());

app.use(routes); // SIEMPRE abajo del body-parsing
// carpeta STATIC
app.use(express.static("./public"));

sequelize.sync()
.then(() => {
    console.log('Conectado a la base de datos');
    app.listen(3000, () => {
        console.log('Servidor escuchando en el puerto 3000')
    });
})
.catch(err => console.log(err));

// Donde tu servidor y la app de express están siendo definidas

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