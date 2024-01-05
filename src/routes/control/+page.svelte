<script>
    import ShepherdControl from "$lib/components/functional/ShepherdControl.svelte";
    import BlurTainer from "$lib/components/layout/BlurTainer.svelte";
    import SamplePlayer from "$lib/components/functional/SamplePlayer.svelte";
    import { enhance } from "$app/forms";

    let playPick = false;

    function playSound() {
        playPick = !playPick;
    }
</script>

<div class="flex items-center justify-center h-screen">
    <BlurTainer classes="h-3/5 w-3/5 flex flex-col space-y-4 items-center justify-center">
        <ShepherdControl on:messageSent={playSound} />
        <SamplePlayer {playPick} isControl />
        <form use:enhance method="POST" action="?/logout">
            <button class="px-4 py-1 border-2 border-black rounded-full">logout</button>
        </form>
    </BlurTainer>
</div>