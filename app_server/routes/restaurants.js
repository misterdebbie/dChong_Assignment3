var util = require('util');

var Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    ObjectID = require('mongodb').ObjectID;
//dependency on mongoDB driver
//expose Db, Server, ObjectID
//connect to localhost
//port 27017 is mongoDB default
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('test', server);
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'test' database");
        db.collection('restaurants', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'restaurants' collection doesn't exist.");
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving restaurant: ' + id);
    db.collection('restaurants', function(err, collection) {
        collection.findOne({'_id': new ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
//issue a query to the restaurants collectiom
//toArray method will consume the result set, produce an array and pass to the callback, items parameter!
exports.findAll = function(req, res) {
    console.log('Retrieving all restaurants');
    db.collection('restaurants', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
            //res.render('restaurants',{stuff: 'good morning'})
        });
    });
};
/*
exports.addRestaurant = function(req, res) {
    var restaurant = req.body;
    console.log('Adding restaurant: ' + restaurant);
    db.collection('restaurants', function(err, collection) {
        collection.insert(restaurant,{safe:true},function(err, item) {
            console.log('Success: ' + item[0]);
            res.send(item[0]);
        });
    });
};
exports.updateRestaurant = function(req, res) {
    var id = req.params.id;
    var restaurant = req.body;
    console.log('Updating restaurant: ' + id);
    console.log(restaurant);
    db.collection('restaurants', function(err, collection) {
        collection.update({'_id':new ObjectID(id)}, restaurant,{safe:true},(function(err, result) {
            console.log('Success: ' + result[0] + ' updated');
            res.send(restaurant);
        }));
    });
};
exports.deleteRestaurant = function(req, res) {
    var id = req.params.id;
    console.log('Deleting restaurant: ' + id);
    console.log(restaurant);
    db.collection('restaurants', function(err, collection) {
        collection.remove({'_id':new ObjectID(id)}, {safe:true},(function(err, result) {
            console.log('Success: ' + result[0] + ' deleted');
        res.send(req.body);
    }));
    });
};*/


/*
exports.update = function(req, res) {

    /*console.log('Retrieving all restaurants');
    db.collection('restaurants', function(err, collection) {
        collection.find().toArray(function(err, items) {
            //res.send(items);*/
            //res.render('test',{title: 'good morning'})
        //});
   // });
//}
//exports.confirm = function(req, res) {
    /*console.log('Retrieving all restaurants');
     db.collection('restaurants', function(err, collection) {
     collection.find().toArray(function(err, items) {
     //res.send(items);
    var updateName = req.body.name;
    var updateBorough = req.body.borough;

    res.send(updateName,updateBorough);

    //});
    // });
};*/