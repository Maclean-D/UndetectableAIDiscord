const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

const humanizeGeneralWriting = new ContextMenuCommandBuilder()
  .setName('Humanize General Writing')
  .setType(ApplicationCommandType.Message);

const humanizeEssay = new ContextMenuCommandBuilder()
  .setName('Humanize Essay')
  .setType(ApplicationCommandType.Message);

const humaniseStory = new ContextMenuCommandBuilder()
  .setName('Humanise Story')
  .setType(ApplicationCommandType.Message);

module.exports = {
  humanizeGeneralWriting,
  humanizeEssay,
  humaniseStory,
};