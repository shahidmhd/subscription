<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('check_user_login')) {
	function check_user_login()
	{
		$ci = get_instance();

		if ($ci->session->userdata('is_user_login') != TRUE) {

			$array_items = array('employee_id', 'username', 'role_id', 'permissions', 'is_user_login');
			$ci->session->unset_userdata($array_items);
			return false;
		} else {
			return true;
		}
	}
}

if (!function_exists('get_date')) {
	function get_date($original_date = "")
	{

		if ($original_date == "" || empty($original_date) || $original_date == '0000-00-00 00:00:00' || $original_date == '0000-00-00') {
			$new_date = NULL;
		} else {
			$timestamp = strtotime($original_date);
			$new_date = date("d/m/Y", $timestamp);
		}
		return $new_date;
	}
}
if (!function_exists('set_date')) {
	function set_date($original_date = "")
	{

		if ($original_date == "" || empty($original_date)) {
			$new_date = NULL;
		} else {
			$original_date = str_replace('/', '-', $original_date);
			$timestamp = strtotime($original_date);
			$new_date = date("Y-m-d", $timestamp);
		}
		return $new_date;
	}
}

if (! function_exists('time_ago')) {
	function time_ago($ptime)
	{

		//convert the utc to local and then time ago apply
		$utctolocal = utcdate_to_localdate($ptime);
		$ptime = strtotime($utctolocal);

		$etime = time() - $ptime;
		if ($etime < 1) {
			return 'less than 1 second ago';
		}

		$count = array(
			365 * 24 * 60 * 60 => 'year',
			30 * 24 * 60 * 60 => 'month',
			24 * 60 * 60 => 'day',
			60 * 60 => 'hour',
			60 => 'minute',
			1 => 'second'
		);
		$count_plural = array(
			'year' => 'years',
			'month' => 'months',
			'day' => 'days',
			'hour' => 'hours',
			'minute' => 'minutes',
			'second' => 'seconds'
		);
		foreach ($count as $secs => $str) {
			$d = $etime / $secs;
			if ($d >= 1) {
				$r = round($d);
				return $r . ' ' . ($r > 1 ? $count_plural[$str] : $str) . ' ago';
			}
		}
	}
}

if (! function_exists('utcdate_to_localdate')) {
	//convert UTC from database to local time
	function utcdate_to_localdate($gmdate)
	{
		/* $gmdate must be in YYYY-mm-dd H:i:s format*/
		$timezone = date_default_timezone_get();
		//echo $timezone.'<br>'.date("Y-m-d H:i:s").'<br>';
		$userTimezone = new DateTimeZone($timezone);
		$gmtTimezone = new DateTimeZone('UTC');
		$myDateTime = new DateTime($gmdate, $gmtTimezone);
		$offset = $userTimezone->getOffset($myDateTime);
		return date("Y-m-d H:i:s", strtotime($gmdate) + $offset);
	}
}

if (! function_exists('saveNotification')) {
	function saveNotification($notify)
	{
		$ci = get_instance();
		$notify['details'] = json_encode($notify['details']);
		$notify['read_status'] = '0';
		$notify['created_at'] = gmdate('Y-m-d H:i:s');
		@$ci->db->insert('tbl_notification', $notify);
	}
}

if (! function_exists('delete_directory')) {
	function delete_directory($dirname)
	{
		if (is_dir($dirname))
			$dir_handle = opendir($dirname);
		if (!$dir_handle)
			return false;
		while ($file = readdir($dir_handle)) {
			if ($file != "." && $file != "..") {
				if (!is_dir($dirname . "/" . $file))
					unlink($dirname . "/" . $file);
				else
					delete_directory($dirname . '/' . $file);
			}
		}
		closedir($dir_handle);
		rmdir($dirname);
		return true;
	}
}

if (!function_exists('getUserImage')) {
	function getUserImage($image_path = '')
	{
		if (!empty($image_path)) {
			$path = 'assets/uploads/user_pic/' . $image_path;
			if (file_exists($path)) {
				return base_url() . $path;
			} else {
				return base_url() . 'assets/common/default.png';
			}
		} else {
			return base_url() . 'assets/common/default.png';
		}
	}
}

