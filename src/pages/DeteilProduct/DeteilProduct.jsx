import { useProductStore } from '../../store/productStore';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import cls from './deteilProduct.module.scss';
import { SlBasket } from 'react-icons/sl';
import { Button } from 'antd';
import { useCartStore } from '../../store/cartStore';

export default function DeteilProduct() {
  const { productDetail, getProductId, isLoading } = useProductStore();
  const { addToCart } = useCartStore();

  const { id } = useParams();

  console.log(productDetail);

  useEffect(() => {
    getProductId(id);
  }, []);

  return (
    <>
      <div className={cls.wrapper}>
        <div className="container">
          <h1 className={cls.title}>{productDetail.title}</h1>
          <div key={productDetail.id} className={cls.block}>
            <div className={cls.imgWrapper}>
              <img
                src={
                  productDetail.image
                    ? productDetail.image
                    : 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
                }
                alt=""
              />
            </div>
            <div className={cls.blockRight}>
              <h5 className={cls.blockRightTitle}>108,99 ₽</h5>
              <Button onClick={() => addToCart(productDetail.id)} className={cls.btn}>
                <SlBasket />В корзину
              </Button>

              <div className={cls.text}>
                <h5>Бренд</h5>
                <h4>ПРОСТОКВАШИНО</h4>
              </div>

              <div className={cls.text}>
                <h5>User</h5>
                <h4>{productDetail?.user?.username}</h4>
              </div>

              <div className={cls.text}>
                <h5>Пол</h5>
                <h4>{productDetail?.categories?.title}</h4>
              </div>

              <p className={cls.pText}>{productDetail?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
