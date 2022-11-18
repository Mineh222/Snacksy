import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllSnacks } from '../../store/snacks';
import { Link } from "react-router-dom";
import './allsnackscategory.css'


export default function AllSnacksCategory() {
  const dispatch = useDispatch()
  const allSnacks = useSelector(state => Object.values(state.allSnacks));

  useEffect(() => {
    window.scroll(0, 0)
    dispatch(thunkGetAllSnacks())
  }, [dispatch])

  if(!allSnacks) return null

  return (
    <div className='all-snack-cat-container'>
      <div className='all-snack-cat-header'>
        <p id='all-snack-cat-title'> All Snacks </p>
        <p id='total-snacks'>{allSnacks.length} snacks</p>
      </div>
      <div className='all-snack-cat-row'>
        {allSnacks && allSnacks.map(snack => (
            <div className='all-snack-cat-card' key={snack.id} >
                <Link id='all-snack-cat-link'to={`/snacks/${snack.id}`}>
                    <img id='all-snack-cat-img'src={snack.cover_pic} alt="snackImg"></img>
                    <p id='all-snack-cat-card-title'>{snack.title}</p>
                    <p id='all-snack-cat-card-title'>{snack.category}</p>
                    <p id='all-snack-cat-price'>$ {snack.price.toFixed(2)}</p>
                </Link>
            </div>
        ))}
      </div>
      <div id='all-snack-return-link'>
        <Link id='all-snack-home-link' to='/'><i className="fa-solid fa-left-long"></i> {'back home'}</Link>
      </div>
    </div>
  )
}
