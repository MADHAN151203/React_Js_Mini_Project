const {Configuration , OpenAIApi} = require('openai');
const configuration = new Configuration({apiKey:"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"});
const openai = new OpenAIApi(configuration);

export async function sendMessgaeToOpenAI(message){
    const res =await openai.createCompletion({
        model : 'gpt-3.5-turbo-instruct',
        prompt : message,
        temperature :0.7,
        max_tokens:500,
        top_p:1,
        frequency_penalty: 0,
        // presense_penalty:0
    });
    return res.data.choices[0].text
}