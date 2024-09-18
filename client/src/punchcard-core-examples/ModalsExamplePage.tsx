import React from 'react';
import { Page, ModalOverlay, Button } from 'components/core';

interface ModalTypes {
	LargeModal: boolean;
	MediumModal: boolean;
	SmallModal: boolean;
	LargeConfirmationModal: boolean;
	MediumConfirmationModal: boolean;
	SmallConfirmationModal: boolean;
}

const ModalsExamplePage = () =>  {
	const [modalOpen, setModalOpen] = React.useState<keyof ModalTypes | false>(false);
	return (
		/*change Icon buttons into regular buttons and set children as the name of different types of buttons. All modals footer showing!*/
		<Page title="Modal Example">
			<div className="workflow-progress-wrapper">
				<div className="container">
					<h1 className="h2 m-0">Modal Examples</h1>
				</div>
			</div>
			<div className="container">
				<legend>Modals</legend>
				<div className="row">
					<div className="col-4">
						<Button onClick={() => setModalOpen('LargeModal')}>
						Large Width Modal
							<ModalOverlay
								isOpen={modalOpen === 'LargeModal'}
								modalSize="lg"
								onRequestClose={() => setModalOpen(false)}
								headerChildren="Large width modal"
							>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam bibendum dui a est tincidunt ultricies.
											Suspendisse sit amet metus feugiat, consectetur urna eu, luctus turpis. Nam et rhoncus est. Duis et erat
												non nibh molestie mattis vel ac ante. In tincidunt tellus quis enim aliquam, non suscipit augue egestas.
												Fusce finibus congue nisl, a ultricies arcu maximus nec. Nulla nec purus gravida, viverra quam ut, finibus leo.
												Integer pellentesque scelerisque quam a mollis."
							</ModalOverlay>
						</Button>
					</div>
					<div className="col-4">
						<Button onClick={() => setModalOpen('MediumModal')}>
						Medium Width Modal
							<ModalOverlay
								isOpen={modalOpen === 'MediumModal'}
								modalSize="md"
								onRequestClose={() => setModalOpen(false)}
								headerChildren="Medium width modal"
							>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam bibendum dui a est tincidunt ultricies.
											Suspendisse sit amet metus feugiat, consectetur urna eu, luctus turpis. Nam et rhoncus est. Duis et erat
												non nibh molestie mattis vel ac ante. In tincidunt tellus quis enim aliquam, non suscipit augue egestas.
												Fusce finibus congue nisl, a ultricies arcu maximus nec. Nulla nec purus gravida, viverra quam ut, finibus leo.
												Integer pellentesque scelerisque quam a mollis."
							</ModalOverlay>
						</Button>
					</div>
					<div className="col-4">
						<Button onClick={() => setModalOpen('SmallModal')}>
						Small Width Modal
							<ModalOverlay
								isOpen={modalOpen === 'SmallModal'}
								modalSize="sm"
								onRequestClose={() => setModalOpen(false)}
								headerChildren="Small width modal"
							>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam bibendum dui a est tincidunt ultricies.
											Suspendisse sit amet metus feugiat, consectetur urna eu, luctus turpis. Nam et rhoncus est. Duis et erat
												non nibh molestie mattis vel ac ante. In tincidunt tellus quis enim aliquam, non suscipit augue egestas.
												Fusce finibus congue nisl, a ultricies arcu maximus nec. Nulla nec purus gravida, viverra quam ut, finibus leo.
												Integer pellentesque scelerisque quam a mollis."
							</ModalOverlay>
						</Button>
					</div>
				</div>
				<br />
				<div className="row">
					<legend>Confirmation Dialog</legend>
					<div className="col-4">
						<Button onClick={() => setModalOpen('LargeConfirmationModal')}>
						Large Confirmation Dialog
							<ModalOverlay
								isOpen={modalOpen === 'LargeConfirmationModal'}
								modalSize="lg"
								onRequestClose={() => setModalOpen(false)}
								headerChildren="Large width modal"
								confirmButtonChildren="Confirm"
								cancelButtonChildren="Cancel"
							>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam bibendum dui a est tincidunt ultricies.
											Suspendisse sit amet metus feugiat, consectetur urna eu, luctus turpis. Nam et rhoncus est. Duis et erat
												non nibh molestie mattis vel ac ante. In tincidunt tellus quis enim aliquam, non suscipit augue egestas.
												Fusce finibus congue nisl, a ultricies arcu maximus nec. Nulla nec purus gravida, viverra quam ut, finibus leo.
												Integer pellentesque scelerisque quam a mollis."

							</ModalOverlay>
						</Button>
					</div>
					<div className="col-4">
						<Button onClick={() => setModalOpen('MediumConfirmationModal')}>
						Medium Confirmation Dialog
							<ModalOverlay
								isOpen={modalOpen === 'MediumConfirmationModal'}
								modalSize="md"
								onRequestClose={() => setModalOpen(false)}
								headerChildren="Medium width modal"
								confirmButtonChildren="Confirm"
								cancelButtonChildren="Cancel"
							>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam bibendum dui a est tincidunt ultricies.
											Suspendisse sit amet metus feugiat, consectetur urna eu, luctus turpis. Nam et rhoncus est. Duis et erat
												non nibh molestie mattis vel ac ante. In tincidunt tellus quis enim aliquam, non suscipit augue egestas.
												Fusce finibus congue nisl, a ultricies arcu maximus nec. Nulla nec purus gravida, viverra quam ut, finibus leo.
												Integer pellentesque scelerisque quam a mollis."
							</ModalOverlay>
						</Button>
					</div>
					<div className="col-4">
						<Button onClick={() => setModalOpen('SmallConfirmationModal')}>
						Small Confirmation Dialog
							<ModalOverlay
								isOpen={modalOpen === 'SmallConfirmationModal'}
								modalSize="sm"
								onRequestClose={() => setModalOpen(false)}
								headerChildren="Small width modal"
								confirmButtonChildren="Confirm"
								cancelButtonChildren="Cancel"
							>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam bibendum dui a est tincidunt ultricies.
											Suspendisse sit amet metus feugiat, consectetur urna eu, luctus turpis. Nam et rhoncus est. Duis et erat
												non nibh molestie mattis vel ac ante. In tincidunt tellus quis enim aliquam, non suscipit augue egestas.
												Fusce finibus congue nisl, a ultricies arcu maximus nec. Nulla nec purus gravida, viverra quam ut, finibus leo.
												Integer pellentesque scelerisque quam a mollis."
							</ModalOverlay>
						</Button>
					</div>
				</div>
			</div>
		</Page>
	);
};
export default ModalsExamplePage;