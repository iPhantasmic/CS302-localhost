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
		_ = viper.BindEnv("PORT")
		_ = viper.BindEnv("DB_USER")
		_ = viper.BindEnv("DB_PASSWORD")
		_ = viper.BindEnv("DB_HOST")
		_ = viper.BindEnv("DB_PORT")
		_ = viper.BindEnv("DB_SCHEMA")
		_ = viper.BindEnv("AWS_BUCKET_NAME")
		_ = viper.BindEnv("AWS_ACCESS_KEY_ID")
		_ = viper.BindEnv("AWS_SECRET_ACCESS_KEY")
		_ = viper.Unmarshal(&config)
		return
	}

	err = viper.Unmarshal(&config)

	return
}
