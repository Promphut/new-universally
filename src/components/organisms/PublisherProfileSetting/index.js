import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import TextField from 'material-ui/TextField';
//import Request from 'superagent'
import auth from 'components/auth'
import api from 'components/api'
import utils from 'components/utils'

const Container = styled.form`
  width:100%;
  padding:80px;
  border-bottom:1px solid #E2E2E2;
  .textTitle{
    color:#C2C2C2;
    font-family:'PT Sas';
    font-size:17px;
  }
  .head{
    color:#C2C2C2;
    font-family:'Nunito';
    font-size:18px;
  }
`

const Flex = styled.div`
  display:flex;
  items-align:center;
  flex-flow: row wrap;
  margin:50px 0 0 50px;
`

const Title = styled.div`
  flex:2 150px;
  max-width:150px;
  color:#C2C2C2;
  font-size:17px;
  padding-top:15px;
`

const Edit = styled.div`
  flex:6 450px;
  max-width:450px;
`

const Social = styled.div`
  color:#8F8F8F;
  font-size:19px;
  overflow:hidden;
`

const TextStatus = styled.div`
  color:#00B2B4;
  font-size:15px;
  font-style:italic;
  float:left;
  margin:10px 0 0 15px;
` 

const PublisherProfileSetting = React.createClass({
  getInitialState(){
    //console.log('INIT', this.props.publisher)
    return {
      publisher: {
        channels: {
          fb:'',
          twt:'',
          ig:'',
          ty:''
        },
        name:'',
        shortDesc:'',
        cover: {
          medium: ''
        }
      },

      error:false,
      textStatus:'Unsave',
      //uploadPhoto:null
    }
  },

  componentWillReceiveProps(nextProps){
    this.publisher = _.cloneDeep(nextProps.publisher) // saved for reset

    this.setState({
      publisher: nextProps.publisher
    })
  },

  publisherChanged(e){
    const name = e.target.name
    let pub = _.cloneDeep(this.state.publisher)
    utils.set(pub, name, e.target.value)
    //console.log('publisherChanged', pub, name, e.target.value)
    this.setState({
      publisher: pub
    })
  },

  updatePublisher(e){
    if(e) e.preventDefault()

    api.updatePublisher(this.state.publisher)
    .then(pub => {
      this.publisher = pub

      this.setState({
        textStatus:'Saved successfully',
        error:false
      })
    })
    .catch(err => {
      this.setState({
        textStatus:res.body.error.message,
        error:true
      })
    })
  },

  resetDate(e){
    if(e) e.preventDefault()

    this.setState({
      publisher: this.publisher
    })
  },

  render(){
    let {textStatus,error} = this.state
    let pub = this.state.publisher 
    //console.log('render', pub)
    return (
      <Container onSubmit={this.updatePublisher}>
        <div  className="head sans-font">PROFILE</div>
        <Flex>
          <Title>
            <div className="sans-font">Title</div>
          </Title>
          <Edit>
            <TextField 
              value={pub.name}
              name='name'
              onChange={this.publisherChanged}
            />

          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Tagline</div>
          </Title>
          <Edit>
            <TextField
              value={pub.shortDesc}
              multiLine={true}
              fullWidth={true}
              floatingLabelText="80 characters"
              floatingLabelFixed={true}
              rows={1}
              rowsMax={10}
              name='shortDesc'
              onChange={this.publisherChanged}
            />
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Cover picture</div>
          </Title>
          <Edit>
            <UploadPicture src={pub.cover.medium} path={'/publishers/'+config.PID+'/cover'} type='cover' width='200px' height='90px' labelStyle={{top:'35px'}}/>
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Social Channels</div>
          </Title>
          <Edit>
            <Social className="sans-font">
              <i className="fa fa-facebook" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i> 
              <div style={{float:'left',margin:'15px 20px 0 0'}}>facebook.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} name='channels.fb' value={pub.channels && pub.channels.fb} onChange={this.publisherChanged} />
            </Social>
            <Social className="sans-font">
              <i className="fa fa-twitter" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i> 
              <div style={{float:'left',margin:'15px 20px 0 0'}}>twitter.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} name='channels.twt' value={pub.channels && pub.channels.twt} onChange={this.publisherChanged} />
            </Social>
            <Social className="sans-font">
              <i className="fa fa-instagram" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i> 
              <div style={{float:'left',margin:'15px 20px 0 0'}}>instagram.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} name='channels.ig' value={pub.channels && pub.channels.ig} onChange={this.publisherChanged} />
            </Social>
            <Social className="sans-font">
              <i className="fa fa-youtube-play" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i> 
              <div style={{float:'left',margin:'15px 20px 0 0'}}>youtube.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} name='channels.yt' value={pub.channels && pub.channels.yt} onChange={this.publisherChanged} />
            </Social>
          </Edit>
        </Flex>
        <div className='sans-font' style={{marginTop:'30px'}}><PrimaryButton label='Save' type='submit' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' onClick={this.resetDate} style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus  style={{color:error?'#D8000C':'#00B2B4'}}>{textStatus}</TextStatus></div>
      </Container>
    )
  },
})



export default PublisherProfileSetting