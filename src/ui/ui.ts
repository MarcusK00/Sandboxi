export function createUI(onMaterialSelect: (id: string) => void) {
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  document.body.style.background = "black";

  const ui = document.createElement("div");
  ui.innerHTML = `
    <div style="
      position: fixed; top: 16px; right: 16px;
      font-family: monospace; font-size: 18px;
      user-select: none; opacity: 0.6; color: rgb(202, 202, 202);
    ">[R] reset</div>
    <div style="
      position: fixed; top: 16px; left: 16px;
      font-family: monospace; font-size: 18px;
      user-select: none; display: flex; flex-direction: column; gap: 4px;
    ">
      <div id="material-sand"  style="cursor:pointer; color: rgb(216, 192, 106)">Sand</div>
      <div id="material-stone" style="cursor:pointer; color: rgb(153, 153, 153)">Stone</div>
      <div id="material-water" style="cursor:pointer; color: rgb(99, 99, 255)">Water</div>
      <div id="material-glitch" style="cursor:pointer; color: rgb(222, 17, 139)">Glitch</div>
        <div id="material-electric" style="cursor:pointer; color: rgb(255, 255, 80)">Electric</div>
    </div>
  `;
  document.body.appendChild(ui);

  let selected = "material-sand";
  const select = (id: string) => {
    document.getElementById(selected)!.style.fontWeight = "normal";
    selected = `material-${id}`;
    document.getElementById(selected)!.style.fontWeight = "bold";
  };

  document.getElementById("material-sand")!.addEventListener("click", () => {
    onMaterialSelect("sand"); select("sand");
  });
  document.getElementById("material-stone")!.addEventListener("click", () => {
    onMaterialSelect("stone"); select("stone");
  });
    document.getElementById("material-water")!.addEventListener("click", () => {
    onMaterialSelect("water"); select("water");
  });
      document.getElementById("material-glitch")!.addEventListener("click", () => {
    onMaterialSelect("glitch"); select("glitch");
  });
        document.getElementById("material-electric")!.addEventListener("click", () => {
    onMaterialSelect("electric"); select("electric");
  });
}