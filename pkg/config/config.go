package config

import "github.com/spf13/viper"

type Config struct {
	Port          string `mapstructure:"PORT"`
	DBUrl         string `mapstructure:"DB_URL"`
	Schema        string `mapstructure:"SCHEMA_NAME"`
	AWSBucket     string `mapstructure:"AWS_BUCKET_NAME"`
	AWSKeyID      string `mapstructure:"AWS_ACCESS_KEY_ID"`
	AWSSecret     string `mapstructure:"AWS_SECRET_ACCESS_KEY"`
	BookingSvcUrl string `mapstructure:"BOOKING_SERVICE_URL"`
}

func LoadConfig() (config Config, err error) {
	viper.AddConfigPath("./pkg/config/envs")
	viper.SetConfigName("dev")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()

	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)

	return
}
