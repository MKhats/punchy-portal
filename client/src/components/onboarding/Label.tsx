import React from 'react'

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	required?: boolean;
	htmlFor:string;
}

const Label = (props:IProps) => {
	return (
		<label
			htmlFor={props.htmlFor}
			className="form-label"
		>
			{props.children} {props.required===true&& <small>(Required)</small>}
		</label>
	)
}

export default Label