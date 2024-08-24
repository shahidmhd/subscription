<div id="left-sidebar" class="sidebar">
    <div class="sidebar-scroll">
        <div class="user-account">
            <img src="<?= getUserImage($user['profile_photo']) ?>" class="user-photo" alt="User Profile Picture">
            <div class="dropdown">
                <span>Welcome,</span>
                <a href="javascript:void(0);" class="dropdown-toggle user-name" data-toggle="dropdown"><strong><?= $user['name'] ?></strong></a>
                <ul class="dropdown-menu dropdown-menu-right account animated flipInY">
                    <!-- <li><a href="<//?= base_url() . 'profile' ?>"><i class="icon-user"></i>My Profile</a></li>
                    <li class="divider"></li> -->
                    <li><a href="<?= base_url() . 'logout' ?>"><i class="icon-power"></i>Logout</a></li>
                </ul>
            </div>
        </div>


        <nav class="sidebar-nav">
            <ul class="main-menu metismenu">
                <?php if (check_company_active_subscription()) { ?>
                    <li <?= ($menu == 'dashboard') ? 'class="active"' : '' ?>><a href="<?= base_url() . 'dashboard' ?>"><i class="icon-grid"></i><span>Dashboard</span></a></li>
                <?php } ?>
                <?php if (check_permission()) { ?>
                    <?php if ($user['role_id'] == 5) { ?>
                        <li <?= ($menu == 'company') ? 'class="active"' : '' ?>>
                            <a href="javascript:;" class="has-arrow"><i class="fa fa-suitcase"></i><span>Company</span></a>
                            <ul>
                                <!-- <//?php if (check_permission(1)) { ?>
                                <li <//?= ($page_name == 'add_company') ? 'class="active"' : '' ?>><a href="<//?= base_url() . 'add-company' ?>">Add</a></li>
                            <//?php } -->
                                <?php if (check_permission(7)) { ?>

                                    <li <?= ($page_name == 'view_companies') ? 'class="active"' : '' ?>><a href="<?= base_url() . 'view-companies' ?>">View</a></li>
                                <?php } ?>
                            </ul>
                        </li>
                    <?php } ?>
                <?php } ?>

                <?php if (check_permission(1) || check_permission(2) || check_permission(3) || check_permission(4)) { ?>
                    <?php if (check_company_active_subscription()) { ?>
                        <li <?= ($menu == 'employee') ? 'class="active"' : '' ?>>
                            <a href="javascript:;" class="has-arrow"><i class="icon-users"></i><span>Employees</span></a>
                            <ul>
                                <?php if (check_permission(1)) { ?>
                                    <li <?= ($page_name == 'add_employee') ? 'class="active"' : '' ?>><a href="<?= base_url() . 'add-employee' ?>">Add</a></li>
                                <?php }
                                if (check_permission(2) || check_permission(3) || check_permission(4)) {
                                ?>
                                    <li <?= ($page_name == 'view_employees') ? 'class="active"' : '' ?>><a href="<?= base_url() . 'view-employees' ?>">View</a></li>
                                <?php } ?>
                            </ul>
                        </li>
                    <?php } ?>
                <?php } ?>

                
                    <li <?= ($menu == 'employee') ? 'class="active"' : '' ?>>
                        <a href="javascript:;" class="has-arrow"><i class="fa fa-file-o" aria-hidden="true"></i><span>Document Category</span></a>
                        <ul>
                            <li <?= ($page_name == 'add-document_category') ? 'class="active"' : '' ?>><a href="<?= base_url() . 'add-document_category' ?>">Add</a></li>
                            <li <?= ($page_name == 'view_document_category') ? 'class="active"' : '' ?>><a href="<?= base_url() . 'view_document_category' ?>">View</a></li>

                        </ul>
                    </li>
             



                <?php
                if (check_permission(17) || check_permission(18) || check_permission(19) || check_permission(20) || check_permission(21) || check_permission(22) || check_permission(23) || check_permission(24)) { ?>
                    <?php if (check_company_active_subscription()) { ?>
                        <li <?= ($menu == 'work') ? 'class="active"' : '' ?>>
                            <a href="javascript:;" class="has-arrow"><i class="icon-list"></i><span>Tasks</span></a>
                            <ul>

                                <!-- <//?php if (check_permission(17)) { ?>
                                    <li <//?= ($page_name == 'add_work') ? 'class="active"' : '' ?>><a href="<//?= base_url() . 'add-work' ?>">Add</a></li>
                                <//?php } ?> -->
                                <?php if (check_permission(18) || check_permission(19) || check_permission(20) || check_permission(21) || check_permission(22)) { ?>
                                    <li <?= ($page_name == 'view_works') ? 'class="active"' : '' ?>><a href="<?= base_url() . 'view-works' ?>">View</a></li>
                                <?php } ?>

                            </ul>
                        </li>
                    <?php } ?>
                <?php } ?>

                <?php if (check_permission(1) || check_permission(2) || check_permission(3) || check_permission(4)) { ?>
                    <?php if ($user['role_id'] != 5) {
                    ?>
                        <li <?= ($menu == 'subscriptions') ? 'class="active"' : '' ?>>
                            <a href="javascript:;" class="has-arrow"><i class="fa fa-thumbs-up"></i><span>Subscriptions</span></a>
                            <ul>
                                <!-- <? //php if (check_permission(1)) { 
                                        ?>
                                    <li <//?= ($page_name == 'add_subscription') ? 'class="active"' : '' ?>><a href="<//?= base_url() . 'add-subscription' ?>">Add</a></li>
                                <//?php }
                                if (check_permission(2) || check_permission(3) || check_permission(4)) {
                                ?>
                                    <li <//?= ($page_name == 'view_subscriptions') ? 'class="active"' : '' ?>><a href="<//?= base_url() . 'view-subscriptions' ?>">View</a></li>
                                <//?php } ?> -->
                                <li <?= ($page_name == 'subscriptions') ? 'class="active"' : '' ?>><a href="<?= base_url() . 'subscriptions' ?>">Plans</a></li>
                                <li <?= ($page_name == 'view_subscriptionhistory') ? 'class="active"' : '' ?>><a href="<?= base_url() . 'view_subscriptionhistory' ?>">History</a></li>
                            </ul>
                        </li>
                    <?php } ?>
                <?php } ?>


                <?php if (check_permission(17)) { ?>
                    <?php if ($user['role_id'] != 6) { ?>
                        <li>
                            <a href="javascript:;" onclick="showAjaxModal('<?= base_url('user/popup/create_reminder') ?>','Create Reminder')"><i class="icon-calendar"></i><span>Create Reminder</span></a>
                        </li>
                    <?php } ?>
                <?php } ?>

                <!-- <//?php if (check_permission(33)) { ?>
                    <li <//?= ($menu == 'attendance') ? 'class="active"' : '' ?>>
                        <a href="<//?= base_url() . 'attendance' ?>"><i class="icon-clock"></i><span>Attendance</span></a>
                    </li>
                <//?php } ?> -->
                <?php if ($user['role_id'] == 5) { ?>
                    <li <?= ($menu == 'permissions') ? 'class="active"' : '' ?>>
                        <a href="<?= base_url() . 'permissions' ?>"><i class="icon-lock"></i><span>Permissions</span></a>
                    </li>
                <?php } ?>
                <?php if ($user['role_id'] != 5) { ?>
                    <li <?= ($menu == 'profile') ? 'class="active"' : '' ?>>
                        <a href="<?= base_url() . 'profile' ?>"><i class="icon-user"></i><span>Profile</span></a>
                    </li>
                <?php } ?>
                <li>
                    <a href="<?= base_url() . 'logout' ?>"><i class="icon-logout"></i><span>Logout</span></a>
                </li>
                <!-- <li>
                    <a href="<//?= base_url('subscription/update_user_status_after_expiry') ?>"><i class="icon-logout"></i><span>Update</span></a>
                </li> -->

            </ul>
        </nav>

    </div>
</div>