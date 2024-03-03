import axios from 'axios';

const engineId = 'stable-diffusion-v1-6';
const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
const apiKey = 'sk-UfHDzmQVj4khARuCkMNnJewHRGenbclb1wIhdEZcTN1MX4sE';


  export const generate = async (text, styleOption) => {
  
  const postData = {
    style_preset: styleOption,
    text_prompts: [
      {
        text: text,
      },
    ],
    cfg_scale: 7,
    height: 1024,
    width: 1024,
    steps: 30,
    samples: 3,
  };


  if(!postData.style_preset){
    delete postData.style_preset
  } 
  

   return await axios.post(`${apiHost}/v1/generation/${engineId}/text-to-image`, postData, {
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
        },
    })
    
  }

  export const LoginRequest = (login, password) => {
    return axios.post('/api/login', {
      login,
      password
    })
  } 


  export const SignupRequest = (params) => {
    return axios.post('/api/signup', params)
  }