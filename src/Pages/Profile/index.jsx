import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get, omitBy, isNull } from 'lodash'
import Lottie from 'lottie-react-web'
import styled from 'styled-components'
import moment from 'moment'

import * as FaIcons from 'react-icons/fa'

import successAnimation from '../../assets/lottie/success-animation.json'
import loadingAnimation from '../../assets/lottie/loading-animation.json'
import errorAnimation from '../../assets/lottie/error-animation.json'
import lookingForDataAnimation from './LookingForData.json'

import { COLORS } from '../../lib/constants/colors'

import demoProfile from '../../assets/DemoProfile.jpeg'

import VerticalNavBar from '../../components/Admin/VerticalNavBar'
import LocalStorageLayout from '../../components/GridLayout'
import HomeGrid from './HomeGrid'

import { fetchPublications } from '../../redux/actions/publications.actions'
import { fetchEmployments } from '../../redux/actions/employments.actions'
import { fetchEducations } from '../../redux/actions/educations.actions'
import { updateUser } from '../../redux/actions/user.actions'

import Modal from '../../components/Modal'
import { Input, Popover } from 'antd'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;

  font-family: 'Montserrat';
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;

  background-color: rgb(29,37,58);
`

const Right = styled.div`
// background: radial-gradient(farthest-side ellipse at 10% 0, #333867 20%, #17193b); // dark mode
  background: radial-gradient(farthest-side ellipse at 10% 0, #f4f7fc 20%, #cfdcf2); // light mode
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;

  font-family: 'Montserrat';
`

const ContentContainer = styled.main`
  display: flex;
  flex-direction: column;
  padding: 2% 4%;
`

const TitleHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2%;
`

const PageTitle = styled.h1`
  font-size: 2rem;
  color: ${COLORS.LIGHT_SECONDARY_200};

  justify-self: flex-start;
`

const TitleOptions = styled.div`
  font-size: 2rem;
  color: ${COLORS.LIGHT_SECONDARY_200};

  margin-left: auto;
  justify-self: flex-end;
`

const Content = styled.div`
  display: flex;

  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
   -ms-animation: fadein 2s; /* Internet Explorer */
    -o-animation: fadein 2s; /* Opera < 12.1 */
       animation: fadein 2s;
}

  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Firefox < 16 */
  @-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Internet Explorer */
  @-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Opera < 12.1 */
  @-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`

const BlockOne = styled.div`
  flex: 1;
  height: 100%;
`

const BlockTwo = styled.div`
  flex: 3;
  height: 100%;
  margin-left: 2%;
  margin-right: 2%;
`

const BlockThree = styled.div`
  flex: 1;
  height: 100%;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 30px;
  margin-bottom: 30px;

  border-radius: 10px;
  border: 1px solid white;
  box-shadow: 0px 5px 40px 15px rgba(207, 220, 242, 0.5);

  background-color: white;
`

const ProfileImage = styled.div`
  // display: inline-block;
  width: ${props => props.size || '125px'};
  height: ${props => props.size || '125px'};
  border-radius: 50%;
  box-shadow: 0px 5px 10px 0.5px #f4f7fc;

  justify-self: flex-end;
  margin-bottom: 20px;

  background-image: url(${demoProfile});

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`

const TitleText = styled.h1`
  font-size: 1.25rem;
  margin: 0;
  padding: 0;
  color: ${COLORS.LIGHT_SECONDARY_200};
`

const CheckListItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
`

const AddGroupMember = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: white;
  align-self: center;
  color: ${COLORS.LIGHT_SECONDARY_200};
  box-shadow: 0px 5px 10px 0.5px #f4f7fc;

  cursor: pointer;
`

const NavBarItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  margin-right: 20px;

  & p {
    color: lightgray;
    margin: auto auto auto 0;
  }

  &:hover {
    border-radius: 0 5px 5px 0;
    background-color: rgb(39,50,79);

    cursor: pointer;

    transition: all 0.5s ease;
  }

  &:hover p {
    color: white;
    align-self: center;
    justify-self: center;
  }

  & span {
    width: 5px;
    height: 100%;
    align-self: flex-start;
    justify-self: flex-start;
    margin-left: 0;
    padding-left: 0;
    margin-right: auto;
  }

  &:hover span {
    background-color: ${COLORS.LIGHT_SECONDARY_200}
  }
`

const ProfileFormInput = styled(Input)`
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

  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 3px 15px 0px rgba(252, 122, 87, 0.7);
  }
