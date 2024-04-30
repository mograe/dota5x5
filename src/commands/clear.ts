import {CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import {embed, lastMessage, players} from "./dota"

export const data = new SlashCommandBuilder()
  .setName("clear")
  .setDescription("Очистить список");


export async function execute(interaction: CommandInteraction) {
  if (lastMessage === null) {
    interaction.reply({content: "lastMessage is null", ephemeral: true})
    return;
  }

  players.length = 0;

  embed.setFields({name: "Челы", value: "Пусто"});

  lastMessage.edit({embeds: [embed]});

  interaction.reply({content: "Список очищен", ephemeral:true});
}
