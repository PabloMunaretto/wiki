const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');


router.get('/', (req, res, next) => {
   
    Page.findAll()
        .then(page => {
            res.render('index', { pages: page});
        })
         
    //trae todas las páginas de wiki
})
router.post('/', (req, res, next) => {

    User.findOrCreate({ // devuelve un array
        where: {
            name: req.body.name,
            email: req.body.email
        }
    })
        .then(data => {
            const user = data[0]; // en [0] se encuentra el usuario
            Page.create({
                title: req.body.title,
                content: req.body.content,
                status: req.body.status
            })
                .then(page => page.setAuthor(user))
                .then(page => res.redirect("/"))
            
        })
       
    //submitea una página a la base de datos
})
router.get('/add', (req, res, next) => {
    res.render('addpage');
    //trae el formulario de "agregá una página"
})

router.get('/:urlTitle', (req, res, next) => {
    
    Page.findOne({
        where: {
            urltitle : req.params.urlTitle
        }
    })
    .then(paginaEncontrada => {
            paginaEncontrada.getAuthor()
                .then(author => {
                    return res.render('wikipage', {
                        page: paginaEncontrada,
                        author: author
                    })
                })
    })

    
})

module.exports = router;