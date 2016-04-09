<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$data['pages'] = 1;
		$this->load->helper('url'); // base_url();
		$this->load->view('header');
   		$this->load->view('rentinfo');
		$this->load->view('welcome_message',$data);
		$this->load->view('footer');
		//photograph
	}

	public function show_photograph(){
		$this->load->view('photograph');


		//statistics
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

			$house = array(
				'kind' => $_POST['kind'],
	            'county' => $_POST['county'],
	            'school' => $_POST['school'],
	            'cost' => $_POST['cost'],
	            'housetype' => $_POST['housetype']

			);
			$data['query'] = $this->Statistics->statistics_insert($house);

			$this->load->view('footer');
	}

}
