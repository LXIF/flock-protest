<script>
    import { onMount } from 'svelte';
    
    /**
     * @type {Array<{ size: number, x: number, y: number, animationDuration: number, scale: number }>}
     */
    let watermelons = [];
    const numberOfWatermelons = 250;
  
    const generateWatermelons = () => {
      const newWatermelons = [];
      for (let i = 0; i < numberOfWatermelons; i++) {
        const size = Math.random() * 3 + 1;
        const x = (Math.random() * 100) - size;
        const y = (Math.random() * 100) - size;
        const animationDuration = Math.random() * 3 + 2; // Random duration between 2s and 5s
        const scale = Math.random() * 0.5 + 1.1; // Random scale between 1.1 and 1.6
        newWatermelons.push({ size, x, y, animationDuration, scale });
      }
      watermelons = newWatermelons;
    };
  
    onMount(() => {
      generateWatermelons();
    });
  </script>
  
  <style>
    .fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      z-index: -1;
    }
  
    .watermelon {
      position: absolute;
      animation: pulse var(--animation-duration) infinite alternate ease-in-out;
      transition: all 0.5s ease-in-out;
    }

  
    @keyframes pulse {
      0% {
        transform: scale(1) rotate(-60deg);;
      }
      100% {
        transform: scale(var(--scale)) rotate(30deg);;
      }
    }
  </style>
  
  <div class="fullscreen">
    {#each watermelons as watermelon}
      <span
        class="watermelon drop-shadow-md"
        style="
          font-size: {watermelon.size}rem;
          left: {watermelon.x}%;
          top: {watermelon.y}%;
          --scale: {watermelon.scale};
          --animation-duration: {watermelon.animationDuration}s;
          transform-origin: center;
        "
      >
        🍉
      </span>
    {/each}
  </div>
  