import {CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import {embed, lastMessage, players} from "./dota"

export const data = new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Кик нахуй")
  .addUserOption(option => 
    option.setName("member")
        .setDescription("Выбери еблана, которого надо кикинуть")
  );


export async function execute(interaction: CommandInteraction) {
  if (lastMessage.get(interaction.guildId!) === null) {
    interaction.reply({content: "lastMessage is null", ephemeral: true})
    return;
  }

  const member = interaction.options.getMember("member");

  let playersList = players.get(interaction.guildId!);
  playersList = playersList?.map((e) => {
    if (e === member!.toString()) return " ";
    return e;
  })


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
    {name: "Team 2", value: listTeam2, inline: true}
  )

  lastMessage.get(interaction.guildId!)!.edit({embeds: [embed]});

  interaction.reply({content: `${member?.toString()} был кикнут нахуй` , ephemeral:true});
}