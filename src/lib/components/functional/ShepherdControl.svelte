<script>
  import { onMount } from 'svelte';
  import Peer from 'peerjs';
  import { PUBLIC_SHEPHERD_ID } from '$env/static/public';
  import { goto } from '$app/navigation';
  
  /**
   * @type {{[key: string]: any}}}
   */
  let connectedPeers = {}; // Object to keep track of connected peers

  /**
   * @type {any}
   */
  let peer;

  let taken = false;

  let nConnections = 0;

  function setup() {
    peer = new Peer(PUBLIC_SHEPHERD_ID);

    peer.on('connection', (conn) => {
      console.log(`Connected to: ${conn.peer}`);
      connectedPeers[conn.peer] = conn; // Store the connection
      nConnections++;

      conn.on('data', (data) => {
        console.log(`Received message from ${conn.peer}:`, data);
        if(data === 'kick') {
          peer.destroy();
          goto('/');
        }
      });

      conn.on('close', () => {
        console.log(`Connection with ${conn.peer} has closed`);
        delete connectedPeers[conn.peer]; // Remove the connection from the list
        nConnections--;
      });
    });

    peer.on('error', (err) => {
      console.error('Error:', err);
      if (err.type === 'unavailable-id') { // Check if the error type indicates the ID is taken
        console.error(`The ID ${PUBLIC_SHEPHERD_ID} is already in use.`);
        peer.destroy(); // Destroy the peer
        taken = true; // Handle the conflict
      }
    });
  }

  onMount(() => {
    setup();
  });

  function kickOutConflictingPeer() {
    console.log('kicking');
    const temporaryPeer = new Peer();

    temporaryPeer.on('open', () => {
      console.log('Connection established with shepherd!');
      const kickConn = temporaryPeer.connect(PUBLIC_SHEPHERD_ID);
      kickConn.on('open', () => {
        kickConn.send('kick');
        temporaryPeer.destroy();
        setup();
        taken = false;
      });
    });
  }

  // Function to send a message to all connected peers
  function sendMessageToAll() {
    const message = "Hello, peers!"; // Customize your message here
    Object.values(connectedPeers).forEach((conn) => {
      conn.send(message);
    });
    console.log('Message sent to all connected peers');
  }
</script>
  
<!-- UI for the control component -->
{#if !taken}
  <button class="p-4 bg-black rounded-full text-white text-xl font-black" on:click={sendMessageToAll}>Play Sound</button>
{:else}
  <button class="p-4 bg-black rounded-full text-white text-xl font-black animate-bounce" on:click={kickOutConflictingPeer}>Someone else is in control. Kick?</button>
{/if}
<div>
  <p class="py-2 px-4 bg-slate-800 rounded-full text-white text-sm font-semibold">{nConnections} connections!</p>
</div>