<?php
defined('BASEPATH') or exit('No direct script access allowed');
require 'vendor/autoload.php';

use Razorpay\Api\Api;

class Subscription extends MY_Controller
{
    // private $key_id = 'rzp_test_b0BbGOGT5jAizp';
    // private $key_secret = 'BgpTaQ227R5XBdMXawVrw5U1';
    function __construct()
    {
        parent::__construct();
        // pr($this->session->userdata());
        // exit;
    }

    function subscriptions()
    {

        if (!check_user_login()) {
            redirect('signin', 'refresh');
        }

        $page_data['page_type']    = 'user';
        $page_data['page_name']    = 'subscriptions';
        $page_data['page_title']   = 'Plans';
        $page_data['menu']         = 'subscriptions';
        $page_data['subscriptions'] = $this->common_model->selectAll('subscription', '', '*');
        $this->load->view('theme/user/main', $page_data);
    }

    public function view_subscriptionhistory()
    {
        $page_data['page_type']    = 'user';
        $page_data['page_name']    = 'view_subscriptionhistory';
        $page_data['page_title']   = 'Subscription History';
        $page_data['menu']         = 'view_subscriptionhistory';
        $page_data['subscriptions'] = $this->common_model->selectAll('subscription', '', '*');
        $this->load->view('theme/user/main', $page_data);
    }

