import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { getBanners } from '@utils/api';

// CSS
import * as S from './style';

const CarouselComponent = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data } = await getBanners();
      setBanners(data);
    };

    fetchBanners();
  }, []);

  return (
    <Carousel style={{ margin: '0 3%', zIndex: '-1' }}>
      {banners?.map(banner => (
        <Carousel.Item key={banner._id}>
          <S.BackgroundWrapper backgroundImage={banner.image ?? null} />
          <LazyLoadImage
            className="position-absolute"
            src={banner.image ?? null}
            alt={banner.name}
            style={{
              top: '20%',
              left: '25%',
              width: '640px',
              height: '70%',
            }}
          />

          <Carousel.Caption>
            <h3>{banner.name}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
