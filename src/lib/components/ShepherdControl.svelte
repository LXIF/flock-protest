<script>
    import { onMount } from 'svelte';
    import Peer from 'peerjs';
    import { PUBLIC_SHEPHERD_ID } from '$env/static/public';
  
    /**
     * @type {{[key: string]: any}}}
     */
    let connectedPeers = {}; // Object to keep track of connected peers
  
    onMount(() => {
      const peer = new Peer(PUBLIC_SHEPHERD_ID);
  
      peer.on('connection', (conn) => {
        console.log(`Connected to: ${conn.peer}`);
        connectedPeers[conn.peer] = conn; // Store the connection
  
        conn.on('data', (data) => {
          console.log(`Received message from ${conn.peer}:`, data);
        });
  
        conn.on('close', () => {
          console.log(`Connection with ${conn.peer} has closed`);
          delete connectedPeers[conn.peer]; // Remove the connection from the list
        });
      });
  
      peer.on('error', (err) => {
        console.error('Error:', err);
      });
    });
  
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
  <button on:click={sendMessageToAll}>Send Message to All</button>
  