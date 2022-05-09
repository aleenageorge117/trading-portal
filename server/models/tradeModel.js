const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema(
    {
        tradeName : { type: String, required: [true, 'Trade name is a required field.'], 
                                    minLength: [3, 'The content should have atleast 3 characters'],
                                    maxLength: [120, 'the content should have at the max 120 characters'] },
        author: {type: Schema.Types.ObjectId, ref: 'User'},
        tradeDescription : { type: String, required: [true, 'Trade description is a required field.'],
                                        maxLength: [5000, 'the content should have at the max 5000 characters'] },
        imageURL : { type: String },
        tag : { type: String, required: [true, 'Tag is a required field.'],
                            maxLength: [5000, 'the content should have at the max 5000 characters'] },
        rating : { type: String }
    },
    {timestamps: true}
);




module.exports = mongoose.model('Trade', tradeSchema);




// const {v4:uuidv4} = require('uuid');

// const tradeList = require('../jsonData/tradeList.json');

// exports.getTradeList = () => {
//     return tradeList;
// }

// exports.findTradeById = (id) => {
//     let objKeys = Object.keys(tradeList);
//     for (let i = 0; i <= objKeys.length; i++) {
//         let key = objKeys[i];
//         for (let j = 0; j <= tradeList[key].length; j++) {

//             if (tradeList[key][j] && tradeList[key][j].id == id) {
//                 return tradeList[key][j];
//             }
//         }
//     }
//     return false;
// }

// exports.saveTrade = (tradeData) => {
//     tradeData.id = uuidv4();
//     if (tradeList[tradeData.tag] != undefined) {
//         tradeList[tradeData.tag].push(tradeData)
//     } else {
//         tradeList[tradeData.tag] = [];
//         tradeList[tradeData.tag].push(tradeData);
//     }

//     return true;
// }

// exports.updateTrade = (tradeData) => {
//         console.log('if')
//         for (let i = 0; i < tradeList[tradeData.tag].length; i++) {
//         console.log('for')
//             if (tradeList[tradeData.tag][i].id == tradeData.id) {
//         console.log('mila')
//                 tradeList[tradeData.tag][i] = tradeData;
//                 return true;    
//             }
//         }
//     return false;
// }

// exports.deleteTrade = (id) => {

//     if (id != undefined) {
//         let objKeys = Object.keys(tradeList);

//         for (let i = 0; i< objKeys.length; i++) {
//             for (let j = 0; j < tradeList[objKeys[i]].length; j++) {
//                 if (tradeList[objKeys[i]][j].id == id) {
//                     tradeList[objKeys[i]].splice(j,1);
//                     return true;
//                 }
//             }
//         }

//         console.log(tradeList)
//         return false;
//     }

//     return false;
// }