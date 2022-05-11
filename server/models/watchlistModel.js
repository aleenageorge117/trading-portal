const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema(
    {
        trade: {type: Schema.Types.ObjectId, ref: 'Trade', required: [true, 'Trade details are required.']},
        user: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User details are required.']}
    },
    {timestamps: true}
);




module.exports = mongoose.model('Watchlist', watchlistSchema);