<script>
  export let t;
  export let data;
  export let colors;
</script>

<style>
  :global(#detail section .html-fragment) {
    padding-left: 0rem !important;
    padding-right: 0rem !important;
  }
  @media only screen and (max-width: 640px) {
    :global(#detail section .html-fragment) {
      padding-left: 0.5rem !important;
      padding-right: 0.5rem !important;
    }
  }
  :global(.embed-inline__content #total, .embed-inline__content
      #topflop, .embed-inline__content #bigmuseums) {
    padding: 24px 24px 1px !important;
    background-color: #f5f5f2;
  }
  :global(.embed-inline__content h2) {
    padding: 0;
    margin: 0 0 12px;
    font-family: "SRG_SSR_Medium", sans-serif;
    font-size: 24px;
    letter-spacing: normal;
    line-height: 1.35;
  }
  h2,
  p {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .rect-label {
    display: inline-block;
    margin-right: 10px;
    margin-top: 7px;
  }
  .rect-m,
  .rect-f {
    content: " ";
    height: 1rem;
    width: 1rem;
    display: inline-block;
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

<h2>{t('total_title')}</h2>
<p>
   {t('total_description')}
  <br />
  <span class="rect-label">
    <span class="rect-f" style="background-color: {colors.f};" />
     {t('f')}
  </span>
  <span class="rect-label">
    <span class="rect-m" style="background-color: {colors.m};" />
     {t('m')}
  </span>
</p>
{#each data as group}
  <div class="row">
    <div class="name">{t(group.category)}</div>
    <div class="bar-chart">
      <div
        class="bar bar-f"
        style="width: {group.f}%; background-color: {colors.f};">
        <span>{group.f > 7 ? `${group.f}%` : ' '}</span>
      </div>
      <div
        class="bar bar-m"
        style="width: {group.m}%; background-color: {colors.m};">
        <span>{group.m > 7 ? `${group.m}%` : ' '}</span>
      </div>
    </div>
  </div>
{/each}
<p>{t('total_remarks')}</p>
