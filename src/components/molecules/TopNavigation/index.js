import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

const Container = styled.div`
	display:flex;
	.active{
		font-weight:bold;
		color:${props => props.theme.accentColor};
	}
`
const NavLink = styled(Link)`
	padding: 18px 20px 20px 20px;
	font-size:17px;
	text-decoration: none;
	color: ${props => (props.theme.barTone == 'light' ? '#222' : '#FFF')};
	height:60px;
	cursor: pointer;
	&:hover{
		font-weight:bold;
		color:${props => props.theme.accentColor};
		>div{
			display:block;
		}
	}
`
const DropdownBox = styled.div`
		min-width: 230px;
    display: none;
    position: absolute;
    z-index: 3;
    top: 60px;
		background-color:#E5E5E5;
		padding:18px 28px 18px 28px;
`
const DropdownList = styled(Link)`
		background-color:#E5E5E5;
		width: 100%;
		padding: 10px 0 10px 0;
		color: #222;
		display:block;&:hover{
			color:${props => props.theme.accentColor};
		}
`
const Line = styled.div`
	background-color:#C4C4C4;
	height:1px;
	width:100%;
	margin:10px 0 10px 0;
`

const TopNavigation = ({ menu }) => {
	let cols = menu && menu.column ? menu.column : []

	let items = []
	for (let i = 0; i < cols.length; i++) {
		items.push(
			<DropdownList key={i} to={'/stories/' + cols[i].slug} activeClassName="active" className='nunito-font'>
					{cols[i].name}
			</DropdownList>
		)
	}

	return (
		<Container>
			<NavLink to="/stories/news" activeClassName="active" className='nunito-font'>News</NavLink>
			<NavLink to="/stories/columns" activeClassName="active" className='nunito-font'>
			Stories ▾
			<DropdownBox>
				{items}
				<Line></Line>
				<DropdownList to={'/stories/columns'} 
				activeClassName="active" 
				className='nunito-font'>
					All Columns
				</DropdownList>
			</DropdownBox>
			</NavLink>
			<NavLink to="/about" activeClassName="active" className='nunito-font'>About Us</NavLink>
			<NavLink to="/contact" activeClassName="active" className='nunito-font'>Contact</NavLink>
		</Container>			
	)
}

TopNavigation.propTypes = {
	menu: PropTypes.object
}

export default TopNavigation