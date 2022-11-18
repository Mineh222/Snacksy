import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { thunkGetCategory } from '../../store/snacks'

import './categories.css'

function CategoriesPage() {
  const dispatch = useDispatch()
  const { category } = useParams()

  const snacks = useSelector(state => Object.values(state.allSnacks));

  useEffect(() => {
    window.scroll(0, 0)
    dispatch(thunkGetCategory(category))
  },[dispatch, category])

  return (
    <div className='category-container' >
      <div className='category-header'>
        <p id='category-page-title'>{category}</p>
        <p id='category-amount'>{snacks.length} snacks</p>
      </div>
      <div className='category-snack-rows'>
        {snacks && snacks.map(snack => (
            <div className='category-snack-card-container' key={snack.id}>
                <Link className="category-snack-link"to={`/snacks/${snack.id}`}>
                    <img id="category-snack-img" src={snack.cover_pic} alt="snackImg"></img>
                    <p id='category-snack-title'>{snack.title}</p>
                    <p id='category-snack-price'>$ {snack.price.toFixed(2)}</p>
                </Link>
            </div>
        ))}
      </div>
      <div id='category-page-return'>
        <Link id='category-page-link' to='/'><i className="fa-solid fa-left-long"></i> {'back home'}</Link>
      </div>
    </div>
  )
}

export default CategoriesPage
