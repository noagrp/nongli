class NongliCalendar{
  constructor(engine){this.engine=engine;}
  fromDate(date=new Date()){
    if(typeof Solar==="undefined")throw new Error("lunar.js not loaded");
    const solar=Solar.fromDate(date),lunar=solar.getLunar();
    const month=lunar.getMonth(),day=lunar.getDay(),isLeap=month<0,monthNumber=Math.abs(month);
    const eightChar=lunar.getEightChar?lunar.getEightChar():null;
    const prevJq=lunar.getPrevJieQi?lunar.getPrevJieQi():null;
    const nextJq=lunar.getNextJieQi?lunar.getNextJieQi():null;
    return{
      solarDate:date,lunar,year:lunar.getYear(),yearChinese:lunar.getYearInChinese?lunar.getYearInChinese():"",
      month:monthNumber,monthRaw:month,
      monthName:lunar.getMonthInChinese?lunar.getMonthInChinese():(this.engine.getMonth(monthNumber)?.name||""),
      day,dayName:lunar.getDayInChinese?lunar.getDayInChinese():this.engine.getDayName(day),
      isLeapMonth:isLeap,
      display:(isLeap?"闰":"")+(lunar.getMonthInChinese?lunar.getMonthInChinese():(this.engine.getMonth(monthNumber)?.name||monthNumber+"月"))+"月"+(lunar.getDayInChinese?lunar.getDayInChinese():this.engine.getDayName(day)),
      ganZhiYear:lunar.getYearInGanZhi?lunar.getYearInGanZhi():"",
      zodiac:lunar.getYearShengXiao?lunar.getYearShengXiao():"",
      prevJieQi:prevJq?prevJq.getName():null,nextJieQi:nextJq?nextJq.getName():null,
      eightChar:eightChar?{year:eightChar.getYear(),month:eightChar.getMonth(),day:eightChar.getDay(),time:eightChar.getTime()}:null
    };
  }
  leapMonth(lunarYear){
    if(typeof LunarYear==="undefined")return 0;
    return LunarYear.fromYear(Number(lunarYear)).getLeapMonth?.()||0;
  }
  _solarText(s){
    return s.getYear()+"-"+String(s.getMonth()).padStart(2,"0")+"-"+String(s.getDay()).padStart(2,"0");
  }
  yearMonths(lunarYear){
    if(typeof LunarYear==="undefined")return[];
    const y=LunarYear.fromYear(Number(lunarYear));
    return y.getMonthsInYear().map(m=>{
      const first=Solar.fromJulianDay(m.getFirstJulianDay());
      const last=Solar.fromJulianDay(m.getFirstJulianDay()+m.getDayCount()-1);
      const lunarAtStart=first.getLunar();
      const qi=lunarAtStart.getNextQi?lunarAtStart.getNextQi(false):null;
      let qiInfo=null;
      if(qi){
        const qs=qi.getSolar(),qjd=qs.getJulianDay();
        const start=m.getFirstJulianDay(),end=start+m.getDayCount();
        if(qjd>=start&&qjd<end){
          qiInfo={name:qi.getName(),solar:this._solarText(qs),julianDay:qjd};
        }
      }
      return{
        month:m.getMonth(),isLeap:m.isLeap(),monthNumber:Math.abs(m.getMonth()),
        days:m.getDayCount(),firstJulianDay:m.getFirstJulianDay(),
        solarStart:this._solarText(first),solarEnd:this._solarText(last),
        containsZhongQi:!!qiInfo,zhongQi:qiInfo
      };
    });
  }
  getMonthInfo(lunarYear,monthRaw){
    return this.yearMonths(lunarYear).find(x=>x.month===Number(monthRaw))||null;
  }
}
if(typeof window!=="undefined")window.NongliCalendar=NongliCalendar;
if(typeof module!=="undefined"&&module.exports)module.exports={NongliCalendar};