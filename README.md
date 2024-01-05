# flock-protest

## setup

To use for yourself, clone this project, put your sound in ./src/lib/sounds and change the path to the sound in src/lib/components/functional/SamplePlayer.svelte from import sample from '$lib/sounds/AUD-20240105-WA0022.mp3' to the name of your new audio file.

Be sure to configure a unique PUBLIC_SHEPHERD_ID and PRIVATE_CONTROL_PASSWORD in the environment variables. To do so locally, put a file called .env into the root folder containing the following:

```
PUBLIC_SHEPHERD_ID="<your-long-id-here>"
PRIVATE_CONTROL_PASSWORD="<your-password-here>"
```

To test locally, cd into the root folder and run

```
pnpm i
pnpm run dev
```
or

```
npm i
npm run dev
```

In order to deploy, get a free tier vercel, netlify or similar subscription. Add this project to your github and link the vercel, netlify or similar to your github project. If you want to host it on your own server, be sure to use the right SvelteKit Adapter.