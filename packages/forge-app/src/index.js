import Resolver from '@forge/resolver';
import { storage } from '@forge/api';
import api, { route } from "@forge/api";

const resolver = new Resolver();

const STORY_POINTS_FIELD_NAME = "Story point estimate";

const getFieldData = async () => {
  const response = await api.asUser().requestJira(route`/rest/api/3/field`);
  const fieldData = await response.json();
  return fieldData;
};

const getStoryPointsFieldData = (fieldData) => {
  if (fieldData) {
    for (const field of fieldData) {
      if(field.name.toLowerCase().startsWith('story')) {
        console.log(field.name)
      }
      if (field.name === STORY_POINTS_FIELD_NAME) {
        return field;
      }
    }
  }
  return undefined;
};

const getIssueData = async (context) => {
  // @ts-ignore
  const issueKey = context.extension.issue.key;
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/${issueKey}?expand=renderedFields`);
  const issueData = await response.json();
  return issueData;
};

const getStoryPoints = (storyPointsFieldData, issueData) => {
  if (
    storyPointsFieldData &&
    storyPointsFieldData.id &&
    issueData &&
    issueData.fields &&
    issueData.fields[storyPointsFieldData.id]
  ) {
    return issueData.fields[storyPointsFieldData.id];
  }
  return undefined;
};

resolver.define('get-story-points', async ({ context }) => {
  const fieldData = await getFieldData();
  const storyPointsFieldData = getStoryPointsFieldData(fieldData);
  const issueData = await getIssueData(context);
  return getStoryPoints(storyPointsFieldData, issueData);
});

resolver.define('get-assignee-account-id', async ({ context }) => {
  const issueData = await getIssueData(context);
  console.log('Assignee', issueData.fields.assignee);
  return issueData.fields.assignee.accountId;
});

resolver.define('check-is-strava-connected', async ({ context, payload }) => {
  const { assigneeAccountId } = payload;
  const stravaSecret = await storage.getSecret(`${assigneeAccountId}:strava:secret`);
  return !!stravaSecret;
});

resolver.define('set-strava-secret', async ({ context, payload }) => {
  const { assigneeAccountId } = payload;
  const stravaSecret = await storage.setSecret(`${assigneeAccountId}:strava:secret`, assigneeAccountId);
  return !!stravaSecret;
});

resolver.define('disconnect-strava', async ({ context, payload }) => {
  const { assigneeAccountId } = payload;
  await storage.deleteSecret(`${assigneeAccountId}:strava:secret`);
});

export const handler = resolver.getDefinitions();