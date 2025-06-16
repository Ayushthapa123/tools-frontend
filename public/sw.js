<<<<<<< Updated upstream
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-bd7e3b9b'], (function (workbox) { 'use strict';

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }
        return response;
      }
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: []
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map
=======
if(!self.define){let s,e={};const t=(t,a)=>(t=new URL(t+".js",a).href,e[t]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=t,s.onload=e,document.head.appendChild(s)}else s=t,importScripts(t),e()})).then((()=>{let s=e[t];if(!s)throw new Error(`Module ${t} didn’t register its module`);return s})));self.define=(a,c)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let i={};const r=s=>t(s,n),p={module:{uri:n},exports:i,require:r};e[n]=Promise.all(a.map((s=>p[s]||r(s)))).then((s=>(c(...s),i)))}}define(["./workbox-9b4d2a02"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"0023c8e776cb526d49ad4ed5dedf45aa"},{url:"/_next/static/-2pt4atcsU9Jxq23yQ7b2/_buildManifest.js",revision:"e57a59d253dabd0e0d31ccdad4b9a2b4"},{url:"/_next/static/-2pt4atcsU9Jxq23yQ7b2/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e762574-db7c57bd35e5c5f5.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/1270-bf6c9f84452c7c5e.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/137-2a0e9264e74d89ad.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/1376-d23829754d974e55.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/1403-d9851e90ff8ede39.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/2670-685f262c1b7c4aad.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/370b0802-5ddd2867b9ce97fd.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/3d47b92a-33b7a695da60ea45.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/4642-6bee5c3bee204704.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/4e6af11a-dd4f9326b405c211.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/53c13509-d38028095b791a8c.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/5615.64cd9ab052d9be64.js",revision:"64cd9ab052d9be64"},{url:"/_next/static/chunks/568-b01c9372b66a8558.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/5820-1b810e2d2efa303f.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/5e22fd23-6da5decc27724e51.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/6492-805014cfb22ecec6.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/703-7952acaad7afa2a7.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/795d4814-9d10ae1e39b7b680.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/8003-503390cfd41a7516.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/8012d7e2.d7067d3284f84c33.js",revision:"d7067d3284f84c33"},{url:"/_next/static/chunks/8069-3fd6e9688370c59b.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/8147-9f6401f3044247e3.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/8383-4781946122b4a54d.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/8592-3b9d5737e731fdf1.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/8792-bce546616522a8e5.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/8953-73fc80c64817fbfe.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/8e1d74a4-c6c7b335994f7a88.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/9293-2fe76e73072b0794.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/94730671-657483fc58ed8403.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/9550-ff4b14c9f672ff3e.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/9c4e2130-d719da0afc9bbaef.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/a6eb9415-aed42e97545942eb.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/_not-found-30ad774446a4fadb.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/app/amenities/page-a94601fe7c235d60.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/app/booking/page-24459dc3dd32d85e.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/app/community/page-c18e3a75750560e8.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/app/gallery/page-a4220cb9e5bfaff2.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/app/homestay-info/page-8b3f2129e7ac529e.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/app/homestays/page-afa67cbfef3095d9.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/app/layout-3861fc8a8b198486.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/app/my-profile/page-87a2ad5f959ea372.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/app/page-35d74fb033f9a191.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/app/room/%5Bslug%5D/page-de29ab2c6d047987.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/app/room/page-cdb9d7728d02f3b6.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/app/rules/page-1d081dde90cf2b01.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/app/services/page-c26a3a3b19cfed74.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/auth/forgot-password/page-e180ad9b2ad7155d.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/auth/forgotpassword/page-62a3d32c6abafc93.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/auth/layout-88a11e54b19b4ffe.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/auth/verify-email/page-937a4b4d7d501449.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/booking-failed/page-480d7243648387d0.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/booking-success/page-7fe0e655d6327722.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/homestay-signup/page-367c93dc63a33da3.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/homestay/%5Bslug%5D/booking/page-96cdb41d7cebca26.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/homestay/%5Bslug%5D/page-0cdac99a4abbc577.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/homestay/page-766ac83ef5639b9a.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/layout-7b7a76274d97302b.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/login/page-7232bf3bc94e04ee.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/oauth/google/page-06aa3bcd79a2664b.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/page-a3e79b720e8eb891.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/privacy-policy/page-d7a99a2633685187.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/search/page-5f9756c121190a2e.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/signup/page-21cf1b74e5624471.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/app/terms-and-conditions/page-8cf367773bc2ffce.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/b563f954-e09e4295c8ff895f.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/e34aaff9-701e47fa09332a96.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/ee560e2c-12d07b593e500723.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/fc2f6fa8-2fefe827b7f33cb4.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/fd9d1056-51b284c3838a6625.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/framework-20adfd98f723306f.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/main-80bf971cc9cd8952.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/main-app-584f85f9eeb0e493.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/pages/_app-794d85baa83ca682.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/pages/_error-5fb63848e0136a02.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-269106bf7154b450.js",revision:"-2pt4atcsU9Jxq23yQ7b2"},{url:"/_next/static/css/67369948fc877afc.css",revision:"67369948fc877afc"},{url:"/_next/static/css/8aee48eb52f4c731.css",revision:"8aee48eb52f4c731"},{url:"/assets/Sora-Bold.ttf",revision:"59f1a10513024e9d080536ea7a744293"},{url:"/assets/Sora-Regular.ttf",revision:"e771c55096d16865a23c2795806fb01b"},{url:"/assets/Teko-Bold.ttf",revision:"9e61bcfdde343ddce84977313364d440"},{url:"/assets/Teko-Regular.ttf",revision:"5db992e68c907ac09680a2f7de51ddef"},{url:"/background-image.png",revision:"b6c34712745a09792d3b6ebc33d48022"},{url:"/bg.png",revision:"28a82a23bbb8b7a32b24f5a4bcf9c5f7"},{url:"/default-image.png",revision:"986f2a15b990b2f89eaf19051e8b6d0b"},{url:"/favicon.ico",revision:"8a66a04844760848023f2b01b86d901c"},{url:"/full-logo.png",revision:"8a66a04844760848023f2b01b86d901c"},{url:"/home-stay-logo.png",revision:"2a2e2a714284ef0e384d19982f05dd5e"},{url:"/hslogo.png",revision:"2a2e2a714284ef0e384d19982f05dd5e"},{url:"/images/HomeStayLogo.png",revision:"2a2e2a714284ef0e384d19982f05dd5e"},{url:"/images/background.png",revision:"23d7e066b56f6f479cec216498373eef"},{url:"/images/bg.jpg",revision:"d4da871b744de5607899a2989541d591"},{url:"/images/cover-placeholder.jpg",revision:"4ec5ff3b0f06d4e067a7712f09558b82"},{url:"/images/default-image.png",revision:"986f2a15b990b2f89eaf19051e8b6d0b"},{url:"/line.png",revision:"5d5c717183d03e8f664f30fa2c84f293"},{url:"/logo.png",revision:"8a66a04844760848023f2b01b86d901c"},{url:"/logo192.png",revision:"5c34eaf02237babc48138c4981c43290"},{url:"/logo512.png",revision:"0a76059776fc2318516300b40aeb48b2"},{url:"/logo512.svg",revision:"8a66a04844760848023f2b01b86d901c"},{url:"/manifest.json",revision:"edb45c4f39e79b793ef6ee7cf3aaacff"},{url:"/welcome-icon-bg-21.png",revision:"4faf2fd6731b739feca642c2d4a43867"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:t,state:a})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
>>>>>>> Stashed changes
