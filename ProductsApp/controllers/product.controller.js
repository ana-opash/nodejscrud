const Product = require('../models/product.model');

// Simple version, without validation or sanitation 
exports.test = function (req, res, next) {
    res.send('Greeting from the Test controller!');
}

exports.product_create = function (req, res, next) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    )
    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully');
    });
}

exports.product_details = function (req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
}

exports.product_update = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err) return next(err);
        res.send('Product updated.');
    })
}

exports.product_delete = function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Delete successfully!');
    })
}

exports.product_getAll = (req, res, next) => {
    Product.find({}, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};