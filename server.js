const express = require('express');
const hbs = require('hbs');
const fs= require ('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear(); 
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use(express.static(__dirname+'/public'));

app.use((req, res, next)=>{
    var now = new Date().toString();
    //console.log(`${now} ${req.method} ${req.url}`);
    var log = `${now} ${req.method} ${req.url}`;
    fs.appendFileSync('server.log', log +'\n', (err)=>{
        if(err) {
            console.log('unable to append to server.log');
        }
    });
    next();
});
// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });
//register handler
app.get('/', (req, res)=>{
   // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome'
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About page'
        });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Some error occurred'
   });
});

app.listen(3000);