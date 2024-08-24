<?php defined('BASEPATH') or exit('No direct script access allowed');

header('Access-Control-Allow-Origin: *');
if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    //header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type, api-key');
    exit;
}

require APPPATH . '/libraries/REST_Controller.php';
class Mobile extends REST_Controller
{

    function __construct() 
    {
        parent::__construct();
		 
		ini_set('default_charset', 'utf-8'); 
        //ini_set("date.timezone", "Asia/Kolkata");
        date_default_timezone_set('Asia/Kolkata');
        $this->load->library('email');
        
    }
	function json_validate($string)
    {
        // decode the JSON data
        $result = json_decode($string);

        // switch and check possible JSON errors
        switch (json_last_error())
        {
            case JSON_ERROR_NONE:
                $error = ''; // JSON is valid // No error has occurred
                
            break;
            case JSON_ERROR_DEPTH:
                $error = 'The maximum stack depth has been exceeded.';
            break;
            case JSON_ERROR_STATE_MISMATCH:
                $error = 'Invalid or malformed JSON.';
            break;
            case JSON_ERROR_CTRL_CHAR:
                $error = 'Control character error, possibly incorrectly encoded.';
            break;
            case JSON_ERROR_SYNTAX:
                $error = 'Syntax error, malformed JSON.';
            break;
                // PHP >= 5.3.3
                
            case JSON_ERROR_UTF8:
                $error = 'Malformed UTF-8 characters, possibly incorrectly encoded.';
            break;
                // PHP >= 5.5.0
                
            case JSON_ERROR_RECURSION:
                $error = 'One or more recursive references in the value to be encoded.';
            break;
                // PHP >= 5.5.0
                
            case JSON_ERROR_INF_OR_NAN:
                $error = 'One or more NAN or INF values in the value to be encoded.';
            break;
            case JSON_ERROR_UNSUPPORTED_TYPE:
                $error = 'A value of a type that cannot be encoded was given.';
            break;
            default:
                $error = 'Unknown JSON error occured.';
            break;
        }

        if ($error !== '')
        {
            // throw the Exception or exit // or whatever :)
            $message = array(
                'status' => 500,
                'message' => $error
            );
            $this->response($message);
        }

        // everything is OK
        return $result;
    }

	private function my_json_encode($arr)
	{
		//convmap since 0x80 char codes so it takes all multibyte codes (above ASCII 127). So such characters are being "hidden" from normal json_encoding
		array_walk_recursive($arr, 'json_cb'); // ---> json_cb defined in common_functions_helper.
		return mb_decode_numericentity(json_encode($arr), array (0x80, 0xffff, 0, 0xffff), 'UTF-8');
		//Codeigniter Tips : This function encodes (above ASCII 127) a result_array() if you use a result() method its affect will be same as of normal json encode   
	}
	private function apiCheck()
	{
		$api=$this->input->post('api');
		if($this->api!=$api)
		{
			echo json_encode(array('status'=>FALSE,'msg'=>'Invalid API key!!!'));
			exit;
		}
	}

    private function welcome()
	{
		echo "Welcome!!!";
	}
    ////////////////////////////////////////////Apis ////////////////////////////////////////////////////

    function getHomeData_post()
    {
        $response=array();
        $json = file_get_contents('php://input');
        $data = $this->json_validate($json);
        $employee_id= $data->employee_id;
        $query="select COUNT(w.work_id) as count,w.created_on,e.name,e.employee_id from works as w left join employees as e on e.employee_id=w.assigned_to where  w.status='allotted' and w.created_by='$employee_id' group by w.assigned_to order by count"  ;
        $res = $this->db->query($query)->result_array();
        $response["status"]=false;
        $response["msg"]="No data available";
        if(count($res)>0)
		{
		    $response["data"]=$res;
            $query="select * from employees where role_id!= 5";
		    $res = $this->db->query($query)->result_array();
            $response["employees"]=$res;
            
		}
		else
		{
		    $response["data"]=[];
		}
		$query="select w.title,DATEDIFF(CURDATE(),w.work_date) as days,w.work_id,w.work_date,w.last_date,w.created_on,e.name,e.employee_id,emp.name as created_by from works as w left join employees as e on e.employee_id=w.assigned_to left join employees as emp on emp.employee_id=w.created_by where w.status='allotted'and (w.created_by='$employee_id' or w.assigned_to='$employee_id') order by days desc limit 5";
		$res2 = $this->db->query($query)->result_array();
        
        if(count($res2)>0)
		{
            $response["longest_data"]=$res2;
		}
		else
		{
		    $response["longest_data"]=[];
		}
		
		$where = "(w.created_by = '".$employee_id."' or w.assigned_to = '".$employee_id."') and w.status!='finished'";
		$where .=" and Date(w.last_date)<CURDATE()";
		$query="select w.*,e.name from works as w left join employees as e on e.employee_id=w.assigned_to where ".$where." limit 5" ;
		$res3 = $this->db->query($query)->result_array();
        
        if(count($res3)>0)
		{
            $response["expired_data"]=$res3;
		}
		else
		{
		    $response["expired_data"]=[];
		}
		$where="e.employee_id= ".$employee_id ;
        $query="select e.*,c.name as company_name,c.subscription_added_on,s.name as subscription_name,s.duration FROM `employees` as e left join company as c on e.company_id=c.company_id left JOIN subscription as s on s.subsrciption_id=c.subsrciption_id where ".$where ;
		$res4 = $this->db->query($query)->result_array();
		if(count($res4)>0)
		{
            $response["profile"]=$res4;
            $response["image_path"]=site_url("assets/uploads/user_pic/");

		}
		else
		{
		    $response["profile"]=[];
		}
		
		
		if(count($res2)>0 &&count($res)>0)
		{
		    $response["status"]=true;
            $response["msg"]="Success";
		}
		
		echo json_encode($response);	
    }
    
