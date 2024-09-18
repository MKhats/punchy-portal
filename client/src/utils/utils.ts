import { concat } from 'lodash';

export const breakpoints = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1600
};

export const barchartColors = [
	'rgba(248, 32, 32, 0.5)',
	'rgba(223, 88, 150, 0.5)',
	'rgba(209, 89, 45, 0.5)',
	'rgba(189, 132, 66, 0.5)',
	'rgba(170, 189, 57, 0.5)',
	'rgba(172, 209, 9, 0.5)',
	'rgba(82, 209, 9, 0.5)',
	'rgba(9, 209, 142, 0.5)',
	'rgba(9, 152, 209, 0.5)',
	'rgba(9, 79, 209, 0.5)'
];

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * @param {number} month
 * @returns {array}
 * @description eg. input month =4 , returns [4,5,6,7,8,9,10,11,12,1,2,3]
 */
export type filterRow = {
	columnId: number,
	value: string
}

export const sortDateStartingFromCurrent = (month: number) => {
	const numericMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	if (month > 12) {
		month = month - 12;
	}
	const sortedMonth: number[] = [];
	const pastMonth: number[] = [];
	numericMonths.forEach(m => {
		if (m - month < 0) {
			pastMonth.push(m);
		} else {
			sortedMonth.push(m);
		}
	});
	const result = concat(sortedMonth, pastMonth);
	return result;
};

export const truncateString = (description: string, limit: number = 20) => {
	if (description.length > limit) {
		return description.substring(0, limit) + '...';
	}
	return description;
};

export const renderPercentage = (count: number, sum: number) => (Math.round(count / sum * 10000) / 100 + '%');

export enum SecurityRoles {
	Administrator = 'Admin',
	Customer = 'Customer'
}

export interface IParameterValidation {
	validationStatus: 'success' | 'error' | 'warning' | 'validating' | undefined;
	message: string;
}

export const numericInputRegex = /^[0-9]*$/g;
export const alphabetsDashInputRegex = /^[a-zA-Z- ]*$/g;
export const alphaNumCommaDotDashInputRegex = /^[A-Za-z0-9\s,\.\-]*$/g;
export const birthYearRegex = /(?:19|20)\d\d/g;

const validationError = (message: string): IParameterValidation => {
	return { validationStatus: 'error', message };
};

const validationWarning = (message: string): IParameterValidation => {
	return { validationStatus: 'warning', message };
};

const validationSuccess = (message: string = ''): IParameterValidation => {
	return { validationStatus: 'success', message };
};

const validationNoMessage = (): IParameterValidation => {
	return { validationStatus: undefined, message: '' };
};

export class Validation {
	public static validateEmail = (email?: string, currentUsersEmail: string[] = []): IParameterValidation => {
		if (!email) {
			return validationNoMessage();
		}
		const emailRegexValue = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
		if (email === '') {
			return validationError('Please enter a valid email');
		}

		// compare with regex first then check if it's existing email
		if (!emailRegexValue.test(email)) {
			return validationError('Please enter a valid email');
		}

		if (currentUsersEmail.indexOf(email) !== -1) {
			return validationError('Email is already in use');
		}

		return validationSuccess();
	};

	public static validateErrorCode = (errorCode: string): IParameterValidation => {
		const fleetErrorRegex = /^[A-Z]{1,2}$/g;

		if (errorCode === '') {
			return validationError('Please enter a valid fleet error');
		}

		if (errorCode.length === 2 && errorCode[1] !== 'X') {
			return validationError('Fleet Error with length 2 must end with X');
		}

		if (!errorCode.match(fleetErrorRegex)) {
			return validationError('Fleet Error has to be 1 or 2 capital letters');
		}

		return validationSuccess();
	};

	public static validateIfLessThanOrEqualTo = (num: number, standard: number, message: string): IParameterValidation => {
		if (num <= standard) {
			return validationSuccess();
		} else {
			return validationError(message);
		}
	};

	public static validateIsGreaterThan = (num: number, standard: number, message: string): IParameterValidation => {
		if (num > standard) {
			return validationSuccess();
		} else {
			return validationError(message);
		}
	};

	/*
		This function will take a value, and check whether or not it is empty or undefined. It will return an error
		with the passed in message, if the value is empty.
	*/
	public static validateStringIsNotEmpty = (value: string, message: string): IParameterValidation => {
		if (value === undefined || value.trim() === '') {
			return validationError(message);
		}
		return validationSuccess('Successful');
	};

