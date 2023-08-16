import { LinkContainer } from 'react-router-bootstrap';

// CSS
import * as S from './style';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { image, name } = category;
  return (
    <LinkContainer to={`/products/category/${name}`}>
      <S.CategoryCardContainer>
        <S.CategoryCardImage crossOrigin="anonymous" src={image} alt={name} />
        <div>
          <h3>{name}</h3>
        </div>
      </S.CategoryCardContainer>
    </LinkContainer>
  );
};

export default CategoryCard;
