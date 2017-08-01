const express = require('express');
const expressSession = require('express-session');

const swaggerUi = require('swagger-ui-express');

const port = process.env.PORT || 3000;

const app = express();

app.use(expressSession({
  secret: 'jongeneelsessionkey',
  resave: false,
  saveUninitialized: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

app.use('/api/auth', require('./api/AuthApi'));
app.use('/api/accounts', require('./api/AccountsApi'));
app.use('/api/products', require('./api/ProductApi'));
app.use('/api/facets', require('./api/FacetApi'));
app.use('/api/cart', require('./api/CartApi'));

app.use('/images', express.static('images'));

app.use('/components', express.static('components'));
app.use('/components', express.static('bower_components'));

app.use("/index.html", express.static(__dirname + '/index.html'));

app.use('/swagger',  express.static('swagger'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, null, null, null, null, '/swagger/api.json'));

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`)
});

