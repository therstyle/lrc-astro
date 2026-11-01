<script lang="ts">
  /**
   * Header navigation island (replaces navigation.js + smoothscroll.js).
   *
   * - Mobile menu toggle: toggles `body.menu-open` (the existing SCSS handles
   *   the hamburger animation and showing the nav).
   * - Anchor links use native CSS smooth scrolling (`html { scroll-behavior: smooth }`),
   *   so no JS scrolling is needed. Clicking a link just closes an open mobile menu.
   */
  interface NavItem {
    label: string;
    href: string;
  }

  let {
    items = [] as NavItem[],
    logo = '',
    siteName = '',
  }: {
    items?: NavItem[];
    logo?: string;
    siteName?: string;
  } = $props();

  let open = $state(false);

  function toggleMenu() {
    open = !open;
    document.body.classList.toggle('menu-open', open);
  }

  function closeMenu() {
    if (open) {
      open = false;
      document.body.classList.remove('menu-open');
    }
  }
</script>

<header class="main">
  <div class="wrapper">
    <a class="logo" href="#top">
      <img src={logo} alt={siteName} width="150" height="50" decoding="async" />
    </a>

    <button
      class="nav-toggle"
      type="button"
      aria-label="Toggle navigation menu"
      aria-expanded={open}
      onclick={toggleMenu}
    >
      <div class="icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>

    <nav class="menu-main-container">
      <ul id="menu-main" class="menu">
        {#each items as item}
          <li>
            <a href={item.href} onclick={closeMenu}>{item.label}</a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</header>
