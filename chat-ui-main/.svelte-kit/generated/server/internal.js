
import root from '../root.svelte';
import { set_building } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_private_env, set_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: false,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\n<html lang=\"en\" class=\"h-full\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=no\" />\n\t\t<script>\n\t\t\tif (\n\t\t\t\tlocalStorage.theme === \"dark\" ||\n\t\t\t\t(!(\"theme\" in localStorage) && window.matchMedia(\"(prefers-color-scheme: dark)\").matches)\n\t\t\t) {\n\t\t\t\tdocument.documentElement.classList.add(\"dark\");\n\t\t\t}\n\n\t\t\t// For some reason, Sveltekit doesn't let us load env variables from .env here, so we load it from hooks.server.ts\n\t\t\twindow.gaId = \"%gaId%\";\n\t\t\twindow.gaIdDeprecated = \"%gaIdDeprecated%\";\n\t\t</script>\n\t\t" + head + "\n\t</head>\n\t<body data-sveltekit-preload-data=\"hover\" class=\"h-full dark:bg-gray-900\">\n\t\t<div id=\"app\" class=\"contents h-full\">" + body + "</div>\n\n\t\t<!-- Google Tag Manager -->\n\t\t<script>\n\t\t\tif (window.gaId) {\n\t\t\t\tconst script = document.createElement(\"script\");\n\t\t\t\tscript.src = \"https://www.googletagmanager.com/gtag/js?id=\" + window.gaId;\n\t\t\t\tscript.async = true;\n\t\t\t\tdocument.head.appendChild(script);\n\n\t\t\t\twindow.dataLayer = window.dataLayer || [];\n\t\t\t\tfunction gtag() {\n\t\t\t\t\tdataLayer.push(arguments);\n\t\t\t\t}\n\t\t\t\tgtag(\"js\", new Date());\n\t\t\t\t/// ^ See https://developers.google.com/tag-platform/gtagjs/install\n\t\t\t\tgtag(\"config\", window.gaId);\n\t\t\t\tgtag(\"consent\", \"default\", { ad_storage: \"denied\", analytics_storage: \"denied\" });\n\t\t\t\t/// ^ See https://developers.google.com/tag-platform/gtagjs/reference#consent\n\t\t\t\t/// TODO: ask the user for their consent and update this with gtag('consent', 'update')\n\t\t\t}\n\t\t</script>\n\n\t\t<!-- Google Analytics v3 (deprecated on 1 July 2023) -->\n\t\t<script>\n\t\t\tif (window.gaIdDeprecated) {\n\t\t\t\t(function (i, s, o, g, r, a, m) {\n\t\t\t\t\ti[\"GoogleAnalyticsObject\"] = r;\n\t\t\t\t\t(i[r] =\n\t\t\t\t\t\ti[r] ||\n\t\t\t\t\t\tfunction () {\n\t\t\t\t\t\t\t(i[r].q = i[r].q || []).push(arguments);\n\t\t\t\t\t\t}),\n\t\t\t\t\t\t(i[r].l = 1 * new Date());\n\t\t\t\t\t(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);\n\t\t\t\t\ta.async = 1;\n\t\t\t\t\ta.src = g;\n\t\t\t\t\tm.parentNode.insertBefore(a, m);\n\t\t\t\t})(\n\t\t\t\t\twindow,\n\t\t\t\t\tdocument,\n\t\t\t\t\t\"script\",\n\t\t\t\t\t\"https://www.google-analytics.com/analytics.js\",\n\t\t\t\t\t\"ganalytics\"\n\t\t\t\t);\n\t\t\t\tganalytics(\"create\", window.gaIdDeprecated, \"auto\");\n\t\t\t\tganalytics(\"send\", \"pageview\");\n\t\t\t}\n\t\t</script>\n\t</body>\n</html>\n",
		error: ({ status, message }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,\n\t\t\t\t\tUbuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "13fmzf6"
};

export function get_hooks() {
	return import("../../../src/hooks.server.ts");
}

export { set_assets, set_building, set_private_env, set_public_env };
