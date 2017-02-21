import React,{Component} from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Editor from 'react-md-editor';
const Container = styled.div`
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
    text-transform:uppercase;
  }
  .MDEditor_editor {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}
.MDEditor_toolbar {
  margin-bottom: 4px;
  margin-top: 4px;
}
.MDEditor_toolbarButton {
  background: #eee;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  margin-right: 4px;
  padding: 10px 0;
  text-align: center;
  vertical-align: middle;
  width: 40px;
  transition: all 180ms;
  -webkit-transition: all 180ms;
}
.MDEditor_toolbarButton:hover,
.MDEditor_toolbarButton:focus {
  background-color: white;
  border-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  outline: none;
  transition: none;
  -webkit-transition: none;
}
.MDEditor_toolbarButton:active,
.MDEditor_toolbarButton--pressed {
  background-color: rgba(0, 0, 0, 0.15);
  border-color: rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
}
.MDEditor_toolbarButton:active:hover,
.MDEditor_toolbarButton--pressed:hover {
  background: rgba(0, 0, 0, 0.2);
}
.MDEditor_toolbarButton_icon {
  display: inline-block;
  height: 16px;
  width: 16px;
}
.MDEditor_toolbarButton_icon > svg {
  height: 16px;
  width: 16px;
}
.MDEditor_toolbarButton_label {
  display: none;
}
.MDEditor_toolbarButton_label-icon {
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  line-height: .9;
  height: 16px;
  text-transform: uppercase;
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
  flex:6 100%;
  max-width:100%;
`

const TextStatus = styled.div`
  color:#00B2B4;
  font-size:15px;
  font-style:italic;
  float:left;
  margin:10px 0 0 15px;
` 
const AddTag = styled.div`
  color:#8F8F8F;
  font-size:16px;
  overflow:hidden;
  margin-top:20px;
  display:inline;
`


const PublisherAbout = React.createClass({
  getInitialState(){
    return{
      textStatus:'Unsave',
      value:1,
      code: "# Markdown"
    }
  },

  handleChange(event, index, value){
    this.setState({value})
  },
  updateCode(newCode){
      this.setState({
          code: newCode
      });
  },

  render(){
    return(
      <Container>
        <div  className="head sans-font">About Us</div>
        <Flex>
          <Edit>
            <Editor value={this.state.code} onChange={this.updateCode} />
          </Edit>
        </Flex>
        <div className='sans-font' style={{marginTop:'30px'}}><PrimaryButton label='Save' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus>{this.state.textStatus}</TextStatus></div>
      </Container>
    )
  },
})



export default PublisherAbout