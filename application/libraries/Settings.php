<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Settings {

   protected $CI;

   function __construct() {

     $this->CI =& get_instance();
     $this->CI->ci_minifier->init('html,css,js');
     $this->CI->ci_minifier->set_domparser(2);

   }
      
   public function getDate($original_date = "") {
      if($original_date == "" || empty($original_date)) {
          $new_date = NULL;
      } else {
          $timestamp = strtotime($original_date);
          $new_date = date("d-M-Y", $timestamp);
      }
      return $new_date;
  }

   function get_settings($title) {

		$res = $this->CI->db->get_where('settings',array('title'=>$title))->row_array();
		return @$res['value'];

	}

   function get_userdata($employee_id) {

		$this->CI->db->select('employee_id,name,username,email_id,profile_photo,last_login,status,created_at,role,roles.role_id');
		$this->CI->db->join('roles','employees.role_id=roles.role_id');
		$res = $this->CI->db->get_where('employees',array('employee_id' => $employee_id))->row_array();

		if(!empty($res))
		 return $res;
		else
		 return false;

	}
	public function getPermissionbyType($type='')
	{
		$qry5 = "(SELECT u.*,ut.userType,m.module FROM userPermission as u left join usertype as ut on (u.typeId = ut.typeId) left join modules as m on (u.moduleId = m.moduleId) where u.typeId = ?) ";
		$res = $this->CI->db->query($qry5,$type)->result_array();
		if(!empty($res)){
			return $res;
		}else{
			return false;
		}
	}
	

   //cut sentance
   function substrwords($text, $maxchar, $end='...') {
    if (strlen($text) > $maxchar || $text == '') {
        $words = preg_split('/\s/', $text);
        $output = '';
        $i      = 0;
        while (1) {
            $length = strlen($output)+strlen($words[$i]);
            if ($length > $maxchar) {
                break;
            }
            else {
                $output .= " " . $words[$i];
                ++$i;
            }
        }
        $output .= $end;
    }
    else {
        $output = $text;
    }
    return $output;
  }
  function getUserNames($userId) {

    $this->CI->db->select('firstName,lastName,occupation');
    $res = $this->CI->db->get_where('userProfile',array('userId' => $userId))->row_array();

    if(!empty($res))
     return $res;
    else
     return false;

  }

  public function getgroup($groupId='')
  {
    // $groupId='1';
    $this->CI->db->select('groupName,groupId,createdBy');
    $res = $this->CI->db->get_where('messageGroups',array('groupId'=>$groupId))->row_array();
    // echo $this->db->last_query();
    // pr($res);
    if(!empty($res))
     return $res;
    else
     return false;
  }
  
  function saveNotification($notify) {

      $notify['notification_details'] = json_encode($notify['notification_details']);
      $notify['read_status'] = '0';
      $notify['created_date'] = date('Y-m-d H:i:s');
      @$this->CI->db->insert('notifications', $notify);

    }
	 
	function check_in_process($data) {		
			$param = array (
				'employee_id' => $data['employee_id'],
				'in_time' => date('Y-m-d H:i:s'),
				'flag' => '0',
				'created_at' => date('Y-m-d H:i:s')
			);
			$this->CI->db->insert('attendance',$param);
			$insert_id = $this->CI->db->insert_id();
			if(!empty($insert_id)) {
				$response=array('status' => 1);
				return $response;
			} else {
				$response=array('status' => 0);
				return $response;
			}
	}
	
	function check_out_process($data) {
		
			$time1 = date('Y-m-d H:i:s', strtotime($data['in_time']));
			$time2 = date('Y-m-d H:i:s');
			
			$timeFirst  = strtotime($time1);
			$timeSecond = strtotime($time2);
			$differenceInSeconds = $timeSecond - $timeFirst;			
			
			$param = array (
				'out_time' => date('Y-m-d H:i:s'),
				'flag' => '1',
				'updated_at' => date('Y-m-d H:i:s'),
				'totaltime' => $differenceInSeconds
			);

			$this->CI->db->where('attendance_id',$data['attendance_id']);
			$this->CI->db->update('attendance',$param);
			if($this->CI->db->affected_rows()>0) {
				$response = array('status' => 1);
				return $response;
			} else {
				$response=array('status' => 0);
				return $response;
			}
	}
	 
  
}