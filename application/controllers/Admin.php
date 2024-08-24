<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends MY_Controller {

	function __construct() {
		parent:: __construct();
	}
	
	function users() {
		
		if(!check_user_login()) {
            redirect('signin', 'refresh');
        }
		
		$page_data['page_type']    = 'admin';
		$page_data['page_name']    = 'users';
		$page_data['menu']         = 'users';
	    $page_data['page_title']   = 'Users';
				
	    $this->load->view('theme/user/main', $page_data);
		
	}
	
	function users_list_ajax() {
		
		if(!check_user_login()) {
            redirect('signin', 'refresh');
        }
		
		$all = $this->common_model->all_users();
		
		$users['data'] = [];
		if(!empty($all)) {
			foreach($all as $key=>$value) {
				
				$users['data'][$key]['name'] = $value['name'];
				$users['data'][$key]['username'] = $value['username'];
				$users['data'][$key]['email_id'] = $value['email_id'];
				$users['data'][$key]['status'] = user_status($value['status']);
				$users['data'][$key]['vendor'] = $value['vendor'];
				$users['data'][$key]['last_login'] = $value['last_login'];
				$users['data'][$key]['action'] = '<button type="button" class="btn btn-sm btn-outline-success" title="Approve" onclick="showAjaxModal(\''.base_url('admin/popup/edit_user/'.$value['user_id']).'\',\'Edit User\')"><i class="fa fa-edit"></i></button>&nbsp;'.(($value['role_id'] != '1')?'<button type="button" class="btn btn-sm btn-outline-danger" title="Delete" onclick="deleteUser(\''.$value['user_id'].'\')"><i class="fa fa-trash-o"></i></button>':'');
				
			}			
		}		
		echo json_encode($users);
		
	}
	
	function edit_user_process() {
		
		if(!check_user_login()) {
            redirect('signin', 'refresh');
        }
		
		$this->form_validation->set_rules('name', 'Name', 'trim|required');
		$this->form_validation->set_rules('email_id', 'Email Id', 'trim|required');
		$this->form_validation->set_rules('status', 'Status', 'trim|required');
		$this->form_validation->set_rules('vendor_id', 'Vendor Id', 'trim|required');
		$this->form_validation->set_rules('password', 'Password', 'trim');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');		
		if($this->form_validation->run()) {			
			
			$data = $this->input->post(NULL,true);

			$param['name'] = ucfirst($data['name']);
			$param['email_id'] = $data['email_id'];
			$param['status'] = $data['status'];
			$param['vendor_id'] = $data['vendor_id'];
			if(!empty($data['password'])) {
				$param['password'] = md5($data['password']);
			}
			
			$updata = $this->security->xss_clean($param);
			$resp  = $this->common_model->update($updata,array('user_id'=>$data['user_id']),'users');
			
			if(!empty($resp)) {	
				$response = array('status' => 1, 'msg' => 'Updated successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
                echo json_encode($response);
			    exit;
			}
			
		} else {
			$response=array('status' => 0, 'msg' => validation_errors());
            echo json_encode($response);
			exit;
		}
	}
		
	function user_delete_process() {
		
		if(!check_user_login()) {
            redirect('signin', 'refresh');
        }
		
		$this->form_validation->set_rules('user_id', 'User id', 'trim|required');		
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');		
		if($this->form_validation->run()) {
			
		  $data = $this->input->post(NULL,true);		  
		  $resp = $this->common_model->deleteByids(array('user_id'=>$data['user_id']),'users');		  
		  if(!empty($resp)) {
			$response=array('status' => 1, 'msg' => 'Deleted successfully!');
		    echo json_encode($response);
		    exit;
		  } else {
			$response=array('status' => 0, 'msg' => 'Something went wrong!');
		    echo json_encode($response);
		    exit;
		  }	  
		  
		} else {
			$response=array('status' => 0, 'msg' => validation_errors());
            echo json_encode($response);
			exit;
		}
	}
	
	function add_user_process() {
		
		if(!check_user_login()) {
            redirect('signin', 'refresh');
        }
		$this->form_validation->set_rules('username', 'Username', 'trim|required|is_unique[users.username]');
		$this->form_validation->set_rules('name', 'Name', 'trim|required');
		$this->form_validation->set_rules('email_id', 'Email Id', 'trim|required');
		$this->form_validation->set_rules('status', 'Status', 'trim|required');
		$this->form_validation->set_rules('vendor_id', 'Vendor Id', 'trim|required');
		$this->form_validation->set_rules('password', 'Password', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');		
		if($this->form_validation->run()) {			
			
			$data = $this->input->post(NULL,true);
            
			$param['username'] = $data['username'];
			$param['name'] = ucfirst($data['name']);
			$param['email_id'] = $data['email_id'];
			$param['status'] = $data['status'];
			$param['vendor_id'] = $data['vendor_id'];
			$param['role_id'] = '2';			
			$param['password'] = md5($data['password']);
			$param['created_at'] = date('Y-m-d H:i:s');
			
			$updata = $this->security->xss_clean($param);
			$resp  = $this->common_model->insert($updata,'users');
			
			if(!empty($resp)) {	
				$response = array('status' => 1, 'msg' => 'Added successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
                echo json_encode($response);
			    exit;
			}
			
		} else {
			$response=array('status' => 0, 'msg' => validation_errors());
            echo json_encode($response);
			exit;
		}
	}
	
	function products() {
		
		if(!check_user_login()) {
            redirect('signin', 'refresh');
        }

		$page_data['page_type']    = 'admin';
		$page_data['page_name']    = 'products';
		$page_data['menu']         = 'products';
	    $page_data['page_title']   = 'Products';
	    $this->load->view('theme/user/main', $page_data);
		
	}
	
	function product_ajax() {
		
		$all = $this->common_model->products_list();
		$products['data'] = [];
		if(!empty($all)) {
			
			foreach($all as $key=>$value) {

				$products['data'][$key]['name'] = $value['name'];
				$products['data'][$key]['unique_id'] = $value['unique_id'];
				$products['data'][$key]['sku'] = $value['sku'];
				$products['data'][$key]['vendor'] = $value['vendor'];
				$products['data'][$key]['closing_stock'] = $value['closing_stock'];
				$products['data'][$key]['last_updated'] = (!empty($value['last_updated']))?date('d/m/Y H:i:s',strtotime($value['last_updated'])):'-';
				$products['data'][$key]['stock_status'] = ($value['closing_stock'] <= 0)?stock_status('lowstock'):stock_status('instock');
				$products['data'][$key]['action'] = '<a href="'.base_url('edit-product1/'.$value['product_id']).'" class="btn btn-sm btn-outline-secondary" title="Edit"><i class="fa fa-edit"></i></a>&nbsp;<button type="button" class="btn btn-sm btn-outline-danger" title="Delete" onclick="deleteProduct(\''.$value['vendor_id'].'\',\''.$value['product_id'].'\')"><i class="fa fa-trash-o"></i></button>';
				
			}
			
		}		
		echo json_encode($products);
		
	}
	
	function add_product() {
		
		if(!check_user_login()) {
            redirect('signin', 'refresh');
        }
		
		$page_data['page_type']    = 'admin';
		$page_data['menu']         = 'products';
		$page_data['page_name']    = 'add_product';
	    $page_data['page_title']   = 'Add Product';
		$page_data['vendors'] = $this->common_model->selectAll('vendors','','*');
	    $this->load->view('theme/user/main', $page_data);
		
	}
	
	function add_product_process() {
		
	    if(!check_user_login()) {
            redirect('signin', 'refresh');
        }
				
		$this->form_validation->set_rules('name','Name', 'trim|required');
		$this->form_validation->set_rules('unique_id', 'Unique Id', 'trim|required|is_unique[products.unique_id]');
        $this->form_validation->set_rules('sku', 'SKU', 'trim|required');
		$this->form_validation->set_rules('vendor_id', 'Vendor id', 'trim|required');
        $this->form_validation->set_rules('closing_stock', 'Closing Stock', 'trim|required|numeric');
        $this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
        if($this->form_validation->run()) {
			
			$data1 = $this->input->post(NULL,true);
			$data['name']          = ucfirst($data1['name']);
			$data['unique_id']     = strtoupper($data1['unique_id']);
			$data['sku']           = strtoupper($data1['sku']);
			$data['closing_stock'] = $data1['closing_stock'];
			$data['last_updated']  = date('Y-m-d H:i:s');
			$data['vendor_id']     = $data1['vendor_id'];
			$data['created_by']    = $this->session->userdata('user_id');
			$data['created_at']    = date('Y-m-d H:i:s');
			
			$data = $this->security->xss_clean($data);
			
			$product_id            = $this->common_model->insert($data,'products');
			if(!empty($product_id)) {	
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
	
	function edit_product($product_id) {
		
		if(!check_user_login()) {
            redirect('signin', 'refresh');
        }
		
		$page_data['page_type']    = 'admin';
		$page_data['menu']         = 'products';
		$page_data['page_name']    = 'edit_product';
	    $page_data['page_title']   = 'Edit Product';
		$page_data['product_details'] = $this->common_model->product_by_id($product_id);
		$page_data['vendors'] = $this->common_model->selectAll('vendors','','*');
	    $this->load->view('theme/user/main', $page_data);
		
	}
	
	function edit_product_process() {
		
	    if(!check_user_login()) {
            redirect('signin', 'refresh');
        }
		
		$this->form_validation->set_rules('name','Name', 'trim|required');
		$this->form_validation->set_rules('unique_id', 'Unique Id', 'trim|required');
        $this->form_validation->set_rules('sku', 'SKU', 'trim|required');
        $this->form_validation->set_rules('closing_stock', 'Closing Stock', 'trim|required|numeric');
		$this->form_validation->set_rules('product_id', 'Product Id', 'trim|required|numeric');
		$this->form_validation->set_rules('vendor_id', 'Vendor Id', 'trim|required');
        $this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');
        if($this->form_validation->run()) {
			
			$data1 = $this->input->post(NULL,true);
			
			$product_id = $this->common_model->product_by_id($data1['product_id']);			
			if(empty($product_id)) {
				$response = array('status' => 0, 'msg' => 'Invalid product details!');
				echo json_encode($response);
				exit;
			}
			
			$data['name']          = ucfirst($data1['name']);
			$data['unique_id']     = strtoupper($data1['unique_id']);
			$data['sku']           = strtoupper($data1['sku']);
			$data['closing_stock'] = $data1['closing_stock'];
			$data['vendor_id']     = $data1['vendor_id'];
			$data['last_updated']    = date('Y-m-d H:i:s');
			
			$data2 = $this->security->xss_clean($data);
			
			$resp  = $this->common_model->update($data2,array('product_id'=>$data1['product_id']),'products');
			
			if(!empty($resp)) {	
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
	
	
	function vendors() {
		
		if(!check_user_login()) {
            redirect('signin', 'refresh');
        }
		
		$page_data['page_type']    = 'admin';
		$page_data['page_name']    = 'vendors';
		$page_data['menu']         = 'vendors';
	    $page_data['page_title']   = 'Vendors';
				
	    $this->load->view('theme/user/main', $page_data);
		
	}
	
	function vendors_list_ajax() {
		
		if(!check_user_login()) {
            redirect('signin', 'refresh');
        }
		
		$all = $this->common_model->selectAll('vendors','','');
		
		$users['data'] = [];
		if(!empty($all)) {
			foreach($all as $key=>$value) {
				
				$users['data'][$key]['name'] = $value['name'];
				$users['data'][$key]['address'] = $value['address'];				
				$users['data'][$key]['action'] = '<button type="button" class="btn btn-sm btn-outline-info" title="View" onclick="showAjaxModal(\''.base_url('admin/popup/set_permission/'.$value['vendor_id']).'\',\'Permissions\')"><i class="fa fa-lock"></i></button>&nbsp;<button type="button" class="btn btn-sm btn-outline-success" title="Edit" onclick="showAjaxModal(\''.base_url('admin/popup/edit_vendor/'.$value['vendor_id']).'\',\'Edit Vendor\')"><i class="fa fa-edit"></i></button>&nbsp;<button type="button" class="btn btn-sm btn-outline-danger" title="Delete" onclick="deleteVendor(\''.$value['vendor_id'].'\')"><i class="fa fa-trash-o"></i></button>';
				
			}			
		}		
		echo json_encode($users);
		
	}
	
	function add_vendor_process() {
		
		if(!check_user_login()) {
            redirect('signin', 'refresh');
        }
		
		$this->form_validation->set_rules('name', 'Name', 'trim|required');
		$this->form_validation->set_rules('address', 'Address', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');		
		if($this->form_validation->run()) {			
			
			$data = $this->input->post(NULL,true);
            
			
			$param['name'] = ucfirst($data['name']);
			$param['address'] = $data['address'];
			$param['created_at'] = date('Y-m-d H:i:s');
			
			$updata = $this->security->xss_clean($param);
			$resp  = $this->common_model->insert($updata,'vendors');
			
			if(!empty($resp)) {	
				$response = array('status' => 1, 'msg' => 'Added successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
                echo json_encode($response);
			    exit;
			}
			
		} else {
			$response=array('status' => 0, 'msg' => validation_errors());
            echo json_encode($response);
			exit;
		}
	}
	
	function edit_vendor_process() {
		
		if(!check_user_login()) {
            redirect('signin', 'refresh');
        }
		
		$this->form_validation->set_rules('name', 'Name', 'trim|required');
		$this->form_validation->set_rules('address', 'Address', 'trim|required');
		$this->form_validation->set_rules('vendor_id', 'Vendor Id', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');		
		if($this->form_validation->run()) {			
			
			$data = $this->input->post(NULL,true);

			$param['name'] = ucfirst($data['name']);
			$param['address'] = $data['address'];
			
			$updata = $this->security->xss_clean($param);
			$resp  = $this->common_model->update($updata,array('vendor_id'=>$data['vendor_id']),'vendors');
			
			if(!empty($resp)) {	
				$response = array('status' => 1, 'msg' => 'Updated successfully!');
				echo json_encode($response);
				exit;
			} else {
				$response = array('status' => 0, 'msg' => 'Something went wrong!');
                echo json_encode($response);
			    exit;
			}
			
		} else {
			$response=array('status' => 0, 'msg' => validation_errors());
            echo json_encode($response);
			exit;
		}
	}
	
	function vendor_delete_process() {
		
		if(!check_user_login()) {
            redirect('signin', 'refresh');
        }
		
		$this->form_validation->set_rules('vendor_id', 'Vendor id', 'trim|required');		
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');		
		if($this->form_validation->run()) {
			
		  $data = $this->input->post(NULL,true);		  
		  $resp = $this->common_model->deleteByids(array('vendor_id'=>$data['vendor_id']),'vendors');		  
		  if(!empty($resp)) {
			$response=array('status' => 1, 'msg' => 'Deleted successfully!');
		    echo json_encode($response);
		    exit;
		  } else {
			$response=array('status' => 0, 'msg' => 'Something went wrong!');
		    echo json_encode($response);
		    exit;
		  }	  
		  
		} else {
			$response=array('status' => 0, 'msg' => validation_errors());
            echo json_encode($response);
			exit;
		}
	}
	
	function permission_process() {
		
		if(!check_user_login()) {
            redirect('signin', 'refresh');
        }
		
		$this->form_validation->set_rules('vendor_id', 'Vendor id', 'trim|required');
		$this->form_validation->set_rules('module_id', 'Module id', 'trim|required'); 
		$this->form_validation->set_rules('value', 'Value', 'trim|required');
		$this->form_validation->set_error_delimiters('<div class="mt-2">', '</div>');		
		if($this->form_validation->run()) {
			
		  $data = $this->input->post(NULL,true);
		  if($data['value'] == 0) {
			$resp = $this->common_model->deleteByids(array('module_id'=>$data['module_id'],'vendor_id'=>$data['vendor_id']),'permission');
		  } else {
			$exist = $this->common_model->selectAll('permission',array('module_id'=>$data['module_id'],'vendor_id'=>$data['vendor_id']),'*');
			if(empty($exist)) {
			  $resp = $this->common_model->insert(array('module_id'=>$data['module_id'],'vendor_id'=>$data['vendor_id']),'permission');
			}
		  }
		 if(!empty($resp)) {
			$response=array('status' => 1, 'msg' => 'Permission changed successfully!');
		    echo json_encode($response);
		    exit;
		  } else {
			$response=array('status' => 0, 'msg' => 'Something went wrong!');
		    echo json_encode($response);
		    exit;
		  }	  
		  
		} else {
			$response=array('status' => 0, 'msg' => validation_errors());
            echo json_encode($response);
			exit;
		}
	}
	
	function checkDupUsername() {
	   $username = $this->input->post('username');
       if(!empty($username) && trim($username) != "") {
          $exist = $this->common_model->checkDupUsername($username);
          if($exist) {
              echo 'false';
          } else {
              echo 'true';
          }
       } 
	}
	
	function popup($page_name = '' , $param2 = '' , $param3 = '',$param4='') {

        $page_data['param2']        =   $param2;
        $page_data['param3']        =   $param3;
        $page_data['param4']        =   $param4;
		
        $this->load->view('admin/'.$page_name, $page_data);

    }
}