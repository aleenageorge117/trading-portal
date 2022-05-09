
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const tradeRoutes = require('./routes/tradeRoutes');
const userRoutes = require('./routes/userRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const tradeExchangeRoutes = require('./routes/tradeExchangeRoutes');

const User = require('./models/userModel');

const app = express();


const PORT = process.env.PORT || 3001;

// let collectionsList =  [];

//connect to database
mongoose.connect('mongodb://localhost:27017/trade', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });

    // mongoose.connection.db.listCollections().toArray(function (err, names) {
    //     collectionsList = names;
    // });
})
.catch(err=>console.log(err.message));

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(cors());
app.use(cookieParser());


app.use('/trades', tradeRoutes);

app.use('/user', userRoutes);

app.use('/watchlist', watchlistRoutes);

app.use('/trade-exchange', tradeExchangeRoutes);


// app.get('/', (req, res)=>{
//     res.status(404);
//     res.json({"response":"The requested resource is Not Available."});
// });

app.use((err, req, res, next)=>{
    if (!err.status && err.message != undefined) {
        err.status = 500;
        err.message = ('Internal Server Error');
    }
    res.status(err.status);
    let errorCode = 0;
    if (err.code)
        errorCode = err.code
    res.json({'response': err.message, 'error': true, code: errorCode});
    next(err);

});

app.use((req, res, next)=>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

