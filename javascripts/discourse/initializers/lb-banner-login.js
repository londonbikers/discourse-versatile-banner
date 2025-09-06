import { withPluginApi } from "discourse/lib/plugin-api";

export default {
    name: "lb-banner-login",

    initialize() {
        withPluginApi("0.8.18", () => {
            function NavigateToCustomLoginUrl(provider) {
                const idp_base_url = "https://accounts.londonbikers.com/account";
                const sp_return_url = `https://londonbikers.com/session/sso?return_path=${window.location.pathname}`;

                let idp_url;
                if (provider === "Local") {
                    idp_url = `${idp_base_url}/register?returnurl=${sp_return_url}`;
                } else {
                    idp_url = `${idp_base_url}/externalloginremote?provider=${provider}&returnurl=${sp_return_url}`;
                }

                console.log("Redirecting to:", idp_url);
                window.location.assign(idp_url);
            }

            // Delegate click handling from banner container
            document.addEventListener("click", (e) => {
                const btn = e.target.closest(
                    "#banner-btn-fb, #banner-btn-google, #banner-btn-local"
                );
                if (!btn) return;

                e.preventDefault();

                if (btn.id === "banner-btn-fb") {
                    NavigateToCustomLoginUrl("Facebook");
                } else if (btn.id === "banner-btn-google") {
                    NavigateToCustomLoginUrl("Google");
                } else if (btn.id === "banner-btn-local") {
                    NavigateToCustomLoginUrl("Local");
                }
            });
        });
    },
};
