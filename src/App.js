import logo from './logo.svg';
import './App.css';
import Nav from './navigation/Nav';
import Products from './products/Products';
import Marque from './marque/Marque';
import Sidebar from './sidebar/Sidebar';

function App() {
  return (
    <>
      <Sidebar/>
      <Nav/>
      <Marque/>
      <Products/>
    </>
  );
}

export default App;
