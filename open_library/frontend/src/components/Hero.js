import React from 'react';

import SearchForm from './SearchForm';

const Hero = () => {
  return (
    <div className='holder'>
      <header className='header'>
        <div className='header-content flex flex-c text-center text-white'>
          <h2 className='header-title text-capitalize'>
            find your book of choice.
          </h2>
          <br />
          <p className='header-text fs-18 fw-3'>
            Biggest open online library available! Create your account and
            explore various writers and their work, we have it all! Start by
            searching for something you'd like
          </p>
          <SearchForm />
        </div>
      </header>
    </div>
  );
};

export default Hero;
