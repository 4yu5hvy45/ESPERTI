/* Dot cursor: follows the pointer exactly (no easing, no trail). Fine-pointer devices only. */
(function(){
  if(!window.matchMedia||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  var root=document.documentElement;
  var el=document.createElement('div');el.className='dot-cursor';el.setAttribute('aria-hidden','true');
  el.innerHTML='<i></i>';
  document.body.appendChild(el);
  root.classList.add('has-dot-cursor');
  var LINK='a[href],button,summary,label,select,[role="button"],[data-cursor="link"],.brief-option,.nav-toggle';
  var TEXT='input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]),textarea,[contenteditable]';
  function setPos(x,y){el.style.transform='translate3d('+x+'px,'+y+'px,0)'}
  function isEmber(c){var m=c&&c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);if(!m)return false;if(m[4]!==undefined&&+m[4]<.5)return false;return +m[1]>200&&+m[2]<130&&+m[3]<90}
  function classify(t){
    var link=t&&t.closest?t.closest(LINK):null, text=t&&t.closest?t.closest(TEXT):null;
    el.classList.toggle('is-link',!!link&&!text);
    el.classList.toggle('is-text',!!text);
    var light=false;
    if(link){var n=link;while(n&&n!==document.body){if(isEmber(getComputedStyle(n).backgroundColor)){light=true;break}n=n.parentElement}}
    el.classList.toggle('is-light',light);
  }
  addEventListener('pointermove',function(e){
    if(e.pointerType&&e.pointerType!=='mouse')return;
    setPos(e.clientX,e.clientY);el.classList.add('is-on');
  },{passive:true});
  addEventListener('pointerover',function(e){classify(e.target)},{passive:true});
  addEventListener('pointerdown',function(){el.classList.add('is-down')},{passive:true});
  addEventListener('pointerup',function(){el.classList.remove('is-down')},{passive:true});
  document.addEventListener('mouseleave',function(){el.classList.remove('is-on')});
  document.addEventListener('mouseenter',function(){el.classList.add('is-on')});
  addEventListener('blur',function(){el.classList.remove('is-on')});
})();
