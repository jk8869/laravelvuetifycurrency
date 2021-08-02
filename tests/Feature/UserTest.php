<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_register()
    {
        $user = [
            'name' => 'Joe',
            'email' => 'testemail@test.com',
            'password' => 'passwordtest',            
          ];
      
          $response = $this->post('api/register', $user);    

          $this->assertDatabaseHas('users', [
            'name' => 'Joe',
            'email' => 'testemail@test.com'
        ]);
    }

    public function test_login()
    {        
        $this->test_register();
        $response = $this->call('POST', '/api/login', [
            'email' => 'testemail@test.com',
            'password' => 'passwordtest',            
        ]);
        $this->assertEquals(200, $response->getStatusCode());        
    }
}
