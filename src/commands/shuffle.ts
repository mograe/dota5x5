import {CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import {embed, lastMessage, players, setPlayers} from "./dota"

export const data = new SlashCommandBuilder()
  .setName("shuffle")
  .setDescription("Распределить по командам");


export async function execute(interaction: CommandInteraction) {
  if (lastMessage === null) {
    interaction.reply({content: "lastMessage is null", ephemeral: true})
    return;
  }

  if (players.length < 10) {
    interaction.reply({content: "Мало игроков для старта", ephemeral: true})
    return;
  }

  const players10 = players.slice(0, 10)

  players10.sort(() => Math.random() - 0.5);

   const team1 = players10.slice(0, 5);
   const team2 = players10.slice(5);

   const newEmbed = new EmbedBuilder()
   .setColor(0x0099ff)
   .setTitle("5x5")
   .setFields([
    {name: "Команда 1", value: team1.join("\n"), inline: true},
    {name: "Команда 2", value: team2.join("\n"), inline: true}
   ]
   )

   lastMessage.edit({embeds: [newEmbed], components: []})

  interaction.reply({content: "Игра началась <@&1216689692079030312>", ephemeral: true});
}