	// checks whether a value exists in a given list, returns IParameterValidation object with the given message
	public static validateValueIsUnique = (list: string[]) => (value: string, message: string): IParameterValidation => {
		const presentInList: boolean = list.includes(value);
		if (presentInList) {
			return validationError(message);
		}
		return validationSuccess('Successful');
	};

	// takes in list of Validation Functions, a list of corresponding Error messages, and a value, and runs multiple Validations on that value
	// !! NOTE: validaitonFunction MUST have a signature of functionName(value: string, message: string): IParameterValidation { ... }
	public static runMultipleValidations = (listOfValidationFunctions: any[], listOfMessages: any[], value: any): IParameterValidation => {

		type ValidationFunction = (value: string, message: string) => IParameterValidation;
		return listOfValidationFunctions.reduce((acc: IParameterValidation, validationFunction: ValidationFunction, i) => {
			if (acc.validationStatus === 'error') {
				// if an error has already occured, no need to run the next validation
				return acc;
			}
			// otherwise, we need to run the next validation Function and see its output.
			const validationOutcome: IParameterValidation = validationFunction(value, listOfMessages[i]);
			return validationOutcome;
		}, {} as IParameterValidation);
	};

	public static validateArrayIsNotEmpty = (value: any[], message: string): IParameterValidation => {
		if (value !== undefined && value.length > 0) {
			return validationSuccess();
		}
		return validationError(message);
	};

	public static validatePhoneNumber = (phoneNumber: string): IParameterValidation => {
		let validValue = validationError('Please enter a valid phone number ');
		const phoneNumberValidation = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		if (phoneNumber) {
			if (phoneNumber.length < 10) {
				validValue = validationWarning('Please enter a 10 digit phone number');
			}
			if (phoneNumberValidation.test(phoneNumber)) {
				validValue = validationSuccess();
			}

		}
		return validValue;
	};
	/* used to set daysUntilredaction, DaysUntilCoreLocked fields to show no
	validation when set to none and error if set to timed if passing in a bool */
	public static validateIfANumberOrNumbers = (values: number | number[], setValue: boolean | undefined = undefined): IParameterValidation => {
		let validValues = {} as IParameterValidation;
		if (setValue !== undefined) {
			if (setValue === true) {
				if (!Array.isArray(values) && isNaN(values)) {
					validValues = validationNoMessage();
				}
			}
			if (setValue === false) {
				if (!Array.isArray(values) && isNaN(values)) {
					validValues = validationError('Please enter a value!');
				}
			}
		}
		if (setValue === undefined) {
			if (Array.isArray(values)) {
				if ((values.length > 0) !== true) {
					validValues = validationError('Please choose an option ');
				} else {
					validValues = validationSuccess();
				}
			} else {
				if (values === undefined) {
					validValues = validationError('Please choose an option');
				} else {
					validValues = validationSuccess();
				}
			}
		}

		return validValues;
	};

	public static validateIsActive = (status: boolean): IParameterValidation => {
		if (typeof status !== 'boolean' || status === undefined) {
			return { validationStatus: 'error', message: 'Please choose a value' };
		}

		return { validationStatus: 'success', message: '' };
	};

	public static validateAddress = (address1: string): IParameterValidation => {
		let validateAddress = { validationStatus: 'error', message: 'Please enter an address' };
		if (address1 && address1 !== '' && address1.length > 0) {
			validateAddress = { validationStatus: 'success', message: '' };
		}
		return validateAddress as IParameterValidation;
	};

	public static isValid = (validProperties: string[]) => {
		const isValid = validProperties.every(prop => prop === 'success' || prop === undefined);
		return isValid;
	};

	public static validateCustomFieldHasOneOption = (options: any[], controlTypeId: number): IParameterValidation => {
		if (controlTypeId && controlTypeId !== 10236 && options.length === 0) {
			return validationError('Please add at least one option');
		}
		return { validationStatus: undefined, message: '' };
	};
}

