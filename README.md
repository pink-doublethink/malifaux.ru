
----
### What is the project about?
----
- This repository contains the source code for a website designed to collect translated stories and articles about Malifaux. The site was created in collaboration with the administrators of the Malifaux <a target="_blank" href="https://vk.com/malifaux" rel="nofollow">VK group</a>.

- <a target="_blank" href="https://malifaux.vercel.app/" rel="nofollow">Live Demo</a>

- In this project I implemented: 
	- has written enough Tailwind styles to finally remember its syntax;
	- spent a lot of time building all sorts of widgets to embed in the mardown files;

----
### Requirements
----

- **Node.js 26.x** — the exact version is pinned in `.nvmrc`. Run `nvm use` in the project root to switch to it before installing or building.

----
### Install and run commands
----

Clone the repository on your computer. Then run the following commands from the root of the project, from the terminal:

| Command            | Action                                                              |
| :----------------- | :------------------------------------------------------------------ |
| `npm ci`           | Installs dependencies from `package-lock.json` (reproducible build) |
| `npm run dev`      | Starts local dev server at `localhost:3000`                         |
| `npm run lint`     | Runs ESLint over the whole project                                  |
| `npm run lint:fix` | Runs ESLint and auto-fixes issues                                   |
| `npm run build`    | Runs `node lib/jsonGenerator.js`, then builds to `./.next`          |

----
### Deploy to Vercel
----

The project is configured for deployment on Vercel with the SSG rendering model. See `vercel.json` for the framework, install/build commands and region (`fra1`).

Vercel runs `npm ci` and then `npm run build`. The `build` script executes `node lib/jsonGenerator.js` **before** `next build`, so the JSON data files under `.json/` are regenerated on every deploy — do not replace `npm run build` with a bare `next build`.

After a Preview or Production deploy, follow the verification checklist in [DEPLOYMENT.md](./DEPLOYMENT.md).

----
### Contributing
----

Contributions to this project are welcome. If you find a bug or have a feature request, please open an issue on the project's GitHub page. If you would like to contribute code, please fork the repository and create a pull request with your changes.