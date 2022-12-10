<script>
  export let invert = false;
  
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="40"
  height="40"
  viewBox="0 0 24 24"
  style="transform: rotateY({invert ? 180 : 0}deg); transition: 200ms"
>
  <style>
    path {
      fill: #fff;
    }
  </style>
  <path
    d="M20.5 4.5h-17a1.5 1.5 0 1 0 0 3h17a1.5 1.5 0 1 0 0-3zm-2.833 6H3.5a1.5 1.5 0 1 0 0 3h14.167a1.5 1.5 0 1 0 0-3zM12 16.5H3.5a1.5 1.5 0 1 0 0 3H12a1.5 1.5 0 1 0 0-3z"
  />
</svg>
