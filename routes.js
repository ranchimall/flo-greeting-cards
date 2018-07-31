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

router.post('/write', [
  check('_bdata')
    .isLength({min:1})
    .withMessage('Please write some remarks!')
    .trim(),
  check('_cardid')
    .isLength({min:1})
    .withMessage('Could not find the card id!')
    .trim()
],
  (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.render('write', {
          data: req.body,
          errors: errors.mapped(),
          title: 'Please correct your errors'
      })
    }

    const data = matchedData(req)

    let user_msg = data._bdata;
    let card_id = data._cardid;

    var toaddress = "oXCsMUyX3mLJEdnn8SXoH6gyPW9Jd6kjYu";
    var amount = 1;
    
    try {
        client.sendToAddress(toaddress, amount, "Greetings App", "REBC", false, false, 1, 'UNSET', user_msg)
        .then((txnid) => {
          console.log(txnid)
          res.json({"error":false, "txnid":txnid, "card_id":card_id, "user_msg":user_msg})
        });
    }catch(err){
        console.log("Unable to send FLO." + err.message);
    }

    //res.json({"error":true, "txnid":null, "card_id":null, "user_msg":null})

  }
)

module.exports = router
