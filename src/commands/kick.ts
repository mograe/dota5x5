import {CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import {embed, lastMessage, players, setPlayers} from "./dota"

export const data = new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Кик нахуй")
  .addUserOption(option => 
    option.setName("member")
        .setDescription("Выбери еблана, которого надо кикинуть")
  );


export async function execute(interaction: CommandInteraction) {
  if (lastMessage === null) {
    interaction.reply({content: "lastMessage is null", ephemeral: true})
    return;
  }

  const member = interaction.options.getMember("member");

  setPlayers(players.filter((player) => player !== member?.toString()));

  if (players.length === 0)
    embed.setFields(
      {name: "Челы", value: "Пусто"}
    );
  else
    embed.setFields(
      {name: "Челы", value: players.join("\n")}
    );

  lastMessage.edit({embeds: [embed]});

  interaction.reply({content: `${member?.toString()} был кикнут нахуй` , ephemeral:true});
}