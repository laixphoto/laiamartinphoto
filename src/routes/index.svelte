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
            <img
              class="xfill"
              src={getImage(route.photo, "w")}
              alt={route.title}
            />
            <p class="row aend">{route.title}</p>
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</div>

<style lang="scss">
  ul {
    gap: 20px;
    padding: 40px;

    @media (max-width: $mobile) {
      padding: 20px;
    }
  }

  li {
    width: 300px;
    height: 350px;
    background: $white;
    border: 1px solid $border;
    border-radius: 16px;
    padding: 10px;

    img {
      height: 280px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 5px 10px -5px rgba($black, 0.3);
      transition: 200ms;
    }

    p {
      font-size: 24px;
      font-weight: bold;
      margin-top: auto;
    }

    &:hover {
      img {
        filter: opacity(0.5);
      }
    }
  }
</style>
