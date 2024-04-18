var mysql = require('mysql');
var express = require("express");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'farm1'
});

connection.connect();

app.set('view engine', 'ejs');



app.get('/admin', function (req, res) {
    var query = 'select * from admin'
    connection.query(query, function (error, results, field) {
        if (error) throw error;
        res.render('admin_login', { results });
    })

});


app.get('/admin_dash', function (req, res) {
    var query = 'select * from admin'
    connection.query(query, function (error, results, field) {
        if (error) throw error;
        res.render('admin_dash', { results });
    })

});



app.post('/admin', function (req, res) {

    var email = req.body.email;
    var password = req.body.password;


    var query = "select * from admin where email = '" + email + "' and password = '" + password + "'";
    connection.query(query, function (error, results, field) {
        if (error) throw error;
        if (results.length != 0) {
            res.redirect('/admin_dash');
        }
        else {
            res.redirect('/admin')
        }
    })

});

app.get('/product', function (req, res) {
    var query = 'select * from product'

    connection.query(query, function (error, results, field) {
        if (error) throw error;
        res.render('product', { results });
    })

})


app.post('/product', function (req, res) {

    var product_name = req.body.name;
    var quantity = req.body.quantity;
    var price = req.body.price;



    var query = "insert into product (product_name,qty,price) values ('" + product_name + "','" + quantity + "','" + price + "')"
    connection.query(query, function (error, results, field) {
        if (error) throw error;
        res.redirect('/product');
    })

});



app.get('/delete/:id', function (req, res) {


    var id = req.params.id;
    var query = "delete from product where id = '" + id + "' ";
    connection.query(query, function (error, results, field) {
        if (error) throw error;
        res.redirect('/product');
    })
});





app.get('/update/:id', function (req, res) {
    var id = req.params.id;
    var query = "select * from product where id= '" + id + "'";
    connection.query(query, function (error, results, field) {
        if (error) throw error;
        res.render('admin_update', { results });
    })
});




app.post('/update/:id', function (req, res) {

    var id = req.params.id;
    var name = req.body.name;
    var quantity = req.body.quantity;
    var price = req.body.price;


    var query = "update product set name='" + name + "',qty='" + quantity + "',price='" + price + "' where id='" + id + "' ";
    connection.query(query, function (error, results, field) {
        if (error) throw error;
        res.redirect('/product');
    })


})


app.get('/userregister', function (req, res) {

    var query = "select * from user";
    connection.query(query, function (error, results, field) {
        if (error) throw error;
        res.render('userregister', { results });
    })
});


app.get('/userdashbord', function (req, res) {

    var query = "select * from product";
    connection.query(query, function (error, results, field) {
        if (error) throw error;
        res.render('userdashbord', { results });
    })
});


app.post('/userregister', function (req, res) {

    var user_name = req.body.user_name;
    var user_email = req.body.user_email;
    var password = req.body.password;


    var query = "insert into user (user_name,user_email,password) values ('" + user_name + "','" + user_email + "','" + password + "')"
    connection.query(query, function (error, results, field) {
        if (error) throw error;
        res.redirect('/userdashbord');
    })

});


app.get('/', function (req, res) {

    var query = "select * from user";
    connection.query(query, function (error, results, field) {
        if (error) throw error;
        res.render('userlogin', { results });
    })
});




app.post('/', function (req, res) {
   
    var user_email = req.body.user_email;
    var password = req.body.password;


    var query = "select * from user where user_email = '" + user_email + "' and password = '" + password + "'";
    connection.query(query, function (error, results, field) {
        if (error) throw error;
        if (results.length != 0) {
            res.redirect('/userdashbord');
        }
        else {
            res.redirect('/')
        }
    })

});


 












app.listen(3000);
  