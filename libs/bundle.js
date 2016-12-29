!function(e){function i(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,i),o.loaded=!0,o.exports}var t={};return i.m=e,i.c=t,i.p="",i(0)}([function(e,i,t){"use strict";t(1),t(2),t(3),t(4),t(5),t(6),t(7),t(8)},function(e,i){"use strict";i.app=angular.module("app",["ngMaterial","ui.router","ngMessages","ngStorage","angular-gestures"])},function(e,i,t){"use strict";var n=t(1).app;n.config(["hammerDefaultOptsProvider",function(e){e.set({recognizers:[[Hammer.Tap,{time:250}],[Hammer.Press,{enable:!0}],[Hammer.Swipe,{enable:!0}]]})}]),n.config(["$urlRouterProvider","$locationProvider",function(e,i){i.html5Mode(!0),e.when("","/").otherwise("/")}]),n.config(["$stateProvider",function(e){e.state("index",{url:"/",controller:"IndexController",templateUrl:"/public/views/index.html"}).state("index.image",{url:"{id:int}",controller:"ImageController",templateUrl:"/public/views/image.html"}).state("history",{url:"/history",controller:"HistoryController",templateUrl:"/public/views/history.html"}).state("week",{url:"/week",controller:"WeekController",templateUrl:"/public/views/week.html"}).state("password",{url:"/password",controller:"PasswordController",templateUrl:"/public/views/password.html"})}])},function(e,i,t){"use strict";var n=t(1).app;n.controller("MainController",["$scope","$mdSidenav","$state","$mdDialog","$localStorage","$interval","$location","$http","$timeout",function(e,i,t,n,o,a,r,c,s){o.$default({settings:{autoChange:!1,autoShowHelpInfo:!0},imagesHistory:[]}),e.public={isLoading:!1,isAdmin:!1,isFavorite:!1,addToHistory:!0,currentImage:{},images:[],view:[],history:o.imagesHistory,settings:o.settings},e.checkAdmin=function(){c.get("/api/login").then(function(i){e.public.isAdmin=i.data.isLogin})},e.checkAdmin(),e.showHelpDialog=function(){e.dialog=n.show({preserveScope:!0,scope:e,templateUrl:"/public/views/help.html",parent:angular.element(document.body),clickOutsideToClose:!0})},e.closeHelpDialog=function(){n.hide(e.dialog)},e.public.settings.autoShowHelpInfo&&e.showHelpDialog(),e.favorite=function(){e.public.isFavorite||(e.public.isFavorite=!0,c.post("/api/image/favorite",{id:e.public.currentImage.id}).then().catch())},e.menus=[{name:"首页",icon:"home",click:function(){r.path().match(/^\/\d{1,}$/)||t.go("index")}},{name:"浏览记录",icon:"history",click:function(){return t.go("history")}},{name:"本周热门",icon:"favorite",click:function(){return t.go("week")}},{name:"帮助",icon:"help_outline",click:function(){return e.showHelpDialog()}},{name:"管理",icon:"settings",click:function(){return t.go("password")}},{name:"关于本项目",icon:"code",click:function(){window.location="https://github.com/gyteng/jandan-ooxx"}}],e.$watch("public.isAdmin",function(){return e.public.isAdmin?(e.menus[4].name="退出",e.menus[4].icon="exit_to_app",void(e.menus[4].click=function(){c.post("/api/logout").then(function(){e.public.isAdmin=!1})})):(e.menus[4].name="管理",e.menus[4].icon="settings",void(e.menus[4].click=function(){t.go("password")}))}),e.openMenu=function(){i("left").toggle()},e.menuClick=function(t){e.menus[t].click(),i("left").close()},e.imageUrlPreload=60,e.imagePreload=2,e.getImage=function(){return c.get("/api/image",{params:{number:e.imageUrlPreload-e.public.images.length}}).then(function(i){return i.data.forEach(function(i){e.public.images.filter(function(e){return e.id===i.id})[0]||e.public.images.push(i)}),i})},e.getImageById=function(i){return c.get("/api/image/"+i).then(function(i){return e.public.images.push(i.data),i})},e.$watch("public.images.length",function(){e.public.images.length<e.imageUrlPreload/2&&e.getImage()}),e.addHistory=function(e){o.imagesHistory=o.imagesHistory.filter(function(i){return i.id!==e.id}),o.imagesHistory.push(e),o.imagesHistory.length>60&&o.imagesHistory.splice(0,o.imagesHistory.length-60)},e.setCurrentImage=function(i){i?!function(){e.public.isLoading=!0;var t=e.public.addToHistory,n=e.public.images.filter(function(e){return e.id===i})[0];n?(e.public.currentImage=n,t?e.addHistory(e.public.currentImage):e.public.addToHistory=!0,e.public.isLoading=!1):e.getImageById(i).then(function(n){e.setCurrentImage(i,t)}).catch(function(){e.public.isLoading=!1})}():e.public.images.length?(e.public.currentImage=e.public.images[0],e.addHistory(e.public.currentImage)):e.getImage.then(function(){e.setCurrentImage()})},e.randomImage=function(){if(e.imagePreload<15&&(e.imagePreload+=2),e.public.images.length>1){e.public.images.splice(0,1);var i=e.public.images[0];e.addHistory(i),t.go("index.image",{id:i.id})}else e.getImage().then(function(){e.randomImage()})},e.prevImage=function(){var i=null;if(o.imagesHistory.forEach(function(t,n){t.id===e.public.currentImage.id&&(i=n)}),i>1){e.public.addToHistory=!1;var n=o.imagesHistory[i-1].id;t.go("index.image",{id:n})}},e.nextImage=function(){var i=null;if(o.imagesHistory.forEach(function(t,n){t.id===e.public.currentImage.id&&(i=n)}),i<o.imagesHistory.length-1){e.public.addToHistory=!1;var n=o.imagesHistory[i+1].id;t.go("index.image",{id:n})}else e.randomImage()},a(function(){e.public.view.length&&(c.post("/api/image/view",{id:e.public.view}),e.public.view=[])},1e4),e.loadWeekImages=function(){c.get("/api/image/week",{params:{number:60}}).then(function(i){e.weekImages=i.data,e.weekImages=e.weekImages.map(function(e){return{id:e.id,url:e.url,width:1,height:1,style:{width:"100%",overflow:"hidden"}}}),e.weekImages.forEach(function(i,t){var n=new Image;n.onload=function(){e.weekImages[t].width=n.width,e.weekImages[t].height=n.height,n.height<n.width&&(e.weekImages[t].style={height:"100%","max-width":"none","min-width":100/i.height*i.width+"%"})},n.src=i.url})})},a(function(){e.loadWeekImages()},9e4),e.online=!1;var l=!1,u=function i(){c.get("/api/online").then(function(t){return"online"===t.data?(e.online=!0,void(l&&e.randomImage())):(s(function(){i()},5e3),l=!0,Promise.reject())}).catch(function(){return s(function(){i()},5e3),l=!0,Promise.reject()})};u()}])},function(e,i,t){"use strict";var n=t(1).app;n.controller("IndexController",["$scope","$state",function(e,i){if("index"===i.current.name){if(e.public.images[0])return void i.go("index.image",{id:e.public.images[0].id});e.getImage().then(function(){i.go("index.image",{id:e.public.images[0].id})})}}])},function(e,i,t){"use strict";var n=t(1).app;n.controller("ImageController",["$scope","$stateParams","$http","$interval",function(e,i,t,n){var o=i.id;e.setCurrentImage(o),e.public.isFavorite=!1,e.public.view.push(o),e.isManagerMenuOpen=!1,e.verifyImage=function(){t.put("/api/image/"+o,{status:1}).then().catch(),e.randomImage()},e.deleteImage=function(){t.put("/api/image/"+o,{status:-1}).then().catch(),e.public.images=e.public.images.filter(function(e){return e.id!==o}),e.randomImage()}}])},function(e,i,t){"use strict";var n=t(1).app;n.controller("HistoryController",["$scope","$localStorage","$state","$mdMedia","$http",function(e,i,t,n,o){if(!i.imagesHistory.length)return t.go("index");e.divHeightStyle={height:100/3+"vw"},n("md")&&(e.divHeightStyle.height="25vw"),n("gt-md")&&(e.divHeightStyle.height=100/6+"vw");var a=function(){e.public.isLoading=!0,e.history=i.imagesHistory.map(function(e){return{id:e.id,url:e.url,width:1,height:1,style:{width:"100%",overflow:"hidden"}}}),e.history.forEach(function(i,t){var n=new Image;n.onload=function(){e.history[t].width=n.width,e.history[t].height=n.height,n.height<n.width&&(e.history[t].style={height:"100%","max-width":"none","min-width":100/i.height*i.width+"%"}),e.public.isLoading=!1},n.src=i.url})};a(),e.toImage=function(n){var o=i.imagesHistory[n].id;e.public.addToHistory=!1,t.go("index.image",{id:o})},e.refreshHistory=function(){o.get("/api/image",{params:{number:60}}).then(function(e){i.imagesHistory=e.data,a()})}}])},function(e,i,t){"use strict";var n=t(1).app;n.controller("WeekController",["$scope","$localStorage","$state","$mdMedia","$http",function(e,i,t,n,o){e.loadWeekImages(),e.divHeightStyle={height:100/3+"vw"},n("md")&&(e.divHeightStyle.height="25vw"),n("gt-md")&&(e.divHeightStyle.height=100/6+"vw"),e.toImage=function(i){var n=e.weekImages[i].id;t.go("index.image",{id:n})}}])},function(e,i,t){"use strict";var n=t(1).app;n.controller("PasswordController",["$scope","$state","$stateParams","$http",function(e,i,t,n){e.manager={password:"",keypress:function(i){13===i.keyCode&&e.checkPassword()}},e.checkPassword=function(){e.manager.password&&n.post("/api/login",{password:e.manager.password}).then(function(){e.public.isAdmin=!0,i.go("index")}).catch(function(){e.public.isAdmin=!1,i.go("index")})}}])}]);