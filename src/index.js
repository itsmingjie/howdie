/* Slack dev kit */
const {
    RTMClient
} = require('@slack/client');
const fs = require('fs');

const token = process.env.BOT_TOKEN;

/* include API key from Heroku */
const rtm = new RTMClient(token);

/* start real time messaging */
rtm.start();

/* will interact with only one channel */
const channel = process.env.CHANNEL_ID; // welcome channel - main
const logChannel = process.env.LOG_CHANNEL_ID; // log channel - debug

/* load in templates */
var greeting, intro, question;

fs.readFile('src/templates/greeting.txt', 'utf8', function (err, contents) {
    greeting = contents.split("\n");
    console.log("Greeting templates loaded.");
});
fs.readFile('src/templates/intro.txt', 'utf8', function (err, contents) {
    intro = contents.split("\n");
    console.log("Intro templates loaded.");
});
fs.readFile('src/templates/question.txt', 'utf8', function (err, contents) {
    question = contents.split("\n");
    console.log("Question templates loaded.");
});

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
        rtm.sendMessage("Howdy, <@" + eventData.user + ">! " + drop(greeting) + " " + drop(intro) + " - " + drop(question), channel);
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