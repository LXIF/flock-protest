<script>
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';
    import { Peer } from 'peerjs';
    import { PUBLIC_SHEPHERD_ID } from '$env/static/public';
  
    const dispatch = createEventDispatcher();
    let myId = '';
    const retryInterval = 3000; // Time in milliseconds to wait before retrying connection
  
    onMount(async () => {
      let peer = new Peer();
  
      // Function to handle connection attempts
      function connectToPeer() {
        let conn = peer.connect(PUBLIC_SHEPHERD_ID);
  
        conn.on('open', () => {
          console.log('Connection established with shepherd!');
          conn.send(myId); // Send your ID to the shepherd
        });
  
        conn.on('data', (data) => {
          console.log('Received data:', data);
          dispatch('messageReceived', data); // Dispatch the received data as an event
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
  </script>
  
  <!-- UI for the component -->
  <p>Waiting for messages...</p>
  