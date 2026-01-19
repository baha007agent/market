import { useEffect } from 'react';
import { useProductStore } from '../../store/productStore';
import { Button, Col, Row } from 'antd';
import cls from './products.module.scss';
import { useCartStore } from '../../store/cartStore';
import { useNavigate } from 'react-router';

export default function Products() {
  const { products, getProducts, isLoading } = useProductStore();
  const { addToCart } = useCartStore();

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h1 className={cls.title}>Все товары</h1>
      <div className={cls.wrapper}>
        <Row gutter={[1, 4]}>
          {products.map((product) => (
            <Col
              onClick={() => navigate(`/products/${product.id}`)}
              key={product.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}>
              <div className={cls.main}>
                <img
                  className={cls.productImg}
                  src={
                    product.image
                      ? product.image
                      : 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
                  }
                  alt=""
                />
                <div className={cls.productsDes}>
                  <h5>4400 c</h5>
                  <p>
                    {product.title.slice(0, 50)} {product.title.length > 17 ? '...' : ''}
                  </p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product.id);
                    }}
                    className={cls.productsBtn}
                    color="green"
                    variant="outlined">
                    В корзину
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
