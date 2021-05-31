import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';

export const sendEmail: HttpFunction = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({headers: req.headers, body: req.body}, null, 4));
};
