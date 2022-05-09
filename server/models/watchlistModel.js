const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema(
    {
        trade: {type: Schema.Types.ObjectId, ref: 'Trade'},
        user: {type: Schema.Types.ObjectId, ref: 'User'}
    },
    {timestamps: true}
);




module.exports = mongoose.model('Watchlist', watchlistSchema);