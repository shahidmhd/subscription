<?php
defined('BASEPATH') or exit('No direct script access allowed');


$route['default_controller'] = 'common/signin';

$route['signin'] = 'common/signin';
$route['signup'] = 'common/signup';
$route['forgot'] = 'common/forgot';
$route['reset_password'] = 'common/resetpassword';
$route['verify-otp'] = 'common/otp';
$route['logout'] = 'common/logout';

$route['dashboard']      = 'user/dashboard';
$route['profile']        = 'common/profile';
$route['add-employee']   = 'user/add_employee';
$route['view-employees'] = 'user/view_employees';
$route['view-employees/(:any)'] = 'user/view_employees/$1';
$route['edit-employee/(:num)']   = 'user/edit_employee/$1';
$route['employee-details/(:num)']   = 'user/employee_details/$1';

$route['add-document_category']   = 'user/add_document_category';
$route['view_document_category'] = 'user/view_document_category';
$route['editCategory/(:num)']   = 'user/edit_document_category/$1';

$route['add-company']   = 'user/add_company';
$route['view-companies'] = 'user/view_companies';
$route['edit-company/(:num)']   = 'user/edit_company/$1';
$route['add-director'] = 'user/add_director';
$route['view-directors'] = 'user/view_directors';
$route['edit-director/(:num)']   = 'user/edit_director/$1';
$route['company-details/(:num)']   = 'user/company_details/$1';

$route['add-signature'] = 'user/add_signature';
$route['view-signatures'] = 'user/view_signatures';
$route['view-signatures/(:any)'] = 'user/view_signatures/$1';
$route['edit-signature/(:num)']   = 'user/edit_signature/$1';
$route['permissions'] = 'user/permissions';

$route['add-work'] = 'user/add_work';
$route['view-works'] = 'user/view_works';
$route['view-works/(:any)'] = 'user/view_works/$1';
$route['view-works/(:any)/(:any)'] = 'user/view_works/$1/$2';

$route['invoices'] = 'user/view_invoices';

$route['add-inout'] = 'user/add_inout';
$route['view-inout'] = 'user/view_inout';
$route['attendance'] = 'user/attendance';

$route['404_override'] = 'common/notfound';
$route['translate_uri_dashes'] = FALSE;

$route['add-subscription']   = 'user/add_subscription';
$route['subscriptions']   = 'subscription/subscriptions';
$route['view_subscriptionhistory'] = 'subscription/view_subscriptionhistory';
$route['view-subscriptions'] = 'user/view_subscriptions';
$route['edit-subscription/(:num)']   = 'user/edit_subscription/$1';
