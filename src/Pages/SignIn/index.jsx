import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Alert, Form, Button, Input, Tooltip } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import NavigationBar from "../../components/NavigationBar"
import AuthenticationModal from '../../components/AuthenticationModal'

import { authenticate } from '../../redux/actions/auth.actions'

const Container = styled.div`
  background: rgb(0,3,22);
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const SignIn = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [credentialError, setCredentialError] = useState({ error: false, message: null})

  const login = (email, password) => dispatch(authenticate(email, password))

  const signIn = async (e) => {
    const { payload } = await login(email, password)

    if (payload.username) history.push(`/0000-0001-6925-3805/publications`)
    else setCredentialError({ error: true, message: payload.message })
  }

  return (
    <Container>
      <NavigationBar />
      <Content>
        <AuthenticationModal>
          <h1 style={{color: 'white', fontFamily: 'Montserrat', paddingBottom: '3%'}}>Welcome Back</h1>
          { credentialError.error && <Alert
            style={{textAlign: 'left', marginBottom: '3%'}}
            message='Could not sign in'
            showIcon
            description={credentialError.message}
            type="error"
          /> }
          <Form form={form} name='signup' onFinish={signIn} style={{width: '60%'}}>
            <Form.Item name='email' rules={[{ required: true, type: 'email', message: (<Tooltip visible={true} placement='rightBottom' title='The input is not a valid e-mail address!'/>) }]}>
              <Input placeholder="Input email address" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: (<Tooltip visible={true} placement='rightBottom' title='Please input a valid password!'/>) }]}>
              <Input.Password style={{margin: 0}} placeholder="Input password" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={!form.isFieldsTouched(false) || email === '' || password === '' || form.getFieldsError().filter(({ errors }) => errors.length).length}>
                <p style={{margin: 'auto'}}>Sign In</p>
              </Button>
            </Form.Item>
          </Form>
        </AuthenticationModal>
      </Content>
    </Container>
  )
}

export default SignIn
