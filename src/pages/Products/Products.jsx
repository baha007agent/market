import { useEffect } from 'react';
import { Button, Col, Row } from 'antd';
import cls from './products.module.scss';
import { useNavigate } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToCart } from '../../api/cart';
import { getProducts } from '../../api/products';

export default function Products() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: products, isLoading } = useQuery({
    queryKey: 'products',
    queryFn: getProducts,
  });

  const { mutate } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

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
                      mutate(product.id);
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
