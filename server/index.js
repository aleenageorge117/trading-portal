
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const tradeRoutes = require('./routes/tradeRoutes');
var bodyParser = require('body-parser');

const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(cors());

app.use('/trades', tradeRoutes);

app.get('/', (req, res)=>{
    res.status(404);
    res.json({"response":"The requestes resource is Not Available."});
});

app.use((err, req, res, next)=>{
    if (!err.status && err.message != undefined) {
        err.status = 500;
        err.message = ('Internal Server Error');

    }
    res.status(err.status);
    res.json({'response': 'Server Error: ' + err.message, 'error': true});
    next(err);

});

app.use((req, res, next)=>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});