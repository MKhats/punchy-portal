module.exports = {
	root: true,
	settings: {
		react: {
			version: 'detect',
		},
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'./punchcard-eslint.json',
	],
	rules:{
		'prettier/prettier': 0,
		'@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
		'react/jsx-fragments': ['error', 'element'],
		'react/jsx-boolean-value': ['error', 'always'],
		'indent': [
			'warn',
			'tab',
		],
		'quotes': [
			'warn',
			'single',
		],
		'semi': [
			'warn',
			'always',
		],
		'no-shadow': 0,
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'no-undef': 'off',
			},
		},
	],
	env: {
		jest: true,
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		}
	},
	parser: '@typescript-eslint/parser',
	plugins: ['react', '@typescript-eslint', 'react-hooks'],
};
