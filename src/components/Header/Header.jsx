import { Button, Input, Select } from 'antd';
import logo from '../../../public/images/logo.svg';
import { HeartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import cls from './header.module.scss';
import { Link } from 'react-router';
import { SlBasket } from 'react-icons/sl';
import { BsBorderStyle } from 'react-icons/bs';
import { authStore } from '../../store/authStore';
import { useEffect } from 'react';
import { useCategoryStore } from '../../store/cotegoryStore';
import { useCartStore } from '../../store/cartStore';

export default function Header() {
  const { profile, getProfile } = authStore();
  const { categories, getCategories } = useCategoryStore();
  const { cart } = useCartStore();

  useEffect(() => {
    getProfile();
    getCategories();
  }, []);

  const onChange = (value) => {
    // console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    // console.log('search:', value);
  };

  return (
    <div className={cls.wrapper}>
      <Link to={'/'}>
        <img src={logo} alt="" />
      </Link>
      <Select
        className={cls.select}
        showSearch={{ optionFilterProp: 'label', onSearch }}
        placeholder="Каталог"
        onChange={onChange}
        suffixIcon={<UnorderedListOutlined />}
        options={(categories ?? []).map((cat) => ({
          label: cat.title,
          value: cat.id,
        }))}
      />
      <Input.Search
        className={cls.inp}
        variant="underlined"
        type="text"
        placeholder="Найти товар"
      />
      <div className={cls.icons}>
        <div className={cls.icon}>
          <HeartOutlined />
          <p>Избранное</p>
        </div>
        <div className={cls.icon}>
          <BsBorderStyle />
          <p>Заказы</p>
        </div>
        <Link style={{ textDecoration: 'none' }} to={'/cart'}>
          <div className={cls.icon}>
            <SlBasket />
            <span className={cls.count}>{cart.length}</span>
            <p>Корзина</p>
          </div>
        </Link>
      </div>
      <Link to={'/profile'}>
        <div className={cls.userWrapper}>
          <img
            className={cls.imgUser}
            src={
              profile?.avatar
                ? profile?.avatar
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s'
            }
            alt=""
          />
          <h4>{profile?.username}</h4>
        </div>
      </Link>
    </div>
  );
}
