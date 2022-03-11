<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function view($page = 'home')
    {
        //THROW 404 PAGE WHEN VIEW FILE IS MISSING
        if ( ! is_file(APPPATH.'/Views/'.$page.'.php'))
        {
            throw new \CodeIgniter\Exceptions\PageNotFoundException($page);
        }

        //INCLUDE CSS AND JS FILE BY VIEW FILE NAME
        $data['additional_css'] = [addit_css($page), addit_css('libs/lightgallery.min'), addit_css('libs/splide.min')];
        $data['additional_js'] = [addit_js($page), addit_js('libs/lightgallery.min') , addit_js('libs/splide-custom')];

        //OPTIONAL TITLE SWITCH
        switch($page) {
            case 'home':
                $data['title'] = "Patrycja Hańdziuk - Strona główna";
            break; 
            default:
                $data['title'] = "Patrycja Hańdziuk";
            break; 
        }
        
        //PAMIĘTAJ ZMIENIĆ TEŻ TEKST W COOKIES
        $data['description'] = "Junior frontend developer";
        $data['page'] = $page;
        
        echo view('template/header', $data);
        echo view($page, $data);
        echo view('template/footer', $data);
    }
    public function pageNotFound() {
        $this->view('404');
    }
}
