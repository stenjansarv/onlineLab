import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

import Logo from '../Logo'

import { signOut } from '../../redux/actions/auth.actions'
import { logUserOut } from '../../redux/actions/user.actions'

const NavItemList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  width: ${props => props.theme.selectedId !== null ? '40%' : '20%'}
`

const NavItem = styled.li`
  color: white;
`

const NavigationBar = () => {
  const { orcidId } = useParams()
  const dispatch = useDispatch()

  const isAuthenticated = useSelector(state => state.auth.authenticated)
  const selectedId = useSelector(state => state.auth.selectedId)
  const userId = useSelector(state => state.user.details.orcidID)

  const signUserOut = () => dispatch(signOut())
  const removeUserData = () => dispatch(logUserOut())

  NavItemList.defaultProps = { theme: { selectedId: selectedId } }

  return (
    <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', paddingLeft: '5%', paddingRight: '5%'}}>
      <Logo />
      <NavItemList>
        {selectedId !== null && (
        <Link to={`/${orcidId || userId}/home`}>
          <NavItem>Researcher's Home</NavItem>
        </Link>)}
        {selectedId !== null && (
        <Link to={`/${orcidId || userId}/about`}>
          <NavItem>About</NavItem>
        </Link>)}
        {/* {selectedId !== null && (
        <Link to={`/${orcidId || userId}/contact`}>
          <NavItem>Contact</NavItem>
        </Link>)} */}
        {selectedId !== null && (
        <Link to={`/${orcidId || userId}/publications`}>
          <NavItem>Publications</NavItem>
        </Link>)}
        {!isAuthenticated && (
        <Link to='/signin'>
          <NavItem style={{border: '1px solid rgba(252, 122, 87, 1)', borderRadius: '10px', padding: '10px 20px'}}>Sign In</NavItem>
        </Link>)}
        {!isAuthenticated && (
        <Link to='/signup'>
          <NavItem style={{border: '1px solid rgba(252, 122, 87, 1)', borderRadius: '10px', padding: '10px 20px', backgroundColor: 'rgba(252, 122, 87, 1)', color: 'rgba(36, 56, 104, 1)'}}>Sign Up</NavItem>
        </Link>)}

        {/* Have to be authenticated */}
        {isAuthenticated &&
          <Link to={`/${userId}/profile`}>
            <NavItem>Profile</NavItem>
          </Link>
        }
        {isAuthenticated &&
          <Link to='/' replace>
            <NavItem style={{border: '1px solid rgba(252, 122, 87, 1)', borderRadius: '10px', padding: '10px 20px'}} onClick={() => { signUserOut(); removeUserData(); }}>Sign Out</NavItem>
          </Link>
        }
      </NavItemList>
    </nav>
  )
}

export default NavigationBar