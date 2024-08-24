<style>
    .pricing-content {
        position: relative;
    }

    .pricing_design {
        position: relative;
        margin: 0px 15px;
    }

    .pricing_design .single-pricing {
        background: #007bff;
        padding: 60px 40px;
        border-radius: 30px;
        box-shadow: 0 10px 40px -10px rgba(0, 64, 128, .2);
        position: relative;
        z-index: 1;
    }

    .pricing_design .single-pricing:before {
        content: "";
        background-color: #fff;
        width: 100%;
        height: 100%;
        border-radius: 18px 18px 190px 18px;
        border: 1px solid #eee;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: -1;
    }

    .price-head {}

    .price-head h2 {
        margin-bottom: 20px;
        font-size: 26px;
        font-weight: 600;
    }

    .price-head h1 {
        font-weight: 600;
        margin-top: 30px;
        margin-bottom: 5px;
    }

    .price-head span {}

    .single-pricing ul {
        list-style: none;
        margin-top: 30px;
    }

    .single-pricing ul li {
        line-height: 36px;
    }

    .single-pricing ul li i {
        background: #007bff;
        color: #fff;
        width: 20px;
        height: 20px;
        border-radius: 30px;
        font-size: 11px;
        text-align: center;
        line-height: 20px;
        margin-right: 6px;
    }

    .pricing-price {}

    .price_btn {
        background: #007bff;
        padding: 10px 30px;
        color: #fff;
        display: inline-block;
        margin-top: 20px;
        border-radius: 2px;
        -webkit-transition: 0.3s;
        transition: 0.3s;
    }

    .price_btn:hover {
        background: #0aa1d6;
    }

    a {
        text-decoration: none;
    }

    .section-title {
        margin-bottom: 60px;
    }

    .text-center {
        text-align: center !important;
    }

    .section-title h2 {
        font-size: 45px;
        font-weight: 600;
        margin-top: 0;
        position: relative;
        text-transform: capitalize;
    }

    /*  */
    .btn-group .btn {
        border-top-right-radius: 50px !important;
        border-bottom-right-radius: 50px !important;
        border-top-left-radius: 50px !important;
        border-bottom-left-radius: 50px !important;
    }



    .btn-group .btn.custom-radio {
        padding: 15px 30px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 50px;
        transition: background-color 0.3s ease, color 0.3s ease;
        padding-bottom: 10px;
    }

    .btn-group .btn.custom-radio input[type="radio"] {
        display: none;
    }

    .btn-group .btn.custom-radio input[type="radio"]:checked+.btn {
        background-color: #007bff !important;
        color: white;
    }

    .btn-group .btn.custom-radio:hover {
        background-color: #0056b3;
        color: white;
    }

    .user-input-container {
        display: flex;
        align-items: center;
        margin-top: 10px;
        justify-content: center
    }

    .user-input-container button {
        width: 40px;
        height: 40px;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .user-input-container input[type="number"] {
        width: 60px;
        text-align: center;
        font-size: 18px;
        margin: 0 10px;
    }

    /* Custom styles for the nav-tabs */
    .nav-tabs {
        border-bottom: none;
    }

    .nav-tabs .nav-item {
        margin-bottom: 0;
    }

    .nav-tabs .nav-link {
        background-color: white;
        /* Set background color to white (or any other color) */
        border: 2px solid #007bff;
        /* Add a solid border */
        font-weight: 600;
        font-size: 18px;
        padding: 15px 30px;
        transition: all 0.3s ease;
        border-radius: 50px;
        /* Rounded corners for tabs */
    }

    .nav-tabs .nav-link.active {
        background-color: #007bff;
        color: white;
        box-shadow: 0 10px 40px -10px rgba(0, 64, 128, .2);
    }

    .nav-tabs .nav-link:hover {
        background-color: #0aa1d6;
        color: white;
    }

    /* premium */


    .premium_plan {
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }

    .premium_plan:hover {
        transform: translateY(-10px);
        /* Jump effect on hover */
        box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
    }

    .premium_plan:hover .price_btn {
        transform: translateY(-10px);
        /* Button jumps along with the premium plan */
        transition: transform 0.3s ease-in-out;
        /* Smooth transition for the button */
    }

    /* Jumping effect */
    @keyframes jump {
        0% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(-10px);
        }

        100% {
            transform: translateY(0);
        }
    }
</style>

