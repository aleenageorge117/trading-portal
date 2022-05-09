import React, { ReactEventHandler, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// SCSS
import "./TradesDetail.scss";
// import "bootstrap/dist/css/bootstrap.min.css";

//JSON
import TradeList from '../../assets/json/tradeList.json';
import Button from '../../components/Form/Button';

//IMAGE
import defaultImg from '../../assets/images/defaultBgImg.png';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';

const TradesDetail = () => {
    let urlData: any = useParams();
    let navigate = useNavigate();

    const [tradeData, setTradeData]: any = useState({});
    const [displayErr, setDisplayErr] = useState(false);
    const [inWatchlist, setInWatchlist] = useState({
        id: null,
        inWatchlist : false
    });
    const [actionBtnFlag, setActionBtnFlag] = useState(false);

    const userId = localStorage.getItem('userId')
    
    useEffect(() => {
        if(urlData.tradeId != undefined) {
            getTradeDetail();
        }        
    }, [urlData.tradeId]);


    let tradeButtonProps = {
        "field": "button",
        "type": "submit",
        "title": "Trade Item",
        "name": "trade",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "primaryBtn marginRight-30"
    };

    const watchButtonProps = {
        "field": "button",
        "type": "submit",
        "title": "Watch Item",
        "name": "watch",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "primaryBtn marginRight-30"
    };

    const unWatchButtonProps = {
        "field": "button",
        "type": "submit",
        "title": "Unwatch Item",
        "name": "watch",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "warningBtn marginRight-30"
    };

    let editButtonProps = {
        "field": "button",
        "type": "submit",
        "title": <i className="fa-solid fa-pencil" id="edit"></i>,
        "name": "edit",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "secondaryBtn marginLeft-30"
    };

    
    let deleteButtonProps = {
        "field": "button",
        "type": "submit",
        "title": <i className="fa-regular fa-trash-can" id="delete"></i>,
        "name": "delete",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "warningBtn marginLeft-30"
    };

    let getTradeDetail = () => {
        fetch(`/trades/${urlData.tradeId}`)
            .then((res: any) => 
                res.json()
            )
            .then((data: any) => {
                if(data.error) {
                    setDisplayErr(true);
                } else {
                    setTradeData(data.trade);
                    setInWatchlist(data.watchlist)
                    if ((userId != null || userId != undefined) && data.trade.author._id == userId)
                        setActionBtnFlag(true)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    let handeClick = (event: any) => {
        if (urlData.tradeId) {
            if (event.target.id == 'edit') {
                console.log('navigate')
                navigate(`/edit/${urlData.tradeId}`)
            } else {
                fetch(`/trades/${urlData.tradeId}`, {
                    method: 'delete',
                })
                .then((response) => response.json())
                .then(() => {
                    navigate('/trades')                  
                })
                .catch((error) => {
                  console.log("----> error");
                  console.log(error);
                });        
            }
        }
    }
    
    let addToWatchList = async () => {


        let watchlistItem: object  = {
            trade: tradeData._id,
            user: localStorage.getItem('userId')
        }


        await fetch('/watchlist', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(watchlistItem)
        })
        .then((res: any) => res.json())
        .then((data: any) => {
            if (data.error == undefined) {
                showSuccessToast('Trade added to watchlist.');
                getTradeDetail();            
            }
            else {
                setDisplayErr(true);
                showErrorToast(data.response)

                if (data.code) {
                    if (data.code == 11300) {
                        localStorage.clear(); 
                        navigate('/')
                    }
                }  
            }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    const deleteFromWatchlist = () => {
        fetch(`/watchlist/${inWatchlist['id']}`, {
            method: 'delete',
        })
        .then((response) => response.json())
        .then((data) => {

            if (data.error == undefined) {
                showSuccessToast('Trade removed from watchlist.');
                setInWatchlist({
                    id: null,
                    inWatchlist : false
                })         
            }
            else {
                showErrorToast(data.response)

                if (data.code) {
                    if (data.code == 11300) {
                        localStorage.clear(); 
                        navigate('/')
                    }
                }
                    
            }
        })
        .catch((error) => {
          console.log("----> error");
          console.log(error);
        });  
    }

    const tradeItem = () => {
        let reqBody = {
            tradeRequesting: tradeData._id,
            tradeRequested: 'tradeReqId',
            userRequesting: userId,
            userRequested: tradeData.author._id
        }
    }


    const showErrorToast = (msg: string) => {

        toast.error(msg, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const showSuccessToast = (msg: string) => {

        toast.success(msg, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }



    return (
        <div>
        <div className='detailComponent col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            {
                !displayErr ?
                (
                    <div>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            {
                                actionBtnFlag ? (
                                    <div className='btnContainer floatRight'>
                                        <Button btnClick={(event: any) => handeClick} data={editButtonProps}/>
                                        <Button btnClick={(event: any) => handeClick} data={deleteButtonProps}/>
                                    </div> 
                                ) : (null)
                            }
   
                        </div>
                        <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12'>
                            <div className='imgContainer'>
                                <div title={tradeData.tradeName} style={{backgroundImage:`url(${tradeData.imageURL}), url(${defaultImg})`}} ></div>
                            </div>
                        </div>
                        <div className='detailSection col-lg-7 col-md-12 col-sm-12 col-xs-12'>
                            <div className=''>
                                <h2>{tradeData.tradeName}</h2>
                                {
                                    tradeData.author !== undefined ? (<span className='authorName'>{tradeData.author.userName}</span>) : null
                                }
                                
                                <div>
                                    <div className='btnContainer'>
                                        {
                                            inWatchlist.inWatchlist ?
                                            (<Button btnClick={() => deleteFromWatchlist} data={unWatchButtonProps}/>)
                                            : (<Button btnClick={() => addToWatchList} data={watchButtonProps}/>)
                                        }
                                        {
                                            !actionBtnFlag ? (
                                                <Button btnClick={() => {}} data={tradeButtonProps}/>
                                            ) : (null)
                                        }
                                    </div>
                                </div>
                            </div>
                            <hr className='dividerLine' />
                        </div>
                        <div className='descContainer'> 
                            About:<br />
                            {tradeData.tradeDescription}
                        </div>
                    </div>
                ) : (<ErrorMsg message='Error displaying Trade. Please try again later!!'/>)
            }
        </div>
       
        </div>

    );
}


export default TradesDetail;
