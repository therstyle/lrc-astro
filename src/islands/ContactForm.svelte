<script lang="ts">
  /**
   * Contact form island (replaces the Formidable Pro form + math captcha).
   *
   * Client-only by design (per project decision): on submit it builds a `mailto:`
   * link with the entered details, opening the visitor's mail client. The honeypot
   * field ("If you are human, leave this field blank") is preserved for spam
   * protection. To send submissions to a real backend later, point `recipient` at
   * an Astro Action / form service instead of the mailto branch.
   *
   * The markup keeps the `.frm_fields_container` structure so the existing `.quote-right`
   * SCSS applies unchanged.
   */
  let {
    note = '',
    defaultState = 'Arizona',
    phone = '',
    recipient = 'contact@latinroguecleaning.com',
  }: {
    note?: string;
    defaultState?: string;
    phone?: string;
    recipient?: string;
  } = $props();

  let submitted = $state(false);
  let submitting = $state(false);

  // Bound field values (Svelte 5 runes).
  let name = $state('');
  let email = $state('');
  let street = $state('');
  let city = $state('');
  let state = $state(defaultState);
  let zip = $state('');
  let comments = $state('');
  // Honeypot: bots fill this; humans leave it blank.
  let honeypot = $state('');

  function handleSubmit() {
    // Honeypot check — silently drop suspected bots.
    if (honeypot) return;

    submitting = true;
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Street Address: ${street}`,
      `City: ${city}`,
      `State: ${state}`,
      `Zip Code: ${zip}`,
      `Comments: ${comments}`,
    ];
    const subject = `Quote Request from ${name || 'Website Visitor'}`;
    const body = lines.join('\n');
    const url = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = url;
    submitted = true;
    submitting = false;
  }
</script>

{#if submitted}
  <p class="form-success" role="status">
    Thanks! Your email app should now be open to send your request
    {#if phone}—or call us at <a href={`tel:${phone}`}>{phone}</a>{/if}.
  </p>
{:else}
  <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="frm-form" novalidate>
    <div class="frm_fields_container">
      <div class="form-field">
        <label for="field_name">Name</label>
        <input type="text" id="field_name" placeholder="Name" required bind:value={name} />
      </div>

      <div class="form-field">
        <label for="field_emailaddress">Email Address</label>
        <input type="email" id="field_emailaddress" placeholder="Email Address" required bind:value={email} />
      </div>

      <div class="form-field">
        <label for="field_streetaddress">Street Address</label>
        <input type="text" id="field_streetaddress" placeholder="Street Address" bind:value={street} />
      </div>

      <div class="form-field">
        <label for="field_city">City</label>
        <input type="text" id="field_city" placeholder="City" required bind:value={city} />
      </div>

      <div class="form-field state">
        <label for="field_state">State</label>
        <input type="text" id="field_state" placeholder="State" readonly bind:value={state} />
      </div>

      <div class="form-field zip">
        <label for="field_zipcode">Zip Code</label>
        <input type="text" id="field_zipcode" placeholder="Zip Code" required bind:value={zip} />
      </div>

      <div class="form-field">
        <label for="field_comments">Comments</label>
        <textarea id="field_comments" rows="5" placeholder="Comments" bind:value={comments}></textarea>
      </div>

      <!-- Honeypot (kept from the original math-captcha spam check). -->
      <div class="form-field" aria-hidden="true" style="display:none">
        <label>If you are human, leave this field blank.</label>
        <input type="text" tabindex="-1" autocomplete="off" bind:value={honeypot} />
      </div>
    </div>

    <div class="frm_submit">
      <button type="submit" class="frm_final_submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Submit'}
      </button>
    </div>

    {#if note}
      <small>{note}</small>
    {/if}
  </form>
{/if}
