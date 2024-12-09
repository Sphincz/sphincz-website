package main

import (
	"context"
	"log/slog"
	"os"

	"github.com/Sphincz/sphincz-website/internal/captcha"
	"github.com/Sphincz/sphincz-website/internal/config"
	"github.com/Sphincz/sphincz-website/internal/contactform"
	"github.com/Sphincz/sphincz-website/internal/handlers"
	_ "github.com/Sphincz/sphincz-website/migrations"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.New()
	conf := config.New()

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: automigrateEnabled(),
	})

	_, cancel := context.WithCancel(context.Background())
	defer cancel()

	app.OnTerminate().BindFunc(func(e *core.TerminateEvent) error {
		cancel()
		return e.Next()
	})

	app.OnServe().BindFunc(func(e *core.ServeEvent) error {
		if err := conf.Load(app.RootCmd); err != nil {
			return err
		}

		slog.SetDefault(app.Logger())

		app.OnRecordCreateRequest("contact_form").BindFunc(captcha.Verify(conf))
		app.OnModelAfterCreateSuccess("contact_form").BindFunc(contactform.Notify(app))

		e.Router.GET("/{path...}", handlers.Static(conf))
		e.Router.GET("/to/{handle}", handlers.Redirect())

		return e.Next()
	})

	if err := app.Start(); err != nil {
		slog.Error("PocketBase returned an error", "error", err)
		os.Exit(1) //nolint:gocritic
	}
}
