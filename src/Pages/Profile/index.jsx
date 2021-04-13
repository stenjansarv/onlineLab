import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get, omitBy, isNull, isNil, uniq } from 'lodash'
import fetch from 'node-fetch'
import Lottie from 'lottie-react-web'
import styled from 'styled-components'
import moment from 'moment'

import * as FaIcons from 'react-icons/fa'

import successAnimation from '../../assets/lottie/success-animation.json'
import loadingAnimation from '../../assets/lottie/loading-animation.json'
import errorAnimation from '../../assets/lottie/error-animation.json'
import lookingForDataAnimation from './LookingForData.json'

import { COLORS } from '../../lib/constants/colors'

import VerticalNavBar from '../../components/Admin/VerticalNavBar'
import LocalStorageLayout from '../../components/GridLayout'
import HomeGrid from './HomeGrid'
import Logo from '../../components/Logo'

import { fetchPublications, updatePublication, deletePublication, uploadPublications, unloadPublications } from '../../redux/actions/publications.actions'
import { fetchEmployments, updateEmployment, deleteEmployment, uploadEmployments, unloadEmployments } from '../../redux/actions/employments.actions'
import { fetchEducations, updateEducation, deleteEducation, uploadEducations, unloadEducations } from '../../redux/actions/educations.actions'
import { updateUser } from '../../redux/actions/user.actions'
import { getBlogPosts, deleteBlogPost, updateBlogPost, createNewBlogPost } from '../../redux/actions/blog.actions'

import Modal from '../../components/Modal'
import { Input, Popover, Switch, message } from 'antd'
import LoadingScreen from '../../components/Loading'

const { TextArea } = Input;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;

  font-family: 'Montserrat', sans-serif;
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
  width: ${props => props.size || '125px'};
  height: ${props => props.size || '125px'};
  border-radius: 50%;
  box-shadow: 0px 5px 10px 0.5px #f4f7fc;

  justify-self: flex-end;
  margin-bottom: 20px;

  background-image: url('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png');

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

  height: ${props => props.size || '30px'};
  width: ${props => props.size || '30px'};
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

const BlogPostTextForm = styled(TextArea)`
  box-shadow: none;
  border: 1px solid #EBEBEB;
  border-radius: 5px;
  background-color: #fbfbfb;
  text-align: center;
  max-height: 600px;

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

const BlogPostPlaceholderItem = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 300px;
  height: 300px;
  background: white; //lightmode - EAF2EF
  margin: 20px;
  padding: 2px;
  transition: 0.3s;
  border-radius: 10px;

  overflow: hidden;

  &:hover {
    cursor: pointer;
    box-shadow: inset 3px 3px 40px 5px #5995ED; /* outer coral */
  }
`


