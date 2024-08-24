<?php
class Common_model extends CI_Model
{

	// get table count
	public function get_count($table, $where = "")
	{
		if ($where != "") {
			$this->db->where($where);
		}
		$res = $this->db->count_all_results($table);

		return $res;
	}

	//-- insert function
	public function insert($data, $table)
	{
		$this->db->insert($table, $data);
		return $this->db->insert_id();
	}

	//-- update function
	function update($action, $where, $table)
	{
		$this->db->where($where);
		$this->db->update($table, $action);
		if ($this->db->affected_rows() > 0)
			return true;
		else
			return false;
	}

	//-- delete by ids
	function deleteByids($where, $table)
	{
		$this->db->delete($table, $where);
		return true;
	}

	//-- select function
	function selectAll($table, $where, $fields, $order_by = "", $order = "")
	{
		$this->db->select($fields);
		$this->db->from($table);
		if ($where != "") {
			$this->db->where($where);
		}
		if ($order_by != "" && $order != "") {
			$this->db->order_by($order_by, $order);
		}
		$query = $this->db->get();
		$row = $query->result_array();
		if (!empty($row))
			return $row;
		else
			return array();
	}

	function selectOne($table, $where, $fields)
	{
		$this->db->select($fields);
		$this->db->from($table);
		$this->db->where($where);
		$query = $this->db->get();
		$row = $query->row_array();
		if (!empty($row))
			return $row;
		else
			return array();
	}

	function selectsubscription($table, $where, $fields, $orderby)
	{
		$this->db->select($fields);
		$this->db->from($table);
		$this->db->where($where);
		$this->db->order_by($orderby);
		$query = $this->db->get();
		$row = $query->row_array();
		if (!empty($row))
			return $row;
		else
			return array();
	}

	function selectWhere($table, $where = [], $fields = '*', $limit = null, $order_by = null, $order = 'ASC')
	{
		// Select specific fields or all by default
		$this->db->select($fields);
		$this->db->from($table);

		// If any conditions are passed, apply them
		if (!empty($where)) {
			$this->db->where($where);
		}

		// If a limit is specified, apply it
		if ($limit !== null) {
			$this->db->limit($limit);
		}

		// If ordering is specified, apply it
		if ($order_by !== null) {
			$this->db->order_by($order_by, $order);
		}

		// Execute the query
		$query = $this->db->get();

		// Return the result as an array
		return $query->result_array();
	}
	function employees_list($filters = [])
	{

		$this->db->select('e.*, r.role');
		$this->db->from('employees as e');
		$this->db->join('roles as r', 'e.role_id = r.role_id', 'left');
		if (!empty($filters)) {
			$this->db->where($filters);
		}
		$query = $this->db->get();
		$result = $query->result_array();
		return !empty($result) ? $result : [];
	}


	function employee_by_id($employee_id)
	{

		// 		$qry = "select e.*,r.role from employees as e left join roles as r on (e.role_id = r.role_id) where e.role_id = '1' and e.company_id=".$company_id;
		$qry = "select e.*,r.role from employees as e left join roles as r on (e.role_id = r.role_id) where e.employee_id =" . $employee_id . " and e.role_id = '1'";
		$res = $this->db->query($qry, $employee_id)->row_array();
		if (!empty($res)) {
			return $res;
		} else {
			return array();
		}
	}
	public function get_company_by_email($email)
	{
		$this->db->select('*');
		$this->db->from('company');
		$this->db->where('email', $email);
		$this->db->limit(1);
		$query = $this->db->get();

		if ($query->num_rows() > 0) {
			return $query->row_array();
		} else {
			return array();
		}
	}

	public function get_company_by_id($id)
	{
		$this->db->select('*');
		$this->db->from('company');
		$this->db->where('company_id', $id);
		$this->db->limit(1);
		$query = $this->db->get();

		if ($query->num_rows() > 0) {
			return $query->row_array();
		} else {
			return array();
		}
	}
	public function check_otp($company_id, $otp)
	{
		$this->db->select('*');
		$this->db->from('company');
		$this->db->where('company_id', $company_id);
		$this->db->where('otp', $otp);
		$this->db->limit(1);
		$query = $this->db->get();

		if ($query->num_rows() > 0) {

			return $query->row_array();
		} else {

			return false;
		}
	}




