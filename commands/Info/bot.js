const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  Colors,
  Embed,
  ActionRowBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  SelectMenuBuilder,
} = require("discord.js");
const { connection } = require("mongoose");
const os = require("os");

/**
 * @param {ChatInputCommandInteraction} interaction;
 * @param {Embed};
 * @param {Colors};
 */

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bot")
    .setDescription("Every bot information.")
    .addSubcommand((sub) =>
      sub.setName("info").setDescription("Bot information.")
    )

    .addSubcommand((sub) =>
      sub.setName("ping").setDescription("Return bot ping")
    )
    .addSubcommand((sub) =>
      sub.setName("invite").setDescription("Invite Reliable to your server")
    )
    .addSubcommand((sub) =>
      sub.setName("uptime").setDescription("Returns bot uptime")
    )
    .addSubcommand((sub) =>
      sub.setName("credit").setDescription("see my developers")
    )
    .addSubcommand((sub) =>
      sub.setName("help").setDescription("Get every command of bot")
    ),
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "info") {
      const status = [
        "Disconnected",
        "Connected",
        "Connecting",
        "Disconnecting",
      ];

      let link_button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Refresh")
          .setStyle(ButtonStyle.Success)
          .setCustomId("Refresh")
      );

      const embed = new EmbedBuilder()
        .setTitle(client.user.username + " Bot Statistics")
        .setThumbnail(
          client.user.displayAvatarURL({ dynamic: true, size: 1024 })
        )
        .addFields(
          {
            name: "<:reliable_servers:1054391971147419748> Servers:",
            value: `\`\`\`ini\n[ ${client.guilds.cache.size} ]\`\`\``,
            inline: true,
          },
          {
            name: "<a:reliable_members:1030037727485362197> Users:",
            value: `\`\`\`ini\n[ ${client.guilds.cache.reduce(
              (a, b) => a + b.memberCount,
              0
            )} ]\`\`\``,
            inline: true,
          },
          {
            name: "<:reliable_channel:1054392236978229328>  Channels",
            value: `\`\`\`ini\n[ ${client.channels.cache.size} ]\`\`\``,
            inline: true,
          },
          {
            name: "<a:reliable_uptime:1030037876169252864> Uptime: ",
            value: `<t:${Math.floor(
              Number(Date.now() - client.uptime) / 1000
            )}:R>`,
            inline: true,
          },
          {
            name: "<a:reliable_ping:1054391858945589288> Ping:",
            value: `\`\`\`ini\n[ ${client.ws.ping} ms ]\`\`\``,
            inline: true,
          },
          {
            name: "<:reliable_discordJS:1054392131004940298>  Discord.js:",
            value: `\`\`\`ini\n[ 14.6.0 ]\`\`\``,
            inline: true,
          },
          {
            name: "<:reliable_linux:1054391579533647936> OS:",
            value: `\`\`\`ini\n[ ${process.platform} ${process.arch} ]\`\`\``,
            inline: true,
          },
          {
            name: "<:reliable_database:1030818608638611516> Database:",
            value: `\`\`\`ini\n[ ${
              status[connection.readyState]
            } ]\`\`\``,
            inline: true,
          },
          {
            name: "<:reliable_nodeJS:1030818866416328785> NodeJS:",
            value: `\`\`\`ini\n[ ${process.version} ]\`\`\``,
            inline: true,
          },
          {
            name: ":brain: CPU Model:",
            value: `\`\`\`ini\n[ ${os.cpus()[0].model} ]\`\`\``,
            inline: true,
          },
          {
            name: "<:reliable_CPUusage:1030831910240391210> CPU Usage:",
            value: `\`\`\`ini\n[ ${(
              process.memoryUsage().heapUsed /
              1024 /
              1024
            ).toFixed(2)}% ]\`\`\``,
            inline: true,
          },
          {
            name: "<:reliable_memory:1054391562777411645> RAM: ",
            value: `\`\`\`ini\n[ ${(
              process.memoryUsage().rss /
              1024 /
              1024
            ).toFixed(2)} MB RSS\n${(
              process.memoryUsage().heapUsed /
              1024 /
              1024
            ).toFixed(2)} MB Heap ]\`\`\``,
            inline: true,
          },
          {
            name: "<a:reliable_developers:1030038452407898142> Bot Developers:",
            value: `<@967657941937291265> & <@783661052738011176>`,
          }
        )
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        .setTimestamp();
      return interaction
        .reply({ embeds: [embed], components: [link_button] })
        .then(async (Message) => {
          const filter = (i) => i.user.id === interaction.user.id;
          let col = await interaction.channel.createMessageComponentCollector({
            filter,
            time: 120000,
          });

          col.on("collect", async (button) => {
            switch (button.customId) {
              case "Refresh": {
                const embed2 = new EmbedBuilder()
                  .setTitle(client.user.username + " Bot Statistics")
                  .setThumbnail(
                    client.user.displayAvatarURL({ dynamic: true, size: 1024 })
                  )
                  .addFields(
                    {
                      name: "<:reliable_servers:1054391971147419748> Servers:",
                      value: `\`\`\`ini\n[ ${client.guilds.cache.size} ]\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<a:reliable_members:1030037727485362197> Users:",
                      value: `\`\`\`ini\n[ ${client.guilds.cache.reduce(
                        (a, b) => a + b.memberCount,
                        0
                      )} ]\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<:reliable_channel:1054392236978229328>  Channels",
                      value: `\`\`\`ini\n[ ${client.channels.cache.size} ]\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<a:reliable_uptime:1030037876169252864> Uptime: ",
                      value: `<t:${Math.floor(
                        Number(Date.now() - client.uptime) / 1000
                      )}:R>`,
                      inline: true,
                    },
                    {
                      name: "<a:reliable_ping:1054391858945589288> Ping:",
                      value: `\`\`\`ini\n[ ${client.ws.ping} ms ]\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<:reliable_discordJS:1054392131004940298>  Discord.js:",
                      value: `\`\`\`ini\n[ 14.6.0 ]\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<:reliable_linux:1054391579533647936> OS:",
                      value: `\`\`\`ini\n[ ${process.platform} ${process.arch} ]\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<:reliable_database:1030818608638611516> Database:",
                      value: `\`\`\`ini\n[ ${
                        status[connection.readyState]
                      } ]\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<:reliable_nodeJS:1030818866416328785> NodeJS:",
                      value: `\`\`\`ini\n[ ${process.version} ]\`\`\``,
                      inline: true,
                    },
                    {
                      name: ":brain: CPU Model:",
                      value: `\`\`\`ini\n[ ${os.cpus()[0].model} ]\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<:reliable_CPUusage:1030831910240391210> CPU Usage:",
                      value: `\`\`\`ini\n[ ${(
                        process.memoryUsage().heapUsed /
                        1024 /
                        1024
                      ).toFixed(2)}% ]\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<:reliable_memory:1054391562777411645> RAM: ",
                      value: `\`\`\`ini\n[ ${(
                        process.memoryUsage().rss /
                        1024 /
                        1024
                      ).toFixed(2)} MB RSS\n${(
                        process.memoryUsage().heapUsed /
                        1024 /
                        1024
                      ).toFixed(2)} MB Heap ]\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<a:reliable_developers:1030038452407898142> Bot Developers:",
                      value: `<@967657941937291265> & <@783661052738011176>`,
                    }
                  )
                  .setColor("#2F3136")
                  .setTimestamp()
                  .setFooter({ text: "©2022 - 2023 | Reliable" });
                await interaction
                  .editReply({
                    content:
                      "> **<a:reliable_done:1030040640425312287> Data Updated**",
                    embeds: [embed2],
                  })
                  .catch((err) => {});
                await button.deferUpdate().catch((e) => {});
              }
            }
          });
          col.on("end", async (button) => {
            link_button = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setLabel("Refresh")
                .setStyle(ButtonStyle.Success)
                .setCustomId("Refresh")
                .setDisabled(true)
            );
            return interaction
              .editReply({
                content: "> **Your Time Ended!**",
                components: [link_button],
              })
              .catch((err) => {});
          });
        })
        .catch((err) => {});
    } else if (interaction.options.getSubcommand() === "ping") {
      const message = await interaction.deferReply({ fetchReply: true });

      const newMessage = new EmbedBuilder()
        .setColor("#2F3136")
        .setTitle(`<:reliable_ping:1030037984931749899> Ping!`)
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        .addFields({
          name: `‣ API Lantecy`,
          value: `> **\`${client.ws.ping}\`**`,
          inline: true,
        })
        .addFields({
          name: `‣ Client Ping`,
          value: `> **\`${
            message.createdTimestamp - interaction.createdTimestamp
          }\`**`,
          inline: false,
        });

      await interaction.editReply({ embeds: [newMessage] });
    } else if (interaction.options.getSubcommand() === "invite") {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Invite Reliable")
          .setEmoji("<:reliable_invite:1031443216664371231>")
          .setStyle(ButtonStyle.Link)
          .setURL(
            `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`
          ),
        new ButtonBuilder()
          .setLabel("Support Server")
          .setEmoji("<:reliable_support:1031443305399074836>")
          .setStyle(ButtonStyle.Link)
          .setURL("https://dsc.gg/reliable-support"),
        new ButtonBuilder()
          .setLabel("Top.GG")
          .setEmoji("<:reliable_topgg:1034324522305855561>")
          .setStyle("Link")
          .setURL("https://top.gg/bot/1030870443005071512?s=05fa7c98112c0")
      );

      const mainPage = new EmbedBuilder()
        .setTitle("Invite Link")
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        .setColor("#2F3136")
        .setDescription(
          "> **Click the below buttons! There are invite link and support link as well.**"
        );

      interaction.reply({ embeds: [mainPage], components: [row] });
    } else if (interaction.options.getSubcommand() === "uptime") {
      let days = Math.floor(client.uptime / 86400000);
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;

      const embed = new EmbedBuilder()
        .setTitle("Reliable Uptime")
        .addFields(
          { name: "• Days:", value: `**\`${days}\` Day(s)**`, inline: true },
          { name: "• Hours:", value: `**\`${hours}\` Hour(s)**`, inline: true },
          {
            name: "• Minutes:",
            value: `**\`${minutes}\` Minute(s)**`,
            inline: true,
          },
          {
            name: "• Seconds:",
            value: `**\`${seconds}\` Second(s)**`,
            inline: true,
          }
        )
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } else if (interaction.options.getSubcommand() === "credit") {
      const credits = new EmbedBuilder()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        .setTitle("Reliable - Development Team")
        .setDescription(
          "> **Well, I've a creator! So, yeah. I need to be thankful to..**"
        )
        .addFields(
          {
            name: `———————[ Developers ]———————`,
            value: `> <@967657941937291265> & <@783661052738011176> [**\`Sohom829#8350 & Alpha•#0001\`**]`,
            inline: false,
          },
          {
            name: `**———————[ Supporters ]———————**`,
            value: `> <@768061935371419688> [**\`Shaxpartan#1234\`**]`,
            inline: false,
          }
        );

      const github = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Sohom Github")
          .setEmoji("<:reliable_github:1038345171298963527>")
          .setStyle("Link")
          .setURL("https://github.com/Sohom829"),
        new ButtonBuilder()
          .setLabel("Alpha Github")
          .setEmoji("<:reliable_github:1038345171298963527>")
          .setStyle("Link")
          .setURL("https://github.com/Alpha5959"),
        new ButtonBuilder()
          .setLabel("Shaxpartan Github")
          .setEmoji("<:reliable_github:1038345171298963527>")
          .setStyle("Link")
          .setURL("https://github.com/shaxpartan")
      );

      await interaction.reply({ embeds: [credits], components: [github] });
    } else if (interaction.options.getSubcommand() === "help") {
      const MainEmbed = new EmbedBuilder()
        .setColor("#2F3136")
        .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
          {
            name: `**Features,**`,
            value: `>>> <:reliable_moderation:1030443113958875236> **Moderation**,
<a:reliable_info:1030410449579147314> **Information**,
<:reliable_giveaway:1038804433116614718> **Giveaway**,
<a:reliable_economy:1046029380415135765> **Economy**,
<:reliable_logo:1032950208130191370> **Bot**,
<:reliable_image:1048174936394580058> **Image**,
<a:reliable_ticket:1054374433046921226> **Ticket**,
<a:reliable_fun:1033313610048483389> **Fun**,
<a:reliable_afk:1070543249002991676> **AFK**,
<a:reliable_birthday:1070559247693250610> **Birthday**,
<:reliable_family:1071286177887436801> **Family**,
<:reliable_DiscordStaff:1030802121945260042> **Server Management**,
<a:reliable_games:1048178867149488139> **Games**,
<a:reliable_notepad:1071180235896266852> **Notepad**,
<a:reliable_minecraft:1040571549473849387> **Minecraft**,
<a:reliable_utility:1030442601721102346> **Utility**`,
            inline: true,
          },
          {
            name: "Reliable Launched Date",
            value: "> <t:1665849066:F>",
            inline: true,
          }
        )
        .setTimestamp()
        .setImage(
          `https://cdn.discordapp.com/attachments/998278920614989895/1044656009462956073/IMG_20221122_224953.jpg`
        )
        .setTitle(`${client.user.username} - Command Panel`)
        .setDescription(
          `>>> Reliable was developed for novice servers. Supports slash commands and Additional systems. Novice discord users can usually slip into situations while making their servers. So, We came to a solution. We attached **Modertation**, **Economy**, **Giveaway**, **Bot**, **AFK**, **Information**, **Games** etc! So, every server will no longer be confused about what they should operate. Also, Something big is coming up! Hint: **\`Seasons!\`**. Stay tuned. 

**\`Here, you can find my commands! Select a category from the menu\`**`
        );

      const row = new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId("select")
          .setPlaceholder("Select a category by clicking this")
          .addOptions(
            {
              label: "Moderation",
              description: "View Moderation Commands",
              emoji: "<:reliable_moderation:1030443113958875236>",
              value: `first_option`,
            },
            {
              label: "Info",
              description: "View Info Commands",
              emoji: "<a:reliable_info:1030410449579147314>",
              value: "second_option",
            },
            {
              label: "Fun",
              description: "View Fun commands",
              emoji: "<a:reliable_fun:1033313610048483389>",
              value: "third_option",
            },
            {
              label: "Economy",
              description: "View all Economy commands",
              emoji: "<a:reliable_economy:1046029380415135765>",
              value: "fourth_option",
            },
            {
              label: "Server Management",
              description: "View default server management commands",
              emoji: "<:reliable_DiscordStaff:1030802121945260042>",
              value: "fifth_option",
            },
            {
              label: "Giveaway",
              description: "View all giveaway commands",
              emoji: "<:reliable_giveaway:1038804433116614718>",
              value: "sixth_option",
            },
            {
              label: "Bot",
              description: "View default bot commands",
              emoji: "<:reliable_logo:1032950208130191370>",
              value: "seventh_option",
            },
            {
              label: "Minecraft",
              description: "View Minecraft Commands",
              emoji: "<a:reliable_minecraft:1040571549473849387>",
              value: `eighth_option`,
            },
            {
              label: "Utility",
              description: "View all Utility commands",
              emoji: "<a:reliable_utility:1030442601721102346>",
              value: "nineth_option",
            },
            {
              label: "Image",
              description: "View all Image commands",
              emoji: "<:reliable_image:1048174936394580058>",
              value: "tenth_option",
            },
            {
              label: "Games",
              description: "View all game commands",
              emoji: "<a:reliable_games:1048178867149488139>",
              value: "eleventh_option",
            },
            {
              label: "Ticket",
              description: "View all ticket commands",
              emoji: "<a:reliable_ticket:1054374433046921226>",
              value: "tweleveth_option",
            },
            {
              label: "Afk",
              description: "View all AFK commands",
              emoji: "<a:reliable_afk:1070543249002991676>",
              value: "thirdteen_option",
            },  
            {
              label: "Birthday",
              description: "View all Birthday commands",
              emoji: "<a:reliable_birthday:1070559247693250610>",
              value: "forthteen_option",
            }, 
            {
              label: "Notepad",
              description: "View all Notepad commands",
              emoji: "<a:reliable_notepad:1071180235896266852>",
              value: "fifthteen_option",
            }, 
            {
              label: "Family",
              description: "View all Family commands",
              emoji: "<:reliable_family:1071286177887436801>",
              value: "sixteen_option",
            }, 
          )
      );

      const topgg = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Vote Reliable")
          .setEmoji("<:reliable_topgg:1034324522305855561>")
          .setStyle("Link")
          .setURL("https://top.gg/bot/1030870443005071512?s=05fa7c98112c0"),
        new ButtonBuilder()
          .setLabel("Support Server")
          .setEmoji("<:reliable_support:1031443305399074836>")
          .setStyle(ButtonStyle.Link)
          .setURL("https://dsc.gg/reliable-support"),
        new ButtonBuilder()
          .setLabel("Invite Reliable")
          .setEmoji("<:reliable_invite:1031443216664371231>")
          .setStyle("Link")
          .setURL("https://dsc.gg/reliable-bot")
      );

      await interaction.reply({
        embeds: [MainEmbed],
        components: [row, topgg],
      });
    } else {
      interaction.reply({ content: `No sub command selected.` });
    }
  },
};
/**
 * @Author Reliable Inc.
 * @Copyright ©2022 - 2023 | Reliable Inc, All rights reserved.
 * @CodedBy Mohtasim Alam Sohom, Sajidur Rahman Tahsin
 */
