<script>
    import { createEventDispatcher } from 'svelte';
    import { onMount, onDestroy } from 'svelte';
    import { Peer } from 'peerjs';
    import { PUBLIC_SHEPHERD_ID } from '$env/static/public';
  
    let connected = false;

    const dispatch = createEventDispatcher();
    let myId = '';
    const retryInterval = 3000; // Time in milliseconds to wait before retrying connection
  
    /** @type {Peer} */
    let peer;

    onMount(() => {
      peer = new Peer();
  
      // Function to handle connection attempts
      function connectToPeer() {
        let conn = peer.connect(PUBLIC_SHEPHERD_ID);
  
        conn.on('open', () => {
          console.log('Connection established with shepherd!');
          conn.send(myId); // Send your ID to the shepherd
          connected = true;
        });
  
        conn.on('data', (data) => {
          console.log('Received data:', data);
          dispatch('messageReceived', data); // Dispatch the received data as an event
        });

        conn.on('close', () => {
          console.log('Connection with shepherd has closed');
          console.log(`Retrying in ${retryInterval / 1000} seconds...`);
          setTimeout(connectToPeer, retryInterval); // Retry connection after specified interval
          connected = false;
        });
  
        conn.on('error', (err) => {
          console.error('Connection failed:', err);
          console.log(`Retrying in ${retryInterval / 1000} seconds...`);
          setTimeout(connectToPeer, retryInterval); // Retry connection after specified interval
        });
      }
  
      peer.on('open', (id) => {
        console.log('My ID is:', id);
        myId = id;
        connectToPeer(); // Attempt to connect to the shepherd
      });
  
      peer.on('error', (err) => {
        console.error('Error with peer connection:', err);
        console.log(`Retrying in ${retryInterval / 1000} seconds...`);
        setTimeout(connectToPeer, retryInterval); // Retry connection after specified interval
      });
    });

    onDestroy(() => {
      peer.destroy();
    });
  </script>
  

  <div class={`${connected ? 'bg-green-600' : 'bg-red-600'} p-4 rounded-full shadow-xl`}>
    {#if connected}
      <p>Connected!</p>
    {:else}
      <p>Connecting...</p>
    {/if}
  </div>