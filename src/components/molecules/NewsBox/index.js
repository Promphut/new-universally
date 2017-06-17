import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components'
import {BGImg, ShareDropdown} from 'components'
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import moment from 'moment'
import truncate from 'lodash/truncate'

const Container = styled.div`
  width:100%;
  z-index:100;
  overflow:hidden;
  .imgWidth{
    width:254px;
    height:149px;
    float:left;
  }
  .des-hidden{
    display:block;
  }
  @media (min-width:481px) {
    .des-hidden{
      display:none;
    }
  }
  @media (max-width:480px) {
    width:100%;
    padding:10px 0 10px 0;
    margin-left:auto;
    margin-right:auto;
    .mob-hidden{
      display:none;
    }
    .imgWidth{
      float:none;
      width:100%;
      height:175px;
    }
  }
`

const Div = styled.div`
  color:#8F8F8F;
  font-size:13px;
  @media (max-width:480px) {
    font-size:12px;
  }
`

const NameLink = styled(Link)`
  display: block;
  color:#222;
  font-weight:bold;
  font-size:18px;
  transition: .1s;
  white-space: pre-wrap;      /* Webkit */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap;     /* Opera <7 */
  white-space: -o-pre-wrap;   /* Opera 7 */
  word-wrap: break-word;      /* IE */
  @media (max-width:480px) {
    font-size:15px;
  }
  &:hover{
    color:${props=>props.theme.accentColor};
  }
`

const BoxText = styled.div`
  float:left;
  width:750px;
  padding-left:38px;
  border-bottom:1px solid ##C4C4C4;
  @media (max-width:480px) {
    float:none;
    width:100%;
    padding-left:0px;
    margin-top:10px;
  }
`

const Desc = styled.div`
  color:#8E8E8E;
  font-size:14px;

  margin:10px 0 10px 0;
`

const Time = styled.div`
  float:left;
  color:#8F8F8F;
  font-size:12px;
  width:50px;
  text-align:center;
  @media (max-width:480px) {
    text-align:left;
    margin-bottom:10px;
    width:50%;
  }
`

const VerticalTimeline = styled.div`
  width:10px;
  height:200px;
  margin:0 10px 0 10px;
  border-radius:2em;
  background-color:#F4F4F4;
  position:relative;
  z-index:-5;
`

const Doughnut = styled.div`
  margin:0 10px 0 10px;
  border: 3px solid ${props=>props.theme.accentColor};
  border-radius: 50%;
  height:10px;
  width:10px;
`

const Box = styled.div`
  float:left;
  border-bottom:1px solid #C4C4C4;
  padding-bottom:30px;
  @media (max-width:480px) {
    float:none;
    width:100%;
    padding-bottom:10px;
  }
`

const WriterLink = styled(Link)`
  transition: .1s;
`

const NewsBox = ({detail, style, timeline}) => {

    let {ptitle,cover,writer,column,votes,comments,updated,url,readTime,contentShort,published} = detail
    //console.log(detail)
    return (
      <Container style={{...style}}>
        <Time className='hidden-mob' style={{display:timeline?'block':'none'}}>{moment(published).fromNow()}</Time>
        <div className='hidden-mob' style={{float:'left',marginRight:'10px',visibility:timeline?'show':'hidden'}}>
          <Doughnut/>
          <VerticalTimeline/>
        </div>
        <Box>
          <ShareDropdown url={url} className='hidden-des'/>
          <Time className='hidden-des' style={{display:timeline?'block':'none'}}>{moment(published).fromNow()}</Time>
          <BGImg url={url} src={cover.small || cover.medium} alt={ptitle || ''} className='imgWidth ' />
          <BoxText>
            <ShareDropdown url={url} className='hidden-mob'/>
            <NameLink to={url} className='nunito-font' >{ptitle}</NameLink>
            <Desc className='nunito-font'>{truncate(contentShort, {
                'length': 200,
                'separator': ''
              })}</Desc>
            <Desc className='nunito-font'>by <strong><WriterLink to={writer&&writer.url}>{writer&&writer.display}</WriterLink></strong></Desc>
          </BoxText>
        </Box>
      </Container>
    )
}

export default NewsBox;
