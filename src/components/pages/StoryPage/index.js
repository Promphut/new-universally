import React from 'react'
import { PageTemplate, TopBarWithNavigation, StoryDetail, RecommendArticle, TrendingSideBar,
	 Stick,ShareSideBar, BGImg} from 'components'
import {Link} from 'react-router'
import styled from 'styled-components'
import {findDOMNode as dom} from 'react-dom'
import api from 'components/api'
import  { StickyContainer, Sticky }  from 'react-sticky'

const Wrapper = styled.div`
	.recommends{
		font-size:19px;
		color:#8F8F8F;
	}
	 .hidden-des{
	  	display:none;
	  }
	@media(max-width:480px){
	 .hidden-des{
	  	display:block;
	  }
    .center{
      justify-content: center;
    }
		.recommends{
			font-size:16px;
		}
  }
	p {
    font-family: 'PT Sans', 'cs_prajad', sans-serif;
    font-size: 18px;
  }
  h2 {
    font-size: 28px;
    font-weight:bold;
    color:#222;
  }
  h3 {
    font-size: 20px;
    font-weight:normal;
    color:#bfbfbf;
  }
  blockquote {
    font-size: 20px;
    font-family: 'PT Serif', 'Mitr';
    font-weight:normal;
    color:#222;
    border-left: 1px solid #E2E2E2;
    padding-left:20px;
    display:inline-block;
  }
  .hidden-des{
  	display:none;
  }
`

const GradientOverlay = styled.div`
	background: -moz-linear-gradient(-45deg,  rgba(202,130,172,0.3) 0%, rgba(49,77,170,0.3) 100%);
	background: -webkit-linear-gradient(-45deg,  rgba(202,130,172,0.3) 0%,rgba(49,77,170,0.3) 100%);
	background: linear-gradient(135deg,  rgba(202,130,172,0.3) 0%,rgba(49,77,170,0.3) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4dca82ac', endColorstr='#4d314daa',GradientType=1 );

	bottom:0;
	top:0; left:0;
	right:0;
	position:absolute;
	z-index:0
`

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
`

const Share = styled.div`
	flex: 1 150px;
	position:relative;
	max-width: 150px;
	margin:150px 10px 0 0;
	@media (max-width: 1160px) {
		display:none;
	}
`

const Main = styled.div`
	flex: 8 730px;
	max-width: 730px;
	@media (max-width: 480px) {
		flex:0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
	}
`

const Aside = styled.div`
	flex: 3 325px;
	position:relative;
	max-width: 325px;
	margin:150px 10px 0 60px;
	@media (max-width: 1160px) {
		display:none;
	}
`

const RecommendContainer = styled.div`
	flex:12 1160px;
	max-width:1160px;
	margin-top:60px;
	@media (max-width: 480px) {
		flex:0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
	}
`

const Recommend = styled.div`
	flex:1 540px;
	max-width:540px;
	margin:10px 20px 0 0;
`

// const rec = {
// 	name:'Donald Trump’s First, Alarming Week',
// 	column:'Money Ideas',
// 	writer:'RYAN LIZZA',
// 	vote:'18',
// 	comment:'3'
// }

const StoryPage = React.createClass({
	getInitialState(){
		this.story = this.props.params.story

		return {
			refresh: 0,

			stopPos:'',
			recommends: [] 	// trending stories
		}
	},

	componentWillReceiveProps(nextProps){
		if(nextProps.params.story){
			this.story = nextProps.params.story

			this.setState({refresh: Math.random()})
			//console.log('componentWillReceiveProps', this.story)
		}
	},

	componentDidMount(){
		this.getRecommendStories()
	},

	getRecommendStories(){
		if(this.story.column){
			// Get recommend from column
			let cid = this.story.column._id

			api.getFeed('story', {status:1, column:cid}, 'latest', null, 0, 4)
			.then(result => {
				//console.log('feed', result.feed.length)
				this.setState({
					recommends: result.feed,
				})
			})
		} else {
			// If no column presented, use writer instead
			let uid = this.story.writer._id

			api.getFeed('story', {status:1, writer:uid}, 'latest', null, 0, 4)
			.then(result => {
				//console.log('feed', result.feed.length)
				this.setState({
					recommends: result.feed,
				})
			})
		}

	},

	render(){
		let {stopPos, recommends} = this.state
		//console.log('render', this.story)

		let list = []
		for(let i=0; i<recommends.length; i++){
			list.push(
				<div className='col-lg-6 col-md-6 col-sm-12'>
					<RecommendArticle detail={recommends[i]}/>
				</div>
			)
		}

		return (
		    <Wrapper >
		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} article={this.story.title}/>

		      <BGImg style={{width:'100%',height:'80vh'}} src={this.story.cover.large || this.story.cover.medium} className='hidden-mob'/>
		      <BGImg style={{width:'100%',height:'80vh'}} src={this.story.coverMobile.large || this.story.coverMobile.medium} className='hidden-des'/>

		      <Content>
					<Share ref='share' style={{zIndex:'50'}}>
						<Stick topOffset={60}>
							<ShareSideBar/>
						</Stick>
					</Share>

					<Main>
						<StoryDetail story={this.story}/>
			    </Main>

			      	<Aside  id='trendingBar' ref='trendingBar'>
						<Stick topOffset={60} style={{zIndex:'50'}}>
							<TrendingSideBar />
						</Stick>
					</Aside>
		      </Content>

				<Content>
					<RecommendContainer ref='recommend'>
						<div className='recommends sans-font'>Recommends</div>
						<div className='row center'>
							{list}
						</div>
					</RecommendContainer>
				</Content>
		   </Wrapper>
		  )
	}
});

export default StoryPage;
