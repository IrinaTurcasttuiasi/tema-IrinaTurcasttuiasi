const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
var mysql = require('mysql');
const session = require('express-session');

var con = mysql.createConnection({
    host: "localhost",
    user: session.username,
    password: session.passsword
  });

const app = express();

const port = 9090

app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(expressLayouts);
app.use(session({
    secret: 'pw-proiect-2',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// constante si variabile globale

// functii

app.get('/', (req, res) =>{res.render('index');});
app.get('/autentificare', function(req, res){
    
});


app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:${port}`));