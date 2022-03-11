<?php

namespace App\Controllers;

use App\Models\CitiesModel;
use App\Models\CinemasModel;
use CodeIgniter\API\ResponseTrait;

class Api extends BaseController
{
    use ResponseTrait;

    public function api_cities_get() {
        $received_data = json_decode(file_get_contents("php://input"));
        $data = array();
        if($received_data->query != '')
        {
            $cities_model = new CitiesModel();
            $r = $cities_model->getCities($received_data->query);
        }
        return $this->respond($r);
    }

    public function api_cities_update() {
        $cities_model = new CitiesModel();
        $r = $cities_model->updateCities('https://api.internationalshowtimes.com/v4/cities?apikey=1TAZEERsOB4cXnXqlXeHUofJqYU5gwqn&include_all=true');
        if ($r) {
            echo 'Zaaktualizowano bazę miast';
        } else {
            echo 'Przy aktualizacji bazy miast wystąpił błąd';
        }
    }

    public function api_cinemas_update() {
        $cinemas_model = new CinemasModel();
        $r = $cinemas_model->updateCinemas('https://api.internationalshowtimes.com/v4/cinemas/?apikey=1TAZEERsOB4cXnXqlXeHUofJqYU5gwqn&include_all=true');
        if ($r) {
            echo 'Zaaktualizowano bazę kin';
        } else {
            echo 'Przy aktualizacji bazy kin wystąpił błąd';
        }
    }

    public function api_cinemas_get() {
        $received_data = json_decode(file_get_contents("php://input"));
        $cinemas_model = new CinemasModel();
        $r = $cinemas_model->getCinemas($received_data->lat, $received_data->long, $received_data->query);
        return $this->respond($r);
    }

    public function api_showtimes_get() {
        $received_data = json_decode(file_get_contents("php://input"));
        if ($received_data->default_city) {
            $r = curlGet('https://api.internationalshowtimes.com/v4/showtimes?city_ids='.$received_data->default_city.'&movie_id=106613&apikey=1TAZEERsOB4cXnXqlXeHUofJqYU5gwqn');
            return $this->respond($r);
        } 
    }
}