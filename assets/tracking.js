(function(){
  const KEY='pac_v01_events';
  const REPO='https://github.com/zzzzzggh/hehehe/issues/new';
  function events(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}}
  function sid(){if(!sessionStorage.pac_sid){sessionStorage.pac_sid=(crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random())}return sessionStorage.pac_sid}
  window.pacTrack=function(name,variant,value){
    const q=new URLSearchParams(location.search);
    const row={timestamp:new Date().toISOString(),experiment_id:'PAC-51-R29F-META-R5H-V01',variant_id:variant||'',session_id:sid(),event_name:name,source:q.get('utm_source')||'direct',medium:q.get('utm_medium')||'',campaign:q.get('utm_campaign')||'',price_arm:value||'',locale:document.documentElement.lang||'',qualified:name!=='page_view'};
    const a=events();a.push(row);localStorage.setItem(KEY,JSON.stringify(a));
  };
  window.pacExport=function(){const b=new Blob([JSON.stringify(events(),null,2)],{type:'application/json'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download='pac_v01_events.json';a.click();URL.revokeObjectURL(u)};
  document.addEventListener('DOMContentLoaded',function(){
    pacTrack('page_view',document.body.dataset.group||'');
    document.querySelectorAll('[data-intent]').forEach(function(a){
      const variant=a.dataset.variant||'';const price=a.dataset.price||'';const product=a.dataset.product||'';
      const title='[V0 Interest] '+variant+' · '+price+' · '+product;
      const body='Variant: '+variant+'\nPrice selected: '+price+'\n\nWhat would you use this for?\n\nWhich output matters most?\n\nWould you like a fictitious sample or early-access notice?\n\n> Do not include confidential, personal, client, financial, contract, technical drawing, or production data. This is a demand-validation request, not a purchase.';
      a.href=REPO+'?title='+encodeURIComponent(title)+'&body='+encodeURIComponent(body);
      a.target='_blank';a.rel='noopener';
      a.addEventListener('click',function(){pacTrack('cta_click',variant,price)});
    });
  });
})();