package config

type Config struct {
	PublicDir string
	Turnstile Turnstile
}

type Turnstile struct {
	Secret string
}

func New() *Config {
	return &Config{
		PublicDir: "frontend/dist",
		Turnstile: Turnstile{
			Secret: "1x0000000000000000000000000000000AA",
		},
	}
}