	function company_by_id($company_id)
	{

		$qry = "select * from company where company_id = ?";
		$res = $this->db->query($qry, $company_id)->row_array();
		if (!empty($res)) {
			return $res;
		} else {
			return array();
		}
	}

	function companies_list()
	{

		$qry = "select c.*, s.name as subscribedName from company as c left join subscription as s  on s.subsrciption_id = c.subsrciption_id";
		$res = $this->db->query($qry)->result_array();
		if (!empty($res)) {
			return $res;
		} else {
			return array();
		}
	}


	function employee_delete($employee_id)
	{

		$exist = $this->db->get_where('employees', array('employee_id' => $employee_id))->row_array();
		if (!empty($exist)) {

			$this->db->delete('employees', array('employee_id' => $exist['employee_id']));
			if ($this->db->affected_rows() > 0) {
				//remove profile pic 
				if (!empty($exist['profile_photo'])) {
					if (file_exists('assets/uploads/user_pic/' . $exist['profile_photo'])) {
						unlink('assets/uploads/user_pic/' . $exist['profile_photo']);
					}
				}
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	function company_delete($company_id)
	{

		$exist = $this->db->get_where('company', array('company_id' => $company_id))->row_array();
		if (!empty($exist)) {
			$this->db->delete('company', array('company_id' => $exist['company_id']));
			if ($this->db->affected_rows() > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	function director_delete($director_id)
	{

		$exist = $this->db->get_where('directors', array('director_id' => $director_id))->row_array();
		if (!empty($exist)) {
			$this->db->delete('directors', array('director_id' => $exist['director_id']));
			if ($this->db->affected_rows() > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	function save_directors($data)
	{

		if (!empty($data)) {
			foreach ($data as $key => $value) {
				//add new entry
				$this->db->insert('directors', $value);
				$directors_id = $this->db->insert_id();
			}
			return true;
		} else {
			return false;
		}
	}

	function directors_list()
	{

		$qry = "select d.*,c.name as company from directors as d left join company as c on(d.company_id=c.company_id)";
		$res = $this->db->query($qry)->result_array();
		if (!empty($res)) {
			return $res;
		} else {
			return array();
		}
	}
	function directors_list_by_company($company_id)
	{

		$qry = "select d.*,c.name as company from directors as d left join company as c on(d.company_id=c.company_id) where d.company_id = ?";
		$res = $this->db->query($qry, $company_id)->result_array();
		if (!empty($res)) {
			return $res;
		} else {
			return array();
		}
	}

	function director_by_id($director_id)
	{

		$qry = "select d.*,c.name as company from directors as d left join company as c on(d.company_id=c.company_id) where d.director_id = ?";
		$res = $this->db->query($qry, $director_id)->row_array();
		if (!empty($res)) {
			return $res;
		} else {
			return array();
		}
	}

	function signatures_list($filter = "")
	{

		$where = " 1=1 ";
		$dte = date('Y-m-d', strtotime("+30 days"));
		$dte1 = date('Y-m-d');
		if ($filter != "" && $filter == 'expire-soon') {
			$where .= " and (s.expiry_date <= '" . $dte . "' and s.expiry_date > '" . $dte1 . "') ";
		}
		if ($filter != "" && $filter == 'expired') {
			$where .= " and s.expiry_date <= '" . $dte1 . "' ";
		}

		$qry = "select s.*,d.name as director,c.name as company from signatures as s left join directors as d on (s.director_id = d.director_id) left join company as c on(d.company_id=c.company_id) where " . $where;
		$res = $this->db->query($qry)->result_array();

		//echo $this->db->last_query();
		if (!empty($res)) {
			return $res;
		} else {
			return array();
		}
	}

	function signature_by_id($signature_id)
	{

		$qry = "select s.*,d.name as director,c.name as company,c.company_id from signatures as s left join directors as d on (s.director_id = d.director_id) left join company as c on(d.company_id=c.company_id) where s.signature_id = ?";
		$res = $this->db->query($qry, $signature_id)->row_array();
		if (!empty($res)) {
			return $res;
		} else {
			return array();
		}
	}

	function signature_by_serial($serial_no)
	{

		$qry = "select s.*,d.name as director,c.name as company,c.company_id from signatures as s left join directors as d on (s.director_id = d.director_id) left join company as c on(d.company_id=c.company_id) where s.serial_no = ?";
		$res = $this->db->query($qry, $serial_no)->row_array();
		if (!empty($res)) {
			return $res;
		} else {
			return array();
		}
	}

	function signature_delete($signature_id)
	{

		$exist = $this->db->get_where('signatures', array('signature_id' => $signature_id))->row_array();
		if (!empty($exist)) {
			$this->db->delete('signatures', array('signature_id' => $exist['signature_id']));
			if ($this->db->affected_rows() > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	function get_reminders($employee_id, $role_id)
	{

		$this->db->select('title,reminder_date as start,reminder_id as id,color');
		if ($role_id != 5) {
			$this->db->where('remind_to', $employee_id);
		}
		$res = $this->db->get('reminders')->result_array();
		return $res;
	}

	function reminder_delete($reminder_id)
	{

		$exist = $this->db->get_where('reminders', array('reminder_id' => $reminder_id))->row_array();
		if (!empty($exist)) {

			$this->db->delete('reminders', array('reminder_id' => $exist['reminder_id']));
			if ($this->db->affected_rows() > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	function save_split($data)
	{

		if (!empty($data)) {
			foreach ($data as $key => $value) {
				//add new entry
				$this->db->insert('works', $value);
				$work_id = $this->db->insert_id();
				if (!empty($work_id)) {
					//save to notification
					$notify = array('notification_type' => 'work-assignment', 'employee_id' => $value['assigned_to'], 'notification_details' => array('work_id' => $work_id));
					$this->settings->saveNotification($notify);
				}
			}
			return true;
		} else {
			return false;
		}
	}

	function work_delete($work_id)
	{

		$exist = $this->db->get_where('works', array('work_id' => $work_id))->row_array();
		if (!empty($exist)) {

			$this->db->delete('works', array('work_id' => $exist['work_id']));
			if ($this->db->affected_rows() > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	function inout_list()
	{

		$qry = "select ins.*,s.serial_no from in_out_status as ins left join signatures as s on (ins.signature_id = s.signature_id) order by ins.modified_at DESC";
		$res = $this->db->query($qry)->result_array();
		if (!empty($res)) {
			return $res;
		} else {
			return array();
		}
	}

	function inout_by_id($in_out_id)
	{

		$qry = "select ins.*,s.serial_no from in_out_status as ins left join signatures as s on (ins.signature_id = s.signature_id) where ins.in_out_id = ?";
		$res = $this->db->query($qry, $in_out_id)->row_array();
		if (!empty($res)) {
			return $res;
		} else {
			return array();
		}
	}

	function inout_delete($in_out_id)
	{

		$exist = $this->db->get_where('in_out_status', array('in_out_id' => $in_out_id))->row_array();
		if (!empty($exist)) {

			$this->db->delete('in_out_status', array('in_out_id' => $exist['in_out_id']));
			if ($this->db->affected_rows() > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	function checkSignatureExist($serial_no)
	{
		$param = array($serial_no);
		$sql = "select serial_no from signatures where serial_no = ?";
		$res = $this->db->query($sql, $param)->row_array();
		if (!empty($res)) {
			return true;
		} else {
			return false;
		}
	}

	function checkUsername($username, $employee_id = "")
	{

		if (!empty($username) && $username != "" && !empty($employee_id) && $employee_id != "") {
			$param = array($username, $employee_id);
			$sql = "select username from employees where username = ? and employee_id != ?";
		} else {
			$param = array($username);
			$sql = "select username from employees where username = ?";
		}

		$res = $this->db->query($sql, $param)->row_array();
		if (!empty($res)) {
			return true;
		} else {
			return false;
		}
	}

	// function checkDupEmail($email, $employee_id = "")
	// {

	// 	if (!empty($email) && $email != "" && !empty($employee_id) && $employee_id != "") {
	// 		$param = array($email, $employee_id);
	// 		$sql = "select email_id from employees where email_id = ? and employee_id != ?";
	// 	} else {
	// 		$param = array($email);
	// 		$sql = "select email_id from employees where email_id = ?";
	// 	}

	// 	$res = $this->db->query($sql, $param)->row_array();
	// 	//echo $this->db->last_query();
	// 	if (!empty($res)) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

	function checkDupEmail($email, $employee_id = "", $company_id = "")
	{
		$param = [$email];
		$sql = "select email_id from employees where email_id = ?";

		if (!empty($employee_id)) {
			$sql .= " and employee_id != ?";
			$param[] = $employee_id;
		}

		if (!empty($company_id)) {
			$sql .= " and company_id = ?";
			$param[] = $company_id;
		}

		// Execute the query with the provided parameters
		$res = $this->db->query($sql, $param)->row_array();

		// Return true if a duplicate email is found, otherwise false
		if (!empty($res)) {
			return true; // Duplicate found
		} else {
			return false; // No duplicate found
		}
	}

	function checkDupRegno($reg_no, $company_id = "")
	{

		if (!empty($reg_no) && $reg_no != "" && !empty($company_id) && $company_id != "") {
			$param = array($reg_no, $company_id);
			$sql = "select reg_no from company where reg_no = ? and company_id != ?";
		} else {
			$param = array($reg_no);
			$sql = "select reg_no from company where reg_no = ?";
		}

		$res = $this->db->query($sql, $param)->row_array();
		//echo $this->db->last_query();
		if (!empty($res)) {
			return true;
		} else {
			return false;
		}
	}

	function checkDupCinno($cin_no, $company_id = "")
	{

		if (!empty($cin_no) && $cin_no != "" && !empty($company_id) && $company_id != "") {
			$param = array($cin_no, $company_id);
			$sql = "select cin_no from company where cin_no = ? and company_id != ?";
		} else {
			$param = array($cin_no);
			$sql = "select cin_no from company where cin_no = ?";
		}

		$res = $this->db->query($sql, $param)->row_array();
		//echo $this->db->last_query();
		if (!empty($res)) {
			return true;
		} else {
			return false;
		}
	}

	function checkDupSignature($serial_no, $director_id = "")
	{

		if (!empty($serial_no) && $serial_no != "" && !empty($director_id) && $director_id != "") {
			$param = array($serial_no, $director_id);
			$sql = "select serial_no from signatures where serial_no = ? and director_id != ?";
		} else {
			$param = array($serial_no);
			$sql = "select serial_no from signatures where serial_no = ?";
		}

		$res = $this->db->query($sql, $param)->row_array();
		if (!empty($res)) {
			return true;
		} else {
			return false;
		}
	}

	/* for updating last login date */
	function updateLastLogin($employee_id)
	{

		$data = array(date('Y-m-d H:i:s'), $employee_id);
		$qry = "update employees set last_login = ? where employee_id = ?";
		$res = $this->db->query($qry, $data);
		if ($this->db->affected_rows() > 0) {
			return true;
		} else {
			return false;
		}
	}

	function notificationCount($employee_id, $role_id)
	{

		$param = array(date('Y-m-d'));
		$where = " 1=1 ";
		if ($role_id != 5) {
			$where .= " and remind_to = '" . $employee_id . "' ";
		}
		$qry = "select COUNT(reminder_id) as reminder from reminders where " . $where . " and reminder_date = ?";
		$res['reminder'] = $this->db->query($qry, $param)->row_array();

		$qry1 = "select COUNT(notification_id) as general from notifications where employee_id = ? and read_status = '0' order by created_at DESC";
		$res['general'] = $this->db->query($qry1, $employee_id)->row_array();

		if (!empty($res)) {
			return @$res;
		} else {
			return array();
		}
	}

	function reminderNotifications($employee_id, $role_id)
	{
		$param = array(date('Y-m-d'));
		$where = " 1=1 ";
		if ($role_id != 5) {
			$where .= " and remind_to = '" . $employee_id . "' ";
		}
		$qry = "select * from reminders where " . $where . " and reminder_date = ?";
		$res = $this->db->query($qry, $param)->result_array();

		if (!empty($res)) {
			return @$res;
		} else {
			return array();
		}
	}


	function generalNotifications($employee_id)
	{

		$param = array($employee_id);
		$qry = "select * from notifications where employee_id = ? order by created_at DESC";
		$res = $this->db->query($qry, $param)->result_array();
		if (!empty($res)) {
			return $res;
		} else {
			return array();
		}
	}

	// function works_list($employee_id, $role_id, $filter = "", $parent_id = "")
	// {

	// 	$where = " 1=1 ";
	// 	if ($role_id != 5) {
	// 		$where .= " and (w.created_by = '" . $employee_id . "' or w.assigned_to = '" . $employee_id . "') ";
	// 	}

	// 	if ($filter != "" && $filter == 'sub' && $parent_id != '') {
	// 		$where .= " and (w.work_id = '" . $parent_id . "' OR w.parent_id = '" . $parent_id . "') ";
	// 	}

	// 	if ($filter != "" && $filter != 'lapse-soon' && $filter != 'lapsed' && $filter != 'sub') {
	// 		$where .= " and w.status = '" . $filter . "' ";
	// 		$where .= " and w.parent_id = '0' ";
	// 	}

	// 	$dte  = date('Y-m-d', strtotime("+7 days"));
	// 	$dte1 = date('Y-m-d');

	// 	if ($filter != "" && $filter == 'lapse-soon') {
	// 		$where .= " and (w.last_date <= '" . $dte . "' and w.last_date >= '" . $dte1 . "') and w.status != 'finished' ";
	// 		$where .= " and w.parent_id = '0' ";
	// 	}

	// 	if ($filter != "" && $filter == 'lapsed') {
	// 		$where .= " and w.last_date < '" . $dte1 . "' and w.status != 'finished' ";
	// 		$where .= " and w.parent_id = '0' ";
	// 	}

	// 	$qry = "select w.*, e.name as assigned_to,c.name as company,IF(w.parent_id='0','main','sub') as tasktype,(select count(work_id) from works where parent_id = w.work_id) as subtasks,i.invoice_no from works as w left join employees as e on (w.assigned_to = e.employee_id) left join company as c on (w.company_id = c.company_id) left join invoices as i on (w.work_id=i.work_id) where " . $where . " order by w.modified_at DESC";

	// 	$res = $this->db->query($qry)->result_array();
	// 	//echo $this->db->last_query();
	// 	return $res;
	// }
	function works_list($employee_id, $role_id, $filter = "", $parent_id = "", $company_id = null, $status = "", $assigned_to = "", $company = "")
	{
		// pr($assigned_to);exit;
		$this->db->select("w.*, e.name as assigned_to, c.name as company, IF(w.parent_id='0','main','sub') as tasktype, (SELECT COUNT(work_id) FROM works WHERE parent_id = w.work_id) as subtasks, i.invoice_no");
		$this->db->from('works as w');
		$this->db->join('employees as e', 'w.assigned_to = e.employee_id', 'left');
		$this->db->join('company as c', 'w.company_id = c.company_id', 'left');
		$this->db->join('invoices as i', 'w.work_id = i.work_id', 'left');

		// Apply employee-specific filter if role_id is not 5
		// if ($role_id != 5) {
		// 	$this->db->where("(w.created_by = '$employee_id' OR w.assigned_to = '$employee_id')");
		// }
		if (!empty($status)) {
			$this->db->where('w.status', $status);
		}
		if (!empty($company)) {
			$this->db->where('w.company_id', $company);
		}


		// Apply assigned_to filter if provided
		if (!empty($assigned_to)) {
			$this->db->where('w.assigned_to', $assigned_to);
		}
		// Apply filter for sub-tasks if provided
		if ($filter === 'sub' && !empty($parent_id)) {
			$this->db->where("(w.work_id = '$parent_id' OR w.parent_id = '$parent_id')");
		}

		// Apply status filter if provided and it's not a special case like 'lapse-soon', 'lapsed', or 'sub'
		if (!empty($filter) && !in_array($filter, ['lapse-soon', 'lapsed', 'sub'])) {
			$this->db->where('w.status', $filter);
			$this->db->where('w.parent_id', 0);
		}

		// Handle special filters for 'lapse-soon' and 'lapsed'
		$current_date = date('Y-m-d');
		$lapse_soon_date = date('Y-m-d', strtotime("+7 days"));

		if ($filter === 'lapse-soon') {
			$this->db->where("w.last_date <=", $lapse_soon_date);
			$this->db->where("w.last_date >=", $current_date);
			$this->db->where("w.status !=", 'finished');
			$this->db->where('w.parent_id', 0);
		}

		if ($filter === 'lapsed') {
			$this->db->where("w.last_date <", $current_date);
			$this->db->where("w.status !=", 'finished');
			$this->db->where('w.parent_id', 0);
		}

		// Apply company_id filter if provided
		if ($company_id !== null) {
			$this->db->where('w.company_id', $company_id);
		}

		// Order by modified_at date descending
		$this->db->order_by('w.modified_at', 'DESC');

		// Execute the query and return the result set
		$query = $this->db->get();
		return $query->result_array();
	}

	function dashboard_works_list($filter = null)
	{
		$company_id = $this->session->userdata('company_id');

		// Prepare the base query
		$this->db->select('COUNT(w.work_id) as tasks');
		$this->db->from('works as w');

		// If company_id is set, filter by company_id. Otherwise, get data for all companies.
		if (!empty($company_id)) {
			$this->db->where('w.company_id', $company_id);
		}

		$dte  = date('Y-m-d', strtotime("+7 days"));
		$dte1 = date('Y-m-d');

		// Apply filters based on the task status (pending, allotted, finished)
		if ($filter == 'pending') {
			$this->db->where('w.last_date <=', $dte1);
			$this->db->where('w.status !=', 'finished');
		}

		if ($filter == 'allotted') {
			$this->db->where('w.last_date >=', $dte1);
			$this->db->where('w.status', 'allotted');
		}

		if ($filter == 'finished') {
			$this->db->where('w.status', 'finished');
		}

		// Order by modification date
		$this->db->order_by('w.modified_at', 'DESC');

		// Execute the query and return the result
		$res = $this->db->get()->result_array();

		return $res;
	}


	function works_list_by_company($company_id)
	{


		$qry = "select w.*, e.name as assigned_to,c.name as company,IF(w.parent_id='0','main','sub') as tasktype,(select count(work_id) from works where parent_id = w.work_id) as subtasks,i.invoice_no from works as w left join employees as e on (w.assigned_to = e.employee_id) left join company as c on (w.company_id = c.company_id) left join invoices as i on (w.work_id=i.work_id) where w.company_id = ? order by w.modified_at DESC";

		$res = $this->db->query($qry, $company_id)->result_array();
		//echo $this->db->last_query();
		return $res;
	}

	function work_by_id($work_id)
	{

		$qry = "select w.*, e.name as assigned_to,c.name as company,IF(w.parent_id='0','main','sub') as tasktype,(select count(work_id) from works where parent_id = w.work_id) as subtasks from works as w left join employees as e on (w.assigned_to = e.employee_id) left join company as c on (w.company_id = c.company_id) where w.work_id = ?";

		$res = $this->db->query($qry, $work_id)->row_array();
		return $res;
	}

	function invoice_delete($invoice_id)
	{

		$exist = $this->db->get_where('invoices', array('invoice_id' => $invoice_id))->row_array();
		if (!empty($exist)) {

			$this->db->delete('invoices', array('invoice_id' => $exist['invoice_id']));
			if ($this->db->affected_rows() > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	function check_subtask_status($work_id, $status)
	{

		if ($status != 'finished') {
			return true;
		} else {
			$this->db->select("count(*) as totcount,IFNULL(SUM(IF(status='finished',1,0)),0) as totfinished");
			$get_subtasks = $this->db->get_where('works', array('parent_id' => $work_id))->row_array();
			if (!empty($get_subtasks['totcount'])) {
				if ($get_subtasks['totcount'] != $get_subtasks['totfinished']) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
		}
	}

	function invoices_list()
	{

		$qry = "select i.*, c.name as company, w.title as work from invoices as i left join company as c on (i.company_id=c.company_id) left join works as w on (i.work_id = w.work_id)";
		$res = $this->db->query($qry)->result_array();
		return $res;
	}
	function invoice_list_by_company($company_id)
	{

		$qry = "select i.*, c.name as company, w.title as work from invoices as i left join company as c on (i.company_id=c.company_id) left join works as w on (i.work_id = w.work_id) where i.company_id = ?";
		$res = $this->db->query($qry, $company_id)->result_array();
		return $res;
	}

	function readNotifications($employee_id, $notification_id = "")
	{

		if ($employee_id != "" && $notification_id != "") {

			$param = array($employee_id, $notification_id);
			//$qry = "delete from notifications where employee_id = ? and notification_id = ?";
			$qry = "update notifications set read_status = '1' where employee_id = ? and notification_id = ?";

			$res = $this->db->query($qry, $param);
			if ($this->db->affected_rows() > 0) {
				return true;
			} else {
				return false;
			}
		}
	}

	function last_status($employee_id)
	{

		$qry = "select * from attendance where employee_id = ? and flag='0' order by attendance_id desc limit 1";
		$res = $this->db->query($qry, $employee_id)->row_array();
		return $res;
	}

	function attendance_report($employee_id = "", $from_date = "", $to_date = "")
	{

		$where = " 1=1 ";
		if (!empty($employee_id)) {
			$where .= " and a.employee_id = '" . $employee_id . "' ";
		}
		if (!empty($from_date) && !empty($to_date)) {

			$from = set_date($from_date);
			$to = set_date($to_date);
			$where .= " and (DATE_FORMAT(date(a.in_time),'%Y-%m-%d') >= '" . $from . "' and DATE_FORMAT(date(a.in_time),'%Y-%m-%d') <= '" . $to . "') ";
		}

		$qry = "SELECT e.employee_id,e.name,SUM(a.totaltime) as totaltime,DATE_FORMAT(date(a.in_time),'%Y-%m-%d') as attendance_date FROM `attendance` as a left join employees as e on (a.employee_id = e.employee_id) where " . $where . " and e.role_id != '5' GROUP BY DATE_FORMAT(date(a.in_time),'%Y-%m-%d'), a.employee_id";
		$res = $this->db->query($qry)->result_array();

		//echo $this->db->last_query();
		return $res;
	}

	function subscription_list()
	{

		$qry = "select * from subscription";
		$res = $this->db->query($qry)->result_array();
		if (!empty($res)) {
			return $res;
		} else {
			return array();
		}
	}

	function subscription_by_id($subscription_id)
	{

		$qry = "select * from subscription where subsrciption_id = ?";
		$res = $this->db->query($qry, $subscription_id)->row_array();
		if (!empty($res)) {
			return $res;
		} else {
			return array();
		}
	}

	function subscription_delete($subscription_id)
	{

		$exist = $this->db->get_where('subscription', array('subsrciption_id' => $subscription_id))->row_array();
		if (!empty($exist)) {
			$this->db->delete('subscription', array('subsrciption_id' => $exist['subsrciption_id']));
			if ($this->db->affected_rows() > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	function all_notification_delete($user_id)
	{

		$this->db->delete('notifications', array('employee_id' => $user_id));
		if ($this->db->affected_rows() > 0) {
			return true;
		} else {
			return false;
		}
	}
	public function count_employees($conditions = [])
	{
		$this->db->from('employees');

		// Apply filters if any
		if (!empty($conditions)) {
			$this->db->where($conditions);
		}

		return $this->db->count_all_results();
	}
}
