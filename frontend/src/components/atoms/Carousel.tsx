import { LazyLoadImage } from 'react-lazy-load-image-component';

interface CarouselProps {
  imageSrc: string;
  name: string;
}

const Carousel = ({ imageSrc, name }: CarouselProps) => {
  return (
    <div className="min-h-[300px] relative p-2 md:py-[40px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[10px]"
        style={{
          backgroundImage: `url(${imageSrc})`,
        }}
      />
      <div className="relative flex justify-center mt-5 gap-3 md:gap-5 md:mt-0 lg:gap-10 ">
        <LazyLoadImage
          src={imageSrc}
          alt={name}
          effect="blur"
          className="rounded-[30px] w-[320px] md:w-[420px] lg:w-[480px]"
        />
        <h3 className="text-[white] text-[27px] self-end lg:text-[50px] md:self-end md:text-[33px]">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default Carousel;
