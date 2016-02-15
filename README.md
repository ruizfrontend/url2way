url2ways
=======================
AngularJs two way data binding query strings.  
You just define your bindings at the beginning of your controller, and your model will be filled with the url parameters. Additionally, when you change the model, the url changes to reflect the current model.  
If you don't wan't to save

##Installation

####Bower
`bower install url2way`

####NPM
`npm install url2way`

####Manually
Load the library and it's dependencies

```javascript
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
<script src="./l33teral-latest.js"></script>
<script src="./url2way.js"></script>
```

##Dependencies

url2ways requires angularjs, [underscore](https://github.com/jashkenas/underscore) & [l33teral](https://github.com/nicholascloud/l33teral)

##Usage

Load the module url2ways into your main controller, and call it with the bindings as the first parameter, and pass the context (usually the $scope) as the second parameter:

```javascript
url2way('name', $scope);
```

When you load the localhost/sample.html#?name=Peter%20Pan, automaitcally have $scope.name assigned to 'Peter Pan', and if you change the value of name, the url will change too. If the model have a value assigned before the call, it will remain in case no value is passed in the url.  

You can define more complex bindings with object literals:

```javascript
url2way({name: 'user.name', surname: 'user.surname', url: 'user.url'}, $scope);
```

The key of each element being the query in the url, and the value, the path of the data Model. The previous example will map the url localhost/sample.html#?name=MC&surname=Hammer&url=https:%2F%2Fes.wikipedia.org%2Fwiki%2FMC_Hammer to this object:

```javascript
user: {name: 'MC', surname: 'Hammer', url: 'https://es.wikipedia.org/wiki/MC_Hammer'}
```

You can set initial values defining the model before the call to url2way, or passing the values as an array, with the initial value as the second element of the array:

```javascript
url2way({name: ['user.name', 'MC'], surname: ['user.surname', 'Hammer'], url: 'user.url'}, $scope);
```

Finally, there is another way to bind multiple parameters at once. You can define an object with multiple elements, and pass it to the function. Every key will be mapped to that value:

```javascript
$scope.userData = {name: 'MC', surname: 'Hammer', url: 'https://es.wikipedia.org/wiki/MC_Hammer'};
url2way({userData: null}, $scope);
```