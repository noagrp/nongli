class NongliCalendar{
  constructor(engine){
    this.engine=engine;
  }
  fromDate(date=new Date()){
    if(typeof Solar==="undefined")throw new Error("lunar.js not loaded");
    const solar=Solar.fromDate(date);
    const lunar=solar.getLunar();
    const month=lunar.getMonth();
    const day=lunar.getDay();
    const isLeap=month<0;
    const monthNumber=Math.abs(month);
    const eightChar=lunar.getEightChar?lunar.getEightChar():null;
    const prevJq=lunar.getPrevJieQi?lunar.getPrevJieQi():null;
    const nextJq=lunar.getNextJieQi?lunar.getNextJieQi():null;
    return {
      solarDate:date,
      lunar,
      year:lunar.getYear(),
      yearChinese:lunar.getYearInChinese?lunar.getYearInChinese():"",
      month:monthNumber,
      monthName:lunar.getMonthInChinese?lunar.getMonthInChinese():(this.engine.getMonth(monthNumber)?.name||""),
      day,
      dayName:lunar.getDayInChinese?lunar.getDayInChinese():this.engine.getDayName(day),
      isLeapMonth:isLeap,
      display:(isLeap?"闰":"")+(lunar.getMonthInChinese?lunar.getMonthInChinese():(this.engine.getMonth(monthNumber)?.name||monthNumber+"月"))+"月"+(lunar.getDayInChinese?lunar.getDayInChinese():this.engine.getDayName(day)),
      ganZhiYear:lunar.getYearInGanZhi?lunar.getYearInGanZhi():"",
      zodiac:lunar.getYearShengXiao?lunar.getYearShengXiao():"",
      prevJieQi:prevJq?prevJq.getName():null,
      nextJieQi:nextJq?nextJq.getName():null,
      eightChar:eightChar?{
        year:eightChar.getYear(),month:eightChar.getMonth(),day:eightChar.getDay(),time:eightChar.getTime()
      }:null
    };
  }
  monthDays(lunarYear,month){
    if(typeof LunarYear==="undefined")return null;
    const y=LunarYear.fromYear(Number(lunarYear));
    const m=y.getMonths().find(x=>x.getMonth()===Number(month));
    return m?m.getDayCount():null;
  }
  leapMonth(lunarYear){
    if(typeof LunarYear==="undefined")return null;
    const y=LunarYear.fromYear(Number(lunarYear));
    const lm=y.getLeapMonth?y.getLeapMonth():0;
    return lm||0;
  }
  yearMonths(lunarYear){
    if(typeof LunarYear==="undefined")return[];
    const y=LunarYear.fromYear(Number(lunarYear));
    return y.getMonths().filter(m=>m.getYear()===Number(lunarYear)).map(m=>({
      month:m.getMonth(),isLeap:m.getMonth()<0,monthNumber:Math.abs(m.getMonth()),
      days:m.getDayCount(),firstJulianDay:m.getFirstJulianDay?m.getFirstJulianDay():null
    }));
  }
}
if(typeof window!=="undefined")window.NongliCalendar=NongliCalendar;
if(typeof module!=="undefined"&&module.exports)module.exports={NongliCalendar};