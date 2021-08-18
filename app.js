const path = require('path')
const express = require('express')
const Handlebars = require('hbs')

const voteRoutes = require('./routes/voteRoutes')
const adminRoutes = require('./routes/adminRoutes')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('views', 'views');

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifNotEquals', function (arg1, arg2, options) {
  return (arg1 !== arg2) ? options.fn(this) : options.inverse(this);
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', voteRoutes)
app.use('/admin', adminRoutes)

app.listen(PORT, () =>
  console.log(
    `Server running in development mode at port ${PORT}`
  )
);