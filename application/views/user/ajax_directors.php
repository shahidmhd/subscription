<hr/>
<div class="row clearfix" id="row<?=$count?>">
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Company<sup>*</sup></label>
                                        <select class="form-control show-tick" name="company_id[<?=$count?>]" id="cmp<?=$count?>">
                                            <option value="">Select Company</option>
                                            <?php foreach($companies as $row) { ?>
                                            <option value="<?= $row['company_id']?>"><?= $row['name']?></option>
                                            <?php } ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Name<sup>*</sup></label>
                                        <input type="text" class="form-control" name="name[<?=$count?>]" id="nm<?=$count?>">
                                    </div>
                                </div>
                                
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Mobile</label>
                                        <input type="text" class="form-control number" name="mobile[<?=$count?>]">
                                    </div>
                                </div>
		<div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Mobile1</label>
                                        <input type="text" class="form-control number" name="mobile1[<?=$count?>]">
                                    </div>
                                </div>
		<div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>PAN/DIN</label>
                                        <input type="text" class="form-control" name="pan_no[<?=$count?>]">
                                    </div>
                                </div>
		<div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Email Id</label>
                                        <input type="email" class="form-control" name="email_id[<?=$count?>]">
                                    </div>
                                </div>
		<div class="col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <label>Address</label>
                                        <textarea class="form-control" name="address[<?=$count?>]" rows="4" cols="30"></textarea>
                                    </div>
                                </div>
                            </div>