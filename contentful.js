import { createClient } from 'contentful-management';

const LOCALE = 'en-US';
const ENVIRONMENT_ID = 'master';
const CONTENT_TYPE_ID = 'reports';

const NEXT_PUBLIC_CF_SPACE_ID = process.env.NEXT_PUBLIC_CF_SPACE_ID;
const NEXT_PUBLIC_CF_CMA_TOKEN = process.env.NEXT_PUBLIC_CF_CMA_TOKEN;

const cmaClient = createClient(
  {
    space: NEXT_PUBLIC_CF_SPACE_ID,
    accessToken: NEXT_PUBLIC_CF_CMA_TOKEN,
  },
  {
    type: 'plain',
  }
);

export const createReport = async (email, reportText) => {
  const createdReport = await cmaClient.entry.create(
    {
      spaceId: NEXT_PUBLIC_CF_SPACE_ID,
      environmentId: ENVIRONMENT_ID,
      contentTypeId: CONTENT_TYPE_ID,
    },
    {
      fields: {
        email: {
          [LOCALE]: email,
        },
        reportText: {
          [LOCALE]: reportText,
        },
      },
    }
  );

  return {
    id: createdReport.sys.id,
  };
};

export const getUserReports = async (email) => {
  const reports = await cmaClient.entry.getMany({
    spaceId: NEXT_PUBLIC_CF_SPACE_ID,
    environmentId: ENVIRONMENT_ID,
    'fields.email[match]': email,
  });

  console.log('reports - ', reports);
};
