import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import DetailAnnonce from './pages/DetailAnnonce';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="sApp">
      <Router>
      <Navbar />
        <Routes>
          <Route excat path='/' element={<Home/>} />
          <Route excat path='/detailannonce/:id' element={<DetailAnnonce/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
