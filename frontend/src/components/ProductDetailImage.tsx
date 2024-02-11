import { useState } from 'react';

interface ProductDetailImageProps {
  imageList: ProductImageList;
}

const ProductDetailImage = ({ imageList }: ProductDetailImageProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(imageList[0].path);

  return (
    <div className="flex justify-between items-start gap-[50px]">
      <ul className="flex flex-col gap-[20px]">
        {imageList.map(({ path, publicId }) => (
          <li className="w-[100px] h-[100px] overflow-hidden cursor-pointer" key={publicId}>
            <img
              src={path}
              onMouseEnter={() => setSelectedImage(path)}
              className="hover:scale-[1.07] transition-all duration-150"
            />
          </li>
        ))}
      </ul>
      <div>
        <img src={selectedImage} className="w-[400px]" />
      </div>
    </div>
  );
};

export default ProductDetailImage;