    public function razorpay_payment()
    {
        $key_id = $this->config->item('razorpay_key_id');
        $key_secret = $this->config->item('razorpay_key_secret');
        $plan_name = $this->input->post('plan_name');
        $user_count = $this->input->post('user_count');
        $plan_type = $this->input->post('plan_type');
        $total_price = $this->input->post('total_price');
        $currency = $this->input->post('currency');
        $amount_in_paise = (string)($total_price * 100);

        // $api = new Api($this->key_id, $this->key_secret);
        $api = new Api($key_id, $key_secret);
        try {
            $orderData = [
                'receipt'         => (string)rand(1000, 9999),
                'amount'          => $amount_in_paise,
                'currency'        => $currency,
                'payment_capture' => 1
            ];

            $razorpayOrder = $api->order->create($orderData);

            echo json_encode(['order_id' => $razorpayOrder['id'], 'amount' => $razorpayOrder['amount']]);
        } catch (Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function verify_payment()
    {
        $razorpay_order_id = $this->input->post('razorpay_order_id');
        $razorpay_payment_id = $this->input->post('razorpay_payment_id');
        $razorpay_signature = $this->input->post('razorpay_signature');

        $api = new Api($this->key_id, $this->key_secret);

        try {
            $attributes = [
                'razorpay_order_id' => $razorpay_order_id,
                'razorpay_payment_id' => $razorpay_payment_id,
                'razorpay_signature' => $razorpay_signature
            ];

            $api->utility->verifyPaymentSignature($attributes);

            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    public function add_subscription_status()
    {
        $this->load->model('Common_model');
        $razorpay_order_id = $this->input->post('razorpay_order_id');
        $razorpay_payment_id = $this->input->post('razorpay_payment_id');
        $user_count = $this->input->post('user_count');
        $plan_name = $this->input->post('plan_name');
        $currency = $this->input->post('currency');
        $total_price = $this->input->post('total_price');
        $plan_type = $this->input->post('plan_type') == 'Premium' ? 2 : 1;
        $company_id = $this->session->userdata('company_id');
        $is_trial = $this->input->post('is_trial');
        $subscription = $this->Common_model->selectOne('subscription', ['name' => $plan_name], '*');

        if (empty($subscription)) {
            echo json_encode(['success' => false, 'message' => 'Invalid subscription plan!']);
            return;
        }

        if (!empty($is_trial) && $is_trial == 2) {
            $trial_exists = $this->Common_model->selectsubscription(
                'subscription_history',
                ['company_id' => $company_id, 'is_trial' => 2],
                '*',
                'id DESC'
            );

            if (!empty($trial_exists)) {
                echo json_encode(['success' => false, 'message' => 'Your free trial has already been used.']);
                return;
            }
        }

        $subscription_id = $subscription['subsrciption_id'];
        $current_date = date('Y-m-d');
        $orderby = 'id DESC';
        $previous_subscription = $this->Common_model->selectsubscription(
            'subscription_history',
            ['company_id' => $company_id, 'expiry_date >' => $current_date],
            '*',
            $orderby
        );

        if (!empty($previous_subscription) && $previous_subscription['expiry_date'] > $current_date) {
            $start_date = date('Y-m-d', strtotime($previous_subscription['expiry_date'] . ' +1 day'));
        } else {
            $start_date = $current_date;
        }
        if ($subscription_id == 1) {
            $expiry_date = date('Y-m-d', strtotime('+1 month', strtotime($start_date)));
        } elseif ($subscription_id == 2) {
            $expiry_date = date('Y-m-d', strtotime('+90 days', strtotime($start_date)));
        } elseif ($subscription_id == 3) {
            $expiry_date = date('Y-m-d', strtotime('+1 year', strtotime($start_date)));
        } else {
            $expiry_date = date('Y-m-d', strtotime('+1 month', strtotime($start_date)));
        }

        $data = [
            'company_id' => $company_id,
            'subscription_id' => $subscription_id,
            'users_count' => $user_count,
            'date' => $start_date,
            'expiry_date' => $expiry_date,
            'payment_id' => $razorpay_payment_id,
            'amount' => $total_price,
            'subscription_type' => $plan_type,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            'is_trial' => !empty($is_trial) ? 2 : 1,
            'currency' => $currency
        ];

        $insert_id = $this->Common_model->insert($data, 'subscription_history');

        if ($insert_id) {

            $session_expiry_date = $this->session->userdata('subscription_expiry');
            if (empty($session_expiry_date) || $session_expiry_date <= $current_date) {
                $this->session->set_userdata([
                    'subscription_id' => $subscription_id,
                    'subscription_type' => $plan_type,
                    'subscription_expiry' => $expiry_date
                ]);
            }

            echo json_encode(['success' => true, 'message' => 'Subscribed successfully!!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update subscription!']);
        }
    }

    public function view_subscriptionhistory_ajax()
    {
        if (!$this->session->userdata('is_user_login')) {
            echo json_encode(['data' => []]);
            exit;
        }

        $company_id = $this->session->userdata('company_id');

        $all_history = $this->common_model->selectAll(
            'subscription_history',
            ['company_id' => $company_id],
            '*',
            'expiry_date',
            'DESC'
        );

        $subscriptions['data'] = [];

        if (!empty($all_history)) {
            foreach ($all_history as $key => $value) {
                $subscription = $this->common_model->selectOne('subscription', ['subsrciption_id' => $value['subscription_id']], '*');

                $subscriptions['data'][$key]['subscription_name'] = '<a href="' . base_url() . 'subscription-details/' . $value['subscription_id'] . '" title="View Details">' . $subscription['name'] . '</a>';
                $subscriptions['data'][$key]['start_date'] = date('d/m/Y', strtotime($value['date']));
                $subscriptions['data'][$key]['purchase_date'] = date('d/m/Y', strtotime($value['created_at']));
                $subscriptions['data'][$key]['expiry_date'] = date('d/m/Y', strtotime($value['expiry_date']));
                // $subscriptions['data'][$key]['amount'] = $value['amount'];
                if (isset($value['currency']) && $value['currency'] == 'INR') {
                    $subscriptions['data'][$key]['amount'] = '₹' . number_format($value['amount'], 2);
                } elseif (isset($value['currency']) && $value['currency'] == 'USD') {
                    $subscriptions['data'][$key]['amount'] = '$' . number_format($value['amount'], 2);
                } else {
                    $subscriptions['data'][$key]['amount'] = number_format($value['amount'], 2);
                }
                $subscriptions['data'][$key]['subscription_type'] = ($value['subscription_type'] == 1) ? 'Basic' : 'Premium';
                $status = ($value['expiry_date'] > date('Y-m-d')) ? 'active' : 'expired';
                $subscriptions['data'][$key]['status'] = user_status($status);
            }
        }

        echo json_encode($subscriptions);
    }

    public function update_user_status_after_expiry()
    {
        $today = date('Y-m-d');
        $expired_subscriptions = $this->common_model->selectWhere('subscription_history', ['expiry_date <' => $today], '*', null, 'expiry_date', 'ASC');

        if (!empty($expired_subscriptions)) {
            foreach ($expired_subscriptions as $subscription) {
                $company_id = $subscription['company_id'];

                // Check if the company has any active subscriptions with expiry_date greater than today
                $valid_subscriptions = $this->common_model->selectWhere('subscription_history', ['company_id' => $company_id, 'expiry_date >' => $today], '*', 1);
                // pr($valid_subscriptions);
                // exit;

                if ($valid_subscriptions) {
                    $valid_subscription = $valid_subscriptions[0];
                    $this->session->set_userdata('subscription_id', $valid_subscription['subscription_id']);
                    $this->session->set_userdata('subscription_expiry', $valid_subscription['expiry_date']);
                    $this->session->set_userdata('subscription_type', $valid_subscription['subscription_type']);
                    // There is a valid subscription, compare the user count
                    $allowed_user_count = $valid_subscription['users_count'];

                    // Get the total active employees for the company, excluding role_id 5
                    $active_employees = $this->common_model->selectWhere('employees', ['company_id' => $company_id, 'status' => 'active', 'role_id !=' => 5], 'employee_id');

                    $active_employee_count = count($active_employees);

                    // If active employee count exceeds the allowed count, deactivate excess employees
                    if ($active_employee_count > $allowed_user_count) {
                        // Calculate the number of employees to deactivate
                        $employees_to_deactivate = $active_employee_count - $allowed_user_count;

                        // Get the excess employees (you can decide the order, e.g., last added, first added, etc.), excluding role_id 5
                        $excess_employees = $this->common_model->selectWhere('employees', ['company_id' => $company_id, 'status' => 'active', 'role_id !=' => 5], 'employee_id', $employees_to_deactivate);

                        foreach ($excess_employees as $employee) {
                            // Update excess employee status to inactive
                            // $this->common_model->update('employees', ['status' => 'inactive'], ['employee_id' => $employee['employee_id']]);
                            $this->common_model->update(['status' => 'inactive'], ['employee_id' => $employee['employee_id'], 'status' => 'active'], 'employees');
                        }
                    }
                } else {
                    $this->common_model->update(
                        ['status' => 'inactive'],
                        ['company_id' => $company_id, 'status' => 'active'],
                        'employees'
                    );
                    $this->send_expired_subscription_email($company_id);
                    $this->session->unset_userdata('subscription_id');
                    $this->session->unset_userdata('subscription_expiry');
                    $this->session->unset_userdata('subscription_type');
                }
            }
        } else {
            log_message('info', 'No expired subscriptions found.');
        }
    }
    private function send_expired_subscription_email($company_id)
    {
        // Get company details including the subscription expiry information
        $company = $this->common_model->selectWhere('company', ['company_id' => $company_id], 'email, name');

        if (!empty($company)) {
            $to = $company[0]['email'];
            $company_name = $company[0]['name'];
            $subscription_expiry = date('F j, Y', strtotime('-1 day'));
            // Construct the email content
            $subject = 'Your Subscription Has Expired';
            $message = "Dear $company_name,<br><br>";
            $message .= "We wanted to inform you that your subscription has expired.<br>";
            $message .= "Your subscription expired on: <strong>" . $subscription_expiry . "</strong><br>";
            $message .= "Please renew your subscription to restore full access to our services.<br><br>";
            $message .= "Thank you for your continued support.<br>";
            $message .= "Best regards,<br> TaskLyt";

            // Send the email using _sendMail function
            _sendMail($subject, $message, $to, $company_name);
        }
    }
}
