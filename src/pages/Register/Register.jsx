import { Button, Flex, Form, Input } from 'antd';
import { authStore } from '../../store/authStore';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import cls from './register.module.scss';

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
export default function Register() {
  const { registr, isLoading, error } = authStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const submit = async () => {
    await registr(form);
    navigate('/login');
  };

  return (
    <Flex className={cls.main} align="center" justify="center">
      <Form
        className={cls.form}
        layout="vertical"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, minWidth: '300px' }}
        initialValues={{ remember: true }}
        onFinish={submit}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          label={<span style={{ color: 'white' }}>Username</span>}
          name="username"
          rules={[{ required: true, message: 'Пожалуйста, введите ваше имя пользователя!' }]}>
          <Input
            className={cls.formInput}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: 'white' }}>Email</span>}
          name="email"
          rules={[
            { required: true, message: 'Пожалуйста, введите свой адрес электронной почты!' },
          ]}>
          <Input
            className={cls.formInput}
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: 'white' }}>Password</span>}
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите свой пароль!' }]}>
          <Input.Password
            className={cls.formInput}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button disabled={isLoading} type="primary" htmlType="submit">
            Регистрация
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