if (!function_exists('image_resize')) {
	function image_resize($image_path = "", $width = "", $height = "", $ratio = "")
	{

		$CI = get_instance();
		if (file_exists($image_path)) {

			$CI->load->library('image_lib');
			$config['image_library']    = 'gd2';
			$config['source_image']     = $image_path;
			$config['new_image']        = $image_path;
			$config['maintain_ratio']   = $ratio;
			$config['width']            = $width;
			$config['height']           = $height;
			$config['master_dim']       = 'auto';
			$CI->image_lib->initialize($config);
			$CI->image_lib->resize();
			$CI->image_lib->clear();
		}
	}
}
if (! function_exists('slugify')) {
	function slugify($text)
	{
		// replace non letter or digits by -
		$text = preg_replace('~[^\pL\d]+~u', '-', $text);
		// transliterate
		$text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
		// remove unwanted characters
		$text = preg_replace('~[^-\w]+~', '', $text);
		// trim
		$text = trim($text, '-');
		// remove duplicate -
		$text = preg_replace('~-+~', '-', $text);
		// lowercase
		$text = strtolower($text);

		$ci = get_instance();
		$ci->db->like('slug', $text, 'after');
		$ci->db->from('roles');
		$tot = $ci->db->count_all_results();

		if (empty($text)) {
			return 'role' . time() . rand(0, 1000);
		}

		return ($tot > 0) ? ($text . '-' . $tot) : $text;
	}
}

