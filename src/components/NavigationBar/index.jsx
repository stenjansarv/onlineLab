import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as Close } from '../../assets/svg/x.svg'
import { ReactComponent as Menu } from '../../assets/svg/menu.svg'
import { ReactComponent as LogoSvg } from '../../assets/svg/logo.svg'

import { device } from '../../lib/constants/devices'

import HomeLogo from '../Logo'

import { signOut } from '../../redux/actions/auth.actions'
import { logUserOut } from '../../redux/actions/user.actions'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding-left: 30px;
  padding-top: 30px;
  padding-right: 30px;

  margin-bottom: 30px;

  transition: ${props => (props.click && 'all 0.2s ease')};

  @media only screen and ${device.tablet} {
    padding: 0px 10px;
    background: ${props => props.click && '#f4f7fc'};
  }
`

const LogoNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const MobileMenu = styled.div`
  display: none;

  @media only screen and ${device.tablet} {
    display: block;    
  }
`

const AuthenticationButtons = styled.ul`
  display: flex;
  padding: 0px 5px;
  margin-top: auto;
  margin-bottom: auto;
  list-style-type: none;

  @media only screen and ${device.tablet} {
    display: none;    
  }
`

const AuthRegularButton = styled(Link)`
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  color: white;
`

const AuthSignUpButton = styled(Link)`
  padding: 10px 20px;
  border-radius: 10px;
  background: rgba(252, 122, 87, 1);
  cursor: pointer;
  color: white;
`

const AuthSignInButton = styled(Link)`
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid rgba(252, 122, 87, 1);
  cursor: pointer;
  color: white;
`

const AuthProfileButton = styled(Link)`
  padding: 10px 20px;
  cursor: pointer;
  color: white;

  @media only screen and ${device.tablet} {
    display: none;
  }
`

const Option = styled.li`
  display: none;

  @media only screen and ${device.tablet} {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vw;
    padding: 30px 0px;
  }
`

const MenuIcon = styled(Menu)`
  width: 45px;
  height: 45px;
  color: rgba(252, 122, 87, 1);
`

const CloseIcon = styled(Close)`
  width: 45px;
  height: 45px;
  color: rgba(252, 122, 87, 1);
`

const BorderedButton = styled(Link)`
  border: 1px solid rgba(252, 122, 87, 1);
  border-radius: 15px;
  color: #17193b;
  padding: 15px 0px;
  width: 40%;
  align-self: center;
`

const ColoredButton = styled(Link)`
  background-color: rgba(252, 122, 87, 1);
  border-radius: 15px;
  color: #17193b;
  padding: 15px 0px;
  width: 40%;
  align-self: center;
`

const MobileNavContainer = styled.div`
  display: flex;
  width: 100%;
  position: absolute;
  top: 80px;
  left: -100%;
  opacity: 0;
  z-index: 1;
  transition: all 0.2s ease;
  flex-direction: column;
  list-style-type: none;
  grid-gap: 0px;
  border-bottom: 2px solid #17193b;
  padding-bottom: 10px;

  background: ${props => props.click && 'radial-gradient(ellipse at top, #f4f7fc 70%, #cfdcf2)'};
  left: ${props => props.click && 0};
  opacity: ${props => props.click && 1};
  align-content: ${props => props.click && 'center'};
  padding-left: ${props => props.click && '0px'};
`

const NavigationBar = ({ home }) => {
  const { orcidId } = useParams()
  const dispatch = useDispatch()

  const isAuthenticated = useSelector(state => state.auth.authenticated)
  const selectedId = useSelector(state => state.auth.selectedId)
  const userId = useSelector(state => state.user.details.orcidID)

  const signUserOut = () => dispatch(signOut())
  const removeUserData = () => dispatch(logUserOut())

  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  return (
    <Header click={click}>
      <LogoNav>
        <LogoContainer>
          <Link to={`/`} >
            <HomeLogo activeId={orcidId || userId} home={home} />
          </Link>
        </LogoContainer>

        <MobileNavContainer click={click}>
          {(selectedId !== null || isAuthenticated) && <Option onClick={closeMobileMenu}>
            <Link style={{color: '#17193b'}} to={`/${orcidId || userId}/home`}>Researcher's Home</Link>
          </Option>}
          {(selectedId !== null || isAuthenticated) && <Option onClick={closeMobileMenu}>
            <Link style={{color: '#17193b'}} to={`/${orcidId || userId}/about`}>About</Link>
          </Option>}
          {(selectedId !== null || isAuthenticated) && <Option onClick={closeMobileMenu}>
            <Link style={{color: '#17193b'}} to={`/${orcidId || userId}/publications`}>Publications</Link>
          </Option>}
          {isAuthenticated !== null && <Option onClick={closeMobileMenu}>
            <AuthProfileButton style={{color: '#17193b'}} to={`/${orcidId || userId}/profile`}>Profile</AuthProfileButton>
          </Option>}
          {isAuthenticated && <Option onClick={closeMobileMenu}>
            <BorderedButton to={`/`}>Sign Out</BorderedButton>
          </Option>}
          {!isAuthenticated && <Option onClick={closeMobileMenu}>
            <BorderedButton to={`/signin`}>Sign In</BorderedButton>
          </Option>}
          {!isAuthenticated && <Option onClick={closeMobileMenu}>
            <ColoredButton to={`/signup`}>Sign Up</ColoredButton>
          </Option>}
        </MobileNavContainer>
      </LogoNav>
      <AuthenticationButtons>
        {(selectedId !== null || isAuthenticated) &&  <li style={{marginRight: '20px'}} onClick={closeMobileMenu}>
          <AuthRegularButton to={`/${orcidId || userId}/home`}>Researcher's Home</AuthRegularButton>
        </li>}
        {(selectedId !== null || isAuthenticated) &&  <li style={{marginRight: '20px'}} onClick={closeMobileMenu}>
          <AuthRegularButton to={`/${orcidId || userId}/about`}>About</AuthRegularButton>
        </li>}
        {(selectedId !== null || isAuthenticated) &&  <li style={{marginRight: '20px'}} onClick={closeMobileMenu}>
          <AuthRegularButton to={`/${orcidId || userId}/publications`}>Publications</AuthRegularButton>
        </li>}
        {isAuthenticated && <li style={{marginRight: '20px'}} onClick={closeMobileMenu}>
          <AuthProfileButton to={`/${userId}/profile`}>Profile</AuthProfileButton>
        </li>}
        {isAuthenticated && <li style={{marginRight: '20px'}} onClick={closeMobileMenu}>
          <AuthSignInButton to={'/'} replace onClick={() => { signUserOut(); removeUserData(); }}>Sign Out</AuthSignInButton>
        </li>}
        {!isAuthenticated && <li style={{marginRight: '20px'}} onClick={closeMobileMenu}>
          <AuthSignInButton to={`/signin`}>Sign In</AuthSignInButton>
        </li>}
        {!isAuthenticated && <li onClick={closeMobileMenu}>
          <AuthSignUpButton to={`/signup`}>Sign Up</AuthSignUpButton>
        </li>}
      </AuthenticationButtons>
      <MobileMenu onClick={handleClick}>
        {click ? (
          <CloseIcon className="menu-icon" />
        ) : (
          <MenuIcon className="menu-icon" />
        )}
      </MobileMenu>
    </Header>
  )
}

export default NavigationBar