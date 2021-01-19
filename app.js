const { App } = require('@slack/bolt');
const {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ListTablesCommand,
  CreateTableCommand,
  DeleteTableCommand
} = require('@aws-sdk/client-dynamodb');
const dotenv = require('dotenv');

const db = new DynamoDBClient({ region: 'local', endpoint: 'http://localhost:8000' });

const handleButtonClick = require('./handlers/handleButtonClick');
const handleButtonLink = require('./handlers/handleButtonLink');
const handleMessage = require('./handlers/handleMessage');
const handleCommand = require('./handlers/handleCommand');
const handleLinkShared = require('./handlers/handleLinkShared');

dotenv.config({ path: './config/config.env' });

const app = new App({
  //token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: process.env.STATE_SECRET,
  scopes: [
    'channels:history',
    'chat:write',
    'commands',
    'groups:history',
    'im:history',
    'links:read',
    'links:write',
    'mpim:history',
    'channels:read',
    'groups:read',
    'channels:manage',
    'chat:write',
    'incoming-webhook'
  ],
  installationStore: {
    storeInstallation: async installation => {
      const getCommand = ({ id, installation }) => {
        const command = new PutItemCommand({
          TableName: 'AppBolt',
          Item: {
            id: { S: id },
            installation: { S: JSON.stringify(installation) }
          }
        });

        return command;
      };

      let data;

      try {
        if (installation.isEnterpriseInstall) {
          data = await db.send(getCommand({ id: installation.enterprise.id, installation }));
        } else {
          data = await db.send(getCommand({ id: installation.team.id, installation }));
        }
      } catch (err) {
        console.log('Failed saving installation data to installationStore');
        console.error(err);
      }

      return data;
    },
    fetchInstallation: async InstallQuery => {
      const getCommand = id => {
        const command = new GetItemCommand({ TableName: 'AppBolt', Key: { id: { S: id } } });

        return command;
      };

      try {
        let data;
        if (InstallQuery.isEnterpriseInstall && InstallQuery.enterpriseId !== undefined) {
          data = await db.send(getCommand(InstallQuery.enterpriseId));
        }

        if (InstallQuery.teamId !== undefined) {
          data = await db.send(getCommand(InstallQuery.teamId));
        }

        return JSON.parse(data.Item.installation.S);
      } catch (err) {
        console.log('Failed fetching installation');
        console.error(err);
      }
    }
  }
});

app.message(/hello/i, handleMessage);

app.action('button_click', handleButtonClick);

app.action('button_link', handleButtonLink);

app.command('/my-app', handleCommand);

app.event('link_shared', handleLinkShared);

(async () => {
  // await db.send(new DeleteTableCommand({ TableName: 'AppBolt' }));
  const tables = await db.send(new ListTablesCommand({}));

  if (!tables.TableNames.includes('AppBolt')) {
    const tableParams = {
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      },
      TableName: 'AppBolt'
    };

    try {
      const data = await db.send(new CreateTableCommand(tableParams));
      console.log('Table created.', data.TableDescription.TableName);
    } catch (err) {
      console.log('Error', err);
    }
  }

  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
