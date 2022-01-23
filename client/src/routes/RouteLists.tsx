import { Route, Routes, Navigate} from 'react-router-dom';
import Home from '../containers/Home/Home';
import Trades from '../containers/Trades/Trades';
import TradesDetail from '../containers/TradesDetail/TradesDetail';


const RouteLists = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/trades" element={<Trades />} />
            <Route path="/trade-detail" element={<TradesDetail />} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );
}

export default RouteLists;
