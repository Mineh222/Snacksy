import React from 'react'

import './footer.css'

export default function Footer() {
  return (
    <div className='footer'>
      <p id='footer-header'>Snacksy Team</p>
      <div className='footer-content'>
        <div className='footer-developer'>
          <img alt='dev-img' id='dev-img' src='https://i.postimg.cc/bNc80Vyw/75753879.jpg'></img>
          <p>Josh Salcido</p>
          <div id='dev-links'>
            <a target="_blank" id='anchor-links' href='https://github.com/joshsalcido'><i className="fa-brands fa-square-github fa-2x"></i></a>
            <a target="_blank" id='anchor-links' href='https://www.linkedin.com/in/joshua-salcido-57036a215/'><i className="fa-brands fa-linkedin fa-2x"></i></a>
          </div>
        </div>
        <div className='footer-developer'>
          <img alt='dev-img' id='dev-img' src='https://i.postimg.cc/6qss0TNm/96565654.jpg'></img>
          <p>Amy Lopez</p>
          <div id='dev-links'>
            <a target="_blank" id='anchor-links' href='https://github.com/anailopez'><i className="fa-brands fa-square-github fa-2x"></i></a>
            <a target="_blank" id='anchor-links' href='https://www.linkedin.com/in/anai-lopez-326289241/'><i className="fa-brands fa-linkedin fa-2x"></i></a>
          </div>
        </div>
        <div className='footer-developer'>
        <img alt='dev-img' id='dev-img' src='https://i.postimg.cc/q7p9bWSp/100002251.jpg'></img>
          <p>Mineh Gharabegi</p>
          <div id='dev-links'>
            <a target="_blank" id='anchor-links' href='https://github.com/Mineh222'><i className="fa-brands fa-square-github fa-2x"></i></a>
            <a target="_blank" id='anchor-links' href='https://www.linkedin.com/in/mineh-gharabegi-98696b241/'><i className="fa-brands fa-linkedin fa-2x"></i></a>
          </div>
        </div>
        <div className='footer-developer'>
          <img  alt='dev-img'id='dev-img' src='https://i.postimg.cc/T2Hfy2Sg/coaching.jpg'></img>
          <p>Michael Dasch</p>
          <div id='dev-links'>
            <a target="_blank" id='anchor-links' href='https://github.com/MDasch22'><i className="fa-brands fa-square-github fa-2x"></i></a>
            <a target="_blank" id='anchor-links' href='https://www.linkedin.com/in/michael-dasch-71b6a6187/'><i className="fa-brands fa-linkedin fa-2x"></i></a>
          </div>
        </div>

      </div>

    </div>
  )
}
