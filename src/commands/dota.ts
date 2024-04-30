import { ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, ComponentType, EmbedBuilder, Guild, GuildMember, InteractionResponse, SlashCommandBuilder } from "discord.js";

export let lastMessage: InteractionResponse | null = null;

export let players: string[] = [];

export async function setPlayers(playersNew: string[]) {
  players = playersNew;
}

export let embed = new EmbedBuilder();

export const data = new SlashCommandBuilder()
  .setName("dota")
  .setDescription("Start Dota 5x5");

export async function execute(interaction: CommandInteraction) {
  
    const join = new ButtonBuilder()
      .setCustomId('join_dota')
      .setLabel('Участвовать')
      .setStyle(ButtonStyle.Success)

    const cancel = new ButtonBuilder()
      .setCustomId("cancel_dota")
      .setLabel('Не участвовать')
      .setStyle(ButtonStyle.Danger)

    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(join, cancel)

    players = []

    embed
      .setColor(0x0099ff)
      .setTitle('Dota 2 5x5')
      .setFields(
        {name: "Челы", value: "Пусто"}
      )
  
  const response = await interaction.reply({
    content: "<@&1216689692079030312>",
    embeds: [embed],
    components:[row]
  });

  lastMessage = response;

  const collector = response.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 60000,
  }); 
  
  collector.on('collect', async (i) => {

    if (i.customId === 'join_dota' && !players.includes(i.member?.toString()!))
      players.push(i.member?.toString()!);
    else if (i.customId === 'cancel_dota' && players.includes(i.member?.toString()!))
      players = players.filter((player) => player !== i.member?.toString())
    
    if (players.length === 0)
      embed.setFields(
        {name: "Челы", value: "Пусто"}
      );
    else
      embed.setFields(
        {name: "Челы", value: players.slice(0,10).join("\n"), inline: true}
      );

    if (players.length > 10) {
      embed.addFields(
        {name: "Очередь", value: players.slice(10).join("\n"), inline: true}
      )
    }

    i.update({embeds: [embed]});
  });

}
