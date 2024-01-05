<script>
    import QRCode from 'qrcode';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    /**
     * @type {HTMLCanvasElement}
     */
    let canvas;

    onMount(() => {
        console.log(window.location.href);
        QRCode.toCanvas(canvas, window.location.href, { width: 150});
    });
</script>

<div class="flex flex-col justify-center items-center">
    <p class="text-center mb-2">QR Code for this page:</p>
    <canvas id="qrcode" bind:this={canvas}></canvas>
</div>