const tiers = { standard: 13000, comfort: 18000, plus: 25000 };
const labels = { standard: 'СТАНДАРТ', comfort: 'КОМФОРТ', plus: 'КОМФОРТ+', custom: 'СВОЙ ПАКЕТ' };

const materials = {
  wall: [
    {id:'wall-standard', tier:'standard', name:'Simple Rovno, бежевые', price:'Ориентир: 890 ₽/рул.', link:'https://krasnodar.lemanapro.ru/product/oboi-flizelinovye-simple-rovno-bezhevye-106-m-sp31233-21a-89411624/', thumb:'assets/wall-standard.webp'},
    {id:'wall-comfort', tier:'comfort', name:'Erismann Samui, светло-бежевые', price:'Ориентир: 1 850 ₽/рул.', link:'https://krasnodar.lemanapro.ru/product/oboi-flizelinovye-erismann-samui-svetlo-bezhevye-106-m-er60868-03-89405520/', thumb:'assets/wall-comfort.webp'},
    {id:'wall-plus', tier:'plus', name:'Victoria Stenova Одиссей', price:'Ориентир: 2 490 ₽/рул.', link:'https://krasnodar.lemanapro.ru/product/oboi-flizelinovye-victoria-stenova-odissey-serye-106-m-vs287577-89374621/', thumb:'assets/wall-plus.webp'}
  ],
  floor: [
    {id:'floor-standard', tier:'standard', name:'KREAFORTA Лоо, 33 кл.', price:'Ориентир: 688 ₽/м²', link:'https://krasnodar.lemanapro.ru/search/?q=KREAFORTA%20%D0%9B%D0%BE%D0%BE%2033%20%D0%BA%D0%BB%D0%B0%D1%81%D1%81', thumb:'assets/floor-standard.webp'},
    {id:'floor-comfort', tier:'comfort', name:'Травертин Латте, 33 кл.', price:'Ориентир: 1 070 ₽/м²', link:'https://krasnodar.lemanapro.ru/search/?q=%D0%A2%D1%80%D0%B0%D0%B2%D0%B5%D1%80%D1%82%D0%B8%D0%BD%20%D0%9B%D0%B0%D1%82%D1%82%D0%B5%2033%20%D0%BA%D0%BB%D0%B0%D1%81%D1%81', thumb:'assets/floor-comfort.webp'},
    {id:'floor-plus', tier:'plus', name:'Дуб Катунь, влагостойкий', price:'Ориентир: 1 398 ₽/м²', link:'https://krasnodar.lemanapro.ru/product/laminat-dub-katun-vodostoykost-24-chasa-33-klass-tolshchina-8-mm-s-faskoy-1596-m-84868455/', thumb:'assets/floor-plus.webp'}
  ],
  tile: [
    {id:'tile-standard', tier:'standard', name:'Gracia Ceramica Флейм', price:'Ориентир: 1 226 ₽/м²', link:'https://krasnodar.lemanapro.ru/search/?q=Gracia%20Ceramica%20%D0%A4%D0%BB%D0%B5%D0%B9%D0%BC%2060x60', thumb:'assets/tile-standard.webp'},
    {id:'tile-comfort', tier:'comfort', name:'Arcadia Desert Crema', price:'Ориентир: 2 167 ₽/м²', link:'https://krasnodar.lemanapro.ru/search/?q=Arcadia%20Desert%20Crema%2060x60', thumb:'assets/tile-comfort.webp'},
    {id:'tile-plus', tier:'plus', name:'Novin Ceram Blestone', price:'Ориентир: 3 200 ₽/м²', link:'https://krasnodar.lemanapro.ru/search/?q=Novin%20Ceram%20Blestone%2060x60', thumb:'assets/tile-plus.webp'}
  ],
  door: [
    {id:'door-standard', tier:'standard', name:'Белая глухая, 80×200', price:'Ориентир: 2 596 ₽/шт.', link:'https://krasnodar.lemanapro.ru/search/?q=%D0%B4%D0%B2%D0%B5%D1%80%D1%8C%20%D0%BC%D0%B5%D0%B6%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%BD%D0%B0%D1%8F%20%D0%B3%D0%BB%D1%83%D1%85%D0%B0%D1%8F%20%D0%B1%D0%B5%D0%BB%D0%B0%D1%8F%2080x200', thumb:'assets/door-standard.webp'},
    {id:'door-comfort', tier:'comfort', name:'Борно 56, ПЭТ', price:'Ориентир: 7 780 ₽/шт.', link:'https://krasnodar.lemanapro.ru/search/?q=%D0%91%D0%BE%D1%80%D0%BD%D0%BE%2056%2080x200%20%D0%9F%D0%AD%D0%A2%20%D0%B1%D0%B5%D0%BB%D0%B0%D1%8F', thumb:'assets/door-comfort.webp'},
    {id:'door-plus', tier:'plus', name:'Австралия, белая эмаль', price:'Ориентир: 9 954 ₽/шт.', link:'https://krasnodar.lemanapro.ru/search/?q=%D0%90%D0%B2%D1%81%D1%82%D1%80%D0%B0%D0%BB%D0%B8%D1%8F%2080x200%20%D1%8D%D0%BC%D0%B0%D0%BB%D1%8C%20%D0%B1%D0%B5%D0%BB%D1%8B%D0%B9', thumb:'assets/door-plus.webp'}
  ]
};

