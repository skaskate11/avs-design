(()=>{
  const core=document.createElement('script');
  core.src='app-core.js?v=12';
  core.onload=()=>{
    const showcase=document.createElement('script');
    showcase.src='showcase.js?v=16';
    document.head.appendChild(showcase);
  };
  core.onerror=()=>console.error('AVS: failed to load app-core.js');
  document.head.appendChild(core);
})();
