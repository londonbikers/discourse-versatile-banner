import { withPluginApi } from "discourse/lib/plugin-api";

export default {
    name: "lb-banner",

    initialize() {
        withPluginApi("0.8.18", (api) => {
            function NavigateToCustomLoginUrl(provider) {
                const idp_base_url = "https://accounts.londonbikers.com/account";
                const sp_return_url = `https://londonbikers.com/session/sso?return_path=${window.location.pathname}`;

                let idp_url;
                if (provider === "Local") {
                    idp_url = `${idp_base_url}/register?returnurl=${sp_return_url}`;
                } else {
                    idp_url = `${idp_base_url}/externalloginremote?provider=${provider}&returnurl=${sp_return_url}`;
                }

                window.location.assign(idp_url);
            }

            api.decorateWidget("banner-box-widget:after", (helper) => {
                helper.widget.appEvents.on("page:changed", () => {
                    const fb_btn = document.getElementById("banner-btn-fb");
                    if (fb_btn) {
                        fb_btn.addEventListener("click", () =>
                            NavigateToCustomLoginUrl("Facebook")
                        );
                    }

                    const google_btn = document.getElementById("banner-btn-google");
                    if (google_btn) {
                        google_btn.addEventListener("click", () =>
                            NavigateToCustomLoginUrl("Google")
                        );
                    }

                    const local_btn = document.getElementById("banner-btn-local");
                    if (local_btn) {
                        local_btn.addEventListener("click", () =>
                            NavigateToCustomLoginUrl("Local")
                        );
                    }
                });
            });
        });
    },
};