const variants = {
  standard:{title:'Стандарт',rate:'13 000 ₽/м²', image:'assets/standard-room.webp', desc:'Светлая практичная отделка с нейтральными фактурами. Подходит для спокойного современного интерьера и рационального бюджета.', palette:['#f4f0e8','#ddd0ba','#beb398','#818a74','#2e3531'], package:'standard'},
  comfort:{title:'Комфорт',rate:'18 000 ₽/м²', image:'assets/comfort-room.webp', desc:'Тёплый дуб, мягкие бежевые оттенки и более выразительные покрытия создают цельный и уютный интерьер.', palette:['#f2eee5','#d0bfa5','#b69b7c','#827a6d','#303532'], package:'comfort'},
  plus:{title:'Комфорт+',rate:'от 25 000 ₽/м²', image:'assets/comfortplus-room.webp', desc:'Глубокие древесные оттенки, крупный камень и деликатный рисунок стен. Больше внимания к деталям и световым сценариям.', palette:['#f1ecdf','#d1bc9c','#afa18d','#765f52','#ac9465'], package:'plus'}
};

let selectedPackage='standard';
let selectedVariant='standard';
const selections={wall:'wall-standard',floor:'floor-standard',tile:'tile-standard',door:'door-standard'};
const $=id=>document.getElementById(id);
const fmt=n=>Math.round(n).toLocaleString('ru-RU');
const fmt1=n=>Number(n).toLocaleString('ru-RU',{maximumFractionDigits:1});
function findMaterial(kind,id){return materials[kind].find(x=>x.id===id)}

