import React from 'react'
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton';
import {Link,browserHistory} from 'react-router'
import Request from 'superagent'

const Box = styled.div`
  width:600px;
  background-color:#fff;
  padding:10px 0 20px 0;
  @media (max-width:480px) {
    background:none;
    width:100vw;
    padding:80px 0 80px 0;
    height:auto;
  } 
`
const Head = styled.div`
  margin:35px auto 0px auto;
  text-align:center;
  font-size:32px;
  color:${props=> props.theme.primaryColor};
  font-family:'Nunito';
  @media (max-width:480px) {
    margin:0px auto 10px auto;
    font-weight:bold;
    color:#fff;
  } 
`
const Text = styled.div`
  color:#8f8f8f;
  font-size:18px;
  text-align:center;
  margin:5px 0 5px 0;
  line-height:1.5;
`
const LinkUnderLine = styled(Link)`
  color:${props=> props.theme.primaryColor};
  font-size:18px;
  text-decoration:underline; 
`
var styles={
  button:{
    background:'#3A579A',
    borderRadius:'30px',
    height:'40px',
    width:'350px'
  },
  btn:{
    background:'#3A579A',
    borderRadius:'30px',
  },
  btnCon:{
    width:'350px',
    margin:'0px auto 20px auto'
  },
  labelBtn:{
    top:'5px',
    fontWeight:'bold'
  }
}
const SignUpFb = React.createClass({
  getInitialState(){
    return{}
  },

  render(){
    return(
      <Box>
        <Head >You already have an account</Head>
        <Text className='sans-font' style={{marginBottom:'0px'}}>
          <span style={{color:'#222'}}>aommoney@likemeasia.com </span>is signed up<br/>
          with Infographic Thailand by Facebook.<br/>
          Do you want to continue log in with this account?
        </Text>
        <div style={{width:'70px',margin:'40px auto 20px auto'}}><Avatar src='/tmp/avatar.png' size={70}/></div>
        <Text className='sans-font' style={{color:"#222",margin:'30px'}}>Ochawin Chirasottikul</Text>
        <div style={styles.btnCon}>
          <a href={config.BACKURL+'/auth/facebook?publisher='+config.PID+'&nextpathname='+encodeURIComponent(this.props.nextPathname)}>
            <RaisedButton
              label="Sign Up with facebook"
              labelPosition="after"
              labelColor='white'
              labelStyle={styles.labelBtn}
              icon={<i className="fa fa-facebook" style={{color:'white',margin:'10px 10px 0 0',fontSize:'24px'}} aria-hidden="true"></i>}
              style={styles.button}
              buttonStyle={styles.btn}
            />
          </a>  
        </div>
      </Box>
    )
  }
})



export default SignUpFb 