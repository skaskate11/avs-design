const ASSET_VER='v10';
const ROOM_IMAGES={standard:'assets/room-standard.webp?v10',comfort:'assets/room-comfort.webp?v10',plus:'assets/room-comfortplus.webp?v10'};
const tiers={standard:13000,comfort:18000,plus:25000};
const labels={standard:'СТАНДАРТ',comfort:'КОМФОРТ',plus:'КОМФОРТ+',custom:'СВОЙ ПАКЕТ'};

const materials={
  wall:[
    {id:'wall-standard',tier:'standard',name:'Simple Rovno, бежевые',price:'Ориентир: 890 ₽/рул.',link:'https://krasnodar.lemanapro.ru/product/oboi-flizelinovye-simple-rovno-bezhevye-106-m-sp31233-21a-89411624/',thumb:'assets/wall-standard.webp'},
    {id:'wall-comfort',tier:'comfort',name:'Erismann Samui, светло-бежевые',price:'Ориентир: 1 850 ₽/рул.',link:'https://krasnodar.lemanapro.ru/product/oboi-flizelinovye-erismann-samui-svetlo-bezhevye-106-m-er60868-03-89405520/',thumb:'assets/wall-comfort.webp'},
    {id:'wall-plus',tier:'plus',name:'Victoria Stenova Одиссей',price:'Ориентир: 2 490 ₽/рул.',link:'https://krasnodar.lemanapro.ru/product/oboi-flizelinovye-victoria-stenova-odissey-serye-106-m-vs287577-89374621/',thumb:'assets/wall-plus.webp'}
  ],
  floor:[
    {id:'floor-standard',tier:'standard',name:'KREAFORTA Лоо, 33 кл.',price:'Ориентир: 688 ₽/м²',link:'https://krasnodar.lemanapro.ru/search/?q=KREAFORTA%20%D0%9B%D0%BE%D0%BE%2033%20%D0%BA%D0%BB%D0%B0%D1%81%D1%81',thumb:'assets/floor-standard.webp'},
    {id:'floor-comfort',tier:'comfort',name:'Травертин Латте, 33 кл.',price:'Ориентир: 1 070 ₽/м²',link:'https://krasnodar.lemanapro.ru/search/?q=%D0%A2%D1%80%D0%B0%D0%B2%D0%B5%D1%80%D1%82%D0%B8%D0%BD%20%D0%9B%D0%B0%D1%82%D1%82%D0%B5%2033%20%D0%BA%D0%BB%D0%B0%D1%81%D1%81',thumb:'assets/floor-comfort.webp'},
    {id:'floor-plus',tier:'plus',name:'Дуб Катунь, влагостойкий',price:'Ориентир: 1 398 ₽/м²',link:'https://krasnodar.lemanapro.ru/product/laminat-dub-katun-vodostoykost-24-chasa-33-klass-tolshchina-8-mm-s-faskoy-1596-m-84868455/',thumb:'assets/floor-plus.webp'}
  ],
  tile:[
    {id:'tile-standard',tier:'standard',name:'Gracia Ceramica Флейм',price:'Ориентир: 1 226 ₽/м²',link:'https://krasnodar.lemanapro.ru/search/?q=Gracia%20Ceramica%20%D0%A4%D0%BB%D0%B5%D0%B9%D0%BC%2060x60',thumb:'assets/tile-standard.webp'},
    {id:'tile-comfort',tier:'comfort',name:'Arcadia Desert Crema',price:'Ориентир: 2 167 ₽/м²',link:'https://krasnodar.lemanapro.ru/search/?q=Arcadia%20Desert%20Crema%2060x60',thumb:'assets/tile-comfort.webp'},
    {id:'tile-plus',tier:'plus',name:'Novin Ceram Blestone',price:'Ориентир: 3 200 ₽/м²',link:'https://krasnodar.lemanapro.ru/search/?q=Novin%20Ceram%20Blestone%2060x60',thumb:'assets/tile-plus.webp'}
  ],
  door:[
    {id:'door-standard',tier:'standard',name:'Белая глухая, 80×200',price:'Ориентир: 2 596 ₽/шт.',link:'https://krasnodar.lemanapro.ru/search/?q=%D0%B4%D0%B2%D0%B5%D1%80%D1%8C%20%D0%BC%D0%B5%D0%B6%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%BD%D0%B0%D1%8F%20%D0%B3%D0%BB%D1%83%D1%85%D0%B0%D1%8F%20%D0%B1%D0%B5%D0%BB%D0%B0%D1%8F%2080x200',thumb:'assets/door-standard.webp'},
    {id:'door-comfort',tier:'comfort',name:'Борно 56, ПЭТ',price:'Ориентир: 7 780 ₽/шт.',link:'https://krasnodar.lemanapro.ru/search/?q=%D0%91%D0%BE%D1%80%D0%BD%D0%BE%2056%2080x200%20%D0%9F%D0%AD%D0%A2%20%D0%B1%D0%B5%D0%BB%D0%B0%D1%8F',thumb:'assets/door-comfort.webp'},
    {id:'door-plus',tier:'plus',name:'Австралия, белая эмаль',price:'Ориентир: 9 954 ₽/шт.',link:'https://krasnodar.lemanapro.ru/search/?q=%D0%90%D0%B2%D1%81%D1%82%D1%80%D0%B0%D0%BB%D0%B8%D1%8F%2080x200%20%D1%8D%D0%BC%D0%B0%D0%BB%D1%8C%20%D0%B1%D0%B5%D0%BB%D1%8B%D0%B9',thumb:'assets/door-plus.webp'}
  ]
};

