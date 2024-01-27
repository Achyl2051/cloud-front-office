import Carburant from "./carburant/Carburant";
import Category from "./category/Category";
import logo from "../assets/img/omby.png";
import './Sidebar.css'

function Sidebar() {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          <img src={logo}></img>
        </div>
        <Category/>
        <br/>
        <Carburant/>
      </section>
    </>
  )
}
export default Sidebar;