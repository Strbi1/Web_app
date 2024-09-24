import React from 'react';

import LoaderGif from '../assets/loader.svg';

const Loader = () => {
  return (
    <div className='loader flex flex-c'>
      <img src={LoaderGif} alt='loader' />
    </div>
  );
};

export default Loader;
