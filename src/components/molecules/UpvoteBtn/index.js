import React from 'react'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const Btn = styled.button`
  background-color:#F7F8F9;
  color:#fff;
  width:auto;
  height:auto;
  font-size:14px;
  border-radius:17px;
  border:0;
  padding:10px 20px 10px 20px;
  &:hover{
    cursor: pointer,
  } 
`


const styles = {
  button:{
    borderRadius:'17px'
  },
  btnStyle:{
    borderRadius:'17px'
  },
  icon:{
    color:'#fff',
    fontSize:'18px',

  },
  textInner:{

  }
};

const UpvoteBtn = ({text,style,buttonStyle})=>{
  var newStyle = Object.assign({},style,styles.button)
  var newBtnStyle = Object.assign({},buttonStyle,styles.btnStyle)
  return(
    <RaisedButton
      target="_blank"
      label={text}
      labelColor="#fff"
      labelStyle={{fontFamily:'Nunito'}}
      style={newStyle}
      buttonStyle={newBtnStyle}
      backgroundColor="#E06048"
      icon={<FontIcon className="muidocs-icon-custom-github" />}
    ></RaisedButton>
  )
}

export default UpvoteBtn