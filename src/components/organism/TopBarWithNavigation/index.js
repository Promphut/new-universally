import React from 'react'
import PropTypes from 'prop-types'
import {TopBar, TopNavigation, TopBarWithShare, Stick} from 'components'
import auth from 'components/auth'
import api from 'components/api'
import { withRouter } from 'react-router'
import utils from '../../../services/utils'
import truncate from 'lodash/truncate'
import styled,{keyframes} from 'styled-components'

const Title = styled.div`
	color:white;
	font-size:18px;
	font-weight:bold;
	margin:18px 0 0 0;
	animation:${props=>props.show?slideIn:slideOut} 0.5s forwards;
`
const slideIn = keyframes`
	from { opacity:0; }
  to { opacity:1; }
`
const slideOut = keyframes`
	from { opacity:1; }
  to { opacity:0; }
`

class TopBarWithNavigation extends React.Component {
	static contextTypes = {
		setting: PropTypes.object
	}

	static propTypes = {
		title: PropTypes.string
	}

	constructor(props) {
		super(props)

		this.state = {
			scrolling: false,
	    	status: 'LOADING'
		}
	}

	// handleNavbarMouseOver(){
	// 	if (utils.getScrollY() <= 60)
	// 		this.setState({scrolling: true})
	// }

	// handleNavbarMouseOut(){
	// 	if (utils.getScrollY() <= 60)
	// 		this.setState({scrolling: false})
	// }

	handleScroll = (e) => {
		//console.log('HAHAH')
		let top = e.srcElement.body.scrollTop,
			scrolling = this.state.scrolling

		if (top > 60 && !scrolling)
			this.setState({scrolling: true})

		else if (top <= 60 && scrolling)
			this.setState({scrolling: false})
	}

	componentDidMount(){
		// Get from cookie, else get from query
		let token = utils.querystring('token', this.props.location) || auth.getToken()
		//let token = browserHistory.getCurrentLocation().query.token || auth.getToken()
		// let query = parse(this.props.location.search)
		// let token = query && query.token ? query.token : auth.getToken()
		//console.log('TOKEN', this.props.location, token, 'YYY', query.token, 'XXX', auth.getToken())
		// 1. Fetch menu, user, and roles information
		api.getCookieAndToken(token)
		.then(result => {
			//console.log('TopBarWithNavigation', result)
			// 2. Update newly fetch cookie
			auth.setCookieAndToken(result)

			// 3. Set the state to "loggedin" or "unloggedin"
			this.menu = result.menu
			this.user = result.user
			this.roles = result.roles
			//console.log('TopBarWithNavigation', this.menu, this.user, this.roles)

			if(this.user && token)
				this.setState({
					status: 'LOGGEDIN'
				})
			else
				this.setState({
					status: 'UNLOGGEDIN'
				})
		})
	}

	render () {
		let {theme} = this.context.setting.publisher
		let {scrolling, scroll, status} = this.state
		let {title, article, notShowNav, editButton, hasCover,showTitle} = this.props
		let transparent = false
		let articleMobile = false

		// titleText = 'Article'
		let children = ''
		if (article) {
			children = 	<Title show={showTitle} className="nunito-font">{truncate(article, {'length':80,'separator':''})}</Title>
	
			transparent = true
			if (utils.isMobile()) {
				articleMobile = true
			}
		} else if (!notShowNav) {
			children = <TopNavigation menu={this.menu} />
		}
	  	return (
			<Stick className={this.props.className} fixed={(articleMobile && hasCover) ? !scrolling : ''}>
				{articleMobile ?
					<TopBarWithShare
						onScroll={this.handleScroll}
						scrolling={scrolling}
						status={status}
						title={title}
						user={this.user}
						menu={this.menu}
						transparent={transparent}
						editButton={editButton}
						hasCover={hasCover}
					> {children}
					</TopBarWithShare> :
					<TopBar
						onScroll={this.handleScroll}
						scrolling={scrolling}
						status={status}
						title={title}
						user={this.user}
						menu={this.menu}
						transparent={transparent}
						editButton={editButton}
						hasCover={hasCover}
						onLoading={this.props.onLoading}
					> {children}
					</TopBar>
				}
			</Stick>
	  	)
	}
}

export default withRouter(TopBarWithNavigation);