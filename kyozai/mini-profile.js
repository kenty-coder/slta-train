// 小さなSLTAプロフィール図を描く（作成：KENTA SHINKAWA）
// 使い方：<svg class="mini" data-profile="100,90,...(26個の正答率%。まんがの説明No.8・21は(段階−1)÷5×100、未実施は空)"></svg>
(function(){
  const NAMES=["単語の理解","短文の理解","口頭命令に従う","仮名の理解","呼称","単語の復唱","動作説明","まんがの説明","文の復唱","語の列挙","漢字・単語の音読","仮名1文字の音読","仮名・単語の音読","短文の音読","漢字・単語の理解","仮名・単語の理解","短文の理解","書字命令に従う","漢字・単語の書字","仮名・単語の書字","まんがの説明","仮名1文字の書取","漢字・単語の書取","仮名・単語の書取","短文の書取","計算"];
  const G=[["聴く",0,3],["話す",4,13],["読む",14,17],["書く",18,24],["計算",25,25]];
  function draw(svg){
    const v=svg.dataset.profile.split(",").map(s=>s.trim()===""?null:+s);
    const W=700,H=250,L=34,R=8,T=22,B=92,cw=(W-L-R)/26;
    const x=i=>L+cw*(i+.5), y=p=>T+(H-T-B)*(1-p/100);
    let s="";
    G.forEach(([g,a,b],k)=>{const x0=L+cw*a,x1=L+cw*(b+1);
      s+=`<rect x="${x0}" y="${T}" width="${x1-x0}" height="${H-T-B}" fill="${k%2?'#f1f1f1':'#fafafa'}" stroke="#999" stroke-width=".6"/>`;
      s+=`<text x="${(x0+x1)/2}" y="${T-7}" font-size="11" font-weight="700" text-anchor="middle" fill="#222">${g}</text>`;});
    for(let p=0;p<=100;p+=20){s+=`<line x1="${L}" x2="${W-R}" y1="${y(p)}" y2="${y(p)}" stroke="#ccc" stroke-width=".6"/><text x="${L-4}" y="${y(p)+3.5}" font-size="9" text-anchor="end" fill="#555">${p}</text>`;}
    NAMES.forEach((n,i)=>{s+=`<text x="${x(i)}" y="${H-B+11}" font-size="8.5" text-anchor="middle" fill="#555">${i+1}</text><text transform="translate(${x(i)+3},${H-B+16}) rotate(90)" font-size="8" fill="#333">${n}</text>`;});
    const pts=v.map((p,i)=>p===null?null:`${x(i)},${y(Math.max(0,Math.min(100,p)))}`).filter(Boolean);
    s+=`<polyline points="${pts.join(" ")}" fill="none" stroke="#1f3b8a" stroke-width="2"/>`;
    v.forEach((p,i)=>{ if(p!==null) s+=`<circle cx="${x(i)}" cy="${y(Math.max(0,Math.min(100,p)))}" r="3.2" fill="#1f3b8a"/>`; });
    svg.setAttribute("viewBox",`0 0 ${W} ${H}`); svg.setAttribute("xmlns","http://www.w3.org/2000/svg");
    svg.innerHTML=s;
  }
  document.querySelectorAll("svg[data-profile]").forEach(draw);
})();