    function loginCheck_post()
    {
        $response=array();
        $json = file_get_contents('php://input');
        $input = $this->json_validate($json);
        $result=array();
        //echo $input->username;
        $data['username'] =$input->username;
		$data['password'] = $input->password;
		$device_token = $input->device_token;
		$where=" username='".trim($data['username'])."'";
		$query="SELECT e.*,c.name as company_name,c.subscription_added_on,s.name as subscription_name,s.duration FROM `employees` as e left join company as c on e.company_id=c.company_id left JOIN subscription as s on s.subsrciption_id=c.subsrciption_id where".$where;
		$exist = $this->db->query($query)->row_array();
		//$exist = $this->common_model->selectOne('employees',array('username'=>trim($data['username'])),'*');
        //echo json_encode($exist);
        if(!empty($exist)) 
        {				
            if($exist['password'] == md5($data['password'])) 
            {                
                if($exist['status'] !== 'inactive') 
                {
                    $this->common_model->updateLastLogin($exist['employee_id']);
                    $result = array(
                        'employee_id' => $exist['employee_id'],
                        'name' => $exist['name'],
                        'username' => $exist['username'],
                        'image' => site_url("assets/uploads/user_pic/").$exist['profile_photo'],
                        'role_id' => $exist['role_id'],
                        'company_name' => $exist['company_name'],
                        'company_id' => $exist['company_id'],
                        'subscription_added_on' => $exist['subscription_added_on'],
                        'subscription_name' => $exist['subscription_name'],
                        'duration' => $exist['duration']
                    );
                    
                    $response["status"]=true;
                    $response["msg"]="Success";
                    $param = array(
				        'device_token' => $device_token
			            );
			
		
			    $update = $this->common_model->update($param,array('employee_id'=>$exist['employee_id']),'employees');   
                $response["data"]=$result;
                }
                else
                {
                    $response["status"]=false;
                    $response["msg"]="Account not active";
                }
                
            }
            else
            {
                $response["status"]=false;
                $response["msg"]="Incorrect password";
            }
        }
        else
        {
            $response["status"]=false;
            $response["msg"]="Account not found ";
        }
        
        echo json_encode( $response);

    }

