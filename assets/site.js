(function(){
  var nav=document.querySelector('.nav'),btn=document.querySelector('.menu');
  if(btn){btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});}
  // direction for the outgoing page: compare nav order of current vs target
  var order=window.NAV_ORDER||[];
  function idx(p){p=p.replace(/index\.html$/,'');var i=order.indexOf(p);return i<0?order.length:i;}
  document.querySelectorAll('.nav a[href]').forEach(function(a){a.addEventListener('click',function(){
    var d=idx(new URL(a.href,location.href).pathname)>=idx(location.pathname)?'fwd':'back';
    document.documentElement.dataset.dir=d;try{sessionStorage.setItem('vt-dir',d);}catch(e){}
  });});
  // back/forward on the outgoing page (Chromium)
  window.addEventListener('pageswap',function(e){if(e.activation&&e.activation.entry){var d=idx(new URL(e.activation.entry.url).pathname)>=idx(location.pathname)?'fwd':'back';document.documentElement.dataset.dir=d;}});
  // table of contents highlight
  var links=[].slice.call(document.querySelectorAll('.toc a')),secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
  function upd(){var y=window.scrollY+140,cur=0;secs.forEach(function(s,i){if(s&&s.offsetTop<=y)cur=i});links.forEach(function(a,i){a.classList.toggle('is-active',i===cur)})}
  if(links.length){window.addEventListener('scroll',upd,{passive:true});upd();}
})();
