class NongliEngine{
  constructor(data){
    this.data=data;
    this.months=[...(data.months||[])];
    this.terms=[...(data.terminology||[])];
    this.backbone=[...(data.backbone||[])];
    this.festivals=[...(data.festivals||[])];
  }
  getMeta(){return this.data.meta;}
  getMonth(n){return this.months.find(x=>x.number===Number(n))||null;}
  getDayName(day){
    const d=Number(day);
    if(!Number.isInteger(d)||d<1||d>30)return null;
    const nums=["一","二","三","四","五","六","七","八","九","十"];
    if(d<=10)return "初"+nums[d-1];
    if(d<20)return "十"+nums[d-11];
    if(d===20)return "二十";
    if(d<30)return "廿"+nums[d-21];
    return "三十";
  }
  formatLunarDate(month,day,isLeap=false){
    const m=this.getMonth(month);
    return (isLeap?"闰":"")+(m?m.name:String(month)+"月")+this.getDayName(day);
  }
  search(q){
    const s=String(q||"").trim().toLowerCase();if(!s)return[];
    const buckets=[
      ...(this.data.backbone||[]),...(this.data.months||[]),...(this.data.moonPhases||[]),
      ...(this.data.festivals||[]),...(this.data.terminology||[]),...(this.data.comparisons||[])
    ];
    return buckets.filter(x=>JSON.stringify(x).toLowerCase().includes(s));
  }
}
async function loadNongliEngine(url="./data/nongli.json"){
  const r=await fetch(url,{cache:"no-cache"});
  if(!r.ok)throw new Error("Unable to load 农历 data");
  return new NongliEngine(await r.json());
}
if(typeof window!=="undefined"){window.NongliEngine=NongliEngine;window.loadNongliEngine=loadNongliEngine;}
if(typeof module!=="undefined"&&module.exports)module.exports={NongliEngine,loadNongliEngine};