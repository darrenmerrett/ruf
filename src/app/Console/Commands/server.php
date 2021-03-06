<?php

namespace z5internet\ReactUserFramework\App\Console\Commands;

use Illuminate\Console\Command;

class server extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'react-user-framework:server {--production}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install react-user-framework resources, setup npm dependancies';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $NODE_ENV = $this->option('production')?'NODE_ENV=production':'';

        system("$NODE_ENV node ".__DIR__.'/../../../server.js');

        print "\n";

    }

}
