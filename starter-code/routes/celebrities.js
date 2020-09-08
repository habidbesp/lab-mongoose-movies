const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next)=>{
    Celebrity.find().then(celebritiesFromDB => {
      // render a view and pass in the celebrities
    //   console.log(celebritiesFromDB);
      res.render('celebrities/index', {celebritiesList: celebritiesFromDB})
    })
    .catch(err => {
        next(err)
    })
  });

router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new');
})
    

router.post('/celebrities', (req, res) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.create({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase,
        }).then(celebrity => {
            console.log(`New celebrity was created: ${celebrity}`);
            res.redirect(`/celebrities/${celebrity._id}`);
            })
            .catch(error => {
            console.log(error);
        })
    });



  router.get('/celebrities/:celebrityId', (req, res, next)=>{
    const id = req.params.celebrityId;
    console.log(id);
    Celebrity.findById(id).then(celebrityFromDB => {
        // console.log(celebrityFromDB);
        res.render('celebrities/show', {celebrity: celebrityFromDB})
    })
    .catch(err => {
        next(err)
    })
})

router.post('/celebrities/:id/delete', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findByIdAndDelete(id)
      .then(() => {
        res.redirect('/celebrities');
      })
      .catch(error => {
        next(error);
      })
  });



router.get('/celebrities/:id/edit', (req, res, next)=> {
    const id = req.params.id
    Celebrity.findById(id)
    .then(celebrityInfo => {
        console.log(celebrityInfo);
        res.render('celebrities/edit', {editCelebrity: celebrityInfo})
    })
    .catch(err => {
        next(err)
    })
})


router.post('/celebrities/:id', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;
    const id = req.params.id
    Celebrity.findByIdAndUpdate(id, {
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase,
        })
        .then(() => {
            res.redirect(`celebrities/${celebrity._id}`)
        })
        .catch(err => {
            next(err)
        })
})

  module.exports = router;