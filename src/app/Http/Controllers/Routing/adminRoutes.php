<?php namespace z5internet\ReactUserFramework\App\Http\Controllers\Routing;

use z5internet\ReactUserFramework\App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use z5internet\ReactUserFramework\App\Http\Controllers\Pay\PayController;

use z5internet\ReactUserFramework\App\Http\Controllers\Admin\AdminController;

class adminRoutes extends Controller {

	public function __construct() {

		$this->adminController = new AdminController;

		$this->uid = app('auth')->user()->id;

	}

	public function hasAccess($service) {

		$this->adminController->doesUserHaveAccessToAdminService($this->uid, $service);

	}

	public function getProducts() {

		$this->hasAccess('products');

		return ['data' => [

			'products' => (new PayController)->getProducts(),

		]];

	}

	public function createProduct(Request $request) {

		$this->hasAccess('products');

		$newProduct = (new PayController)->createProduct($request->only([
			'product_id',
			'product_group',
			'description',
			'is_recurring',
			'amount',
			'currency',
			'term',
			'initial_payment_term',
			'initial_payment_amount',
			'initial_payment_quantity',
			'tax',
			'trial_period_card_required',
			'trial_period',
			'users_included',
			'amount_per_user',
			'auto_bill_for_extra_users',
		]));

		if (is_array($newProduct) && isset($newProduct['error'])) {

			return [
				'errors' => [
					[
						'message' => $newProduct['error'],
					],
				],
			];

		}

		return ['data' => [

			'products' => (new PayController)->getProducts(),

		]];

	}

	public function editProduct(Request $request) {

		$this->hasAccess('products');

		$product = $request->only([
			'product_id',
			'product_group',
			'description',
			'is_recurring',
			'amount',
			'currency',
			'term',
			'initial_payment_term',
			'initial_payment_amount',
			'initial_payment_quantity',
			'tax',
			'trial_period_card_required',
			'trial_period',
			'users_included',
			'amount_per_user',
			'auto_bill_for_extra_users',
		]);

		(new PayController)->editProduct($product['product_id'], $product);

		return ['data' => [

			'products' => (new PayController)->getProducts(),

		]];

	}

}
