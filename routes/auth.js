var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient

router.get('/auth', function (req, res, next) {
    res.render('auth', {});
});

router.get('/wallpost', function (req, res, next) {
    res.render('wallpost', {});
});

router.post('/postComment', function (req, res, next) {
    MongoClient.connect('mongodb://nadishana:nadishana@cluster0-shard-00-00-opm84.mongodb.net:27017/projectoauth', { useNewUrlParser: true, ssl: true, authSource: 'admin' }, function (err, client) {

        let objRes = {
            flag : -1,
            data : null
        }

        try {

            var db = client.db("oauth");
            db.collection('comments').insertOne(req.body['obj'],function(err,res2){

      

                var objres = {
                    flag : -1
                }

                if(err == null){
                    objres.flag = 1;
                }else{
                    objres.flag = 999
                }

                res.json(objres);

            })

      

        } catch (error) {
            console.log("main error ",error);
        }

       

    })
});

router.get('/getWallpost', function (req, res, next) {
    MongoClient.connect('mongodb://nadishana:nadishana@cluster0-shard-00-00-opm84.mongodb.net:27017/projectoauth', { useNewUrlParser: true, ssl: true, authSource: 'admin' }, function (err, client) {

        let objRes = {
            flag : -1,
            data : null
        }

        try {

            var db = client.db("oauth");


                db.collection('comments').find().toArray(function (err, result) {

   
                    if(err ==null){
                        objRes.data = result;
                        objRes.flag =1;
                    }else{
                        objRes.flag =999;
                    }
    
                    
                    res.setHeader('Content-Type', 'application/json')
                    res.json(objRes);
              
                });

      

        } catch (error) {
            console.log("main error ",error);
        }

       

    })
});

module.exports = router;