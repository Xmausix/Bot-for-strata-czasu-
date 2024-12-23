const { Client, GatewayIntentBits } = require('discord.js');
const { createCanvas } = require('canvas');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
    console.log(`Zalogowano jako ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('/banner')) {
        const args = message.content.split(' ').slice(1);
        if (args.length < 2) {
            return message.reply('Proszę podać nick i płeć. Użyj: /banner [#nick] [płeć]');
        }

        const nick = args[0].replace('#', '');
        const gender = args[1].toLowerCase();

        // Sprawdzenie długości nicku
        let fontSize = nick.length > 10 ? 20 : 30; // Zmniejszenie czcionki dla długich nicków

        // Tworzenie banera
        const canvas = createCanvas(600, 200);
        const ctx = canvas.getContext('2d');

        // Tło banera
        ctx.fillStyle = '#3498db';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Tekst banera
        ctx.fillStyle = '#ffffff';
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(`Nick: ${nick}`, canvas.width / 2, canvas.height / 2 - 10);
        ctx.fillText(`Płeć: ${gender}`, canvas.width / 2, canvas.height / 2 + 30);

        // Zapis banera do pliku
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync('./banner.png', buffer);

        // Wysyłanie banera na Discorda
        await message.channel.send({ files: ['./banner.png'] });
    }
});

// Logowanie bota
client.login('YOUR_BOT_TOKEN');
