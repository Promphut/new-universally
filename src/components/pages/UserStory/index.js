import React from 'react'
import { TopBarWithNavigation,ArticleBox,ArticleBoxLarge,More,TrendingSideBar,BGImg,StoryMenu,EmptyStory } from 'components'
import {findDOMNode as dom} from 'react-dom'
import {Link, browserHistory, History} from 'react-router'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
//import Request from 'superagent'
import Avatar from 'material-ui/Avatar'
import auth from 'components/auth'
import api from 'components/api'
import Infinite from 'react-infinite'
import CircularProgress from 'material-ui/CircularProgress'
import {Helmet} from 'react-helmet'

const Wrapper = styled.div`

`
const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding: 25px 0 50px 0;
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

const Feed = styled.div`
	flex: 12 1120px;
	max-width: 1120px;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		min-width: 100%;
		padding:0 15px 0 15px;
  }
`

const Aside = styled.div`
	flex: 3 325px;
	position:relative;
	max-width: 325px;
	margin-left:60px;
	@media (max-width: 1160px) {
		display:none;
	}
`

const Text = styled.div`
	color:#8F8F8F;
	font-size:19px;
`

const TextLine = styled.div`
	color:#8F8F8F;
	font-size:19px;
	border-bottom:1px solid #E2E2E2;
	padding-bottom:11px;
`

const User = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding: 80px 0px 15px 0px;

	@media (max-width: 480px) {
		background: -moz-linear-gradient(-45deg,  ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%); /* FF3.6-15 */
		background: -webkit-linear-gradient(-45deg,  ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%); /* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(135deg,  ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\#bf00b2b4\, endColorstr=\#bfcef1b7\,GradientType=1 ); /* IE6-9 fallback on horizontal gradient */

		padding-top: 60px;
		padding: 60px 0px 0px 0px;
	}
`

const UserAvatar = styled(Avatar)`
	margin-right: 20px;
	float: left;

	@media (max-width: 480px) {
		height: 80px !important;
		width: 80px !important;
		float: none;
		border: 2px solid #FFF;
		margin-right: 0px;
	}
`

const UserData = styled.div`
	float: left;

	@media (max-width: 480px) {
		float: none;
	}
`

const UserName = styled.div`
  color:#000;
  font-size:26px;
  font-weight:bold;

	@media (max-width: 480px) {
		display: flex;
		justify-content: center;
	  color: #FFF;
		margin: 10px 0px;
		font-weight: normal;
	}
`

const UserDesc = styled.div`
  color: #8F8F8F;
  margin: 10px 10px 0px;
  font-size: 16px;
  width: 220px;

	@media (max-width: 480px) {
		flex: 1;
		justify-content: center;
		width: auto;
	  color: #C2C2C2;
		textAlign: center;
	}
`

const UserShare = styled.div`
	float: right;
	width: 225px;
	margin-top: 10px;

	@media (max-width: 480px) {
		display: none;
	}
`

const UserShareMobile = styled.div`
	overflow:'hidden'
	display: none;

	@media (max-width: 480px) {
		display: flex;
		justify-content: center;
		marginTop: 20px;
	}
`

const Onload = styled.div`
	width:100%;
	height:70px;
	margin:50px 0 50px 0;
`

const A = styled.a`
	margin: 0 20px;
	textAlign: center;
	color: #c2c2c2;
	cursor: pointer;
`

const LinkMobile = styled.a`
	textAlign: center;
	color: #C2C2C2;
	cursor: pointer;
	width: 50px;
	font-size: 20px;
