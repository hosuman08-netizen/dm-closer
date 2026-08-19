
/* LEGION_WAVE_19_session_counter */
try{if(!sessionStorage.getItem('lw_p27_agentic__session_counter')){sessionStorage.setItem('lw_p27_agentic__session_counter','1');localStorage.setItem('lw_p27_agentic__session_counter',String((+(localStorage.getItem('lw_p27_agentic__session_counter')||0))+1));}}catch(e){}
(function(){
  var root=document.getElementById('app');
  var tones={friendly:'친근',pro:'프로',short:'짧고 세게',urgent:'마감 FOMO'};
  var steps={open:'오프너',value:'가치',close:'클로즈'};
  var presets=['Mac Wallpaper','사주 미니앱','타로 오라클','에코특공대','AI Companion'];
  function stepGet(){try{var s=localStorage.getItem('dm_step')||'open';return steps[s]?s:'open';}catch(e){return 'open';}}
  function stepSet(s){try{localStorage.setItem('dm_step',s);}catch(e){}}
  /* WAVE89: 시퀀스 간격 칩. 로컬 라벨만 · 예약/발송/텔레그램/메일 0 */
  var DELAYS=[0,1,2,3,5,7];
  function delayGet(){
    try{
      var d=JSON.parse(localStorage.getItem('dm_delay')||'{}');
      function n(k,fb){var v=+d[k]; return DELAYS.indexOf(v)>=0?v:fb;}
      return {open:n('open',0),value:n('value',2),close:n('close',5)};
    }catch(e){return {open:0,value:2,close:5};}
  }
  function delaySet(step,n){
    if(!steps[step]||DELAYS.indexOf(+n)<0) return;
    var d=delayGet(); d[step]=+n;
    try{localStorage.setItem('dm_delay',JSON.stringify(d));}catch(e){}
  }
  /* WAVE97: {이름}{훅}{CTA} 슬롯. 로컬 치환만 · 예약/발송/TG/메일 0 */
  function slotsGet(){
    try{
      var s=JSON.parse(localStorage.getItem('dm_slots')||'{}');
      return {
        name:String(s.name!=null?s.name:(localStorage.getItem('dm_who')||'')),
        hook:String(s.hook!=null?s.hook:''),
        cta:String(s.cta!=null?s.cta:'')
      };
    }catch(e){return {name:'',hook:'',cta:''};}
  }
  function slotsSet(s){
    try{localStorage.setItem('dm_slots',JSON.stringify({name:s.name||'',hook:s.hook||'',cta:s.cta||''}));}catch(e){}
  }
  function fillSlots(text,s,p){
    var name=(s&&s.name)||'님';
    var hook=(s&&s.hook)||p||'우리 서비스';
    var cta=(s&&s.cta)||'';
    return String(text||'')
      .replace(/\{이름\}/g,name)
      .replace(/\{훅\}/g,hook)
      .replace(/\s*\{CTA\}/g,cta?('\n'+cta):'')
      .replace(/\n{3,}/g,'\n\n')
      .replace(/[ \t]+\n/g,'\n')
      .trim();
  }
  function dayKey(off){var d=new Date();d.setDate(d.getDate()+(off||0));return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
  function fomoLeft(){var e=new Date();e.setHours(24,0,0,0);var ms=Math.max(0,e-Date.now());return Math.floor(ms/3600000)+'h '+Math.floor((ms%3600000)/60000)+'m';}
  function hist(){try{return JSON.parse(localStorage.getItem('dm_hist')||'[]');}catch(e){return[];}}
  function saveHist(h){try{localStorage.setItem('dm_hist',JSON.stringify(h.slice(0,20)));}catch(e){}}
  function bumpStreak(){
    try{
      var st=JSON.parse(localStorage.getItem('dm_streak')||'{}');
      var t=dayKey(0); if(st.last===t) return st.count||0;
      st.count=(st.last===dayKey(-1))?(st.count||0)+1:1; st.last=t;
      localStorage.setItem('dm_streak',JSON.stringify(st)); return st.count;
    }catch(e){return 0;}
  }
  function todayN(){try{return +(localStorage.getItem('dm_day_'+dayKey(0))||0);}catch(e){return 0;}}
  function bumpToday(){try{localStorage.setItem('dm_day_'+dayKey(0),String(todayN()+1));}catch(e){}}
  function copyN(){try{return +(localStorage.getItem('dm_copy')||0);}catch(e){return 0;}}
  function sentN(){try{return +(localStorage.getItem('dm_sent_'+dayKey(0))||0);}catch(e){return 0;}}
  function nextToneKey(cur){var keys=Object.keys(tones);var i=keys.indexOf(cur);return keys[(i<0?0:i+1)%keys.length];}
  function build(p,w,t,step){
    step=step||stepGet();
    if(step==='value'){
      if(t==='short') return '{이름}, {훅} 핵심은 시간 절약 하나예요. 첫 주에 체감 포인트만 짧게 드릴게요. {CTA}';
      if(t==='pro') return '{이름}님, {훅}로 비슷한 팀이 줄인 건 (1)초안 시간 (2)팔로업 누락입니다. 프로세스만 공유드릴 수 있어요. {CTA}';
      if(t==='urgent') return '{이름}, 오늘 열어둔 자리에서 {훅} 가치만 3줄로 전달드릴게요. 필요 없으면 패스하시면 됩니다. {CTA}';
      return '{이름}! {훅} 써보신 분들이 공통으로 말한 건 "첫 초안이 빨라졌다"예요. 링크는 원하시면 드릴게요. {CTA}';
    }
    if(step==='close'){
      if(t==='short') return '{이름}, {훅} 관심 있으면 답 한 줄만 주세요. 없으면 여기서 접을게요. {CTA}';
      if(t==='pro') return '{이름}님, {훅} 15분 콜 가능하신 요일 하나만 알려주실 수 있을까요? 아니면 자료만 보내드릴게요. {CTA}';
      if(t==='urgent') return '{이름}, 오늘 자리 마감 전에 회신 주시면 바로 연결합니다. 아니면 다음에 볼게요. {CTA}';
      return '{이름}! 편하게 이모지 하나만 남겨주셔도 돼요. {훅} 링크 바로 드릴게요. {CTA}';
    }
    if(t==='short') return '안녕하세요 {이름}, {훅} 60초만 봐주실 수 있을까요? 가치 없으면 바로 접을게요. {CTA}';
    if(t==='pro') return '안녕하세요 {이름},\n\n{훅} 관련해 간단히 제안 드립니다. 비슷한 분들이 첫 주에 체감한 포인트는 (1)시간 절약 (2)전환입니다. 15분 콜 가능 시간이 있으실까요? {CTA}';
    if(t==='urgent') return '안녕하세요 {이름}, 오늘까지만 열어둔 자리 있어서 짧게 연락드려요. {훅} 관심 있으시면 바로 연결해드릴게요. {CTA}';
    return '안녕하세요 {이름}! 평소 콘텐츠/업무 보면서 응원했어요. {훅} 한번 써보시면 딱일 것 같아서 슬쩍 공유드려요 🙂 관심 있으시면 링크 바로 드릴게요! {CTA}';
  }
  function render(msg){
    var sc=0; try{sc=(JSON.parse(localStorage.getItem('dm_streak')||'{}').count)||0;}catch(e){}
    var h=hist();
    var lastP=localStorage.getItem('dm_prod')||'';
    var lastW=localStorage.getItem('dm_who')||'';
    var lastT=localStorage.getItem('dm_tone')||'friendly';
    var sl=slotsGet();
    if(!lastW&&sl.name) lastW=sl.name;
    var curStep=stepGet();
    var dels=delayGet();
    root.innerHTML='<div class="card"><div class="sub">톤 4종 · 시퀀스 3장 · D+'+dels[curStep]+' · 오늘 '+todayN()+'초안 · 복사 '+copyN()+' · 보냄✓ '+sentN()+' · 🔥'+sc+'일 · 이력 '+h.length+' · 창 '+fomoLeft()+'</div>'
      +'<div class="row" style="flex-wrap:wrap;gap:6px;margin-bottom:8px">'+presets.map(function(p){return '<button class="sec" data-pre="'+p+'" style="padding:6px 8px;font-size:12px">'+p+'</button>';}).join('')+'</div>'
      +'<input id="prod" placeholder="예: Mac Wallpaper / 사주 미니앱" value="'+lastP.replace(/"/g,'&quot;')+'"/>'
      +'<input id="who" placeholder="{이름} 상대 (크리에이터, 사장님…)" value="'+String(lastW||sl.name||'').replace(/"/g,'&quot;')+'"/>'
      +'<div class="sub" style="margin:8px 0 4px">변수슬롯 {이름}{훅}{CTA} · 초안 치환만 · 발송 없음</div>'
      +'<input id="slotHook" placeholder="{훅} 한 줄 (비우면 상품명)" value="'+String(sl.hook||'').replace(/"/g,'&quot;')+'"/>'
      +'<input id="slotCta" placeholder="{CTA} 마지막 한 줄 (선택)" value="'+String(sl.cta||'').replace(/"/g,'&quot;')+'"/>'
      +'<div class="sub">톤</div><select id="tone">'
      +Object.keys(tones).map(function(k){return '<option value="'+k+'"'+(k===lastT?' selected':'')+'>'+tones[k]+'</option>';}).join('')
      +'</select>'
      +'<div class="sub">시퀀스 3장 · 간격만 · 발송/스케줄 없음</div>'
      +'<div class="row" id="seqTabs" style="margin:4px 0 8px">'
      +Object.keys(steps).map(function(k,idx){
        return '<button class="'+(k===curStep?'':'sec')+'" data-step="'+k+'" style="flex:1">'+(idx+1)+' '+steps[k]+' · D+'+dels[k]+'</button>';
      }).join('')
      +'</div>'
      +'<div class="row" id="delayChips" style="margin:0 0 8px;gap:4px">'
      +DELAYS.map(function(n){
        var on=dels[curStep]===n;
        return '<button type="button" class="sec" data-delay="'+n+'" style="padding:4px 8px;font-size:11px;border-radius:999px'+(on?';border-color:#e0b552;color:#e0b552':'')+'">D+'+n+'</button>';
      }).join('')
      +'<span class="sub" style="margin:0">이 장 간격 · 예약 없음</span></div>'
      +'<div class="row" style="margin-top:8px;gap:6px"><button id="go">DM 초안</button><button class="sec" id="allTones">4톤 한 번에</button></div>'
      +(msg?'<p class="sub" id="delayHint" style="margin:8px 0 0">이 장 '+steps[curStep]+' · D+'+dels[curStep]+' · 예약/발송 없음</p>':'')
      +'<div id="out" class="card" style="margin-top:10px;'+(msg?'':'display:none')+'">'+(msg||'').replace(/</g,'&lt;')+'</div>'
      +'<div class="row" id="draftCtas" style="margin-top:8px;'+(msg?'':'display:none')+'">'
      +'<button id="copyBtn" style="flex:1">복사</button>'
      +'<button class="sec" id="nextTone" style="flex:1">다음 톤</button>'
      +'<button class="sec" id="markSent" style="flex:1">보냄 ✓</button></div>'
      +'<p class="sub" style="margin-top:6px;'+(msg?'':'display:none')+'">실채널 연결 없음 · 콜드 대량발송 금지 · 로컬 연습</p></div>'
      +(h.length?'<div class="card"><b>최근 초안</b><div id="hist" class="sub" style="margin-top:6px"></div></div>':'')
      +'<div id="moneyPipe" style="margin-top:12px;padding:10px;border:1px solid #c5a46e44;border-radius:12px;background:#16121c;text-align:center;font-size:12px">'
      +'<div style="color:#e0b552;font-weight:700;margin-bottom:4px">💎 후원 · 파이프</div>'
      +'<a style="color:#ece8f1;margin:0 6px" href="https://hosuman08-netizen.github.io/influencer-ops/?utm_source=dm&utm_medium=pipe">📣 Influencer Ops</a>'
      +'<a style="color:#e0b552;margin:0 6px" href="https://hosuman08-netizen.github.io/legion-hub/?utm_source=dm&utm_medium=pipe">🎮 Arcade</a></div>';
    Array.prototype.forEach.call(document.querySelectorAll('[data-pre]'),function(b){
      b.onclick=function(){document.getElementById('prod').value=b.getAttribute('data-pre');};
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-step]'),function(b){
      b.onclick=function(){ stepSet(b.getAttribute('data-step')); render(msg||''); };
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-delay]'),function(b){
      b.onclick=function(){ delaySet(curStep,+b.getAttribute('data-delay')); render(msg||''); };
    });
    function persistSlotsNow(){
      var whoEl=document.getElementById('who');
      var hookEl=document.getElementById('slotHook');
      var ctaEl=document.getElementById('slotCta');
      slotsSet({name:(whoEl&&whoEl.value)||'',hook:(hookEl&&hookEl.value)||'',cta:(ctaEl&&ctaEl.value)||''});
    }
    ['who','slotHook','slotCta'].forEach(function(id){
      var el=document.getElementById(id);
      if(el) el.onchange=persistSlotsNow;
    });
    if(h.length){
      document.getElementById('hist').innerHTML=h.slice(0,6).map(function(x,i){
        return '<div style="padding:6px 0;border-bottom:1px solid #2a2438;display:flex;justify-content:space-between;gap:8px">'
          +'<span data-i="'+i+'" style="cursor:pointer;flex:1">['+(tones[x.tone]||x.tone)+'] '+(x.prod||'').slice(0,24)+'</span>'
          +'<button class="sec" data-del="'+i+'" style="padding:4px 8px;font-size:11px">삭제</button></div>';
      }).join('');
      Array.prototype.forEach.call(document.querySelectorAll('[data-i]'),function(el){
        el.onclick=function(){ var x=h[+el.getAttribute('data-i')]; if(x) render(x.msg); };
      });
      Array.prototype.forEach.call(document.querySelectorAll('[data-del]'),function(el){
        el.onclick=function(){ var hh=hist(); hh.splice(+el.getAttribute('data-del'),1); saveHist(hh); render(msg||''); };
      });
    }
    function readSlots(){
      var p=document.getElementById('prod').value||'우리 서비스';
      var w=document.getElementById('who').value||'님';
      var hookEl=document.getElementById('slotHook');
      var ctaEl=document.getElementById('slotCta');
      var s={name:w,hook:(hookEl&&hookEl.value)||'',cta:(ctaEl&&ctaEl.value)||''};
      slotsSet(s);
      try{localStorage.setItem('dm_prod',p);localStorage.setItem('dm_who',w);}catch(e){}
      return {p:p,s:s};
    }
    function genOne(t){
      var r=readSlots();
      try{localStorage.setItem('dm_tone',t);}catch(e){}
      var m=fillSlots(build(r.p,r.s.name,t,stepGet()),r.s,r.p);
      var hh=hist(); hh.unshift({prod:r.p,who:r.s.name,tone:t,msg:m,ts:Date.now()}); saveHist(hh);
      bumpToday(); return m;
    }
    document.getElementById('go').onclick=function(){
      var t=document.getElementById('tone').value;
      var m=genOne(t); bumpStreak(); render(m);
      try{legionTrack('activate',{tone:t})}catch(e){}
    };
    document.getElementById('allTones').onclick=function(){
      var parts=[];
      Object.keys(tones).forEach(function(t){ parts.push('['+tones[t]+']\n'+genOne(t)); });
      bumpStreak();
      var m=parts.join('\n\n---\n\n');
      render(m);
      try{legionTrack('activate',{allTones:1})}catch(e){}
    };
    var cb=document.getElementById('copyBtn');
    if(cb) cb.onclick=function(){
      var m=document.getElementById('out').textContent||'';
      if(navigator.clipboard)navigator.clipboard.writeText(m);
      try{localStorage.setItem('dm_copy',String(copyN()+1));}catch(e){}
      cb.textContent='복사됨 ✓'; setTimeout(function(){cb.textContent='복사';},1000);
      try{legionTrack('share_peak',{})}catch(e){}
    };
    var nt=document.getElementById('nextTone');
    if(nt) nt.onclick=function(){
      var nxt=nextToneKey(document.getElementById('tone').value||lastT);
      document.getElementById('tone').value=nxt;
      var m=genOne(nxt); bumpStreak(); render(m);
      try{legionTrack('activate',{tone:nxt,next:1})}catch(e){}
    };
    var ms=document.getElementById('markSent');
    if(ms) ms.onclick=function(){
      try{localStorage.setItem('dm_sent_'+dayKey(0),String(sentN()+1));}catch(e){}
      ms.textContent='보냄 ✓';
      ms.style.background='#166534';
      ms.style.color='#bbf7d0';
      try{legionTrack('checklist_sent',{local:1})}catch(e){}
    };
  }
  try{legionTrack('session_start',{})}catch(e){}
  render('');
})();