<section id="pricing" class="pricing-content section-padding">
    <div class="container">
        <div class="text-center">
            <h2>Pricing Plans</h2>
        </div>
        <div class="text-center">
            <div class="form-group text-center">
                <label for="currencySelect"><b>Select Currency:</b></label>
                <select id="currencySelect" name="currencySelect" class="form-control d-inline-block w-auto border-0">

                    <option value="USD" selected>USD</option>
                    <option value="INR">INR</option>
                </select>
            </div>
            <!-- Tabs for Basic, Premium, and Free -->
            <ul class="nav nav-tabs justify-content-center pb-5 btn-group" id="pricingTabs" role="tablist">
                <li class="nav-item pt-2">
                    <a class="nav-link btn custom-radio mx-2 active" id="basic-tab" data-toggle="tab" href="#basic" role="tab" aria-controls="basic" aria-selected="true">Basic</a>
                </li>
                <li class="nav-item pt-2">
                    <a class="nav-link btn custom-radio mx-2" id="premium-tab" data-toggle="tab" href="#premium" role="tab" aria-controls="premium" aria-selected="false">Premium</a>
                </li>
                <li class="nav-item pt-2">
                    <a class="nav-link btn custom-radio mx-2" id="free-tab" data-toggle="tab" href="#free" role="tab" aria-controls="free" aria-selected="false">Free</a>
                </li>
            </ul>
        </div>

        <!-- Tab Content -->
        <div class="tab-content" id="pricingTabContent">
            <!-- Basic Tab -->
            <div class="tab-pane fade show active" id="basic" role="tabpanel" aria-labelledby="basic-tab">
                <div class="row justify-content-center text-center">
                    <?php if (!empty($subscriptions)): ?>
                        <?php foreach ($subscriptions as $index => $plan): ?>
                            <?php if (strtolower($plan['name']) != 'free'): ?>
                                <div class="col-lg-4 col-sm-12 col-xs-12 pb-3 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.<?php echo $index + 1; ?>s">
                                    <div class="pricing_design">
                                        <div class="single-pricing">
                                            <div class="price-head">
                                                <h2><?php echo $plan['name']; ?></h2>
                                                <h1 class="price" id="price-<?php echo $index; ?>" data-basic-price="<?php echo $plan['basic_price_per_user']; ?>" data-premium-price="<?php echo $plan['premium_price_per_user']; ?>">$<?php echo $plan['basic_price_per_user']; ?></h1>
                                                <b class="pt-3">Number of Users</b>
                                            </div>
                                            <ul class="p-0">
                                                <li>
                                                    <div class="user-input-container">
                                                        <button type="button" class="btn btn-outline-secondary" onclick="decrementUserCount(<?php echo $index; ?>)">&#8722;</button>
                                                        <input type="number" id="user-input-<?php echo $index; ?>" value="1" min="1" max="100" readonly>
                                                        <button type="button" class="btn btn-outline-secondary" onclick="incrementUserCount(<?php echo $index; ?>)">&#43;</button>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div class="pricing-price"></div>
                                            <a href="#" class="price_btn" onclick="payNow(<?php echo $index; ?>)">Purchase</a>
                                        </div>
                                    </div>
                                </div><!--- END COL -->
                            <?php endif; ?>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <p>No subscription plans found.</p>
                    <?php endif; ?>
                </div><!--- END ROW -->
            </div>

            <!-- Premium Tab -->
            <div class="tab-pane fade" id="premium" role="tabpanel" aria-labelledby="premium-tab">
                <div class="row justify-content-center text-center">
                    <?php if (!empty($subscriptions)): ?>
                        <?php foreach ($subscriptions as $index => $plan): ?>
                            <?php if (strtolower($plan['name']) != 'free'): ?>
                                <div class="col-lg-4 col-sm-12 col-xs-12 pb-3 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.<?php echo $index + 1; ?>s">
                                    <div class="pricing_design">
                                        <div class="single-pricing premium_plan">
                                            <div class="price-head">
                                                <h2><?php echo $plan['name']; ?></h2>
                                                <h1 class="price" id="price-<?php echo $index; ?>" data-basic-price="<?php echo $plan['basic_price_per_user']; ?>" data-premium-price="<?php echo $plan['premium_price_per_user']; ?>">$<?php echo $plan['premium_price_per_user']; ?></h1>
                                                <b>Number of Users</b>
                                            </div>
                                            <ul class="p-0">
                                                <li>
                                                    <div class="user-input-container">
                                                        <button type="button" class="btn btn-outline-secondary" onclick="decrementUserCount(<?php echo $index; ?>)">&#8722;</button>
                                                        <input type="number" id="user-input-<?php echo $index; ?>" value="1" min="1" max="100" readonly>
                                                        <button type="button" class="btn btn-outline-secondary" onclick="incrementUserCount(<?php echo $index; ?>)">&#43;</button>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div class="pricing-price"></div>
                                            <a href="#" class="price_btn" onclick="payNow(<?php echo $index; ?>)">Purchase</a>
                                        </div>
                                    </div>
                                </div><!--- END COL -->
                            <?php endif; ?>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <p>No subscription plans found.</p>
                    <?php endif; ?>
                </div><!--- END ROW -->
            </div>

            <!-- Free Tab -->
            <div class="tab-pane fade" id="free" role="tabpanel" aria-labelledby="free-tab">
                <div class="row justify-content-center text-center">
                    <?php if (!empty($subscriptions)): ?>
                        <?php foreach ($subscriptions as $index => $plan): ?>
                            <?php if (strtolower($plan['name']) === 'free'): ?>
                                <div class="col-lg-4 col-sm-12 col-xs-12 pb-3 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.<?php echo $index + 1; ?>s">
                                    <div class="pricing_design">
                                        <div class="single-pricing">
                                            <div class="price-head">
                                                <h2><?php echo $plan['name']; ?></h2>
                                                <h1 class="price" id="price-<?php echo $index; ?>">$0</h1>
                                                <b>Number of Users</b>
                                            </div>
                                            <ul class="p-0">
                                                <li>

                                                    <div class="user-input-container">

                                                        <button type="button" class="btn btn-outline-secondary" disabled>&#8722;</button>
                                                        <input type="number" id="user-input-<?php echo $index; ?>" value="5" min="1" max="100" readonly>
                                                        <button type="button" class="btn btn-outline-secondary" disabled>&#43;</button>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div class="pricing-price"></div>
                                            <a href="#" class="price_btn" onclick="payNow(<?php echo $index; ?>)">Activate</a>
                                        </div>
                                    </div>
                                </div>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <p>No subscription plans found.</p>
                    <?php endif; ?>
                </div>
            </div>
        </div>
