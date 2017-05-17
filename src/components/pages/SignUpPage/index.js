import React from 'react'
import {SignUp,SignUpFb,LogoLink,BackButton,CloseButton} from 'components'
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Wrapper = styled.div`
	width:100%;
  height:100%;
  position:absolute;
  background: ${props=> props.theme.primaryColor};
  background: -moz-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: -webkit-gradient(left top, right bottom, color-stop(0%, ${props=> props.theme.primaryColor}), color-stop(100%, ${props=> props.theme.secondaryColor} ));
  background: -webkit-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: -o-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: -ms-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: linear-gradient(135deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00b2b4', endColorstr='#cef1b7', GradientType=1 );
  @media (max-width:480px) {
    background:${props=>props.page?'':'white'};
    height: 100vh;
  }
`

const Modal = styled.div`
  width:100%;
  height:100%;
  position:absolute;
  background:rgba(0,0,0,0.6)
`

const Container = styled.div`
  margin:7% auto 0 auto;
  width:477px;
  @media (max-width:480px) {
    width: 100vw;
		height: 100vh;
  }
`

const BoxButton= styled.div`
  overflow:hidden;
  width:100%;

`

class SignUpPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      statePage:true,
      visible:props.visible
    }
  }

  changeStatePage = (e) => {
    e.preventDefault()

    this.setState({
      statePage:!this.state.statePage
    })
  }

  checkBack = (e) => {
    e.preventDefault()

    if(this.state.statePage){
      this.props.history.goBack()

    }else{
      this.setState({
        statePage:!this.state.statePage
      })
    }
  }

  closeModal = (e) => {
    this.setState({
      visible:!this.state.visible
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.visible!=this.props.visible){
      this.setState({
        visible:nextProps.visible
      })
    }
  }

  render(){
    let {statePage} = this.state

    let styles={}
    if(!this.state.visible) 
      styles={display:'none'}

    if(!this.props.modal){
      return (
        <Wrapper style={{...styles}} page={statePage}>
          <Container>
            <div style={{margin:'0 auto 15px auto',width:'146px'}}>
              <LogoLink className='hidden-des' fill={statePage?'#E2E2E2':''}/>
              <LogoLink className='hidden-mob' fill='#E2E2E2'/>
            </div>
            <BoxButton>
              <a href='#' onClick={this.checkBack} className='hidden-mob'>
                <BackButton style={{float:'left'}} />
              </a>
              <a href='#' onClick={this.checkBack} className='hidden-des'>
                <BackButton style={{float:'left'}}  labelStyle={{color:statePage?'#E2E2E2':'#00b2b4'}}/>
              </a>
            </BoxButton>
            {statePage?<SignUpFb emailSignUp={this.changeStatePage}/>:<SignUp onClick={this.signup}/>}
          </Container>
       </Wrapper>
      )
    }else{
      return (
        <Modal style={{...styles}}>
          <Container>
            <div  style={{margin:'0 auto 15px auto',width:'146px'}}><LogoLink fill='#E2E2E2'/></div>
            <BoxButton>
              <a href='#' onClick={this.checkBack} ><BackButton style={{float:'left'}}/></a>
              <CloseButton onClick={this.closeModal} style={{float:'right',paddingTop:'0px'}}/>
            </BoxButton>
            {statePage?<SignUpFb emailSignUp={this.changeStatePage}/>:<SignUp/>}
          </Container>
       </Modal>
      )
    }

  }
}

export default SignUpPage
