import './Products.css';
import { BsFillBagFill } from "react-icons/bs";
import {CiChat1,CiHeart} from 'react-icons/ci';
import React, { useState } from 'react';

function Products() {
  const [heartColor, setHeartColor] = useState('white');

  const handleHeartClick = () => {
    setHeartColor((prevColor) => (prevColor === 'white' ? 'red' : 'white'));
  };
  return (
    <>
      <section className='card-container'>
        <section className='card'>
          <img src='https://i.pinimg.com/564x/39/79/2b/39792bd2ceca6eef9004c1a989d651e1.jpg' alt='subaru'></img>
          <div className='card-details'>
            <h3 className='card-title'>Subaru STI WRX</h3>
            <section className='card-reviews'>
              La Subaru WRX STI est réputée pour ses performances sportives
            </section>
            <section className='card-price'>
              <h4 className='price'>
                Prix: 75.000.000 MGA
              </h4>
              <div className="bag">
                <BsFillBagFill className="bag-icon" />
              </div>
            </section>
            <section className='card-action'>
              <div className='icon'>
                <a href="#" onClick={handleHeartClick}>
                  <CiHeart className="nav-icons" style={{ backgroundColor: heartColor }}/>
                </a>
                <a href="#">
                  <CiChat1 className="nav-icons" />
                </a>
              </div>
              <button><a href='#'>Details</a></button>
            </section>
          </div>
        </section>

      </section>
    </>
  )
}
export default Products;