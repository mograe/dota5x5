import { ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, ComponentType, EmbedBuilder, Guild, GuildMember, InteractionResponse, SlashCommandBuilder } from "discord.js";

export let lastMessage = new Map<string, InteractionResponse>();

export const players = new Map<string, string[]>();

export const embed = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle('Dota 2 5x5');

export const data = new SlashCommandBuilder()
  .setName("dota")
  .setDescription("Start Dota 5x5");

export async function execute(interaction: CommandInteraction) {
  
  players.set(interaction.guildId!, new Array<string>(10).fill(" "));

  const buttons : ButtonBuilder[] = []  
  
  for (let i = 1; i <= 5; i++) {
    buttons.push(
      new ButtonBuilder()
      .setCustomId('button' + i)
      .setLabel(i.toString())
      .setStyle(ButtonStyle.Primary)
    )
  }

  const cancel = new ButtonBuilder()
    .setCustomId("cancel")
    .setLabel("Не участвовавть")
    .setStyle(ButtonStyle.Danger)

    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(buttons);

    const row_cancel = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(cancel);

    
  const numbers = ["1. ", "2. ", "3. ", "4. ", "5. "];

    embed
      .setFields(
        {name: "Team 1", value: numbers.join("\n"), inline: true},
        {name: "Team 2", value: numbers.join("\n"), inline: true}
      )
  
  const response = await interaction.reply({
    content: "<@&1036603543664201819>",
    embeds: [embed],
    components:[row, row_cancel]
  });

  lastMessage.set(interaction.guildId!, response);

  const collector = response.createMessageComponentCollector({
    componentType: ComponentType.Button,
  }); 
  
  collector.on('collect', async (i) => {

    let playersList = players.get(i.guildId!);

    if (i.customId.startsWith("button")) {
      playersList = playersList?.map((e) => {
        if (e === i.member?.toString()) return " ";
        return e;
      })
      const pos = Number(i.customId.slice(-1)) - 1;
      if (playersList![pos] == " ") {
        playersList![pos] = i.member?.toString()!;
      }
      else if (playersList![pos + 5] == " ") {
        playersList![pos + 5] = i.member?.toString()!;
      }
    }

    else if(i.customId === "cancel") {
      playersList = playersList?.map((e) => {
        if (e === i.member?.toString()) return " ";
        return e;
      })
    }

    let listTeam1 : string = "";
    let listTeam2 : string = "";

    for (let i = 0; i < 5; i++) {
      listTeam1 += numbers[i] + playersList![i] + "\n";
      listTeam2 += numbers[i] + playersList![i + 5] + "\n";
    }

    embed.setFields(
      {name: "Team 1", value: listTeam1, inline: true},
      {name: "Team 2", value: listTeam2, inline: true}
    )

    players.set(i.guildId!, playersList!);

    i.update({embeds: [embed]});
  });

}
