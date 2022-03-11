<?php 

namespace App\Models;

class CinemasModel extends DefaultModel {

    protected $table = 'kina';
    protected $allowedFields = ['kino_id', 'city_id', 'name', 'slug', 'adres'];

    function updateCinemas($url) {
        $data = curlGet($url);
        foreach ($data['cinemas'] as $cinema) {
            if(!$this->databaseCheckCinemas($cinema['id'])) {  
                $this->databaseInsertCinemas($cinema['id'], $cinema['city_id'], $cinema['name'], $cinema['slug'], $cinema['location']['address']['display_text']);
            } else {
                $this->databaseUpdateCinemas($cinema['id'], $cinema['city_id'], $cinema['name'], $cinema['slug'], $cinema['location']['address']['display_text']);
            }
        }
        return true;
    }

    function databaseCheckCinemas($cinema_id) {
        $CI = $this->databaseSettings();
        $response = $CI->query("SELECT * FROM kina WHERE kino_id='".$cinema_id."'");
        if (empty($response->getResultArray())) {
            return false;
        } else if (!empty($response->getResultArray())) {
            return true;
        }
    }

    function databaseUpdateCinemas($cinema_id, $city_id, $name, $slug, $address) {
        $CI = $this->databaseSettings();
        $response = $CI->query("UPDATE kina SET city_id = ".$CI->escape($city_id).", name = ".$CI->escape($name).", slug = ".$CI->escape($slug).", adres = ".$CI->escape($address)." WHERE kino_id = ".$CI->escape($cinema_id)."");
        return $response;
    }

    function databaseInsertCinemas($cinema_id, $city_id, $name, $slug, $address) {
        $CI = $this->databaseSettings();
        $response = $CI->query("INSERT INTO kina (kino_id, city_id, name, slug, adres) VALUES (".$CI->escape($cinema_id).",".$CI->escape($city_id).", ".$CI->escape($name).", ".$CI->escape($slug).",".$CI->escape($address).")");
        return $response;
    }


    function getCinemas($lat, $long, $query) {
        $connect = $this->databaseSettings();
        $data = array();
        $cinemas = array();
        if ($lat && $long) {

            $starting_distance = 0;
            $response = array();
            do {    
                $starting_distance += 30;
                $response = curlGet('https://api.internationalshowtimes.com/v4/cinemas/?location='.$lat.','.$long.'&distance='.$starting_distance.'&apikey=1TAZEERsOB4cXnXqlXeHUofJqYU5gwqn');
            }  while (!isset($response['cinemas']) && empty($response['cinemas']));

            if (!empty($response['cinemas'])) {
                foreach($response['cinemas'] as $cinema) {
                    //var_dump($cinema);
                    $cinemas[] = [
                        'kino_id' => $cinema['id'],
                        'city_id' => $cinema['city_id'],
                        'name' => $cinema['name'],
                        'slug' => $cinema['slug'],
                        'adres' => $cinema['location']['address']['display_text']
                    ];
                }
            } 
            
            return $cinemas;
        }   else if($query != '') {
        $query = "
        SELECT * FROM kina 
        WHERE city_id = ".$query."
        ";
        $statement = $connect->query($query);
        return $statement->getResultObject();
        }
    }
}