	function getProfile_post()
	{
	    $response=array();
	    $result=array();
        $json = file_get_contents('php://input');
        $input = $this->json_validate($json);
        $employee_id= $input->employee_id;
        
        $where="employee_id= ".$employee_id ;
        $query="select e.*,c.name as company_name,c.subscription_added_on,s.name as subscription_name,s.duration FROM `employees` as e left join company as c on e.company_id=c.company_id left JOIN subscription as s on s.subsrciption_id=c.subsrciption_id where ".$where ;
		$res = $this->db->query($query)->result_array();
		if(count($res)>0)
		{
		    $status_arr=["Allotted","Finished"];
		    $response["status"]=true;
            $response["msg"]="Success";
            $response["data"]=$res;
            $response["image_path"]=site_url("assets/uploads/user_pic/");
            $response["work_status"]=$status_arr;
            
		}
		else
		{
		    $response["status"]=false;
            $response["msg"]="No Data Found";
		}
		
		echo json_encode($response);
	}
    function getAllTasks_post()
	{
	    $json = file_get_contents('php://input');
        $data = $this->json_validate($json);
        

        $where = " 1=1 ";
		/*if($role_id != 5) 
        {
			$where .= " and (w.created_by = '".$employee_id."' or w.assigned_to = '".$employee_id."') ";
		}*/
		/*if($status !="All")
		{
		    $where .= "and w.status='$status";
		}*/
		if(empty($data->work_id))
		{
		    $employee_id= $data->employee_id;
            $role_id=$data->role_id;
            $status=$data->status;
		    if($status =="Assigned To")
		    {
		        $where .= "and w.assigned_to=".$employee_id;
		    }
		    else if($status =="Allotted")
		    {
		        $where .= "and w.created_by=".$employee_id;
		    }
		    else if($status =="Pending")
		    {
		        $where .= " and (w.created_by = '".$employee_id."' or w.assigned_to = '".$employee_id."') and w.status='allotted'";
		    }
		    else if($status =="Finished")
		    {
		        $where .= " and (w.created_by = '".$employee_id."' or w.assigned_to = '".$employee_id."') and w.status='finished'";
		    }
		}
		else
		{
		    $where=" w.work_id=".$data->work_id;
		}
		

        $query="select w.*,e.name,emp.name as assigned_by from works as w left join employees as e on e.employee_id=w.assigned_to left join employees as emp on emp.employee_id=w.created_by where ".$where ;
        //$qry = "select w.*, e.name as assigned_to,c.name as company,IF(w.parent_id='0','main','sub') as tasktype,(select count(work_id) from works where parent_id = w.work_id) as subtasks,i.invoice_no from works as w left join employees as e on (w.assigned_to = e.employee_id) left join company as c on (w.company_id = c.company_id) left join invoices as i on (w.work_id=i.work_id) where ".$where." order by w.modified_at DESC";
		
		$res = $this->db->query($query)->result_array();
		if(count($res)>0)
		{
		    $response["status"]=true;
            $response["msg"]="Success";
            $response["data"]=$res;
            
		}
		else
		{
		    $response["status"]=false;
            $response["msg"]="No Data Found";
		}
		
		echo json_encode($response);		
		
		
	}
	function getAssignedPendingTasks_post()
	{
	    $json = file_get_contents('php://input');
        $data = $this->json_validate($json);
        $employee_id= $data->employee_id;
        $assigned_by=$data->created_by;

		$where = "w.status='allotted' and w.assigned_to=".$employee_id." and w.created_by=". $assigned_by;
		

        $query="select w.*,e.name,emp.name as assigned_by from works as w left join employees as e on e.employee_id=w.assigned_to left join employees as emp on emp.employee_id=w.created_by where ".$where ;
		
		$res = $this->db->query($query)->result_array();
		if(count($res)>0)
		{
		    $response["status"]=true;
            $response["msg"]="Success";
            $response["data"]=$res;
            
		}
		else
		{
		    $response["status"]=false;
            $response["msg"]="No Data Found";
		}
		
		echo json_encode($response);		
		
		
	}
	function getAllSubTasks_post()
	{
	    $json = file_get_contents('php://input');
        $data = $this->json_validate($json);
        $parent_id= $data->parent_id;

        $query="select w.*,e.name,emp.name as assigned_by from works as w left join employees as e on e.employee_id=w.assigned_to left join employees as emp on emp.employee_id=w.created_by where parent_id=".$parent_id ;

		$res = $this->db->query($query)->result_array();
		if(count($res)>0)
		{
		    $response["status"]=true;
            $response["msg"]="Success";
            $response["data"]=$res;
            
		}
		else
		{
		    $response["status"]=false;
            $response["msg"]="No Data Found";
		}
		
		echo json_encode($response);		
		
		
	}
	function search_post()
	{
	    $json = file_get_contents('php://input');
        $data = $this->json_validate($json);
        $employee_id= $data->employee_id;
        $search=$data->search;
	
		$where = " (w.created_by = '".$employee_id."' or w.assigned_to = '".$employee_id."') ";
		$where .= " and title like '%".$search."%'";

        $query="select w.*,e.name,emp.name as assigned_by from works as w left join employees as e on e.employee_id=w.assigned_to left join employees as emp on emp.employee_id=w.created_by where ".$where ;
		$res = $this->db->query($query)->result_array();
		if(count($res)>0)
		{
		    $response["status"]=true;
            $response["msg"]="Success";
            $response["data"]=$res;
            
		}
		else
		{
		    $response["status"]=false;
            $response["msg"]="No Data Found";
		}
		
		echo json_encode($response);		
		
		
	}
	  
