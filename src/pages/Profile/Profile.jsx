import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import cls from './profile.module.scss';

import { Avatar, Button, Input, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createCategory, getCategories, getProfile } from '../../api/profile';

export default function Profile() {
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const { data: categories, isLoading: categoryLoading } = useQuery({
    queryKey: ['category'],
    queryFn: getCategories,
  });

  const { mutate } = useMutation({
    mutationFn: createCategory,
  });

  const [catValue, setCatValue] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!catValue) return;
    mutate(catValue);
    setCatValue('');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className={cls.main}>
      <h2 className={cls.sectionTitle}>My Profile</h2>

      {data && (
        <>
          <div className={cls.header}>
            <div className={cls.dataInfo}>
              <Avatar size={80} src={data?.avatar} icon={!data?.avatar && <UserOutlined />} />
              <div>
                <p className={cls.text}>{data.username}</p>
                <p className={cls.email}>{data.email}</p>
              </div>
            </div>

            <Button color="danger" variant="solid" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          <hr className={cls.divider} />

          <h3 className={cls.sectionTitle}>Categories</h3>

          <form className={cls.form} onSubmit={submit}>
            <Input
              placeholder="New category"
              style={{ width: '200px' }}
              value={catValue}
              onChange={(e) => setCatValue(e.target.value)}
            />
            <Button htmlType="submit" disabled={!catValue.trim()}>
              Add
            </Button>
          </form>

          <Select
            className={cls.select}
            value={categories?.[0]?.id}
            options={(categories ?? []).map((cat) => ({
              label: cat.title,
              value: cat.id,
            }))}
          />
        </>
      )}
      <hr />
    </div>
  );
}
