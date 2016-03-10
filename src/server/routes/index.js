var express = require('express');
var router = express.Router();

var products = [{
  productName: 'Soylent',
  productDescription: 'Gross pancake batter.',
  productPrice: 10.99
  }
];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/products/:name', function(req, res, next) {
  var productName = req.params.name;
  for (var i = 0; i<products.length; i++) {
    if(productName === products[i].productName) {
      return res.render('product', {productInfo: products[i]});
    } else {
      return res.send('Product does not exist');
    }
  }
});

router.get('/charge', function(req, res, next){

})

module.exports = router;
