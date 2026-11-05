/* Otthonvarázs landing – közös szkript. FIGYELEM: itt kell megadni a GTM ID-t és a webhook URL-t (egyszer, minden oldalra érvényes). */
(function(){
  var GTM_ID = "GTM-KPHBRZJ6";               // <-- ide jön az Otthonvarázs GTM konténer ID
  var WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/EcvwZiDMYa7g79S5U8Xb/webhook-trigger/ytt3003CZSANVsEAZpLB"; // GHL webhook
    var LP = window.LP || {};
  window.dataLayer = window.dataLayer || [];

  // Google Tag Manager betöltése
  if(!/XXXX/.test(GTM_ID)){
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',GTM_ID);
  }

  // Google Ads / UTM paraméterek mentése (gclid, utm_*)
  var qs = new URLSearchParams(location.search), keep = {};
  ["gclid","gbraid","wbraid","utm_source","utm_medium","utm_campaign","utm_term","utm_content"].forEach(function(k){
    var v = qs.get(k); if(v){ keep[k]=v; try{sessionStorage.setItem("ov_"+k,v)}catch(e){} }
    else { try{ var s=sessionStorage.getItem("ov_"+k); if(s) keep[k]=s; }catch(e){} }
  });

  // Telefon- és CTA-kattintás mérés
  document.addEventListener("click", function(e){
    var a = e.target.closest("a[href^='tel:']");
    if(a){ window.dataLayer.push({event:"phone_click", page_slug:LP.page}); }
    var c = e.target.closest("[data-cta]");
    if(c){ window.dataLayer.push({event:"cta_click", cta:c.getAttribute("data-cta"), page_slug:LP.page}); }
  });

  // Köszönő oldal: konverziós esemény (csak valódi beküldés után, egyszer)
  if(LP.thanks){
    var fired=false, real=false;
    try{fired=sessionStorage.getItem("ov_lead_fired")==="1"; real=sessionStorage.getItem("ov_lead")==="1";}catch(e){}
    if(real && !fired){
      window.dataLayer.push({event:"lead_form_submit", page_slug:"thanks"});
      try{sessionStorage.setItem("ov_lead_fired","1");sessionStorage.removeItem("ov_lead")}catch(e){}
    }
    return;
  }

  function normPhone(v){ return v.replace(/[^\d+]/g,""); }
  function validPhone(v){ var d=normPhone(v).replace(/^\+/,""); return d.length>=9 && d.length<=13; }

  document.querySelectorAll("form.lead").forEach(function(form){
    var started=false;
    form.addEventListener("focusin", function(){ if(!started){ started=true; window.dataLayer.push({event:"form_start", page_slug:LP.page}); } });
    form.addEventListener("submit", function(ev){
      ev.preventDefault();
      var msg = form.querySelector(".msg"), btn = form.querySelector("button[type=submit]");
      msg.className="msg"; msg.textContent="";
      function err(t){ msg.className="msg err"; msg.textContent=t; return false; }
      var name = form.name.value.trim(), phone = form.phone.value.trim(), city = form.city.value.trim();
      if(name.length<2){ return err("Kérjük, adja meg a nevét."); }
      if(!validPhone(phone)){ return err("Kérjük, adjon meg érvényes telefonszámot (pl. 06 70 123 4567)."); }
      if(city.length<2){ return err("Kérjük, adja meg a települést vagy a budapesti kerületet."); }
      if(!form.consent.checked){ return err("Az ajánlatkéréshez el kell fogadnia az adatkezelési tájékoztatót."); }
      if(/IDE_/.test(WEBHOOK_URL)){ return err("Beállítási hiba: a webhook URL még nincs megadva (assets/lp/lp.js)."); }

      var payload = {
        name:name, phone:normPhone(phone), city:city,
        detail:(form.detail? form.detail.value.trim():""),
        service:LP.service, page:LP.page, url:location.href,
        submitted_at:new Date().toISOString()
      };
      for(var k in keep){ payload[k]=keep[k]; }
      btn.disabled=true; btn.textContent="Küldés…";
      var done=false;
      function go(){ if(done) return; done=true; try{sessionStorage.setItem("ov_lead","1")}catch(e){} location.href="/"+LP.page+"/koszonjuk.html" + (location.search||""); }
      var t=setTimeout(go,4000);
      fetch(WEBHOOK_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload),keepalive:true})
        .then(function(r){ clearTimeout(t); if(!r.ok){ throw new Error("HTTP "+r.status); } go(); })
        .catch(function(){ clearTimeout(t); if(done) return; btn.disabled=false; btn.textContent=LP.btn; err("Nem sikerült elküldeni. Kérjük, próbálja újra, vagy hívjon: "+LP.phone); });
    });
  });

  // Galéria (opcionális): töltsd fel a GALLERY tömböt képek URL-jeivel
  var GALLERY = [];
  if(GALLERY.length){
    var g = document.getElementById("gallery"), box = document.getElementById("galbox");
    GALLERY.forEach(function(u){ var i=document.createElement("img"); i.src=u; i.loading="lazy"; i.alt=LP.service+" – előtte-utána munkák"; box.appendChild(i); });
    g.style.display="block";
  }
})();
