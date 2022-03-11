function viewHome() {
  //variables
  const splideSlides = Array.from(document.getElementsByClassName('splide__slide'));

  //HACKER

  //variables
  const video = document.querySelector('.hacker');
  const text = document.querySelector('.text');
  const answer = document.querySelector('.answer');
  const person = document.querySelector('.person');
  const offerDivs = Array.from(document.getElementsByClassName('offer-div'));
  const pro = document.querySelector('.pro-version');
  const audio = new Audio('https://patrycja.handziuk.pl/public/images/music/nice-music.mp3');
  const siup = new Audio('https://patrycja.handziuk.pl/public/images/music/siup.mp3');
  const szu = new Audio('https://patrycja.handziuk.pl/public/images/music/szu.mp3');
  const klik = new Audio('https://patrycja.handziuk.pl/public/images/music/klik.mp3');
  let firstAbout = true;
  let isPro = false;


  //listeners

  //about
  document.querySelector('.answer-about').addEventListener('click', ()=> {
    if(isPro){
      klik.play();
    }
    video.style.opacity = 0;
    window.setTimeout(()=>{
      video.setAttribute('src', 'https://patrycja.handziuk.pl/public/images/videos/o-mnie.mp4');
      video.play();
      video.style.opacity = 1;
    }, 1000);
 
    if(firstAbout){
      answer.innerHTML = '<p><span>Patka:</span> Cześć, nazywam się Patrycja. Witaj na mojej skromnej stronie.</p>';
      firstAbout = false;
    } else {
      answer.innerHTML = ' <p><span>Patka:</span> Hej, to znowu Ty. Nie szkodzi, opowiem jeszcze raz...</p>';
    }
    hideTextOptions();
    showAnswer();
    window.setTimeout(()=>{
      answer.style.opacity = 0;
    }, 6000);
    window.setTimeout(()=>{
      answer.innerHTML = '<p><span>Patka:</span> Programowanie to moja pasja, która pozwala mi wykorzystywać kreatywność. </p>';
      answer.style.opacity = 1;
    }, 7000);
    window.setTimeout(()=>{
      answer.style.opacity = 0;
    }, 11000);
    window.setTimeout(()=>{
      answer.innerHTML = '<p><span>Patka:</span> Poza tym interesuję się najnowszymi technologiami, jeżdżę na deskorolce, od czasu do czasu coś namaluję, albo zaprojektuje wydruk 3D.</p>';
      answer.style.opacity = 1;
    }, 12000);
    window.setTimeout(()=>{
      answer.style.opacity = 0;
    }, 18000);

    window.setTimeout(()=>{
      answer.innerHTML = '<p><span>Patka:</span> Wracam do pracy. Nie zapomnij sprawdzić moich realizacji, które znajdziesz poniżej.</p>';
      answer.style.opacity = 1;
      document.querySelectorAll('.scroll-div').forEach(div =>{
        div.style.display ='block';
      });
    }, 19000);

    window.setTimeout(()=>{
      answer.style.opacity = 0;
    }, 24000);

    window.setTimeout(()=>{
      statykBack();
      hideAnswer();
      showTextOptions();
    }, 27000)
  })

  //bussy 
  document.querySelector('.answer-bussy').addEventListener('click', ()=> {
    if(isPro){
      klik.play();
    }
    answer.innerHTML = ' <p><span>Patka:</span> To co robię tylko wygląda tak poważnie, nie krępuj się, pytaj o co chcesz. </p>';
    hideTextOptions();
    showAnswer();
    window.setTimeout(()=>{
      hideAnswer();
      showTextOptions();
    }, 7000)
  })

  //wares
  document.querySelector('.answer-wares').addEventListener('click', ()=> {
    if(isPro){
      klik.play();
    }
    video.style.opacity = 0;
    window.setTimeout(()=>{
      video.setAttribute('src', 'https://patrycja.handziuk.pl/public/images/videos/towary-in.mp4');
      video.play();
      video.style.opacity = 1;
    }, 1000);
    hideTextOptions();
    window.setTimeout(()=>{
      Array.from(document.getElementsByClassName('scene-1')).forEach( p =>{
        p.style.display = "none";
      })
      Array.from(document.getElementsByClassName('scene-3')).forEach( p =>{
        p.style.display = "none";
      })
      Array.from(document.getElementsByClassName('scene-2')).forEach( p =>{
        if(!p.classList.contains("activated")){
          p.style.display = "block";
        }
      })
      offerDivs.forEach(div =>{
        div.style.display = "flex";
      })
      window.setTimeout(()=>{
        offerDivs[0].style.opacity = 1;
      }, 1000);
      window.setTimeout(()=>{
        offerDivs[1].style.opacity = 1;
        showTextOptions();
      }, 4000);
    }, 5500);
    window.setTimeout(()=>{
      video.setAttribute('src', 'https://patrycja.handziuk.pl/public/images/videos/towary.mp4');
      video.play();
    }, 6000);
  })

  //next 
  document.querySelector('.answer-next').addEventListener('click', ()=>{
    if(isPro){
      klik.play();
    }
    hideTextOptions();
    video.setAttribute('src', 'https://patrycja.handziuk.pl/public/images/videos/towary-out.mp4');
    video.play();
    offerDivs.forEach(div =>{
      div.style.opacity = 0;
      window.setTimeout(()=>{
        div.style.display = "none";
        Array.from(document.getElementsByClassName('scene-1')).forEach( p =>{
          p.style.display = "block";
        })
        Array.from(document.getElementsByClassName('scene-2')).forEach( p =>{
          p.style.display = "none";
        })
      }, 1000);
      window.setTimeout(()=>{
        statykBack();
        showTextOptions();
      }, 6500);
    })
  })

  //pro
  const proButtons = [document.querySelector('.answer-pro'), document.querySelector('.activate-pro')];
  proButtons.forEach( button =>{
    if(isPro){
      klik.play();
    }
    button.addEventListener('click', function(){
      video.setAttribute('src', 'https://patrycja.handziuk.pl/public/images/videos/towary-out.mp4');
      video.play();
      hideTextOptions();
      answer.innerHTML = ' <p><span>Patka:</span> Dobry wybór! </p>';
      showAnswer();
      window.setTimeout(()=>{
        hideAnswer();
        pro.style.opacity = 1;
        console.log(this);
        document.querySelector('.answer-pro').classList.add('activated');
        isPro = true;
      }, 4000);
      window.setTimeout(()=>{
        pro.style.transform = 'translateX(-120%)';
      }, 6000);
  
      offerDivs.forEach(div =>{
        div.style.opacity = 0;
        window.setTimeout(()=>{
          div.style.display = "none";
          Array.from(document.getElementsByClassName('scene-1')).forEach( p =>{
            p.style.display = "block";
          })
          Array.from(document.getElementsByClassName('scene-3')).forEach( p =>{
            console.log(p);
            p.style.display = "block";
          })
          Array.from(document.getElementsByClassName('scene-2')).forEach( p =>{
            p.style.display = "none";
          })
        }, 1000);
        window.setTimeout(()=>{
          statykBack();
          showTextOptions();
          document.querySelector('.activate-pro').innerHTML = "Aktywowano";
          document.querySelector('.activate-pro').style.filter = "grayscale(100%)";
          document.querySelector('.activate-pro').style.pointerEvents= "none";
          audio.play();
          audio.volume = 0.2;
          audio.loop = true;
        }, 5500);
      })
    })
  })

  //duck 
  document.querySelector('.answer-duck').addEventListener('click', ()=>{
    if(isPro){
      klik.play();
    }
    hideTextOptions();
    video.style.opacity = 0;
    window.setTimeout(()=>{
      video.setAttribute('src', 'https://patrycja.handziuk.pl/public/images/videos/kaczuszka.mp4');
      video.play();
      video.style.opacity = 1;
    }, 1000);
    answer.innerHTML = ' <p><span>Patka:</span> Tak.</p>';
    window.setTimeout(()=>{
      showAnswer();
    }, 6000);
    window.setTimeout(()=>{
      hideAnswer();
    }, 11000);

    window.setTimeout(()=>{
      hideAnswer();
      statykBack();
      showTextOptions();
    }, 19000);
    
  })

  //scrolldiv 
  document.querySelectorAll('.scroll-div').forEach(div =>{
    div.addEventListener('click', ()=>{
      if(isPro){
        szu.play();
      }
    })
  });

  //functions
  window.onload = function() {
    video.play();
  };

  function statykBack(){
    video.style.opacity = 0;
    window.setTimeout(()=>{
      video.setAttribute('src', 'https://patrycja.handziuk.pl/public/images/videos/statyk.mp4');
      video.play();
      video.style.opacity = 1;
    }, 1000);
  }

  function hideTextOptions(){
    text.style.pointerEvents = "none";
    person.style.opacity = 0;
    text.style.opacity = 0;
    window.setTimeout(()=>{
      person.style.display = "none";
      text.style.display = "none";
    }, 1000);
  }

  function showTextOptions(){
    text.style.pointerEvents = "auto";
    window.setTimeout(()=>{
      person.style.display = "block";
      text.style.display = "block";
  }, 1010);
    window.setTimeout(()=>{
      person.style.opacity = 1;
      text.style.opacity = 1;
    }, 2000);
  }

  function showAnswer(){
    window.setTimeout(()=>{
      answer.style.display = "block";
    }, 1010);
    window.setTimeout(()=>{
      answer.style.opacity = 1;
    }, 2000);
  }

  function hideAnswer(){
    answer.style.opacity = 0;
    window.setTimeout(()=>{
      answer.style.display = "none";
    }, 1000);
  }



  //CHECKING FUNCTIONS
  function checkSplide() {
    if(typeof Splide == 'function') {
      splideReady();
    } else {
      setTimeout(checkSplide(),500);
    };
  };
  checkSplide();

  function splideReady() {
    const splideWeb = new Splide( '#web-splide', {
      type   : 'loop',
      autoplay : true,
      pagination : false,
      lazyLoad : 'nearby',
      perMove: 1,
      perPage: 3,
      gap: 50,
      interval: 8000,
      arrowPath: "M13.1729 36.6541L23.7125 19.8271L13.1729 3L30 19.8271L13.1729 36.6541Z",
      focus : 'center',
      breakpoints: {
        780: {
          perPage: 1,
        },
      }
    } ).mount();

    if (splideSlides[0].querySelector("video").play() !== undefined) {
      splideSlides[0].querySelector("video").play().then(function() {
        // Automatic playback started!
      }).catch(function(error) {
        // Automatic playback failed.
        // Show a UI element to let the user manually start playback.
      });
    }
    splideWeb.on ('move'  , index => {
      splideSlides.forEach(splide =>{
        splide.querySelector("video").pause();
      });
      // splideSlides[index].querySelector('video').play();
      if (splideSlides[index].querySelector("video").play() !== undefined) {
        splideSlides[index].querySelector("video").play().then(function() {
          // Automatic playback started!
        }).catch(function(error) {
          // Automatic playback failed.
          // Show a UI element to let the user manually start playback.
        });
      }
    });

    
  document.querySelectorAll('.splide__arrow').forEach(div =>{
    div.addEventListener('click', ()=>{
      if(isPro){
        siup.play();
      }
    })
  });
  }
}
docReady(viewHome);