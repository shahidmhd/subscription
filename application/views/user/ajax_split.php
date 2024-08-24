<hr/>
<div class="row clearfix" id="row<?=$count?>">
                                
                                    <div class="col-md-12">
                                      <div class="form-group">
                                        <label>Title<sup>*</sup></label>
                                        <input type="text" class="form-control" name="title[<?=$count?>]" id="ttl<?=$count?>">
                                      </div>
                                    </div>
                                    <div class="col-md-12">
                                      <div class="form-group">
                                        <label>Description<sup>*</sup></label>
                                        <textarea class="form-control" name="description[<?=$count?>]" id="des<?=$count?>" rows="4" cols="30"></textarea>
                                      </div>
                                    </div>
                                  
		
		
                                     <div class="col-md-6">
                                      <div class="form-group">
                                        <label>Assigned To<sup>*</sup></label>
                                        <select class="form-control show-tick" name="assigned_to[<?=$count?>]" id="ass<?=$count?>">
                                            <option value="">Select Employee</option>
                                            <?php foreach($employees as $row) { ?>
                                            <option value="<?= $row['employee_id']?>"><?= $row['name']?></option>
                                            <?php } ?>
                                        </select>
                                      </div>
                                    </div>
		    <div class="col-md-6">
                                      <div class="form-group">
                                        <label>Start Date<sup>*</sup></label>
                                        <input type="text" data-provide="datepicker" data-date-format="dd/mm/yyyy" data-date-autoclose="true" name="work_date[<?=$count?>]" id="wdt<?=$count?>" class="form-control" onkeydown="return false;">
                                      </div>
                                    </div>
		    <div class="col-md-6">
                                      <div class="form-group">
                                        <label>Expected Finish Date</label>
                                        <input type="text" data-provide="datepicker" data-date-format="dd/mm/yyyy" data-date-autoclose="true" name="last_date[<?=$count?>]" id="ldt<?=$count?>" class="form-control" onkeydown="return false;">
                                      </div>
                                    </div>
		   
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Checked By</label>
                                        <input type="text" class="form-control" name="checked_by">
                                    </div>
                                </div>
		    <div class="col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <label>Remarks</label>
                                        <textarea class="form-control" name="remarks" rows="4" cols="30"></textarea>
                                    </div>
                                </div>
                            </div>