<script>
    import { onMount } from 'svelte';
    import * as Tone from 'tone';
    import NoSleep from 'nosleep.js';
    import { browser } from '$app/environment';

    import PeerMessageReceiver from './PeerMessageReceiver.svelte';

    import sample from '$lib/sounds/thisbody_grainflocker_02.wav';
  
    let isReady = false;
    /**
     * @type {any}
    */
    let buffer;
    /**
     * @type {any}
    */
    let noSleep;

    if(browser) {
        noSleep = new NoSleep();
        // Create a buffer for the .wav file
        buffer = new Tone.Buffer(sample, () => {
          // This function is called when the buffer is loaded
          isReady = true;
        });
    }
    
    /**
     * @type {any}
     */
    let player;
    // Function to play the sound
    async function readySound() {
        // Enable wake lock.
        noSleep.enable();
        // Ensure audio context is resumed (needed for some browsers)
        await Tone.start();
  
        // Create a one-shot player with the buffer
        player = new Tone.Player(buffer).toDestination();
    }

    /**
     * @param {any} event
     */
    function playSound(event) {
        console.log(event);
  
        // Play the buffer
        player.start();
    }
  </script>
  
  <!-- UI for the player -->
  {#if isReady}
    <button on:click={readySound}>Enter</button>
  {:else}
    <p>Loading sound...</p>
  {/if}
  
  <PeerMessageReceiver on:messageReceived={playSound} />