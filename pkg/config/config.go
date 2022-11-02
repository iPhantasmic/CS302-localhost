package config

import "github.com/spf13/viper"

type Config struct {
	Port       string `mapstructure:"PORT"`
	DBUser     string `mapstructure:"DB_USER"`
	DBPassword string `mapstructure:"DB_PASSWORD"`
	DBHost     string `mapstructure:"DB_HOST"`
	DBPort     string `mapstructure:"DB_PORT"`
	DBSchema   string `mapstructure:"DB_SCHEMA"`
	AWSBucket  string `mapstructure:"AWS_BUCKET_NAME"`
	AWSKeyID   string `mapstructure:"AWS_ACCESS_KEY_ID"`
	AWSSecret  string `mapstructure:"AWS_SECRET_ACCESS_KEY"`
}

func LoadConfig() (config Config, err error) {
	viper.AddConfigPath("./pkg/config/envs")
	viper.SetConfigName("dev")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()

	if err != nil {
		// production use
		err = viper.BindEnv("PORT")
		err = viper.BindEnv("DB_USER")
		err = viper.BindEnv("DB_PASSWORD")
		err = viper.BindEnv("DB_HOST")
		err = viper.BindEnv("DB_PORT")
		err = viper.BindEnv("DB_SCHEMA")
		err = viper.BindEnv("AWS_BUCKET_NAME")
		err = viper.BindEnv("AWS_ACCESS_KEY_ID")
		err = viper.BindEnv("AWS_SECRET_ACCESS_KEY")
		err = viper.Unmarshal(&config)
		return
	}

	err = viper.Unmarshal(&config)

	return
}
