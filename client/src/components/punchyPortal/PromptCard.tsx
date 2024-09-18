import React from 'react';
import classNames from 'classnames';

interface IProps {
    title?: string;
    image?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const PromptCard = ({ title, image, className, style }: IProps) => {
	return (
		<div
			className={classNames('prompt-card', className)}
			style={{
				height: '169px',
				padding: '15px 177px 106px 22px',
				borderRadius: '8px',
				backgroundColor: '#F9DAAD',
				border: '1px solid black',
				...style,
			}}
		>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				{image && <div style={{ marginRight: '8px', paddingRight: '26px' }}>{image}</div>}
				{title && <h4 style={{ margin: 0, whiteSpace: 'nowrap' }}>{title}</h4>}
			</div>
		</div>
	);
};

export default PromptCard;
