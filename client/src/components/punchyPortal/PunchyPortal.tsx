import React, { useEffect, useState } from 'react';
import { Button, Checkbox,  Input, Page, Select } from 'components/core';
import { IconAdd, IconBrand, IconChevronLeft, IconChevronRight, IconEdit, IconView } from 'assets/icons';
import PromptCard from './PromptCard';
import { Controller, useForm } from 'react-hook-form';
import PromptFilterList from './PromptFilterList';
import { min } from 'lodash';

interface DataItem {
    promptTitle: string;
    category: string;
    promptText: string;
}

const PunchyPortal = () => {
	const [isRightColumnVisible, setRightColumnVisible] =
		useState<boolean>(false);
	const [data, setData] = useState<DataItem[]>([]);

	const
		[inputText, setInputText] =
useState
(
	''
);
	const
		[assertiveness, setAssertiveness] =
useState
(5);
	const
		[simplicity, setSimplicity] =
useState
(5);
	const
		[formality, setFormality] =
useState
(5);
	const
		[analytical, setAnalytical] =
useState
(5);
	const
		[enthusiasm, setEnthusiasm] =
useState
(5);
	const
		[apiResponse, setApiResponse] =
useState
(
	''
);

	// Fetch the JSON data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('promptLibrary.json');
				const json = await response.json();
				setData(json);
			} catch (error) {
				console.error('Error fetching the JSON:', error);
			}
		};

		fetchData();
	}, []);

	const toggleRightColumn = () => {
		setRightColumnVisible((prev) => !prev);
	};

	const { control } = useForm();


	const mockData = [
		{ id: 1, title: 'Testing One', image: <IconAdd /> },
		{ id: 2, title: 'Testing Two', image: <IconBrand /> },
		{ id: 3, title: 'Testing Three', image: <IconView /> },
		{ id: 4, title: 'Testing Four', image: <IconEdit /> },
	];

	const tempCategories = [
		{ value: 'Onboarding', label: 'Onboarding' },
		{ value: 'Style Guide', label: 'Style Guide' },
		{ value: 'Best Practices', label: 'Best Practices' },
		{ value: 'Design Language', label: 'Design Language' },
	];

	const azureOpenAiUrl = 'https://punchcard-ai.openai.azure.com/openai/deployments/punchcard-chat-gpt-4o/chat/completions?api-version=2023-03-15-preview';
	const azureApiKey = 'd89c47dba94d436cb7aa2a1cbb3f54e5'; // Replace with your actual API key
	// Function to send prompt to the Azure OpenAI API
	const sendPromptToAPI = async () => {
		const requestBody = {
			messages: [
				{
					role: 'system',
					content: 'You are a helpful assistant for Punchcard Systems.'
				},
				{
					role: 'user',
					content: generatePrompt(inputText)
				}
			],
			max_tokens: 1000,
			temperature: 0.71
		};
		try {
			const response = await fetch(azureOpenAiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'api-key': azureApiKey, // Authorization header for Azure OpenAI API
				},
				body: JSON.stringify(requestBody)
			});
			if (response.ok) {
				const data = await response.json();
				setApiResponse(JSON.stringify(data.choices[0].message.content)); // Adjust based on response structure
			} else {
				console.error(`Error: ${response.status}`);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	   const generatePrompt = (text:string) => {
		return `You are a helpful assistant and you work for a digital agency called punchcard systems. 
		  On a scale of 1-10 (1 being low and 10 being high), please incorporate the following into the response: 
		  Assertiveness: ${assertiveness}/10, Simplicity: ${simplicity}/10, Formality: ${formality}/10, Analytical: ${analytical}/10, Enthusiasm: ${enthusiasm}/10. 
		  Text: "${text}".`;
	   };

	return (
		<Page title="Punchy Portal">
			<div className="container-fluid">
				<div className="row">
					{/* Left Column */}
					<div className="col-3 d-flex flex-column overflow-auto bg-punchy-tan" style={{height: '100vh'}}>
						<h2 className="pt-4 ms-3">Prompts</h2>
						<Controller
							control={control}
							name="promptCategories"
							aria-labelledby="promptCategories"
							render={({ field }) =>
								<div className="mb-3">
									<Select
										value={field.value}
										onChange={field.onChange}
										options={tempCategories}
										className="ms-3"
										placeholder="Prompt category"
									/>
								</div>
							}
						/>
						<div className="w-100 py-3 pb-3 pt-2">
							<div className="mb-3 ps-3">
								<PromptFilterList/>
							</div>
							{data.map((data) =>

								<div key={`${data.promptTitle} - ${data.promptTitle}`} className="pb-4">
									<PromptCard key={data.promptTitle} title={data.promptTitle} />
								</div>
							)}
						</div>
					</div>

					{/* Center Column */}
					<div className={`bg-punchy-yellow col-6 d-flex align-items-end ${isRightColumnVisible ? '' : 'w-75'
					}`} >
						<div className="w-100 p-3">
							{apiResponse && <div className="bg-punchy-tan p-2">Response: {apiResponse}</div>}
							<div className={`bg-punchy-yellow col-6 d-flex mt-2 align-items-end ${isRightColumnVisible ? 'w-100' : 'w-75'}`}>
								<div className="w-100 p-3 d-flex">
									<Input
										placeholder="Type your message here..."
										style={{ height: '55px'}}
										className="bg-punchy-mustard"
										value={inputText}
										onChange={(e) => setInputText(e.target.value)}
									/>
									<Button onClick={sendPromptToAPI}>Send</Button>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column */}
					<div
						className={`col-3 bg-punchy-tan overflow-auto p-2 ${isRightColumnVisible ? '' : 'd-none'
						}`}
						style={{height: '100vh'}}
					>
						<Button
							onClick={toggleRightColumn}
							style={{position:'relative', right: '10px'}}
						>
							<IconChevronRight />
						</Button>
						<div className="d-flex flex-column">
							<div className="d-flex align-items-baseline ms-4" style={{whiteSpace:'nowrap'}}>
								<h2> Prompt Personality</h2>
							</div>
							<div className="p-3 d-flex align-self-baseline ms-3" >
								<Checkbox isSwitch={true} className="ms-auto" /> <span>Recommended values</span>
							</div>

						</div>
						<div className="d-flex flex-column p-4">
							<input type="range" className="mb-2 w-100" id="voice-slider" defaultValue="0" />
							<div className="d-flex justify-content-between w-100">
								<label htmlFor="voice-slider" className="me-2 text-uppercase">Assertive</label>
								<label htmlFor="voice-slider" className="ms-2 text-uppercase">Passive</label>
							</div>
						</div>
						<div className="d-flex flex-column p-4">
							<input type="range" className="mb-2 w-100" id="voice-slider" defaultValue="0" />
							<div className="d-flex justify-content-between w-100">
								<label htmlFor="voice-slider" className="me-2 text-uppercase">Simple</label>
								<label htmlFor="voice-slider" className="ms-2 text-uppercase">Complex</label>
							</div>
						</div>
						<div className="d-flex flex-column p-4">
							<input type="range" className="mb-2 w-100" id="voice-slider" defaultValue="0" />
							<div className="d-flex justify-content-between w-100">
								<label htmlFor="voice-slider" className="me-2 text-uppercase">Formal</label>
								<label htmlFor="voice-slider" className="ms-2 text-uppercase">Informal</label>
							</div>
						</div>
						<div className="d-flex flex-column p-4">
							<input type="range" className="mb-2 w-100" id="voice-slider" defaultValue="0" />
							<div className="d-flex justify-content-between w-100">
								<label htmlFor="voice-slider" className="me-2 text-uppercase">Analytical</label>
								<label htmlFor="voice-slider" className="ms-2 text-uppercase">Creative</label>
							</div>
						</div>
						<div className="d-flex flex-column p-4">
							<input type="range" className="mb-2 w-100" id="voice-slider" defaultValue="0" />
							<div className="d-flex justify-content-between w-100">
								<label htmlFor="voice-slider" className="me-2 text-uppercase">Nonchalant</label>
								<label htmlFor="voice-slider" className="ms-2 text-uppercase">Enthusiastic</label>
							</div>
						</div>


					</div>
				</div>
				{/** Toggle Open */}
				<div
					className={`position-fixed ${isRightColumnVisible ? 'd-none' : ''}`}
					style={{ right: '10px', top: '5px' }}
				>
					<Button onClick={toggleRightColumn}>
						<IconChevronLeft />
					</Button>
				</div>
			</div>
		</Page>
	);
};

export default PunchyPortal;
