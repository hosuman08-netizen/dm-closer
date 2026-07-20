
/* LEGION_WAVE_19_session_counter */
try{if(!sessionStorage.getItem('lw_p27_agentic__session_counter')){sessionStorage.setItem('lw_p27_agentic__session_counter','1');localStorage.setItem('lw_p27_agentic__session_counter',String((+(localStorage.getItem('lw_p27_agentic__session_counter')||0))+1));}}catch(e){}
(function(){
  var root=document.getElementById('app');
  var tones={friendly:'친근',pro:'프로',short:'짧고 세게',urgent:'마감 FOMO'};
  var presets=['Mac Wallpaper','사주 미니앱','타로 오라클','에코특공대','AI Companion'];
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
  function build(p,w,t){
    if(t==='short') return '안녕하세요 '+w+', '+p+' 60초만 봐주실 수 있을까요? 가치 없으면 바로 접을게요.';
    if(t==='pro') return '안녕하세요 '+w+',\n\n'+p+' 관련해 간단히 제안 드립니다. 비슷한 분들이 첫 주에 체감한 포인트는 (1)시간 절약 (2)전환입니다. 15분 콜 가능 시간이 있으실까요?';
    if(t==='urgent') return '안녕하세요 '+w+', 오늘까지만 열어둔 자리 있어서 짧게 연락드려요. '+p+' 관심 있으시면 바로 연결해드릴게요.';
    return '안녕하세요 '+w+'! 평소 콘텐츠/업무 보면서 응원했어요. '+p+' 한번 써보시면 딱일 것 같아서 슬쩍 공유드려요 🙂 관심 있으시면 링크 바로 드릴게요!';
  }
  function render(msg){
    var sc=0; try{sc=(JSON.parse(localStorage.getItem('dm_streak')||'{}').count)||0;}catch(e){}
    var h=hist();
    var lastP=localStorage.getItem('dm_prod')||'';
    var lastW=localStorage.getItem('dm_who')||'';
    var lastT=localStorage.getItem('dm_tone')||'friendly';
    root.innerHTML='<div class="card"><div class="sub">톤 4종 · 오늘 '+todayN()+'초안 · 복사 '+copyN()+' · 🔥'+sc+'일 · 이력 '+h.length+' · 창 '+fomoLeft()+'</div>'
      +'<div class="row" style="flex-wrap:wrap;gap:6px;margin-bottom:8px">'+presets.map(function(p){return '<button class="sec" data-pre="'+p+'" style="padding:6px 8px;font-size:12px">'+p+'</button>';}).join('')+'</div>'
      +'<input id="prod" placeholder="예: Mac Wallpaper / 사주 미니앱" value="'+lastP.replace(/"/g,'&quot;')+'"/>'
      +'<input id="who" placeholder="상대 (크리에이터, 사장님…)" value="'+lastW.replace(/"/g,'&quot;')+'"/>'
      +'<div class="sub">톤</div><select id="tone">'
      +Object.keys(tones).map(function(k){return '<option value="'+k+'"'+(k===lastT?' selected':'')+'>'+tones[k]+'</option>';}).join('')
      +'</select>'
      +'<div class="row" style="margin-top:8px;gap:6px"><button id="go">DM 초안</button><button class="sec" id="allTones">4톤 한 번에</button></div>'
      +'<div id="out" class="card" style="margin-top:10px;'+(msg?'':'display:none')+'">'+(msg||'').replace(/</g,'&lt;')+'</div>'
      +'<button id="copyBtn" style="margin-top:8px;'+(msg?'':'display:none')+'">복사</button></div>'
      +(h.length?'<div class="card"><b>최근 초안</b><div id="hist" class="sub" style="margin-top:6px"></div></div>':'')
      +'<div id="moneyPipe" style="margin-top:12px;padding:10px;border:1px solid #c5a46e44;border-radius:12px;background:#16121c;text-align:center;font-size:12px">'
      +'<div style="color:#e0b552;font-weight:700;margin-bottom:4px">💎 후원 · 파이프</div>'
      +'<a style="color:#ece8f1;margin:0 6px" href="https://hosuman08-netizen.github.io/influencer-ops/?utm_source=dm&utm_medium=pipe">📣 Influencer Ops</a>'
      +'<a style="color:#e0b552;margin:0 6px" href="https://hosuman08-netizen.github.io/legion-hub/?utm_source=dm&utm_medium=pipe">🎮 Arcade</a></div>';
    Array.prototype.forEach.call(document.querySelectorAll('[data-pre]'),function(b){
      b.onclick=function(){document.getElementById('prod').value=b.getAttribute('data-pre');};
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
    function genOne(t){
      var p=document.getElementById('prod').value||'우리 서비스';
      var w=document.getElementById('who').value||'님';
      try{localStorage.setItem('dm_prod',p);localStorage.setItem('dm_who',w);localStorage.setItem('dm_tone',t);}catch(e){}
      var m=build(p,w,t);
      var hh=hist(); hh.unshift({prod:p,who:w,tone:t,msg:m,ts:Date.now()}); saveHist(hh);
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
  }
  try{legionTrack('session_start',{})}catch(e){}
  render('');
})();
