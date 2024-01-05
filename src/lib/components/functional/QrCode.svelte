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
        QRCode.toCanvas(canvas, window.location.href, { width: 200});
    });
</script>

<div>
    <p>QR Code to share this page:</p>
    <canvas id="qrcode" bind:this={canvas}></canvas>
</div>