// tslint:disable
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class Utils {

	public static generateUUID = () => {
		let d = new Date().getTime();
		const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			const r = ((d + Math.random() * 16) % 16) | 0;
			d = Math.floor(d / 16);
			return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
		});
		return uuid;
	};

	public static isAuthorized(hasRoles: string[], rolesRequired: string[]) {
		let authorized = false;
		if (hasRoles.indexOf('admin') >= 0 || rolesRequired == null || rolesRequired.length === 0) {
			authorized = true;
		} else {
			authorized = hasRoles.some(role => {
				return rolesRequired.indexOf(role) >= 0;
			});
		}
		return authorized;
	}

	public static generateCode = () => {
		// Generates a random alphanumeric string of length 6
		return Math.random()
			.toString(36)
			.substr(2, 6);
	};


	// https://gist.github.com/bsara/c60dd6bbb04e0969221f607f0df68716
	public static getScrollbarWidth = () => {
		const outer = document.createElement('div');
		const inner = document.createElement('div');

		outer.style.visibility = 'hidden';
		outer.style.width = '100px';
		inner.style.width = '100%';

		outer.appendChild(inner);
		document.body.appendChild(outer);

		const widthWithoutScrollbar = outer.offsetWidth;

		outer.style.overflow = 'scroll';

		const widthWithScrollbar = inner.offsetWidth;

		document.body.removeChild(outer);

		return widthWithoutScrollbar - widthWithScrollbar;
	};

	public static debounce = (fn: () => void, delay = 50) => {
		let timer: any;
		return () => {
			clearTimeout(timer);
			timer = setTimeout(() => fn(), delay);
		};
	};

	public static disableBodyScrolling = (className: string = 'disable-scroll') => {
		document.body.classList.add(className);
		const fixedEls = document.querySelectorAll('[data-adjust-fixed-scrollbar]') as any;
		if (window.innerWidth < breakpoints.xl) {
			fixedEls.forEach((element: HTMLElement) => element.style.paddingRight = `${Utils.getScrollbarWidth()}px`);
		}
	};

	public static enableBodyScrolling = (className: string = 'disable-scroll') => {
		document.body.classList.remove(className);
		const fixedEls = document.querySelectorAll('[data-adjust-fixed-scrollbar]') as any;
		fixedEls.forEach((element: HTMLElement) => element.style.paddingRight = '');
	};

	public static formatCurrency = (value?: number, decimals?: number) => {
		if (value == null) {
			return '';
		}

		const formatter = new Intl.NumberFormat('en-CA', {
			style: 'currency',
			currency: 'CAD',
			minimumFractionDigits: decimals === undefined ? 2 : decimals,
			maximumFractionDigits: decimals === undefined ? 2 : decimals,
		});

		return formatter.format(value);
	};

	public static getNumberWithCommas = (value: number | string | undefined) => {
		if (value === undefined) {
			return '';
		}

		const parts = value.toString().split('.');
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return parts.join('.');
	};

	public static getAbbreviatedNumber = (value: number) => {
		if (value >= 1000000) {
			return value / 1000000 + 'm';
		} else if (value >= 1000) {
			return value / 1000 + 'k';
		}

		return value.toString();
	};

	public static setDocTitle = (value: string | undefined) => {
		const titleSuffix = 'Core';
		if (value) {
			document.title = `${value} | ${titleSuffix}`;
		} else {
			document.title = titleSuffix;
		}
	};

	public static isEmpty = (str: string) => {
		return typeof str === 'undefined' || !str || 0 === str.length;
	};

	public static filterPickList = (picklistCode: string, pickListItems: PickListItemResponseDTO[]) => (filter: any, row: any) => {
		const picklistitemValue = pickListItems.find((item: PickListItemResponseDTO) => item.code === picklistCode);
		if (filter.value === 'All') {
			return true;
		}
		else if (filter.value === 'Yes') {
			return row[picklistCode]!.indexOf(picklistitemValue!.id!) !== -1;
		} else {
			return row[picklistCode]!.indexOf(picklistitemValue!.id!) === -1;
		}
	};

	/** Extracts a value from an HTMLInputElement provided by a React.ChangeEvent */
	public static extractKeyValueFromChangeEvent = (event: React.ChangeEvent<HTMLInputElement>): { name: string, value: any } => {
		let value: any = event.target.value;
		if (value === 'true') {
			value = true;
		}
		if (value === 'false') {
			value = false;
		}
		let name: any = event.target.name;
		if (event.target.type === 'checkbox') {
			if (event.target.dataset != null) {
				// Don't split if single value
				if (value === '') {
					value = [];
				} else {
					value = value.split(',');
				}

				name = event.target.dataset.name;
			} else {
				value = event.target.checked;
			}
		}

		return {
			name,
			value
		};
	};

	/*For ant Components */
	public static extractValueFromDropDown = (dropdownValue: any) => {
		if (Array.isArray(dropdownValue)) {
			dropdownValue.map(value => value.key);
		}
	};
}

export default Utils;