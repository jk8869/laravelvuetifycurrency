# Laravel with Vuetifyjs for nomics.com

This is a simple application that uses laravel with vuetify to interact with [nomics](https://nomics.com/) API

## Installation

You can run this command to install required packages

```bash
npm install
```

make sure to setup database correctly, put the info into .env file and run the migrate command

```bash
php artisan migrate
```

Use the [Laravel Sail](https://laravel.com/docs/8.x/sail) to setup and run the application.

```bash
./vendor/bin/sail up
```

or you can run it on your local machine

```bash
php artisan serve
```

***You also need to set your api key in .env file***


## Usage

You can add new user by sending post request as follows( you need to use postman or any tools you want, but there is not form to register)

```python
api/register

name=name
email=email
password=password
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