`

const UserDetail = ({style, user, checkBack}) => {
	const backStyle = {
		color: '#FFF',
		fontSize: '40px',
		position: 'absolute',
		top: '10px',
		left: '5px'
	}

	const rowStyle = {
		...style,
		margin: '50px 0 20px 0',
		display: 'block',
		overflow: 'hidden',
		maxWidth: '730px',
		flex: '8 730px'
	}
	//console.log('user', user)
  	return (
		<User>
	    <div className='row' style={rowStyle}>
			<Link to='#' onClick={checkBack}>
				<FontIcon className="material-icons hidden-des" style={backStyle}>chevron_left</FontIcon>
			</Link>
			<div style={{textAlign: 'center'}}>
      			<UserAvatar src={user.pic.medium} size={95}/>
			</div>
			<UserData>
	        	<UserName className='serif-font'>{user.display}</UserName>
	      	  	<UserDesc className='sans-font'>{user.intro}</UserDesc>
	      	</UserData>

		    {user.channels && <UserShare>
		        {/*<div className='row' style={{overflow:'hidden', textAlign: 'right'}}>*/}
		        <div style={{textAlign:'right'}}>
		          {user.channels.fb && <A href={getFbUrl(user.channels.fb)} target="_blank"><i className="fa fa-facebook" aria-hidden="true"></i></A>}
		          {user.channels.twt && <A href={getTwtUrl(user.channels.twt)} target="_blank"><i className="fa fa-twitter" aria-hidden="true" ></i></A>}
		          {user.channels.yt && <A href={getYtUrl(user.channels.yt)} target="_blank"><i className="fa fa-youtube-play" aria-hidden="true" ></i></A>}
		          {user.channels.ig && <A href={getIgUrl(user.channels.ig)} target="_blank"><i className="fa fa-instagram" aria-hidden="true" ></i></A>}
		        </div>
		    </UserShare>}
	    </div>
		</User>
  	)
}

const UserStory = React.createClass({
	getInitialState(){
		return {
			//feed:[],
			feedCount: 0,
			latestStories:[],
			page:0,
			isInfiniteLoading: true,
			loadOffset:300,
			feedCount:0,
			isMobile:false
		}
	},

	componentDidMount(){
		this.handleInfiniteLoad()
	},

	buildElements() {
		let page = this.state.page
		let uid = this.props.params.user ? this.props.params.user._id : null

		if(page!=null && uid!=null){
			api.getFeed('story', {writer:uid, status:1}, 'latest', null, page, 10)
			.then(result => {
				//console.log('api.getFeed', result)
				var s = this.state.latestStories.concat(result.feed)
				if(s.length==result.count['1']){
					this.setState({
						feedCount:result.count['1'] || 0,
						latestStories:s,

						loadOffset:'undefined',
						isInfiniteLoading: false
					})
				} else {
					this.setState({
						feedCount:result.count['1'] || 0,
						latestStories:s,

						isInfiniteLoading: false
					})
				}
			})
		}
	},

	handleInfiniteLoad() {
		//console.log('Onload')
		this.buildElements(this.state.page)
		this.setState({
				isInfiniteLoading: true,
				page:this.state.page+1
		});
	},

	elementInfiniteLoad() {
			return <Onload><div className='row'><CircularProgress size={60} thickness={6} style={{width:'60px',margin:'0 auto 0 auto'}}/></div></Onload>;
	},

	checkBack(e){
		e.preventDefault()
		browserHistory.goBack()
	},

	render(){
  	let {theme, keywords, channels} = this.context.setting.publisher
		//console.log('user', this.props)
		//var article = []
		let {feed, feedCount} = this.state
		let {count,loadOffset,isInfiniteLoading,latestStories,isMobile} = this.state
		let user = this.props.params.user
		// console.log('user', user)

		return (
			<Wrapper>
				<Helmet>
					<title>{user.display}</title>
          <meta name="title" content={user.display} />
          <meta name="keywords" content={keywords} />
          <meta name="description" content={user.shortDesc} />

          <link rel="shortcut icon" type="image/ico" href={config.BACKURL+'/publishers/'+config.PID+'/favicon'} />
          {channels && channels.fb ? <link rel="author" href={getFbUrl(channels.fb)} /> : ''}
          <link rel="canonical" href={window.location.href} />

          <meta property="og:sitename" content={user.display} />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:title" content={user.display} />
          <meta property="og:type" content="article" />
					<meta property="og:image" content={user.pic.medium} />
          <meta property="og:keywords" content={keywords} />
          <meta property="og:description" content={user.shortDesc} />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:image:alt" content={user.display} />
				</Helmet>

				<TopBarWithNavigation className="hidden-mob" title={'Title of AomMoney goes here..'} />
				<UserDetail user={user} checkBack={this.checkBack}/>

				{user.channels && <UserShareMobile className='row'>
		          {user.channels.fb && <LinkMobile href={getFbUrl(user.channels.fb)} target="_blank"><i className="fa fa-facebook" aria-hidden="true"></i></LinkMobile>}
		          {user.channels.twt && <LinkMobile href={getTwtUrl(user.channels.twt)} target="_blank"><i className="fa fa-twitter" aria-hidden="true" ></i></LinkMobile>}
		          {user.channels.yt && <LinkMobile href={getYtUrl(user.channels.yt)} target="_blank"><i className="fa fa-youtube-play" aria-hidden="true" ></i></LinkMobile>}
		          {user.channels.ig && <LinkMobile href={getIgUrl(user.channels.ig)} target="_blank"><i className="fa fa-instagram" aria-hidden="true" ></i></LinkMobile>}
	 			</UserShareMobile>}
		      <Content>
			      {latestStories.length!=0?
						<Main>
							<TextLine className='sans-font'>
								<strong style={{color:theme.primaryColor,marginRight:'30px'}}>
									<span style={{fontSize:'30px'}}>{feedCount}</span> stories
								</strong>
								{/*<span style={{fontSize:'30px'}}>101</span> Upvotes*/}
							</TextLine>
							<Infinite
									containerHeight={!isMobile?(count*210)-100:(count*356)-100}
									elementHeight={!isMobile?210:356}
									infiniteLoadBeginEdgeOffset={loadOffset}
									onInfiniteLoad={this.handleInfiniteLoad}
									loadingSpinnerDelegate={this.elementInfiniteLoad()}
									isInfiniteLoading={isInfiniteLoading}
									useWindowAsScrollContainer={true}>

								{latestStories.length!=0?latestStories.map((story, index) => (
									<ArticleBox detail={story} key={index}/>
								)):''}
							</Infinite>
							<EmptyStory title='Start your story !' description='You haven’t write any stories right now.' />
							<More style={{margin:'30px auto 30px auto'}} />
			      </Main>:
						<Main>
							<TextLine className='sans-font'>
								<strong style={{color:theme.primaryColor,marginRight:'30px'}}>
									<span style={{fontSize:'30px'}}>{feedCount}</span> stories
								</strong>
								{/*<span style={{fontSize:'30px'}}>101</span> Upvotes*/}
							</TextLine>
							 {isInfiniteLoading?<Onload><div className='row'><CircularProgress size={60} thickness={6} style={{width:'60px',margin:'0 auto 0 auto'}}/></div></Onload>:
							<EmptyStory title='No Story, yet' description='There are no stories in this column right now. Wanna back to see other columns?' />}
			      </Main>}
		      </Content>
		   </Wrapper>
		)
	}
});


UserStory.contextTypes = {
	setting: React.PropTypes.object
}

export default UserStory
