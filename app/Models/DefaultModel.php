<?php

namespace App\Models;

use CodeIgniter\Model;

class DefaultModel extends Model {
    function databaseSettings() {
        $db = \Config\Database::connect();
        return $db;
    }
}