const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  const { newItemPrice, cartTotal } = req.query;
  const total = parseFloat(newItemPrice) + parseFloat(cartTotal);
  res.send(String(total));
});

app.get('/membership-discount', (req, res) => {
  const { cartTotal, isMember } = req.query;
  let cartTotalAfterDiscount = cartTotal;
  if (isMember) {
    cartTotalAfterDiscount = (cartTotal * (100 - discountPercentage)) / 100;
  }
  res.send(String(cartTotalAfterDiscount));
});

app.get('/calculate-tax', (req, res) => {
  const { cartTotal } = req.query;
  const tax = (cartTotal * taxRate) / 100;
  res.send(String(tax));
});

app.get('/estimate-delivery', (req, res) => {
  const { shippingMethod, distance } = req.query;
  let deliverykmForDay = shippingMethod === 'Standard' ? 50 : 100;
  const days = parseFloat(distance) / deliverykmForDay;
  res.send(String(days));
});

app.get('/shipping-cost', (req, res) => {
  const { weight, distance } = req.query;

  const shippingCost = parseFloat(distance) * parseFloat(weight) * 0.1;
  res.send(String(shippingCost));
});

app.get('/loyalty-points', (req, res) => {
  const { purchaseAmount } = req.query;
  const points = purchaseAmount * loyaltyRate;
  res.send(String(points));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
