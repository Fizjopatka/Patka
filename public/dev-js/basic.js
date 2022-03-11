function viewBasic() {

    function linkClick(e){
        e.preventDefault();
        let href = this.querySelectorAll('a')[0].href;
        let regex = /\/#[a-z0-9A-Z-_]*/g;
        var anchor = href.match(regex);
        let target = this.querySelectorAll('a')[0].target;
        if(target=='' || target==undefined){
          target = '_self';
        }
    
        if(anchor!=null){
          if(anchor.length>0){
            anchor =  anchor[0].slice(2);
            let section = document.getElementById(anchor);
            if(section==null){
              if(target === '_self'){
              };
              window.open(href,target);
            }else{

              c_scrollTo(anchor);
            }
          }else{
            if(target === '_self'){
            }
            window.open(href,target);
          }
        }else{
          if(target === '_self'){
          };
          window.open(href,target);
        }
      }
      
      //LINK CLICK - MENU ITEM
      var menuitems = document.querySelectorAll('.menu-item');
      for (var menuitem of menuitems) {
        menuitem.addEventListener('click',linkClick);
      }
    
      //LINK CLICK - LINK BOX
      var linkitems = document.querySelectorAll('.link-box');
      for (var linkitem of linkitems) {
        linkitem.addEventListener('click',linkClick);
      }
    
      //SCROLL MAGIC
      let isAnimatingScroll = false;
      function c_scrollTo(link){
        if(myLazyLoad!=undefined){
          if(myLazyLoad.loadingCount!=undefined){
            myLazyLoad.destroy();
          };
        };
    
        var scrollTop = document.getScroll()[1];
        let targetY = document.getElementById(link).offsetTop;
        let speed = Math.round(Math.abs(targetY-scrollTop)/80);
        speed = Math.abs(speed);
        isAnimatingScroll = true;
        if(window.scrollInt!=undefined){
          clearInterval(window.scrollInt);
          window.scrollInt = null;
        }
        function completeScrollAnimation(link){
          var targetY = document.getElementById(link).offsetTop;
          window.scrollTo(0, targetY);
          clearInterval(window.scrollInt);
          window.scrollInt=null;
          isAnimatingScroll = false;
          beginLazyLoading();
        }
       
        let wow_speed = 2;
        let good_speed = 2;
        let half_way = 0;
        let scrololo = 0;
        window.scrollInt = setInterval(function(){
    
        let minimal_distance = 1;

          var scrollTop = document.getScroll()[1];
    
          let targetY = document.getElementById(link).offsetTop;
    
          var wow_half = 1.07;
          var good_half = 1.05;
          
          if (scrollTop < targetY) {
            if (scrololo == 0) {
              scrololo = scrollTop;
            };
            if (Math.abs(scrollTop) < Math.abs(targetY-(targetY-scrololo)/2.25)) {
              wow_speed = Math.abs(wow_speed*wow_half); 
              good_speed = Math.abs(good_speed*good_half); 
            } else if (Math.abs(scrollTop) > Math.abs(targetY-(targetY-scrololo)/2.25)) {
              wow_speed = Math.abs(wow_speed/wow_half); 
              good_speed = Math.abs(good_speed/good_half);
            };
    
          } else if (scrollTop > targetY){
            if (half_way == 0) {
              half_way = (scrollTop-targetY)*0.30;
            };
            if (Math.abs(scrollTop) > Math.abs(half_way)) {
              wow_speed = Math.abs(wow_speed*wow_half); 
              good_speed = Math.abs(good_speed*good_half); 
            } else if (Math.abs(scrollTop) <= Math.abs(half_way)) {
              wow_speed = Math.abs(wow_speed/wow_half); 
              good_speed = Math.abs(good_speed/good_half);
            } ;

          };
    
            if(wow_speed<minimal_distance){
              wow_speed = minimal_distance;
            }
    
            if(scrollTop<targetY){
              var newScrollTop = scrollTop+wow_speed;
              window.scrollTo(0, newScrollTop);
              if(scrollTop>=targetY-wow_speed){
      
                completeScrollAnimation(link)
              }
            }else if(scrollTop>targetY){
      
              var newScrollTop = scrollTop-wow_speed;
              window.scrollTo(0, newScrollTop);
              if(scrollTop<=targetY+wow_speed){
                completeScrollAnimation(link)
              }
            }else{
              completeScrollAnimation(link)
            }
          },10);
      };

    document.getScroll = function() {
        if (window.pageYOffset != undefined) {
            return [pageXOffset, pageYOffset];
        } else {
            let sx, sy, d = document,
                r = d.documentElement,
                b = d.body;
            sx = r.scrollLeft || b.scrollLeft || 0;
            sy = r.scrollTop || b.scrollTop || 0;
            return [sx, sy];
        }
    }

    window.onscroll = function() {scrollFunction()};

    var header = document.querySelectorAll('header')[0];
    var sticky = 0;
    var lastScrollTop = 0;

    function scrollFunction() {
        if (document.getScroll()[1] >= sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
        var st = document.getScroll()[1];

        if ((st > lastScrollTop) && (st > sticky)){
            header.classList.remove("scroll-up");
        } else {
            header.classList.add("scroll-up");
        }
        lastScrollTop = st;
    };

    //COOKIES
    // function checkForCookies(){
    //   if(window.cookieconsent != undefined) {
    //     window.cookieconsent.initialise({
    //       "palette": {
    //         "popup": {
    //           "background": "#ddd",
    //           "text": "#000"
    //         },
    //         "button": {
    //           "background": "#BF3E38",
    //           "text": "#ffffff"
    //         }
    //       },
    //       'position':'bottom-left',
    //       "content": {
    //         "message": "Serwis internetowy gierek.pl wykorzystuje pliki cookies, które umożliwiają i ułatwiają Ci korzystanie z jego zasobów. Korzystając z serwisu wyrażasz jednocześnie zgodę na wykorzystanie plików cookies.",
    //         "dismiss": "Rozumiem",
    //         "link": "Dowiedz się więcej",
    //         "href": "/ciasteczka"
    //       }
    //     });
    //   }else{
    //     setTimeout(checkForCookies,500);
    //   }
    // }
    // checkForCookies();

    //LAZY LOADING
    function checkForLazy(){
        if (typeof LazyLoad == 'function') {
            myLazyLoad = new LazyLoad({
              elements_selector: ".lazy",
              threshold: 0
          });
        } else{
            setTimeout(checkForLazy,500);
        }
    }
    checkForLazy();

    //BASIC MENU TOGGLE
    var menu = document.getElementsByClassName('menu')[0]; // CHANGE MENU CONTAINER CLASS
    var menu_button = document.getElementsByClassName('menu-button')[0]; // CHANGE MENU TOGGLE BUTTON CLASS
    var menu_button_mobile = document.getElementsByClassName('menu-button-mobile')[0]; // CHANGE MENU TOGGLE BUTTON CLASS
    var darkener = document.getElementsByClassName('darkener')[0];
    if (menu && menu_button && darkener && menu_button_mobile) {
        menu_button.addEventListener('click', () => {
            menu.classList.toggle('is-active');
            menu_button.classList.toggle('is-active');
            darkener.classList.toggle('is-active');
            menu_button_mobile.classList.toggle('is-active');
        });
        menu_button_mobile.addEventListener('click', () => {
          menu.classList.toggle('is-active');
          menu_button.classList.toggle('is-active');
          darkener.classList.toggle('is-active');
          menu_button_mobile.classList.toggle('is-active');
      });
        darkener.addEventListener('click', () => {
          menu.classList.remove('is-active');
          menu_button.classList.remove('is-active');
          darkener.classList.remove('is-active');
          menu_button_mobile.classList.remove('is-active');
        });
    }

    //MOBILE FB LINK
    const isMobile = {
      Android: function() {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
    };
    const fb_link = document.querySelectorAll('.fb')[0];
    if(fb_link) {
      if (isMobile.Android()) {
        fb_link.href = fb_link.dataset.mobileAndroid;
      } else if(isMobile.iOS()) {
        fb_link.href = fb_link.dataset.mobileIos;
      }
    }
}

function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 100);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(viewBasic);