if (! function_exists('check_permission')) {
	function check_permission($module_id = "")
	{
		$ci = &get_instance();
		$permissions = $ci->session->userdata('permissions');
		$role = $ci->session->userdata('role_id');
		if ($role == '5') {
			return true;
		}
		if ($permissions != "") {
			$permissions_array = explode(",", $permissions);
			if (in_array($module_id, $permissions_array)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}


if (! function_exists('AmountInWords')) {
	function AmountInWords($num)
	{

		$ones = array(
			0 => "ZERO",
			1 => "ONE",
			2 => "TWO",
			3 => "THREE",
			4 => "FOUR",
			5 => "FIVE",
			6 => "SIX",
			7 => "SEVEN",
			8 => "EIGHT",
			9 => "NINE",
			10 => "TEN",
			11 => "ELEVEN",
			12 => "TWELVE",
			13 => "THIRTEEN",
			14 => "FOURTEEN",
			15 => "FIFTEEN",
			16 => "SIXTEEN",
			17 => "SEVENTEEN",
			18 => "EIGHTEEN",
			19 => "NINETEEN",
			"014" => "FOURTEEN"
		);
		$tens = array(
			0 => "ZERO",
			1 => "TEN",
			2 => "TWENTY",
			3 => "THIRTY",
			4 => "FORTY",
			5 => "FIFTY",
			6 => "SIXTY",
			7 => "SEVENTY",
			8 => "EIGHTY",
			9 => "NINETY"
		);
		$hundreds = array(
			"HUNDRED",
			"THOUSAND",
			"MILLION",
			"BILLION",
			"TRILLION",
			"QUARDRILLION"
		); /*limit t quadrillion */
		$num = number_format($num, 2, ".", ",");
		$num_arr = explode(".", $num);
		$wholenum = $num_arr[0];
		$decnum = $num_arr[1];
		$whole_arr = array_reverse(explode(",", $wholenum));
		krsort($whole_arr, 1);
		$rettxt = "";
		foreach ($whole_arr as $key => $i) {

			while (substr($i, 0, 1) == "0")
				$i = substr($i, 1, 5);
			if ($i < 20) {
				/* echo "getting:".$i; */
				$rettxt .= $ones[$i];
			} elseif ($i < 100) {
				if (substr($i, 0, 1) != "0")  $rettxt .= $tens[substr($i, 0, 1)];
				if (substr($i, 1, 1) != "0") $rettxt .= " " . $ones[substr($i, 1, 1)];
			} else {
				if (substr($i, 0, 1) != "0") $rettxt .= $ones[substr($i, 0, 1)] . " " . $hundreds[0];
				if (substr($i, 1, 1) != "0") $rettxt .= " " . $tens[substr($i, 1, 1)];
				if (substr($i, 2, 1) != "0") $rettxt .= " " . $ones[substr($i, 2, 1)];
			}
			if ($key > 0) {
				$rettxt .= " " . $hundreds[$key] . " ";
			}
		}
		if ($decnum > 0) {
			$rettxt .= " and ";
			if ($decnum < 20) {
				$rettxt .= $ones[$decnum];
			} elseif ($decnum < 100) {
				$rettxt .= $tens[substr($decnum, 0, 1)];
				$rettxt .= " " . $ones[substr($decnum, 1, 1)];
			}
		}
		return $rettxt;
	}
}

if (! function_exists('user_status')) {
	function user_status($name = "")
	{

		$img = array('active' => '<span class="badge badge-success">Active</span>', 'inactive' => '<span class="badge badge-danger">Inactive</span>', 'expired' => '<span class="badge badge-danger">expired</span>');
		if ($name != "")
			return @$img[$name];
		else
			return false;
	}
}

if (! function_exists('inout_status')) {
	function inout_status($name = "")
	{

		$img = array('dsin' => '<span class="badge badge-success">IN</span>', 'dsout' => '<span class="badge badge-danger">OUT</span>');
		if ($name != "")
			return @$img[$name];
		else
			return false;
	}
}

if (! function_exists('payment_status')) {
	function payment_status($name = "")
	{

		$img = array('pending' => '<span class="badge badge-warning">Pending</span>', 'paid' => '<span class="badge badge-success">Paid</span>');
		if ($name != "")
			return @$img[$name];
		else
			return false;
	}
}

if (!function_exists('days_to_expire')) {
	function days_to_expire($expiry_date)
	{

		$datetime1  = new DateTime($expiry_date);
		$datetime2  = new DateTime(date('Y-m-d'));
		$difference = $datetime2->diff($datetime1);
		$date_diff = $difference->format('%R%a');
		//pr($difference);
		if ($date_diff > 7) {
			$html = '<span class="badge badge-primary">' . $difference->format('%a') . ' day(s) remaining</span>';
		} else if ($date_diff > 0 && $date_diff <= 7) {
			$html = '<span class="badge badge-warning">' . $difference->format('%a') . ' day(s) remaining</span>';
		} else {
			$html = '<span class="badge badge-danger">Expired</span>';
		}

		$resp['days'] = $date_diff;
		$resp['html'] = $html;
		return $resp;
	}
}

if (! function_exists('task_type')) {
	function task_type($name = "")
	{

		$img = array('sub' => '<span class="badge badge-warning">Sub Task</span>', 'main' => '<span class="badge badge-success">Main Task</span>');
		if ($name != "")
			return @$img[$name];
		else
			return false;
	}
}

if (! function_exists('work_status')) {
	function work_status($name = "")
	{

		$img = array('allotted' => '<span class="badge badge-default">pending</span>', 'ready_to_check' => '<span class="badge badge-warning">Ready to Check</span>', 'ready_to_file' => '<span class="badge badge-primary">Ready to File</span>', 'filed' => '<span class="badge badge-info">Filed</span>', 'finished' => '<span class="badge badge-success">Finished</span>');
		if ($name != "")
			return @$img[$name];
		else
			return false;
	}
}

if (! function_exists('attendance_status')) {
	function attendance_status($time = 0)
	{
		$h = @$time / 3600;
		$status = '';
		if ($h >= 6) {
			$status = '<span class="badge badge-success">Present</span>';
		} elseif ($h >= 3 && $h < 6) {
			$status = '<span class="badge badge-warning">Half Day Leave</span>';
		} else {
			$status = '<span class="badge badge-danger">Full Day Leave</span>';
		}
		return $status;
	}
}




// if (!function_exists('check_company_active_subscription')) {
// 	function check_company_active_subscription()
// 	{
// 		$ci = get_instance();
// 		if (!$ci->session->userdata('is_user_login')) {
// 			return false;
// 		}
// 		$subscription_expiry = $ci->session->userdata('subscription_expiry');
// 		if (empty($subscription_expiry)) {
// 			return false;
// 		}
// 		$current_date = date('Y-m-d');

// 		if ($subscription_expiry > $current_date) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	}
// }

if (!function_exists('check_company_active_subscription')) {
	function check_company_active_subscription()
	{
		$ci = get_instance();
		if (!$ci->session->userdata('is_user_login')) {
			return false;
		}

		// Check if the user is an admin (role_id == 5) and grant full access
		$role_id = $ci->session->userdata('role_id');
		if ($role_id == 5) {
			return true;
		}
		$subscription_expiry = $ci->session->userdata('subscription_expiry');
		if (empty($subscription_expiry)) {
			return false;
		}

		$current_date = date('Y-m-d');

		if ($subscription_expiry > $current_date) {
			return true;
		} else {
			return false;
		}
	}
}
