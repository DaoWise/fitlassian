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
  return issueData.fields.assignee.accountId;
});

resolver.define('check-is-strava-connected', async ({ context, payload }) => {
  const { assigneeAccountId } = payload;
  const stravaSecret = await storage.getSecret(`${assigneeAccountId}:strava:secret`);
  console.log(stravaSecret, !!stravaSecret, `${assigneeAccountId}:strava:secret`);
  return !!stravaSecret;
});

resolver.define('set-strava-secret', async ({ context, payload }) => {
  const { assigneeAccountId } = payload;
  const stravaSecret = await storage.setSecret(`${assigneeAccountId}:strava:secret`, `${assigneeAccountId}:strava`);
  console.log(`${assigneeAccountId}:strava:secret`);
});

resolver.define('disconnect-strava', async ({ context, payload }) => {
  const { assigneeAccountId } = payload;
  await storage.deleteSecret(`${assigneeAccountId}:strava:secret`);
});

resolver.define('get-total-distance-covered', async ({ context, payload }) => {
  return 10;
});

resolver.define('get-current-user-id', async ({ context, payload }) => {
  return context.accountId;
});

resolver.define('get-total-healthGoal', async ({ context, payload }) => {
  const { assigneeAccountId } = payload;
  const currentTask = await getIssueData(context);
  
  const fieldData = await getFieldData();
  const storyPointsFieldData = getStoryPointsFieldData(fieldData);
  const issueData = await getIssueData(context);
  const currentTaskStoryPoints = getStoryPoints(storyPointsFieldData, currentTask) || 0;
  let assigneeGoal = await storage.get(`${assigneeAccountId}:goal`);

  // if assigneeGoal has tasks
  if(assigneeGoal && Object.keys(assigneeGoal.tasks).length > 0) {
    // if current task exists in tasks
    if(assigneeGoal.tasks[currentTask.key]) {
      console.log("current task exists in tasks");

      // if current task belongs to assignee
      if(currentTask.fields.assignee.accountId == assigneeAccountId) {
        console.log("task belongs to assignee");
        console.log({ fields: assigneeGoal.tasks[currentTask.key].fields})
        // reset task sp in assigneeGoal
        const taskStoryPointData = getStoryPointsFieldData(assigneeGoal.tasks[currentTask.key].fields);
        const taskStoryPoints = getStoryPoints(taskStoryPointData, assigneeGoal.tasks[currentTask.key]) || 0;
        console.log({ currentTaskStoryPoints, taskStoryPoints });

        if(taskStoryPoints !== currentTaskStoryPoints) {
          assigneeGoal.inProgressTaskGoal -= taskStoryPoints;
          assigneeGoal.inProgressTaskGoal += currentTaskStoryPoints;
        }

        // if current task status done
        if(currentTask.fields.status.name === 'Done') {
          console.log("task is done");
          // add task sp to completed task goal
          assigneeGoal.completedTaskGoal += currentTaskStoryPoints;
          // subtract task sp from in progress goal
          assigneeGoal.inProgressTaskGoal -= currentTaskStoryPoints;
          // remove task from tasks
          delete assigneeGoal.tasks[currentTask.key];
        }
      } else {
        // if current task doesnt not belong to assignee
        
        // subtract sp from in progress goal
        assigneeGoal.inProgressTaskGoal -= currentTaskStoryPoints;

        // remove task from tasks
        delete assigneeGoal.tasks[currentTask.key];
      }
    } else {
      if(currentTaskStoryPoints) {
        // if current task does not exist in tasks and task belongs to assignee
        if(currentTask.fields.assignee.accountId == assigneeAccountId) {
          // if current task status done
          if(currentTask.fields.status.name === 'Done') {
            // add task sp to completed task goal
            assigneeGoal.completedTaskGoal += currentTaskStoryPoints;
          } else {
            // if current task status other than done
            
            // add task to tasks
            assigneeGoal.tasks[currentTask.key] = currentTask;
            
            // add sp to in progress goal
            assigneeGoal.inProgressTaskGoal += currentTaskStoryPoints;
          }
        }
      }
    }
  } else {
    assigneeGoal = {
      completedTaskGoal: 0,
      inProgressTaskGoal: 0,
      tasks: {}
    };
    // if assigneeGoal doesn't have tasks
    
    // if current task has sp
    if(currentTaskStoryPoints) {
      // check current task status

      // if status done
      if(currentTask.fields.status.name === 'Done') {
        // set sp in completed task goal
        assigneeGoal.completedTaskGoal += currentTaskStoryPoints;
      } else {
        // else set sp in in progress goal
        assigneeGoal.inProgressTaskGoal += currentTaskStoryPoints;
        // set task in tasks
        assigneeGoal.tasks[currentTask.key] = currentTask;
      }
    }
  }

  // write task object back to storage
  await storage.set(`${assigneeAccountId}:goal`, assigneeGoal);
  return assigneeGoal.completedTaskGoal + assigneeGoal.inProgressTaskGoal;
});

export const handler = resolver.getDefinitions();