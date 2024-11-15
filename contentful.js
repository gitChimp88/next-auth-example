import { createClient } from 'contentful-management';

const LOCALE = 'en-US';
const ENVIRONMENT_ID = 'master';
const CONTENT_TYPE_ID = 'users';
const { CF_SPACE_ID, CF_CMA_TOKEN } = process.env;

const cmaClient = createClient(
  {
    space: CF_SPACE_ID,
    accessToken: CF_CMA_TOKEN,
  },
  {
    type: 'plain',
  }
);

const createUser = async (email) => {
  const createdUser = await cmaClient.entry.create(
    {
      spaceId: CF_SPACE_ID,
      environmentId: ENVIRONMENT_ID,
      contentTypeId: CONTENT_TYPE_ID,
    },
    {
      fields: {
        email: {
          [LOCALE]: email,
        },
      },
    }
  );

  return {
    id: createdUser.sys.id,
    email,
  };
};

export const getOrCreateUser = async (email) => {
  const user = await cmaClient.entry.getMany({
    spaceId: CF_SPACE_ID,
    environmentId: ENVIRONMENT_ID,
    'fields.email[match]': email,
  });

  if (user.total === 1) {
    return {
      id: user.items[0].sys.id,
      email,
    };
  }

  return createUser(email);
};
