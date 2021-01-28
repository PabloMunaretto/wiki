const express = require('express');
const router = express.Router();

const { User, Page } = require('../models');


router.get('/', (req, res, next) => {
   
    res.render('addpage');
    //trae todas las páginas de wiki
    
})
router.post('/', (req, res, next) => {
    console.log(req.body.content, req.body.title)

    let nombre = req.body.name
    let email = req.body.email
    let titulo = req.body.title
    let contenido = req.body.content

    Page.create({
        title: titulo,
        content: contenido,
    })
    .then(() => res.send('Página Wiki creada'))
    .then(() => res.redirect('/'))
    .catch(err => {
        console.log(err)
        res.send('No se creo la pagina')
    })

    // User.create({
    //     name: nombre,
    //     email: email,
    // })
    // .then(() => res.send('Se creó el Usuario'))
    // .catch(() => console.log(err))

       
    //submitea una página a la base de datos
})
router.get('/add', (req, res, next) => {
    res.render('addpage');
    //trae el formulario de "agregá una página"
})

module.exports = router;