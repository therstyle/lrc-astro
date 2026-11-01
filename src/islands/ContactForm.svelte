<script lang="ts">
  /**
   * Contact form island (replaces the Formidable Pro form + math captcha).
   *
   * This is a demo site, so the form is non-functional: the submit button is
   * disabled and submissions are not sent. The field structure keeps the
   * `.frm_fields_container` markup so the existing `.quote-right` SCSS applies
   * unchanged. To wire up a real backend later, re-enable the button and point
   * it at an Astro Action / form service.
   */
  interface Props {
    note?: string;
    defaultState?: string;
    phone?: string;
    /** Retained for when a real backend is added (unused by the demo form). */
    recipient?: string;
  }

  let {
    note = '',
    defaultState = 'Arizona',
    phone = '',
  }: Props = $props();

  // Bound field values (Svelte 5 runes). The demo form never submits, so these
  // stay in the browser.
  let name = $state('');
  let email = $state('');
  let street = $state('');
  let city = $state('');
  let state = $state(defaultState);
  let zip = $state('');
  let comments = $state('');
  // Honeypot: bots fill this; humans leave it blank.
  let honeypot = $state('');
</script>

<form onsubmit={(e) => e.preventDefault()} class="frm-form" novalidate>
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
    <!-- Disabled: this is a demo site with no backend. The warm gradient is
         applied via `.quote-right .frm_final_submit` in refinements.scss. -->
    <button type="submit" class="frm_final_submit" disabled>Submit</button>
  </div>

  {#if phone}
    <small>Or call us at <a href={`tel:${phone}`}>{phone}</a> for a free quote.</small>
  {/if}

  {#if note}
    <small>{note}</small>
  {/if}
</form>

<style lang="scss">
.frm_submit {
    margin-bottom: var(--space-2);
  }
</style>