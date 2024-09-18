import React from 'react';
import { Button } from 'components/core';
import Modal from 'react-modal';
import classNames from 'classnames';

interface IProps {
	className?: string;
	headerChildren?: React.ReactNode;
	footerChildren?: React.ReactNode;
	confirmButtonChildren?: React.ReactNode;
	cancelButtonChildren?: React.ReactNode;
	confirmButtonLink?: string;
	cancelButtonLink?: string;
	confirmButtonAction?: () => void;
	cancelButtonAction?: () => void;
	isOpen: boolean;
	onRequestClose?: () => void;
	hideCloseButton?: boolean;
	modalSize?: 'lg' | 'md' | 'sm';
	shouldCloseOnOverlayClick?: boolean;
}
Modal.setAppElement('#root');
const ModalOverlay = (props: React.PropsWithChildren<IProps>) => {

	const {
		className,
		isOpen,
		children,
		onRequestClose,
		hideCloseButton,
		headerChildren,
		footerChildren,
		cancelButtonChildren,
		cancelButtonAction,
		cancelButtonLink,
		confirmButtonChildren,
		confirmButtonAction,
		confirmButtonLink,
		shouldCloseOnOverlayClick,
		modalSize
	} = props;
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className={{
				base: classNames('modal-dialog', `modal-${modalSize}`),
				afterOpen: '',
				beforeClose: ''
			}}
			overlayClassName={{
				base: classNames('modal', className),
				afterOpen: 'show',
				beforeClose: 'hide'
			}}
			closeTimeoutMS={200}
			shouldCloseOnOverlayClick={shouldCloseOnOverlayClick ?? true}
			role="dialog"
		>
			<div className="modal-content" role="document">
				{!hideCloseButton && (
					<button type="button" className="modal-close p-2" aria-label="Close" onClick={onRequestClose}>
						<span aria-hidden="true">&times;</span>
					</button>
				)}
				{headerChildren && <div className="modal-header font-weight-bold h4">{headerChildren}</div>}
				<div className="modal-body">{children}</div>
				{(footerChildren || cancelButtonChildren || confirmButtonChildren) && (
					<div className="modal-footer">
						{cancelButtonChildren && (
							<Button to={cancelButtonLink} onClick={cancelButtonAction} className="btn-outline-primary">
								{cancelButtonChildren}
							</Button>
						)}
						{confirmButtonChildren && (
							<Button to={confirmButtonLink} onClick={confirmButtonAction} className="btn-primary ms-3">
								{confirmButtonChildren}
							</Button>
						)}
						{footerChildren}
					</div>
				)}
			</div>
		</Modal>
	);
};

export default ModalOverlay;
