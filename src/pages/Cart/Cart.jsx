import cls from './cart.module.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import {
  QueryClient,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getCart, removeFromCart } from '../../api/cart';

export default function Cart() {
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  const { mutate } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.setQueryData(['cart'], (old) => {
        if (!old) return old;
        return old.filter((item) => item.id !== id);
      });
    },
  });

  console.log(cart);

  if (isLoading)
    return (
      <div>
        <LoadingOutlined />
      </div>
    );

  return (
    <>
      <div className={cls.cart}>
        <div className="container">
          <h1 className={cls.title}>Корзина</h1>
          {cart.map((cart) => (
            <div key={cart.id} className={cls.wrapper}>
              <div className={cls.main}>
                <div className={cls.rightWrapper}>
                  <div className={cls.imgWrapper}>
                    <img
                      className={cls.img}
                      src={
                        cart.product?.image
                          ? cart.product?.image
                          : 'https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg'
                      }
                      alt=""
                    />
                  </div>
                  <div className={cls.desc}>
                    <h5>
                      {cart.product?.description.slice(0, 75)}
                      {cart.product?.description.length > 75 ? '...' : ''}
                    </h5>
                    <p>
                      <b>44,50 ₽</b>
                      за шт.
                    </p>
                  </div>
                </div>
                <div className={cls.leftWrapper}>
                  <div className={cls.quantityWrapper}>
                    <button>-</button>
                    <h4>{cart.quantity}</h4>
                    <button>+</button>
                  </div>
                  <Button onClick={() => mutate(cart.product?.id)} color="danger" variant="solid">
                    Delete
                  </Button>

                  <h5>89,00 ₽</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
