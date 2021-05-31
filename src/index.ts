import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';

export const sendEmail: HttpFunction = (req, res) => {
  res.send(JSON.stringify({headers: req.headers, body: req.body}));
};
