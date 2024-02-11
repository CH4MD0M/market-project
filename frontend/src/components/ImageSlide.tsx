import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import { getSlideImages } from '@utils/api';

// Components
import Carousel from '@components/atoms/Carousel';

const ImageSlide = () => {
  const [slideImages, setSlideImages] = useState([]);

  useEffect(() => {
    const fetchSlideImages = async () => {
      const { data } = await getSlideImages();
      setSlideImages(data);
    };

    fetchSlideImages();
  }, []);

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3500,
      }}
      speed={1000}
      className="h-[300px] md:h-[350px] lg:h-[400px]"
    >
      {slideImages.map(({ _id, image, name }) => (
        <SwiperSlide key={_id}>
          <Carousel imageSrc={image} name={name} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlide;
