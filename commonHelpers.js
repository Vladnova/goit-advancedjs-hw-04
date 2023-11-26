import{a as m,i as n,S as $}from"./assets/vendor-f67ecabd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const M="19870120-8ec79e7454f8912b12bef551c";m.defaults.baseURL="https://pixabay.com/api/";const E=new URLSearchParams({key:M,orientation:"horizontal",safesearch:!0,image_type:"photo",per_page:40});async function h(t,r){const o=await m.get(`?q=${t}&${E}&page=${r}`);if(o.status!==200)throw new Error("Some Error");return o.data}const p={title:"Error",message:"Oops! Something went wrong! Try reloading the page!",position:"topRight"},d={title:"Info",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"},g={title:"Success",message:"We`re sorry, but you`ve reached the end of search results.",position:"topRight"},a={form:document.querySelector("#search-form"),gallery:document.querySelector(".js-gallery"),btnLoadMore:document.querySelector(".js-btn")};a.form.addEventListener("submit",P);a.btnLoadMore.addEventListener("click",q);let l=null,u="",y;async function q(){l+=1,h(u,l).then(({hits:t,totalHits:r})=>{b(t),S(),y.refresh(),L(r)}).catch(t=>n.error(p))}async function P(t){if(f(!0),a.gallery.innerHTML="",t.preventDefault(),u=t.currentTarget.elements.searchQuery.value,l=1,!u){n.info(d);return}h(u,l).then(({hits:r,totalHits:o})=>{if(r.length===0){n.info(d);return}n.success({...g,message:`Hooray! We found ${o} images.`}),b(r),S(),y=new $(".gallery a").refresh(),!L(o)&&f(!1)}).catch(r=>{n.error(p),a.gallery.innerHTML=""})}function b(t){const r=t.map(({webformatURL:o,largeImageURL:i,tags:e,likes:s,views:c,comments:v,downloads:w})=>`
      <li class="item-photo">
        <div class="photo-card">
            <a href="${i}">
              <img src=${o} alt=${e} class="img" data-big-img=${i} />
            </a>
            <div class="stats">
                <p class="stats-item">
                  <b class="material-icons">Likes</b>
                  <span>${s}</span>
                </p>
                <p class="stats-item">
                    <b class="material-icons">Views</b>
                    ${c}
                </p>
                <p class="stats-item">
                    <b class="material-icons">Comments</b>
                    ${v}
                </p>
                <p class="stats-item">
                    <b class="material-icons">Downloads</b>
                    ${w}
                </p>
            </div>
        </div>
      </li>
`).join("");a.gallery.insertAdjacentHTML("beforeend",r)}function f(t){a.btnLoadMore.hidden=t}function L(t){const r=Math.ceil(t/40);if(l>=r)return n.success(g),f(!0),!0}function S(){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*6,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
