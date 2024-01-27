import './Marque.css'

function Marque() {
  return (
    <>
      <div>
        <h2 className="marque-title">Marque</h2>
        <div className="marque-flex">
          <button><a href='#'>Tout</a></button>
          <button><a href='#'>Mercedes</a></button>
          <button><a href='#'>BMW</a></button>
          <button><a href='#'>Audi</a></button>
          <button><a href='#'>Subaru</a></button>
        </div>
      </div>
    </>
  )
}
export default Marque;