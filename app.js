
(function(){
  var root=document.getElementById('app');
  root.innerHTML='<div class="card"><input id="prod" placeholder="예: Mac Wallpaper / 사주 미니앱"/><input id="who" placeholder="상대 (크리에이터, 사장님…)"/><div class="sub">톤 4종</div><select id="tone"><option value="friendly">친근</option><option value="pro">프로</option><option value="short">짧고 세게</option><option value="urgent">마감 FOMO</option></select><button id="go">DM 초안</button><div id="out" class="card" style="margin-top:10px;display:none"></div></div>';
  document.getElementById('go').onclick=function(){
    var p=document.getElementById('prod').value||'우리 서비스', w=document.getElementById('who').value||'님', t=document.getElementById('tone').value;
    var msg='';
    if(t==='short') msg='안녕하세요 '+w+', '+p+' 60초만 봐주실 수 있을까요? 가치 없으면 바로 접을게요.';
    else if(t==='pro') msg='안녕하세요 '+w+',\\n\\n'+p+' 관련해 간단히 제안 드립니다. 비슷한 분들이 첫 주에 체감한 포인트는 (1)시간 절약 (2)전환입니다. 15분 콜 가능 시간이 있으실까요?';
    else if(t==='urgent') msg='안녕하세요 '+w+', 오늘까지만 열어둔 자리 있어서 짧게 연락드려요. '+p+' 관심 있으시면 바로 연결해드릴게요.';
    else msg='안녕하세요 '+w+'! 평소 콘텐츠/업무 보면서 응원했어요. '+p+' 한번 써보시면 딱일 것 같아서 슬쩍 공유드려요 🙂 관심 있으시면 링크 바로 드릴게요!';
    var o=document.getElementById('out'); o.style.display='block'; o.textContent=msg;
    if(!document.getElementById('copyBtn')){
      var b=document.createElement('button'); b.id='copyBtn'; b.textContent='복사'; b.style.marginTop='8px';
      b.onclick=function(){if(navigator.clipboard)navigator.clipboard.writeText(msg); try{legionTrack('share_peak',{})}catch(e){}};
      o.parentNode.appendChild(b);
    }
    try{legionTrack('activate',{tone:t})}catch(e){}
  };
  try{legionTrack('session_start',{})}catch(e){}
})();
