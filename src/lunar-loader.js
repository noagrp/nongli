(function(){
  if (typeof window === "undefined") return;
  if (typeof window.Solar !== "undefined") {
    window.dispatchEvent(new CustomEvent("nongli:lunar-ready",{detail:{source:"existing"}}));
    return;
  }

  const CDN="https://cdn.jsdelivr.net/npm/lunar-javascript@1.7.7/lunar.js";
  const LOCAL="./vendor/lunar.js";

  function load(src,source,fallback){
    const s=document.createElement("script");
    s.src=src;
    s.async=false;
    s.onload=()=>{
      if(typeof window.Solar!=="undefined"){
        window.dispatchEvent(new CustomEvent("nongli:lunar-ready",{detail:{source}}));
      }else if(fallback){
        fallback();
      }else{
        window.dispatchEvent(new CustomEvent("nongli:lunar-error"));
      }
    };
    s.onerror=()=>fallback?fallback():window.dispatchEvent(new CustomEvent("nongli:lunar-error"));
    document.head.appendChild(s);
  }

  load(CDN,"cdn",()=>load(LOCAL,"vendor"));
})();