import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { authStore } from '../store/authStore';
import { useState } from 'react';
import { useNavigate } from 'react-router';

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
    <Flex align="center" justify="center">
      <Form
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
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Пожалуйста, введите ваше имя пользователя!' }]}>
          <Input onChange={(e) => setForm({ ...form, username: e.target.value })} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Пожалуйста, введите свой адрес электронной почты!' },
          ]}>
          <Input type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите свой пароль!' }]}>
          <Input.Password onChange={(e) => setForm({ ...form, password: e.target.value })} />
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
