import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

interface IProps {
	title: string;
	showMenu: boolean;
	setShowMenu: (v: boolean) => void;
}

const coreItems: { to: string, title: string }[] = [
	{
		to: '/punchcardcore/data-table',
		title: 'Data table'
	},
	{
		to: '/punchcardcore/picklist-controls',
		title: 'Picklist controls'
	},
	{
		to: '/punchcardcore/form-controls',
		title: 'Form controls'
	},
	{
		to: '/punchcardcore/tabs-controls',
		title: 'Tabs controls'
	},
];

const CoreMenuItems = (props: IProps) => {
	const menu = (
		<ul className={classNames('dropdown-menu', props.showMenu && 'show')}>
			{
				coreItems.map((item, key) => (
					<li key={key}>
						<NavLink className="dropdown-item" to={item.to} onClick={() => props.setShowMenu(false)}>
							<span>{item.title}</span>
						</NavLink>
					</li>
				))
			}
		</ul>
	);

	return (
		<div className="dropdown">
			<li className={classNames('nav-link dropdown-toggle', props.showMenu && 'show')} onClick={() => props.setShowMenu(!props.showMenu)}>
				{props.title}
			</li>
			{menu}
		</div>
	);
};

export default CoreMenuItems;