const variants={
  standard:{title:'Стандарт',rate:'13 000 ₽/м²',desc:'Светлая практичная отделка с нейтральными фактурами. Подходит для спокойного современного интерьера и рационального бюджета.',palette:['#f4f0e8','#ddd0ba','#beb398','#818a74','#2e3531'],package:'standard'},
  comfort:{title:'Комфорт',rate:'18 000 ₽/м²',desc:'Тёплый дуб, мягкие бежевые оттенки и более выразительные покрытия создают цельный и уютный интерьер.',palette:['#f2eee5','#d0bfa5','#b69b7c','#827a6d','#303532'],package:'comfort'},
  plus:{title:'Комфорт+',rate:'от 25 000 ₽/м²',desc:'Глубокие древесные оттенки, крупный камень и деликатный рисунок стен. Больше внимания к деталям и световым сценариям.',palette:['#f1ecdf','#d1bc9c','#afa18d','#765f52','#ac9465'],package:'plus'}
};

let selectedPackage='standard';
let selectedVariant='standard';
const selections={wall:'wall-standard',floor:'floor-standard',tile:'tile-standard',door:'door-standard'};
const $=id=>document.getElementById(id);
const fmt=n=>Math.round(n).toLocaleString('ru-RU');
const fmt1=n=>Number(n).toLocaleString('ru-RU',{maximumFractionDigits:1});
const titles={wall:'Обои',floor:'Ламинат',tile:'Керамогранит',door:'Межкомнатная дверь'};

function findMaterial(kind,id){return materials[kind].find(x=>x.id===id)}
function asset(path){return path+'?'+ASSET_VER}
function roomFor(pkg){return ROOM_IMAGES[pkg]||''}

function setupSelect(kind){
  const select=$(kind+'Select');
  select.innerHTML='';
  materials[kind].forEach(item=>{
    const option=document.createElement('option');
    option.value=item.id;
    option.textContent=`${item.name} · ${item.price.replace('Ориентир: ','')}`;
    select.appendChild(option);
  });
  select.addEventListener('change',()=>{
    selections[kind]=select.value;
    selectedPackage='custom';
    syncPackageTabs();
    renderMaterial(kind);
    updateCalc();
  });
}

function renderMaterial(kind){
  const item=findMaterial(kind,selections[kind]);
  const img=$(kind+'Thumb');
  $(kind+'Select').value=item.id;
  const nextSrc=asset(item.thumb);
  img.classList.add('is-switching');
  const preload=new Image();
  preload.onload=()=>{
    img.src=nextSrc;
    img.alt=`${titles[kind]} — ${item.name}`;
    img.classList.remove('is-switching');
  };
  preload.onerror=()=>{
    img.src=nextSrc;
    img.classList.remove('is-switching');
  };
  preload.src=nextSrc;
  $(kind+'Price').textContent=item.price;
  $(kind+'Link').href=item.link;
}