function thumbFallback(kind,tier){
  const colors={
    wall:{standard:['#eee9df','#f8f5ef'],comfort:['#e8e4dc','#f4f1eb'],plus:['#ded8cc','#f4f0e8']},
    floor:{standard:['#614630','#b2825b'],comfort:['#cfc2b3','#ebe2d6'],plus:['#d6d3cd','#f2efea']},
    tile:{standard:['#b8b4aa','#ded8cf'],comfort:['#aaa497','#d5cec0'],plus:['#8d8980','#c4bdb2']},
    door:{standard:['#f8f8f6','#dcdedc'],comfort:['#eeeae3','#c7b9a8'],plus:['#f8f7f3','#e0d8cd']}
  };
  const [a,b]=colors[kind][tier];
  const label={wall:'ОБОИ',floor:'ЛАМИНАТ',tile:'ПЛИТКА',door:'ДВЕРЬ'}[kind];
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="140" height="140" rx="24" fill="url(#g)"/><text x="70" y="76" text-anchor="middle" font-family="Georgia" font-size="13" fill="#6f6252">${label}</text></svg>`;
  return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg);
}
function bindFallback(img,kind,tier){img.onerror=()=>{img.onerror=null;img.src=thumbFallback(kind,tier)}}

function setupSelect(kind){const select=$(kind+'Select');materials[kind].forEach(item=>{const o=document.createElement('option');o.value=item.id;o.textContent=`${item.name} · ${item.price.replace('Ориентир: ','')}`;select.appendChild(o)});select.addEventListener('change',()=>{selections[kind]=select.value;selectedPackage='custom';syncPackageTabs();renderMaterial(kind);updateCalc();});}
function renderMaterial(kind){const item=findMaterial(kind,selections[kind]);const img=$(kind+'Thumb');$(kind+'Select').value=item.id;bindFallback(img,kind,item.tier);img.src=item.thumb;$(kind+'Price').textContent=item.price;$(kind+'Link').href=item.link;}
function setPackage(pkg){selectedPackage=pkg;if(pkg!=='custom') Object.keys(materials).forEach(kind=>{const item=materials[kind].find(x=>x.tier===pkg);selections[kind]=item.id;renderMaterial(kind)});syncPackageTabs();updateCalc();}
function syncPackageTabs(){document.querySelectorAll('.finish-tab').forEach(b=>b.classList.toggle('active',b.dataset.package===selectedPackage))}
function customRate(){const avg=Object.keys(selections).reduce((sum,kind)=>sum+tiers[findMaterial(kind,selections[kind]).tier],0)/4;return Math.round(avg/500)*500;}
function roomFor(pkg){return (window.AVS_ROOMS&&window.AVS_ROOMS[pkg])||variants[pkg].image}
function updateCalc(){const area=Math.max(1,parseFloat($('area').value)||0);const height=Math.max(1,parseFloat($('height').value)||0);$('floorArea').textContent=fmt1(area);$('wallArea').textContent=fmt1(area*height);const rate=selectedPackage==='custom'?customRate():tiers[selectedPackage];$('resultPackage').textContent=labels[selectedPackage];$('resultRate').textContent=fmt(rate);$('resultArea').textContent=fmt1(area);$('resultPrice').textContent=fmt(area*rate)+' ₽';const bgPkg=selectedPackage==='custom'?'standard':selectedPackage;document.querySelector('.result-card').style.backgroundImage=`linear-gradient(rgba(23,27,22,.74),rgba(23,27,22,.88)),url("${roomFor(bgPkg)}")`;}
function renderVariant(key){selectedVariant=key;const v=variants[key];const img=$('variantImage');img.onerror=()=>{img.onerror=null;img.removeAttribute('src');img.alt='';img.parentElement.classList.add('variant-photo--fallback')};img.parentElement.classList.remove('variant-photo--fallback');img.src=roomFor(key);img.alt='Интерьер пакета '+v.title;$('variantTitle').textContent=v.title;$('variantRate').textContent=v.rate;$('variantDescription').textContent=v.desc;$('variantPalette').innerHTML=v.palette.map(c=>`<i style="background:${c}"></i>`).join('');$('variantMaterials').innerHTML=Object.keys(materials).map(kind=>{const m=materials[kind].find(x=>x.tier===v.package);const title={wall:'Обои',floor:'Ламинат',tile:'Керамогранит',door:'Межкомнатная дверь'}[kind];return `<div class="variant-material"><img src="${m.thumb}" data-kind="${kind}" data-tier="${m.tier}" alt=""><div><span>${title}</span><strong>${m.name}</strong></div></div>`}).join('');document.querySelectorAll('.variant-material img').forEach(el=>bindFallback(el,el.dataset.kind,el.dataset.tier));$('variantCalc').dataset.package=v.package;document.querySelectorAll('.variant-tab').forEach(b=>b.classList.toggle('active',b.dataset.variant===key));}

function loadEmbeddedRooms(){
  const files={standard:'room-standard.js',comfort:'room-comfort.js',plus:'room-plus.js'};
  Object.entries(files).forEach(([key,src])=>{
    const s=document.createElement('script');s.src=src;s.async=true;s.onload=()=>{if(key===selectedVariant)renderVariant(key);updateCalc()};document.head.appendChild(s);
  });
}

Object.keys(materials).forEach(kind=>{setupSelect(kind);renderMaterial(kind)});document.querySelectorAll('.finish-tab').forEach(b=>b.addEventListener('click',()=>setPackage(b.dataset.package)));$('area').addEventListener('input',updateCalc);$('height').addEventListener('input',updateCalc);document.querySelectorAll('.variant-tab').forEach(b=>b.addEventListener('click',()=>renderVariant(b.dataset.variant)));$('variantCalc').addEventListener('click',()=>{setPackage($('variantCalc').dataset.package);$('calculator').scrollIntoView({behavior:'smooth',block:'start'})});
function openContact(){const area=parseFloat($('area').value)||0;const rate=selectedPackage==='custom'?customRate():tiers[selectedPackage];const summary=`${labels[selectedPackage]} · ${fmt1(area)} м² · ориентировочно ${fmt(area*rate)} ₽. Материалы: ${Object.keys(selections).map(k=>findMaterial(k,selections[k]).name).join(', ')}.`;$('dialogSummary').textContent=summary;$('mailLink').href='mailto:vito.ant@yandex.ru?subject='+encodeURIComponent('Расчёт ремонта AVS')+'&body='+encodeURIComponent(summary+'\n\nХочу получить точную смету.');$('contactDialog').showModal();}
$('exactCalc').addEventListener('click',openContact);$('dialogClose').addEventListener('click',()=>$('contactDialog').close());$('contactDialog').addEventListener('click',e=>{if(e.target===$('contactDialog')) $('contactDialog').close()});
renderVariant('standard');updateCalc();loadEmbeddedRooms();
