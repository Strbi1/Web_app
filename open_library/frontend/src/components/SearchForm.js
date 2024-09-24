import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchText = useRef('');
  const navigate = useNavigate();

  useEffect(() => searchText.current.focus(), []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let tempSearchTerm = searchTerm.trim();
    if (tempSearchTerm.replace(/[^\w\s]/gi, '').length === 0) {
      setSearchTerm('fyodor');
    }

    navigate(`/books?q=${searchTerm}`);
  };

  return (
    <div className='search-form'>
      <div className='container'>
        <div className='search-from-container'>
          <form className='search-from' onSubmit={handleSubmit}>
            <div className='search-form-elem flex flex-sb bg-white'>
              <input
                type='text'
                className='form-control'
                placeholder='Explore books...'
                ref={searchText}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type='submit' className='flex flex-c'>
                <FaSearch className='text-purple' size={32} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
