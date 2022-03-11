var app=new Vue({el:"#cinemas",methods:{move(e){var i=document.querySelector(".days"),t=Math.trunc(i.scrollWidth/this.days.length),a=0;if("forward"==e){var s=setInterval(()=>{i.scrollLeft+=1,(a+=1)==t+1&&(window.clearInterval(s),i.scrollWidth-i.clientWidth==i.scrollLeft&&(this.right_arrow_disabled=!0))},1);this.left_arrow_disabled=!1}else if("back"==e){s=setInterval(()=>{i.scrollLeft-=1,-1*(a-=1)==t+1&&(window.clearInterval(s),0==i.scrollLeft&&(this.left_arrow_disabled=!0))},1);this.right_arrow_disabled=!1}},activate(e){for(var i=0;i<this.days.length;i++)this.days[i].active=!1;e.active=!e.active,window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:"activateDay",action:"activatedDay"})},dragscrollCheck(e){var i=document.querySelector(".days");0==i.scrollLeft?this.left_arrow_disabled=!0:this.left_arrow_disabled=!1,i.scrollWidth-i.clientWidth==i.scrollLeft?this.right_arrow_disabled=!0:this.right_arrow_disabled=!1},specificCinemas(e,i){for(var t=0;t<this.days.length;t++)for(var a=0;a<this.days[t].cinemas.length;a++)i?this.days[t].cinemas[a].displayed=!0:this.days[t].cinemas[a].siec==e?this.days[t].cinemas[a].displayed=!0:this.days[t].cinemas[a].displayed=!1},normalize_string:e=>e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=e.replace("ó","o")).replace("Ó","O")).replace("ł","l")).replace("Ł","L")).replace("ń","n")).replace("Ń","N")).replace("ż","z")).replace("Ż","Z")).replace("ź","z")).replace("Ź","Z")).replace("Ć","C")).replace("ć","c")).replace("ę","e")).replace("Ę","E")).replace("Ś","S")).replace("ś","s"),picker(e){switch(e){case"multikino":if(this.cinema_city=!1,this.helios=!1,this.inne=!1,0!=this.multikino)return this.multikino=!1,void this.specificCinemas(e,!0);this.multikino=!0;break;case"cinema-city":if(this.multikino=!1,this.helios=!1,this.inne=!1,0!=this.cinema_city)return this.cinema_city=!1,void this.specificCinemas(e,!0);this.cinema_city=!0;break;case"helios":if(this.cinema_city=!1,this.multikino=!1,this.inne=!1,0!=this.helios)return this.helios=!1,void this.specificCinemas(e,!0);this.helios=!0;break;case"inne":if(this.cinema_city=!1,this.helios=!1,this.multikino=!1,0!=this.inne)return this.inne=!1,void this.specificCinemas(e,!0);this.inne=!0}this.specificCinemas(e,!1)},getData(e){this.search.length&&38!==e.keyCode&&40!==e.keyCode&&13!==e.keyCode&&(this.search_data=[],axios.post("/api/cities/get",{query:this.search}).then(e=>{var t=e.data;for(this.search_data=t,i=0;i<e.data.length;i++)this.normalize_string(this.search.toLowerCase())==e.data[i].search_name?(this.is_loaded=!1,this.used_localization=!1,this.default_city=e.data[i].miasto_id,this.prepData()):this.search==e.data[i].name?(this.is_loaded=!1,this.used_localization=!1,this.default_city=e.data[i].miasto_id,this.prepData()):this.search==e.data[i].new_name&&(this.is_loaded=!1,this.used_localization=!1,this.default_city=e.data[i].miasto_id,this.prepData())}),this.focus=0)},hideAutocomplete(){setTimeout(()=>{this.autocomplete_show=!1,this.focus=0},100)},getName(e){e.new_name?this.search=e.new_name:this.search=e.name,this.is_loaded=!1,this.used_localization=!1,this.default_city=e.miasto_id,this.prepData(),this.search_data=[],this.focus=0,window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:"searchCity"})},prepData(e=null,i=null,t=null){let a=[],s=["ND","PN","WT","ŚR","CZW","PT","SB"],n=["styczeń","luty","marzec","kwieciń","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"];const l=new Date;let o=new URLSearchParams(window.location.search),h=!1;for(var r=0;r<14;r++){let e=new Date;e.setDate(l.getDate()+r);let i=!1;o.has("data")&&o.get("data").replace(".","/")>l.toLocaleDateString("en-GB")?e.toLocaleDateString("en-GB")==o.get("data").replaceAll(".","/")&&(i=!0,h=!0):t&&t>l.toLocaleDateString("en-GB")?e.toLocaleDateString("en-GB")==t&&(i=!0,h=!0):0==r&&(i=!0,h=!0),13!=r||h||(a[0].active=!0),a[r]={date:e.toLocaleDateString(),display_date:e.getDate()+" "+n[e.getMonth()],day:s[e.getDay()],active:i,empty:!0,cinemas:[]}}axios.post("/api/cinemas/get",{query:this.default_city,lat:e,long:i}).then(e=>{this.cinemas_list=e.data,this.cinemas_list.length?this.cinemas_list[1]?this.default_city=this.cinemas_list[1].city_id:this.default_city=this.cinemas_list[0].city_id:this.default_city=0}).then(e=>{axios.post("/api/showtimes/get",{default_city:this.default_city}).then(e=>{for(let s=0;s<a.length;s++)for(let n=0;n<this.cinemas_list.length;n++){let l=[],o="inne";if(this.cinemas_list[n].name.includes("Multikino")?o="multikino":this.cinemas_list[n].name.includes("Cinema City")?o="cinema-city":this.cinemas_list[n].name.includes("Helios")&&(o="helios"),e.data.showtimes.length)for(let i=0;i<e.data.showtimes.length;i++)if(this.cinemas_list[n].kino_id==e.data.showtimes[i].cinema_id&&a[s].date==new Date(e.data.showtimes[i].start_at).toLocaleDateString())if(new Date<new Date(e.data.showtimes[i].start_at)||(new Date).toLocaleTimeString()<new Date(e.data.showtimes[i].start_at).toLocaleTimeString()){let t="";t=e.data.showtimes[i].booking_link?e.data.showtimes[i].booking_link:this.cinemas_list[n].website,l.push({hour:new Date(e.data.showtimes[i].start_at).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}),date:new Date(e.data.showtimes[i].start_at).toLocaleDateString(),link:t}),a[s].empty=!1,0==s&&this.unpassed_showtimes.push(new Date(e.data.showtimes[i].start_at).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}))}else 0!=s||t||this.passed_showtimes.push(new Date(e.data.showtimes[i].start_at).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}));if(l.length>0){var i={id:this.cinemas_list[n].kino_id,name:this.cinemas_list[n].name,address:this.cinemas_list[n].adres,siec:o,displayed:!0,seanse:l};a[s].cinemas.push(i)}}if(0==this.cinemas_list.length)return this.default_city=24759,this.default_warsaw=!0,this.used_localization=!1,this.prepData(null,null),0;if(this.passed_showtimes.length>0&&0==this.unpassed_showtimes.length){var s=new Date;return s.setDate(s.getDate()+1),s=s.toLocaleDateString("en-GB"),this.passed_showtimes=[],this.prepData(null,null,s),0}this.days=a,this.main_visible=!0,this.is_loaded=!0})})},clickShowTime(e,i){if(e.preventDefault(),window.fbq("track","InitiateCheckout"),window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:"showTimeClick"}),e.target.href)var t=e.target.href;else if(e.target.parentNode.href)t=e.target.parentNode.href;null==t&&""==t||window.open(t,"_blank")},test(e){switch(e.keyCode){case 38:e.preventDefault(),null===this.focus?this.focus=0:this.focus>0&&this.focus--;break;case 40:e.preventDefault(),null===this.focus?this.focus=0:this.focus<this.search_data.length-1&&this.focus++;break;case 13:var i=document.getElementsByClassName("focus")[0];i&&(i.click(),this.focus)}}},async mounted(){navigator.geolocation.getCurrentPosition(e=>{this.used_localization=!0,this.prepData(e.coords.latitude,e.coords.longitude)},e=>{console.log(e.message),this.prepData()})},created(){},data:{passed_showtimes:[],unpassed_showtimes:[],focus:null,default_city:24759,cinemas_list:[],last_scroll:0,main_visible:!1,autocomplete_show:!1,used_localization:!1,selectedItem:null,isActive:!1,left_arrow_disabled:!0,right_arrow_disabled:!1,transformVar:0,multikino:!1,cinema_city:!1,helios:!1,inne:!1,is_loaded:!1,default_warsaw:!1,picked:"",search:"",search_data:[],lat:52.2469776,long:21.0162941,cinemas:[],days:[],old_days:[{date:"21 czerwca",day:"PN",active:!0,cinemas:[{name:"MULTIKINO WARSZAWA BEMOWO",address:"Ulica Powstancow Slaskich 126 A, Warszawa, POL.MZ",siec:"multikino",displayed:!0,seanse:[{hour:"18:40",link:"#"},{hour:"19:30",link:"#"},{hour:"20:45",link:"#"},{hour:"20:45",link:"#"},{hour:"20:45",link:"#"},{hour:"18:40",link:"#"},{hour:"19:30",link:"#"},{hour:"20:45",link:"#"},{hour:"20:45",link:"#"},{hour:"20:45",link:"#"}]},{name:"CINEMA CITY WARSZAWA ARKADIA",address:"Aleja Jana Pawła II 82, Warszawa, POL.MZ",siec:"cinema-city",displayed:!0,seanse:{1:{hour:"18:40",link:"#"},2:{hour:"19:30",link:"#"},3:{hour:"20:45",link:"#"}}},{name:"HELIOS WARSZAWA ARKADIA",address:"Aleja Jana Pawła II 82, Warszawa, POL.MZ",siec:"helios",displayed:!0,seanse:{1:{hour:"18:40",link:"#"},2:{hour:"19:30",link:"#"},3:{hour:"20:45",link:"#"}}},{name:"INNE KINO WARSZAWA BEMOWO",address:"Ulica Powstancow Slaskich 126 A, Warszawa, POL.MZ",siec:"inne",displayed:!0,seanse:{1:{hour:"18:40",link:"#"},2:{hour:"19:30",link:"#"},3:{hour:"20:45",link:"#"},4:{hour:"20:45",link:"#"},5:{hour:"20:45",link:"#"}}},{name:"CINEMA CITY WARSZAWA ARKADIA",address:"Aleja Jana Pawła II 82, Warszawa, POL.MZ",siec:"cinema-city",displayed:!0,seanse:{1:{hour:"18:40",link:"#"},2:{hour:"19:30",link:"#"},3:{hour:"20:45",link:"#"}}},{name:"MULTIKINO WARSZAWA ARKADIA",address:"Aleja Jana Pawła II 82, Warszawa, POL.MZ",siec:"multikino",displayed:!0,seanse:{1:{hour:"18:40",link:"#"},2:{hour:"19:30",link:"#"},3:{hour:"20:45",link:"#"}}}]}]}});