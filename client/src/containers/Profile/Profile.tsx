import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import { toast } from 'react-toastify';

// SCSS
import './Profile.scss';

//COMPONENT
import DisplayCards from '../../components/DisplayCards/DisplayCards';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
import { data } from 'jquery';
import Button from '../../components/Form/Button';

const Profile = () => {

    const userId = localStorage.getItem('userId')
    const userName = localStorage.getItem('userName')

    const navigate: any = useNavigate();
    const [userTrades, setUserTrades]: any = useState({});
    const [watchlist, setWatchlist]: any = useState({});
    const [requestedTrades, setRequestedTrades]: any = useState({});
    const [requestingTrades, setRequestingTrades]: any = useState({});
    const [displaysect1Err, setDisplaysect1Err] = useState(false);
    const [displaySect2Err, setDisplaySect2Err] = useState(false);
    
    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = () => {
        getUserTrades();
        getwatchlistedTrades();
        getTradeRequests();
    }

    const getUserTrades = () => {
        fetch(`/user/${userId}`)
            .then((res: any) => res.json())
            .then((data: any) => {
                if (data.error == undefined) {
                    setUserTrades(data);
                }
                else {
                    setDisplaysect1Err(true);
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
                setDisplaysect1Err(true);
            });
    }

    const getwatchlistedTrades = () => {
        fetch(`/watchlist/${userId}`)
            .then((res: any) => res.json())
            .then((data: any) => {
                if (data.error == undefined) {
                    setWatchlist(data);
                }
                else {
                    setDisplaySect2Err(true);
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
                setDisplaySect2Err(true);
            });
    }

    const deleteFromWatchlist = (id: any) => {
        fetch(`/watchlist/${id}`, {
            method: 'delete',
        })
        .then((response) => response.json())
        .then((data) => {

            if (data.error == undefined) {
                getwatchlistedTrades();          
                showSuccessToast('Trade removed from watchlist.');
                loadProfileData();

            }
            else {
                // setDisplaySect2Err(true);
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

    const getTradeRequests = () => {
        fetch(`/trade-exchange/${userId}`)
        .then((res: any) => res.json())
        .then((data: any) => {
            if (data.error == undefined) {
                setRequestedTrades(data.requestedTrades);
                setRequestingTrades(data.requestingTrades);
            }
            else {
                // setDisplaysect1Err(true);
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
            // setDisplaysect1Err(true);
        });

    }

    const deleteRequest = (id: any) => {
        fetch(`/trade-exchange/${id}`, {
            method: 'delete',
        })
        .then((response) => response.json())
        .then((data) => {

            if (data.error == undefined) {
                showSuccessToast('Trade request removed.');
                loadProfileData();
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

    const approveRequest = (id: any) => {
        let idx = 0;
        for (let i = 0; i < requestedTrades.length; i++) {
            if (requestedTrades[i]._id == id)
                idx = i;
        }


        let data = {
            requestingTrade: requestedTrades[idx].tradeRequesting._id,
            requestedTrade: requestedTrades[idx].tradeRequested._id,
            requestingUser: requestedTrades[idx].tradeRequesting.author,
            requestedUser: requestedTrades[idx].tradeRequested.author
        }
        
        fetch(`/trade-exchange/${id}`, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error == undefined) {
                showSuccessToast('Trade completed successfully.');
            } else {
                showErrorToast(data.response)
                if (data.code) {
                    if (data.code == 11300) {
                        localStorage.clear(); 
                        navigate('/')
                    }
                }
            }
        })
        .then(() => {
            loadProfileData();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return (
        <div className='profileContainer col-lg-12 col-sm-12 col-xs-12 col-md-12'>
            <h3>Hello {userName},</h3>
            {
                !displaysect1Err ? (
                    userTrades.length > 0 ?
                    (
                        <div className='row col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <hr />
                            <span className='sectionTitle'>
                                List of trades available
                            </span>
                            {
                                userTrades.map((data: any, key: any) => {
                                    return (
                                            <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12 tradeList'  key={key}>
                                                <DisplayCards data={data} />
                                                <span className='tradeTitle' data-tip data-for={'tradeTitle_' + key} data-class='reactTooltipStyle'>{data.tradeName}</span>
                                                <ReactTooltip id={'tradeTitle_' + key} place='bottom' effect='solid'>{data.tradeName}</ReactTooltip>
                                            </div>
                                    );
                                })
                            }
                        </div>

                    ) : (<span>You have not created any trades yet!</span>)
                
                ) : (<ErrorMsg message='Error displaying Trades. Please try again later!!'/>)
            }
            <div className='row col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                <hr />
                <span className='sectionTitle'>
                    Watchlist items:
                </span>
                {/* <table></table>     */}
                {
                    watchlist.length > 0 ?
                    (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Trade Name</th>
                                    <th>Tag</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    watchlist.map((data: any, key: number) => {
                                        return (
                                            <tr>
                                                <td className='link tdEllipsis'><Link to={'/trade-detail/'+data.trade._id}>{data.trade.tradeName}</Link></td>
                                                <td className='tdEllipsis'>{data.trade.tag}</td>
                                                <td>
                                                    <button className='btn warningBtn ' onClick={() => deleteFromWatchlist(data._id)} >Unwatch</ button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                          </table>
                    ): (<span>You have not watchlisted any trades yet!</span>)
                }
            </div>
            <div className='row col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                <hr />
                <span className='sectionTitle'>
                    Trades you Requested:
                </span>
                {
                    requestingTrades.length > 0 ?
                    (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Trade Requested</th>
                                    <th>Trade to be Exchanged</th>
                                    <th>Tag</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    
                                    requestingTrades.map((data: any, key: number) => {
                                        return (
                                            <tr>
                                                <td className='link tdEllipsis'><Link to={'/trade-detail/'+data.tradeRequesting._id}>{data.tradeRequesting.tradeName}</Link></td>
                                                <td className='tdEllipsis'>{data.tradeRequested.tradeName}</td>
                                                <td className='tdEllipsis'>{data.tradeRequesting.tag}</td>
                                                <td>
                                                    Pending
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                          </table>
                    ): (<span>You have not requested any trades yet!</span>)
                }
            </div>
            <div className='row col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                <hr />
                <span className='sectionTitle'>
                    Trade being Requested:
                </span>
                {
                    requestedTrades.length > 0 ?
                    (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Trade Requested</th>
                                    <th>Trade to be Exchanged</th>
                                    <th>Tag</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    requestedTrades.map((data: any, key: number) => {
                                        return (
                                            <tr>
                                                <td className='tdEllipsis'>{data.tradeRequesting.tradeName}</td>
                                                <td className='link tdEllipsis'><Link to={'/trade-detail/'+data.tradeRequested._id}>{data.tradeRequested.tradeName}</Link></td>
                                                <td className='tdEllipsis'>{data.tradeRequested.tag}</td>
                                                <td>
                                                    <button className='btn primaryBtn' onClick={() => approveRequest(data._id)}>Approve</button>
                                                    <button className='btn secondaryBtn marginLeft-30' onClick={() => deleteRequest(data._id)}>Delete request</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                          </table>
                    ): (<span>You do not have any trade requests!</span>)
                }
            </div>
        </div>
    );
}

export default Profile;
