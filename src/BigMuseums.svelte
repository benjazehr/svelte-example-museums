<script>
  export let t;
  export let data;
  export let colors;
</script>

<style>
  h2,
  p {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .row {
    display: flex;
    flex-direction: column;
  }
  .name {
    margin-bottom: 2px;
    flex: 1;
    line-height: 1;
    font-size: 0.9375em;
    letter-spacing: 0.01em;
  }
  @media only screen and (min-width: 641px) {
    .row {
      flex-direction: row;
    }
    .name {
      height: 40px;
    }
  }
  .bar-chart {
    margin-bottom: 12px;
    flex: 2;
  }
  .bar {
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
    float: left;
  }
  :global(html[dir="rtl"] .bar) {
    float: right;
  }
  .bar > span {
    display: inline-block;
    padding: 4px 6px;
  }
  .bar-f {
    color: white;
  }
  .bar-m {
    text-align: right;
  }
  :global(html[dir="rtl"] .bar-m) {
    text-align: left;
  }
  hr {
    padding: 0 !important;
    margin: 12px 0 24px;
    height: 1px;
    border: none;
    background-color: lightgray;
  }
</style>

<h2>{t('bigmuseums_title')}</h2>
<p>{t('bigmuseums_description')}</p>
{#each data as museum}
  <div class="row">
    <div class="name">
      <span>{t(museum.name)}</span>
      {#if !t(museum.name).match(` ${t(museum.city)}`)}
        <span class="city">{` (${t(museum.city)})`}</span>
      {/if}
    </div>
    <div class="bar-chart">
      <div
        class="bar bar-f"
        style="width: {museum.f}%; background-color: {colors.f};">
        <span>{museum.f > 7 ? `${museum.f}%` : ' '}</span>
      </div>
      <div
        class="bar bar-m"
        style="width: {museum.m}%; background-color: {colors.m};">
        <span>{museum.m > 7 ? `${museum.m}%` : ' '}</span>
      </div>
    </div>
  </div>
{/each}