	function addTask_post() 
	{
		$response=array();
	    $result=array();
        $json = file_get_contents('php://input');
        $data = $this->json_validate($json);
        $employee_id= $data->created_by;
		
	    $param = array(
				'title' => $data->title,
				'description' => $data->description,
				'work_date' => set_date($data->work_date),
				'last_date' => (!empty($data->last_date))?set_date($data->last_date):NULL,
				'parent_id' => (!empty($data->parent_id))?$data->parent_id:'0',
				'created_by' => $employee_id,
				'assigned_to' => $data->assigned_to,
				'status' => 'allotted',
				//'remarks' => ($data->remarks!="")?$data->remarks:NULL,
				'modified_at' => date('Y-m-d H:i:s'),
				'created_on' => date('Y-m-d H:i:s'),
				'company_id' =>$data->company_id,
				'modified_by' => $employee_id
			);
			
			$work = $this->common_model->insert($param,'works');
			if(!empty($work)) 
			{
				//save to notification
				$message="A new task named '".$data->title."' has been assigned for you.";
				$notify = array('notification_type'=>'work-assignment','employee_id'=>$data->assigned_to,
				'notification_details'=>array('work_id'=>$work),"title"=>"New Task Assigned","message"=>$message,"work_id"=>$work);
				$this->settings->saveNotification($notify);
				$response["status"]=true;
                $response["msg"]="Success";
                $response["data"]=[];
                
                //$body=array();
                //array_push($body,array("message"=>$message,"work_id"=>"0","type"=>"add_task","title"=>"New Task Assigned"));
                //$message=json_encode($body);
                $data2=array("message"=>$message,"work_id"=>$work,"type"=>"add_task","title"=>"New Task Assigned");
                $this->getDeviceToken($data->assigned_to,"New Task Assigned",$message,$data2);
				echo json_encode($response);
				exit;
			} else {
				$response["status"]=false;
                $response["msg"]="Failed";
                echo json_encode($response);
			    exit;
			}
		
	}
	
	
	function updateTask2_post() 
	{
		
		$response=array();
	    $result=array();
        $json = file_get_contents('php://input');
        $data = $this->json_validate($json);
        $employee_id= $data->modified_by;
		if($data->update_status)
		{
		    $where="w.parent_id=".$data->work_id." and w.status='allotted'";
		    $query="select w.*,e.name from works as w left join employees as e on e.employee_id=w.assigned_to where ".$where ;
		    $res = $this->db->query($query)->result_array();
		    if(!empty($res))
		    {
		        $response["status"]=false;
                $response["msg"]="Some sub tasks are yet to be finished";
                echo json_encode($response);
			    exit;
		    }
		}
	    $param = array(
				'title' => $data->title,
				'description' => $data->description,
				'work_date' => set_date($data->work_date),
				'last_date' => (!empty($data->last_date))?set_date($data->last_date):NULL,
				'parent_id' => $data->parent_id,
				//'created_by' => $data->created_by,
				'assigned_to' => $data->assigned_to,
				'status' => $data->status,
				//'remarks' => ($data->remarks!="")?$data->remarks:NULL,
				'modified_at' => date('Y-m-d H:i:s'),
				'company_id' =>$data->company_id,
				'modified_by' => $employee_id
		        );
			
		
			$work = $this->common_model->update($param,array('work_id'=>$data->work_id),'works');
			if(!empty($work)) 
			{
				
				$created_by = $this->common_model->selectOne('works',array('work_id'=>$data->work_id),'created_by');
				//save to notification
				$message="Task '".$data->title."' was updated.";
				$notify = array('notification_type'=>'work-update','employee_id'=>$data->assigned_to,
				'notification_details'=>array('work_id'=>$data->work_id),"title"=>"Task Updated!!","message"=>$message);
				
				$this->settings->saveNotification($notify);
				
				$response["status"]=true;
                $response["msg"]="Success";
                $response["data"]=[];
                //$body=array();
                //array_push($body,array("message"=>$message,"work_id"=>$data->work_id,"type"=>"update_task","title"=>"Task Updated"));
                //$message=json_encode($body);
                $data2=array("message"=>$message,"work_id"=>$data->work_id,"type"=>"update_task","title"=>"Task Updated");
                $this->getDeviceToken($data->created_by,"Task Updated",$message,$data2);
				echo json_encode($response);
				exit;
			} else {
				$response["status"]=false;
                $response["msg"]="Failed";
                echo json_encode($response);
			    exit;
			}
			
		
	}
	
