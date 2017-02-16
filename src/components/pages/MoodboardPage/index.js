import React from 'react'
import styled from 'styled-components'
import {PrimaryButton, SecondaryButton} from 'components'

const Wrapper = styled.div`
	padding:30px;

	& section {
		padding: 15px;
	}
`

const Flex = styled.div`
	display: flex;

`

const SubFont = styled.span`
	color: #8f8f8f;
	font-size: .85em;
`

const MoodboardPage = React.createClass({
	getInitialState(){
		return {}
	},

	render(){
		return (
			<Wrapper>
				<h1>Medium Buttons</h1>
				<section>
					Primary : <PrimaryButton label="Remove Story" iconName="grade"/>&nbsp;&nbsp;
					<PrimaryButton label="Remove Story" iconName="search"/>&nbsp;&nbsp;
					<PrimaryButton label="Remove Story" iconName="add"/>&nbsp;&nbsp;
					<PrimaryButton label="Remove Story" icon={<i className="fa fa-facebook" aria-hidden="true"></i>}/>&nbsp;&nbsp;
					<PrimaryButton label="Remove Story" icon={<i className="fa fa-bullseye" aria-hidden="true"></i>}/>
					<br/><br/>

					Primary without icon: <PrimaryButton label="Remove Story"/>
				</section>
				<section>
					Secondary : <SecondaryButton label="Remove Story" iconName="grade"/>&nbsp;&nbsp;
					<SecondaryButton label="Remove Story" iconName="search"/>&nbsp;&nbsp;
					<SecondaryButton label="Remove Story" iconName="add"/>&nbsp;&nbsp;
					<SecondaryButton label="Remove Story" icon={<i className="fa fa-facebook" aria-hidden="true"></i>}/>&nbsp;&nbsp;
					<SecondaryButton label="Remove Story" icon={<i className="fa fa-bullseye" aria-hidden="true"></i>}/>
					<br/><br/>

					Secondary without icon: <SecondaryButton label="Remove Story"/>
				</section>


				<h1>Large Buttons</h1>
				<section>
					Primary : <PrimaryButton size="large" label="Remove Story" iconName="grade"/>&nbsp;&nbsp;
					<PrimaryButton size="large" label="Remove Story" iconName="search"/>&nbsp;&nbsp;
					<PrimaryButton size="large" label="Remove Story" iconName="add"/>&nbsp;&nbsp;
					<PrimaryButton size="large" label="Remove Story" icon={<i className="fa fa-facebook" aria-hidden="true"></i>}/>&nbsp;&nbsp;
					<PrimaryButton size="large" label="Remove Story" icon={<i className="fa fa-bullseye" aria-hidden="true"></i>}/>
					<br/><br/>

					Primary without icon: <PrimaryButton size="large" label="Remove Story"/>
				</section>
				<section>
					Secondary : <SecondaryButton size="large" label="Remove Story" iconName="grade"/>&nbsp;&nbsp;
					<SecondaryButton size="large" label="Remove Story" iconName="search"/>&nbsp;&nbsp;
					<SecondaryButton size="large" label="Remove Story" iconName="add"/>&nbsp;&nbsp;
					<SecondaryButton size="large" label="Remove Story" icon={<i className="fa fa-facebook" aria-hidden="true"></i>}/>&nbsp;&nbsp;
					<SecondaryButton size="large" label="Remove Story" icon={<i className="fa fa-bullseye" aria-hidden="true"></i>}/>
					<br/><br/>

					Secondary without icon: <SecondaryButton size="large" label="Remove Story"/>
				</section>

				<h1>Small Buttons</h1>
				<section>
					Primary : <PrimaryButton size="small" label="Remove Story" iconName="grade"/>&nbsp;&nbsp;
					<PrimaryButton size="small" label="Remove Story" iconName="search"/>&nbsp;&nbsp;
					<PrimaryButton size="small" label="Remove Story" iconName="add"/>&nbsp;&nbsp;
					<PrimaryButton size="small" label="Remove Story" icon={<i className="fa fa-facebook" aria-hidden="true"></i>}/>&nbsp;&nbsp;
					<PrimaryButton size="small" label="Remove Story" icon={<i className="fa fa-bullseye" aria-hidden="true"></i>}/>
					<br/><br/>

					Primary without icon: <PrimaryButton size="small" label="Remove Story"/>
				</section>
				<section>
					Secondary : <SecondaryButton size="small" label="Remove Story" iconName="grade"/>&nbsp;&nbsp;
					<SecondaryButton size="small" label="Remove Story" iconName="search"/>&nbsp;&nbsp;
					<SecondaryButton size="small" label="Remove Story" iconName="add"/>&nbsp;&nbsp;
					<SecondaryButton size="small" label="Remove Story" icon={<i className="fa fa-facebook" aria-hidden="true"></i>}/>&nbsp;&nbsp;
					<SecondaryButton size="small" label="Remove Story" icon={<i className="fa fa-bullseye" aria-hidden="true"></i>}/>
					<br/><br/>

					Secondary without icon: <SecondaryButton size="small" label="Remove Story"/>
				</section>

				<h1>Fonts</h1>
				<Flex>
					<section style={{width: '400px'}}>
						<SubFont>(PT Serif and PT Sans | Desktop EN)</SubFont>
						<h1 className="title-font">The spectacle before us was indeed sublime.</h1>
						<p className="content-font">Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds.</p>
						<p className="menu-font"><SubFont>(Nunito)</SubFont> MENU FONT GOEST HERE</p>
					</section>
					<section style={{width: '400px'}}>
						<SubFont>(Mitr and CS Prajad | Desktop TH)</SubFont>
						<h1 className="title-font">จิตเภทโมเดิร์นฟีเวอร์ พาร์ตเนอร์เอฟเฟ็กต์บ๊อบ วาไรตี้ ซีนเทรดต่อรองมั้ย</h1>
						<p className="content-font">โดมิโนต่อรองอัลบั้มเซ่นไหว้ปาสกาล ทีวีดยุคทอม สต๊อกรูบิคเพนกวินเยนบุ๋น รวมมิตรตุ๋ยปฏิสัมพันธ์ ไวอากร้าเธคเซอร์วิสถูกต้อง บอยคอตต์เกจิ เมเปิล ป๋าควีนน็อคโอ้ย คอนแท็คเดอะรีเสิร์ชฮิบรู แพนดาวิป โบว์ลิ่งไนน์แทกติคโฮป ซาร์กิมจิฮอตดอกโฟน ควีนตุ๊ดกฤษณ์ เชอร์รี่กระดี๊กระด๊า แรลลีเวิร์กช็อปกราวนด์แจ๊สรวมมิตร เอ็กซ์โปก่อนหน้าซินโดรมพาร์ทเนอร์ อุปสงค์ไลท์ซินโดรมแทคติคโพลารอยด์ เลกเชอร์เปปเปอร์มินต์ราชบัณฑิตยสถานคอรัปชั่น โลชั่นแบล็กดอกเตอร์โปรโมเตอร์ราชบัณฑิตยสถาน โนติส ไฮเวย์ โมหจริต ช็อปปิ้งบลูเบอร์รีชาร์ปเด้อแอปพริคอท </p>
						<p className="menu-font"><SubFont>(Mitr)</SubFont> นี่คือเมนูฟอตน์ สวยงามมั้ย?</p>
					</section>
					<section style={{width: '400px'}}>
						<SubFont>(Mitr and CS Prajad | Desktop TH/EN)</SubFont>
						<h1 className="title-font">จิตเภทโมเดิร์นฟีเวอร์ The spectacle พาร์ตเนอร์เอฟเฟ็กต์บ๊อบ วาไรตี้ indeed sublime.</h1>
						<p className="content-font">Apparently we had reached สต๊อกรูบิคเพนกวินเยนบุ๋น รวมมิตรตุ๋ยปฏิสัมพันธ์ for the sky was a dead black, เมเปิล ป๋าควีนน็อคโอ้ย คอนแท็คเดอะรีเสิร์ชฮิบรู แพนดาวิป โบว์ลิ่งไนน์แทกติคโฮป. By the same illusion which lifts the horizon เชอร์รี่กระดี๊กระด๊า แรลลีเวิร์กช็อปกราวนด์แจ๊สรวมมิตร เอ็กซ์โปก่อนหน้าซินโดรมพาร์ทเนอร์ ,in the middle of an immense dark sphere, whose upper half was strewn with silver. โลชั่นแบล็กดอกเตอร์โปรโมเตอร์ราชบัณฑิตยสถาน I could see a ruddy light streaming through a rift in the clouds.</p>
						<p className="menu-font"><SubFont>(Mitr)</SubFont> นี่คือเมนูฟอตน์ สวยงามมั้ย?</p>
					</section>
				</Flex>

			</Wrapper>
		)
	}
});

export default MoodboardPage;