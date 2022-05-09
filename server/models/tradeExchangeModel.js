const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeExchangeSchema = new Schema(
    {
        tradeRequesting: {type: Schema.Types.ObjectId, ref: 'Trade'},
        tradeRequested: {type: Schema.Types.ObjectId, ref: 'Trade'},
        userRequesting: {type: Schema.Types.ObjectId, ref: 'User'},
        userRequested: {type: Schema.Types.ObjectId, ref: 'User'}
    },
    {timestamps: true}
);




module.exports = mongoose.model('TradeExchange', tradeExchangeSchema);