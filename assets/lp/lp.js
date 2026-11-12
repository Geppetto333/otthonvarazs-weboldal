/*CK-START*/
window.CK={key:'ov_consent_v1',policy:'/adatkezeles#sutik'};
/* Süti-hozzájárulás (GeppettoLife) – a <head> legelején kell betölteni, minden követőkód (GTM, Meta pixel) ELŐTT.
Beállítás az oldalon, a script előtt (opcionális):
window.CK = { key: 'ck_consent_v1', policy: '/adatkezeles' }; */
(function () {
if (window.__ckLoaded) return; window.__ckLoaded = true;
var CFG = window.CK || {};
var KEY = CFG.key || 'ck_consent_v1';
var POLICY = CFG.policy || '/adatkezeles';
window.dataLayer = window.dataLayer || [];
if (!window.gtag) window.gtag = function () { dataLayer.push(arguments); };
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });
if (!window.fbq) {
var n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
if (!window._fbq) window._fbq = n;
n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
}
var fbLoaded = false;
function loadFb() {
if (fbLoaded) return; fbLoaded = true;
var s = document.createElement('script'); s.async = true; s.src = 'https://connect.facebook.net/en_US/fbevents.js';
(document.head || document.documentElement).appendChild(s);
}
function read() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
function apply(c) {
gtag('consent', 'update', {
analytics_storage: c.stat ? 'granted' : 'denied',
ad_storage: c.mkt ? 'granted' : 'denied',
ad_user_data: c.mkt ? 'granted' : 'denied',
ad_personalization: c.mkt ? 'granted' : 'denied'
});
if (c.mkt) loadFb();
dataLayer.push({ event: 'consent_update', consent_stat: !!c.stat, consent_mkt: !!c.mkt });
}
function save(stat, mkt) {
var c = { stat: !!stat, mkt: !!mkt, ts: new Date().toISOString() };
try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
hide(); apply(c);
}
var saved = read();
if (saved) apply(saved);
var box;
function css() {
var st = document.createElement('style');
st.textContent = '#ckb{position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483000;max-width:560px;margin:0 auto;background:#1b1a19;color:#f3efe8;border-radius:14px;box-shadow:0 10px 40px rgba(0,0,0,.35);padding:18px 18px 16px;font:14px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}'
+ '#ckb h2{margin:0 0 6px;font-size:16px;font-weight:700;color:#fff}#ckb p{margin:0 0 12px}#ckb a{color:#f3c76b;text-decoration:underline}'
+ '#ckb .ckr{display:flex;flex-wrap:wrap;gap:8px}#ckb button{flex:1 1 140px;min-height:44px;border-radius:10px;border:1px solid #5a5650;background:transparent;color:#f3efe8;font:600 14px system-ui,sans-serif;cursor:pointer;padding:10px 12px}'
+ '#ckb button.ckp{background:#f3c76b;border-color:#f3c76b;color:#1b1a19}#ckb .cko{display:none;margin:0 0 12px}#ckb .cko.on{display:block}'
+ '#ckb label{display:flex;gap:10px;align-items:flex-start;margin:0 0 8px;cursor:pointer}#ckb label input{width:20px;height:20px;margin:2px 0 0;flex:0 0 auto}#ckb label span{font-size:13px;opacity:.8;display:block}';
document.head.appendChild(st);
}
function build() {
css();
box = document.createElement('div');
box.id = 'ckb'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-labelledby', 'ckbT');
box.innerHTML = '<h2 id="ckbT">Sütik és adatvédelem</h2>'
+ '<p>Az oldal működéséhez szükséges sütiket mindig használjuk. Statisztikai és marketing sütiket (pl. Google, Meta) csak az Ön hozzájárulásával. Részletek: <a href="' + POLICY + '">Adatkezelési tájékoztató</a>.</p>'
+ '<div class="cko" id="ckbO">'
+ '<label><input type="checkbox" checked disabled><div><b>Szükséges</b><span>Az oldal működéséhez kell, nem kapcsolható ki.</span></div></label>'
+ '<label><input type="checkbox" id="ckbS"><div><b>Statisztika</b><span>Látogatottság mérése (pl. Google Analytics).</span></div></label>'
+ '<label><input type="checkbox" id="ckbM"><div><b>Marketing</b><span>Hirdetések mérése és személyre szabása (pl. Google Ads, Meta).</span></div></label>'
+ '</div>'
+ '<div class="ckr"><button type="button" id="ckbN">Csak a szükségesek</button><button type="button" id="ckbE">Beállítások</button><button type="button" class="ckp" id="ckbA">Mindet elfogadom</button></div>';
document.body.appendChild(box);
var o = box.querySelector('#ckbO'), s = box.querySelector('#ckbS'), m = box.querySelector('#ckbM'), e = box.querySelector('#ckbE');
box.querySelector('#ckbA').onclick = function () { save(true, true); };
box.querySelector('#ckbN').onclick = function () { save(false, false); };
e.onclick = function () {
if (o.classList.contains('on')) { save(s.checked, m.checked); return; }
o.classList.add('on'); e.textContent = 'Kiválasztottak mentése';
};
}
function show(withOpts) {
if (!document.body) { document.addEventListener('DOMContentLoaded', function () { show(withOpts); }); return; }
if (!box) build();
var c = read() || {};
box.querySelector('#ckbS').checked = !!c.stat; box.querySelector('#ckbM').checked = !!c.mkt;
var o = box.querySelector('#ckbO'), e = box.querySelector('#ckbE');
o.classList.toggle('on', !!withOpts); e.textContent = withOpts ? 'Kiválasztottak mentése' : 'Beállítások';
box.style.display = 'block';
}
function hide() { if (box) box.style.display = 'none'; }
window.ckOpen = function () { show(true); };
document.addEventListener('click', function (ev) {
var a = ev.target.closest && ev.target.closest('[data-ck-open],a[href$="#suti-beallitasok"]');
if (a) { ev.preventDefault(); show(true); }
});
document.addEventListener('DOMContentLoaded', function () {
var f = document.querySelector('footer');
if (f && !f.querySelector('[data-ck-open]')) {
var p = document.createElement('p'); p.style.cssText = 'margin:8px 0 0;font-size:13px;text-align:center';
p.innerHTML = '<a href="#suti-beallitasok" data-ck-open style="color:inherit;opacity:.75">Süti-beállítások</a>';
f.appendChild(p);
}
});
if (!saved) show(false);
})();
/*CK-END*/
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
    if(!form.email){
      var pf = form.phone && form.phone.closest(".field");
      if(pf){
        var eid = (form.phone.id||"x").replace(/^p_/,"e_");
        var ed = document.createElement("div"); ed.className="field";
        ed.innerHTML = '<label for="'+eid+'">E-mail cím</label><input id="'+eid+'" name="email" type="email" inputmode="email" autocomplete="email" placeholder="Pl. kovacs.anna@gmail.com">';
        pf.parentNode.insertBefore(ed, pf.nextSibling);
      }
    }
    form.addEventListener("focusin", function(){ if(!started){ started=true; window.dataLayer.push({event:"form_start", page_slug:LP.page}); } });
    form.addEventListener("submit", function(ev){
      ev.preventDefault();
      var msg = form.querySelector(".msg"), btn = form.querySelector("button[type=submit]");
      msg.className="msg"; msg.textContent="";
      function err(t){ msg.className="msg err"; msg.textContent=t; return false; }
      var name = form.name.value.trim(), phone = form.phone.value.trim(), city = form.city.value.trim();
      var email = (form.email ? form.email.value.trim() : "");
      if(name.length<2){ return err("Kérjük, adja meg a nevét."); }
      if(!validPhone(phone)){ return err("Kérjük, adjon meg érvényes telefonszámot (pl. 06 70 123 4567)."); }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){ return err("Kérjük, adjon meg érvényes e-mail címet."); }
      if(city.length<2){ return err("Kérjük, adja meg a települést vagy a budapesti kerületet."); }
      if(!form.consent.checked){ return err("Az ajánlatkéréshez el kell fogadnia az adatkezelési tájékoztatót."); }
      if(/IDE_/.test(WEBHOOK_URL)){ return err("Beállítási hiba: a webhook URL még nincs megadva (assets/lp/lp.js)."); }

      var payload = {
        name:name, phone:normPhone(phone), email:email, city:city,
        detail:(form.detail? form.detail.value.trim():""),
        service:LP.service, page:LP.page, url:location.href,
        submitted_at:new Date().toISOString()
      };
      for(var k in keep){ payload[k]=keep[k]; }
      btn.disabled=true; btn.textContent="Küldés…";
      var done=false;
      function go(){ if(done) return; done=true; try{sessionStorage.setItem("ov_lead","1")}catch(e){} location.href="/"+LP.page+"/koszonjuk" + (location.search||""); }
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
