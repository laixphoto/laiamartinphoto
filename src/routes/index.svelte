<script context="module">
  export async function load({ fetch }) {
    const album_id = "72157720267167555";

    const req = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ album_id }),
    });

    const res = await req.json();
    const data = res.photoset;

    return {
      props: {
        data,
      },
    };
  }
</script>

<script>
  import { ui } from "$content/home";
  import { ui as pages } from "$content/nav";

  export let data;
  const routes = [...pages.routes];

  routes.forEach((route) => {
    data.photo.forEach((photo) => {
      if (photo.title === route.title) {
        route["photo"] = photo;
      }
    });
  });

  function getImage({ server, id, secret }, size) {
    const prefix = "https://live.staticflickr.com";
    return `${prefix}/${server}/${id}_${secret}_${size}.jpg`;
  }
</script>

<svelte:head>
  <title>{ui.title}</title>
  <meta name="description" content={ui.description} />
</svelte:head>

<div class="scroll">
  <ul class="row jcenter xfill">
    {#each routes as route}
      {#if route.photo}
        <li>
          <a class="col acenter fill" href={route.slug}>
            <img class="fill" src={getImage(route.photo, "w")} alt={route.title} />
            <p class="fill row aend">{route.title}</p>
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</div>

<style lang="scss">
  ul {
    padding: 60px;
  }

  li {
    position: relative;
    width: 100%;
    max-width: 400px;
    aspect-ratio: 4/3;
    padding: 7px;

    p {
      position: absolute;
      bottom: 7px;
      left: 7px;
      width: calc(100% - 14px);
      background: linear-gradient(to top, rgba($black, 0.9), rgba($black, 0));
      color: $white;
      font-size: 30px;
      font-weight: bold;
      border-radius: 4px;
      padding: 20px;
      z-index: 2;
    }
  }

  img {
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 5px 10px rgba($black, 0.3);
    transition: 300ms;
  }
</style>
