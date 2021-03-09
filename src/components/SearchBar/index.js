import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import { SearchOutlined } from '@ant-design/icons'
import { Input, Button, Select, Form } from 'antd'


const Container = styled.div`
  display: flex;

  width: 50%;
  height: 7vh;
  min-height: 30px;

  font-family: 'Montserrat';

  border-radius: 5px;
  background-color: ${props => props.color};
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px;
`

const SearchBar = ({color = '#ffffff', onSearch, query, setQuery}) => {
  return (
    <Container color={color}>
      <IconContainer>
        <SearchOutlined style={{fontSize: '25px', color: 'black'}}/>
      </IconContainer>
      {/* <Select style={{height: '1%', width: '35%'}} dropdownStyle={{display: 'none'}} autoFocus mode='tags' placeholder='Search for publications...' onChange={updateQueryTerms}/>    */}
      
      <Select defaultValue={query} onChange={(values) => setQuery(values)} allowClear size='large' dropdownStyle={{display: 'none'}} bordered={false} autoFocus mode='tags' placeholder='Search for publications...' style={{boxShadow: 'none', width: '100%', alignSelf: 'center'}}/>
      <Button onClick={onSearch} style={{justifySelf: 'flex-end', alignSelf: 'center', height: '90%', marginRight: '5px', backgroundColor: 'rgb(252, 122, 87)', border: 'none', borderRadius: '5px', color: 'rgba(36,56,104,1)'}}>Find it now</Button>
    </Container>
  )
}

export default SearchBar
