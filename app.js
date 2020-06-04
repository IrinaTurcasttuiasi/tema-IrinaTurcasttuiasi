const express = require('express');
const expressLayouts = require('express-ejs-layouts');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var mysql = require('mysql');
const session = require('express-session');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');

var con = mysql.createConnection({
    host: "localhost",
    user: "foo",
    password: "bar",
    database: 'tema_pw'
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Conectat la tema_pw!");
});

const app = express();
const port = 9090

app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(expressLayouts);
app.use(session({
    secret: 'tema_pw',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'public', 'img/favicon.ico')));

// constante si variabile globale


// functii

app.get('/', function(req, res){
    var usr = {"username":req.session.username_login, "email":req.session.email_signup};
    res.render('index',{err:req.session.error, usr: usr, loggedin:req.session.loggedin});
    req.session.error=undefined;
});
app.get('/documentatie', function(req, res){
    var usr = {"username":req.session.username_login, "email":req.session.email_signup};
    res.render('documentatie',{err:req.session.error, usr: usr, loggedin:req.session.loggedin});
    req.session.error=undefined;
});
app.get('/dezvoltare', function(req, res){
    var usr = {"username":req.session.username_login, "email":req.session.email_signup};
    res.render('dezvoltare',{err:req.session.error, usr: usr, loggedin:req.session.loggedin});
    req.session.error=undefined;
});


app.post('/autentificare', function(req, res){
    var username = req.body.username_login;
    var password = req.body.password_login;
    console.log(req.body);
    if (username && password) {
        con.query('SELECT * FROM tema_pw.utilizator WHERE username = ? AND parola = ?', [username, password], function(error, results, fields) {
            if(error) throw error;
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username_login = username;
                res.redirect('back');
                res.end();
            } else {
                req.session.error='Datele introduse nu sunt asociate unui utilizator!';
                console.log('Datele introduse nu sunt asociate unui utilizator!');
                res.redirect('back');
                res.end();
            }			
        });
    }
    else{
        req.session.error = 'Câmpurile nu pot fi goale!';
        console.log('Câmpurile nu pot fi goale!');
        res.redirect('back');
        res.end();
    }   
});
app.post('/cont-nou', function(req, res){
    var username = req.body.username_signup;
    var email = req.body.email_signup;
    var password = req.body.password_signup;
    var conf_password = req.body.password_confirm;
    var accept_terms = req.body.accept_terms;

    console.log(req.body);
    if (username && password && email && conf_password && accept_terms=='on') {
        if(password == conf_password){
            con.query('insert into `utilizator` values(NULL, ?, ?, ?, 0)', [username, email, password], function(error, results, fields) {
                if(error){
                    req.session.error = 'Este posibil ca datele introduse să fie deja asociate altui utilizator. Încercați din nou.';
                    console.log('Este posibil ca datele introduse să fie deja asociate altui utilizator. Încercați din nou.');
                    res.redirect('back');
                    res.end();
                }
                else{
                    req.session.error = undefined;
                    req.session.username_login = username;
                    req.session.email_signup = email;
                    req.session.loggedin = true;
                    res.redirect('back');
                    res.end();
                }  
            });
        }
        else{
            req.session.error = 'Parolele nu se potrivesc.';
            console.log('Parolele nu se potrivesc.');
            res.redirect('back');
            res.end();   
        }
    }
    else{
        req.session.error = 'Datele introduse nu sunt complete!';
        console.log('Date introduse nu sunt complete!');
        res.redirect('back');
        res.end();
    }   
});
app.post('/delogare', function(req, res){
    req.session.username_login = undefined;
    req.session.password_login = undefined;
    req.session.email_signup = undefined;
    req.session.error = undefined;
    req.session.loggedin = false;
    res.redirect('back');
    res.end();
});

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:${port}`));