<p align="center"><img alt="Howdy icon" src="https://i.imgur.com/6HF0g6W.png" style="width: 100px"></a>
<h1 align="center">Howdie</h1>
<p align="center"><i>Hack Club's own friendly welcome bot.</i></p>

## Development Setup

### Environment Variables

Create a file called `.env`. The following configuration options are available to set in it:

```
# Bot user token from Slack
BOT_TOKEN = xoxb-••••••••••-••••••••••••-••••••••••••••••••••••••

# The main channel that Howdie should actively monitor and send greetings to
CHANNEL_ID = C••••••••

# Dev private channel for you to receive notifications about service availability
LOG_CHANNEL_ID = G••••••••
```

### Setting up Howdie

    $ git clone 
    $ cd howdie

Prepare dependencies

    $ yarn install

Make sure you have heroku-cli installed 

    $ heroku local

### Setting up the integrated Slack bot

1. Create a new Slack app on Slack
2. Create one (and only one) bot user and set "Always Show My Bot as Online" to "On"
3. Retrieve your tokens and set your environment variables

## Production Setup

### Deployment on Heroku

We use Heroku for managing our deployment of this project. To deploy this project to Heroku, make sure your environment variables are configured properly, and then run

    $ git push heroku master

### Contributing

This is a [Hack Club](https://hackclub.com) community project. Contributions are welcome! Please refer to [Hack Club's contribution guidelines](https://github.com/hackclub/hackclub#contributing).

You can also find me on [Slack](http://hackclub.slack.com/messages/@itsmingjie)!