interface ModalState {
	modalOpen: boolean,
	modalId: number
}

interface helpDialog {
	title: string,
	message: JSX.Element,
	link?: string,
	linkapi?: string
}
