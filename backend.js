export default {

	async fetch(request) {

		const apiKey = 'GEMINI-API-KEY'; // Replace with your actual API key
		const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey;

		// Extract parameters from the URL
		const url = new URL(request.url);
		const word = url.searchParams.get('word');

		const requestBody = {
			"contents": [
			{
				"parts": [
				{
					"text": `You are an AI designed to calculate the nutrients of food items. Your mission is to calculate the calorie value and nutrients present in 100 grams of ${word}. Do not provide an descriptive response. Only print the nutrients along with value separated by colon (keep an empty space before and after the colon) and the nutrients should be separated by commas\n`
				}
				]
			}
			],
			"generationConfig": {
			"temperature": 0.9,
			"topK": 1,
			"topP": 1,
			"maxOutputTokens": 2048,
			"stopSequences": []
			},
			"safetySettings": [
			{
				"category": "HARM_CATEGORY_HARASSMENT",
				"threshold": "BLOCK_MEDIUM_AND_ABOVE"
			},
			{
				"category": "HARM_CATEGORY_HATE_SPEECH",
				"threshold": "BLOCK_MEDIUM_AND_ABOVE"
			},
			{
				"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
				"threshold": "BLOCK_MEDIUM_AND_ABOVE"
			},
			{
				"category": "HARM_CATEGORY_DANGEROUS_CONTENT",
				"threshold": "BLOCK_MEDIUM_AND_ABOVE"
			}
			]
		};

		console.log(requestBody.contents[0].parts);
		const response = await fetch(apiUrl, {
			mode: "no-cors",
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		const responseData = await response.json();
		const generatedNames = responseData.candidates[0].content.parts[0].text.split('\n').map(name => name.trim());
		return new Response(JSON.stringify(generatedNames), {
			statusText: "OK",
			headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
			},
		});

	},

};
