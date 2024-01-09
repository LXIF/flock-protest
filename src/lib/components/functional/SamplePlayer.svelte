<script>
    import { onDestroy } from 'svelte';
    import * as Tone from 'tone';
    import NoSleep from 'nosleep.js';
    import { browser } from '$app/environment';

    import PeerMessageReceiver from './PeerMessageReceiver.svelte';

    import sample from '$lib/sounds/AUD-20240105-WA0022.mp3';
  
    let isLoaded = false;
    let isReady = false;
    export let isControl = false;
    export let playPick = false;
    let playLocally = false;
    /**
     * @type {any}
    */
    let buffer;
    /**
     * @type {any}
    */
    let noSleep;

    if(browser) {
        // Create a buffer for the .wav file
        buffer = new Tone.Buffer(sample, () => {
          // This function is called when the buffer is loaded
          isLoaded = true;
        });
    }

    //follower
    /**
     * @type {any}
     */
    let meter;
    
    /**
     * @type {any}
     */
    let player;

    /**
     * @type {any}
     */
    let testSynth;

    // Function to play the sound
    async function readySound() {
        // Ensure audio context is resumed (needed for some browsers)
        await Tone.start();
        meter = new Tone.Meter().toDestination();
        meter.smoothing = 0;
        // Create a one-shot player with the buffer
        player = new Tone.Player(buffer).connect(meter);

        // Create a synth
        testSynth = new Tone.Synth().toDestination();
        setInterval(() => {
            setMeter();
        }, 50);
        isReady = true;
        noSleep = new NoSleep();
        // Enable wake lock
        noSleep.enable();
    }

    function toggleLocalSound() {
      playLocally = !playLocally;
      if(playLocally) {
        readySound();
      } else {
        noSleep.disable();
        player.stop();
      }
    }

    /**
     * @param {any} event
     */
    function playSound(event) {
        console.log(event);
  
        // Play the buffer
        if(!isControl && isReady) {
          player.start();
        } else {
          if(playLocally) {
            player.start();
          }
        }
    }

    function playSynth() {
      console.log("playSynth");
      const randomFrequency = 300 + Math.random() * 500;
      testSynth.triggerAttackRelease(randomFrequency,"8n");
    }

    let meterValue = 0;

    function setMeter() {
        meterValue = meter.getValue();
    }

    onDestroy(() => {
      noSleep.disable();
    });

    $: (playPick || !playPick) && playSound('howdy');
  </script>
  
  <!-- UI for the player -->
  {#if !isControl}
    {#if isLoaded && !isReady}
      <button class="p-4 bg-black rounded-full text-white text-md font-black animate-bounce" on:click={readySound}>TOUCH HERE TO ACTIVATE SOUND</button>
    {:else if isReady}
      <button on:click={playSynth} style={`transform: scale(1)`} class="p-4 bg-black rounded-full text-white text-xl font-black">TEST</button>
      {#if meterValue > -100}
        <div style={`transform: scale(${(4 + (meterValue + 100)/4)})`}>🔊</div>
      {:else}
        <div style={`transform: scale(4)`}>🔈</div>
      {/if}
    {:else}
      <p>Loading sound...</p>
    {/if}
  
      <PeerMessageReceiver on:messageReceived={playSound} />
      {:else}
      <buttpm>
        <button class={`p-4 rounded-full ${playLocally ? 'bg-white text-black' : 'bg-black text-white'} text-md font-black`} on:click={toggleLocalSound}>{playLocally ? 'Deactivate' : 'Activate'} Local Sound</button>
      </buttpm>
  {/if}