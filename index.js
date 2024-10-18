//BD1 - Assignment
const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  cartTotal = newItemPrice + cartTotal;
  res.send(cartTotal.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartPrice = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let ans = '';

  if (isMember === 'false') {
    ans = cartPrice.toString();
  } else {
    cartPrice = cartPrice * 0.9;
    ans = cartPrice.toString();
  }
  res.send(ans);
});

app.get('/calculate-tax', (req, res) => {
  let cartPrice = parseFloat(req.query.cartTotal);
  let ans = '';

  cartPrice = cartPrice * 0.05;
  ans = cartPrice.toString();

  res.send(ans);
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let dist = parseFloat(req.query.distance);

  let ans = 0;

  if (shippingMethod === 'Standard') {
    ans = dist / 50;
  } else {
    ans = dist / 100;
  }
  res.send(ans.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let dist = parseFloat(req.query.distance);

  let ans = 0;
  ans = weight * dist * 0.1;
  res.send(ans.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  let ans = 0;
  ans = purchaseAmount * loyaltyRate;
  res.send(ans.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
