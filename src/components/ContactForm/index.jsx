import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import emailjs from 'emailjs-com'

import { Input, Form, Textarea } from 'antd'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #C4C3E9; //lightmode - EAF2EF

  width: 100%;
  height: 100%;
`

const Header = styled.h1`
  color: white;
`

const ProfileFormInput = styled.input`
  box-shadow: none;
  border: 1px solid #EBEBEB;
  border-radius: 5px;
  background-color: #fbfbfb;
  text-align: center;
  // color: transparent;
  // text-shadow: 0 0 0 #2196f3;

  &:hover {
    border: 1px solid #f7f7f7;
    box-shadow: 0px 3px 10px 0px #d6d6d6;
  }
  
  &:focus {
    border: 1px solid #f7f7f7;
    box-shadow: 0px 5px 20px 0px #d6d6d6;
    background-color: white;
  }
`

const SaveButton = styled.button`
  width: 20%;
  min-height: 40px;
  background-color: rgb(252, 122, 87);
  border: none;
  border-radius: 10px;
  color: white;
  align-self: center;

  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 3px 15px 0px rgba(252, 122, 87, 0.7);
  }
`

const ContactForm = () => {
  const researcherEmail = useSelector(state => state.visitor.details.email)

  const sendEmail = async (e) => {
    e.preventDefault()

    const researcherEmailInput = document.createElement('input')
    researcherEmailInput.type = 'hidden'
    researcherEmailInput.value = researcherEmail
    researcherEmailInput.name = 'to_email'
    document.getElementById('contact-me-form').appendChild(researcherEmailInput)

    await emailjs.sendForm('online-lab-smtp-server', 'template_rbs6rqp', document.getElementById('contact-me-form'), 'user_mm39ohiViogT0kdb0Qhsl')
  }
  
  return (
    <Container>
      <Header>Contact the Researcher</Header>
      <form style={{display: 'flex', flexDirection: 'column', width: '70%'}} className="contact-form" id='contact-me-form' onSubmit={sendEmail}>
        <label>To Name</label>
        <ProfileFormInput type="text" name="to_name" />
        <label>From Name</label>
        <ProfileFormInput type="text" name="from_name" />
        <label>Message</label>
        <ProfileFormInput type="text" name="message" />
        <SaveButton type="submit" value="Send">Send</SaveButton>
      </form>
    </Container>
  )
}

export default ContactForm
