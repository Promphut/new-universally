import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import { findDOMNode as dom } from 'react-dom'
import utils from '../../../services/utils'
import find from 'lodash/find'

const Container = styled.div`
  position:fixed;
  width:100%;
  height:100%;
  top:0;
  left:0;
	animation: ${props => (props.open ? displayBlock : displayNone)} 0.5s forwards;
  transform: translateZ(100px);
  @media (max-width:480px){
    width: 100vw;
  }
`

const Container2 = styled.div`
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  z-index:10;
  background:rgba(0,0,0,0.8);
  animation: ${props => (props.open ? fadeOut : fadeIn)} 0.5s forwards;
  transform: translateZ(100px);
  @media (max-width:480px){
    width: 100vw;
  }
`

const displayNone = keyframes`
  from {
    opacity:1;
		z-index:20;
  }
  to {
    opacity:0;
		z-index:-20;
  }
`

const displayBlock = keyframes`
  from {
    opacity:0;
		z-index:-20;
  }
  to {
    opacity:1;
		z-index:20;
  }
`

const slideOut = keyframes`
	from {
    transform: translateX(-100%);
    opacity:0;
  }
  to {
    transform: translateX(0%);
    opacity:1;
  }
`
const slideIn = keyframes`
	from {
    transform: translateX(0%);
    opacity:1;
  }
  to {
    transform: translateX(-100%);
    opacity:0;
  }
`

const fadeIn = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`

const fadeOut = keyframes`
  from {
    opacity:1;
  }
  to {
    opacity:0;
  }
