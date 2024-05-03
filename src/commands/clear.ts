import {CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import {embed, lastMessage, players} from "./dota"

export const data = new SlashCommandBuilder()
  .setName("clear")
  .setDescription("Очистить список");


export async function execute(interaction: CommandInteraction) {
  if (lastMessage.get(interaction.guildId!) === null) {
    interaction.reply({content: "lastMessage is null", ephemeral: true})
    return;
  }

  const lastMessageGuild = lastMessage.get(interaction.guildId!);

  players.set(interaction.guildId!, new Array<string>(10).fill(" "));

  const numbers = ["1. ", "2. ", "3. ", "4. ", "5. "];

    embed
      .setFields(
        {name: "Team 1", value: numbers.join("\n"), inline: true},
        {name: "Team 2", value: numbers.join("\n"), inline: true}
      )

  lastMessageGuild!.edit({embeds: [embed]});

  interaction.reply({content: "Список очищен", ephemeral:true});
}
