const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeExchangeSchema = new Schema(
    {
        tradeRequesting: {type: Schema.Types.ObjectId, ref: 'Trade', required: [true, 'Trade details are required.']},
        tradeRequested: {type: Schema.Types.ObjectId, ref: 'Trade', required: [true, 'Trade details are required.']},
        userRequesting: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User details are required.']},
        userRequested: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User details are required.']}
    },
    {timestamps: true}
);




module.exports = mongoose.model('TradeExchange', tradeExchangeSchema);