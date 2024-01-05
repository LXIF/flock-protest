<script>
    import SamplePlayer from "$lib/components/functional/SamplePlayer.svelte";
    import BlurTainer from "$lib/components/layout/BlurTainer.svelte";
</script>

<div class="flex items-center justify-center h-screen">
    <BlurTainer classes="h-3/5 w-3/5 flex flex-col space-y-10 items-center justify-center">
        <SamplePlayer />
    </BlurTainer>
</div>