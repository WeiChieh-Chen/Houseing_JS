<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Security extends CI_Controller {


    public function __construct()
        {
            parent::__construct();
            // Your own constructor code
        }
    public function index()
    {
        $data['pages'] = 3;
        $this->load->helper('url');
        $this->load->view('securities',$data);
    }

    public function statistics()
    {
            $config['hostname'] = '140.130.35.62:8082';
            $config['username'] = '40343236';
            $config['password'] = '40343236';
            $config['database'] = '40343236';
            $config['dbdriver'] = 'mysqli';
            $config['dbprefix'] = '';
            $config['pconnect'] = FALSE;
            $config['db_debug'] = TRUE;

            $this->load->model('Statistics','',$config);

        $security = array(
            'kind' => $_POST['kind'],
            'county' => $_POST['county'],
            'branchNm' => $_POST['branchNm'],

        );
        $data['query'] = $this->Statistics->statistics_insert($security);

        $this->load->view('footer');
    }

}