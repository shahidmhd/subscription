<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

if (!function_exists('_sendMail')) {
    function _sendMail($subject, $body, $emailTo, $emailToName = "")
    {

        if (empty($emailTo)) {
            return false;
        }

        $message = '<table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f6f6f6" align="center">
            <tbody>
                <tr>
                    <td valign="top" align="center">
                        <table style="max-width:400px;background:#ffffff" width="100%" border="0" align="center">
                            <tbody>
                                <tr>
                                    <td bgcolor="#ffffff">
                                        <table style="max-width:360px;background:#ffffff;font-family:Gotham,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:12px" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#ffffff" style="padding:20px 10px 10px 10px;" align="left"><img src="' . base_url() . 'assets/common/email-logo.png?v=78654" alt="TaskLyt" title="TaskLyt" style="border:none;display:block;color:#e00000;font-size:15px" width="35%"></td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:20px 10px 10px 10px;font-family:Gotham,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;color:#282c3f" bgcolor="#ffffff" align="left"></td>
                                                </tr>
                                                <tr>
                                                    <td style="border:10px solid #ffffff;font-family:Gotham,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:12px;color:#29303f" bgcolor="#ffffff" align="left">Hi,<br/><br/>
                                                        <div style="text-decoration:none;color:#29303f">' . $body . '</div>
                                                        <div style="border-bottom:1px solid #eaeaec">&nbsp;</div>
                                                        <div style="border-top:10px solid #ffffff;border-bottom:30px solid #ffffff"></div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>';

        // echo $message;
        // exit;

        require_once(APPPATH . 'third_party/phpmailer/PHPMailerAutoload.php');
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'email-smtp.ap-south-1.amazonaws.com';
        $mail->Port       = 587;
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth   = true;
        $mail->Username = 'AKIAQFRHKF4TNWPOS6KM';
        $mail->Password = 'BKjyE8EtAJkheR5ZuCsd+G1wSnxYCdBrd9h8tDBlL0Sa';
        $mail->SetFrom('prinsi@ksofttechnologies.in', 'Ksoft Technologies');
        $mail->addAddress($emailTo, $emailToName);

        $mail->IsHTML(true);
        $mail->CharSet = "UTF-8";

        $mail->Subject = $subject;
        $mail->Body    = $message;

        if (!$mail->send()) {
            //echo 'Message could not be sent.';
            //echo 'Mailer Error: ' . $mail->ErrorInfo;
            return false;
        } else {
            //echo 'Message has been sent';
            return true;
        }

        // require_once(APPPATH . 'third_party/phpmailer/PHPMailerAutoload.php');
        // $mail = new PHPMailer(true);
        // $mail->isSMTP();
        // $mail->Host = 'email-smtp.ap-south-1.amazonaws.com';
        // $mail->Port       = 587;
        // $mail->SMTPSecure = 'tls';
        // $mail->SMTPAuth   = true;
        // $mail->Username = 'AKIAQFRHKF4TNWPOS6KM';
        // $mail->Password = 'BKjyE8EtAJkheR5ZuCsd+G1wSnxYCdBrd9h8tDBlL0Sa';
        // $mail->SetFrom('prinsi@ksofttechnologies.in', 'Ksoft Technologies');
        // $mail->addAddress($emailTo, $emailToName);

        // $mail->IsHTML(true);

        // $mail->Subject = $subject;
        // $mail->Body    = $body;
        // $resp = $mail->send();
        // return $resp;

    }
}

function sendPassword($password, $emailTo, $emailToName = "")
{
    $subject = "Password";
    $message = "Your password is <b>" . $password . "</b>";
    // pr($emailTo);pr($emailToName);exit;
    $resp = _sendMail($subject, $message, $emailTo, $emailToName);
    return $resp;
}

if (!function_exists('sendSalarySlipEmail')) {
    function sendSalarySlipEmail($data)
    {
        $subject = "Salary Slip {$data['month_name']} {$data['year']}";
        $message = "Employee Name: {$data['employee_name']}<br>";
        $message .= "Basic Pay: {$data['basic_pay']}<br>";
        $message .= "DA: {$data['da']}<br>";
        $message .= "HRA: {$data['hra']}<br>";
        $message .= "Employee ESI: {$data['employee_esi']}<br>";
        $message .= "Employee PF: {$data['employee_pf']}<br>";
        $message .= "Incentive: {$data['incentives']}<br>";
        $message .= "Bonus: {$data['bonous']}<br>";
        $message .= "EWF: {$data['ewf']}<br>";
        $message .= "Attendance: {$data['attendance']}/{$data['total_working_days']}<br>";
        $message .= "Eligible Leave: {$data['eligible_leave']}<br>";
        $message .= "<b>Total: {$data['total_salary']}</b><br>";
        $emailTo = $data['employee_email'];
        $emailToName = $data['employee_name'];
        // pr($emailTo);pr($emailToName);exit;
        // pr($message);
        // exit;
        $resp = _sendMail($subject, $message, $emailTo, $emailToName);
        return $resp;
    }
}



// sooraj end
