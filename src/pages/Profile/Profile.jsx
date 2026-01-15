import { useEffect, useState } from 'react';
import { authStore } from '../../store/authStore';
import { useNavigate } from 'react-router';
import { useCategoryStore } from '../../store/cotegoryStore';
import cls from './profile.module.scss';

import { Avatar, Button, Flex, Input, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function Profile() {
  const { getProfile, profile, logout } = authStore();
  const { categories, getCategories, createCategory } = useCategoryStore();

  const [catValue, setCatValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
    getCategories();
  }, [getProfile, getCategories]);

  const submit = (e) => {
    e.preventDefault();
    if (!catValue) return;
    createCategory(catValue);
    setCatValue('');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className={cls.main}>
      <h2 className={cls.sectionTitle}>My Profile</h2>

      {profile && (
        <>
          <div className={cls.header}>
            <div className={cls.profileInfo}>
              <Avatar size={80} src={profile?.avatar} icon={!profile?.avatar && <UserOutlined />} />
              <div>
                <p className={cls.text}>{profile.username}</p>
                <p className={cls.email}>{profile.email}</p>
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
