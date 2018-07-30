const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')
const _ = require('lodash');
const fetch = require('node-fetch');
const client = require('./server.js');

var path = require('path')
var fs = require('fs');
var pdf = require('html-pdf');

router.get('/', (req, res)=>{
    res.render('index.ejs', {
        data: {},
        errors: {},
        title: 'Welcome! Select a card of your choice.'
    })
})

router.get('/write/:card_id', (req, res)=>{
  res.render('write.ejs', {
    data: {card_id: req.params.card_id},
    errors: {},
    title: 'Write your message'
  })
})

router.post('/write', [check('_bdata').isLength({min:1}).withMessage('Please write some remarks!').trim(), 
check('_cardid').isLength({min:1}).withMessage('Could not find the card id!').trim()],
  (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.render('write', {
          data: req.body,
          errors: errors.mapped(),
          title: 'Please Write your message'
      })
    }

    const data = matchedData(req)

    let remarks = data._bdata;
    let card_id = data._cardid;

    var toaddress = "oXCsMUyX3mLJEdnn8SXoH6gyPW9Jd6kjYu";
    var amount = 1;

    res.json({"txnid":"zdfjhdzjfhzhfjhzekjhfjhf", "card_id":card_id})
    // try {
    //     client.sendToAddress(toaddress, amount, "Greetings App", "REBC", false, false, 1, 'UNSET', remarks)
    //     .then((txnid) => {
    //       console.log(txnid)
    //       res.json({"txnid":txnid, "card_id":card_id})
    //     });
    // }catch(err){
    //     console.log("Unable to send FLO." + err.message);
    // }

    // req.flash('success', 'Your remarks was successfully entered.')
    // res.redirect('/')

  }
)

module.exports = router
