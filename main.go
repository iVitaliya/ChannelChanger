package main

import (
	"log"
	"fmt"

	"github.com/iVitaliya/ChannelChanger/config"
	"github.com/andersfylling/disgord"
	"github.com/sirupsen/logrus"
)

var _log = logrus.New()
var commands = []*disgord.CreateApplicationCommand{
	{
		Name: "manual",
		Description: "Manualy edit certain thing.",
	}
}

func main() {
	err := config.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
		log.Fatal(err)
	}

	client := disgord.New(disgord.Config{
		Intents: disgord.IntentGuildWebhooks | disgord.IntentGuilds | disgord.IntentGuildScheduledEvents | disgord.IntentGuildBans | disgord.IntentGuildEmojisAndStickers | disgord.IntentGuildMembers | disgord.IntentGuildIntegrations | disgord.IntentGuildInvites,
		Presence: disgord.UpdateStatusPayload{
			Status: "the channels",
		},
		BotToken: config.Get("BOT_TOKEN"),
		Logger: _log,
	})

	
}