`

// Page 2

const ListItem = styled.div`
  display: flex;
  width: 100%;
  border: 0.5px solid lightgray;
  align-items: center;
  padding: 0 20px;
  overflow: hidden;
  
  
  height: 60px;
`

const ItemProperty = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  flex: ${props => props.flex || 1};
  height: 100%;
  align-items: center;
  color: ${props => props.color || 'gray'};
  text-align: left;
  margin-right: 10px;
`

const Profile = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user.details)
  const userLoading = useSelector(state => get(state.waiting.list, 'AUTHENTICATING'))

  const publications = useSelector(state => state.publications.list)
  const isLoadingPublications = useSelector(state => get(state.waiting.list, 'PUBLICATIONS', true))

  const employments = useSelector(state => state.employments.list)
  const isLoadingEmployments = useSelector(state => get(state.waiting.list, 'EMPLOYMENTS', true))

  const educations = useSelector(state => state.educations.list)
  const isLoadingEducations = useSelector(state => get(state.waiting.list, 'EDUCATIONS', true))

  const group = useSelector(state => state.user.details.group)

  // Actions
  const loadPublications = (publisherId) => dispatch(fetchPublications(publisherId))
  const loadEmployments = (publisherId) => dispatch(fetchEmployments(publisherId))
  const loadEducations = (publisherId) => dispatch(fetchEducations(publisherId))
  const saveUserChanges = (publisherId, body) => dispatch(updateUser(publisherId, body))

  const [profilePage, setProfilePage] = useState(1) // 1 = Dashboard | 2 = Publications | 3 = Employments & Educations | 4 = Manage Home Page

  const [currentPublicationsPage, setCurrentPublicationsPage] = useState(1)
  const [publicationsPerPage, setPublicationsPerPage] = useState(10)
  const [openPublication, setOpenPublication] = useState(null)

  const [currentCareersPage, setCurrentCareersPage] = useState(1)
  const [careersPerPage, setCareersPerPage] = useState(10)
  const [openCareer, setOpenCareer] = useState(null)

  const [groupMembers, setGroupMembers] = useState(user.group.groupMembers)

  // User Info
  const [fullName, setFullName] = useState(null)
  const [twitterHandle, setTwitterHandle] = useState(null)
  const [location, setLocation] = useState(null)
  const [addMember, setAddMember] = useState(null)

  const checklist = [{
    loading: () => userLoading,
    checked: () => !!user.fullName,
    text: 'Add your full name',
    url: `/${user.orcidId}/profile/settings`
  }, {
    loading: () => userLoading,
    checked: () => user.importing,
    text: 'Import your data from ORCID',
    url: ``
  }]

  const lottie = (loading, success) => {
    let animationData = loadingAnimation
    if (!loading) {
      animationData = success ? successAnimation : errorAnimation
    }

    return <Lottie
      width='30px'
      height='30px'
      style={{ flexShrink: 0, margin: '0 9px 0 0', lineHeight: 0.9 }}
      options={{
        animationData,
        loop: loading
      }}
    />
  }

  useEffect(() => {
    loadPublications(user.orcidID)
    loadEmployments(user.orcidID)
    loadEducations(user.orcidID)

    checklist.forEach((item) => {
      if (!item.fetch) {
        return
      }

      dispatch(item.fetch())
    })
  }, [])
  
  // Logic for publications pagination
  const indexOfLastPublication = currentPublicationsPage * publicationsPerPage
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage
  const currentPublications = [...publications].slice(indexOfFirstPublication, indexOfLastPublication)

  const pageNumberArr = []
  for (let i = 1; i<= Math.ceil(publications.length / publicationsPerPage); i++) {
    pageNumberArr.push(i)
  }

    // Logic for career pagination
    const indexOfLastCareer = currentCareersPage * careersPerPage
    const indexOfFirstCareer = indexOfLastCareer - careersPerPage
    const currentCareers = [...educations, ...employments].slice(indexOfFirstCareer, indexOfLastCareer)
  
    const careerPageNumberArr = []
    for (let i = 1; i<= Math.ceil(educations.concat(employments).length / careersPerPage); i++) {
      careerPageNumberArr.push(i)
    }

    console.log(educations)

  return (
    <Container style={{flexDirection: 'row'}}>
      <Left>
        <h1 style={{color: 'red', margin: '20px 0'}}>LOGO</h1>
        <NavBarItem onClick={() => setProfilePage(1)}><span></span><p>Dashboard</p></NavBarItem>
        <NavBarItem onClick={() => setProfilePage(2)}><span></span><p>Publications</p></NavBarItem>
        <NavBarItem onClick={() => setProfilePage(3)}><span></span><p>Employments & Educations</p></NavBarItem>
        <NavBarItem onClick={() => setProfilePage(4)}><span></span><p>Manage Homepage</p></NavBarItem>

      </Left>
      <Right style={{width: '100%'}}>
        <VerticalNavBar />
        <ContentContainer>
        <TitleHeader>
          <PageTitle>User Profile</PageTitle>
          <TitleOptions>...</TitleOptions>
        </TitleHeader>
          {profilePage === 1 && (
    <Content>
      <BlockOne>
        <Card>
          <ProfileImage size='125px' />
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '10px'}}>
            <TitleText>{user.fullName || 'John Smith'}</TitleText>
            { user.location && <p style={{color: 'gray'}}>{user.location}</p>}
          </div>
          <p style={{color: 'gray'}}>Researcher</p>
        </Card>
      </BlockOne>
      <BlockTwo>
        <Card>
          <TitleText>User Info</TitleText>

          <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{display: 'flex', flexDirection: 'column', marginBottom: '40px', textAlign: 'left'}}>
                <p style={{margin: 0}}>Full Name</p>
                <ProfileFormInput onChange={(e) => setFullName(e.target.value)} placeholder={user.fullName || 'John Smith'}/>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginBottom: '40px', textAlign: 'left'}}>
                <p style={{margin: 0}}>Location</p>
                <ProfileFormInput onChange={(e) => setLocation(e.target.value)} placeholder={user.location || 'e.g. New York, USA'}/>
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{display: 'flex', flexDirection: 'column', margin: 0, padding: 0, textAlign: 'left'}}>
                <p style={{margin: 0}}>Twitter Handle</p>
                <ProfileFormInput onChange={(e) => setTwitterHandle(e.target.value)} placeholder={user.twitterHandle || 'Twitter handle'}/>
              </div>
            </div>
          </div>

          <SaveButton onClick={() => saveUserChanges(user.orcidID, omitBy({ twitterHandle, fullName, location}, isNull))}>Save Changes</SaveButton>
        </Card>
      {group.enabled ? (
      <LocalStorageLayout columns={10} isResizable={false}>
        <Card key="1" data-grid={{i: '1', w: 10, h: 2, x: 0, y: 0, static: true}} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 0 }}>
          Manage your research group
        </Card>
        <div key='2' data-grid={{i: '2', w: 10, h: 1, x: 0, y: 2, static: true }} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 0}}>
          <Popover
            content={<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><ProfileFormInput onChange={(e) => setAddMember(e.target.value)} /><AddGroupMember style={{width: '100px', marginTop: '10px', borderRadius: '5px', backgroundColor: COLORS.SECONDARY_300, color: 'white'}} onClick={() => {saveUserChanges(user.orcidID, { group: { enabled: true, groupMembers: groupMembers.concat([addMember])}}); setGroupMembers(groupMembers.concat([addMember]))}}>Enter</AddGroupMember></div>}
            title='Add the ORCID ID you want to invite to your team'
            trigger="click"
            // visible={this.state.clicked}
            // onVisibleChange={this.handleClickChange}
          >
            <AddGroupMember>+</AddGroupMember>
          </Popover>
        </div>
        {groupMembers.filter(member => member !== user.orcidID).map(groupMember => {
          return (
            <Card style={{padding: 0, flexDirection: 'row'}} key={groupMember} data-grid={{i: groupMember, w: 10, h: 2, x: 0, y: 3 }}>
              <ProfileImage style={{margin: 0, marginLeft: '10px', alignSelf: 'center', justifySelf: 'center'}} size='50px'/>
              <p style={{margin: 0, marginLeft: '10px', alignSelf: 'center', justifySelf: 'center'}}>{groupMember}</p>
              <AddGroupMember style={{margin: 0, marginLeft: 'auto', marginRight: '10px', alignSelf: 'center'}} onClick={() => {saveUserChanges(user.orcidID, { group: { enabled: true, groupMembers: groupMembers.filter(member => member !== groupMember)}}); setGroupMembers(groupMembers.filter(member => member !== groupMember))}}>-</AddGroupMember>
            </Card>
          )
        })}
        {/* <Card style={{padding: 0, flexDirection: 'row'}} key="3" data-grid={{i: '3', w: 10, h: 2, x: 0, y: 3 }}>
          <ProfileImage style={{margin: 0, marginLeft: '10px', alignSelf: 'center', justifySelf: 'center'}} size='50px'/>
        </Card>
        <Card key="4" data-grid={{i: '4', w: 10, h: 2, x: 0, y: 5 }}>
          Teehee
        </Card>
        <Card key="5" data-grid={{i: '5', w: 10, h: 2, x: 0, y: 7 }}>
          Kek
        </Card> */}
      </LocalStorageLayout>) : (
        <p>Please enable group</p>
      )}
      </BlockTwo>
      <BlockThree>
        <Card>
          <TitleText>Onboarding Checklist</TitleText>
          {checklist.map((item, index) => (
            <CheckListItem>
              {lottie(item.loading(), item.checked())}
              {item.text}
            </CheckListItem>
          ))}
        </Card>
      </BlockThree>
    </Content>)}
    { profilePage === 2 && (<>
    <Content style={{backgroundColor: 'white', flexDirection: 'column'}}>
      <ListItem index='definition'>
        <ItemProperty flex={2} color='lightgray'>ID</ItemProperty>
        <ItemProperty flex={7} color='lightgray'>Title</ItemProperty>
        <ItemProperty flex={5} color='lightgray'>Journal</ItemProperty>
        <ItemProperty flex={4} color='lightgray'>Status</ItemProperty>
        <ItemProperty flex={4} color='lightgray'>Last Edit</ItemProperty>
        <ItemProperty flex={1} color='lightgray'></ItemProperty>

        <Modal show={openPublication !== null} onClose={() => setOpenPublication(null)} itemId={openPublication}>Body stuff, huehue - {openPublication}</Modal>
      </ListItem>
      { !isLoadingPublications && publications ? (<>
        {currentPublications.map((publication, index) => {
          return (<ListItem index={index} open={openPublication}>
          <ItemProperty key={`${publication.publication_id}-publicationId`} flex={2}>{publication.publication_id}</ItemProperty>
          <ItemProperty key={`${publication.publication_id}-title`} flex={7}>{publication.title}</ItemProperty>
          <ItemProperty key={`${publication.publication_id}-journalTitle`} flex={5}>{publication.journal_title}</ItemProperty>
          <ItemProperty key={`${publication.publication_id}-status`} flex={4}>
            <div style={{display: 'flex', minHeight: '20px', minWidth: '70px', borderRadius: '5px', backgroundColor: COLORS.SUCCESS, color: COLORS.SUCCESS_300, alignItems: 'center', justifyContent: 'center', fontSize: '8px'}}>ACTIVE</div>
          </ItemProperty>
          <ItemProperty key={`${publication.publication_id}-lastEdit`} flex={4}>{moment(publication.last_modified_date).format("DD MMM YYYY")}</ItemProperty>
          <ItemProperty key={`${publication.publication_id}-edit`} flex={1} style={{cursor: 'pointer'}}><FaIcons.FaEllipsisV size={20} style={{color: 'lightgray'}} onClick={() => index === openPublication ? setOpenPublication(null) : setOpenPublication(publication.publication_id)}/></ItemProperty>
  
        </ListItem>)
        })}
      </>) : (<div style={{}}><Lottie
      width='250px'
      height='500px'
      options={{
        animationData: lookingForDataAnimation,
        loop: isLoadingPublications
      }}
    /></div>)}
    </Content>
    { !isLoadingPublications && publications && <ListItem index='pages' style={{marginTop: '30px', backgroundColor: 'white'}}>
      <div style={{justifySelf: 'flex-start'}}><a style={{pointerEvents: currentPublicationsPage === 1 && 'none', color: currentPublicationsPage === 1 && 'lightgray'}} onClick={() => setCurrentPublicationsPage(currentPublicationsPage - 1)}>Previous Page</a></div>
      <div style={{justifySelf: 'center', margin: 'auto'}}>{currentPublicationsPage}</div>
      <div style={{justifySelf: 'flex-end'}}><a style={{pointerEvents: currentPublicationsPage === pageNumberArr.length && 'none', color: currentPublicationsPage === pageNumberArr.length && 'lightgray'}} onClick={() => setCurrentPublicationsPage(currentPublicationsPage + 1)}>Next Page</a></div>
    </ListItem>}
      </>)}

    { profilePage === 3 && (<>
    <Content style={{backgroundColor: 'white', flexDirection: 'column'}}>
      <ListItem index='definition'>
        <ItemProperty flex={2} color='lightgray'>ID</ItemProperty>
        <ItemProperty flex={7} color='lightgray'>Title</ItemProperty>
        <ItemProperty flex={5} color='lightgray'>Organization Name</ItemProperty>
        <ItemProperty flex={4} color='lightgray'>Status</ItemProperty>
        <ItemProperty flex={4} color='lightgray'>Last Edit</ItemProperty>
        <ItemProperty flex={1} color='lightgray'></ItemProperty>

        <Modal show={openCareer !== null} onClose={() => setOpenCareer(null)} itemId={openCareer}>Body stuff, huehue - {openCareer}</Modal>
      </ListItem>
      { !isLoadingEmployments && !isLoadingEducations && (educations || employments) ? (<>
        {currentCareers.map((career, index) => {
          return (<ListItem index={index} open={openCareer}>
          <ItemProperty key={`${career.education_id || career.employment_id}-${career.education_id ? 'educationId' : 'employmentId'}`} flex={2}>{career.education_id || career.employment_id}</ItemProperty>
          <ItemProperty key={`${career.education_id || career.employment_id}-title`} flex={7}>{career.role_title}</ItemProperty>
          <ItemProperty key={`${career.education_id || career.employment_id}-orgName`} flex={5}>{career.organization_name}</ItemProperty>
          <ItemProperty key={`${career.education_id || career.employment_id}-status`} flex={4}>
            <div style={{display: 'flex', minHeight: '20px', minWidth: '70px', borderRadius: '5px', backgroundColor: COLORS.SUCCESS, color: COLORS.SUCCESS_300, alignItems: 'center', justifyContent: 'center', fontSize: '8px'}}>ACTIVE</div>
          </ItemProperty>
          <ItemProperty key={`${career.education_id || career.employment_id}-lastEdit`} flex={4}>{moment(career.last_modified_date).format("DD MMM YYYY")}</ItemProperty>
          <ItemProperty key={`${career.education_id || career.employment_id}-edit`} flex={1} style={{cursor: 'pointer'}}><FaIcons.FaEllipsisV size={20} style={{color: 'lightgray'}} onClick={() => index === openCareer ? setOpenCareer(null) : setOpenCareer(career.education_id || career.employment_id)}/></ItemProperty>
  
        </ListItem>)
        })}
      </>) : (<div style={{}}><Lottie
      width='250px'
      height='500px'
      options={{
        animationData: lookingForDataAnimation,
        loop: isLoadingPublications
      }}
    /></div>)}
    </Content>
    {console.log(currentCareersPage, careerPageNumberArr)}
    { !isLoadingEmployments && !isLoadingEducations && (educations || employments) && <ListItem index='pages' style={{marginTop: '30px', backgroundColor: 'white'}}>
      <div style={{justifySelf: 'flex-start'}}><a style={{pointerEvents: currentCareersPage === 1 && 'none', color: currentCareersPage === 1 && 'lightgray'}} onClick={() => setCurrentCareersPage(currentCareersPage - 1)}>Previous Page</a></div>
      <div style={{justifySelf: 'center', margin: 'auto'}}>{currentCareersPage}</div>
      <div style={{justifySelf: 'flex-end'}}><a style={{pointerEvents: currentCareersPage === careerPageNumberArr.length && 'none', color: currentCareersPage === careerPageNumberArr.length && 'lightgray'}} onClick={() => setCurrentCareersPage(currentCareersPage + 1)}>Next Page</a></div>
    </ListItem>}
      </>)}

    { profilePage === 4 && (<>
    <Content style={{backgroundColor: 'white', flexDirection: 'column', height: '100%'}}>
    <HomeGrid columns={10} isResizable={false} dashboard={user.dashboard} onSave={(body) => saveUserChanges(user.orcidID, body)}>
      <ListItem key="1" data-grid={{i: '1', w: 10, h: 2, x: 0, y: 0}} style={{color: 'lightgray', justifyContent: 'center'}}>NavigationBar1</ListItem>
      <ListItem key="2" data-grid={{i: '2', w: 10, h: 2, x: 0, y: 2}} style={{color: 'lightgray', justifyContent: 'center'}}>NavigationBar2</ListItem>
      <ListItem key="3" data-grid={{i: '3', w: 10, h: 2, x: 0, y: 4}} style={{color: 'lightgray', justifyContent: 'center', marginBottom: 'auto'}}>NavigationBar3</ListItem>
    </HomeGrid>
    </Content>
      </>)}
        </ContentContainer>
        </Right>
      </Container>
  )
}

export default Profile
