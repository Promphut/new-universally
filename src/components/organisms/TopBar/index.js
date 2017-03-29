import React, {PropTypes} from 'react'
import styled from 'styled-components'
import {Link, browserHistory} from 'react-router'
import Avatar from 'material-ui/Avatar'
import {LogoLink, PrimaryButton, SecondaryButton, LeftMenu, RightMenu} from 'components'
import auth from 'components/auth'
//import utils from 'components/utils'
import FontIcon from 'material-ui/FontIcon'
const Wrapper = styled.div`
	.transparent {
		background: none;
		border: none;
	}

	.hide {
		opacity: ${props => props.scroll};
	}
`

const Container = styled.div`
	margin: 0;
	padding: 0;
  background: ${props => props.theme.barTone=='light'?'white':props.theme.primaryColor};
	color: ${props => props.theme.barTone=='light'?'#222':'white'};
  height: 60px;
  border-bottom: ${props => props.theme.barTone=='light'?'1px solid #e2e2e2':'none'};
	width: 100%;
	transition: .1s;
	position: absolute;

	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;

	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`

const Left = styled.div`
	justify-content: flex-start;
	display: inline-block;
`

const HamburgerWrapper = styled.a`
	display: inline-block;
  float: left;
  text-align: center;
  color: ${props => props.theme.barTone=='light'?'#222':'white'};
  padding: 13px 22px;
  cursor: pointer;
`

const Hamburger = styled.i`
	color: ${props => props.theme.barTone=='light'?'#222':'white'};
	padding-top:5px;
`

const Logo = styled.img`
	height: 60px;
	width: 60px;
	cursor: pointer
`

const Center = styled.div`
	opacity: 1;
	transparent .1s;
	cursor: default;
	justify-content: center;

	@media (max-width: 960px) {
		display: none;
	}
`

const Right = styled.div`
	justify-content: flex-end;
	display: inline-block;
`

const HideOnTablet = styled.div`
	float: left;

	@media (max-width: 640px) {
		display: none;
	}
`

const NotLogin = styled.div`
	width: 180px;
	display: inline-block;
	font-size: 15px;
	margin: 9px 20px;

	& * {
		color: ${props => props.theme.barTone=='light'?'#222':'white'};
	}

	& a:hover {
		text-decoration: underline;
	}
`

const Edit = styled(Link)`
	font-size:18px;
	float:left;
	text-decoration:underline;
	padding:7px;
	margin:10px 20px 0 0;
	&:hover{
		cursor:pointer;
	}
`

const TopBar = React.createClass({
	getInitialState(){
		return {
			alertLeft: false,
			alertRight: false,
			scroll: 0,
			lock: false
		}
	},

	componentWillMount(){
		this.role = auth.hasRoles(["ADMIN","EDITOR","WRITER"])
	},

	componentWillUnmount() {
		if(this.props.onScroll) window.removeEventListener('scroll', this.handleScroll)

	},

	componentDidMount() {
		if(this.props.onScroll)window.addEventListener('scroll', this.handleScroll)
			//console.log(this.role)
	},

	handleScroll(e) {
		this.props.onScroll(e)

		let top = e.srcElement.body.scrollTop / 1000
		this.setState({scroll: top})
	},

	openPop(side){
		if (side === 'left') {
			this.setState({alertLeft: true})
		} else if (side === 'right') {
			this.setState({alertRight: true})
		}
	},

	handleRequestClose(side){
		if (side === 'left') {
			this.setState({alertLeft: false})
		} else if (side === 'right') {
			this.setState({alertRight: false})
		}
	},

	signup(){
		browserHistory.push('/signup')
	},

	render () {
		var {theme} = this.context.setting.publisher
		let {alertLeft, alertRight, scroll} = this.state
		let status = this.props.status || 'UNLOGGEDIN',
			{scrolling, user, menu, transparent,editButton}  = this.props

	  const logoStyleBase = {
	    display: 'inline-block',
	    float: 'left',
	    marginTop: '3px',
	    padding: '17px 5px'
	  }
		const logoStyle = window.isMobile() ? {
			...logoStyleBase,
			display: 'none'
		} : {
			...logoStyleBase
		}
		const logoStyleMobile = window.isMobile() ? {
			...logoStyleBase
		} : {
			...logoStyleBase,
			display: 'none'
		}

		const buttonStyle = {
	    display: 'inline-block',
	    float: 'left',
			boxShadow: 'none',
			verticalAlign: 'middle',
	    marginTop: '9px'
		}

		const avatarStyle = {
			display: 'inline-block',
		  float: 'left',
		  textAlign: 'center',
			margin: '13px 20px 13px 13px',
			cursor: 'pointer'
		}

	  return (
	    <Wrapper scroll={scroll}>
				<Container className={'menu-font '
					+ ((!scrolling && transparent) ? 'transparent' : '')}>
					<Left>
				      <HamburgerWrapper onClick={() => this.openPop('left')}>
				        <Hamburger className="material-icons" white={(!scrolling && transparent)} style={!scrolling && transparent?{color:'white'}:{}}>menu</Hamburger>
				      </HamburgerWrapper>

				      <LogoLink to="/" src={theme.logo} title={this.props.title} style={logoStyle} fill={theme.barTone=='light'?theme.primaryColor:'#ffffff'} />
				      <LogoLink to="/" src={theme.slogo} title={this.props.title} style={logoStyleMobile} fill={theme.barTone=='light'?theme.primaryColor:'#ffffff'} />
					</Left>

					<Center className={transparent ? 'hide': ''}>
   					{this.props.children}
					</Center>

					{status == 'LOGGEDIN' &&
						<Right>
							{this.role && editButton &&
								<Edit
									className='nunito-font'
									style={{color:(!scrolling && transparent) ? 'white' : '#222'}}
									to={editButton}>
									Edit Story
								</Edit>
							}

				      {this.role && <HideOnTablet>
								<Link to="/me/stories/new">
					        <PrimaryButton
					          label="Story"
					          iconName="add"
					          style={buttonStyle}
					        />
								</Link>
				      </HideOnTablet>}

							<Avatar
								src={user.pic.medium}
								size={30} style={avatarStyle}
								onClick={() => this.openPop('right')}
							/>
						</Right>
					}
					{status == 'UNLOGGEDIN' &&
						<Right>
							<NotLogin>
								<SecondaryButton
									label="Sign Up"
									onClick={this.signup}
									style={{verticalAlign: 'middle'}}
								/>
								<span>&nbsp; or </span>
								<Link to="/signin" style={{fontWeight:'bold'}}>
									Sign In
								</Link>
							</NotLogin>
						</Right>
					}
				</Container>

				<LeftMenu
					menu={menu}
					open={alertLeft}
					close={() => this.handleRequestClose('left')}
				/>
				{status=='LOGGEDIN' &&
					<RightMenu
						open={alertRight}
						user={user}
						close={() => this.handleRequestClose('right')}
					/>
				}
	    </Wrapper>
	  )
	}
})

TopBar.propTypes = {
  onScroll: PropTypes.func,
  scrolling: PropTypes.bool,
  status: PropTypes.string,
  editButton:PropTypes.string,
  title: PropTypes.string,

  menu: PropTypes.object,
  user: PropTypes.object
}

TopBar.contextTypes = {
	setting: React.PropTypes.object
};


export default TopBar;
