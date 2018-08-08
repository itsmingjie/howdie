/* Slack dev kit */
const {
    RTMClient
} = require('@slack/client');
const fs = require('fs');
const util = require('util');

const token = process.env.BOT_TOKEN;

/* include API key from Heroku */
const rtm = new RTMClient(token);

/* start real time messaging */
rtm.start();

/* will interact with only one channel */
const channel = process.env.CHANNEL_ID; // welcome channel - main
const logChannel = process.env.LOG_CHANNEL_ID; // log channel - debug

/* load in templates */

const readFile = util.promisify(fs.readFile);

// still very temporary, but condensed.
var templateFiles = ['greeting.txt', 'intro.txt', 'question.txt']
var templates = []
for (var i = 0; i < templateFiles.length; i++) {
    try {
        let contents = await readFile('src/templates/' + templateFiles[i], 'utf8')
        templates[i] = contents.split("\n");
        console.log(templateFiles[i] + " templates loaded.");
    } catch (err) {
        console.log('This is an error! Templates have not been loaded, error PSA incoming: ' + err)
    }
}


/* return a random line from template */
function drop(template) {
    return template[Math.floor(Math.random() * template.length)]
}

rtm.on('authenticated', (rtmStartData) => {
    /* Successfully logged in message */
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
});

/* Main: Member joining channel */
rtm.on('member_joined_channel', (eventData) => {
    if (eventData.channel == channel) { /* If user joined the welcome Channel */
        
        /* timeout prevents message from going out before user joins channel */
        setTimeout(function(){
            rtm.sendMessage("Howdy, <@" + eventData.user + ">! " + drop(templates[0]) + " " + drop(templates[1]) + " - " + drop(templates[2]), channel);
        }, process.env.DEFER_TIMEOUT);

        rtm.sendMessage("<@" + eventData.user + "> just joined the community! Don't forget to send your greetings!", logChannel);
        console.log("New user greeted: <@" + eventData.user + ">");
    }
});

/* Status Messages */
rtm.on('connected', () => {
    console.log("Howdie is connected to Slack RTM.");
    rtm.sendMessage("Howdy! Howdie is back on line! Got time for a cup of Latta Latte?", logChannel);
});

rtm.on('disconnecting', () => {
    console.log("Howdie is disconnecting from Slack RTM.");
    rtm.sendMessage("Howdy's hoppin' off - I'll catch you later!", logChannel);
});