function setPackage(pkg){
  selectedPackage=pkg;
  if(pkg!=='custom'){
    Object.keys(materials).forEach(kind=>{
      const item=materials[kind].find(x=>x.tier===pkg);
      selections[kind]=item.id;
      renderMaterial(kind);
    });
  }
  syncPackageTabs();
  updateCalc();
}
function syncPackageTabs(){document.querySelectorAll('.finish-tab').forEach(b=>b.classList.toggle('active',b.dataset.package===selectedPackage))}
function customRate(){
  const avg=Object.keys(selections).reduce((sum,kind)=>sum+tiers[findMaterial(kind,selections[kind]).tier],0)/4;
  return Math.round(avg/500)*500;
}

function updateCalc(){
  const area=Math.max(1,parseFloat($('area').value)||0);
  const height=Math.max(1,parseFloat($('height').value)||0);
  $('floorArea').textContent=fmt1(area);
  $('wallArea').textContent=fmt1(area*height);
  const rate=selectedPackage==='custom'?customRate():tiers[selectedPackage];
  $('resultPackage').textContent=labels[selectedPackage];
  $('resultRate').textContent=fmt(rate);
  $('resultArea').textContent=fmt1(area);
  $('resultPrice').textContent=fmt(area*rate)+' ₽';
  const bgPkg=selectedPackage==='custom'?'standard':selectedPackage;
  const room=roomFor(bgPkg);
  document.querySelector('.result-card').style.backgroundImage=room?`linear-gradient(rgba(23,27,22,.73),rgba(23,27,22,.90)),url("${room}")`:'linear-gradient(145deg,#4b4b43,#1f241e)';
}

function renderVariant(key){
  selectedVariant=key;
  const v=variants[key];
  const room=roomFor(key);
  const img=$('variantImage');
  const photo=img.parentElement;
  if(room){
    photo.classList.remove('variant-photo--fallback');
    img.style.display='block';
    img.src=room;
    img.alt='Интерьер пакета '+v.title;
  }else{
    img.removeAttribute('src');
    img.style.display='none';
    photo.classList.add('variant-photo--fallback');
  }
  $('variantTitle').textContent=v.title;
  $('variantRate').textContent=v.rate;
  $('variantDescription').textContent=v.desc;
  $('variantPalette').innerHTML=v.palette.map(c=>`<i style="background:${c}"></i>`).join('');
  $('variantMaterials').innerHTML=Object.keys(materials).map(kind=>{
    const m=materials[kind].find(x=>x.tier===v.package);
    return `<div class="variant-material"><img src="${asset(m.thumb)}" alt="${titles[kind]}"><div><span>${titles[kind]}</span><strong>${m.name}</strong></div></div>`;
  }).join('');
  $('variantCalc').dataset.package=v.package;
  document.querySelectorAll('.variant-tab').forEach(b=>b.classList.toggle('active',b.dataset.variant===key));
}

Object.keys(materials).forEach(kind=>{setupSelect(kind);renderMaterial(kind)});
document.querySelectorAll('.finish-tab').forEach(b=>b.addEventListener('click',()=>setPackage(b.dataset.package)));
$('area').addEventListener('input',updateCalc);
$('height').addEventListener('input',updateCalc);
document.querySelectorAll('.variant-tab').forEach(b=>b.addEventListener('click',()=>renderVariant(b.dataset.variant)));
$('variantCalc').addEventListener('click',()=>{setPackage($('variantCalc').dataset.package);$('calculator').scrollIntoView({behavior:'smooth',block:'start'})});

function openContact(){
  const area=parseFloat($('area').value)||0;
  const rate=selectedPackage==='custom'?customRate():tiers[selectedPackage];
  const summary=`${labels[selectedPackage]} · ${fmt1(area)} м² · ориентировочно ${fmt(area*rate)} ₽. Материалы: ${Object.keys(selections).map(k=>findMaterial(k,selections[k]).name).join(', ')}.`;
  $('dialogSummary').textContent=summary;
  $('mailLink').href='mailto:vito.ant@yandex.ru?subject='+encodeURIComponent('Расчёт ремонта AVS')+'&body='+encodeURIComponent(summary+'\n\nХочу получить точную смету.');
  $('contactDialog').showModal();
}
$('exactCalc').addEventListener('click',openContact);
$('dialogClose').addEventListener('click',()=>$('contactDialog').close());
$('contactDialog').addEventListener('click',e=>{if(e.target===$('contactDialog'))$('contactDialog').close()});

renderVariant('standard');
updateCalc();
