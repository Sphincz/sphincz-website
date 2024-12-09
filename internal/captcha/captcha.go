package captcha

import (
	"errors"
	"github.com/Sphincz/sphincz-website/internal/config"
	"github.com/meyskens/go-turnstile"
	"github.com/pocketbase/pocketbase/core"
	"os"
)

var ErrInvalidCaptcha = errors.New("invalid captcha")

func Verify(conf *config.Config) func(*core.RecordRequestEvent) error {
	return func(e *core.RecordRequestEvent) error {
		if conf.Turnstile.Secret != "" {
			ts := turnstile.New(os.Getenv("TURNSTILE_SECRET"))
			val := e.Request.Header.Get("X-Captcha")

			resp, err := ts.Verify(val, e.RealIP())
			if err != nil {
				return err
			}

			if !resp.Success {
				return ErrInvalidCaptcha
			}
		}
		return e.Next()
	}
}
