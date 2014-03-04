# generator-vip

> [Yeoman](http://yeoman.io) generator template for the [vip](http://www.vip.com) project 

## Dependencies
`nodejs` `ruby` `compass` `yo` `grunt` `bower`
### 
  - [Nodejs](http://nodejs.org/)
  - [Ruby](http://rubyinstaller.org/)
  - Compass
    - `gem install compass`
  - Yo
    - `npm install -g yo`
  - Grunt
    - `npm install -g grunt-cli`
  - bower
    - `npm install -g bower`

## Init Yeoman Generators

Npm link generator-vip to local, **in generator-vip folder** run:

```
$ npm link
```

folder name must be `generator-vip`

## Use

### Init options
go to **new project folder** run:

```
$ yo vip
```

1. Select project init type  
> [?] select project init type:  
>> 1) pc  
>> 2) mobile

1. Enter the project name  
> [?] enter the project name: (vip-project)  

1. Enter author  
> [?] enter author: (http://www.vip.com)  
### Compass sass
`grunt sass`
### Watch compass sass
`grunt watchSass`
### Build
`grunt build`
### Watch build seajs
`grunt watchSeajs`
### Watch all
`grunt watch`


## License

MIT
