<?php namespace z5internet\ReactUserFramework\App\Http\Controllers;

use z5internet\ReactUserFramework\App\Http\Controllers\Controller;

use z5internet\ReactUserFramework\App\Http\Controllers\User\UserController;

use Mail;

use z5internet\ReactUserFramework\App\ChangeEmail;

use z5internet\ReactUserFramework\App\Joined;

use z5internet\ReactUserFramework\App\PasswordResets;

use z5internet\ReactUserFramework\App\Http\Controllers\Image\ImageController;

use z5internet\ReactUserFramework\App\Http\Controllers\Teams\TeamsController;

use z5internet\ReactUserFramework\App\Http\Controllers\StartController;

use Carbon\Carbon;

class SettingsController extends Controller
{

	public function postUploadprofileimage($imageData,$crop) {

		if ($imageData) {

			$filename = (new ImageController)->putBase64Image($imageData,$crop,'p');

		}
		else
		{

			$filename = (new ImageController)->cropImage($crop,'p');

		}

		UserController::updateUser(['image' => json_encode($filename)],app('auth')->id());

		return ['data'=>['image'=>UserController::user(app('auth')->id())->image]];

	}

	public function saveSettings($settings, $uid) {

		$user = UserController::getUserFromCacheDB($uid)['user'];

		$keys = ['first_name','last_name'];

		$error = '';

		foreach ($keys as $tk) {

			$val = array_get($settings,$tk);

			if ($val) {

				$user->$tk = $val;

			}

		}

		$email = array_get($settings,'email');

		if ($email) {

			if ($email <> $user['email']) {

				$check = UserController::getUserByEmail($email);

				if ($check) {

					return ['errors' => [

						[

							'message' => 'Your email address is already being used and cannot be used on this account.',

						],

					]];

				}

				$code	=	md5($email.microtime());

				$db = new ChangeEmail;

				$db->uid = $uid;
				$db->code = $code;
				$db->email = $email;
				$db->created_at = new Carbon();

				$db->save();

				$id = $db->id;

				$data=array(

					"first_name"	=>	$user['first_name'],
					"email"			=>	$email,
					"link"			=>	config('app.url')."/settings/changeEmail?id=".$id."&code=".$code."&email=".urlencode($email),

				);

				app('mailer')->send('vendor.ruf.email.registeredEmail', $data, function($message) Use ($data) {

					$message->to($data["email"], $data['first_name'])->subject('Verify your '.config('app.name').' email address.');

				});

			}

		}

		if (array_get($settings,'emailChange')) {

			$id = array_get($settings,'id');
			$code = array_get($settings,'code');
			$email = array_get($settings,'email');

			$ce = ChangeEmail::where('id',$id)->where('code',$code)->where('email',$email)->get(['id','email']);

			if (($user->email == $email) || (array_get($ce,0) && ($ce[0]->id == $id))) {

				if ($user->email <> $email) {

					PasswordResets::where('email', $user->email)->delete();

					ChangeEmail::where('email', $email)->delete();

					$user->email = $email;

					joined::where('email', $email)->delete();

				}

			}
			else
			{

				return ['data'=>[
					'ecError' => 1
					]
				];

			}

		}

		$current_password = array_get($settings,'current_password');

		if ($current_password) {

			if (!app('hash')->check($current_password,$user['password'])) {

				$error = 'Your current password is not correct';

			}
			else
			{

				if (array_get($settings,'new_password') <> array_get($settings,'confirm_password')) {

					$error = 'The 2 passwords you entered don\'t match';

				}
				else
				{

					$user->password = app('hash')->make(array_get($settings,'new_password'));

				}

			}

		}

		$user->save();

		UserController::forgetFromCache($uid);

		$ret = ["data" => (new StartController)->show($uid)];

		if ($error) {

			$ret['data']['pwError'] = $error;

		}

		return $ret;

	}

	public function addTeamMember($data) {

		$uid = app('auth')->id();

		$TeamsController = new TeamsController;

		if (!$TeamsController->isUserAnAdminOfTeam($uid, $data['team'])) {
			return [];
		}

		$checkIfEmailExists = UserController::getUserByEmail($data['email']);

		if ($checkIfEmailExists) {

			$checkId = $checkIfEmailExists->id;

			if ($TeamsController->isUserAMemberOfTeam($checkId, $data['team'])) {

				return ['error' => [
					'message' => 'The email address '.$data['email'].' is already a team member.',
				]];

			}

		}

		return UserController::join($data, 'vendor.ruf.email.addTeamMemberEmail');

	}

	public function deleteInvitedTeamMember($id) {

		return joined::where("id", "=", $id)->delete();

	}

}
