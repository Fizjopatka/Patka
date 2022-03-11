<?php

namespace App\Models;


class CitiesModel extends DefaultModel {

    protected $table = 'miasta';
    protected $allowedFields = ['miasto_id', 'lat', 'lon', 'name', 'search_name', 'slug'];

    function databaseCheck($miasto_id) {
        $CI = $this->databaseSettings();
        $response = $CI->query("SELECT * FROM miasta WHERE miasto_id='".$miasto_id."'");
        if (empty($response->getResultArray())) {
            return false;
        } else if (!empty($response->getResultArray())) {
            return true;
        }
    }

    function updateCities($url) {
        $data = curlGet($url);
        foreach ($data['cities'] as $city) {
            if(!$this->databaseCheck($city['id'])) {  
                $this->databaseInsert($city['id'], $city['lat'], $city['lon'], $city['name'], $city['name'], $city['slug']);
            } else {
                $this->databaseUpdate($city['id'], $city['lat'], $city['lon'], $city['name'], $city['name'], $city['slug']);
            }
        }
        return true;
    }

    function databaseInsert($miasto_id, $lat, $lon, $name, $search_name, $slug) {
        $CI = $this->databaseSettings();
        $response = $CI->query("INSERT INTO miasta (miasto_id, lat, lon, name, search_name, slug) VALUES (".$miasto_id.",".$lat.",".$lon.",'".$name."', '".normalizeString(mb_strtolower($search_name,"UTF-8"))."','".$slug."')");
        return $response;
    }

    function databaseUpdate($id, $lat, $lon, $name, $search_name, $slug) {
        $CI = $this->databaseSettings();
        $response = $CI->query("UPDATE miasta SET lat = '".$lat."', lon = '".$lon."', name = '".$name."', search_name = '".normalizeString(mb_strtolower($search_name,"UTF-8"))."', slug = '".$slug."' WHERE miasto_id = ".$id."");
        return $response;
    }

    function getCities($query) {
        $connect = $this->databaseSettings();
        $query = "
        SELECT * FROM miasta 
        WHERE name LIKE '%".$query."%' OR new_name LIKE '%".$query."%' OR search_name LIKE '%".$query."%'
        ORDER BY name ASC 
        LIMIT 10
        ";
        return $connect->query($query)->getResultArray();
    }
}