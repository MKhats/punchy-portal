import React from 'react';
import ReactTooltip, { TooltipProps } from 'react-tooltip';

interface IProps extends TooltipProps {
	dataTip?: string;
	name: string;
}

export const ToolTip: React.FC<IProps> = (props: IProps) => {
	const { children, name, type, dataTip, ...otherProps } = props;
	return (
		<div>
			<span data-tip={true} data-for={name}>
				{children}
			</span>
			{/* <ReactTooltip id={name}>
				<div>{dataTip}</div>
			</ReactTooltip> */}
		</div>
	);
};

export default ToolTip;