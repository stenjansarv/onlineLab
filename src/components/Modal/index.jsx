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
const ModalTitle = styled.h2`
  margin: 0;
  font-weight: bold;
`
const ModalBody = styled.div`
  padding: 10px;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
`

const SaveButton = styled.button`
  width: 20%;
  min-height: 40px;
  background-color: rgb(252, 122, 87);
  border: none;
  border-radius: 10px;
  color: white;

  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 3px 15px 0px rgba(252, 122, 87, 0.7);
  }
`

const CloseButton = styled.button`
  width: 20%;
  min-height: 40px;
  background-color: white;
  border: 1px solid rgb(252, 122, 87);
  border-radius: 10px;
  color: rgb(252, 122, 87);

  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
    background-color: rgb(252, 122, 87);
    color: white;
  }
`

const DeleteButton = styled.button`
  width: 20%;
  min-height: 40px;
  background-color: white;
  border: 1px solid red;
  border-radius: 10px;
  color: red;

  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
    background-color: red;
    color: white;
    box-shadow: 0px 3px 15px 0px rgba(255, 0, 0, 0.3);
  }
`

const Modal = ({ show, title, onSave, onClose, onDelete, showDelete = true, showSave = true, children}) => {
  if (!show) return null

  return (
    <Container>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          {showSave && <SaveButton onClick={onSave}>Save Changes</SaveButton> }
          <CloseButton onClick={onClose}>Close</CloseButton>
          {showDelete && <DeleteButton onClick={onDelete}>Delete this document</DeleteButton>}
        </ModalFooter>
      </ModalContent>
    </Container>

  )
}

export default Modal