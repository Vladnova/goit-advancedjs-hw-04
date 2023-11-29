import{a as d,i as a,S}from"./assets/vendor-f67ecabd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const v="19870120-8ec79e7454f8912b12bef551c";d.defaults.baseURL="https://pixabay.com/api/";const w=new URLSearchParams({key:v,orientation:"horizontal",safesearch:!0,image_type:"photo",per_page:40});async function h(e,r){const o=await d.get(`?q=${e}&${w}&page=${r}`);if(o.status!==200)throw new Error("Some Error");return o.data}const u={title:"Error",message:"Sorry, there are no images matching your search query. Please try again",position:"topRight"},$={title:"Info",message:"We`re sorry, but you`ve reached the end of search results.",position:"topRight"},M={title:"Success",position:"topRight"},l={form:document.querySelector("#search-form"),gallery:document.querySelector(".js-gallery"),btnLoadMore:document.querySelector(".js-btn")};l.form.addEventListener("submit",E);l.btnLoadMore.addEventListener("click",q);let c=null,m="",g;async function q(){c+=1;try{const{hits:e,totalHits:r}=await h(m,c);if(p(e),P(),g.refresh(),y(r))return}catch(e){a.error({...u,message:e.message})}}async function E(e){if(f(!0),l.gallery.innerHTML="",e.preventDefault(),m=e.currentTarget.elements.searchQuery.value,c=1,!m.trim()){a.error({...u,message:"Sorry, input is required to search for images"});return}try{const{hits:r,totalHits:o}=await h(m,c);if(r.length===0){a.error(u);return}if(a.success({...M,message:`Hooray! We found ${o} images.`}),p(r),g=new S(".gallery a").refresh(),y(o))return;f(!1)}catch(r){a.error({...u,message:r.message})}}function p(e){const r=e.map(({webformatURL:o,largeImageURL:i,tags:t,likes:s,views:n,comments:b,downloads:L})=>`
      <li class="item-photo">
        <div class="photo-card">
            <a href="${i}">
              <img src=${o} alt=${t} class="img" data-big-img=${i} />
            </a>
            <div class="stats">
                <p class="stats-item">
                  <b class="material-icons">Likes</b>
                  <span>${s}</span>
                </p>
                <p class="stats-item">
                    <b class="material-icons">Views</b>
                    ${n}
                </p>
                <p class="stats-item">
                    <b class="material-icons">Comments</b>
                    ${b}
                </p>
                <p class="stats-item">
                    <b class="material-icons">Downloads</b>
                    ${L}
                </p>
            </div>
        </div>
      </li>
`).join("");l.gallery.insertAdjacentHTML("beforeend",r)}function f(e){l.btnLoadMore.hidden=e}function y(e){const r=Math.ceil(e/40);if(c>=r)return a.info($),f(!0),!0}function P(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*3,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
