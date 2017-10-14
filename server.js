const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to append to server log.');
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // response.send({name : 'karan','age':28});
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website.'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page'

    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unale to handle request.'
    });
});

app.listen(3000);