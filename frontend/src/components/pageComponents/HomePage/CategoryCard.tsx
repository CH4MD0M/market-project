import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { image, name } = category;

  return (
    <Link to={`/products/category/${name}`}>
      <div className="flex items-center justify-center gap-5 border cursor-pointer p-3 rounded-[5px] border-solid border-[#eaeaea] md:justify-normal">
        <img
          className="max-w-[120px] tablet:w-[80px]"
          crossOrigin="anonymous"
          src={image}
          alt={name}
        />
        <div>
          <h3 className="text-[25px] font-[400]">{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
