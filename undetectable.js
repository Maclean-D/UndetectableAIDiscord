const fetch = require('node-fetch');

async function humanizeText(content, readability, purpose) {
  const apiKey = process.env.UNDETECTABLE_API_KEY;
  const submitUrl = 'https://api.undetectable.ai/submit';
  const documentUrl = 'https://api.undetectable.ai/document';

  const submitHeaders = {
    'api-key': apiKey,
    'Content-Type': 'application/json',
  };

  const submitBody = JSON.stringify({
    content,
    readability,
    purpose,
  });

  const submitOptions = {
    method: 'POST',
    headers: submitHeaders,
    body: submitBody,
  };

  const response = await fetch(submitUrl, submitOptions);
  const document = await response.json();
  
  if (document.status === 'Insufficient Word Balance') {
    throw new Error('Insufficient Word Balance');
  }

  const documentId = document.id;

  let processing = true;
  let humanizedContent = '';

  while (processing) {
    await new Promise((resolve) => setTimeout(resolve, 30000)); // Wait for 30 seconds

    const documentHeaders = {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    };

    const documentBody = JSON.stringify({
      id: documentId,
    });

    const documentOptions = {
      method: 'POST',
      headers: documentHeaders,
      body: documentBody,
    };

    const documentResponse = await fetch(documentUrl, documentOptions);
    const documentData = await documentResponse.json();

    if (documentData.status === 'done') {
      processing = false;
      humanizedContent = documentData.output;
    }
  }

  return humanizedContent;
}

module.exports = {
  humanizeText,
};