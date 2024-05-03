import {CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import {embed, lastMessage, players} from "./dota"

export const data = new SlashCommandBuilder()
  .setName("shuffle")
  .setDescription("Распределить по командам");


export async function execute(interaction: CommandInteraction) {
  if (lastMessage.get(interaction.guildId!) === null) {
    interaction.reply({content: "lastMessage is null", ephemeral: true})
    return;
  }

  const playersList : string[] = players.get(interaction.guildId!)!;

  for (let i = 0; i < 5; i++) {
    if(Math.random() < 0.5)
      [playersList[i], playersList[i + 5]] = [playersList[i + 5], playersList[i]];
  }



  let listTeam1 : string = "";
  let listTeam2 : string = "";

  const numbers = ["1. ", "2. ", "3. ", "4. ", "5. "];

  for (let i = 0; i < 5; i++) {
    listTeam1 += numbers[i] + playersList![i] + "\n";
    listTeam2 += numbers[i] + playersList![i + 5] + "\n";
  }

  players.set(interaction.guildId!, playersList!);

  embed.setFields(
    {name: "Team 1", value: listTeam1, inline: true},
    {name: "Team 2", value: listTeam2, inline: true})

   lastMessage.get(interaction.guildId!)!.edit({embeds: [embed], components: []})

  interaction.reply({content: "Игра началась <@&1216689692079030312>", ephemeral: true});
}