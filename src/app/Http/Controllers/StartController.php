<?php namespace z5internet\ReactUserFramework\App\Http\Controllers;

use z5internet\ReactUserFramework\App\Http\Controllers\Controller;

use z5internet\ReactUserFramework\App\Http\Controllers\User\UserController;

use z5internet\ReactUserFramework\App\Http\Controllers\Admin\AdminController;

use z5internet\ReactUserFramework\App\Http\Controllers\Teams\TeamsController;

use App\Http\Controllers\GetStarted\GetStartedController;

use stdClass;

use z5internet\ReactUserFramework\App\Http\Controllers\uiNotificationsController;

class StartController extends Controller {

	public function __construct() {

		$this->teamsController = new TeamsController;

	}

	public function show($uid = null) {

		$user = new stdClass;

		$menu = [];

		if (!$uid && app('auth')->check()) {

			$uid = app('auth')->id();

		}

		$users = null;

		$uiNotifications = null;

		if ($uid) {

			$currentTeam = $this->teamsController->getCurrentTeamForThisUser();

			if (!$currentTeam) {

				$currentTeam = $this->teamsController->getDefaultTeamForUser();

			}

			$user = UserController::user($uid);

			if ((new AdminController)->isUserAnAdmin()) {
				array_push($menu,[
					'heading' => 'Admin',
					'items' => [
						[
							'url' => '/admin',
							'link' => 'Admin'
						]
					]
				]);
			}

			$user->finishedGetStarted = (new GetStartedController)->hasUserCompletedStartup();

			$user->email = UserController::getUser($uid)->email;

			$user->currentTeam = [

				'id' => $currentTeam,
				'role' => $this->teamsController->getRoleForUserInTeam($uid, $currentTeam),

			];

			$user->multiAccounts = $this->teamsController->getTeamsForUser();

			$user->menu = $menu;

			if ($adminServices = (new AdminController)->getAdminServicesForUser($uid)) {

				$user->admin = $adminServices;

			}

			$uin = (new uiNotificationsController)->showNotifications($uid, null);

			$uiNotifications = $uin['uiNotifications'];

			$users = $uin['users'];

		}

		$out = [

			'user' => $user,
			'website' => $this->getWebsiteInfo(),

		];

		if ($uiNotifications) {

			$out['uiNotifications'] = $uiNotifications;

		}

		if ($users) {

			$out['users'] = $users;

		}

		return $out;

	}

	public function getWebsiteInfo() {

		return [

			'name' => config('app.name'),
			'signups' => !config('react-user-framework.website.disallow_public_signups'),
			'multiAccounts' => config('react-user-framework.website.multiAccounts'),
			'stripe_key' => config('react-user-framework.pay.stripe.publishable_key'),
			'livePusher' => [
				'app_id' => config('broadcasting.connections.livePusher.app_id'),
			],

		];

	}

}
