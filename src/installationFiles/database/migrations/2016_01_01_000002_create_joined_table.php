<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJoinedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('joined', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name',100);
            $table->string('email');
            $table->string('code');
            $table->text('ref')->nullable();
            $table->bigInteger('team')->unsigned()->nullable();
            $table->tinyInteger('teamRole')->unsigned()->nullable();
            $table->timestamp('created_at')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('joined');
    }
}
