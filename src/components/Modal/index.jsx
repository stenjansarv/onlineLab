import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalContent = styled.div`
  min-width: 500px;
  background-color: #fff;
`


const ModalHeader = styled.div`
  padding: 10px;
`
const ModalTitle = styled.h4`
  margin: 0;
`
const ModalBody = styled.div`
  padding: 10px;
`

const ModalFooter = styled.div`
  padding: 10px;
`

const Button = styled.button`

`

const Modal = props => {
  if (!props.show) return null

  return (
    <Container>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{props.title}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {props.children}
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Container>

  )
}

export default Modal