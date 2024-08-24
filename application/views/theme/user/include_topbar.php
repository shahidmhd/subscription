<nav class="navbar navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-btn">
                <button type="button" class="btn-toggle-offcanvas"><i class="lnr lnr-menu fa fa-bars"></i></button>
            </div>

            <div class="navbar-brand">
                <a href="<?= base_url().'dashboard' ?>"><img src="<?= base_url().$system_logo ?>" alt="<?= $system_title ?>" class="img-responsive logo"></a>                
            </div>
             <?php //pr($user);?>
            <div class="navbar-right">                
                <div id="navbar-menu">
                    <ul class="nav navbar-nav">
                        <li class="mr-3 hidden-xs">Logged in as: <strong><?=$user['name']?></strong></li>        
                       <!-- <//?php if(check_permission(27)) {?>
                        <li class="dropdown">
                            <a href="javascript:void(0);" onclick="reminderNotifications()" class="dropdown-toggle icon-menu notification" data-toggle="dropdown">
                                <i class="icon-calendar"></i>
                                <span class="badge reminder d-none">0</span>
                            </a>
                            <ul class="dropdown-menu notifications animated shake rmwrapper">                                
                            </ul>
                        </li>
                        <//?php } ?>
                        <li class="dropdown">
                            <a href="javascript:void(0);" onclick="generalNotifications()" class="dropdown-toggle icon-menu notification" data-toggle="dropdown">
                                <i class="icon-bell"></i>
                                <span class="badge other d-none">0</span>
                            </a>
                            <ul class="dropdown-menu notifications animated shake genwrapper">                               
                            </ul>
                        </li> -->
                        
                        <li><a href="<?= base_url().'logout'?>" class="icon-menu"><i class="icon-login"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>