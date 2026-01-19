import cls from './login.module.scss';

import { Button, Flex, Form, Input } from 'antd';
import { authStore } from '../../store/authStore';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export default function Login() {
  const { login, isLoading, error } = authStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const submit = async () => {
    await login(form);
    navigate('/');
  };

  return (
    <Flex className={cls.main} justify="center" align="center">
      <Form
        className={cls.form}
        layout="vertical"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, minWidth: 200 }}
        initialValues={{ remember: true }}
        onFinish={submit}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          label={<span style={{ color: '#8F8F8F' }}>Email</span>}
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
          label={<span style={{ color: '#8F8F8F' }}>Password</span>}
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите свой пароль!' }]}>
          <Input.Password
            placeholder="введите свой пароль"
            className={cls.formInput}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button className={cls.btn} disabled={isLoading} type="primary" htmlType="submit">
            Вход
          </Button>
        </Form.Item>
        {error && <p>{error}</p>}
      </Form>
    </Flex>
  );
}
