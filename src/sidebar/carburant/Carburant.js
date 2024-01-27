import './Carburant.css'

function Carburant() {
  return (
    <div >
      <h2 className="sidebar-title">Carburant</h2>

      <div>
        <label className="sidebar-label-container">
          <input type="radio" name="test" />
          <span className="checkmark"></span>Tout
        </label>
        <label className="sidebar-label-container">
          <input type="radio" name="test" />
          <span className="checkmark"></span>Gasoile
        </label>
        <label className="sidebar-label-container">
          <input type="radio" name="test" />
          <span className="checkmark"></span>Essence
        </label>
        <label className="sidebar-label-container">
          <input type="radio" name="test" />
          <span className="checkmark"></span>100LL
        </label>
      </div>
    </div>
  )
}
export default  Carburant;