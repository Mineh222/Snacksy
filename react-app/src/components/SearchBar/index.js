import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { thunkSearchAllSnacks } from "../../store/searchbar";
import './SearchBar.css'
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import {Link, useHistory} from 'react-router-dom';

const SearchBar = () => {
    const [filteredSnacks, setFilteredSnacks] = useState([]);
    const [wordEntry, setWordEntry] = useState("");

    const snacks = useSelector(state => Object.values(state.search));

    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(thunkSearchAllSnacks());
    }, [dispatch]);


    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntry(searchWord);
        const newFilter = snacks.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredSnacks([])
        } else {
            setFilteredSnacks(newFilter)
        }
    }

    const clearInput = () => {
        setFilteredSnacks([])
        setWordEntry("")
        history.push(`/snacks/search/${wordEntry}`)
    }

    const cancelSearch = () => {
        setFilteredSnacks([])
        setWordEntry("")
    }


    return (
        <div className="search">
            <form className='search-inputs'>
                <input type="text" placeholder="Search for snacks" value={wordEntry} onChange={handleFilter}></input>
                <div className="searchIcon">
                {wordEntry.length === 0 ?
                        <SearchIcon id="search-icon" />  :
                    <>
                        <CloseIcon id="close-button" onClick={cancelSearch}/>
                        <button className="search-icon-button" type='submit' onClick={clearInput}>
                            <SearchIcon id="search-icon" onClick={clearInput}/>
                        </button>
                    </>
                }
                </div>
            </form>
            {filteredSnacks.length !== 0 && (
                <div className="snack-result">
                    {filteredSnacks.slice(0, 5).map((snack) => {
                        return (
                            <Link key={snack.id} className="snack-item" to={`/snacks/${snack.id}`} onClick={clearInput}>
                                <p id='snack-title'>{snack.title}</p>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar;
