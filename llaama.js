export default {
    async fetch(request, env) {
      // Handle preflight OPTIONS request for CORS
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        });
      }
  
      // Handle POST request
      if (request.method !== 'POST') {
        return new Response("Send a POST request with a JSON body containing { prompt: 'your question' }", { status: 400 });
      }
  
      try {
        const { prompt } = await request.json();
  
        if (!prompt) {
          return new Response("Missing 'prompt' field in JSON body", { status: 400 });
        }
  
        // Modify prompt to guide AI towards structured, helpful responses
        let emotionalPrompt = `
  You are a compassionate therapist and wellness coach. The user is feeling stressed or overwhelmed. 
  Offer emotional support first. Then, provide practical stress relief exercises, and recommend 
  safe, over-the-counter supplements. Do not give prescription medication advice.
  
  Format your response in clear sentences.
  
  Here is the user's input: "${prompt}"
  `;
  
        // Call Llama-3 with the structured prompt
        let response = await env.AI.run('@cf/meta/llama-3-8b-instruct', { prompt: emotionalPrompt });
  
        // Extract AI response
        let rawReply = response.response;
  
        // Split response into sentences, trim whitespace, and filter out empty entries
        let sentences = rawReply.split(".").map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);
  
        // Format response with each sentence on a new line
        let formattedReply = sentences.join(".\n") + ".";  // Add a period at the end of the response
  
        // Set headers for CORS
        const headers = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json',
        };
  
        return new Response(JSON.stringify({ input: prompt, response: formattedReply }), {
          status: 200,
          headers: headers,
        });
  
      } catch (error) {
        return new Response("Error processing request: " + error.message, { status: 500 });
      }
    }
  };
  