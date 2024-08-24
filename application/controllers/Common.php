<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Common extends MY_Controller
{

	function __construct()
	{
		parent::__construct();
	}

	public function signin()
	{

		if (check_user_login()) {
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'common';
		$page_data['page_name']    = 'signin';
		$page_data['page_title']   = 'Sign In';
		$this->load->view('theme/common/main', $page_data);
	}

	public function signup()
	{

		if (check_user_login()) {
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'common';
		$page_data['page_name']    = 'signup';
		$page_data['page_title']   = 'Sign up';
		$this->load->view('theme/common/main', $page_data);
	}

	public function signinProcess()
	{
		$this->form_validation->set_rules('username', 'Username', 'trim|required');
		$this->form_validation->set_rules('password', 'Password', 'trim|required');

		if ($this->form_validation->run()) {

			$data['username'] = $this->input->post('username');
			$data['password'] = $this->input->post('password');

			$exist = $this->common_model->selectOne('employees', array('username' => trim($data['username'])), '*');

			if (!empty($exist)) {
				if ($exist['password'] == md5($data['password'])) {
					if ($exist['role_id'] == 5) {
						if ($exist['status'] !== 'inactive') {
							$this->common_model->updateLastLogin($exist['employee_id']);
							$type = $this->common_model->selectOne('permissions', array('role_id' => $exist['role_id']), 'GROUP_CONCAT(module_id) as permissions');

							$subscription = $this->common_model->selectsubscription(
								'subscription_history',
								array('company_id' => $exist['company_id'], 'expiry_date >=' => date('Y-m-d')),
								'*',
								'id asc'
							);

							$session = array(
								'employee_id' => $exist['employee_id'],
								'name' => $exist['username'],
								'role_id' => $exist['role_id'],
								'permissions' => $type['permissions'],
								'is_user_login' => TRUE,
								'profile_photo' => $exist['profile_photo'],
								'type' => 'employee',
								'subscription_id' => !empty($subscription) ? $subscription['subscription_id'] : null,
								'subscription_type' => !empty($subscription) ? $subscription['subscription_type'] : null,
								'subscription_expiry' => !empty($subscription) ? $subscription['expiry_date'] : null,
							);

							$last_status = $this->common_model->last_status($exist['employee_id']);
							$data1['employee_id'] = $exist['employee_id'];
							if (!empty($last_status)) {
								$data1['attendance_id'] = $last_status['attendance_id'];
								$data1['in_time'] = $last_status['in_time'];
								$resp = $this->settings->check_out_process($data1);
								if ($resp['status'] == 1) {
									$data1['attendance_id'] = "";
									$data1['in_time'] = "";
									$this->settings->check_in_process($data1);
								}
							} else {
								$data1['attendance_id'] = "";
								$data1['in_time'] = "";
								$this->settings->check_in_process($data1);
							}

							$this->session->set_userdata($session);
							$this->session->set_flashdata('success', 'Welcome back ' . $exist['name'] . '!');
							$message = array('message' => 'Successfully Signed In.', 'status' => '1');
							echo json_encode($message);
						} else {
							$message = array('message' => 'Please contact administrator!', 'status' => '0');
							echo json_encode($message);
						}
					} else {
						$message = array('message' => 'Access Denied! Only admin are allowed to log in.', 'status' => '0');
						echo json_encode($message);
					}
				} else {
					$message = array('message' => 'Invalid Password!', 'status' => '0');
					echo json_encode($message);
				}
			} else {
				$message = array('message' => 'Invalid Username!', 'status' => '0');
				echo json_encode($message);
			}
		} else {
			$message = array('message' => 'Validation Errors!', 'status' => '0');
			echo json_encode($message);
		}
	}

	function companySigninProcess()
	{

		$this->form_validation->set_rules('companyCode', 'Company Code', 'trim|required');
		$this->form_validation->set_rules('companyPassword', 'Password', 'trim|required');

		if ($this->form_validation->run()) {

			$data['company_code'] = $this->input->post('companyCode');
			$data['password'] = md5($this->input->post('companyPassword'));

			$exist = $this->common_model->selectOne('company', array('company_code' => trim($data['company_code'])), '*');

			if (!empty($exist)) {

				if ($exist['password'] == $data['password']) {

					if ($exist['status'] !== 'inactive') {
						$subscription = $this->common_model->selectsubscription(
							'subscription_history',
							array('company_id' => $exist['company_id'], 'expiry_date >=' => date('Y-m-d')),
							'*',
							'id asc'
						);
						$type = $this->common_model->selectOne('permissions', array('role_id' => 6), 'GROUP_CONCAT(module_id) as permissions');
						$this->common_model->updateLastLogin($exist['company_id']);
						$session = array(
							'employee_id' => $exist['company_id'],
							'name' => $exist['name'],
							'email' => $exist['email'],
							'mobile' => $exist['mobile'],
							'mobile1' => $exist['mobile1'],
							'role_id' => 6,
							'permissions' => $type['permissions'],
							'profile_photo' => $exist['profile_photo'],
							'is_user_login' => TRUE,
							'type' => 'company',
							'company_id' => $exist['company_id'],
							'company_code' => $exist['company_code'],
							'subscription_id' => !empty($subscription) ? $subscription['subscription_id'] : null,
							'subscription_type' => !empty($subscription) ? $subscription['subscription_type'] : null,
							'subscription_expiry' => !empty($subscription) ? $subscription['expiry_date'] : null,
						);
						$this->session->set_userdata($session);
						$this->session->set_flashdata('success', 'Welcome back ' . $exist['name'] . '!');
						$message = array('message' => 'Successfully Signed In.', 'status' => '1');
						echo json_encode($message);
					} else {
						$message = array('message' => 'Your account is inactive. Please contact customer support!', 'status' => '0');
						echo json_encode($message);
					}
				} else {
					$message = array('message' => 'Invalid Password!', 'status' => '0');
					echo json_encode($message);
				}
			} else {
				$message = array('message' => 'Invalid user name!', 'status' => '0');
				echo json_encode($message);
			}
		} else {
			$message = array('message' => 'Validation Errors!', 'status' => '0');
			echo json_encode($message);
		}
	}

	function signup_process()
	{

		if (check_user_login()) {
			redirect('dashboard', 'refresh');
		}

		$this->form_validation->set_rules('name', 'Name', 'trim|required');
		$this->form_validation->set_rules('company_code', 'Company Code', 'trim|required|is_unique[company.company_code]');
		$this->form_validation->set_rules('password', 'Password', 'trim|required');
		$this->form_validation->set_rules('mobile', 'Mobile', 'trim|required');
		$this->form_validation->set_rules('reg_no', 'Reg.No.', 'trim|is_unique[company.reg_no]');
		$this->form_validation->set_rules('company_code', 'Username', 'trim|required|is_unique[company.company_code]', array(
			'is_unique' => 'This username is already registered. Please choose another.'
		));
		$this->form_validation->set_rules('email', 'Email', 'required|valid_email|is_unique[company.email]', array(
			'is_unique' => 'This email is already registered. Please use another.'
		));
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
		$plain_password = $this->input->post('password', true);
		if ($this->form_validation->run()) {
			$data = array(
				'name' => ucfirst($this->input->post('name', true)),
				'company_code' => $this->input->post('company_code', true),
				'password' => md5($plain_password),
				'mobile' => $this->input->post('mobile', true),
				'mobile1' => $this->input->post('mobile1', true),
				'address' => $this->input->post('address', true),
				'reg_no' => $this->input->post('reg_no', true),
				'email' => $this->input->post('email', true),
				'created_at' => date('Y-m-d H:i:s')
			);


			$company_id = $this->common_model->insert($data, 'company');


			if (!empty($company_id)) {
				// Proceed with file upload if file is provided
				if ($_FILES['file_name']['error'] != 4) {
					// Upload the file
					$oldmask = umask(0);
					if (!is_dir('assets/uploads/user_pic')) {
						mkdir('assets/uploads/user_pic', 0777, true);
						if (!file_exists('assets/uploads/user_pic/index.html')) {
							file_put_contents('assets/uploads/user_pic/index.html', '');
						}
					}
					umask($oldmask);

					$image = date('dmYhis') . '_' . rand(0, 99999) . "." . pathinfo($_FILES['file_name']['name'], PATHINFO_EXTENSION);
					$config['upload_path'] = 'assets/uploads/user_pic/';
					$config['allowed_types'] = 'jpg|png|jpeg';
					$config['file_name'] = $image;

					$this->load->library('upload', $config);

					if ($this->upload->do_upload('file_name')) {
						// Resize and update profile photo
						image_resize('assets/uploads/user_pic/' . $image, '140', '140', FALSE);
						$data_update = array(
							'profile_photo' => $image
						);
						$data_update = $this->security->xss_clean($data_update);
						$this->common_model->update($data_update, array('company_id' => $company_id), 'company');
					} else {
						// If file upload fails, provide error but keep the company data inserted
						$response = array(
							'status' => 0,
							'msg' => 'File upload failed: Only jpg, png, and jpeg are allowed'
						);
						echo json_encode($response);
						exit;
					}
				}
				// Send email with login credentials
				$email_content = "Hello " . ucfirst($data['name']) . ",<br><br>";
				$email_content .= "Your account has been created successfully. Here are your login credentials:<br>";
				$email_content .= "Username: <strong>" . $data['company_code'] . "</strong><br>";
				$email_content .= "Password: <strong>" . $plain_password . "</strong><br>";
				$email_content .= "<br>Please keep this information secure.<br><br>Regards,<br> TaskLyt";

				_sendMail("Account Created", $email_content, $data['email']);
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

	public function forgot()
	{
		if (check_user_login()) {
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'common';
		$page_data['page_name']    = 'forgot';
		$page_data['page_title']   = 'Forgot';
		$this->load->view('theme/common/main', $page_data);
	}

	public function otp()
	{
		if (check_user_login()) {
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'common';
		$page_data['page_name']    = 'otp';
		$page_data['page_title']   = 'Verify-OTP';
		$this->load->view('theme/common/main', $page_data);
	}

	public function resetpassword()
	{

		if (check_user_login()) {
			redirect('dashboard', 'refresh');
		}

		$page_data['page_type']    = 'common';
		$page_data['page_name']    = 'resetpassword';
		$page_data['page_title']   = 'Reset-Password';
		$this->load->view('theme/common/main', $page_data);
	}

	public function notfound()
	{

		$page_data['page_type']    = 'common';
		$page_data['page_name']    = 'notfound';
		$page_data['page_title']   = 'Page not found';
		$this->load->view('theme/common/main', $page_data);
	}

	function logout()
	{

		$employee_id = $this->session->userdata('employee_id');
		$last_status = $this->common_model->last_status($employee_id);
		$data1['employee_id'] = $employee_id;
		if (!empty($last_status)) {
			$data1['attendance_id'] = $last_status['attendance_id'];
			$data1['in_time'] = $last_status['in_time'];
			$this->settings->check_out_process($data1);
		}


		$array_val = array('employee_id', 'username', 'role_id', 'permissions', 'is_user_login');
		$this->session->unset_userdata($array_val);
		$this->session->sess_destroy();
		redirect('signin', 'refresh');
	}

	public function verify_email_post()
	{
		$input_data = $this->input->post(NULL, true);

		if (empty($input_data['email'])) {
			$response = array('status' => 0, 'msg' => 'Email is required!');
			echo json_encode($response);
			exit;
		}

		$email = $input_data['email'];

		$user = $this->common_model->get_company_by_email($email);

		if (empty($user)) {
			$response = array('status' => 0, 'msg' => 'Email not registered!');
			echo json_encode($response);
			exit;
		}

		$otp = rand(100000, 999999);

		// Set conditions and data for updating the OTP
		$where = array('company_id' => $user['company_id']);
		$data_update = array('otp' => $otp);

		// Update the OTP in the employee table
		$this->db->update('company', $data_update, $where);

		// Prepare the email content
		$body = "This is your one-time password:<h2>{$otp}</h2>Please do not share this with anyone.";

		_sendMail("Verification", $body, $email);


		$response = array(
			'status' => 1,
			'msg' => 'OTP sent successfully to your email.',
			'id' => $user['company_id']
		);

		echo json_encode($response);
	}

	public function verify_otp_post()
	{

		$input_data = $this->input->post(NULL, true);
		// pr($input_data);exit;
		if (!$input_data) {
			$input_data = $this->input->post(NULL, true);
		}

		if (empty($input_data['id'])) {
			$response = ['status' => 0, 'msg' => 'Company not found!'];
			echo json_encode($response);
			exit;
		}

		if (empty($input_data['otp'])) {
			$response = ['status' => 0, 'msg' => 'OTP not found!'];
			echo json_encode($response);
			exit;
		}

		$company_id = $input_data['id'];
		$otp = $input_data['otp'];

		$res = $this->common_model->check_otp($company_id, $otp);

		if (empty($res)) {

			$response = ['status' => 0, 'msg' => 'Incorrect OTP!'];
			echo json_encode($response);
		} else {

			$response = [
				'status' => 1,
				'msg' => 'OTP verified successfully.',
				'id' => $res['company_id']
			];
			echo json_encode($response);
		}
	}

	public function forgot_password_post()
	{
		$input_data = $this->input->post(NULL, true);
		if (empty($input_data['id'])) {
			$response = ['status' => FALSE, 'msg' => 'company not found!'];
			echo json_encode($response);
			return;
		}

		if (empty($input_data['new_password'])) {
			$response = ['status' => FALSE, 'msg' => 'New password is required!'];
			echo json_encode($response);
			return;
		}
		$company_id = $input_data['id'];
		$new_password = $input_data['new_password'];
		$hashed_password = md5($new_password);

		$this->db->where('company_id', $company_id);
		$this->db->update('company', ['password' => $hashed_password]);

		if ($this->db->affected_rows() > 0) {
			$this->db->where('company_id', $company_id);
			$this->db->update('company', ['otp' => NULL]);
			$response = ['status' => TRUE, 'msg' => 'Password changed successfully!'];
			echo json_encode($response);
		} else {
			$response = ['status' => FALSE, 'msg' => 'Failed to change password.'];
			echo json_encode($response);
		}
	}

	public function resend_otp_post()
	{
		$input_data = $this->input->post(NULL, true);

		if (empty($input_data['company_id'])) {
			$response = ['status' => FALSE, 'msg' => 'Company ID not provided!'];
			echo json_encode($response);
			return;
		}

		$company_id = $input_data['company_id'];
		$company = $this->common_model->get_company_by_id($company_id);
		if (empty($company)) {
			$response = ['status' => FALSE, 'msg' => 'Company not found!'];
			echo json_encode($response);
			return;
		}

		$otp = rand(100000, 999999);
		$where = array('company_id' => $company['company_id']);
		$data_update = array('otp' => $otp);

		if ($this->common_model->update($data_update, $where, 'company')) {
			$body = "This is your one-time password:<h2>{$otp}</h2>Please do not share this with anyone.";

			if (_sendMail("Verification", $body, $company['email'])) {
				$response = [
					'status' => TRUE,
					'msg' => 'OTP has been resent successfully!',
					'company_id' => $company['company_id']
				];
			} else {
				$response = [
					'status' => FALSE,
					'msg' => 'Failed to send OTP. Please try again.'
				];
			}
		} else {
			$response = [
				'status' => FALSE,
				'msg' => 'Failed to update OTP. Please try again.'
			];
		}

		echo json_encode($response);
	}

	function profile()
	{
		$role_id = $this->session->userdata('role_id');
		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}
		// $employee_id  = $this->session->userdata('employee_id');

		$page_data['page_type']    = 'user';
		$page_data['menu']         = 'dashboard';
		$page_data['page_name']    = 'profile';
		$page_data['page_title']   = 'Profile';
		if ($role_id == 6) {
			$page_data['user_details'] = $this->session->userdata();
		} else {
			// $page_data['user_details'] = $this->common_model->employee_by_id($employee_id);
			$page_data['user_details'] = [];
		}
		$this->load->view('theme/user/main', $page_data);
	}

	function change_password()
	{
		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		$this->form_validation->set_rules('old_password', 'Old Password', 'trim|required');
		$this->form_validation->set_rules('password', 'Password', 'trim|required');
		$this->form_validation->set_rules('confirm_password', 'Confirm Password', 'required|matches[password]');
		$this->form_validation->set_rules('employee_id', 'Employee ID', 'trim|required');

		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);
			$employee_id = $data['employee_id'];

			if (!empty($employee_id)) {
				// Fetch the old password from the database
				if ($this->session->userdata('role_id') == 6) {
					$user = $this->common_model->selectOne('company', ['company_id' => $employee_id], 'password');
				} else {
					$user = $this->common_model->selectOne('employees', ['employee_id' => $employee_id], 'password');
				}

				if (!$user) {
					$response = array('status' => 0, 'msg' => 'User not found!');
					echo json_encode($response);
					exit;
				}

				// Check if the old password matches
				if (md5($data['old_password']) != $user['password']) {
					$response = array('status' => 0, 'msg' => 'password is incorrect!');
					echo json_encode($response);
					exit;
				}

				// Proceed to update password if old password is correct
				$update_data = array('password' => md5($data['password']));

				if ($this->session->userdata('role_id') == 6) {
					$resp = $this->common_model->update($update_data, array('company_id' => $employee_id), 'company');
				} else {
					$resp = $this->common_model->update($update_data, array('employee_id' => $employee_id), 'employees');
				}

				if ($resp) {
					$response = array('status' => 1, 'msg' => 'Password updated successfully!');
					echo json_encode($response);
					exit;
				} else {
					$response = array('status' => 0, 'msg' => 'Something went wrong while updating the password!');
					echo json_encode($response);
					exit;
				}
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

	public function update_profile_picture()
	{
		$company_id = $this->session->userdata('company_id');

		if (empty($company_id)) {
			$response = array('status' => 0, 'msg' => 'No company ID found in session!');
			echo json_encode($response);
			exit;
		}
		$company = $this->common_model->company_by_id($company_id);

		if (empty($company)) {
			$response = array('status' => 0, 'msg' => 'Invalid company details!');
			echo json_encode($response);
			exit;
		}
		if (!empty($_FILES['profile_photo']['name'])) {
			$config['upload_path'] = './assets/uploads/user_pic/';
			$config['allowed_types'] = 'jpg|png|jpeg';
			$config['file_name'] = time() . '_' . $_FILES['profile_photo']['name'];
			$config['overwrite'] = true;
			$this->load->library('upload', $config);
			if ($this->upload->do_upload('profile_photo')) {
				// Remove the existing profile photo if it exists
				if (!empty($company['profile_photo']) && file_exists('./assets/uploads/user_pic/' . $company['profile_photo'])) {
					unlink('./assets/uploads/user_pic/' . $company['profile_photo']);
				}
				$upload_data = $this->upload->data();
				$profile_photo = $upload_data['file_name'];

				$update_resp = $this->common_model->update(
					array('profile_photo' => $profile_photo),
					array('company_id' => $company_id),
					'company'
				);
				if ($update_resp) {
					$this->session->set_userdata('profile_photo', $profile_photo);
					$response = array('status' => 1, 'msg' => 'Profile picture updated successfully!');
					echo json_encode($response);
					exit;
				} else {
					$response = array('status' => 0, 'msg' => 'Failed to update profile picture in the database.');
					echo json_encode($response);
					exit;
				}
			} else {
				$response = array('status' => 0, 'msg' => 'Profile picture upload failed: ' . $this->upload->display_errors());
				echo json_encode($response);
				exit;
			}
		} else {
			$response = array('status' => 0, 'msg' => 'No profile picture uploaded.');
			echo json_encode($response);
			exit;
		}
	}

	public function edit_company_process()
	{
		if (!check_user_login()) {
			redirect('signin', 'refresh');
		}

		$this->form_validation->set_rules('company_id', 'Client', 'trim|required');
		$this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email');
		$this->form_validation->set_rules('mobile', 'Mobile', 'trim|required|numeric|min_length[10]|max_length[15]');
		$this->form_validation->set_rules('mobile1', 'Mobile1', 'trim|numeric|min_length[10]|max_length[15]');

		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');

		if ($this->form_validation->run()) {
			$data = $this->input->post(NULL, true);
			$company = $this->common_model->company_by_id($data['company_id']);

			if (empty($company)) {
				$response = array('status' => 0, 'msg' => 'Invalid company details!');
				echo json_encode($response);
				exit;
			}
			$user_update = [];
			if (!empty($data['name'])) {
				$user_update['name'] = ucfirst($data['name']);
			}
			if (!empty($data['company_code'])) {
				$this->db->where('company_code', $data['company_code']);
				$this->db->where('company_id !=', $data['company_id']);
				$existing_company_code = $this->db->get('company')->row();

				if ($existing_company_code) {
					$response = array('status' => 0, 'msg' => 'username already exists.');
					echo json_encode($response);
					exit;
				} else {
					$user_update['company_code'] = $data['company_code'];
				}
			}
			if (!empty($data['email'])) {
				$this->db->where('email', $data['email']);
				$this->db->where('company_id !=', $data['company_id']);
				$existing_email = $this->db->get('company')->row();

				if ($existing_email) {
					$response = array('status' => 0, 'msg' => 'Email address already exists.');
					echo json_encode($response);
					exit;
				} else {
					$user_update['email'] = $data['email'];
				}
			}
			if (!empty($data['mobile'])) {
				$user_update['mobile'] = $data['mobile'];
			}

			$user_update['mobile1'] = $data['mobile1'];

			if (!empty($user_update)) {
				$user_update = $this->security->xss_clean($user_update);
				$update_resp = $this->common_model->update($user_update, array('company_id' => $company['company_id']), 'company');

				if ($update_resp) {
					if (isset($data['name'])) $this->session->set_userdata('name', $data['name']);
					if (isset($data['company_code'])) $this->session->set_userdata('company_code', $data['company_code']);
					if (isset($data['email'])) $this->session->set_userdata('email', $data['email']);
					if (isset($data['mobile'])) $this->session->set_userdata('mobile', $data['mobile']);
					if (isset($data['mobile1'])) $this->session->set_userdata('mobile1', $data['mobile1']);

					$response = array('status' => 1, 'msg' => 'Updated successfully!');
				} else {
					$response = array('status' => 0, 'msg' => 'Nothing updated!');
				}
			} else {
				$response = array('status' => 0, 'msg' => 'No data to update!');
			}
		} else {
			$response = array('status' => 0, 'msg' => validation_errors());
		}
		echo json_encode($response);
		exit;
	}
}