`

const Nav = styled.nav`
	position: relative;
	top: 0;
	left:0;
	height: 100%;
	width: 400px;
	overflow-x: hidden;
	overflow-y: auto;
	// padding: 40px;
	-webkit-overflow-scrolling: touch;
	z-index:11;
  animation: ${props => (props.open ? slideOut : slideIn)} 0.6s forwards;

	background: -moz-linear-gradient(-45deg,  ${props => props.theme.primaryColor} 0%, ${props => props.theme.secondaryColor} 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(-45deg,  ${props => props.theme.primaryColor} 0%, ${props => props.theme.secondaryColor} 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(135deg,  ${props => props.theme.primaryColor} 0%, ${props => props.theme.secondaryColor} 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\#bf00b2b4\, endColorstr=\#bfcef1b7\,GradientType=1 ); /* IE6-9 fallback on horizontal gradient */

	& ul {
		// margin: 70px 60px 0 60px;
		margin: 70px 40px;
    padding: 0px;
		list-style-type:none;
		font-size: 24px;
	}

	& ul li {
		padding: 10px;
		color: White;
	}

	& ul li > * {
		display: inline-block;
		vertical-align: middle;
	}

	& ul li a {
		text-decoration:none
		color:#FFF;
    transition: .2s;

    &:hover {
      color: ${props => props.theme.accentColor} !important;
    }
	}

	& ul hr {
		margin: 20px 0 !important;
		background-color: #e2e2e2 !important;
	}

  & ul li .arrow {
		font-size: 32px !important;
		line-height: 40px;
		vertical-align: middle;
		margin-left: 125px !important;
	}

  & ul li .arrow.toggleUp {
    transform: rotate(0deg);
    transition-duration: 1s;
  }

  & ul li .arrow.toggleDown {
    transform: rotate(-180deg);
    transition-duration: 1s;
  }

  @media (max-width:480px){
    width: 100vw;
    & ul li .arrow {
      font-size: 28px !important;
      line-height: 40px;
      vertical-align: middle;
      margin-left: 70px !important;
    }
    & ul {
      font-size: 20px;
    }

  }
`

const CloseBtn = styled(IconButton)`
	top: 20px;
	right: 20px;
	position: absolute !important;

	& .material-icons {
		width: 30px;
		height: 30px;
		color: #e2e2e2 !important;

    &:hover {
      color: ${props => props.theme.accentColor} !important;
    }
	}
`

const MiniMenu = styled.div`
  // position:relative;
  // top:0;
  // left:0;
  // width:70px;
  // height:100%;
  height: ${props => props.height};
  overflow: hidden;
  transition: height 0.5s;
  margin-left: 40px !important;
  font-size: 24px;
  @media (max-width:480px){
    font-size: 20px;
  }
`

const SearchBtn = styled(IconButton)`
	top: 20px;
	right: 20px;
	position: absolute !important;

	& .material-icons {
		width: 30px;
		height: 30px;
		color: #e2e2e2 !important;
	}
`

const DropDownListLink = styled.a`
  font-size:40px;
  @media (max-width:480px){
    font-size:32px;
  }

  > span {
    color: white !important;
    transition: .2s;
  }
  &:hover {
    > span {
      color: ${props => props.theme.accentColor} !important;
    }
  }
`

class LeftMenu extends React.Component {
	static contextTypes = {
		setting: PropTypes.object
	}

	constructor(props) {
		super(props)

		this.state = {
			open: props.open,
			miniMenu: false,
			toggleArrow: 'toggleUp',
			height: 0,
			display:'none'
		}
		//console.log('STATE0', this.state)
	}

	shrinkDrawer = e => {
		e.preventDefault()

		//console.log('STATE', this.state)

		this.setState({
			miniMenu: !this.state.miniMenu
		})

		let { toggleArrow } = this.state
		if (this.state.toggleArrow === 'toggleUp') {
			this.state.toggleArrow = 'toggleDown'
		} else {
			this.state.toggleArrow = 'toggleUp'
		}

		let menu = this.props.menu
		let height =
			((menu && menu.column ? menu.column : []).length + 1) *
			(utils.isMobile() ? 50 : 55)
		this.state.height = this.state.miniMenu ? 0 : height
	}

	componentWillReceiveProps(nextProps) {
		var self = this
		if(nextProps.open!=this.props.open){
			if(!nextProps.open){
				setTimeout(function() {
					self.setState({display:'none'})
				}, 500);
			}else{
					this.setState({display:'block'})
			}
		}
		if (utils.isMobile()) {
			let menu = this.props.menu
			let height =
				((menu && menu.column ? menu.column : []).length + 1) *
				(utils.isMobile() ? 50 : 55)
			this.state.height = this.state.miniMenu ? 0 : height

			this.setState({
				miniMenu: true,
				toggleArrow: 'toggleDown',
				height: height
			})
		}
	}

	pushItem = (items, index, item) => {
		items.push(
			<li key={index}>
				<Link
					to="#"
					onClick={e => this.props.closeAndLink(e, '/stories/' + item.slug)}>
					{item.name}
				</Link>
			</li>
		)
		return items
	}

	render() {
		let isMobile = false

		let { theme } = this.context.setting.publisher
		let { miniMenu, toggleArrow, height,display } = this.state
		let { open, close, menu } = this.props
		let cols = menu && menu.column ? menu.column : []

		// Menu items from menu props
		let items = []
		const news = find(cols, { slug: 'news' })
		if (news) this.pushItem(items, 0, news)
		for (let i = 0; i < cols.length; i++)
			if (cols[i].slug != 'news') this.pushItem(items, i + 1, cols[i])

		if (utils.isMobile()) {
			isMobile = true
		}

		return (
			<Container open={open} style={{display:display}}>
				<Container2 onClick={close} />
				<Nav open={open}>
					<div className="menu menu-font">
						<CloseBtn onClick={close}>
							<FontIcon className="material-icons">close</FontIcon>
						</CloseBtn>
						{/* <SearchBtn onTouchTap={this.onSearch}><FontIcon className="material-icons">search</FontIcon></SearchBtn>*/}
						<ul>
							{isMobile &&
								<div>
									<li>
										<DropDownListLink href="#" onClick={this.shrinkDrawer}>
											Stories
											<FontIcon
												className={'material-icons arrow ' + toggleArrow}>
												keyboard_arrow_down
											</FontIcon>
										</DropDownListLink>
									</li>
									<MiniMenu height={height + 'px'}>
										{items}
										{/*The last one is 'all columns'*/}
										<li key={999}>
											<Link to={'/stories/columns'}>All Columns</Link>
										</li>
									</MiniMenu>
									<Divider />
								</div>}
							<li><Link to="/" onClick={close}>Home</Link></li>
							<li><Link to="/about" onClick={close}>About Us</Link></li>
							{!isMobile &&
								<div>
									<Divider />
									<li>
										<DropDownListLink href="#" onClick={this.shrinkDrawer}>
											Stories
											<FontIcon
												className={'material-icons arrow ' + toggleArrow}>
												keyboard_arrow_down
											</FontIcon>
										</DropDownListLink>
									</li>
									<MiniMenu height={height + 'px'}>
										{items}
										{/*The last one is 'all columns'*/}
										<li key={999}>
											<Link to={'/stories/columns'}>All Columns</Link>
										</li>
									</MiniMenu>
									<Divider />
								</div>}
							<li><Link to="/contact" onClick={close}>Contact</Link></li>
							{/*<Divider />
              <li><em style={{color:'#e2e2e2', fontSize:'18px'}}>Other Channels</em></li>
              <li><Link to="/">Infographic Thailand</Link></li>*/}
						</ul>
					</div>
				</Nav>
				<svg>
					<filter id="blur" width="110%" height="110%">
						<feGaussianBlur in="SourceAlpha" stdDeviation="1.7" result="blur" />
						<g id="rect">
							<rect
								x="10"
								y="30"
								width="40"
								height="40"
								stroke="black"
								strokeWidth="2"
							/>
						</g>
					</filter>
				</svg>
			</Container>
		)
	}
}

export default LeftMenu