	function deleteTask_post() 
	{
		$json = file_get_contents('php://input');
        $data = $this->json_validate($json);
				
		$resp = $this->common_model->work_delete($data->work_id);
		  if(!empty($resp)) {
			$response["status"]=true;
                $response["msg"]="Success";
                $response["data"]=[];
                
                $message="Task '".$data->title."' has been deleted.";
				$notify = array('notification_type'=>'work-deleted','employee_id'=>$data->assigned_to,
				'notification_details'=>array('work_id'=>$data->work_id),"title"=>"Task Deleted!!!","message"=>$message);
				
				$this->settings->saveNotification($notify);
                $this->getDeviceToken($data->assigned_to,"Task Deleted",$message,null);
				echo json_encode($response);
				exit;
		  } else {
			$response["status"]=false;
                $response["msg"]="Failed";
                echo json_encode($response);
			    exit;
		  }	
		
	}
	function getEmployees_post()
	{
	    $response=array();
	    $result=array();
        $json = file_get_contents('php://input');
        $input = $this->json_validate($json);
        $employee_id= $input->employee_id;
        
        if(empty($employee_id)) $where=" role_id!= 5";
        else $where="employee_id= ".$employee_id ;
        $where.=" and role_id=1";
        $query="select * from employees where ".$where ;
		$res = $this->db->query($query)->result_array();
		if(count($res)>0)
		{
		    $status_arr=["Allotted","Finished"];
		    $response["status"]=true;
            $response["msg"]="Success";
            $response["data"]=$res;
            $response["image_path"]=site_url("assets/uploads/user_pic/");
            $response["work_status"]=$status_arr;
            
		}
		else
		{
		    $response["status"]=false;
            $response["msg"]="No Data Found";
		}
		
		echo json_encode($response);
	}
	function getWorkStatus_post()
	{
	    $status_arr=["Allotted","Finished"];
		$response["status"]=true;
        $response["msg"]="Success";
        $response["work_status"]=$status_arr;
	}
	
	function addComment_post() 
	{
		
		$response=array();
	    $result=array();
        $json = file_get_contents('php://input');
        $data = $this->json_validate($json);
	    $param = array(
				'comment' => $data->comment,
				'employee_id' => $data->employee_id,
				'work_id' => $data->work_id
			);
			
			$work = $this->common_model->insert($param,'comments');
			if(!empty($work)) {
				$response["status"]=true;
                $response["msg"]="Success";
                $response["data"]=[];
                $query="select * from works  where work_id=".$data->work_id  ;
                $res = $this->db->query($query)->row_array();
                $created_by=$res['created_by'];
                $assigned_to=$res['assigned_to'];
                $message=$data->name. " commented: ".$data->comment;
                
                //$body=array();
                //array_push($body,array("message"=>$message,"work_id"=>$data->work_id,"type"=>"add_comment","title"=>"New Comment"));
                //$message=json_encode($body);
                $emp_id;
                if($data->employee_id!=$created_by)
                {
                    $emp_id=$created_by;
                }
                if($data->employee_id!=$assigned_to)
                {
                    $emp_id=$assigned_to;
                }
                
                $data2=array("message"=>$message,"work_id"=>$data->work_id,"type"=>"add_comment","title"=>"New Comment");
                if(!empty($emp_id))
                $this->getDeviceToken($emp_id,"New Comment",$message,$data2);
				echo json_encode($response);
				exit;
			} else {
				$response["status"]=false;
                $response["msg"]="Failed";
                echo json_encode($response);
			    exit;
			}
		
	}
    function getComments_post()
    {
        $response=array();
        $json = file_get_contents('php://input');
        $data = $this->json_validate($json);
        $work_id= $data->work_id;
        $query="select c.*,e.name from comments as c left join employees as e on e.employee_id=c.employee_id where c.work_id=".$work_id  ;
        $res = $this->db->query($query)->result_array();
        
        if(count($res)>0)
		{
		    $response["comments"]=$res;
		    $response["status"]=true;
            $response["msg"]="Success";
            
		}
		else
		{
		    $response["status"]=false;
            $response["msg"]="No Data Found";
		}
		
		echo json_encode($response);	
    }
    function getNotifications_post()
	{
	    $json = file_get_contents('php://input');
        $data = $this->json_validate($json);
        $employee_id= $data->employee_id;

        $query="select w.*,e.name from notifications as w left join employees as e on e.employee_id=w.employee_id where w.employee_id=".$employee_id." order by w.notification_id desc" ;
		$res = $this->db->query($query)->result_array();
		if(count($res)>0)
		{
		    $response["status"]=true;
            $response["msg"]="Success";
            $response["data"]=$res;
            
		}
		else
		{
		    $response["status"]=false;
            $response["msg"]="No Data Found";
		}
		
		echo json_encode($response);		
		
		
	}
	
