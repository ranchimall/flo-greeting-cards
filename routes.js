const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')
const _ = require('lodash');
const fetch = require('node-fetch');
const client = require('./server.js');

var path = require('path')
var fs = require('fs');

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
  check('_from')
    .isLength({min:1})
    .isAlpha()
    .withMessage('Please specify the name of the sender!')
    .trim(),
  check('_to')
    .isLength({min:1})
    .isAlpha()
    .withMessage('Please specify the name of the receiver!')
    .trim(),
  check('_bdata')
    .isLength({min:1})
    //.isAlphanumeric()
    .withMessage('Please write the message to be sent to receiver!')
    .trim(),
  check('_cardid')
    .isLength({min:1})
    .isAlphanumeric()
    .withMessage('Could not find the card id! Please select the card again.')
    .trim()
],
  (req,res)=>{
    const errors = validationResult(req)
    //console.log(errors.mapped());
    
    if(!errors.isEmpty()) {
      return res.render('write', {
          data: req.body,
          errors: errors.mapped(),
          title: 'Please correct your errors'
      })
    }

    const data = matchedData(req)

    let user_msg = data._bdata;
    let _from = data._from;
    let _to = data._to;
    let card_id = data._cardid;

    var toaddress = "oXCsMUyX3mLJEdnn8SXoH6gyPW9Jd6kjYu";
    var amount = 1;
    
    try {
        // client.sendToAddress(toaddress, amount, "Greetings App", "REBC Greetigs App", false, false, 1, 'UNSET', user_msg)
        // .then((txnid) => {
        //   console.log(txnid)
        //   res.json({"error":false, "txnid":txnid, "_from":_from, "_to":_to, "card_id":card_id, "user_msg":user_msg})
        // });
        res.json({"error":false, "txnid":"TXIDKJKLGJLKSJLKGJSKJGK", "_from":_from, "_to":_to, "card_id":card_id, "user_msg":user_msg})
    }catch(err){
        console.log("Unable to send FLO." + err.message);
    } 

    //res.json({"error":true, "txnid":null, "card_id":null, "user_msg":null})

   }
  )

  router.get('/bithday-cards', (req, res)=>{
    res.render('bithday-cards.ejs', {
      data: {},
      errors: {},
      title: 'Welcome! Select a bithday card card of your choice.'
    })
  })

  router.get('/christmas-cards', (req, res)=>{
    res.render('christmas-cards.ejs', {
      data: {},
      errors: {},
      title: 'Welcome! Select a Christmas card card of your choice.'
    })
  })

  router.get('/diwali-cards', (req, res)=>{
    res.render('diwali-cards.ejs', {
      data: {},
      errors: {},
      title: 'Welcome! Select a Diwali card card of your choice.'
    })
  })

  router.get('/new-year-cards', (req, res)=>{
    res.render('new-year-cards.ejs', {
      data: {},
      errors: {},
      title: 'Welcome! Select a New Year card card of your choice.'
    })
  })

module.exports = router
