import { useParams } from 'react-router';

import cls from './deteilProduct.module.scss';
import { SlBasket } from 'react-icons/sl';
import { Button } from 'antd';
import { addToCart } from '../../api/cart';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { getProductId } from '../../api/products';

export default function DeteilProduct() {
  const { id } = useParams();
  const { data: productDetail } = useQuery({
    queryKey: ['productDetail'],
    queryFn: () => getProductId(id),
    enabled: !!id,
  });

  const { mutate } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  console.log(productDetail);

  // useEffect(() => {
  //   getProductId(id);
  // }, [productDetail]);

  return (
    <>
      <div className={cls.wrapper}>
        <div className="container">
          <h1 className={cls.title}>{productDetail?.title}</h1>
          <div key={productDetail?.id} className={cls.block}>
            <div className={cls.imgWrapper}>
              <img
                src={
                  productDetail?.image
                    ? productDetail?.image
                    : 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
                }
                alt=""
              />
            </div>
            <div className={cls.blockRight}>
              <h5 className={cls.blockRightTitle}>108,99 ₽</h5>
              <Button onClick={() => mutate(productDetail?.id)} className={cls.btn}>
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
