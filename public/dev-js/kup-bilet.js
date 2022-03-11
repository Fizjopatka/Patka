var app = new Vue({
    el: '#cinemas',
    methods: {
      move(way) {
        var content = document.querySelector(".days");
        var jump = Math.trunc(content.scrollWidth/this.days.length);
        var scrolled = 0;
        if (way == "forward") {
          var slideTimer = setInterval(() => {
            content.scrollLeft += 1;
            scrolled += 1;
            if (scrolled == (jump+1)) {
              window.clearInterval(slideTimer);
              if (content.scrollWidth-content.clientWidth == content.scrollLeft) {
                this.right_arrow_disabled = true;
              }
            }
          }, 1);
          this.left_arrow_disabled = false;
        } else if (way == "back") {
          var slideTimer = setInterval(() => {
            content.scrollLeft -= 1;
            scrolled -= 1;
            if ((scrolled*-1) == (jump+1)) {
              window.clearInterval(slideTimer);
              if(content.scrollLeft == 0) {
                this.left_arrow_disabled = true;
              }
            }
          }, 1);
          this.right_arrow_disabled = false;
        }
      },
      activate(day) {
        for (var i=0; i<this.days.length; i++) {
          this.days[i].active = false;
        }
        day.active = !day.active;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event':"activateDay",
          'action': "activatedDay"
        })
      },
      dragscrollCheck(delta) {
        var content = document.querySelector(".days");
        if (content.scrollLeft == 0) {
          this.left_arrow_disabled = true;
        } else {
          this.left_arrow_disabled = false;
        }

        if (content.scrollWidth-content.clientWidth == content.scrollLeft) {
          this.right_arrow_disabled = true;
        } else {
          this.right_arrow_disabled = false;
        }
      },
      specificCinemas(cinema, all) {
        for(var i=0; i<this.days.length; i++) {
          for (var j=0; j<this.days[i].cinemas.length; j++) {
            if(all) {
                this.days[i].cinemas[j].displayed = true;
            } else {
              if (this.days[i].cinemas[j].siec == cinema) {
                this.days[i].cinemas[j].displayed = true;
              } else {
                this.days[i].cinemas[j].displayed = false;
              }
            }
          }
        }
      },
      normalize_string(normalized) {
        normalized = normalized.replace("ó","o");
        normalized = normalized.replace("Ó","O");
        normalized = normalized.replace("ł","l");
        normalized = normalized.replace("Ł","L");
        normalized = normalized.replace("ń","n");
        normalized = normalized.replace("Ń","N");
        normalized = normalized.replace("ż","z");
        normalized = normalized.replace("Ż","Z");
        normalized = normalized.replace("ź","z");
        normalized = normalized.replace("Ź","Z");
        normalized = normalized.replace("Ć","C");
        normalized = normalized.replace("ć","c");
        normalized = normalized.replace("ę","e");
        normalized = normalized.replace("Ę","E");
        normalized = normalized.replace("Ś","S");
        normalized = normalized.replace("ś","s");
        return normalized
      },

      picker(cinema) {

        switch(cinema) {
          case "multikino":
            this.cinema_city = false;
            this.helios = false;
            this.inne = false;
            if (this.multikino == false) {
              this.multikino = true;
            } else {
              this.multikino = false;
              this.specificCinemas(cinema, true);
              return;
            }

          break;
          case "cinema-city":
            this.multikino = false;
            this.helios = false;
            this.inne = false;
            if (this.cinema_city == false) {
              this.cinema_city = true;
            } else {
              this.cinema_city = false;
              this.specificCinemas(cinema, true);
              return;
            }
          break;
          case "helios":
            this.cinema_city = false;
            this.multikino = false;
            this.inne = false;
            if (this.helios == false) {
              this.helios = true;
            } else {
              this.helios = false;
              this.specificCinemas(cinema, true);
              return;
            }
          break;
          case "inne":
            this.cinema_city = false;
            this.helios = false;
            this.multikino = false;
            if (this.inne == false) {
              this.inne = true;
            } else {
              this.inne = false;
              this.specificCinemas(cinema, true);
              return;
            }
          break;
        }
        this.specificCinemas(cinema, false);
      },
      getData(event){
        if (this.search.length /*>= 3*/) {
          if (event.keyCode !== 38 && event.keyCode !== 40 && event.keyCode !== 13) {
            this.search_data = [];
            axios.post('/api/cities/get', {
              query:this.search
            }).then(response => {
              var search_new = response.data;
              this.search_data = search_new;
  
              for(i=0; i<response.data.length; i++) {
                if(this.normalize_string(this.search.toLowerCase()) == response.data[i].search_name) {
                  this.is_loaded = false;
                  this.used_localization = false;
                  this.default_city = response.data[i].miasto_id;
                  this.prepData();
                } else if (this.search == response.data[i].name) {
                  this.is_loaded = false;
                  this.used_localization = false;
                  this.default_city = response.data[i].miasto_id;
                  this.prepData();
                } else if (this.search == response.data[i].new_name) {
                  this.is_loaded = false;
                  this.used_localization = false;
                  this.default_city = response.data[i].miasto_id;
                  this.prepData();
                }
              }
            });
            this.focus = 0;
          } 
        }
      },
      hideAutocomplete() {
        setTimeout(() => {
          this.autocomplete_show = false;
          this.focus = 0;
        }, 100)
      },
      getName(data){
        if(data.new_name) {
          this.search = data.new_name;
        } else {
          this.search = data.name;
        }
        this.is_loaded = false;
        this.used_localization = false;
        this.default_city = data.miasto_id;
        this.prepData();
        this.search_data = [];
        this.focus = 0;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event':"searchCity"
        });
      },

      prepData(lat=null, long=null, js_data=null) {
        let days_prep = [];
        let weekday = ['ND', 'PN', 'WT', 'ŚR', 'CZW', 'PT', 'SB'];
        let months = ['styczeń', 'luty', 'marzec', 'kwieciń', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
        const today = new Date();
        let urlParams = new URLSearchParams(window.location.search);
        let any_active = false;
        for (var i=0; i<14; i++) {
          let tomorrow =  new Date();
          tomorrow.setDate(today.getDate() + i);
          let active = false;
          if (urlParams.has('data') && urlParams.get('data').replace('.', '/') > today.toLocaleDateString('en-GB')){
            if (tomorrow.toLocaleDateString('en-GB') == urlParams.get('data').replaceAll('.', '/')) {
              active = true;
              any_active = true;
            } 
          } else if (js_data && js_data > today.toLocaleDateString('en-GB')) {
            if (tomorrow.toLocaleDateString('en-GB') == js_data) {
              active = true;
              any_active = true;
            }
          } else if (i==0) {
            active = true;
            any_active = true;
          }

          if (i==13 && !any_active) {
            days_prep[0].active = true;
          }
          
          days_prep[i] = {
            'date': tomorrow.toLocaleDateString(),
            'display_date': tomorrow.getDate() + " " + months[tomorrow.getMonth()],
            'day': weekday[tomorrow.getDay()],
            'active': active,
            'empty': true,
            'cinemas': []
          };
        } 
        axios.post('/api/cinemas/get', {
          query: this.default_city,
          lat: lat,
          long: long
        }).then(response => {
          this.cinemas_list = response.data;
          if(this.cinemas_list.length) {
            if (this.cinemas_list[1]) {
              this.default_city = this.cinemas_list[1].city_id;
            } else {
              this.default_city = this.cinemas_list[0].city_id;
            }
          } else {
            this.default_city = 0;
          }
          
        }).then(res => {
          axios.post('/api/showtimes/get', {
            default_city: this.default_city
          }).then(response => {
            for (let k=0; k<days_prep.length; k++) {  
              for (let i=0; i<this.cinemas_list.length; i++) {
                let seanse = [];
                let siec = "inne";
                if(this.cinemas_list[i].name.includes('Multikino')) {
                  siec = 'multikino';
                } else if (this.cinemas_list[i].name.includes('Cinema City')) {
                  siec = 'cinema-city';
                } else if (this.cinemas_list[i].name.includes('Helios')) {
                  siec = 'helios';
                }
                //this.unpassed_showtimes = [];
                //this.passed_showtimes = []
                if (response.data.showtimes.length) {
                  for (let j=0; j<response.data.showtimes.length; j++) {
                    if(this.cinemas_list[i].kino_id == response.data.showtimes[j].cinema_id) {
                      if(days_prep[k].date == new Date(response.data.showtimes[j].start_at).toLocaleDateString()) {
                        if (new Date() < new Date(response.data.showtimes[j].start_at) || 
                            new Date().toLocaleTimeString() < new Date(response.data.showtimes[j].start_at).toLocaleTimeString()) {
                              let linkacz = "";
                              if (response.data.showtimes[j].booking_link) {
                                linkacz = response.data.showtimes[j].booking_link;
                              } else {
                                linkacz = this.cinemas_list[i].website;
                              }
                          seanse.push({
                            hour: new Date(response.data.showtimes[j].start_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                            date: new Date(response.data.showtimes[j].start_at).toLocaleDateString(),
                            link: linkacz
                          })
                          days_prep[k].empty = false;
                          if (k==0) {
                            this.unpassed_showtimes.push(new Date(response.data.showtimes[j].start_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
                          }
                        } else if (k==0 && !js_data) {
                          this.passed_showtimes.push(new Date(response.data.showtimes[j].start_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
                        }
                      }
                    }
                  }
                }
                if (seanse.length > 0) {
                  var cinema = {
                    'id': this.cinemas_list[i].kino_id,
                    'name': this.cinemas_list[i].name,
                    'address': this.cinemas_list[i].adres,
                    'siec': siec,
                    'displayed': true,
                    'seanse': seanse
                  };
                  days_prep[k].cinemas.push(cinema);
                }
              }
            }
              if (this.cinemas_list.length == 0) {
                this.default_city = 24759;
                this.default_warsaw = true;
                this.used_localization = false;
                this.prepData(null, null);
                return 0;
              }

              if (this.passed_showtimes.length > 0 && this.unpassed_showtimes.length == 0) {
                var new_js_data = new Date();
                new_js_data.setDate(new_js_data.getDate() + 1);
                new_js_data = new_js_data.toLocaleDateString('en-GB');
                this.passed_showtimes = [];
                this.prepData(null, null, new_js_data);
                return 0;
              }
              this.days = days_prep;
              this.main_visible = true;
              this.is_loaded = true;
          })
        });
      },
      clickShowTime(e, seans){
        e.preventDefault();
        window.fbq('track', 'InitiateCheckout');
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
         'event': 'showTimeClick'
         });
         if (e.target.href) {
           var href = e.target.href;
         } else if (e.target.parentNode.href){
            var href = e.target.parentNode.href;
         }
        if(href!=undefined || href!=''){
          window.open(href,'_blank');
        }
      },
      test(event) {
        //console.log(event);
        switch (event.keyCode) {
          case 38:
            event.preventDefault();
            if (this.focus === null) {
              this.focus = 0;
            } else if (this.focus > 0) {
              this.focus--;
            }
            break;
          case 40:
            event.preventDefault();
            if (this.focus === null) {
              this.focus = 0;
            } else if (this.focus < this.search_data.length - 1) {
              this.focus++;
            }
            break;
          case 13: 
            var hightlighted = document.getElementsByClassName('focus')[0];
            if (hightlighted) {
              hightlighted.click();
              this.focus == 0;
            }
          break;
        }
      }
        // mistrz id = 97766
    }, //59140
    async mounted() {

      navigator.geolocation.getCurrentPosition(
        position => {
          this.used_localization = true;
          this.prepData(position.coords.latitude, position.coords.longitude);
        },
        error => {
           console.log(error.message);
           this.prepData();
        },
     );

    },
    created() {

    },
    data: {
      passed_showtimes: [],
      unpassed_showtimes: [],
      focus: null,
      default_city: 24759,
      cinemas_list: [],
      last_scroll: 0,
      main_visible: false,
      autocomplete_show: false,
      used_localization: false,
      selectedItem: null,
      isActive: false,
      left_arrow_disabled: true,
      right_arrow_disabled: false,
      transformVar: 0,
      multikino: false,
      cinema_city: false,
      helios: false,
      inne: false,
      is_loaded: false,
      default_warsaw: false,
      picked: '',
      search: '',
      search_data:[],
      lat: 52.2469776,
      long: 21.0162941,
      cinemas: [],
      days: [],
      old_days: [
          {
          date: "21 czerwca",
          day: "PN",
          active: true,
          cinemas: [
            {
              name: "MULTIKINO WARSZAWA BEMOWO",
              address: "Ulica Powstancow Slaskich 126 A, Warszawa, POL.MZ",
              siec: "multikino",
              displayed: true,
              seanse: [
                {
                  hour: "18:40",
                  link: "#"
                },
                {
                  hour: "19:30",
                  link: "#"
                },
                {
                  hour: "20:45",
                  link: "#"
                },
                {
                  hour: "20:45",
                  link: "#"
                },
                {
                  hour: "20:45",
                  link: "#"
                },
                {
                  hour: "18:40",
                  link: "#"
                },
                {
                  hour: "19:30",
                  link: "#"
                },
                {
                  hour: "20:45",
                  link: "#"
                },
                {
                  hour: "20:45",
                  link: "#"
                },
                {
                  hour: "20:45",
                  link: "#"
                }
              ]
            },
            {
              name: "CINEMA CITY WARSZAWA ARKADIA",
              address: "Aleja Jana Pawła II 82, Warszawa, POL.MZ",
              siec: "cinema-city",
              displayed: true,
              seanse: {
                1: {
                  hour: "18:40",
                  link: "#"
                },
                2: {
                  hour: "19:30",
                  link: "#"
                },
                3: {
                  hour: "20:45",
                  link: "#"
                }
              }
            },
            {
              name: "HELIOS WARSZAWA ARKADIA",
              address: "Aleja Jana Pawła II 82, Warszawa, POL.MZ",
              siec: "helios",
              displayed: true,
              seanse: {
                1: {
                  hour: "18:40",
                  link: "#"
                },
                2: {
                  hour: "19:30",
                  link: "#"
                },
                3: {
                  hour: "20:45",
                  link: "#"
                }
              }
            },
            {
              name: "INNE KINO WARSZAWA BEMOWO",
              address: "Ulica Powstancow Slaskich 126 A, Warszawa, POL.MZ",
              siec: "inne",
              displayed: true,
              seanse: {
                1: {
                  hour: "18:40",
                  link: "#"
                },
                2: {
                  hour: "19:30",
                  link: "#"
                },
                3: {
                  hour: "20:45",
                  link: "#"
                },
                4: {
                  hour: "20:45",
                  link: "#"
                },
                5: {
                  hour: "20:45",
                  link: "#"
                }
              }
            },
            {
              name: "CINEMA CITY WARSZAWA ARKADIA",
              address: "Aleja Jana Pawła II 82, Warszawa, POL.MZ",
              siec: "cinema-city",
              displayed: true,
              seanse: {
                1: {
                  hour: "18:40",
                  link: "#"
                },
                2: {
                  hour: "19:30",
                  link: "#"
                },
                3: {
                  hour: "20:45",
                  link: "#"
                }
              }
            },
            {
              name: "MULTIKINO WARSZAWA ARKADIA",
              address: "Aleja Jana Pawła II 82, Warszawa, POL.MZ",
              siec: "multikino",
              displayed: true,
              seanse: {
                1: {
                  hour: "18:40",
                  link: "#"
                },
                2: {
                  hour: "19:30",
                  link: "#"
                },
                3: {
                  hour: "20:45",
                  link: "#"
                }
              }
            }
          ]
        }
      ]
    }
  })
