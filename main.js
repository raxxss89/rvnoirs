(function(){
  const root = document.documentElement;
  const rig = document.getElementById("rig");
  const device = document.getElementById("device");
  const stage = document.getElementById("stage");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. Mirror: clone the device, flip it with CSS, fade it with a mask */
  const mirror = document.createElement("div");
  mirror.className = "mirror";
  mirror.setAttribute("aria-hidden", "true");
  mirror.appendChild(device.cloneNode(true));
  mirror.querySelector(".device").removeAttribute("id");
  rig.appendChild(mirror);

  /* 2. Live clock on the screen (and its reflection) */
  function updateClock(){
    const d = new Date();
    const time = d.toLocaleTimeString([], {hour:"numeric", minute:"2-digit"}).replace(/\s?(AM|PM)/i, "");
    const day = d.toLocaleDateString([], {weekday:"long", month:"long", day:"numeric"});
    document.querySelectorAll(".clock .t").forEach(el => el.textContent = time);
    document.querySelectorAll(".clock .d").forEach(el => el.textContent = day);
  }
  updateClock(); setInterval(updateClock, 10000);

  /* 3. Tilt + moving specular highlight, driven by pointer (mouse or touch drag) */
  const hero = document.querySelector(".hero");
  function move(e){
    if(reduce) return;
    const r = hero.getBoundingClientRect();
    const x = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1);
    const y = Math.min(Math.max((e.clientY - r.top) / r.height, 0), 1);
    root.style.setProperty("--ry", ((x - .5) * 24) + "deg");
    root.style.setProperty("--sx", (x * 100) + "%");
    root.style.setProperty("--sy", (y * 70) + "%");
  }
  function rest(){
    root.style.setProperty("--ry", "0deg");
    root.style.setProperty("--sx", "30%");
    root.style.setProperty("--sy", "20%");
  }
  hero.addEventListener("pointermove", move);
  hero.addEventListener("pointerleave", rest);

  /* 4. Finishes: change the metal colors (edit or add your own) */
  const FINISHES = {
    natural:{name:"Natural titanium", f1:"#8c8a85", f2:"#dcd9d2", f3:"#6f6d68"},
    black:  {name:"Black titanium",   f1:"#2b2b2e", f2:"#6a6a70", f3:"#1b1b1d"},
    sand:   {name:"Desert titanium",  f1:"#a88c70", f2:"#ecd9c0", f3:"#8e7660"},
    blue:   {name:"Blue titanium",    f1:"#4a5a6e", f2:"#a9b9cf", f3:"#34414f"}
  };
  const label = document.getElementById("finishName");
  document.querySelectorAll(".sw").forEach(btn => {
    btn.addEventListener("click", () => {
      const f = FINISHES[btn.dataset.finish];
      root.style.setProperty("--f1", f.f1);
      root.style.setProperty("--f2", f.f2);
      root.style.setProperty("--f3", f.f3);
      label.textContent = f.name;
      document.querySelectorAll(".sw").forEach(b => b.setAttribute("aria-pressed", b === btn));
    });
  });
})();
