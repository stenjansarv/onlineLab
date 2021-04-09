import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import styled from 'styled-components'
import NavigationBar from '../../components/NavigationBar'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

import AuthenticationModal from '../../components/AuthenticationModal'

import { Alert, Form, Button, Input, Tooltip } from 'antd'

import { validatePasswordUI } from '../../lib/password-validation'

import { requestRegistrationCode, confirmRegistrationCode } from '../../redux/actions/auth.actions'

const Container = styled.div`
  background: rgb(0,3,22);
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  display: flex;
  justify-content: center;
`

const SignUp = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const history = useHistory()

  // Actions
  const requestSignUpCode = (email, password) => dispatch(requestRegistrationCode(email, password))
  const confirmSignUpCode = (email, code, publisherId) => dispatch(confirmRegistrationCode(email, code, publisherId))

  const [email, setEmail] = useState('')
  const [orcidID, setOrcidID] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [waitingForCode, setWaitingForCode] = useState('')
  const [code, setCode] = useState('')
  const [passwordError, setPasswordError] = useState({ error: false, message: null})
  const [codeError, setCodeError] = useState({ error: false, message: null})

  const signUp = async (e) => {
    const { payload } = await requestSignUpCode(email, password, orcidID)

    if (payload.name) {
      setPasswordError({ error: true, message: payload['message'].split(":")[payload['message'].split(":").length - 1].trim()})
      return
    }
    
    setWaitingForCode(true)
    setPassword('')
  }

  const confirmSignUp = async (e) => {
    const { payload } = await confirmSignUpCode(email, code, orcidID)

    // TODO: Need to recheck this, since we're returning a different payload now.
    if (payload.name) {
      setCodeError({ error: true, message: payload.message})
      return
    }

    history.push('/publications')
  }

  const resendCode = () => {
    Auth.resendSignUp(email)
      .then(() => {
        console.log('code resent successfully')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const validatePassword = async (rule, value) => {
    validatePasswordUI(value)
  }

  const validateConfirmPassword = async (rule, value) => {
    if (!value || confirmPassword === value) return Promise.resolve()

    return Promise.reject(new Error('The two passwords you entered do not match!'))
  }

  return (
    <Container>
      <NavigationBar />
      <Content>
          {!waitingForCode ? (
            <AuthenticationModal>
              <h1 style={{color: 'white', fontFamily: 'Montserrat', paddingBottom: '3%'}}>Create Account</h1>
              <Form form={form} name='signup' onFinish={signUp} style={{width: '60%'}}>
                { passwordError.error && <Alert
                  style={{textAlign: 'left', marginBottom: '3%'}}
                  message='Could not sign up'
                  showIcon
                  description={passwordError.message}
                  type="error"
                /> }
                {passwordError.error && <p style={{color: 'red'}}>{passwordError.message}</p>}
                <Form.Item name='email' hasFeedback rules={[{ required: true, type: 'email', message: (<Tooltip visible={true} placement='rightBottom' title='The input is not a valid e-mail address!' />) }]}>
                  <Input placeholder="Input email address" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item name='orcidid' hasFeedback rules={[{ required: true, message: (<Tooltip visible={true} placement='rightBottom' title='This is not an ORCID ID!' />) }]}>
                  <Input placeholder="Input your ORCID ID" value={orcidID} onChange={e => setOrcidID(e.target.value)} />
                </Form.Item>
                <Form.Item name='password' hasFeedback rules={[{ required: true, message: (<Tooltip visible={true} placement='rightBottom' title='Please input a valid password!' />) }, { validator: validatePassword }]}>
                  <Input.Password style={{margin: 0}} placeholder="Input password" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Item>
                <Form.Item name='confirmpassword' hasFeedback rules={[{ required: true, message: (<Tooltip visible={true} placement='rightBottom' title='Please confirm your password!' />) }, { validator: validateConfirmPassword }]}>
                  <Input.Password style={{margin: 0}} placeholder="Confirm password" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" disabled={!form.isFieldsTouched(false) || orcidID === '' || email === '' || password === '' || confirmPassword === '' || form.getFieldsError().filter(({ errors }) => errors.length).length}>
                    <p style={{margin: 'auto'}}>Sign Up</p>
                  </Button>
                </Form.Item>
              </Form>
            </AuthenticationModal>
          ) : (
            <AuthenticationModal>
            <Form form={form} name='signup-confirmation' onFinish={confirmSignUp} style={{width: '25%'}}>
              {codeError.error && <Alert
                  style={{textAlign: 'left', marginBottom: '3%'}}
                  message='Wrong verification code'
                  showIcon
                  description={codeError.message}
                  type="error"
                />}
              <Form.Item name='code'>
                <Input placeholder="Enter confirmation code" value={code} onChange={e => setCode(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={code === ''}>
                  Confirm Sign Up
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={resendCode}>
                  Resend Code
                </Button>
              </Form.Item>
            </Form>
            </AuthenticationModal>
          )}
      </Content>
    </Container>
  )
}

export default SignUp
