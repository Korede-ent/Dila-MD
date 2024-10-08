const config = require('../config');
const { cmd, commands } = require('../command');
const wiki = require('wikipedia');
const sensitiveData = require('../dila_md_licence/a/b/c/d/dddamsbs');

// Wikipedia search command
cmd({
  pattern: "wiki",
  desc: "Search Wikipedia for information",
  category: "main",
  filename: __filename
}, async (conn, mek, m, {
  from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    // Ensure the search query is provided
    if (!q) {
      return reply('Please provide a search query.');
    }

    // Fetch summary from Wikipedia
    const summary = await wiki.summary(q);

    // Text for the reply message
    let replyText = `*📚 Wikipedia Summary 📚*\n\n🔍 *Query*: _${q}_\n\n💬 *Title*: _${summary.title}_\n\n📝 *Summary*: _${summary.extract}_\n\n🔗 *URL*: ${summary.content_urls.desktop.page}\n\n${sensitiveData.siteUrl}\n${sensitiveData.footerText}`;

    // Button for the channel link
    const buttons = [
      { buttonId: 'view_channel', buttonText: { displayText: 'View Channel' }, type: 1 }
    ];

    // Button message with the Wikipedia summary
    const buttonMessage = {
      image: { url: summary.originalimage.source },  // Image from Wikipedia
      caption: replyText,  // Text with summary and footer
      footer: `🔄 Forwarded many times`,
      buttons: buttons,  // Buttons for interaction
      headerType: 4  // Type for media (image)
    };

    // Send the button message
    await conn.sendMessage(from, buttonMessage, { quoted: mek });

    // Handle button press
    conn.ev.on('messages.upsert', async (upsert) => {
      const buttonResponse = upsert.messages[0];

      // When the "View Channel" button is pressed
      if (buttonResponse.message?.buttonsResponseMessage?.selectedButtonId === 'view_channel') {
        await conn.sendMessage(from, {
          text: 'Join the channel using the link: https://whatsapp.com/channel/0029ValK0gn4SpkP6iaXoj2y',
          quoted: mek
        });
      }
    });

  } catch (e) {
    console.log(e);
    reply(`Error: ${e.message}`);
  }
});

// Global theme and bot settings
global.link = 'https://whatsapp.com/channel/0029ValK0gn4SpkP6iaXoj2y';  // Theme link
global.themeemoji = '🪀';  // Theme emoji
global.wm = "Cyber Dila Whatsapp BUG";  // Watermark or signature
global.ownername = 'MrDila';  // Owner name
global.botname = 'Cyber Dila Whatsapp BUG 🤖';  // Bot name
