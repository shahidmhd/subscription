<?php
if(!empty($company_details)) {
$work = $this->common_model->works_list_by_company($company_details['company_id']);
$invoice = $this->common_model->invoice_list_by_company($company_details['company_id']);
$directors = $this->common_model->directors_list_by_company($company_details['company_id']);
//pr($company_details);
?>
<div class="row clearfix profilepage_2 blog-page">
                <div class="col-lg-3 col-md-12">
                    <div class="card profile-header">
                        <div class="body">                            
                            <div>
                                <h6 class="m-b-1"><strong><?= $company_details['name']?></strong></h6>
                            </div>                                                        
                        </div>
                    </div>                    
                    
                    <div class="sticky-top profile-menu">
                                <div class="card">
                                                <div class="body">
                      <ul class="nav">
                                        <li>
                                            <a href="#general" class="scrollLink"><i class="fa fa-circle text-danger"></i>General Details</a>
                                        </li>
                                        <li>
                                            <a href="#directors" class="scrollLink"><i class="fa fa-circle text-danger"></i>Directors Details</a>
                                        </li>
                                        <li>
                                            <a href="#work" class="scrollLink"><i class="fa fa-circle text-info"></i>Work Details</a>
                                        </li>
                                        
                                        <li>
                                            <a href="#invoice" class="scrollLink"><i class="fa fa-circle text-info"></i>Invoice Details</a>
                                        </li> 
                                    </ul>
                                </div>
                                </div>
                    </div>
                </div>
<?php //pr($company_details);?>
                <div class="col-lg-9 col-md-12">
                    <div class="card" id="general">
                        <div class="body">
                           <div class="table-responsive">
                                <table class="table table-hover m-b-0">
                                    <tbody>
                                    
                                        <tr>
                                            <td>Name:</td>
                                            <td><?= $company_details['name']?></td>
                                        </tr>
                                        
                                       
                                        <tr>
                                            <td>Address:</td>
                                            <td><?= ($company_details['address'] != "")?nl2br($company_details['address']):"-"?></td>
                                        </tr>
                                        
                                       
                                        <tr>
                                            <td>Mobile:</td>
                                            <td><?= ($company_details['mobile'] != "")?$company_details['mobile']:"-"?></td>
                                        </tr>
                                        <tr>
                                            <td>Mobile 1:</td>
                                            <td><?= ($company_details['mobile1'] != "")?$company_details['mobile1']:"-"?></td>
                                        </tr>
                                        <tr>
                                            <td>Registration No.:</td>
                                            <td><?= ($company_details['reg_no'] != "")?$company_details['reg_no']:"-"?></td>
                                        </tr>
                                        
                                        <tr>
                                            <td>CIN No.:</td>
                                            <td><?= ($company_details['cin_no'] != "")?$company_details['cin_no']:"-"?></td>
                                        </tr>
                                    
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                    </div>
                    <div class="card" id="directors">
                                <div class="header">
                            <h2>Directors Details</h2>
                        </div>
                        <div class="body pt-0">
                                <?php if(!empty($directors)) {?>
                                <div class="table-responsive">
                                <table class="table table-hover m-b-0">
                                                 <thead>
                                                                <th>Name</th>
                                                                <th>Mobile</th>
                                                                <th>Mobile1</th>
                                                                <th>Address</th>
                                                                <th>PAN</th>
                                                                <th>Email</th>
                                                </thead>
                                    <tbody>
                                       <?php foreach($directors as $row) { ?>
                                        <tr>
                                            <td><?= ($row['name']!="")?$row['name']:"-";?></td>
                                            <td><?= ($row['mobile']!="")?$row['mobile']:"-"?></td>
                                            <td><?= ($row['mobile1']!="")?$row['mobile1']:"-"?></td>
                                            <td><?= ($row['address']!="")?nl2br($row['address']):"-"?></td>
                                            <td><?= ($row['pan_no']!="")?$row['pan_no']:"-"?></td>
                                            <td><?= ($row['email_id']!="")?$row['email_id']:"-"?></td>
                                        </tr>
                                        <?php } ?>
                                    </tbody>
                                </table>
                                </div>
                                <?php } else {?>
                                            -
                                            <?php } ?>
                        </div>
                    </div>
                    <div class="card" id="work">
                                <div class="header">
                            <h2>Work Details</h2>
                        </div>
                        <div class="body pt-0">
                                <?php if(!empty($work)) {?>
                                <div class="table-responsive">
                                <table class="table table-hover m-b-0">
                                                 <thead>
                                                                <th>Title</th>
                                                                <th>Date</th>
                                                                <th>Status</th>
                                                </thead>
                                    <tbody>
                                       <?php foreach($work as $row) { ?>
                                        <tr>
                                            <td><?= ($row['title']!="")?((strlen($row['title'])>20)?substr($row['title'],0,20).'...':$row['title']):"-";?></td>
                                            <td><?= ($row['work_date']!="")?get_date($row['work_date']):"-"?></td>
                                            <td><?= ($row['status']!="")?work_status($row['status']):"-"?></td>
                                        </tr>
                                        <?php } ?>
                                    </tbody>
                                </table>
                                </div>
                                <?php } else {?>
                                            -
                                            <?php } ?>
                        </div>
                    </div>
                
                
                <div class="card" id="invoice">
                                <div class="header">
                            <h2>Invoice Details</h2>
                        </div>
                        <div class="body pt-0">
                                <?php if(!empty($invoice)) {?>
                                <div class="table-responsive">
                                <table class="table table-hover m-b-0">
                                                 <thead>
                                                                <th>Invoice No.</th>
                                                                <th>Date</th>
                                                                <th>Work</th>
                                                                <th>Inv. Amount</th>
                                                                <th>Paid</th>
                                                                <th>Balance</th>
                                                                <th>Status</th>
                                                </thead>
                                    <tbody>
                                       <?php foreach($invoice as $row) { ?>
                                        <tr>
                                            <td><?= ($row['invoice_no']!="")?$row['invoice_no']:"-"?></td>
                                            <td><?= ($row['created_at']!="")?get_date($row['created_at']):"-"?></td>
                                            <td><?= ($row['work']!="")?((strlen($row['work'])>20)?substr($row['work'],0,20).'...':$row['work']):"-";?></td>
                                            <td><?= ($row['invoice_amount']!="")?$row['invoice_amount']:"-"?></td>
                                            <td><?= ($row['paid_amount']!="")?$row['paid_amount']:"-"?></td>
                                            <td><?= ($row['balance_amount']!="")?$row['balance_amount']:"-"?></td>
                                            <td><?= ($row['status']!="")?payment_status($row['status']):"-"?></td>
                                        </tr>
                                        <?php } ?>
                                    </tbody>
                                </table>
                                </div>
                                <?php } else {?>
                                            -
                                            <?php } ?>
                        </div>
                    </div>
                </div>               
            </div>
<?php } else {
$this->load->view('theme/user/notfound');
} ?>