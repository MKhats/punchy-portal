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
                backgroundColor: '#FFF',
                ...style,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {image && <div style={{ marginRight: '8px', paddingRight: '26px' }}>{image}</div>}
                {title && <h2 style={{ margin: 0 }}>{title}</h2>}
            </div>
        </div>
    );
};

export default PromptCard;
