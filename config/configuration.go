package config

import (
	DotEnv "github.com/joho/godotenv"
	OS "os"
	Log "log"
)

type IConfig struct{
	Get 	 func(string) bool;
	Load 	 func() 			error;
}

func Load() error {
	err := DotEnv.Load(".env")
 	// if err != nil {
  //  	log.Fatal("Error loading .env file")
 	// }
	return err
}

func Get(key string) string {
	return OS.Getenv(key)
}