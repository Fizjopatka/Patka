<?php 

// GENERATE IMAGE TAG WITH LAZYLOADING 
if ( ! function_exists('c_img')) { 
    function c_img($url, $id = null, $classes = null, $alt="") {
        if ($url !== "") {
            try {
                list($width, $height) = getimagesize(base_url('/images/'.$url));
            } catch (Exception $e){
                return $e->getMessage(); 
            }

            if(isset($width) && isset($height)) {
                if ($id == null) {
                    $d_id = "";
                } else {
                    $d_id = 'id="'.$id.'"';
                }
                if ($classes == null) {
                    $classes = "";
                }
                $dataSrc = 'data-src';
            $dataSrcSet = 'data-srcset';
            $isSplide= false;
            $lazy = 'lazy ';
            if($classes == true){ //need add 'isSplide' class for correctly display sliders from SplideJS API
              $newc = explode(" ", $classes);
              foreach($newc as $string){
                if($string == 'isSplide'){
                  $dataSrc = 'data-splide-lazy';
                  $dataSrcSet = 'data-splide-lazy-srcset';
                }
                if($string == 'noLazy'){
                  $lazy = '';
                  $dataSrc = 'src';
                  $dataSrcSet = 'srcset';
                }
              }
            }
                $image_element = '<img class="lazy '.$classes.'" '.$d_id.' width="'.$width.'" height="'.$height.'" '.$dataSrc.'="'.base_url().'/images/'.$url.'" alt="'.$alt.'">';
                return $image_element;
            }
        } else {
            return 'Error: image not found';
        }
    }
}

// GENERATE LITE YT TAG BY VIDEO LINK/ID
if ( ! function_exists('c_yt')) {
    function c_yt($url="", $class="", $params="") {
        if (isset($url) && $url !== '') {
            $vid_id = "";
            parse_str( parse_url( $url, PHP_URL_QUERY ), $vars );
            if (!empty($vars['v'])) {
                $vid_id = $vars['v'];
            } else {
                $vid_id = $url;
            }

            return '<lite-youtube videoid="'.$vid_id.'" params="'.$params.'" playlabel="Play: Keynote (Google I/O \'18)" class="'.$class.'"></lite-youtube>';
        } else {
            return 'c_yt error: wrong url';
        }
    }
}

// USUWANIE SIEROTEK
if ( ! function_exists('add_nbsp')) {
    function add_nbsp($title){
        $title = preg_replace('/ ([a-zA-Z0-9]{1}) /', " $1&nbsp;", $title);
        return preg_replace('/\>([a-zA-Z0-9]{1}) /', ">$1&nbsp;", $title);
    }
}

if ( ! function_exists('cut_str')) {
    function cut_str($string, $your_desired_width) {
        $parts = preg_split('/([\s\n\r]+)/', $string, -1, PREG_SPLIT_DELIM_CAPTURE);
        $parts_count = count($parts);
        $length = 0;
        $last_part = 0;
        for (; $last_part < $parts_count; ++$last_part) {
          $length += strlen($parts[$last_part]);
          if ($length > $your_desired_width) { break; }
        }
        return implode(array_slice($parts, 0, $last_part));
      }
}

// INCLUDE PLIKU CSS NA PODSTAWIE NAZWY PLIKU WIDOKU
if ( ! function_exists('addit_css')) {
    function addit_css($page, $exept = []) {
        if ( is_file(ROOTPATH.'public/css/'.$page.'.css')) {
            if (!empty($exept) && in_array($page, $exept)) {
                $return_data = "";
            } else {
                $return_data = '<link rel="stylesheet" type="text/css" href="'.base_url().'/css/'.$page.'.css">';
            }
        } else {
            $return_data = "";
        }
        return $return_data;
    }
}

// INCLUDE PLIKU JS NA PODSTAWIE NAZWY PLIKU WIDOKU
if ( ! function_exists('addit_js')) {
    function addit_js($page, $exept = []) {
        if ( is_file(ROOTPATH.'public/js/'.$page.'.js')) {  
            if (!empty($exept) && in_array($page, $exept)) {
                $return_data = "";
            } else {
                $return_data = '<script src="'.base_url().'/js/'.$page.'.js"></script>';
            }
        } else {
            $return_data = "";
        }
        return $return_data;
    }
}

// ZAPYTANIE CURL Z DANEGO URL
if ( ! function_exists('curlGet')) {
    function curlGet($url) {
        if(!empty($url)) {
    
            $curl_str = $url;
            $ch = curl_init();
    
            curl_setopt($ch, CURLOPT_URL, $curl_str);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    
            $resp = curl_exec($ch);
            curl_close($ch);
    
            $jsonData = json_decode($resp,true);
    
            return $jsonData;
        }
    }
}

// ZMIANA POLSKICH ZNAKÓW NA WERSJE BEZ OGONKÓW 
if ( ! function_exists('normalizeString')){
    function normalizeString($tekst) {
        $tabela = Array(
            //WIN
          "\xb9" => "a", "\xa5" => "A", "\xe6" => "c", "\xc6" => "C",
          "\xea" => "e", "\xca" => "E", "\xb3" => "l", "\xa3" => "L",
          "\xf3" => "o", "\xd3" => "O", "\x9c" => "s", "\x8c" => "S",
          "\x9f" => "z", "\xaf" => "Z", "\xbf" => "z", "\xac" => "Z",
          "\xf1" => "n", "\xd1" => "N",
            //UTF
          "\xc4\x85" => "a", "\xc4\x84" => "A", "\xc4\x87" => "c", "\xc4\x86" => "C",
          "\xc4\x99" => "e", "\xc4\x98" => "E", "\xc5\x82" => "l", "\xc5\x81" => "L",
          "\xc3\xb3" => "o", "\xc3\x93" => "O", "\xc5\x9b" => "s", "\xc5\x9a" => "S",
          "\xc5\xbc" => "z", "\xc5\xbb" => "Z", "\xc5\xba" => "z", "\xc5\xb9" => "Z",
          "\xc5\x84" => "n", "\xc5\x83" => "N",
            //ISO
          "\xb1" => "a", "\xa1" => "A", "\xe6" => "c", "\xc6" => "C",
          "\xea" => "e", "\xca" => "E", "\xb3" => "l", "\xa3" => "L",
          "\xf3" => "o", "\xd3" => "O", "\xb6" => "s", "\xa6" => "S",
          "\xbc" => "z", "\xac" => "Z", "\xbf" => "z", "\xaf" => "Z",
          "\xf1" => "n", "\xd1" => "N");
          
            return strtr($tekst,$tabela);
    }
}

// TWORZY SLUG Z DANEGO STRINGA
if ( ! function_exists('generateSlug')){
    function generateSlug($tekst) {
        return normalizeString(url_title($tekst, '-', true));
    }
}

// SPRAWDZA CZY STRING $HAYSTACK KOŃCZY SIĘ NA $NEEDLE
if ( ! function_exists('endsWith')) {
    function endsWith($haystack, $needle) {
        return substr_compare($haystack, $needle, -strlen($needle)) === 0;
    }
}