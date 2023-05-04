const {
  Client,
  GatewayIntentBits,
} = require('discord.js');
const { humanizeText } = require('./undetectable');
require('dotenv').config({ path: './keys.env' });

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isMessageContextMenuCommand()) return;

  const commandName = interaction.commandName;
  const targetMessage = interaction.targetMessage;

  let readability;
  let purpose;

  switch (commandName) {
    case 'Humanize General Writing':
      readability = 'High School';
      purpose = 'General Writing';
      break;
    case 'Humanize Essay':
      readability = 'University';
      purpose = 'Essay';
      break;
    case 'Humanise Story':
      readability = 'University';
      purpose = 'Story';
      break;
    default:
      return;
    }

    try {
      // Defer the reply to let the user know the bot is processing the request
      await interaction.deferReply();
  
      const humanizedContent = await humanizeText(
        targetMessage.content,
        readability,
        purpose
      );
  
      // Edit the deferred reply with the humanized content
      await interaction.editReply(humanizedContent);
    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: 'An error occurred while processing the text.',
        ephemeral: true,
      });
    }
  });
  
  client.login(process.env.BOT_TOKEN);

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const {
  humanizeGeneralWriting,
  humanizeEssay,
  humaniseStory,
} = require('./commands');

const commands = [
  humanizeGeneralWriting,
  humanizeEssay,
  humaniseStory,
].map((command) => command);
const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();