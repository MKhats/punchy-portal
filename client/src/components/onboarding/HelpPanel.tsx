import React from 'react';
import { ModalOverlay } from 'components/core';


interface IProps {
	helpButtons: helpDialog[]
}
const HelpPanel = (props: IProps) => {
	const [helpContent, setHelpContent] = React.useState<helpDialog | null>(null);
	const btns = props.helpButtons.map((btn, index) => {
		return <React.Fragment key={index} >
			<button className="btn btn-sm btn-sourceCode ms-3" onClick={() => setHelpContent({ ...btn })}>{btn.title}</button>
		</React.Fragment >;
	});
	const linkvalid = helpContent !== null && helpContent.link !== '' && helpContent.link !== null && helpContent.link !== undefined;
	const linkapivalid = helpContent !== null && helpContent.linkapi !== '' && helpContent.linkapi !== null && helpContent.linkapi !== undefined;
	const apisource = linkapivalid && <a className="btn btn-sm btn-sourceCode" href={helpContent!.linkapi} target="_blank" rel="noreferrer">API Source Code</a>;
	const source = linkvalid && <a className="btn btn-sm btn-sourceCode" href={helpContent!.link} target="_blank" rel="noreferrer">React Source Code</a>;
	return (
		<React.Fragment>
			<div className="helpBox">
				<div className="helpBoxCaption">Source code and description</div>
				{btns}
			</div>
			<ModalOverlay
				isOpen={helpContent !== null}
				modalSize="lg"
				onRequestClose={() => setHelpContent(null)}
				headerChildren={helpContent === null ? '' : <div><span>{helpContent.title}</span><div className="helpHeaderButton">{source} {apisource}</div></div>}
			>
				<div className="helpMessage" style={{ whiteSpace: 'pre-line' }}>{helpContent === null ? '' : helpContent.message}</div><br />
			</ModalOverlay>
		</React.Fragment>
	);
};
export default HelpPanel;

