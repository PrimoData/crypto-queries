import { NextApiRequest, NextApiResponse } from 'next';
import { BigQuery } from '@google-cloud/bigquery';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error('GOOGLE_APPLICATION_CREDENTIALS is not set');
  }

  const gcsKey = JSON.parse(
    Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
  );

  const { query } = req.body;

  const bigqueryClient = new BigQuery({
    credentials: {
      client_email: gcsKey.client_email,
      private_key: gcsKey.private_key
    },
    projectId: gcsKey.project_id
  });
  
  const options = {
    query: query,
    location: 'us-central1',
  };

  const [job] = await bigqueryClient.createQueryJob(options);
  const [rows] = await job.getQueryResults();

  res.status(200).json({ data: rows });
}