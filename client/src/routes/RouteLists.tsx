import { Route, Routes, Navigate} from 'react-router-dom';

// COMPONENTS
import Home from '../containers/Home/Home';
import Trades from '../containers/Trades/Trades';
import TradesDetail from '../containers/TradesDetail/TradesDetail';
import TradeForm from '../containers/TradeForm/TradeForm';
import Contact from '../containers/Contact/Contact';
import About from '../containers/About/About';
import Login from '../containers/Login/Login';
import SignUp from '../containers/SignUp/SignUp';
import Profile from '../containers/Profile/Profile';

const RouteLists = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate replace to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/trades' element={<Trades />} />
            <Route path='/trade-detail/:tradeId' element={<TradesDetail />} />
            <Route path='/create' element={<TradeForm pageTitle='create' />} />
            <Route path='/edit/:id' element={<TradeForm pageTitle='edit'/>} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='*' element={<Navigate to='/home' />} />
        </Routes>
    );
}

export default RouteLists;
