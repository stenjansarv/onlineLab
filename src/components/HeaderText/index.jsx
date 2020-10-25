import React from 'react'


const HeaderText = ({text}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <h1 style={{alignSelf: 'center'}}>{text}</h1>
      <h1 style={{alignSelf: 'center'}}>Join us now</h1>

      <p style={{alignSelf: 'center', paddingTop: '2rem'}}>Lorem ipsum aisufasiud</p>
    </div>
  );
}

export default HeaderText
