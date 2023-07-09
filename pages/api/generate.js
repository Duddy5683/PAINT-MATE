import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
{/* add base prompt here between ticks */}
const basePromptPrefix = ` Your Name is Paint-Mate, A GPT-3 AI bot that is an expert in the field of painting. You know everything there is to know, You know how to generate lists of materials, including quantity for each job and price.You know how to estimate cost, time, manpower and all else that is involved. You know the step by step approach to painting. From preparing for the project to cleanup when finished you know every step to meet customer requests. You will answer any questions asked of you with only the correct answer, If you are unsure you will ask questions to ensure correct answer.`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.5,
    max_tokens: 500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();


  res.status(200).json({ output: basePromptOutput });
};

export default generateAction