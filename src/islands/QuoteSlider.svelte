<script lang="ts">
  /**
   * Quotes carousel (replaces Flickity + slick + the flickity.js island).
   *
   * Flickity's vanilla build is heavy for a handful of crossfading quotes, so
   * this is a small Svelte 5 runes replacement: crossfade between quotes,
   * auto-advance every `interval` ms, pause on hover, and clickable pagination
   * dots (matching the original `autoPlay: 5000, prevNextButtons: false,
   * pageDots: true`).
   *
   * Every quote lives in its own grid cell that overlaps the others, so the
   * container always sizes to the tallest quote and the dots stay anchored —
   * no layout shift or stack/fade as quotes of different lengths crossfade.
   * The `.quotes` / `.quote-name` / `.flickity-page-dots` SCSS is reused
   * unchanged.
   */
  interface Quote {
    text: string;
    name: string;
  }

  interface Props {
    quotes?: Quote[];
    /** Auto-advance delay in milliseconds. */
    interval?: number;
  }

  let {
    quotes = [] as Quote[],
    interval = 5000,
  }: Props = $props();

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

  // Select a dot and restart the auto-advance from a fresh interval.
  function goTo(i: number) {
    index = i;
    stop();
    start();
  }

  start();
</script>

<div class="quotes" onmouseenter={stop} onmouseleave={start}>
  {#if quotes.length}
    <div class="quotes-track">
      {#each quotes as quote, i (i)}
        <div
          class="quote-slide"
          class:is-active={i === index}
          aria-hidden={i !== index}
        >
          <p>{quote.text}</p>
          {#if quote.name}
            <p class="quote-name">{quote.name}</p>
          {/if}
        </div>
      {/each}
    </div>

    {#if quotes.length > 1}
      <ul class="flickity-page-dots" aria-label="Choose a testimonial">
        {#each quotes as quote, i (i)}
          <li
            class="dot"
            class:is-selected={i === index}
            tabindex="0"
            role="button"
            aria-pressed={i === index}
            aria-label={`Show testimonial ${i + 1}${quote.name ? ` from ${quote.name}` : ''}`}
            onclick={() => goTo(i)}
            onkeydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goTo(i);
              }
            }}
          ></li>
        {/each}
      </ul>
    {/if}
  {/if}
</div>