	public function sendNotification($arrayToSend)
    {
        $SERVER_API_KEY = 'AAAACCtHCco:APA91bEJNBpkeX_ldX7YmGkuTyUyUp3mAL8kMD248yN5AkXTtINP5_5M6sUwOoVhV7-r_v0p1DlwttJFJNcmrmPSVVYFrZ2uBnMSJWvEckLQxLKYMNmuIbNN55LDt9sKMXWBhEMMBWve';
        $json = json_encode($arrayToSend);
        $headers = [
            'Authorization: key=' . $SERVER_API_KEY,
            'Content-Type: application/json',
        ];
    
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }
    public function sendPush_post()
    {
        
        $json = file_get_contents('php://input');
        $data = $this->json_validate($json);
		$token=$data->Token;
		$Title=$data->Title;
		//$Message=$data->Message;
		$Body=$data->Body;
		//$msg=array("title"=>$Title,"content"=>$Message);
		//$title = "Notification title";
        //$body = "Hello I am from Your php server";
        $notification = array('title' =>$Title , 'body' => $Body, 'sound' => 'default', 'badge' => '1');
        $arrayToSend = array('to' => $token, 'notification' => $notification,'priority'=>'high');
		$this->sendNotification($arrayToSend);
		
    }
    /*public function getDeviceToken($employee_id,$title,$body)
	{
	    $exist = $this->common_model->selectOne('employees',array('employee_id'=>$employee_id),'*');
        if(!empty($exist)) 
        {				
            $token=$exist['device_token'];
            $notification = array('title' =>$title , 'body' =>$body, 'sound' => 'default', 'badge' => '1');
            $data = array('user_id' => 'youruserid', 'name' => 'yohan');
            $arrayToSend = array('to' => $token, 'notification' => $notification,'priority'=>'high','data' => $data, 'content_available' => true);
            //$arrayToSend = array('to' => $token, 'notification' => $notification,'priority'=>'high');
		    $this->sendNotification($arrayToSend);
	    }
	   
	    
	}*/
	public function getDeviceToken($employee_id,$title,$body,$data)
	{
	    $exist = $this->common_model->selectOne('employees',array('employee_id'=>$employee_id),'*');
        if(!empty($exist)) 
        {				
            $token=$exist['device_token'];
            $notification = array('title' =>$title , 'body' =>$body, 'sound' => 'default', 'badge' => '1');
            //$data = array('user_id' => 'youruserid', 'name' => 'yohan');
            $arrayToSend = array('to' => $token, 'notification' => $notification,'priority'=>'high','data' => $data, 'content_available' => true);
            //$arrayToSend = array('to' => $token, 'notification' => $notification,'priority'=>'high');
		    $this->sendNotification($arrayToSend);
	    }
	   
	    
	}
	public function updateProfileImage_post()
	{
	     //$json = file_get_contents('php://input');
        //$data = $this->json_validate($json);
        $employee_id=$_POST['employee_id'];
	    if($_FILES['file_name']['error']!=4) 
	    {
					
			$oldmask = umask(0);
			if (!is_dir('assets/uploads/user_pic')) 
			{
			  mkdir('assets/uploads/user_pic', 0777, true);
			  if(!file_exists('assets/uploads/user_pic/index.html')){
				file_put_contents('assets/uploads/user_pic/index.html', '');
			  }
			}
			umask($oldmask);					
			$image = date('dmYhis').'_'.rand(0,99999).".".pathinfo($_FILES['file_name']['name'], PATHINFO_EXTENSION);
			$config['upload_path']   =  'assets/uploads/user_pic/';
			$config['allowed_types'] = 'jpg|png|jpeg';
			$config['file_name']     = $image;
			$this->load->library('upload', $config);				   
			if ($this->upload->do_upload('file_name')) 
			{					
				  //resize the uploaded
				  image_resize('assets/uploads/user_pic/'.$image,'140','140',FALSE);					  
				  $data_update = array(
				    'profile_photo'  => $image,
				  );
				  $data_update = $this->security->xss_clean($data_update);
				  $this->common_model->update($data_update, array('employee_id'=>$employee_id),'employees');	
				    $response["status"]=true;
                 $response["msg"]="Success";
                 $response["data"]=[];
			}
			else
			{
			    $response["status"]=false;
                 $response["msg"]="Not updated";
			}
		}
		else
		{
		    $response["status"]=false;
            $response["msg"]="No files found";
		}
		
		echo json_encode($response);
	}
	public function addReminder_post()
	{
	    	
		$json = file_get_contents('php://input');
        $data = $this->json_validate($json);
		  
		  $param = array(
		    'title' => $data->title,
			'reminder_date' => $data->reminder_date,
			'reminder_time' => $data->reminder_time,
			'description' => $data->description,
			//'color' => $data->color,
			'created_by' => $data->created_by,
			'remind_to' => $data->remind_to,
			'created_at' => date('Y-m-d H:i:s')
		  );
		
		 $resp = $this->common_model->insert($param,'reminders');
			
		 if(!empty($resp))  {
			$response["status"]=true;
            $response["msg"]="Success";
            $response["reminder_id"]=$resp;
            if(!empty($data->remind_to))
            {
                $emp_id_array=(explode(",",$data->remind_to)) ;
                $message="There is new reminder for you";
                $data2=array("message"=>$message,"work_id"=>"0","type"=>"add_reminder","title"=>"New Reminder");
                foreach($emp_id_array  as $id)
                {
                    $this->getDeviceToken($id,"New Reminder",$message,$data2);
                }
            }
            
             
		    echo json_encode($response);
		    exit;
		  } else {
		      $response["status"]=false;
            $response["msg"]="Reminder not added";
		    echo json_encode($response);
		    exit;
		  }	  
	}
	public function updateReminder_post()
	{
	    	
		$json = file_get_contents('php://input');
        $data = $this->json_validate($json);
		  
		  $data_update = array(
		    'title' => $data->title,
			'reminder_date' => $data->reminder_date,
			'reminder_time' => $data->reminder_time,
			'description' => $data->description,
			//'color' => $data->color,
			'created_by' => $data->created_by,
			'remind_to' => $data->remind_to
		  );
		
		 
		 $resp=$this->common_model->update($data_update, array('reminder_id'=>$data->reminder_id),'reminders');
			
		 if(!empty($resp))  {
			$response["status"]=true;
             $response["msg"]="Reminder updated";
		    echo json_encode($response);
		    exit;
		  } else {
		      $response["status"]=false;
            $response["msg"]="Reminder not updated";
		    echo json_encode($response);
		    exit;
		  }	  
	}
	public function deleteReminder_post() 
	{
		$json = file_get_contents('php://input');
        $data = $this->json_validate($json);
				
		$resp = $this->common_model->reminder_delete($data->reminder_id);
		  if(!empty($resp)) {
			$response["status"]=true;
                $response["msg"]="Success";
                $response["data"]=[];
                
               /* $message="Task '".$data->title."' has been deleted.";
				$notify = array('notification_type'=>'work-deleted','employee_id'=>$data->assigned_to,
				'notification_details'=>array('work_id'=>$work),"title"=>"Task Deleted!!!","message"=>$message);
				
				$this->settings->saveNotification($notify);
                $this->getDeviceToken($data->assigned_to,"Task Deleted!!!",$message);*/
				echo json_encode($response);
				exit;
		  } else {
			$response["status"]=false;
                $response["msg"]="Failed";
                echo json_encode($response);
			    exit;
		  }	
		
	}
	function getReminders_post()
	{
	    $json = file_get_contents('php://input');
        $data = $this->json_validate($json);
        $employee_id= $data->created_by;

        $query="select w.* from reminders as w where (w.created_by=".$employee_id." or w.remind_to=".$employee_id.") and DATE(w.reminder_date)=DATE('".$data->reminder_date."')" ;
		$res = $this->db->query($query)->result_array();
		$result=array();
		if(count($res)>0)
		{
		    //echo json_encode($res);
		    foreach($res as $row)
		    {
		        $res2=array();
		        $remind_to=$row['remind_to'];
		        if($remind_to!=null)
		        {
		            $query="select employee_id,name from employees where employee_id in ($remind_to)";
		            $res2=$this->db->query($query)->result_array();
		        }

		        if(count($res2)>0)
		        {
		            $row["remind_to_list"]=$res2;
		            array_push($result,$row);
		        }
		        else
		        {
		            $row["remind_to_list"]=[];
		            array_push($result,$row);
		        }
		        
		    }
		    $response["status"]=true;
            $response["msg"]="Success";
            $response["data"]=$result;
            
		}
		else
		{
		    $response["status"]=false;
            $response["msg"]="No reminders found";
		}
		
		echo json_encode($response);	
	}
	function sendExpiredTasks_post()
	{
	    $json = file_get_contents('php://input');
        $data = $this->json_validate($json);
        $where = " 1=1 ";
		/*if($role_id != 5) 
        {
			$where .= " and (w.created_by = '".$employee_id."' or w.assigned_to = '".$employee_id."') ";
		}*/
		/*if($status !="All")
		{
		    $where .= "and w.status='$status";
		}*/
		$employee_id= $data->employee_id;
        //$role_id=$data->role_id;
        //$status=$data->status;
		$where = " (w.created_by = '".$employee_id."' or w.assigned_to = '".$employee_id."') and w.status='allotted' and Date(w.last_date) =CURDATE()";

        $query="select w.*,e.name from works as w left join employees as e on e.employee_id=w.assigned_to where ".$where ;
		
		$res = $this->db->query($query)->result_array();
		if(count($res)>0)
		{
		    $Title="Task Expiring Today";
		    foreach($res as $row)
		    {
		        //echo $row['title'];
		        $Body="Task '".$row['title']."' will expire today";
		        $this->getDeviceToken($employee_id,$Title,$Body);
		    }
		    $response["status"]=true;
            $response["msg"]="Success";
            //$response["data"]=$res;
            
		}
		else
		{
		    $response["status"]=false;
            $response["msg"]="No Data Found";
		}
		
		echo json_encode($response);		
		
		
	}
	function getCategories_post()
	{
	    $response["status"]=true;
        $response["msg"]="Success";
        $query="select * from document_category" ;
		$res = $this->db->query($query)->result_array();
		if(count($res)>0)
		{
            $response["categories"]=$res;
		}
		$query="select * from document_type" ;
		$res = $this->db->query($query)->result_array();
		if(count($res)>0)
		{
            $response["types"]=$res;
		}
		
		
		echo json_encode($response);		
		
		
	}
	function uploadDocuments_post()
	{
	    /*$json = file_get_contents('php://input');
        $data = $this->json_validate($json);*/
	    $files=$_FILES;
        $errors="";
		$id_img_data = [];
		if(!empty($_FILES['file_name'])) 
		{
			$idImgsCount = count($_FILES['file_name']['name']);
			for ($i = 0; $i < $idImgsCount; $i++) 
			{
				$_FILES['file_name']['name']		= $files['file_name']['name'][$i];
				$_FILES['file_name']['type']		= $files['file_name']['type'][$i];
				$_FILES['file_name']['tmp_name']	= $files['file_name']['tmp_name'][$i];
				$_FILES['file_name']['error']	    = $files['file_name']['error'][$i];
				$_FILES['file_name']['size']		= $files['file_name']['size'][$i];
				
				if ($_FILES['file_name']['error'] != 4) 
				{
					$image_name = $_FILES['file_name']['name'] . "." . pathinfo($_FILES['file_name']['name']);
					$config['upload_path']		=  './assets/uploads/documents/';
					$config['allowed_types']	= '*';
					$config['file_name']		= $image_name;
					$this->load->library('upload', $config);
					$this->upload->initialize($config);
					if ($this->upload->do_upload('file_name')) 
					{	
						
					} 
					else 
					{
						$errors = $this->upload->display_errors();
					}
				}
				//print_r($errors); exit();
			}
			$response["status"]=true;
			$response["msg"]=$errors;
			echo json_encode($response);
		}
		
	}
	public function addDocumentLinks_post()
	{
	    	
		$json = file_get_contents('php://input');
        $data = $this->json_validate($json);
		  
		  $param = array(
		    'title' => $data->title,
			'reminder_date' => $data->reminder_date,
			'reminder_time' => $data->reminder_time,
			'description' => $data->description,
			//'color' => $data->color,
			'created_by' => $data->created_by,
			'remind_to' => $data->remind_to,
			'created_at' => date('Y-m-d H:i:s')
		  );
		
		 $resp = $this->common_model->insert($param,'reminders');
			
		 if(!empty($resp))  {
			$response["status"]=true;
            $response["msg"]="Success";
            $response["reminder_id"]=$resp;
            if(!empty($data->remind_to))
            {
                $emp_id_array=(explode(",",$data->remind_to)) ;
                $message="There is new reminder for you";
                $data2=array("message"=>$message,"work_id"=>"0","type"=>"add_reminder","title"=>"New Reminder");
                foreach($emp_id_array  as $id)
                {
                    $this->getDeviceToken($id,"New Reminder",$message,$data2);
                }
            }
            
             
		    echo json_encode($response);
		    exit;
		  } else {
		      $response["status"]=false;
            $response["msg"]="Reminder not added";
		    echo json_encode($response);
		    exit;
		  }	  
	}
	
	
}