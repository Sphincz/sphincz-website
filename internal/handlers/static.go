package handlers

import (
	"os"

	"github.com/Sphincz/sphincz-website/internal/config"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func Static(conf *config.Config) func(*core.RequestEvent) error {
	return apis.Static(os.DirFS(conf.PublicDir), true)
}
