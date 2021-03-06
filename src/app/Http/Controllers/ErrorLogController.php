<?php namespace z5internet\ReactUserFramework\App\Http\Controllers;

use z5internet\ReactUserFramework\App\Http\Controllers\Controller;

use z5internet\ReactUserFramework\App\ErrorLog;

use z5internet\ReactUserFramework\App\Events\ErrorLogged;

class ErrorLogController extends Controller {

	public function LogError($data) {

		$db = new ErrorLog;

		$db->url = $data['url'];
		$db->uid = $data['uid'];
		$db->stacktrace = $data['stacktrace'];
		$db->created_at = app('db')->raw('now()');
		$db->type = $data['type'];
		$db->server_vars = json_encode($_SERVER);

		$db->save();

		event(new ErrorLogged($db));

		return $db;

	}

}
