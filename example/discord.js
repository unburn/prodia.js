const { Client, EmbedBuilder } = require("discord.js");
const { Prodia } = require("prodia.js");

const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildMembers",
        "MessageContent",
    ]
});

const prodiaApiKey = "YOUR-API-KEY-HERE";
const botToken = "YOUR-BOT-TOKEN-HERE";
const prefix = "!";

const prodia = new Prodia(prodiaApiKey);

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (command === "imagine") {
            if (!args.length) {
                return message.reply("You need to provide a prompt!");
            }

            const prompt = args.join(" ");
            const msg = await message.reply("Generating image... (10-20 seconds)");

            try {
                const job = await generateImage(prompt);

                const embed = new EmbedBuilder()
                    .setDescription(`**Prompt**: ${prompt}`)
                    .setImage(job[0])
                    .setColor("#302c34");

                await msg.edit({
                    content: "",
                    embeds: [embed]
                });
            } catch (error) {
                console.error(error);
                await msg.edit("Error generating image.");
            }
        }
    }
});

async function generateImage(prompt) {
    try {
        const job = await prodia.createJob({
            model: "revAnimated_v122.safetensors [3f4fefd9]",
            prompt: prompt,
            negative_prompt: "text, blur, duplicate, distorted",
            numofimg: 4
        });

        return job;
    } catch (error) {
        return console.error(error);
    }
}

client.login(botToken);