</section>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
    var pricingData = <?php echo json_encode($subscriptions); ?>;

    function decrementUserCount(index) {
        const activeTab = document.querySelector('.tab-pane.active');
        const inputField = activeTab.querySelector('#user-input-' + index);
        let currentValue = parseInt(inputField.value);

        if (currentValue > 1 && inputField.getAttribute('min') != currentValue) {
            currentValue--;
            inputField.value = currentValue;
            updatePriceForUserCount(index);
        }
    }


    function incrementUserCount(index) {
        const activeTab = document.querySelector('.tab-pane.active');
        const inputField = activeTab.querySelector('#user-input-' + index);
        let currentValue = parseInt(inputField.value);
        const maxValue = parseInt(inputField.getAttribute('max'));

        if (currentValue < maxValue) {
            currentValue++;
            inputField.value = currentValue;
            updatePriceForUserCount(index);
        }
    }

    function updatePriceForUserCount(index) {
        const activeTab = document.querySelector('.tab-pane.active');
        const inputField = activeTab.querySelector('#user-input-' + index);
        let userCount = parseInt(inputField.value);

        let priceElement = activeTab.querySelector('#price-' + index);
        let isPremiumSelected = document.getElementById('premium-tab').classList.contains('active');

        let pricePerUser = isPremiumSelected ? priceElement.getAttribute('data-premium-price') : priceElement.getAttribute('data-basic-price');
        let totalPrice = pricePerUser * userCount * exchangeRate;
        const currencySymbol = $('#currencySelect').val() === 'INR' ? '₹' : '$';
        priceElement.innerHTML = currencySymbol + totalPrice.toFixed(2);
    }



    function payNow(index) {
        if (pricingData && pricingData[index]) {
            const activeTab = document.querySelector('.tab-pane.active');
            const planName = pricingData[index].name;
            const userCount = parseInt(activeTab.querySelector('#user-input-' + index).value);
            const isPremiumSelected = document.getElementById('premium-tab').classList.contains('active');
            const pricePerUser = isPremiumSelected ? pricingData[index].premium_price_per_user : pricingData[index].basic_price_per_user;
            let totalPrice = userCount * pricePerUser;
            const companyId = '<?php echo $this->session->userdata("company_id"); ?>';
            const subscriptionId = pricingData[index].subscription_id;
            const selectedCurrency = document.getElementById('currencySelect').value;

            if (selectedCurrency == 'INR') {
                fetchExchangeRate('INR', function(exchangeRate) {
                    totalPrice = totalPrice * exchangeRate;
                    processPayment(planName, userCount, totalPrice, 'INR', companyId, subscriptionId, isPremiumSelected);
                });
            } else {
                processPayment(planName, userCount, totalPrice, 'USD', companyId, subscriptionId, isPremiumSelected);
            }
        } else {
            console.error('Invalid pricingData or index out of bounds.');
        }
    }

    function processPayment(planName, userCount, totalPrice, currency, companyId, subscriptionId, isPremiumSelected) {
        if (planName.toLowerCase() === 'free') {
            $.ajax({
                url: "<?php echo base_url('subscription/add_subscription_status'); ?>",
                type: "POST",
                data: {
                    company_id: companyId,
                    subscription_id: subscriptionId,
                    razorpay_payment_id: '',
                    user_count: 5,
                    plan_name: planName,
                    total_price: 0,
                    plan_type: 'Premium',
                    is_trial: 2,
                    currency: currency
                },
                dataType: "json",
                success: function(storeResponse) {
                    if (storeResponse.success) {
                        toaster('success', storeResponse.message)
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000)
                    } else {
                        toaster('error', storeResponse.message)
                    }
                },
                error: function() {
                    alert('Error occurred while activating trial subscription.');
                }
            });
        } else {
            initiatePayment(companyId, subscriptionId, planName, totalPrice, userCount, isPremiumSelected, currency);
        }
    }

    function initiatePayment(companyId, subscriptionId, planName, totalPrice, userCount, isPremiumSelected, currency) {
        const companyName = '<?php echo $this->session->userdata("name"); ?>';
        $.ajax({
            url: "<?php echo base_url('subscription/razorpay_payment'); ?>",
            type: "POST",
            data: {
                plan_name: planName,
                user_count: userCount,
                total_price: totalPrice,
                currency: currency

            },
            dataType: "json",
            success: function(response) {
                if (response.order_id) {
                    var options = {
                        key: "<?php echo $this->config->item('razorpay_key_id'); ?>",
                        // key: 'rzp_test_b0BbGOGT5jAizp',

                        amount: response.amount,
                        currency: currency,
                        name: companyName ? companyName : "unknown company",
                        description: planName,
                        order_id: response.order_id,
                        handler: function(paymentResponse) {
                            $.ajax({
                                url: "<?php echo base_url('subscription/verify_payment'); ?>",
                                type: "POST",
                                data: {
                                    razorpay_order_id: paymentResponse.razorpay_order_id,
                                    razorpay_payment_id: paymentResponse.razorpay_payment_id,
                                    razorpay_signature: paymentResponse.razorpay_signature
                                },
                                dataType: "json",
                                success: function(verificationResponse) {
                                    if (verificationResponse.success) {
                                        storeSubscription(companyId, subscriptionId, planName, totalPrice, userCount, paymentResponse.razorpay_payment_id, isPremiumSelected, currency);
                                    } else {
                                        alert('Payment verification failed: ' + verificationResponse.message);
                                    }
                                }
                            });
                        },
                        prefill: {
                            name: "Customer Name",
                            email: "customer@example.com",
                            contact: "9999999999"
                        },
                        theme: {
                            color: "#3399cc"
                        }
                    };
                    var rzp = new Razorpay(options);
                    rzp.open();
                } else {
                    alert('Error creating order: ' + response.error);
                }
            }
        });
    }

    function storeSubscription(companyId, subscriptionId, planName, totalPrice, userCount, paymentId, isPremiumSelected, currency) {
        $.ajax({
            url: "<?php echo base_url('subscription/add_subscription_status'); ?>",
            type: "POST",
            data: {
                company_id: companyId,
                subscription_id: subscriptionId,
                razorpay_payment_id: paymentId,
                user_count: userCount,
                plan_name: planName,
                total_price: totalPrice,
                plan_type: isPremiumSelected ? 'Premium' : 'Basic',
                currency: currency
            },
            dataType: "json",
            success: function(storeResponse) {
                if (storeResponse.success) {
                    toaster('success', storeResponse.message);
                    // alert('Payment and subscription stored successfully!');
                } else {
                    toaster('error', storeResponse.message);
                    // alert('Failed to store subscription: ' + storeResponse.message);
                }
            }
        });
    }

    let exchangeRate = 1;

    $('#currencySelect').on('change', function() {
        const selectedCurrency = $(this).val();
        fetchExchangeRate(selectedCurrency, updatePrices);
    });

    function fetchExchangeRate(currency, callback) {
        $.ajax({
            url: 'https://api.exchangerate-api.com/v4/latest/USD',
            method: 'GET',
            success: function(data) {
                if (currency === 'INR') {
                    exchangeRate = data.rates.INR;
                } else {
                    exchangeRate = 1;
                }
                callback(exchangeRate);
            },
            error: function(error) {
                console.error('Error fetching exchange rates:', error);
            }
        });
    }
    $('#pricingTabs a').on('click', function(e) {
        e.preventDefault();
        $(this).tab('show');
        updatePrices();
    });


    function updatePrices() {
        const selectedCurrency = $('#currencySelect').val();
        const currencySymbol = selectedCurrency === 'INR' ? '₹' : '$';

        $('.price').each(function() {
            const basicPrice = $(this).data('basic-price') || 0;
            const premiumPrice = $(this).data('premium-price') || 0;
            const isPremiumSelected = $('#premium-tab').hasClass('active');
            const userCount = parseInt($(this).closest('.single-pricing').find('.user-input-container input').val());
            let convertedPrice = (isPremiumSelected ? premiumPrice : basicPrice) * exchangeRate * userCount;
            $(this).html(`${currencySymbol}${convertedPrice.toFixed(2)}`);
        });
    }
</script>