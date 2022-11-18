import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { thunkGetSearchedSnacks } from '../../store/snacks'
import "./SearchedSnacks.css"

export default function SearchedSnacks() {
  const dispatch = useDispatch()
  const { searchWord } = useParams()

  const snacks = useSelector(state => Object.values(state.allSnacks));

  useEffect(() => {
    dispatch(thunkGetSearchedSnacks(searchWord))
  },[dispatch, searchWord])

  return (
    <div className="searched_snacks_container">
      {snacks.length === 0 ? (
      <div className='no-results-search'>
        <h2 > Sorry no snacks found for "{searchWord}"</h2>
        <img id='no-results-gif'src='https://c.tenor.com/-sXUFC3XJrwAAAAM/crying-milkandmocha.gif'></img>
      </div>

      ) :
        <h2 id='searched-results'>{snacks.length} result(s) for "{searchWord}"</h2>
      }
      <div className="searched_snacks_container2">
        {snacks && snacks.map(snack => (
            <div className="indv_searched_snack"key={snack.id}>
                <Link className='searched-snacks'to={`/snacks/${snack.id}`}>
                    <img id="searched-snack-image"src={snack.cover_pic} alt="snackImg"></img>
                    <p id="searched-snack_search_title">{snack.title}</p>
                    <p id='searched-snack-price'>${snack.price.toFixed(2)}</p>
                </Link>
            </div>
        ))}
      </div>
    </div>
  )
}
