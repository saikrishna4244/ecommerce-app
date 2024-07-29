// src/components/BannerCarousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const banners = [
  { id: 1, image: 'https://via.placeholder.com/1200x300?text=20%25+OFF+for+the+next+2+days', alt: 'Banner 1' },
  { id: 2, image: 'https://via.placeholder.com/1200x300?text=New+Arrivals', alt: 'Banner 2' },
  { id: 3, image: 'https://via.placeholder.com/1200x300?text=Clearance+Sale', alt: 'Banner 3' },
];

const BannerCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true, // Enables fade animation between slides
  };

  return (
    <Slider {...settings}>
      {banners.map(banner => (
        <div key={banner.id}>
          <img src={banner.image} alt={banner.alt} style={{ width: '100%', borderRadius: '8px' }} />
        </div>
      ))}
    </Slider>
  );
};

export default BannerCarousel;
