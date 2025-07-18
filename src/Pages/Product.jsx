import React from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext.jsx';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay.jsx';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts.jsx';
import CustomerReviews from '../Components/CustomerReviews/CustomerReviews.jsx';
import FAQ from '../Components/FAQ/FAQ.jsx';

const Product = () => {
  const { all_product } = React.useContext(ShopContext);
  const { productId } = useParams();

  const product = all_product.find((e) => String(e.id) === String(productId)); // safer than Number()

  if (!product) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading product...</div>;
  }

  return (
    <div>
      <ProductDisplay product={product} />
      <CustomerReviews />
      <FAQ />
      <RelatedProducts />
    </div>
  );
};

export default Product;
