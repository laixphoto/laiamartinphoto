<svg
  viewBox="0 0 247 390"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
>
  <path
    id="wheel"
    d="M123.359,79.775l0,72.843"
    style="fill:none;stroke:#fff;stroke-width:20px;"
  />
  <path
    id="mouse"
    d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
    style="fill:none;stroke:#fff;stroke-width:20px;"
  />
</svg>

<style lang="scss">
  svg {
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
    width: 30px;
    margin: 0 auto;

    @media (max-width: 740px) {
      bottom: 20px;
    }

    #wheel {
      animation: scroll ease 1.5s infinite;
    }
  }

  @keyframes scroll {
    0% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(100px);
    }
  }
</style>
