<?php

use phpDocumentor\Reflection\Types\Null_;

defined('BASEPATH') or exit('No direct script access allowed');

class User extends MY_Controller
{
	function __construct()
	{
		parent::__construct();
		ini_set('MAX_EXECUTION_TIME', '-1');
		ini_set('max_input_vars', 10000);
		if (!check_company_active_subscription()) {
			$this->session->set_flashdata('error', 'Please purchase a plan to continue.');
			redirect('subscriptions', 'refresh');
		}
		// pr($this->session->userdata());
		// exit;
	}

	function dashboard()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		$employee_id = $this->session->userdata('employee_id');
		$role_id = $this->session->userdata('role_id');
		$company_id = $this->session->userdata('company_id');
		$allotted = $this->common_model->dashboard_works_list();
		$page_data['tasks']    = $allotted[0]['tasks'] ?? 0;

		$allotted = $this->common_model->dashboard_works_list('allotted');
		$page_data['allotted']    = $allotted[0]['tasks'] ?? 0;

		$pending = $this->common_model->dashboard_works_list('pending');
		$page_data['pending']    = $pending[0]['tasks'] ?? 0;

		$finished = $this->common_model->dashboard_works_list('finished');
		$page_data['finished']    = $finished[0]['tasks'] ?? 0;
		if ($role_id == 6) {

			$page_data['total_employees'] = $this->common_model->count_employees(['company_id' => $company_id]);
			$page_data['active_employees'] = $this->common_model->count_employees(['company_id' => $company_id, 'status' => 'active']);
			$page_data['inactive_employees'] = $this->common_model->count_employees(['company_id' => $company_id, 'status' => 'inactive']);
		} else {
			$page_data['total_employees'] = $this->common_model->count_employees();
			$page_data['active_employees'] = $this->common_model->count_employees(['status' => 'active']);
			$page_data['inactive_employees'] = $this->common_model->count_employees(['status' => 'inactive']);
		}
		$page_data['page_type']    = 'user';
		$page_data['page_name']    = 'dashboard';
		$page_data['page_title']   = 'Dashboard';
		$page_data['menu']         = 'dashboard';
		// pr($page_data);exit;
		$this->load->view('theme/user/main', $page_data);
	}

	function add_employee()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(1)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}
		$role_id = $this->session->userdata('role_id');
		$company_id = $this->session->userdata('company_id');
		$page_data['page_type']    = 'user';
		$page_data['menu']         = 'employee';
		$page_data['page_name']    = 'add_employee';
		$page_data['page_title']   = 'Add Employee';
		if ($role_id == 6) {
			$page_data['companies']  = $this->common_model->selectAll('company', ['company_id' => $company_id], '*');
		} else {
			$page_data['companies']  = $this->common_model->selectAll('company', '', '*');
		}
		$this->load->view('theme/user/main', $page_data);
	}

	function add_employee_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(1)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$company_id = $this->session->userdata('company_id');
		$company_name = $this->session->userdata('name');
		$role_id = $this->session->userdata('role_id');
		if ($role_id != 5 && $this->input->post('status') !== 'inactive') {
			$subscription = $this->common_model->selectsubscription(
				'subscription_history',
				array('company_id' => $company_id, 'expiry_date >=' => date('Y-m-d')),
				'*',
				'id ASC'
			);

			if (empty($subscription)) {
				$response = array('status' => 0, 'msg' => 'No active subscription found.');
				echo json_encode($response);
				exit;
			}

			$user_limit = $subscription['users_count'];

			$active_employees_count = $this->common_model->get_count('employees', [
				'company_id' => $company_id,
				'status' => 'active'
			]);

			if ($active_employees_count >= $user_limit) {
				$response = array('status' => 0, 'msg' => 'Max active employees reached, set status to inactive.');
				echo json_encode($response);
				exit;
			}
		}
		$this->form_validation->set_rules('name', 'Name', 'trim|required');
		$this->form_validation->set_rules('status', 'Status', 'trim|required');
		$this->form_validation->set_rules('role_id', 'Role', 'trim|required');
		$this->form_validation->set_rules('mobile', 'Mobile', 'trim|required');
		$this->form_validation->set_rules('email_id', 'Email Id', 'trim|valid_email|required');
		$this->form_validation->set_rules('username', 'Username', 'trim|required|is_unique[employees.username]');
		$this->form_validation->set_rules('password', 'Password', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);
			$existing_employee = $this->common_model->selectOne('employees', array('email_id' => $data['email_id'], 'company_id' => $data['company_id']), '*');
			if (!empty($existing_employee)) {
				$response = array('status' => 0, 'msg' => 'Email already exists, use another');
				echo json_encode($response);
				exit;
			}
			$data['name'] = ucfirst($data['name']);
			$plain_password = $data['password'];
			$data['password'] = md5($data['password']);
			$data['created_at'] = date('Y-m-d H:i:s');
			$employee_id = $this->common_model->insert($data, 'employees');
			if (!empty($employee_id)) {
				if ($_FILES['file_name']['error'] != 4) {

					$oldmask = umask(0);
					if (!is_dir('assets/uploads/user_pic')) {
						mkdir('assets/uploads/user_pic', 0777, true);
						if (!file_exists('assets/uploads/user_pic/index.html')) {
							file_put_contents('assets/uploads/user_pic/index.html', '');
						}
					}
					umask($oldmask);
					$image = date('dmYhis') . '_' . rand(0, 99999) . "." . pathinfo($_FILES['file_name']['name'], PATHINFO_EXTENSION);
					$config['upload_path']   =  'assets/uploads/user_pic/';
					$config['allowed_types'] = 'jpg|png|jpeg';
					$config['file_name']     = $image;
					$this->load->library('upload', $config);
					if ($this->upload->do_upload('file_name')) {
						//resize the uploaded
						image_resize('assets/uploads/user_pic/' . $image, '140', '140', FALSE);
						$data_update = array(
							'profile_photo'  => $image,
						);
						$data_update = $this->security->xss_clean($data_update);
						$this->common_model->update($data_update, array('employee_id' => $employee_id), 'employees');
					} else {
						// File upload failed, return a JSON response with an error message
						$response = array(
							'status' => 0,
							'msg' => 'Only allowed types are jpg, png, jpeg'
						);
						echo json_encode($response);
						exit; // Stop further execution
					}
				}
				// Send email with login credentials
				$email_content = "Hello " . ucfirst($data['name']) . ",<br><br>";
				$email_content .= "Your account has been created successfully. Here are your login credentials:<br>";
				$email_content .= "Username: <strong>" . $data['username'] . "</strong><br>";
				$email_content .= "Password: <strong>" . $plain_password . "</strong><br>";
				$email_content .= "<br>Please keep this information secure.<br><br>Regards,<br> $company_name";

				_sendMail("Account Created", $email_content, $data['email_id']);
				$response = array('status' => 1, 'msg' => 'Registered successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function add_director()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(9)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['menu']         = 'company';
		$page_data['page_name']    = 'add_directors';
		$page_data['page_title']   = 'Add Directors';
		$page_data['companies']  = $this->common_model->selectAll('company', '', '*');
		$this->load->view('theme/user/main', $page_data);
	}

	function add_directors_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(9)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$this->form_validation->set_rules('name[]', 'Name', 'trim|required');
		$this->form_validation->set_rules('company_id[]', 'Company', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);
			$direct = array();

			if (!empty($data['company_id'])) {
				foreach ($data['company_id'] as $key => $value) {
					$direct[$key]['company_id'] = $data['company_id'][$key];
					$direct[$key]['name']    = $data['name'][$key];
					$direct[$key]['mobile']  = ($data['mobile'][$key] != "") ? $data['mobile'][$key] : NULL;
					$direct[$key]['mobile1']  = ($data['mobile1'][$key] != "") ? $data['mobile1'][$key] : NULL;
					$direct[$key]['address']  = ($data['address'][$key] != "") ? $data['address'][$key] : NULL;
					$direct[$key]['pan_no']  = ($data['pan_no'][$key] != "") ? $data['pan_no'][$key] : NULL;
					$direct[$key]['email_id']  = ($data['email_id'][$key] != "") ? $data['email_id'][$key] : NULL;
					$direct[$key]['created_at'] = date('Y-m-d H:i:s');
				}
			}

			//remove empty details
			$c = function ($v) {
				return array_filter($v) != array();
			};
			$direct = array_filter($direct, $c);
			$resp = $this->common_model->save_directors($direct);
			if (!empty($resp)) {
				$response = array('status' => 1, 'msg' => 'Saved successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function view_directors()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(10) && !check_permission(11) && !check_permission(12)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['page_name']    = 'view_directors';
		$page_data['menu']         = 'company';
		$page_data['page_title']   = 'View Directors';
		$this->load->view('theme/user/main', $page_data);
	}

	function view_directors_ajax()
	{

		$directors['data'] = [];
		if (!check_permission(10) && !check_permission(11) && !check_permission(12)) {
			echo json_encode($directors);
			exit;
		}

		$all = $this->common_model->directors_list();

		if (!empty($all)) {

			foreach ($all as $key => $value) {
				$directors['data'][$key]['company']   = $value['company'];
				$directors['data'][$key]['name']      = $value['name'];
				$directors['data'][$key]['mobile']    = $value['mobile'];
				$directors['data'][$key]['mobile1']   = $value['mobile1'];
				$directors['data'][$key]['address']   = nl2br($value['address']);
				$directors['data'][$key]['email_id']  = $value['email_id'];
				$directors['data'][$key]['pan_no']      = $value['pan_no'];

				$directors['data'][$key]['action'] = ((check_permission(10)) ? '<a href="' . base_url('edit-director/' . $value['director_id']) . '" class="btn btn-sm btn-outline-secondary" title="Edit"><i class="fa fa-edit"></i></a>' : '') . ((check_permission(12)) ? '&nbsp;<button type="button" class="btn btn-sm btn-outline-danger" title="Delete" onclick="deleteDirector(\'' . $value['director_id'] . '\')"><i class="fa fa-trash-o"></i></button>' : '');
			}
		}
		echo json_encode($directors);
	}

	function director_delete_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(12)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('director_id', 'Director id', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);

			$resp = $this->common_model->director_delete($data['director_id']);
			if (!empty($resp)) {
				$response = array('status' => 1, 'msg' => 'Deleted successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function edit_director($director_id)
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(10)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['menu']         = 'company';
		$page_data['page_name']    = 'edit_director';
		$page_data['page_title']   = 'Edit Director';
		$page_data['companies']  = $this->common_model->selectAll('company', '', '*');
		$page_data['director_details'] = $this->common_model->director_by_id($director_id);

		if (empty($page_data['director_details'])) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('view-directors', 'refresh');
		}
		$this->load->view('theme/user/main', $page_data);
	}

	function edit_directors_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(10)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('director_id', 'Director', 'trim|required');
		$this->form_validation->set_rules('name', 'Name', 'trim|required');
		$this->form_validation->set_rules('company_id', 'Company', 'trim|required');
		$this->form_validation->set_rules('email_id', 'Email Id', 'trim|valid_email');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);
			$director = $this->common_model->director_by_id($data['director_id']);

			if (empty($director)) {
				$response = array('status' => 0, 'msg' => 'Invalid director details!');
				echo json_encode($response);
				exit;
			}

			$data['name'] = ucfirst($data['name']);
			unset($data['director_id']);

			$user_update = $this->security->xss_clean($data);
			$update_resp = $this->common_model->update($user_update, array('director_id' => $director['director_id']), 'directors');
			if (!empty($update_resp)) {
				$response = array('status' => 1, 'msg' => 'Updated successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Nothing updated!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function ajax_directors()
	{
		$page_data['count'] = $this->input->post('count');
		$page_data['companies']  = $this->common_model->selectAll('company', '', '*');
		$this->load->view('user/ajax_directors', $page_data);
	}
	function view_employees($filters = '')
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(2) && !check_permission(3) && !check_permission(4)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['page_name']    = 'view_employees';
		$page_data['menu']         = 'employee';
		$page_data['page_title']   = 'View Employees';
		$page_data['filters']      = $filters;
		$this->load->view('theme/user/main', $page_data);
	}

	function view_employees_ajax()
	{

		$employees['data'] = [];
		$role_id = $this->session->userdata('role_id');
		$company_id = $this->session->userdata('company_id');
		$filter_status = $this->input->post('filter_status');
		if (!check_permission(2) && !check_permission(3) && !check_permission(4)) {
			echo json_encode($employees);
			exit;
		}
		$conditions = ['e.role_id' => 1];
		if ($role_id == 6) {
			$conditions['e.company_id'] = $company_id;
		}
		if (!empty($filter_status)) {
			$conditions['e.status'] = $filter_status;
		}

		$all = $this->common_model->employees_list($conditions);
		if (!empty($all)) {
			foreach ($all as $key => $value) {
				$employees['data'][$key]['profile_photo'] = '<a href="' . base_url() . 'employee-details/' . $value['employee_id'] . '" title="View profile"><img src="' . getUserImage($value['profile_photo']) . '" class="rounded-circle avatar" alt="' . $value['name'] . '"></a>';
				$employees['data'][$key]['name']      = '<a href="' . base_url() . 'employee-details/' . $value['employee_id'] . '" title="View profile">' . $value['name'] . '</a>';
				$employees['data'][$key]['mobile']    = $value['mobile'];
				$employees['data'][$key]['mobile1']   = $value['mobile1'];
				$employees['data'][$key]['address']   = nl2br($value['address']);
				$employees['data'][$key]['email_id']  = $value['email_id'];
				$employees['data'][$key]['username']  = $value['username'];
				$employees['data'][$key]['role']      = $value['role'];
				// $employees['data'][$key]['status']    = user_status($value['status']);
				$checked = ($value['status'] === 'active') ? 'checked' : '';

				$employees['data'][$key]['status'] = '
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input status-toggle" id="customSwitch' . $value['employee_id'] . '" ' . $checked . ' data-id="' . $value['employee_id'] . '" data-status="' . $value['status'] . '">
                    <label class="custom-control-label" for="customSwitch' . $value['employee_id'] . '"></label>
                </div>';



				$employees['data'][$key]['action'] = ((check_permission(2)) ? '<a href="' . base_url('edit-employee/' . $value['employee_id']) . '" class="btn btn-sm btn-outline-secondary" title="Edit"><i class="fa fa-edit"></i></a>' : '') . ((check_permission(4)) ? '&nbsp;<button type="button" class="btn btn-sm btn-outline-danger" title="Delete" onclick="deleteEmployee(\'' . $value['employee_id'] . '\')"><i class="fa fa-trash-o"></i></button>' : '');
			}
		}
		echo json_encode($employees);
	}

	function employee_details($employee_id)
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(3)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['employee_details'] = $this->common_model->employee_by_id($employee_id);

		if (empty($page_data['employee_details'])) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['session_id']   =  $this->session->userdata('employee_id');
		$page_data['page_type']    = 'user';
		$page_data['page_name']    = 'employee_details';
		$page_data['menu']         = 'employee';
		$page_data['page_title']   = 'Employee Details';
		$this->load->view('theme/user/main', $page_data);
	}

	function employee_delete_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(4)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('employee_id', 'Employee id', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);

			$resp = $this->common_model->employee_delete($data['employee_id']);
			if (!empty($resp)) {
				$response = array('status' => 1, 'msg' => 'Deleted successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function edit_employee($employee_id)
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(2)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['menu']         = 'employee';
		$page_data['page_name']    = 'edit_employee';
		$page_data['page_title']   = 'Edit Employee';
		// $page_data['roles']  = $this->common_model->selectAll('roles', '', '*');
		$page_data['employee_details'] = $this->common_model->employee_by_id($employee_id);

		if (empty($page_data['employee_details'])) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('view-employees', 'refresh');
		}
		$this->load->view('theme/user/main', $page_data);
	}

	function edit_employee_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(2)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}
		// Retrieve the company_id from the session
		$company_id = $this->session->userdata('company_id');

		if ($this->input->post('status') !== 'inactive') {
			$subscription = $this->common_model->selectsubscription(
				'subscription_history',
				array('company_id' => $company_id, 'expiry_date >=' => date('Y-m-d')),
				'*',
				'id ASC'
			);

			if (empty($subscription)) {
				$response = array('status' => 0, 'msg' => 'No active subscription found.');
				echo json_encode($response);
				exit;
			}

			$user_limit = $subscription['users_count'];

			$active_employees_count = $this->common_model->get_count('employees', [
				'company_id' => $company_id,
				'status' => 'active'
			]);

			if ($active_employees_count >= $user_limit) {
				$response = array('status' => 0, 'msg' => 'Max active employees reached, set status to inactive.');
				echo json_encode($response);
				exit;
			}
		}
		$this->form_validation->set_rules('employee_id', 'Employee', 'trim|required');
		$this->form_validation->set_rules('name', 'Name', 'trim|required');
		$this->form_validation->set_rules('status', 'Status', 'trim|required');
		$this->form_validation->set_rules('role_id', 'Role', 'trim|required');
		$this->form_validation->set_rules('mobile', 'Mobile', 'trim|required');
		$this->form_validation->set_rules('email_id', 'Email Id', 'trim|valid_email|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);
			$employee = $this->common_model->employee_by_id($data['employee_id']);

			if (empty($employee)) {
				$response = array('status' => 0, 'msg' => 'Invalid employee details!');
				echo json_encode($response);
				exit;
			}

			$data['name'] = ucfirst($data['name']);
			unset($data['employee_id']);

			$user_update = $this->security->xss_clean($data);
			$update_resp = $this->common_model->update($user_update, array('employee_id' => $employee['employee_id']), 'employees');

			if ($_FILES['file_name']['error'] != 4) {

				$oldmask = umask(0);
				if (!is_dir('assets/uploads/user_pic')) {
					mkdir('assets/uploads/user_pic', 0777, true);
					if (!file_exists('assets/uploads/user_pic/index.html')) {
						file_put_contents('assets/uploads/user_pic/index.html', '');
					}
				}
				umask($oldmask);

				$image = date('dmYhis') . '_' . rand(0, 99999) . "." . pathinfo($_FILES['file_name']['name'], PATHINFO_EXTENSION);
				$config['upload_path']   =  'assets/uploads/user_pic/';
				$config['allowed_types'] = 'jpg|png|jpeg';
				$config['file_name']     = $image;
				$this->load->library('upload', $config);
				if ($this->upload->do_upload('file_name')) {

					//resize the uploaded
					image_resize('assets/uploads/user_pic/' . $image, '140', '140', FALSE);

					//delete old pic
					$old_pic = $this->db->select('profile_photo')->get_where('employees', array('employee_id' => $employee['employee_id']))->row_array();
					if (!empty($old_pic['profile_photo'])) {
						if (file_exists('assets/uploads/user_pic/' . $old_pic['profile_photo'])) {
							unlink('assets/uploads/user_pic/' . $old_pic['profile_photo']);
						}
					}

					//update new pic
					$data_update = array(
						'profile_photo'  => $image,
					);
					$data_update = $this->security->xss_clean($data_update);
					$this->common_model->update($data_update, array('employee_id' => $employee['employee_id']), 'employees');
				} else {
					$response = array('status' => 0, 'msg' => 'Image upload error!');
					echo json_encode($response);
					exit;
				}
			}

			$response = array('status' => 1, 'msg' => 'Details updated!');
			echo json_encode($response);
			exit;
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function delete_pro_pic()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(2)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$employee_id  = $this->input->post('id');
		$exist = $this->db->get_where('employees', array('employee_id' => $employee_id))->row_array();
		if (!empty($exist)) {
			//remove profile pic 
			if (!empty($exist['profile_photo'])) {
				if (file_exists('assets/uploads/user_pic/' . $exist['profile_photo'])) {
					unlink('assets/uploads/user_pic/' . $exist['profile_photo']);

					$this->db->where('employee_id', $employee_id);
					$this->db->update('employees', array('profile_photo' => NULL));

					$response = array('status' => 1, 'msg' => 'Removed successfully!');
					echo json_encode($response);
					exit;
				} else {
					$response = array('status' => 0, 'msg' => 'Something went wrong!');
					echo json_encode($response);
					exit;
				}
			} else {
				$response = array('status' => 0, 'msg' => 'Can\'t remove default photo!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => 'Employee details not exist!');
			echo json_encode($response);
			exit;
		}
	}

	function add_company()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(5)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['menu']         = 'company';
		$page_data['page_name']    = 'add_company';
		$page_data['subscriptions'] = $this->common_model->subscription_list();
		$page_data['page_title']   = 'Add Company';
		$this->load->view('theme/user/main', $page_data);
	}

	function add_company_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(5)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('name', 'Name', 'trim|required');
		$this->form_validation->set_rules('company_code', 'Company Code', 'trim|required|is_unique[company.company_code]');
		$this->form_validation->set_rules('password', 'Password', 'trim|required');
		$this->form_validation->set_rules('mobile', 'Mobile', 'trim|required');
		$this->form_validation->set_rules('reg_no', 'Reg.No.', 'trim|is_unique[company.reg_no]');
		$this->form_validation->set_rules('subsrciption_id', 'Subscription', 'trim|required');
		$this->form_validation->set_rules('subscription_added_on', 'Date', 'trim|required');
		$this->form_validation->set_rules('status', 'Status', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');

		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);
			$data['name'] = ucfirst($data['name']);
			$data['password'] = md5($data['password']); // Store password as MD5 hash
			$data['created_at'] = date('Y-m-d H:i:s');
			$data['subscription_added_on'] = set_date($data['subscription_added_on']);

			$company_id = $this->common_model->insert($data, 'company');

			if (!empty($company_id)) {
				$response = array('status' => 1, 'msg' => 'Registered successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}


	function view_companies()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(6) && !check_permission(7) && !check_permission(8)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['page_name']    = 'view_companies';
		$page_data['menu']         = 'company';
		$page_data['page_title']   = 'View Companies';
		$this->load->view('theme/user/main', $page_data);
	}

	function view_companies_ajax()
	{

		$companys['data'] = [];

		if (!check_permission(6) && !check_permission(7) && !check_permission(8)) {
			echo json_encode($companys);
			exit;
		}

		$all = $this->common_model->companies_list();
		// pr($all);exit;

		if (!empty($all)) {

			foreach ($all as $key => $value) {
				// $companys['data'][$key]['name']     = '<a href="' . base_url() . 'company-details/' . $value['company_id'] . '" title="View Details">' . $value['name'] . '</a>';
				$companys['data'][$key]['name']     = $value['name'];
				$companys['data'][$key]['mobile']   = $value['mobile'];
				$companys['data'][$key]['mobile1']  = $value['mobile1'];
				$companys['data'][$key]['address']  = nl2br($value['address']);
				$companys['data'][$key]['reg_no'] 	= $value['reg_no'];
				$companys['data'][$key]['subscription'] = $value['subscribedName'];
				$companys['data'][$key]['subscription_added_on'] = get_date($value['subscription_added_on']);
				$companys['data'][$key]['amount'] 	= $value['subscription_amount'];
				$companys['data'][$key]['status']   = user_status($value['status']);
				// $companys['data'][$key]['action'] 	= ((check_permission(6)) ? '<a href="' . base_url('edit-company/' . $value['company_id']) . '" class="btn btn-sm btn-outline-secondary" title="Edit"><i class="fa fa-edit"></i></a>' : '') . ((check_permission(8)) ? '&nbsp;<button type="button" class="btn btn-sm btn-outline-danger" title="Delete" onclick="deleteCompany(\'' . $value['company_id'] . '\')"><i class="fa fa-trash-o"></i></button>' : '');
			}
		}
		echo json_encode($companys);
	}

	function edit_company($company_id)
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(6)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['menu']         = 'company';
		$page_data['page_name']    = 'edit_company';
		$page_data['page_title']   = 'Edit Company';
		$page_data['subscriptions'] = $this->common_model->subscription_list();
		$page_data['company_details'] = $this->common_model->company_by_id($company_id);

		if (empty($page_data['company_details'])) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('view-companies', 'refresh');
		}
		$this->load->view('theme/user/main', $page_data);
	}


	// public function edit_company_process()
	// {
	// 	if (!check_user_login()) {
	// 		redirect('signin', 'refresh');
	// 	}

	// 	$this->form_validation->set_rules('company_id', 'Client', 'trim|required');
	// 	$this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email');
	// 	$this->form_validation->set_rules('mobile', 'Mobile', 'trim|required|numeric|min_length[10]|max_length[15]');
	// 	$this->form_validation->set_rules('mobile1', 'Mobile1', 'trim|numeric|min_length[10]|max_length[15]');

	// 	$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');

	// 	if ($this->form_validation->run()) {
	// 		$data = $this->input->post(NULL, true);
	// 		$company = $this->common_model->company_by_id($data['company_id']);

	// 		if (empty($company)) {
	// 			$response = array('status' => 0, 'msg' => 'Invalid company details!');
	// 			echo json_encode($response);
	// 			exit;
	// 		}
	// 		$user_update = [];
	// 		if (!empty($data['name'])) {
	// 			$user_update['name'] = ucfirst($data['name']);
	// 		}
	// 		if (!empty($data['company_code'])) {
	// 			$user_update['company_code'] = $data['company_code'];
	// 		}
	// 		if (!empty($data['email'])) {
	// 			$this->db->where('email', $data['email']);
	// 			$this->db->where('company_id !=', $data['company_id']);
	// 			$existing_email = $this->db->get('company')->row();

	// 			if ($existing_email) {
	// 				$response = array('status' => 0, 'msg' => 'Email address already exists for another company.');
	// 				echo json_encode($response);
	// 				exit;
	// 			} else {
	// 				$user_update['email'] = $data['email'];
	// 			}
	// 		}
	// 		if (!empty($data['mobile'])) {
	// 			$user_update['mobile'] = $data['mobile'];
	// 		}

	// 		$user_update['mobile1'] = $data['mobile1'];

	// 		if (!empty($user_update)) {
	// 			$user_update = $this->security->xss_clean($user_update);
	// 			$update_resp = $this->common_model->update($user_update, array('company_id' => $company['company_id']), 'company');

	// 			if ($update_resp) {
	// 				if (isset($data['name'])) $this->session->set_userdata('name', $data['name']);
	// 				if (isset($data['company_code'])) $this->session->set_userdata('company_code', $data['company_code']);
	// 				if (isset($data['email'])) $this->session->set_userdata('email', $data['email']);
	// 				if (isset($data['mobile'])) $this->session->set_userdata('mobile', $data['mobile']);
	// 				if (isset($data['mobile1'])) $this->session->set_userdata('mobile1', $data['mobile1']);

	// 				$response = array('status' => 1, 'msg' => 'Updated successfully!');
	// 			} else {
	// 				$response = array('status' => 0, 'msg' => 'Nothing updated!');
	// 			}
	// 		} else {
	// 			$response = array('status' => 0, 'msg' => 'No data to update!');
	// 		}
	// 	} else {
	// 		$response = array('status' => 0, 'msg' => validation_errors());
	// 	}
	// 	echo json_encode($response);
	// 	exit;
	// }

	// public function update_profile_picture()
	// {
	// 	$company_id = $this->session->userdata('company_id');

	// 	if (empty($company_id)) {
	// 		$response = array('status' => 0, 'msg' => 'No company ID found in session!');
	// 		echo json_encode($response);
	// 		exit;
	// 	}
	// 	$company = $this->common_model->company_by_id($company_id);

	// 	if (empty($company)) {
	// 		$response = array('status' => 0, 'msg' => 'Invalid company details!');
	// 		echo json_encode($response);
	// 		exit;
	// 	}
	// 	if (!empty($_FILES['profile_photo']['name'])) {
	// 		$config['upload_path'] = './assets/uploads/user_pic/';
	// 		$config['allowed_types'] = 'jpg|png|jpeg';
	// 		$config['file_name'] = time() . '_' . $_FILES['profile_photo']['name'];
	// 		$config['overwrite'] = true;
	// 		$this->load->library('upload', $config);
	// 		if ($this->upload->do_upload('profile_photo')) {
	// 			// Remove the existing profile photo if it exists
	// 			if (!empty($company['profile_photo']) && file_exists('./assets/uploads/user_pic/' . $company['profile_photo'])) {
	// 				unlink('./assets/uploads/user_pic/' . $company['profile_photo']);
	// 			}
	// 			$upload_data = $this->upload->data();
	// 			$profile_photo = $upload_data['file_name'];

	// 			$update_resp = $this->common_model->update(
	// 				array('profile_photo' => $profile_photo),
	// 				array('company_id' => $company_id),
	// 				'company'
	// 			);
	// 			if ($update_resp) {
	// 				$this->session->set_userdata('profile_photo', $profile_photo);
	// 				$response = array('status' => 1, 'msg' => 'Profile picture updated successfully!');
	// 				echo json_encode($response);
	// 				exit;
	// 			} else {
	// 				$response = array('status' => 0, 'msg' => 'Failed to update profile picture in the database.');
	// 				echo json_encode($response);
	// 				exit;
	// 			}
	// 		} else {
	// 			$response = array('status' => 0, 'msg' => 'Profile picture upload failed: ' . $this->upload->display_errors());
	// 			echo json_encode($response);
	// 			exit;
	// 		}
	// 	} else {
	// 		$response = array('status' => 0, 'msg' => 'No profile picture uploaded.');
	// 		echo json_encode($response);
	// 		exit;
	// 	}
	// }

	function company_delete_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(8)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('company_id', 'Company id', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);

			$resp = $this->common_model->company_delete($data['company_id']);
			if (!empty($resp)) {
				$response = array('status' => 1, 'msg' => 'Deleted successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function company_details($company_id)
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(7)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['company_details'] = $this->common_model->company_by_id($company_id);

		if (empty($page_data['company_details'])) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['page_name']    = 'company_details';
		$page_data['menu']         = 'company';
		$page_data['page_title']   = 'Company Details';
		$this->load->view('theme/user/main', $page_data);
	}

	function add_signature()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(13)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['menu']         = 'signature';
		$page_data['page_name']    = 'add_signature';
		$page_data['page_title']   = 'Add Signature';
		$page_data['companies']  = $this->common_model->selectAll('company', '', '*');
		$this->load->view('theme/user/main', $page_data);
	}

	function add_signature_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(13)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('company_id', 'Company', 'trim|required');
		$this->form_validation->set_rules('director_id', 'Director', 'trim|required');
		$this->form_validation->set_rules('serial_no', 'Serial No.', 'trim|required|is_unique[signatures.serial_no]');
		$this->form_validation->set_rules('expiry_date', 'Expiry Date', 'trim|required');
		$this->form_validation->set_rules('remarks', 'Remarks', 'trim');
		$this->form_validation->set_rules('in_out', 'In/Out', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);
			$data['expiry_date'] = set_date($data['expiry_date']);
			$data['modified_at'] = date('Y-m-d H:i:s');
			$data['modified_by'] = $this->session->userdata('employee_id');
			unset($data['company_id']);
			$signature_id = $this->common_model->insert($data, 'signatures');
			if (!empty($signature_id)) {
				$response = array('status' => 1, 'msg' => 'Registered successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function view_signatures($filter = "")
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(14) && !check_permission(15) && !check_permission(16)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['filter']      = $filter;
		$page_data['page_type']    = 'user';
		$page_data['page_name']    = 'view_signatures';
		$page_data['menu']         = 'signature';
		$page_data['page_title']   = 'View Signatures';
		$this->load->view('theme/user/main', $page_data);
	}

	function view_signatures_ajax()
	{

		$companys['data'] = [];
		if (!check_permission(14) && !check_permission(15) && !check_permission(16)) {
			echo json_encode($companys);
			exit;
		}

		$filter = $this->input->post('filter');
		$all = $this->common_model->signatures_list($filter);
		//pr($all);

		if (!empty($all)) {

			foreach ($all as $key => $value) {
				$companys['data'][$key]['company']      = $value['company'];
				$companys['data'][$key]['director']    = $value['director'];
				$companys['data'][$key]['serial_no']   = $value['serial_no'];
				$companys['data'][$key]['expiry_date']   = get_date($value['expiry_date']);
				$companys['data'][$key]['in_out'] = inout_status($value['in_out']);
				$companys['data'][$key]['remarks']    = ($value['remarks'] != "") ? nl2br($value['remarks']) : '-';
				$days = days_to_expire($value['expiry_date']);
				$companys['data'][$key]['days_to_expire'] = $days['html'];

				$companys['data'][$key]['action'] = ((check_permission(14)) ? '<a href="' . base_url('edit-signature/' . $value['signature_id']) . '" class="btn btn-sm btn-outline-secondary" title="Edit"><i class="fa fa-edit"></i></a>' : '') . ((check_permission(16)) ? '&nbsp;<button type="button" class="btn btn-sm btn-outline-danger" title="Delete" onclick="deleteSignature(\'' . $value['signature_id'] . '\')"><i class="fa fa-trash-o"></i></button>' : '');
			}
		}
		echo json_encode($companys);
	}

	function view_tasks($filter = "")
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		// if (!check_permission(14) && !check_permission(15) && !check_permission(16)) {
		// 	$this->session->set_flashdata('error', 'Permission denied!');
		// 	redirect('dashboard', 'refresh');
		// }

		$page_data['filter']      = $filter;
		$page_data['page_type']    = 'user';
		$page_data['page_name']    = 'view_task';
		$page_data['menu']         = 'dashboard';
		$page_data['page_title']   = 'View All Tasks';
		$this->load->view('theme/user/main', $page_data);
	}

	function view_tasks_ajax()
	{
		$companys['data'] = [];

		// Get the current user's role and company ID
		$role_id = $this->session->userdata('role_id');
		$company_id = $this->session->userdata('company_id');

		$filter = $this->input->post('filter');
		$dte1 = date('Y-m-d');

		// Base query
		$this->db->select('w.*, c.name as companyName, e.name as employeeName')
			->from('works as w')
			->join('company as c', 'c.company_id = w.company_id', 'left')
			->join('employees as e', 'e.employee_id = w.assigned_to', 'left');

		// Apply company filter if role_id == 6 (company admin)
		if ($role_id == 6) {
			$this->db->where('w.company_id', $company_id);
		}

		// Apply filters based on the task status or other conditions
		if ($filter == 'tasks') {
			$all = $this->db->get()->result_array();
		} else {
			if ($filter == 'allotted') {
				$all = $this->db->where('w.last_date >=', $dte1)
					->where('w.status', 'allotted')
					->get()->result_array();
			} elseif ($filter == 'pending') {
				$all = $this->db->where('w.last_date <=', $dte1)
					->where('w.status !=', 'finished')
					->get()->result_array();
			} else {
				$all = $this->db->where('w.status !=', 'allotted')
					->get()->result_array();
			}
		}


		if (!empty($all)) {
			foreach ($all as $key => $value) {
				$companys['data'][$key]['company']      = $value['companyName'];
				$companys['data'][$key]['task']         = $value['title'];
				$companys['data'][$key]['description']  = $value['description'];
				$companys['data'][$key]['assign_to']    = $value['employeeName'];
				$companys['data'][$key]['date']         = date('d-m-Y', strtotime($value['work_date']));
				$companys['data'][$key]['last_date']    = date('d-m-Y', strtotime($value['last_date']));
				$companys['data'][$key]['status']       = work_status($value['status']);
			}
		}

		echo json_encode($companys);
	}

	function get_directors()
	{

		$company_id = $this->input->post('company_id');
		$directors = $this->common_model->selectAll('directors', array('company_id' => $company_id), '*');
		$out['message'] = 'Directors list';
		$out['success'] = true;
		$out['result'] = (!empty($directors) ? $directors : []);
		echo json_encode($out);
	}

	function edit_signature($signature_id)
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(14)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['menu']         = 'signature';
		$page_data['page_name']    = 'edit_signature';
		$page_data['page_title']   = 'Edit Signature';
		$page_data['companies']  = $this->common_model->selectAll('company', '', '*');
		$page_data['signature'] = $this->common_model->signature_by_id($signature_id);
		if (empty($page_data['signature'])) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('view-signatures', 'refresh');
		}
		$this->load->view('theme/user/main', $page_data);
	}

	function edit_signature_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(14)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('signature_id', 'Signature', 'trim|required');
		$this->form_validation->set_rules('company_id', 'Company', 'trim|required');
		$this->form_validation->set_rules('director_id', 'Director', 'trim|required');
		$this->form_validation->set_rules('serial_no', 'Serial No.', 'trim|required');
		$this->form_validation->set_rules('expiry_date', 'Expiry Date', 'trim|required');
		$this->form_validation->set_rules('in_out', 'In/Out', 'trim|required');
		$this->form_validation->set_rules('remarks', 'Remarks', 'trim');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);

			$signature = $this->common_model->signature_by_id($data['signature_id']);

			if (empty($signature)) {
				$response = array('status' => 0, 'msg' => 'Invalid signature details!');
				echo json_encode($response);
				exit;
			}

			$data['expiry_date'] = set_date($data['expiry_date']);
			$data['modified_at'] = date('Y-m-d H:i:s');
			$data['modified_by'] = $this->session->userdata('employee_id');
			unset($data['company_id']);
			unset($data['signature_id']);
			$signature_id = $this->common_model->update($data, array('signature_id' => $signature['signature_id']), 'signatures');
			if (!empty($signature_id)) {
				$response = array('status' => 1, 'msg' => 'Updated successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function signature_delete_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(16)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('signature_id', 'Signature', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);

			$resp = $this->common_model->signature_delete($data['signature_id']);
			if (!empty($resp)) {
				$response = array('status' => 1, 'msg' => 'Deleted successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function permissions()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if ($this->session->userdata('role_id') != 5) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['page_name']    = 'permissions';
		$page_data['menu']         = 'permissions';
		$page_data['page_title']   = 'Permissions';
		$this->load->view('theme/user/main', $page_data);
	}

	function view_permissions_ajax()
	{

		$role['data'] = [];
		if ($this->session->userdata('role_id') != 5) {
			echo json_encode($role);
			exit;
		}

		$all = $this->common_model->selectAll('roles', array('role_id !=' => '5'), '*');

		if (!empty($all)) {
			foreach ($all as $key => $value) {
				$role['data'][$key]['role']      = $value['role'];
				$role['data'][$key]['action'] = '<button type="button" class="btn btn-sm btn-outline-info" title="View" onclick="showAjaxModal(\'' . base_url('user/popup/set_permission/' . $value['role_id']) . '\',\'Permissions\')"><i class="fa fa-lock"></i></button>';
			}
		}
		echo json_encode($role);
	}

	function permission_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if ($this->session->userdata('role_id') != 5) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('role_id', 'Role', 'trim|required');
		$this->form_validation->set_rules('module_id', 'Module', 'trim|required');
		$this->form_validation->set_rules('value', 'Value', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);
			if ($data['value'] == 0) {
				$resp = $this->common_model->deleteByids(array('module_id' => $data['module_id'], 'role_id' => $data['role_id']), 'permissions');
			} else {
				$exist = $this->common_model->selectAll('permissions', array('module_id' => $data['module_id'], 'role_id' => $data['role_id']), '*');
				if (empty($exist)) {
					$resp = $this->common_model->insert(array('module_id' => $data['module_id'], 'role_id' => $data['role_id']), 'permissions');
				}
			}
			if (!empty($resp)) {
				$response = array('status' => 1, 'msg' => 'Permission changed successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function create_reminder_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(25)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('title', 'Title', 'trim|required');
		$this->form_validation->set_rules('reminder_date', 'Reminder Date', 'trim|required');
		$this->form_validation->set_rules('description', 'Description', 'trim|required');
		$this->form_validation->set_rules('color', 'Highlight', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);

			$param = array(
				'title' => $data['title'],
				'reminder_date' => set_date($data['reminder_date']),
				'description' => $data['description'],
				'color' => $data['color'],
				'created_by' => $this->session->userdata('employee_id'),
				'remind_to' => $this->session->userdata('employee_id'),
				'created_at' => date('Y-m-d H:i:s')
			);

			$resp = $this->common_model->insert($param, 'reminders');

			if (!empty($resp)) {
				$response = array('status' => 1, 'msg' => 'Reminder added successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function get_reminders()
	{
		$employee_id = $this->session->userdata('employee_id');
		$role = $this->session->userdata('role_id');
		$reminders = $this->common_model->get_reminders($employee_id, $role);
		echo json_encode($reminders);
		exit;
	}

	function reminder_delete_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(28)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('reminder_id', 'Reminder', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);

			$resp = $this->common_model->reminder_delete($data['reminder_id']);
			if (!empty($resp)) {
				$response = array('status' => 1, 'msg' => 'Deleted successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function edit_reminder_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(26)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('reminder_id', 'Reminder', 'trim|required');
		$this->form_validation->set_rules('title', 'Title', 'trim|required');
		$this->form_validation->set_rules('reminder_date', 'Reminder Date', 'trim|required');
		$this->form_validation->set_rules('description', 'Description', 'trim|required');
		$this->form_validation->set_rules('color', 'Highlight', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);

			$param = array(
				'title' => $data['title'],
				'reminder_date' => set_date($data['reminder_date']),
				'description' => $data['description'],
				'color' => $data['color'],
				'created_by' => $this->session->userdata('employee_id'),
				'remind_to' => $this->session->userdata('employee_id'),
				'created_at' => date('Y-m-d H:i:s')
			);

			$resp = $this->common_model->update($param, array('reminder_id' => $data['reminder_id']), 'reminders');

			if (!empty($resp)) {
				$response = array('status' => 1, 'msg' => 'Reminder updated successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	// function profile()
	// {
	// 	$role_id = $this->session->userdata('role_id');
	// 	if (!check_user_login()) {
	// 		redirect('signin', 'refresh');
	// 	}
	// 	// $employee_id  = $this->session->userdata('employee_id');

	// 	$page_data['page_type']    = 'user';
	// 	$page_data['menu']         = 'dashboard';
	// 	$page_data['page_name']    = 'profile';
	// 	$page_data['page_title']   = 'Profile';
	// 	if ($role_id == 6) {
	// 		$page_data['user_details'] = $this->session->userdata();
	// 	} else {
	// 		// $page_data['user_details'] = $this->common_model->employee_by_id($employee_id);
	// 		$page_data['user_details'] = [];
	// 	}
	// 	$this->load->view('theme/user/main', $page_data);
	// }


	// function change_password()
	// {
	// 	if (!check_user_login()) {
	// 		redirect('signin', 'refresh');
	// 	}

	// 	$this->form_validation->set_rules('old_password', 'Old Password', 'trim|required');
	// 	$this->form_validation->set_rules('password', 'Password', 'trim|required');
	// 	$this->form_validation->set_rules('confirm_password', 'Confirm Password', 'required|matches[password]');
	// 	$this->form_validation->set_rules('employee_id', 'Employee ID', 'trim|required');

	// 	if ($this->form_validation->run()) {
	// 		$data = $this->input->post(NULL, true);
	// 		$employee_id = $data['employee_id'];

	// 		if (!empty($employee_id)) {
	// 			// Fetch the old password from the database
	// 			if ($this->session->userdata('role_id') == 6) {
	// 				$user = $this->common_model->selectOne('company', ['company_id' => $employee_id], 'password');
	// 			} else {
	// 				$user = $this->common_model->selectOne('employees', ['employee_id' => $employee_id], 'password');
	// 			}

	// 			if (!$user) {
	// 				$response = array('status' => 0, 'msg' => 'User not found!');
	// 				echo json_encode($response);
	// 				exit;
	// 			}

	// 			// Check if the old password matches
	// 			if (md5($data['old_password']) != $user['password']) {
	// 				$response = array('status' => 0, 'msg' => 'password is incorrect!');
	// 				echo json_encode($response);
	// 				exit;
	// 			}

	// 			// Proceed to update password if old password is correct
	// 			$update_data = array('password' => md5($data['password']));

	// 			if ($this->session->userdata('role_id') == 6) {
	// 				$resp = $this->common_model->update($update_data, array('company_id' => $employee_id), 'company');
	// 			} else {
	// 				$resp = $this->common_model->update($update_data, array('employee_id' => $employee_id), 'employees');
	// 			}

	// 			if ($resp) {
	// 				$response = array('status' => 1, 'msg' => 'Password updated successfully!');
	// 				echo json_encode($response);
	// 				exit;
	// 			} else {
	// 				$response = array('status' => 0, 'msg' => 'Something went wrong while updating the password!');
	// 				echo json_encode($response);
	// 				exit;
	// 			}
	// 		} else {
	// 			$response = array('status' => 0, 'msg' => 'Invalid employee ID!');
	// 			echo json_encode($response);
	// 			exit;
	// 		}
	// 	} else {
	// 		// If form validation fails, return validation errors
	// 		$response = array('status' => 0, 'msg' => validation_errors());
	// 		echo json_encode($response);
	// 		exit;
	// 	}
	// }

	public function employee_change_password()
	{
		// Check if the user is logged in
		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		// Set validation rules
		$this->form_validation->set_rules('old_password', 'Old Password', 'trim|required');
		$this->form_validation->set_rules('password', 'Password', 'trim|required');
		$this->form_validation->set_rules('confirm_password', 'Confirm Password', 'required|matches[password]');
		$this->form_validation->set_rules('employee_id', 'Employee ID', 'trim|required');

		// Run form validation
		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);
			$employee_id = $data['employee_id'];

			if (!empty($employee_id)) {
				// Fetch the employee's current password from the database
				$employee = $this->common_model->selectOne('employees', ['employee_id' => $employee_id], 'password');

				// Check if employee exists
				if (!$employee) {
					$response = array('status' => 0, 'msg' => 'Employee not found!');
					echo json_encode($response);
					exit;
				}

				// Verify the old password
				if (md5($data['old_password']) != $employee['password']) {
					$response = array('status' => 0, 'msg' => 'Old password is incorrect!');
					echo json_encode($response);
					exit;
				}

				// Prepare new password update data
				$update_data = array('password' => md5($data['password']));

				// Update the employee's password in the database
				$resp = $this->common_model->update($update_data, array('employee_id' => $employee_id), 'employees');

				// Check if the password update was successful
				if ($resp) {
					$response = array('status' => 1, 'msg' => 'Password updated successfully!');
				} else {
					$response = array('status' => 0, 'msg' => 'Failed to update password. Please try again!');
				}
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Invalid employee ID!');
				echo json_encode($response);
				exit;
			}
		} else {
			// If form validation fails, return validation errors
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}


	function reminderNotifications()
	{

		$employee_id = $this->session->userdata('employee_id');
		$role_id = $this->session->userdata('role_id');
		$page_data['notifi']  = $this->common_model->reminderNotifications($employee_id, $role_id);
		$this->load->view('user/reminder-notification-ajax', $page_data);
	}

	function generalNotifications()
	{

		$employee_id = $this->session->userdata('employee_id');
		$page_data['notifi']  = $this->common_model->generalNotifications($employee_id);
		$this->load->view('user/general-notification-ajax', $page_data);
	}

	function readNotifications()
	{

		$employee_id = $this->session->userdata('employee_id');
		$notification_id = $this->input->post('notification_id');
		$this->common_model->readNotifications($employee_id, $notification_id);
	}

	function add_work()
	{
		$company_id = $this->session->userdata('company_id');
		$role_id = $this->session->userdata('role_id');
		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(17)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['menu']         = 'work';
		$page_data['page_name']    = 'add_work';
		$page_data['page_title']   = 'Add Work';
		// $page_data['employees']  = $this->common_model->selectAll('employees',array('status'=>'active','role_id !='=>'5'),'*');
		if ($role_id == 6) {
			$page_data['employees']  = $this->common_model->employees_list([
				'e.role_id' => 1,
				'e.company_id' => $company_id
			]);
		} else {
			$page_data['employees']  = $this->common_model->selectAll('employees', array('status' => 'active', 'role_id !=' => '5'), '*');
		}

		if ($role_id == 6) {
			$page_data['companies']  = $this->common_model->selectAll('company', ['company_id' => $company_id], '*');
		} else {
			$page_data['companies']  = $this->common_model->selectAll('company', '', '*');
		}
		// $page_data['companies']  = $this->common_model->selectAll('company', '', '*');
		$this->load->view('theme/user/main', $page_data);
	}

	function add_work_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(17)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('company_id', 'Company', 'trim|required');
		$this->form_validation->set_rules('assigned_to', 'Employee', 'trim|required');
		$this->form_validation->set_rules('title', 'Title', 'trim|required');
		$this->form_validation->set_rules('description', 'Description', 'trim|required');
		$this->form_validation->set_rules('work_date', 'Start Date', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);

			$param = array(
				'company_id' => $data['company_id'],
				'title' => $data['title'],
				'description' => $data['description'],
				'work_date' => set_date($data['work_date']),
				'last_date' => (!empty($data['last_date'])) ? set_date($data['last_date']) : NULL,
				'parent_id' => '0',
				'created_by' => $this->session->userdata('employee_id'),
				'assigned_to' => $data['assigned_to'],
				'status' => 'allotted',
				'checked_by' => ($data['checked_by'] != "") ? $data['checked_by'] : NULL,
				'remarks' => ($data['remarks'] != "") ? $data['remarks'] : NULL,
				'modified_at' => date('Y-m-d H:i:s'),
				'modified_by' => $this->session->userdata('employee_id')
			);

			$work = $this->common_model->insert($param, 'works');
			if (!empty($work)) {
				//save to notification
				$notify = array('notification_type' => 'work-assignment', 'employee_id' => $data['assigned_to'], 'notification_details' => array('work_id' => $work));
				$this->settings->saveNotification($notify);

				$response = array('status' => 1, 'msg' => 'Saved successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function view_works($filter = "", $parent_id = "")
	{

		$company_id = $this->session->userdata('company_id');
		$role_id = $this->session->userdata('role_id');
		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(18) && !check_permission(19) && !check_permission(20) && !check_permission(21) && check_permission(22)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['filter']       = $filter;
		$page_data['parent_id']    = $parent_id;
		$page_data['page_type']    = 'user';
		$page_data['page_name']    = 'view_works';
		$page_data['menu']         = 'work';
		$page_data['page_title']   = 'View Tasks';
		if ($role_id != 6) {
			$page_data['companies'] = $this->common_model->selectAll('company', ['status' => 'active'], '*');
		}
		if ($role_id == 6) {
			$page_data['employees']  = $this->common_model->employees_list([
				'e.role_id' => 1,
				'e.company_id' => $company_id
			]);
		} else {
			$page_data['employees']  = $this->common_model->selectAll('employees', array('status' => 'active', 'role_id !=' => '5'), '*');
		}
		$this->load->view('theme/user/main', $page_data);
	}

	// function view_works_ajax() {

	// 	$companys['data'] = [];

	// 	if(!check_permission(18) && !check_permission(19) && !check_permission(20) && !check_permission(21) && check_permission(22)) {
	// 	   echo json_encode($companys);
	// 	   exit;
	// 	}

	// 	$employee_id = $this->session->userdata('employee_id');
	// 	$role_id = $this->session->userdata('role_id');
	//  	$filter = $this->input->post('filter');	
	// 	$parent_id = $this->input->post('parent_id');		
	// 	$all = $this->common_model->works_list($employee_id,$role_id,$filter,$parent_id);
	// 	//pr($all);

	// 	if(!empty($all)) {

	// 		foreach($all as $key=>$value) {
	// 			$companys['data'][$key]['title']       = $value['title'];
	// 			$companys['data'][$key]['description'] = nl2br($value['description']);
	// 			$companys['data'][$key]['company']     = $value['company'];
	//             $companys['data'][$key]['assigned_to'] = $value['assigned_to'];
	// 			$companys['data'][$key]['work_date']   = get_date($value['work_date']);
	// 			$companys['data'][$key]['last_date']   = get_date($value['last_date']);
	// 			$companys['data'][$key]['tasktype']    = task_type($value['tasktype']);
	// 			$companys['data'][$key]['subtasks']    = $value['subtasks'].' '.(($value['subtasks'] > 0)?'&nbsp;<a href="'.base_url('view-works/sub/'.$value['work_id']).'" class="badge badge-primary">Sub</a>':'');
	// 			$companys['data'][$key]['checked_by']  = ($value['checked_by']!="")?$value['checked_by']:'-';
	// 			$companys['data'][$key]['remarks']     = ($value['remarks'] != "")?$value['remarks']:'-';
	// 			$companys['data'][$key]['status']      = work_status($value['status']);
	// 			$companys['data'][$key]['modified_at'] = get_date($value['modified_at']);
	// 			$companys['data'][$key]['invoice_no']   = $value['invoice_no'];

	// 			$companys['data'][$key]['action'] = ((check_permission(21))?'<button type="button" class="btn btn-sm btn-outline-info" title="Split Work" onclick="showAjaxModal(\''.base_url('user/popup/split_work/'.$value['work_id'].'/'.$value['company_id']).'\',\'Split Work\')"><i class="fa fa-list"></i></button>':'').(($value['status']=='finished' && $value['parent_id'] == 0 && check_permission(22))?'&nbsp;<button type="button" class="btn btn-sm btn-outline-primary" title="Create Invoice" onclick="showAjaxModal(\''.base_url('user/popup/create_invoice/'.$value['work_id']).'\',\'Create Invoice\')"><i class="fa fa-files-o"></i></button>':'').((check_permission(19))?'&nbsp;<button type="button" class="btn btn-sm btn-outline-warning" title="View Work" onclick="showAjaxModal(\''.base_url('user/popup/view_work/'.$value['work_id']).'\',\'View Work\')"><i class="fa fa-eye"></i></button>':'').((check_permission(18))?'&nbsp;<button type="button" class="btn btn-sm btn-outline-success" title="Edit Work" onclick="showAjaxModal(\''.base_url('user/popup/edit_work/'.$value['work_id']).'\',\'Edit Work\')"><i class="fa fa-edit"></i></button>':'').((check_permission(20))?'&nbsp;<button type="button" class="btn btn-sm btn-outline-danger" title="Delete" onclick="deleteWork(\''.$value['work_id'].'\')"><i class="fa fa-trash-o"></i></button>':'');

	// 		}

	// 	}		
	// 	echo json_encode($companys);

	// }

	function view_works_ajax()
	{

		$companys['data'] = [];

		if (!check_permission(18) && !check_permission(19) && !check_permission(20) && !check_permission(21) && !check_permission(22)) {
			echo json_encode($companys);
			exit;
		}

		$employee_id = $this->session->userdata('employee_id');
		$role_id = $this->session->userdata('role_id');
		$company_id = $this->session->userdata('company_id');
		$filter = $this->input->post('filter');
		$parent_id = $this->input->post('parent_id');

		$status = $this->input->post('status');
		$assigned_to = $this->input->post('assigned_to');
		$company = $this->input->post('company');


		if ($role_id == 6) {
			$all = $this->common_model->works_list($employee_id, $role_id, $filter, $parent_id, $company_id, $status, $assigned_to);
		} else {
			$all = $this->common_model->works_list($employee_id, $role_id, $filter, $parent_id, null, $status, $assigned_to, $company);
		}

		if (!empty($all)) {
			foreach ($all as $key => $value) {
				$companys['data'][$key]['title']       = $value['title'];
				$companys['data'][$key]['description'] = nl2br($value['description']);
				$companys['data'][$key]['company']     = $value['company'];
				$companys['data'][$key]['assigned_to'] = $value['assigned_to'];
				$companys['data'][$key]['work_date']   = get_date($value['work_date']);
				$companys['data'][$key]['last_date']   = get_date($value['last_date']);
				$companys['data'][$key]['tasktype']    = task_type($value['tasktype']);
				$companys['data'][$key]['subtasks']    = $value['subtasks'] . ' ' . (($value['subtasks'] > 0) ? '&nbsp;<a href="' . base_url('view-works/sub/' . $value['work_id']) . '" class="badge badge-primary">Sub</a>' : '');
				$companys['data'][$key]['checked_by']  = ($value['checked_by'] != "") ? $value['checked_by'] : '-';
				$companys['data'][$key]['remarks']     = ($value['remarks'] != "") ? $value['remarks'] : '-';
				$companys['data'][$key]['status']      = work_status($value['status']);
				$companys['data'][$key]['modified_at'] = get_date($value['modified_at']);
				$companys['data'][$key]['invoice_no']  = $value['invoice_no'];

				$companys['data'][$key]['action'] =
					// ((check_permission(21)) ? '<button type="button" class="btn btn-sm btn-outline-info" title="Split Work" onclick="showAjaxModal(\'' . base_url('user/popup/split_work/' . $value['work_id'] . '/' . $value['company_id']) . '\',\'Split Work\')"><i class="fa fa-list"></i></button>' : '') .
					// (($value['status'] == 'finished' && $value['parent_id'] == 0 && check_permission(22)) ? '&nbsp;<button type="button" class="btn btn-sm btn-outline-primary" title="Create Invoice" onclick="showAjaxModal(\'' . base_url('user/popup/create_invoice/' . $value['work_id']) . '\',\'Create Invoice\')"><i class="fa fa-files-o"></i></button>' : '') .
					((check_permission(19)) ? '&nbsp;<button type="button" class="btn btn-sm btn-outline-warning" title="View Work" onclick="showAjaxModal(\'' . base_url('user/popup/view_work/' . $value['work_id']) . '\',\'View Work\')"><i class="fa fa-eye"></i></button>' : '') .
					// ((check_permission(18)) ? '&nbsp;<button type="button" class="btn btn-sm btn-outline-success" title="Edit Work" onclick="showAjaxModal(\'' . base_url('user/popup/edit_work/' . $value['work_id']) . '\',\'Edit Work\')"><i class="fa fa-edit"></i></button>' : '') .
					((check_permission(20)) ? '&nbsp;<button type="button" class="btn btn-sm btn-outline-danger" title="Delete" onclick="deleteWork(\'' . $value['work_id'] . '\')"><i class="fa fa-trash-o"></i></button>' : '');
			}
		}

		echo json_encode($companys);
	}


	function ajax_split()
	{
		$page_data['count'] = $this->input->post('count');
		$page_data['employees']  = $this->common_model->selectAll('employees', array('status' => 'active', 'role_id !=' => '5'), '*');
		$this->load->view('user/ajax_split', $page_data);
	}

	function split_work_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(21)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('work_id', 'Work', 'trim|required');
		$this->form_validation->set_rules('company_id', 'Company', 'trim|required');
		$this->form_validation->set_rules('title[]', 'Title', 'trim|required');
		$this->form_validation->set_rules('description[]', 'Description', 'trim|required');
		$this->form_validation->set_rules('assigned_to[]', 'Assigned To', 'trim|required');
		$this->form_validation->set_rules('work_date[]', 'Work Date', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);
			$direct = array();

			if (!empty($data['title'])) {
				foreach ($data['title'] as $key => $value) {
					$direct[$key]['company_id']  = $data['company_id'];
					$direct[$key]['title'] = $data['title'][$key];
					$direct[$key]['description']    = $data['description'][$key];
					$direct[$key]['assigned_to']  = $data['assigned_to'][$key];
					$direct[$key]['work_date']  = set_date($data['work_date'][$key]);
					$direct[$key]['last_date']  = set_date($data['last_date'][$key]);
					$direct[$key]['parent_id']  = $data['work_id'];
					$direct[$key]['created_by']  = $this->session->userdata('employee_id');
					$direct[$key]['status'] = 'allotted';
					$direct[$key]['checked_by'] = ($data['checked_by'] != "") ? $data['checked_by'] : NULL;
					$direct[$key]['remarks'] = ($data['remarks'] != "") ? $data['remarks'] : NULL;
					$direct[$key]['modified_at'] = date('Y-m-d H:i:s');
					$direct[$key]['modified_by'] = $this->session->userdata('employee_id');
				}
			}

			//remove empty details
			$c = function ($v) {
				return array_filter($v) != array();
			};
			$direct = array_filter($direct, $c);
			$resp = $this->common_model->save_split($direct);
			if (!empty($resp)) {
				$response = array('status' => 1, 'msg' => 'Saved successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function work_delete_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(20)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('work_id', 'Work', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);

			$resp = $this->common_model->work_delete($data['work_id']);
			if (!empty($resp)) {
				$response = array('status' => 1, 'msg' => 'Deleted successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function edit_work_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(18)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('work_id', 'Work', 'trim|required');
		$this->form_validation->set_rules('company_id', 'Company', 'trim|required');
		$this->form_validation->set_rules('assigned_to', 'Employee', 'trim|required');
		$this->form_validation->set_rules('title', 'Title', 'trim|required');
		$this->form_validation->set_rules('description', 'Description', 'trim|required');
		$this->form_validation->set_rules('work_date', 'Start Date', 'trim|required');
		$this->form_validation->set_rules('status', 'Status', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);

			$param = array(
				'company_id' => $data['company_id'],
				'title' => $data['title'],
				'description' => $data['description'],
				'work_date' => set_date($data['work_date']),
				'last_date' => (!empty($data['last_date'])) ? set_date($data['last_date']) : NULL,
				'assigned_to' => $data['assigned_to'],
				'status' => $data['status'],
				'checked_by' => ($data['checked_by'] != "") ? $data['checked_by'] : NULL,
				'remarks' => ($data['remarks'] != "") ? $data['remarks'] : NULL,
				'modified_at' => date('Y-m-d H:i:s'),
				'modified_by' => $this->session->userdata('employee_id')
			);

			//if the status is finished, check all sub tasks are also finished
			$check_subtask_status = $this->common_model->check_subtask_status($data['work_id'], $data['status']);
			if (empty($check_subtask_status)) {
				$response = array('status' => 0, 'msg' => 'Some sub tasks are pending!');
				echo json_encode($response);
				exit;
			}

			$work = $this->common_model->update($param, array('work_id' => $data['work_id']), 'works');
			if (!empty($work)) {

				$created_by = $this->common_model->selectOne('works', array('work_id' => $data['work_id']), 'created_by');
				//save to notification
				$notify = array('notification_type' => 'work-update', 'employee_id' => $created_by['created_by'], 'notification_details' => array('work_id' => $data['work_id']));
				$this->settings->saveNotification($notify);

				$response = array('status' => 1, 'msg' => 'Updated successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function create_invoice_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(22)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('work_id', 'Work', 'trim|required');
		$this->form_validation->set_rules('company_id', 'Company', 'trim|required');
		$this->form_validation->set_rules('prof_fee', 'Professional Fee', 'trim|required');
		$this->form_validation->set_rules('roc_fee', 'ROC Fee', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);

			$param = array(
				'work_id' => $data['work_id'],
				'company_id' => $data['company_id'],
				'prof_fee' => $data['prof_fee'],
				'roc_fee' => $data['roc_fee'],
				'invoice_no' => $this->get_unique_code(),
				'invoice_amount' => ($data['prof_fee'] + $data['roc_fee']),
				'paid_amount' => 0,
				'balance_amount' => ($data['prof_fee'] + $data['roc_fee']),
				'created_at' => date('Y-m-d H:i:s'),
				'created_by' => $this->session->userdata('employee_id')
			);

			$invoice = $this->common_model->insert($param, 'invoices');
			if (!empty($invoice)) {
				$response = array('status' => 1, 'msg' => 'Created successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function view_invoices()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(23) && !check_permission(24)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['page_name']    = 'invoices';
		$page_data['menu']         = 'work';
		$page_data['page_title']   = 'View Invoices';
		$this->load->view('theme/user/main', $page_data);
	}

	function view_invoices_ajax()
	{

		$invoices['data'] = [];

		if (!check_permission(23) && !check_permission(24)) {
			echo json_encode($invoices);
			exit;
		}

		$all = $this->common_model->invoices_list();

		if (!empty($all)) {

			foreach ($all as $key => $value) {
				$invoices['data'][$key]['invoice_no']       = $value['invoice_no'];
				$invoices['data'][$key]['created_at'] = get_date($value['created_at']);
				$invoices['data'][$key]['company']     = $value['company'];
				$invoices['data'][$key]['work']     = $value['work'];
				$invoices['data'][$key]['prof_fee']    = $value['prof_fee'];
				$invoices['data'][$key]['roc_fee']   = $value['roc_fee'];
				$invoices['data'][$key]['invoice_amount']   = $value['invoice_amount'];
				$invoices['data'][$key]['paid_amount']   = $value['paid_amount'];
				$invoices['data'][$key]['balance_amount']   = $value['balance_amount'];
				$invoices['data'][$key]['status'] = payment_status($value['status']);
				$invoices['data'][$key]['action'] = ((check_permission(19)) ? '<button type="button" class="btn btn-sm btn-outline-warning" title="View Work" onclick="showAjaxModal(\'' . base_url('user/popup/view_work/' . $value['work_id']) . '\',\'View Work\')"><i class="fa fa-eye"></i></button>' : '') . ((check_permission(24)) ? '&nbsp;<button type="button" class="btn btn-sm btn-outline-success" title="Payment" onclick="showAjaxModal(\'' . base_url('user/popup/invoice_payment/' . $value['invoice_id']) . '\',\'Payment\')"><i class="fa fa-money"></i></button>' : '') . ((check_permission(23)) ? '&nbsp;<button type="button" class="btn btn-sm btn-outline-danger" title="Delete" onclick="deleteInvoice(\'' . $value['invoice_id'] . '\')"><i class="fa fa-trash-o"></i></button>' : '');
			}
		}
		echo json_encode($invoices);
	}

	function invoice_delete_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(23)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('invoice_id', 'Invoice', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);

			$resp = $this->common_model->invoice_delete($data['invoice_id']);
			if (!empty($resp)) {
				$response = array('status' => 1, 'msg' => 'Deleted successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function payment_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(24)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('invoice_id', 'Invoice', 'trim|required');
		$this->form_validation->set_rules('paid_amount', 'Paid Amount', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);
			$invoice = $this->common_model->selectOne('invoices', array('invoice_id' => $data['invoice_id']), '*');
			if (!empty($invoice)) {

				$paid_amount = round(($invoice['paid_amount'] + $data['paid_amount']), 2);
				$balance_amount = round(($invoice['invoice_amount'] - $paid_amount), 2);

				$iparam = array(
					'paid_amount' => $paid_amount,
					'balance_amount' => $balance_amount,
					'status' => (($data['status'] == 'paid') || ($balance_amount == 0)) ? 'paid' : 'pending',
					'status_changed' => date('Y-m-d H:i:s')
				);

				$iparam = $this->security->xss_clean($iparam);
				$resp1 = $this->common_model->update($iparam, array('invoice_id' => $data['invoice_id']), 'invoices');

				if (!empty($resp1)) {
					//update to payment history
					$ipparam = array(
						'invoice_id' => $invoice['invoice_id'],
						'paid_amount' => round($data['paid_amount'], 2),
						'modified_at' => date('Y-m-d H:i:s'),
						'modified_by' => $this->session->userdata('employee_id')
					);
					$ipparam = $this->security->xss_clean($ipparam);
					$this->common_model->insert($ipparam, 'payment_history');

					$response = array('status' => 1, 'msg' => 'Payment updated!');
					echo json_encode($response);
					exit;
				} else {
					$response = array('status' => 0, 'msg' => 'Payment not updated!');
					echo json_encode($response);
					exit;
				}
			} else {
				$response = array('status' => 0, 'msg' => 'Invoice details not found!');
				echo json_encode($response);
				exit;
			}


			$param = array(
				'work_id' => $data['work_id'],
				'company_id' => $data['company_id'],
				'prof_fee' => $data['prof_fee'],
				'roc_fee' => $data['roc_fee'],
				'invoice_no' => $this->get_unique_code(),
				'invoice_amount' => ($data['prof_fee'] + $data['roc_fee']),
				'paid_amount' => 0,
				'balance_amount' => ($data['prof_fee'] + $data['roc_fee']),
				'created_at' => date('Y-m-d H:i:s'),
				'created_by' => $this->session->userdata('employee_id')
			);

			$invoice = $this->common_model->insert($param, 'invoices');
			if (!empty($invoice)) {
				$response = array('status' => 1, 'msg' => 'Created successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function add_inout()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(29)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['menu']         = 'signature';
		$page_data['page_name']    = 'add_inout';
		$page_data['page_title']   = 'In/Out';
		$this->load->view('theme/user/main', $page_data);
	}

	function add_inout_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(29)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('serial_no', 'Serial No.', 'trim|required');
		$this->form_validation->set_rules('in_out', 'Inout', 'trim|required');
		$this->form_validation->set_rules('taken_by', 'Taken By', 'trim|required');
		$this->form_validation->set_rules('phone', 'Phone', 'trim|required');
		$this->form_validation->set_rules('remarks', 'Remarks', 'trim');
		$this->form_validation->set_rules('director', 'Director', 'trim');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);

			$signature = $this->common_model->signature_by_serial($data['serial_no']);
			if (empty($signature)) {
				$response = array('status' => 0, 'msg' => 'Signature details not found!');
				echo json_encode($response);
				exit;
			}

			$param = array(
				'signature_id' => $signature['signature_id'],
				'in_out' => $data['in_out'],
				'taken_by' => $data['taken_by'],
				'phone' => $data['phone'],
				'remarks' => ($data['remarks'] != "") ? $data['remarks'] : NULL,
				'director' => ($data['director'] != "") ? $data['director'] : NULL,
				'modified_at' => date('Y-m-d H:i:s'),
				'modified_by' => $this->session->userdata('employee_id')
			);

			$inoutup = $this->common_model->insert($param, 'in_out_status');
			if (!empty($inoutup)) {

				//update signature status
				$param1 = array(
					'in_out' => $data['in_out'],
					'modified_at' => date('Y-m-d H:i:s'),
					'modified_by' => $this->session->userdata('employee_id')
				);

				$inoutup = $this->common_model->update($param1, array('signature_id' => $signature['signature_id']), 'signatures');
				if (!empty($inoutup)) {
					$response = array('status' => 1, 'msg' => 'Status updated successfully!');
					echo json_encode($response);
					exit;
				} else {
					$response = array('status' => 0, 'msg' => 'Status not updated!');
					echo json_encode($response);
					exit;
				}
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function view_inout()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(30) && !check_permission(31) && !check_permission(32)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['page_name']    = 'view_inout';
		$page_data['menu']         = 'signature';
		$page_data['page_title']   = 'View In/Out';
		$this->load->view('theme/user/main', $page_data);
	}

	function view_inout_ajax()
	{

		$inout['data'] = [];

		if (!check_permission(30) && !check_permission(31) && !check_permission(32)) {
			echo json_encode($inout);
			exit;
		}

		$all = $this->common_model->inout_list();

		if (!empty($all)) {

			foreach ($all as $key => $value) {
				$inout['data'][$key]['serial_no']       = $value['serial_no'];
				$inout['data'][$key]['director']     = ($value['director'] != "") ? $value['director'] : '-';
				$inout['data'][$key]['in_out'] = inout_status($value['in_out']);
				$inout['data'][$key]['modified_at'] = get_date($value['modified_at']);
				$inout['data'][$key]['taken_by']     = $value['taken_by'];
				$inout['data'][$key]['phone']     = $value['phone'];
				$inout['data'][$key]['remarks']    = nl2br($value['remarks']);

				$inout['data'][$key]['action'] = ((check_permission(30)) ? '<button type="button" class="btn btn-sm btn-outline-success" title="Edit In/Out" onclick="showAjaxModal(\'' . base_url('user/popup/edit_inout/' . $value['in_out_id']) . '\',\'Edit In/Out\')"><i class="fa fa-edit"></i></button>' : '') . ((check_permission(32)) ? '&nbsp;<button type="button" class="btn btn-sm btn-outline-danger" title="Delete" onclick="deleteInout(\'' . $value['in_out_id'] . '\')"><i class="fa fa-trash-o"></i></button>' : '');
			}
		}
		echo json_encode($inout);
	}

	function inout_delete_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(32)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('in_out_id', 'Inout', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);

			$resp = $this->common_model->inout_delete($data['in_out_id']);
			if (!empty($resp)) {
				$response = array('status' => 1, 'msg' => 'Deleted successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function edit_inout_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(30)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}
		$this->form_validation->set_rules('in_out_id', 'Inout', 'trim|required');
		$this->form_validation->set_rules('serial_no', 'Serial No.', 'trim|required');
		$this->form_validation->set_rules('in_out', 'Inout', 'trim|required');
		$this->form_validation->set_rules('taken_by', 'Taken By', 'trim|required');
		$this->form_validation->set_rules('phone', 'Phone', 'trim|required');
		$this->form_validation->set_rules('remarks', 'Remarks', 'trim');
		$this->form_validation->set_rules('director', 'Director', 'trim');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);

			$signature = $this->common_model->signature_by_serial($data['serial_no']);
			if (empty($signature)) {
				$response = array('status' => 0, 'msg' => 'Signature details not found!');
				echo json_encode($response);
				exit;
			}

			$param = array(
				'signature_id' => $signature['signature_id'],
				'in_out' => $data['in_out'],
				'taken_by' => $data['taken_by'],
				'phone' => $data['phone'],
				'remarks' => ($data['remarks'] != "") ? $data['remarks'] : NULL,
				'director' => ($data['director'] != "") ? $data['director'] : NULL,
				'modified_at' => date('Y-m-d H:i:s'),
				'modified_by' => $this->session->userdata('employee_id')
			);

			$inoutup = $this->common_model->update($param, array('in_out_id' => $data['in_out_id']), 'in_out_status');
			if (!empty($inoutup)) {

				//update signature status
				$param1 = array(
					'in_out' => $data['in_out'],
					'modified_at' => date('Y-m-d H:i:s'),
					'modified_by' => $this->session->userdata('employee_id')
				);

				$inoutup = $this->common_model->update($param1, array('signature_id' => $signature['signature_id']), 'signatures');
				if (!empty($inoutup)) {
					$response = array('status' => 1, 'msg' => 'Status updated successfully!');
					echo json_encode($response);
					exit;
				} else {
					$response = array('status' => 0, 'msg' => 'Status not updated!');
					echo json_encode($response);
					exit;
				}
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function attendance()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(33)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['page_name']    = 'view_attendance';
		$page_data['menu']         = 'attendance';
		$page_data['page_title']   = 'Attendance';
		$page_data['employees']  = $this->common_model->selectAll('employees', array('status' => 'active', 'role_id !=' => '5'), '*');
		$this->load->view('theme/user/main', $page_data);
	}

	function attendance_ajax()
	{

		$inout = [];

		if (!check_permission(33)) {
			echo json_encode($inout);
			exit;
		}

		$employee_id = $this->input->post('employee_id');
		$from_date = $this->input->post('from_date');
		$to_date = $this->input->post('to_date');

		$all = $this->common_model->attendance_report($employee_id, $from_date, $to_date);

		if (!empty($all)) {

			foreach ($all as $key => $value) {
				$inout[$key]['attendance_date']       = get_date($value['attendance_date']);
				$inout[$key]['employee'] = $value['name'];
				$inout[$key]['totaltime'] = (!empty($value['totaltime'])) ? sprintf("%d%s%d%s%d", floor($value['totaltime'] / 3600), "h ", ($value['totaltime'] / 60) % 60, "m ", $value['totaltime'] % 60) . 's' : '-';
				$inout[$key]['status'] = attendance_status($value['totaltime']);
			}
		}
		echo json_encode($inout);
	}

	function checkSignatureExist()
	{
		$serial_no = $this->input->post('serial_no');
		if (!empty($serial_no) && trim($serial_no) != "") {
			$exist = $this->common_model->checkSignatureExist($serial_no);
			if ($exist) {
				echo 'true';
			} else {
				echo 'false';
			}
		}
	}

	function checkUsername()
	{
		$username = $this->input->post('username');
		$employee_id = $this->input->post('employee_id');
		if (!empty($username) && trim($username) != "") {
			$exist = $this->common_model->checkUsername($username, $employee_id);
			if ($exist) {
				echo 'false';
			} else {
				echo 'true';
			}
		}
	}

	// function checkDupEmail()
	// {
	// 	$email = $this->input->post('email_id');
	// 	$employee_id = $this->input->post('employee_id');
	// 	if (!empty($email) && trim($email) != "") {
	// 		$exist = $this->common_model->checkDupEmail($email, $employee_id);
	// 		if ($exist) {
	// 			echo 'false';
	// 		} else {
	// 			echo 'true';
	// 		}
	// 	}
	// }

	function checkDupEmail()
	{
		$email = $this->input->post('email_id');

		$employee_id = $this->input->post('employee_id');
		$company_id = $this->input->post('company_id');
		// $company_id = $this->session->userdata('employee_id');

		if (!empty($email) && trim($email) != "") {
			// pr($company_id);
			// pr($email);
			// Pass company_id along with email and employee_id
			$exist = $this->common_model->checkDupEmail($email, $employee_id, $company_id);

			if ($exist) {
				echo 'false'; // Email exists in the company, duplication found
			} else {
				echo 'true'; // Email does not exist in the company, no duplication
			}
		}
	}



	function checkDupRegno()
	{
		$reg_no = $this->input->post('reg_no');
		$company_id = $this->input->post('company_id');
		if (!empty($reg_no) && trim($reg_no) != "") {
			$exist = $this->common_model->checkDupRegno($reg_no, $company_id);
			if ($exist) {
				echo 'false';
			} else {
				echo 'true';
			}
		}
	}

	function checkDupCinno()
	{
		$cin_no = $this->input->post('cin_no');
		$company_id = $this->input->post('company_id');
		if (!empty($cin_no) && trim($cin_no) != "") {
			$exist = $this->common_model->checkDupCinno($cin_no, $company_id);
			if ($exist) {
				echo 'false';
			} else {
				echo 'true';
			}
		}
	}

	function checkDupSignature()
	{
		$serial_no = $this->input->post('serial_no');
		$director_id = $this->input->post('director_id');
		if (!empty($serial_no) && trim($serial_no) != "") {
			$exist = $this->common_model->checkDupSignature($serial_no, $director_id);
			if ($exist) {
				echo 'false';
			} else {
				echo 'true';
			}
		}
	}

	function popup($page_name = '', $param2 = '', $param3 = '', $param4 = '')
	{

		$page_data['param2']        =   $param2;
		$page_data['param3']        =   $param3;
		$page_data['param4']        =   $param4;

		$this->load->view('user/' . $page_name, $page_data);
	}

	private function get_unique_code()
	{

		$code_feed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyv0123456789";
		$code_length = 8;  // Set this to be your desired code length
		$final_code = "";
		$feed_length = strlen($code_feed);

		for ($i = 0; $i < $code_length; $i++) {
			$feed_selector = rand(0, $feed_length - 1);
			$final_code .= substr($code_feed, $feed_selector, 1);
		}
		return strtoupper($final_code);
	}

	function sessioncheck()
	{

		$employee_id = $this->session->userdata('employee_id');
		$role_id = $this->session->userdata('role_id');
		if ($employee_id == "") {
			echo json_encode(array("message" => "nosession"));
		} else {
			$notifi = $this->common_model->notificationCount($employee_id, $role_id);
			echo json_encode(@$notifi);
		}
	}

	function view_subscriptions_ajax()
	{

		$subscriptions['data'] = [];

		if (!check_permission(6) && !check_permission(7) && !check_permission(8)) {
			echo json_encode($subscriptions);
			exit;
		}

		$all = $this->common_model->subscription_list();
		//pr($all);

		if (!empty($all)) {

			foreach ($all as $key => $value) {
				$subscriptions['data'][$key]['name']      	= '<a href="' . base_url() . 'company-details/' . $value['subsrciption_id'] . '" title="View Details">' . $value['name'] . '</a>';
				$subscriptions['data'][$key]['duration']    = $value['duration'] . (($value['duration'] > 1) ? " - Months" : " - Month");
				$subscriptions['data'][$key]['price']   	= $value['price'];
				$subscriptions['data'][$key]['max_workers']   	= $value['max_workers'];
				$subscriptions['data'][$key]['status']    	= 'Active';
				$subscriptions['data'][$key]['action'] = 	((check_permission(6)) ? '<a href="' . base_url('edit-subscription/' . $value['subsrciption_id']) . '" class="btn btn-sm btn-outline-secondary" title="Edit"><i class="fa fa-edit"></i></a>' : '') . ((check_permission(8)) ? '&nbsp;<button type="button" class="btn btn-sm btn-outline-danger" title="Delete" onclick="deleteSubscription(\'' . $value['subsrciption_id'] . '\')"><i class="fa fa-trash-o"></i></button>' : '');
			}
		}
		echo json_encode($subscriptions);
	}

	public function view_subscriptions()
	{
		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		// if (!check_permission(6) && !check_permission(7) && !check_permission(8)) {
		// 	$this->session->set_flashdata('error', 'Permission denied!');
		// 	redirect('dashboard', 'refresh');
		// }

		$page_data['page_type']    = 'user';
		$page_data['page_name']    = 'view_subscriptions';
		$page_data['menu']         = 'subscriptions';
		$page_data['page_title']   = 'View Subscriptions';
		$this->load->view('theme/user/main', $page_data);
	}

	function add_subscription()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		// if (!check_permission(5)) {
		// 	$this->session->set_flashdata('error', 'Permission denied!');
		// 	redirect('dashboard', 'refresh');
		// }

		$page_data['page_type']    = 'user';
		$page_data['menu']         = 'subscriptions';
		$page_data['page_name']    = 'add_subscription';
		$page_data['page_title']   = 'Add Subscription';
		$this->load->view('theme/user/main', $page_data);
	}

	function add_subscription_process()
	{
		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}
		if (!check_permission(5)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}
		$this->form_validation->set_rules('name', 'Name', 'trim|required');
		$this->form_validation->set_rules('duration', 'Duration', 'trim|required');
		$this->form_validation->set_rules('price', 'Price', 'trim|required');
		$this->form_validation->set_rules('status', 'Status', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);
			$data['name'] = ucfirst($data['name']);
			$data['created_on'] = date('Y-m-d H:i:s');
			$company_id = $this->common_model->insert($data, 'subscription');
			if (!empty($company_id)) {
				$response = array('status' => 1, 'msg' => 'Registered successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function edit_subscription($subscription_id)
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(6)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'user';
		$page_data['menu']         = 'subscriptions';
		$page_data['page_name']    = 'edit_subscription';
		$page_data['page_title']   = 'Edit Subscription';
		$page_data['subscription_details'] = $this->common_model->subscription_by_id($subscription_id);

		if (empty($page_data['subscription_details'])) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('view-subscriptions', 'refresh');
		}
		$this->load->view('theme/user/main', $page_data);
	}

	function edit_subscription_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(6)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('subsrciption_id', 'Subscription', 'trim|required');
		$this->form_validation->set_rules('name', 'Name', 'trim|required');
		$this->form_validation->set_rules('duration', 'Duration', 'trim|required');
		$this->form_validation->set_rules('price', 'Price', 'trim|required');
		$this->form_validation->set_rules('status', 'Status', 'trim|required');
		$this->form_validation->set_rules('max_workers', 'Max Workers', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);
			$subscriptions = $this->common_model->subscription_by_id($data['subsrciption_id']);

			if (empty($subscriptions)) {
				$response = array('status' => 0, 'msg' => 'Invalid company details!');
				echo json_encode($response);
				exit;
			}

			$data['name'] = ucfirst($data['name']);
			$data['duration'] = $data['duration'];
			$data['price'] = $data['price'];
			$data['status'] = $data['status'];
			$data['max_workers'] = $data['max_workers'];
			unset($data['subsrciption_id']);

			$user_update = $this->security->xss_clean($data);
			$update_resp = $this->common_model->update($user_update, array('subsrciption_id' => $subscriptions['subsrciption_id']), 'subscription');

			if (!empty($update_resp)) {
				$response = array('status' => 1, 'msg' => 'Updated successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Nothing updated!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	function subscription_delete_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		if (!check_permission(8)) {
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		$this->form_validation->set_rules('subsrciption_id', 'Subscription id', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);

			$resp = $this->common_model->subscription_delete($data['subsrciption_id']);
			if (!empty($resp)) {
				$response = array('status' => 1, 'msg' => 'Deleted successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}

	public function get_subscription_price()
	{
		$val = $this->input->post(NULL, true);
		$data = $this->common_model->subscription_by_id($val['subscription_id']);
		echo $data['price'];
	}

	public function check_subscription()
	{
		$val = $this->input->post(NULL, true);
		$company_data = $this->db->select('c.*,s.name as subscription, s.duration, s.price, s.max_workers')->from('company c')->join('subscription s', 's.subsrciption_id = c.subsrciption_id', 'left')->where('c.company_id', $val['company_id'])->get()->row();
		$employees = $this->db->select('COUNT(employee_id) as total_employees')->from('employees')->where('company_id', $val['company_id'])->get()->row();
		$expiry_date = date('Y-m-d', strtotime($company_data->subscription_added_on . '+ ' . $company_data->duration . ' months'));
		$currentDate = date('Y-m-d');
		if (strtotime($currentDate) > strtotime($expiry_date)) {
			$result = array('status' => 200, 'type' => 'error', 'msg' => 'your subscription plan has been expired');
		} else {
			if ($employees->total_employees > $company_data->max_workers) {
				$result = array('status' => 200, 'type' => 'error', 'msg' => 'your maximum employees already filled. Please upgrade you plan');
			} else {
				$result = array('status' => 200, 'type' => 'success', 'msg' => 'you are eligible for add employees');
			}
		}
		echo json_encode($result);
	}

	public function change_employee_status()
	{
		// Retrieve the company_id from the session
		$company_id = $this->session->userdata('company_id');
		$employee_id = $this->input->post('employee_id');
		$new_status = $this->input->post('status');

		// Ensure the necessary inputs are available
		if (empty($company_id)) {
			echo json_encode(['status' => 'error', 'message' => 'Company not logged in or invalid session.']);
			return;
		}

		// Ensure valid status input
		if (empty($employee_id) || !in_array($new_status, ['active', 'inactive'])) {
			echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
			return;
		}

		// If deactivating the employee, skip further checks and directly update the status
		if ($new_status == 'inactive') {
			$updated = $this->common_model->update(['status' => $new_status], ['employee_id' => $employee_id], 'employees');
			if ($updated) {
				echo json_encode(['status' => 'success', 'message' => 'Status updated successfully']);
			} else {
				echo json_encode(['status' => 'error', 'message' => 'Failed to update status']);
			}
			return;
		}
		// Only perform subscription and active user checks if activating the employee
		$subscription = $this->common_model->selectsubscription(
			'subscription_history',
			['company_id' => $company_id, 'expiry_date >=' => date('Y-m-d')],
			'*',
			'id ASC'
		);

		if (empty($subscription)) {
			echo json_encode(['status' => 'error', 'message' => 'No active subscription found.']);
			return;
		}

		// Get the maximum number of users allowed by the subscription
		$user_limit = $subscription['users_count'];

		// Count how many users are currently active for the company
		$active_users_count = $this->common_model->get_count('employees', [
			'company_id' => $company_id,
			'status' => 'active'
		]);

		// Ensure that activating the new user won't exceed the subscription's user limit
		if ($active_users_count >= $user_limit) {
			echo json_encode(['status' => 'error', 'message' => 'Max active user limit exceeded.']);
			return;
		}

		// Update the employee's status to active
		$updated = $this->common_model->update(['status' => $new_status], ['employee_id' => $employee_id], 'employees');

		if ($updated) {
			echo json_encode(['status' => 'success', 'message' => 'Status updated successfully']);
		} else {
			echo json_encode(['status' => 'error', 'message' => 'Failed to update status']);
		}
	}

	function add_document_category()
	{
		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}
		if (!check_permission(1)) {
			$this->session->set_flashdata('error', 'Permission denied!');
			redirect('dashboard', 'refresh');
		}
		$page_data['page_type']    = 'user';
		$page_data['menu']         = 'add_document_category';
		$page_data['page_name']    = 'add_document_category';
		$page_data['page_title']   = 'Add Document Category';

		$this->load->view('theme/user/main', $page_data);
	}


	public function add_documentcategory_process()
	{

		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		$this->form_validation->set_rules('name', 'Category Name', 'trim|required|is_unique[document_category.name]');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');

		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);

			$data['name'] = ucfirst($data['name']);
			$data['company_id'] = $this->session->userdata('employee_id');
			$data['created_on'] = date('Y-m-d H:i:s');

			$category_id = $this->common_model->insert($data, 'document_category');

			if (!empty($category_id)) {
				$response = array('status' => 1, 'msg' => 'Document category added successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}


	function view_document_category()
	{
		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}
		$page_data['page_type']    = 'user';
		$page_data['page_name']    = 'view_document_category';
		$page_data['menu']         = 'view_document_category';
		$page_data['page_title']   = 'View Document Category';
		$this->load->view('theme/user/main', $page_data);
	}

	function view_document_categories_ajax()
	{

		$categories['data'] = [];

		// if (!check_permission(6) && !check_permission(7) && !check_permission(8)) {
		//     echo json_encode($categories);
		//     exit;
		// }

		$role_id = $this->session->userdata('role_id');
		$company_id = $this->session->userdata('company_id');

		if ($role_id == 5) {
			$all = $this->common_model->selectAll('document_category', '', '*');
		} else {
			$all = $this->common_model->selectAll('document_category', ['company_id' => $company_id], '*');
		}
		if (!empty($all)) {
			foreach ($all as $key => $value) {
				if ($role_id == 6) {
					$categories['data'][$key]['name']     = $value['name'];
					$categories['data'][$key]['action']  = ('<a href="' . base_url('editCategory/' . $value['id']) . '" class="btn btn-sm btn-outline-secondary" title="Edit"><i class="fa fa-edit"></i></a>') . ('&nbsp;<button type="button" class="btn btn-sm btn-outline-danger" title="Delete" onclick="deleteCategory(\'' . $value['id'] . '\')"><i class="fa fa-trash-o"></i></button>');
				} else {
					$categories['data'][$key]['name'] = $value['name'];
					$categories['data'][$key]['action']  = ('<a href="' . base_url('editCategory/' . $value['id']) . '" class="btn btn-sm btn-outline-secondary" title="Edit"><i class="fa fa-edit"></i></a>') . ('&nbsp;<button type="button" class="btn btn-sm btn-outline-danger" title="Delete" onclick="deleteCategory(\'' . $value['id'] . '\')"><i class="fa fa-trash-o"></i></button>');
				}
			}
		}

		echo json_encode($categories);
	}

	public function document_category_delete_process()
	{
		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		// Check if the user has permission to delete document categories (adjust permission ID as needed)
		// if (!check_permission(8)) {
		// 	$response = array('status' => 0, 'msg' => 'Permission denied!');
		// 	echo json_encode($response);
		// 	exit;
		// }

		$this->form_validation->set_rules('document_category_id', 'Document Category ID', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');

		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);
			$resp = $this->common_model->deleteByids(['id' => $data['document_category_id']], 'document_category');

			if ($resp) {
				$response = array('status' => 1, 'msg' => 'Document category deleted successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}
	public function edit_document_category($category_id)
	{
		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		// Check if the user has permission to edit document categories (adjust permission ID as needed)
		// if (!check_permission(2)) { 
		// 	$this->session->set_flashdata('error', 'Permission denied!');
		// 	redirect('dashboard', 'refresh');
		// }

		// Page data to pass to the view
		$page_data['page_type'] = 'user';
		$page_data['menu'] = 'document_category';
		$page_data['page_name'] = 'edit_document_category';
		$page_data['page_title'] = 'Edit Document Category';
		$page_data['category_details'] = $this->common_model->selectOne('document_category', ['id' => $category_id], '*');
		if (empty($page_data['category_details'])) {
			$this->session->set_flashdata('error', 'Document category not found!');
			redirect('view-document-categories', 'refresh');
		}
		$this->load->view('theme/user/main', $page_data);
	}

	public function edit_document_category_process()
	{
		// Ensure the user is logged in
		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		// Check if the user has permission to edit document categories (adjust permission ID as needed)
		if (!check_permission(2)) {  // Adjust permission ID if necessary
			$response = array('status' => 0, 'msg' => 'Permission denied!');
			echo json_encode($response);
			exit;
		}

		// Validate the input to ensure the name and category ID are provided
		$this->form_validation->set_rules('name', 'Name', 'trim|required');
		$this->form_validation->set_rules('category_id', 'Category ID', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');

		if ($this->form_validation->run()) {

			$data = $this->input->post(NULL, true);
			$update_data = array(
				'name' => ucfirst($data['name']),
			);

			$this->common_model->update($update_data, array('id' => $data['category_id']), 'document_category');

			if ($this->db->affected_rows() > 0) {
				$response = array('status' => 1, 'msg' => 'Document category updated successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'No changes were made or something went wrong!');
				echo json_encode($response);
				exit;
			}
		} else {
			// Return validation errors if any
			$response = array('status' => 0, 'msg' => validation_errors());
			echo json_encode($response);
			exit;
		}
	}
}