const BlogPostItem = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 300px;
  height: 300px;
  background: #C4C3E9; //lightmode - EAF2EF
  margin: 20px;
  padding: 2px;
  transition: 0.3s;
  border-radius: 10px;

  overflow: hidden;

  &:hover {
    cursor: pointer;
    box-shadow: 3px 3px 40px 5px #5995ED; /* outer coral */
    background-color: #5995ED;
  }
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

  const blogPosts = useSelector(state => state.blog.posts)
  const isLoadingBlogPosts = useSelector(state => get(state.waiting.list, 'FETCHING_BLOG_POSTS', true))
  
  const group = useSelector(state => state.user.details.group)
  const isImporting = useSelector(state => state.user.details.importing)

  // Actions
  const loadPublications = (publisherId) => dispatch(fetchPublications(publisherId))
  const loadEmployments = (publisherId) => dispatch(fetchEmployments(publisherId))
  const loadEducations = (publisherId) => dispatch(fetchEducations(publisherId))
  const saveUserChanges = (publisherId, body) => dispatch(updateUser(publisherId, body))
  const savePublicationChanges = (publisherId, publicationId, body) => dispatch(updatePublication(publisherId, publicationId, body))
  const saveEducationChanges = (publisherId, educationId, body) => dispatch(updateEducation(publisherId, educationId, body))
  const saveEmploymentChanges = (publisherId, employmentId, body) => dispatch(updateEmployment(publisherId, employmentId, body))
  const removePublication = (publisherId, publicationId) => dispatch(deletePublication(publisherId, publicationId))
  const removeEmployment = (publisherId, employmentId) => dispatch(deleteEmployment(publisherId, employmentId))
  const removeEducation = (publisherId, educationId) => dispatch(deleteEducation(publisherId, educationId))
  const addPublications = (publisherId) => dispatch(uploadPublications(publisherId))
  const removePublications = (publisherId) => dispatch(unloadPublications(publisherId))
  const addEducations = (publisherId) => dispatch(uploadEducations(publisherId))
  const removeEducations = (publisherId) => dispatch(unloadEducations(publisherId))
  const addEmployments = (publisherId) => dispatch(uploadEmployments(publisherId))
  const removeEmployments = (publisherId) => dispatch(unloadEmployments(publisherId))

  const loadBlogPosts = (publisherId) => dispatch(getBlogPosts(publisherId))
  const createBlogPost = (publisherId, body) => dispatch(createNewBlogPost(publisherId, body))
  const removeBlogPost = (publisherId, postId) => dispatch(deleteBlogPost(publisherId, postId))
  const updateNewBlogPost = (publisherId, postId, body) => dispatch(updateBlogPost(publisherId, postId, body))

  const [profilePage, setProfilePage] = useState(1) // 1 = Dashboard | 2 = Publications | 3 = Employments & Educations | 4 = Manage Home Page | 5 = Manage Blog

  const [currentPublicationsPage, setCurrentPublicationsPage] = useState(1)
  const [publicationsPerPage, setPublicationsPerPage] = useState(10)
  const [openPublication, setOpenPublication] = useState(null)

  const [currentCareersPage, setCurrentCareersPage] = useState(1)
  const [careersPerPage, setCareersPerPage] = useState(10)
  const [openCareer, setOpenCareer] = useState(null)

  const [openBlogPost, setOpenBlogPost] = useState(null)
  const [newBlogModalOpen, setNewBlogModalOpen] = useState(false)

  const [groupMembers, setGroupMembers] = useState(user.group.groupMembers)

  // User Info
  const [fullName, setFullName] = useState(null)
  const [twitterHandle, setTwitterHandle] = useState(null)
  const [location, setLocation] = useState(null)
  const [importing, setImporting] = useState(isImporting)
  const [addMember, setAddMember] = useState(null)

  const [publicationTitle, setPublicationTitle] = useState(null)
  const [publicationJournalTitle, setPublicationJournalTitle] = useState(null)
  const [publicationLink, setPublicationLink] = useState(null)

  const [educationRoleTitle, setEducationRoleTitle] = useState(null)
  const [educationOrgName, setEducationOrgName] = useState(null)
  const [educationOrgAddress, setEducationOrgAddress] = useState(null)
  
  const [employmentRoleTitle, setEmploymentsRoleTitle] = useState(null)
  const [employmentOrgName, setEmploymentOrgName] = useState(null)
  const [employmentOrgAddress, setEmploymentOrgAddress] = useState(null)

  const [blogPostTitle, setBlogPostTitle] = useState(null)
  const [blogPostText, setBlogPostText] = useState(null)

  const checklist = [{
    loading: () => userLoading,
    checked: () => !!user.fullName,
    text: 'Add your full name',
    url: `/${user.orcidId}/profile/settings`
  }, {
    loading: () => userLoading,
    checked: () => user.importing,
    text: 'Enable importing from ORCID',
    url: ``
  }, {
    loading: () => isLoadingBlogPosts,
    checked: () => blogPosts.length > 0,
    text: 'Write your first blog post',
    url: ``
  }, {
    loading: () => userLoading,
    checked: () => group.groupMembers.length > 1,
    text: 'Add your first research group member',
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

  const clearPublicationValues = () => {
    setPublicationTitle(null)
    setPublicationJournalTitle(null)
    setPublicationLink(null)
  }

  const clearCareerValues = () => {
    setEducationRoleTitle(null)
    setEducationOrgName(null)
    setEducationOrgAddress(null)

    setEmploymentsRoleTitle(null)
    setEmploymentOrgName(null)
    setEmploymentOrgAddress(null)
  }

  const clearBlogPostValues = () => {
    setBlogPostText(null)
    setBlogPostTitle(null)
  }

  useEffect(() => {
    loadPublications(user.orcidID)
    loadEmployments(user.orcidID)
    loadEducations(user.orcidID)
    loadBlogPosts(user.orcidID)

    checklist.forEach((item) => {
      if (!item.fetch) {
        return
      }

      dispatch(item.fetch())
    })
  }, [])

  if (userLoading || isLoadingPublications || isLoadingEducations || isLoadingEmployments || isLoadingBlogPosts) {
    return (
      <LoadingScreen />
    )
  }

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

  const addNewGroupMember = async () => {
    const { status } = await fetch(`https://pub.orcid.org/v3.0/${addMember}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    if (status === 200) {
      saveUserChanges(user.orcidID, { group: { enabled: true, groupMembers: uniq(groupMembers.concat([addMember]))}})
      setGroupMembers(groupMembers.concat([{ orcidID: addMember }]))
      message.success('Successfully added a new research team member.')
    } else {
      message.error('Failed to add a research team member. That ORCID ID is not valid.')
    }
    
  }

  const getPageTitle = (profilePage) => {
    if (profilePage === 1) return 'Dashboard'
    else if (profilePage === 2) return 'Publications'
    else if (profilePage === 3) return 'Employments & Educations'
    else if (profilePage === 4) return 'Manage Homepage'
    else if (profilePage === 5) return 'Manage Blog'
    else return 'Dashboard'
  }

  return (
    <Container style={{flexDirection: 'row'}}>
      <Left>
        <div style={{alignSelf: 'center'}}>
          <Logo text={false}/>
        </div>
        <NavBarItem onClick={() => setProfilePage(1)}><span></span><p>Dashboard</p></NavBarItem>
        <NavBarItem onClick={() => setProfilePage(2)}><span></span><p>Publications</p></NavBarItem>
        <NavBarItem onClick={() => setProfilePage(3)}><span></span><p>Employments & Educations</p></NavBarItem>
        <NavBarItem onClick={() => setProfilePage(4)}><span></span><p>Manage Homepage</p></NavBarItem>
        <NavBarItem onClick={() => setProfilePage(5)}><span></span><p>Manage the Blog</p></NavBarItem>

      </Left>
      <Right style={{width: '100%'}}>
        <VerticalNavBar />
        <ContentContainer>
        <TitleHeader>
          <PageTitle>{getPageTitle(profilePage)}</PageTitle>
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
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px', marginBottom: '30px'}}>
            <p style={{marginBottom: '10px'}}>Importing is {importing ? 'enabled' : 'disabled'}</p>
            <Switch defaultChecked={importing} onChange={(e) => { saveUserChanges(user.orcidID, { importing: e }); setImporting(e); if (e) { addPublications(user.orcidID); addEducations(user.orcidID); addEmployments(user.orcidID); } else { removePublications(user.orcidID); removeEducations(user.orcidID); removeEmployments(user.orcidID); }}} />
          </div>

          <SaveButton onClick={() => saveUserChanges(user.orcidID, omitBy({ twitterHandle, fullName, location }, isNull))}>Save Changes</SaveButton>
        </Card>
      {group.enabled ? (
      <LocalStorageLayout columns={10} isResizable={false}>
        <Card key="1" data-grid={{i: '1', w: 10, h: 2, x: 0, y: 0, static: true}} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 0 }}>
          Manage your research group
        </Card>
        <div key='2' data-grid={{i: '2', w: 10, h: 1, x: 0, y: 2, static: true }} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 0}}>
          <Popover
            content={<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><ProfileFormInput onChange={(e) => setAddMember(e.target.value)} /><AddGroupMember style={{width: '100px', marginTop: '10px', borderRadius: '5px', backgroundColor: COLORS.SECONDARY_300, color: 'white'}} 
            onClick={() => addNewGroupMember()}
          >Enter</AddGroupMember></div>}
            title='Add the ORCID ID you want to invite to your team'
            trigger="click"
          >
            <AddGroupMember>+</AddGroupMember>
          </Popover>
        </div>
        {groupMembers.filter(member => get(member, 'orcidID') !== user.orcidID).map((groupMember, index) => {
          return (
            <Card style={{padding: 0, flexDirection: 'row'}} key={groupMember.orcidID} data-grid={{i: groupMember.orcidID, w: 10, h: 2, x: 0, y: 3 }}>
              <ProfileImage style={{margin: 0, marginLeft: '10px', alignSelf: 'center', justifySelf: 'center'}} size='50px'/>
              <p style={{margin: 0, marginLeft: '10px', alignSelf: 'center', justifySelf: 'center'}}>{get(groupMember, 'name', 'Refresh the page to see the name')}</p>
              <AddGroupMember style={{margin: 0, marginLeft: 'auto', marginRight: '10px', alignSelf: 'center'}} onClick={() => { saveUserChanges(user.orcidID, { group: { enabled: true, groupMembers: groupMembers.filter(member => member.orcidID !== groupMember.orcidID)}}); setGroupMembers(groupMembers.filter(member => member.orcidID !== groupMember.orcidID))} }>-</AddGroupMember>
            </Card>
          )
        })}
      </LocalStorageLayout>) : (
        <p>Please enable group</p>
      )}
      </BlockTwo>
      <BlockThree>
        <Card>
          <TitleText>Onboarding Checklist</TitleText>
          {checklist.map((item, index) => (
            <CheckListItem key={index}>
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

        <Modal show={!isNil(openPublication)} onClose={() => {setOpenPublication(null); clearPublicationValues()}} itemId={get(openPublication, 'publication_id')} onSave={() => {savePublicationChanges(user.orcidID, get(openPublication, 'publication_id'), omitBy({ title: publicationTitle, journal_title: publicationJournalTitle, url: publicationLink }, isNull)); setOpenPublication(null); clearPublicationValues()}} onDelete={() => {removePublication(user.orcidID, get(openPublication, 'publication_id')); setOpenPublication(null); clearPublicationValues()}} title={get(openPublication, 'publication_id')}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px', textAlign: 'left'}}>
            <p style={{margin: 0}}>Title</p>
            <ProfileFormInput onChange={(e) => setPublicationTitle(e.target.value)} placeholder={get(openPublication, 'title') || ''} value={publicationTitle}/>
          </div> 
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px', textAlign: 'left'}}>
            <p style={{margin: 0}}>Journal Title</p>
            <ProfileFormInput onChange={(e) => setPublicationJournalTitle(e.target.value)} placeholder={get(openPublication, 'journal_title') || ''} value={publicationJournalTitle}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px', textAlign: 'left'}}>
            <p style={{margin: 0}}>Link to the Publication</p>
            <ProfileFormInput onChange={(e) => setPublicationLink(e.target.value)} placeholder={get(openPublication, 'url') || ''} value={publicationLink}/>
          </div>
        </Modal>
      </ListItem>
      { !isLoadingPublications && publications && isImporting ? (<>
        {currentPublications.map((publication, index) => {
          return (<ListItem key={index} index={index} open={openPublication}>
          <ItemProperty key={`${publication.publication_id}-publicationId`} flex={2}>{publication.publication_id}</ItemProperty>
          <ItemProperty key={`${publication.publication_id}-title`} flex={7}>{publication.title}</ItemProperty>
          <ItemProperty key={`${publication.publication_id}-journalTitle`} flex={5}>{publication.journal_title}</ItemProperty>
          <ItemProperty key={`${publication.publication_id}-status`} flex={4}>
            <div style={{display: 'flex', minHeight: '20px', minWidth: '70px', borderRadius: '5px', backgroundColor: COLORS.SUCCESS, color: COLORS.SUCCESS_300, alignItems: 'center', justifyContent: 'center', fontSize: '8px'}}>ACTIVE</div>
          </ItemProperty>
          <ItemProperty key={`${publication.publication_id}-lastEdit`} flex={4}>{moment(publication.last_modified_date).format("DD MMM YYYY")}</ItemProperty>
          <ItemProperty key={`${publication.publication_id}-edit`} flex={1} style={{cursor: 'pointer'}}><FaIcons.FaEllipsisV size={20} style={{color: 'lightgray'}} onClick={() => setOpenPublication(publication)}/></ItemProperty>
  
        </ListItem>)
        })}
      </>) : (isImporting && isLoadingPublications) || isLoadingPublications ? 
      (<div><Lottie
        width='250px'
        height='500px'
        options={{
          animationData: lookingForDataAnimation,
          loop: true
        }}
      /></div>) : <div style={{height: '100%', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Importing has not been enabled</div>}
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

        <Modal show={!isNil(openCareer)} onClose={() => {setOpenCareer(null); clearCareerValues()}} itemId={get(openCareer, 'education_id', get(openCareer, 'employment_id'))} 
          title={get(openCareer, 'education_id', get(openCareer, 'employment_id'))}
          onSave={() => { 
            if (get(openCareer, 'education_id')) {
              saveEducationChanges(user.orcidID, get(openCareer, 'education_id'), omitBy({ role_title: educationRoleTitle, organization_name: educationOrgName, organization_address: educationOrgAddress }, isNull)); setOpenCareer(null); clearCareerValues(); message.success('Successfully updated the education item.');
            } else if (get(openCareer, 'employment_id')) {
              saveEmploymentChanges(user.orcidID, get(openCareer, 'employment_id'), omitBy({ role_title: employmentRoleTitle, organization_name: employmentOrgName, organization_address: employmentOrgAddress }, isNull)); setOpenCareer(null); clearCareerValues(); message.success('Successfully updated the employment item.');
            }
            }}
          onDelete={() => {
            if (get(openCareer, 'education_id')) {
              removeEducation(user.orcidID, get(openCareer, 'education_id')); setOpenCareer(null); clearCareerValues(); message.success('Successfully deleted the education item.');
            } else if (get(openCareer, 'employment_id')) {
              removeEmployment(user.orcidID, get(openCareer, 'employment_id')); setOpenCareer(null); clearCareerValues(); message.success('Successfully deleted the employment item.');
            }
          }}>
          { get(openCareer, 'education_id') &&
          (<><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px', textAlign: 'left'}}>
            <p style={{margin: 0}}>Education Role Title</p>
            <ProfileFormInput onChange={(e) => setEducationRoleTitle(e.target.value)} placeholder={get(openCareer, 'role_title') || ''} value={educationRoleTitle}/>
          </div> 
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px', textAlign: 'left'}}>
            <p style={{margin: 0}}>Organization Name</p>
            <ProfileFormInput onChange={(e) => setEducationOrgName(e.target.value)} placeholder={get(openCareer, 'organization_name') || ''} value={educationOrgName}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px', textAlign: 'left'}}>
            <p style={{margin: 0}}>Organization Address</p>
            <ProfileFormInput onChange={(e) => setEducationOrgAddress(e.target.value)} placeholder={get(openCareer, 'organization_address') || ''} value={educationOrgAddress}/>
          </div></>)}

          { get(openCareer, 'employment_id') &&
          (<><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px', textAlign: 'left'}}>
            <p style={{margin: 0}}>Employment Role Title</p>
            <ProfileFormInput onChange={(e) => setEmploymentsRoleTitle(e.target.value)} placeholder={get(openCareer, 'role_title') || ''} value={employmentRoleTitle}/>
          </div> 
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px', textAlign: 'left'}}>
            <p style={{margin: 0}}>Organization Name</p>
            <ProfileFormInput onChange={(e) => setEmploymentOrgName(e.target.value)} placeholder={get(openCareer, 'organization_name') || ''} value={employmentOrgName}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px', textAlign: 'left'}}>
            <p style={{margin: 0}}>Organization Address</p>
            <ProfileFormInput onChange={(e) => setEmploymentOrgAddress(e.target.value)} placeholder={get(openCareer, 'organization_address') || ''} value={employmentOrgAddress}/>
          </div></>)}
        </Modal>
      </ListItem>
      { !isLoadingEmployments && !isLoadingEducations && (educations || employments) && isImporting ? (<>
        {currentCareers.map((career, index) => {
          return (<ListItem key={index} index={index} open={openCareer}>
          <ItemProperty key={`${career.education_id || career.employment_id}-${career.education_id ? 'educationId' : 'employmentId'}`} flex={2}>{career.education_id || career.employment_id}</ItemProperty>
          <ItemProperty key={`${career.education_id || career.employment_id}-title`} flex={7}>{career.role_title}</ItemProperty>
          <ItemProperty key={`${career.education_id || career.employment_id}-orgName`} flex={5}>{career.organization_name}</ItemProperty>
          <ItemProperty key={`${career.education_id || career.employment_id}-status`} flex={4}>
            <div style={{display: 'flex', minHeight: '20px', minWidth: '70px', borderRadius: '5px', backgroundColor: COLORS.SUCCESS, color: COLORS.SUCCESS_300, alignItems: 'center', justifyContent: 'center', fontSize: '8px'}}>ACTIVE</div>
          </ItemProperty>
          <ItemProperty key={`${career.education_id || career.employment_id}-lastEdit`} flex={4}>{moment(career.last_modified_date).format("DD MMM YYYY")}</ItemProperty>
          <ItemProperty key={`${career.education_id || career.employment_id}-edit`} flex={1} style={{cursor: 'pointer'}}><FaIcons.FaEllipsisV size={20} style={{color: 'lightgray'}} onClick={() => setOpenCareer(career)}/></ItemProperty>
  
        </ListItem>)
        })}
      </>) : (isImporting && (isLoadingEmployments || isLoadingEducations)) || (isLoadingPublications || isLoadingEducations) ? (<div><Lottie
      width='250px'
      height='500px'
      options={{
        animationData: lookingForDataAnimation,
        loop: isLoadingEmployments || isLoadingEducations
      }}
    /></div>) : <div style={{height: '100%', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Importing has not been enabled</div>}
    </Content>
    { !isLoadingEmployments && !isLoadingEducations && (educations || employments) && <ListItem index='pages' style={{marginTop: '15px', backgroundColor: 'white'}}>
      <div style={{justifySelf: 'flex-start'}}><a style={{pointerEvents: currentCareersPage === 1 && 'none', color: currentCareersPage === 1 && 'lightgray'}} onClick={() => setCurrentCareersPage(currentCareersPage - 1)}>Previous Page</a></div>
      <div style={{justifySelf: 'center', margin: 'auto'}}>{currentCareersPage}</div>
      <div style={{justifySelf: 'flex-end'}}><a style={{pointerEvents: currentCareersPage === careerPageNumberArr.length && 'none', color: currentCareersPage === careerPageNumberArr.length && 'lightgray'}} onClick={() => setCurrentCareersPage(currentCareersPage + 1)}>Next Page</a></div>
    </ListItem>}
      </>)}

    { profilePage === 4 && (<>
      <Content style={{backgroundColor: 'white', flexDirection: 'column', height: '100%'}}>
      <HomeGrid columns={10} isResizable={false} dashboard={user.dashboard} onSave={(body) => saveUserChanges(user.orcidID, body)}>
      </HomeGrid>
      </Content>
    </>)}

    { profilePage === 5 && (<>
    <Content style={{flexDirection: 'column'}}>
        <Modal show={newBlogModalOpen} onClose={() => {setNewBlogModalOpen(false); clearBlogPostValues()}} itemId={get(openBlogPost, 'postId')} 
          showDelete={false}
          onSave={() => {createBlogPost(user.orcidID, omitBy({ author: user.orcidID, title: blogPostTitle, post: blogPostText }, isNull)); setNewBlogModalOpen(false); clearBlogPostValues(); message.success('Successfully created a new blog post.');}}
          title='Create a new blog post'
        >
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px'}}>
            <p style={{margin: 0}}>Post Title</p>
            <ProfileFormInput onChange={(e) => setBlogPostTitle(e.target.value)} placeholder={'Give your blog post a title'} value={blogPostTitle} style={{textAlign: 'left'}}/>
          </div> 
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px'}}>
            <p style={{margin: 0}}>Post</p>
            <BlogPostTextForm maxLength={1000} autoSize={{ minRows: 3, maxRows: 5 }} onChange={(e) => setBlogPostText(e.target.value)} placeholder={'Write your blog post here'} value={blogPostText} style={{textAlign: 'left'}}/>
          </div>
        </Modal>

              <Modal show={!isNil(openBlogPost)} onClose={() => {setOpenBlogPost(null); clearBlogPostValues()}} itemId={get(openBlogPost, 'postId')} 
                onSave={() => {updateNewBlogPost(user.orcidID, get(openBlogPost, 'postId'), omitBy({ title: blogPostTitle, post: blogPostText }, isNull)); setOpenBlogPost(null); clearBlogPostValues(); message.success('Successfully updated the blog post.');}} 
                onDelete={() => {removeBlogPost(user.orcidID, get(openBlogPost, 'postId')); setOpenBlogPost(null); clearBlogPostValues(); message.success('Successfully deleted the blog post.');}}
                title='Update the blog post'
              >
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px'}}>
                  <p style={{margin: 0}}>Post Title</p>
                  <ProfileFormInput onChange={(e) => setBlogPostTitle(e.target.value)} value={blogPostTitle} style={{textAlign: 'left'}}/>
                </div> 
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px'}}>
                  <p style={{margin: 0}}>Post</p>
                  <BlogPostTextForm maxLength={1000} autoSize={{ minRows: 3, maxRows: 5 }} onChange={(e) => setBlogPostText(e.target.value)} value={blogPostText} style={{textAlign: 'left'}}/>
                </div>
              </Modal>

              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
              {blogPosts.length === 0 && (<>
                  <BlogPostPlaceholderItem onClick={() => setNewBlogModalOpen(true)}><AddGroupMember size='75px' style={{fontSize: '3rem', boxShadow: 'none'}}>+</AddGroupMember></BlogPostPlaceholderItem>
                  <BlogPostPlaceholderItem onClick={() => setNewBlogModalOpen(true)}><AddGroupMember size='75px' style={{fontSize: '3rem', boxShadow: 'none'}}>+</AddGroupMember></BlogPostPlaceholderItem>
                  <BlogPostPlaceholderItem onClick={() => setNewBlogModalOpen(true)}><AddGroupMember size='75px' style={{fontSize: '3rem', boxShadow: 'none'}}>+</AddGroupMember></BlogPostPlaceholderItem>
                  <BlogPostPlaceholderItem onClick={() => setNewBlogModalOpen(true)}><AddGroupMember size='75px' style={{fontSize: '3rem', boxShadow: 'none'}}>+</AddGroupMember></BlogPostPlaceholderItem>
              </>)
              }

              {blogPosts.length === 1 && (<>
                  <BlogPostItem onClick={() => { setOpenBlogPost(blogPosts[0]); setBlogPostTitle(blogPosts[0].title); setBlogPostText(blogPosts[0].post); }}>
                    <h1>{blogPosts[0].title}</h1>
                  </BlogPostItem>
                  <BlogPostPlaceholderItem onClick={() => setNewBlogModalOpen(true)}><AddGroupMember size='75px' style={{fontSize: '3rem', boxShadow: 'none'}}>+</AddGroupMember></BlogPostPlaceholderItem>
                  <BlogPostPlaceholderItem onClick={() => setNewBlogModalOpen(true)}><AddGroupMember size='75px' style={{fontSize: '3rem', boxShadow: 'none'}}>+</AddGroupMember></BlogPostPlaceholderItem>
                  <BlogPostPlaceholderItem onClick={() => setNewBlogModalOpen(true)}><AddGroupMember size='75px' style={{fontSize: '3rem', boxShadow: 'none'}}>+</AddGroupMember></BlogPostPlaceholderItem>
              </>)
              }

              {blogPosts.length === 2 && (<>
                  <BlogPostItem onClick={() => { setOpenBlogPost(blogPosts[0]); setBlogPostTitle(blogPosts[0].title); setBlogPostText(blogPosts[0].post); }}>
                    <h1>{blogPosts[0].title}</h1>
                  </BlogPostItem>
                  <BlogPostItem onClick={() => { setOpenBlogPost(blogPosts[1]); setBlogPostTitle(blogPosts[1].title); setBlogPostText(blogPosts[1].post); }}>
                    <h1>{blogPosts[1].title}</h1>
                  </BlogPostItem>
                  <BlogPostPlaceholderItem onClick={() => setNewBlogModalOpen(true)}><AddGroupMember size='75px' style={{fontSize: '3rem', boxShadow: 'none'}}>+</AddGroupMember></BlogPostPlaceholderItem>
                  <BlogPostPlaceholderItem onClick={() => setNewBlogModalOpen(true)}><AddGroupMember size='75px' style={{fontSize: '3rem', boxShadow: 'none'}}>+</AddGroupMember></BlogPostPlaceholderItem>
              </>)
              }

              {blogPosts.length === 3 && (<>
                  <BlogPostItem onClick={() => { setOpenBlogPost(blogPosts[0]); setBlogPostTitle(blogPosts[0].title); setBlogPostText(blogPosts[0].post); }}>
                    <h1>{blogPosts[0].title}</h1>
                  </BlogPostItem>
                  <BlogPostItem onClick={() => { setOpenBlogPost(blogPosts[1]); setBlogPostTitle(blogPosts[1].title); setBlogPostText(blogPosts[1].post); }}>
                    <h1>{blogPosts[1].title}</h1>
                  </BlogPostItem>
                  <BlogPostItem onClick={() => { setOpenBlogPost(blogPosts[2]); setBlogPostTitle(blogPosts[2].title); setBlogPostText(blogPosts[2].post); }}>
                    <h1>{blogPosts[2].title}</h1>
                  </BlogPostItem>
                  <BlogPostPlaceholderItem onClick={() => setNewBlogModalOpen(true)}><AddGroupMember size='75px' style={{fontSize: '3rem', boxShadow: 'none'}}>+</AddGroupMember></BlogPostPlaceholderItem>
              </>)
              }

              {blogPosts.length === 4 && (
                <>
                  <BlogPostItem onClick={() => setOpenBlogPost(blogPosts[0])}>
                    <h1>{blogPosts[0].title}</h1>
                  </BlogPostItem>
                  <BlogPostItem onClick={() => setOpenBlogPost(blogPosts[1])}>
                    <h1>{blogPosts[1].title}</h1>
                  </BlogPostItem>
                  <BlogPostItem onClick={() => setOpenBlogPost(blogPosts[2])}>
                    <h1>{blogPosts[2].title}</h1>
                  </BlogPostItem>
                  <BlogPostItem onClick={() => setOpenBlogPost(blogPosts[3])}>
                    <h1>{blogPosts[3].title}</h1>
                  </BlogPostItem>
                </>
              )}
              </div>
            </Content></>)}
          </ContentContainer>
        </Right>
      </Container>
  )
}

export default Profile
