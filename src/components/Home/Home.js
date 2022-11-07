import {
    MDBCarousel,
    MDBCarouselItem
} from 'mdb-react-ui-kit';
import React from 'react';
import banner1 from "../../images/banner1.jpg";

const Home = () => {
    return (
        <MDBCarousel showControls fade>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={1}
        src={banner1}
        alt='...'
      />
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src={banner1}
        alt='...'
      />
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src={banner1}
        alt='...'
      />
    </MDBCarousel>
    );
};

export default Home;