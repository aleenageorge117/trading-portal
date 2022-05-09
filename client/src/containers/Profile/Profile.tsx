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
    const [displaysect1Err, setDisplaysect1Err] = useState(false);
    const [displaySect2Err, setDisplaySect2Err] = useState(false);

    useEffect(() => {
        getUserTrades();
        getwatchlistedTrades();
    }, []);

    const getUserTrades = () => {
        fetch(`/user/${userId}`)
            .then((res: any) => res.json())
            .then((data: any) => {
                console.log(data)

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
                console.log(data)

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

    return (
        <div className='profileContainer col-lg-12 col-sm-12 col-xs-12 col-md-12'>
            <h3>Hello {userName},</h3>
            {
                !displaysect1Err ? (
                    userTrades.length > 0 ?
                    (
                        <div className='row col-lg-12 col-md-12 col-sm-12 col-xs-12'>

                        <span className='sectionTitle'>
                            Following Trades were created by you
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
                                    <th scope='col'>Trade Name</th>
                                    <th scope='col'>Tag</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    watchlist.map((data: any, key: number) => {
                                        return (
                                            <tr>
                                                <td className='link'><Link to={'/trade-detail/'+data.trade._id}>{data.trade.tradeName}</Link></td>
                                                <td>{data.trade.tag}</td>
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
            
        </div>
    );
}

export default Profile;
