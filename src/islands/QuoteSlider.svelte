<script lang="ts">
  import { fade } from 'svelte/transition';

  /**
   * Testimonials carousel (replaces the Flickity slider in slider.js).
   *
   * Native Svelte 5 implementation: crossfades between quotes every 5s, no
   * prev/next buttons (matching the original `autoPlay: 5000, prevNextButtons: false`).
   * The `.quotes` / `.quote-name` SCSS is reused unchanged.
   */
  interface Quote {
    text: string;
    name: string;
  }

  let {
    quotes = [] as Quote[],
    interval = 5000,
  }: {
    quotes?: Quote[];
    interval?: number;
  } = $props();

  let index = $state(0);
  let timer = $state<ReturnType<typeof setInterval> | undefined>(undefined);

  function next() {
    index = (index + 1) % quotes.length;
  }

  function start() {
    if (quotes.length <= 1) return;
    timer = setInterval(next, interval);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
  }

  start();
</script>

<div class="quotes" onmouseenter={stop} onmouseleave={start}>
  {#if quotes.length}
    {#each quotes as quote, i (i)}
      {#if i === index}
        <div transition:fade={{ duration: 600 }}>
          <p>{quote.text}</p>
          {#if quote.name}
            <p class="quote-name">{quote.name}</p>
          {/if}
        </div>
      {/if}
    {/each}
  {/if}
</div>
