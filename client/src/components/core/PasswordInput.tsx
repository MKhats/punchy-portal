import React from 'react';
import classNames from 'classnames';
import { ReactComponent as Visibility } from 'assets/icons/icon-visibility.svg';
import { ReactComponent as VisibilityOff } from 'assets/icons/icon-visibility-off.svg';
import { Input } from './Input';


interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	isPassVisible?: boolean;
	setIsPassVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, IProps>((props, ref) => {
	const { className, isPassVisible, setIsPassVisible, ...otherProps } = props;
	return (
		<div className="d-flex flex-row position-relative">
			<Input
				type={isPassVisible === true ? 'text' : 'password'}
				ref={ref}
				className={classNames(className)}
				{...otherProps}
			/>
			{setIsPassVisible !== undefined &&
				<React.Fragment>
					{isPassVisible === false ? (
						<button className="password-visibility-button" onClick={() => setIsPassVisible(true)}>
							<Visibility viewBox="0 0 50 50" className="password-visibility-position" />
						</button>
					) : (
						<button className="password-visibility-button" onClick={() => setIsPassVisible(false)}>
							<VisibilityOff viewBox="0 0 50 50" className="password-visibility-position" />
						</button>
					)}
				</React.Fragment>
			}

		</div >
	);
});
