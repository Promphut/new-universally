import React from 'react'
import PropTypes from 'prop-types'
import Froala from 'react-froala-wysiwyg'

// Require Editor JS and CSS files.
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'

class FroalaEditor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	froalaConfig = {
		imageEditButtons: ['imageAlign', 'imageDisplay', 'imageAlt', 'imageSize'],
		imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
		inlineStyles: {
			Caption: "font-family: 'PT Sans', 'cs_prajad'; font-size: 16px; color: #8e8e8e;",
			Source: "font-family:'PT Sans', 'cs_prajad'; font-size: 16px; color: #8e8e8e;",
			'Image source': "font-family: 'PT Sans', 'cs_prajad'; font-size: 14px; color: #CCC; font-style: italic;"
		},
		linkEditButtons: ['linkOpen', 'linkEdit', 'linkRemove'],
		linkInsertButtons: ['linkBack'],
		paragraphFormat: {
			N: 'Normal',
			H2: 'Head',
			H3: 'Subhead'
		},
		placeholderText: 'เขียนบทความ...',
		quickInsertButtons: ['image', 'ul', 'ol', 'hr'],
		tabSpaces: 4,
		toolbarButtons: [
			'undo',
			'|',
			'bold',
			'italic',
			'underline',
			'|',
			'paragraphStyle',
			'inlineStyle',
			'align',
			'quote',
			'|',
			'insertLink',
			'insertImage',
			'insertVideo',
			'|',
			'help'
		],
		toolbarInline: true,
		videoEditButtons: ['videoAlign', 'videoDisplay', 'videoSize'],
		videoInsertButtons: ['videoBack', '|', 'videoByURL', 'videoEmbed']
	}

	froalaConfigHighlight = {
		charCounterCount: false,
		linkEditButtons: ['linkOpen', 'linkEdit', 'linkRemove'],
		linkInsertButtons: ['linkBack'],
		placeholderText: '',
		quickInsertButtons: ['ul', 'ol'],
		tabSpaces: 4,
		toolbarButtons: [
			'undo',
			'|',
			'bold',
			'italic',
			'underline',
			'|',
			'insertLink'
		],
		toolbarInline: true
	}

	render() {
		return (
			<Froala
				tag="textarea"
				config={
					this.props.highlight ? this.froalaConfigHighlight : this.froalaConfig
				}
				model={this.props.model}
				onModelChange={this.props.onModelChange}
			/>
		)
	}
}

export default FroalaEditor
