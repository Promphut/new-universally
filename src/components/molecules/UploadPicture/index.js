import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {findDOMNode as dom} from 'react-dom'
//import Request from 'superagent'
import api from 'components/api'
import auth from 'components/auth'
import Cropper from 'react-cropper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {PrimaryButton} from 'components'
import 'cropperjs/dist/cropper.css';
const Container = styled.form`
  min-width:50px;
  min-height:50px;
`

const Box = styled.div`
  min-width:50px;
  min-height:50px;
  position:relative;
  top:0px;
  left:0px;
  width:${props => props.width}px;
  height:${props => props.height}px;
  border-radius:10px;
  border:1px dashed #C2C2C2;
  background-color:#F4F4F4;
  text-align:center;
  font-size:14px;
  color:${props=> props.theme.accentColor};
  &:hover{
    cursor:pointer;
    text-decoration:underline;
  }
`

const Des = styled.div`
  color:#C2C2C2;
  font-size:14px;
  font-style:italic;
` 

const Preview = styled.div`
  position:relative;
  top:0px;
  left:0px;
  width:${props => props.width}px;
  height:${props => props.height}px;
  font-size:14px;
  background-size:cover;
  background-position:center;
  color:#fff;
  &:hover{
    cursor:pointer;
    text-decoration:underline;
  }
`

const Filter = styled.div`
  position:relative;
  top:0px;
  left:0px;
  width:${props => props.width}px;
  height:${props => props.height}px;
  background:rgba(0,0,0,0.3);
  text-align:center;
  font-size:14px;
  color:#fff;
  &:hover{
    cursor:pointer;
    text-decoration:underline;
  }
`

const Label = styled.span`
  position:relative;
  font-size:14px;
  color:${props=> props.theme.accentColor};
`

const UploadPicture = React.createClass({
  getDefaultProps() {
      return {
          width: 120,
          height:120,
          size:'120x120',
          ratio:1
      };
  },
  getInitialState(){
    this.maxMB = this.props.maxMB ? parseFloat(this.props.maxMB) : 5
		this.allowTypes = this.props.allowTypes || '|jpg|png|jpeg|gif|svg+xml|'
    
    return {
      statePreview:this.props.src==null?false:true,
      preview: null, 
      //file: '', 
			msg: this.props.size,
      err:false,
      open:false,
      data:{},
      previewUrl:''
    }
  },

  componentWillReceiveProps(nextProps){
    if(nextProps.src!=this.props.src && nextProps.src!=null){
      this.setState({
        statePreview:true
      })
    }
  },

  isFiletypeValid(file){
		let type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
		var fileTypeValid = this.allowTypes.indexOf(type) !== -1
		return fileTypeValid
	},

	isFilesizeValid(file){
		return file.size <= this.maxMB*1000000
	},

  upload(e){
    var reader = new FileReader();
    var file = e.target.files[0]
    this.file = file
    if(!file) return
    if(!this.isFiletypeValid(file)){
			this.setState({
				msg: 'File type invalid.',
				//file: file,
        err:true
			})
			return
		}
		
		if(!this.isFilesizeValid(file)) {
			this.setState({
				msg: 'File size couldn\'t allowed exceed '+this.maxMB+' MB',
				//file: file,
        err:true
			})
			return
		}

    reader.onload = (event)=>{

    }

    reader.onloadend = (event) => {
      this.setState({
        statePreview:true,
        //src:event.target.result
        preview: reader.result,
        open:true
      })
      // api.uploadFile(file, this.props.type, config.BACKURL + this.props.path)
    	// .then(res => {
      //   this.setState({
      //     msg: 'Upload Completed!',
      //     err: false
      //   })
      // })
      // .catch(err => {
      //   this.setState({
      //     msg: err.message,
      //     err: true
      //   })
      // })
    }      
    reader.readAsDataURL(file);     
  },

  _crop(){
		// image in dataUrl
		this.setState({data:this.refs.cropper.getData(),previewUrl:this.refs.cropper.getCroppedCanvas().toDataURL()})
		//console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
	},

  handleOpen(){
    this.setState({open: true});
  },

  handleClose(){
    this.setState({open: false});
  },

  uploadToServer(){
    //console.log(this.state.data)
    api.uploadFile(this.file, this.props.type, config.BACKURL + this.props.path,this.state.data)
    .then(res => {
      this.setState({
        open: false,
        msg: 'Upload Completed!',
        err: false
      })
    })
    .catch(err => {
      this.setState({
        open: false,
        msg: err.message,
        err: true
      })
    })
  },


  render(){
    
    var {msg,statePreview,err,preview,previewUrl} = this.state
    var {label,style,type,width,height,labelStyle,src,id} = this.props
    var {theme} = this.context.setting.publisher
    
    //console.log('src', src)
    //console.log(msg)
    var description = <Des className='sans-font'>{msg}</Des>
    const actions = [
      <FlatButton
        label="Choose another .."
        labelStyle={{textDecoration:'underline'}}
        primary={true}
        onClick={()=>(dom(this.refs.imageLoader).click())}
        style={{marginRight:'40px'}}
      />,
      <PrimaryButton
        label="Confirm"
        onClick={this.uploadToServer}
      />,
    ];
    return(
      <Container encType="multipart/form-data" style={{...style,width:width,height:height+20+'px'}}>
        <Dialog
          actions={actions}
          modal={true}
          actionsContainerStyle={{padding:'0px 50px 50px 50px'}}
          contentStyle={{width:'auto',padding:'40px'}}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Cropper
						ref='cropper'
						src={preview}
						style={{height: 400, width:574,margin:'30px auto 30px auto'}}
						// Cropper.js options
						aspectRatio={this.props.ratio}
						guides={false}
            viewMode={1}
						crop={this._crop} />
        </Dialog>
        {!statePreview&&<Box width={width} height={height} className="menu-font" id={id} onClick={()=>(dom(this.refs.imageLoader).click())}><Label style={{...labelStyle}}>{label?label:"Upload Picture"}</Label></Box>}
        <Preview width={width} height={height} ref='preview' style={{display:statePreview?'block':'none',backgroundImage:'url('+(previewUrl || src)+')'}}>
          <Filter width={width} height={height} onClick={()=>(dom(this.refs.imageLoader).click())} ><Label style={{...labelStyle,color:'#fff'}}>Edit</Label></Filter>
        </Preview>
        <Des className='sans-font' style={{color:err?'#D8000C':'#c2c2c2'}}>{msg}</Des>
        <input type="file" ref="imageLoader" name="imageLoader" onChange={this.upload} style={{visibility:'hidden'}}/>
      </Container>
    )
  }
})

UploadPicture.propTypes = {
  style: PropTypes.object,
  labelStyle: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  label: PropTypes.string,
  type: PropTypes.string,
  src: PropTypes.string,
  path: PropTypes.string,
  size:PropTypes.string,
  ratio:PropTypes.number
}
UploadPicture.contextTypes = {
	setting: React.PropTypes.object
};
export default UploadPicture;