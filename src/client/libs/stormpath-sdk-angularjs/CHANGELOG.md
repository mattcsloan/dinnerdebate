# 0.9.0

* Adding support for ngRoute.  Please see the API Documentation and the new
  `ng-route-app` in the examples folder!

* Bug fixed: you could navigate to the login form, even when logged in.

* Updating `express-stormpath` versions in example projects.

# 0.8.2

* Bug fixed: `stormpath-sdk-angularjs` now exports 'stormpath' instead of 'ui.router'

# 0.8.1

* Fixed bug that displayed social login titles without any social login providers
* Updated grunt-html2js to version 0.3.5
* Updated grunt-contrib-clean to version 0.7.0
* Updated grunt-contrib-uglify to version 0.10.1
* Removed dist folder from the ignored file so we can use this lib with webpack or browserify

# 0.8.0

* Added support for social login with Google and Facebook (requires use of
  [Express-Stormpath][] as your backend)

# 0.7.2

**Released on October 26th, 2015**

* Updating `grunt-contrib` dependencies

# 0.7.1

**Released on October 8th, 2015**

Fixed the [ifUserInGroup][] and [ifUserNotInGroup][] directives to expect the
new data format (expanded `account.groups`) from the `/me` route

# 0.7.0

### ! ** Many Breaking Changes ** !

This library has been upgraded to conform to our framework specification,
this means that many of the endpoints and default URLs have changed.

If you have built a server integration by hand, you will need to read this changelog
to know which URLs and HTTP responses that you will need to change.

If you are using [Stormpath Express SDK][], that module is being deprecated. You
will need to start using [Express-Stormpath][] if you want to use this and
future versions of this Angular SDK.  We suggest that you read the [Server
Configuration][] section of our [Yeoman Guide][], it will show you the new way
of initializing [Express-Stormpath][] and attaching it to your application

#### Login Changes

The login feature now uses `/login` as the location where posts the login
form.  Previously this was `/oauth/token`.  This can be configured with the
`AUTHENTICATION_ENDPOINT` property in `STORMPATH_CONFIG`

#### User Context Changes

This SDK now uses the `/me` URL to determine the context of the current user.
Previously this was `/api/users/current`.  This can be configured with the
`CURRENT_USER_URI` property in `STORMPATH_CONFIG`

#### Email Verification Changes

This SDK now uses the `/verify` URL to consume email verification tokens.
Previously this was `/api/emailVerificationTokens`.  This can be configured with the
`EMAIL_VERIFICATION_ENDPOINT` property in `STORMPATH_CONFIG`

The same URL, `/verify`, is now used to request a re-send of a verification email.
POST a JSON body with an `email` property to trigger this action.  Previously
this was `/api/verificationEmails` and the `RESEND_EMAIL_VERIFICATION_ENDPOINT`
property has been removed from `STORMPATH_CONFIG`.

#### Password Reset Changes

This SDK now uses `/forgot` to request a password reset email, POST a JSON body
to this endpoint with an `email` property to trigger this action.  Previously
this was `/api/passwordResetTokens` and the
`PASSWORD_RESET_TOKEN_COLLECTION_ENDPOINT` property has been removed from
`STORMPATH_CONFIG`.  The new property is `FORGOT_PASSWORD_ENDPOINT`

The `/change` URL is now used to POST a new password, with a valid `sptoken`.
Previously this feature was supported with the `/api/passwordResetTokens` URL
and the `PASSWORD_RESET_TOKEN_COLLECTION_ENDPOINT` property has been removed
from `STORMPATH_CONFIG`.  The new property is `CHANGE_PASSWORD_ENDPOINT`

The default login form now links to the forgot password flow via an href link
to `/forgot`. Previously it was using a UI Router state name of
`passwordResetRequest`

#### Registration Changes

The SDK now uses `/register` to POST data for a new account, previously this
was `/api/users` and the `USER_COLLECTION_URI` property has been removed from
`STORMPATH_CONFIG`.  The new property is `REGISTER_URI`.

The callback for `$user.create()` will now give you the entire account object.
Previously it gave you a truthy value that would indicate if the account required
email verification.  Now that the entire account object is passed, you need to
inspect the account object's `status` property to see if it is `UNVERIFIED`.

If your registration form is passing data for the new account's custom data
object, you will need to change your `ng-model` references from
`formModel.customData.<FIELD>` to `formModel.<FIELD>`.  We will automaticaly
find the properties that are not part of the base account object, and place them
on the custom data object for you.

#### Error responses

This SDK now expects any HTTP call which results in a `4xx` error to supply an
`error` property on the JSON body of the response.  Previously it expected
an `errorMessage` property


# 0.6.0

### Breaking Changes

Stormpath's password reset API accepts email address only,
not username.  This library was allowing a username to be
sent, but that will not work.  If using the [Stormpath Express SDK]
you will also need to update that library to `>=0.5.0`

# 0.5.5

Fix a redirect loop in the state change interceptor

# 0.5.4

Fix an undefined attribute bug with the group membership directives

# 0.5.3

Adding social login support.  **NOTE**: this is overloading oauth grant_type,
and we will change this API in the future so use with this disclaimer.

### Bug Fixes

# 0.5.2

### Improvements

* Remove un-used `$cookieStore` dependency

### Bug Fixes

* The config option FORM_CONTENT_TYPE was not being used to modify
  the body of the request (only the content-type header)

# 0.5.1

### Bug Fixes

The `defaultPostLoginState` option was not being used by the SDK, but now it is!

# 0.5.0

### New Features

XHR requests now set the `withCredentials` option to `true`, allowing you to
make cross-domain requests that will send the `access_token` and `XSRF-TOKEN`
cookies.  Your server must respond with the necessary
[Cross-Origin-Resource-Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) headers.
If you are using our Express SDK this is done by specifying
[Allowed Origins on spConfig](https://github.com/stormpath/stormpath-sdk-express#allowedOrigins)

# 0.4.1

### New Features

The UI Router integration now accepts a `forbiddenState` option, this is the
state we will send the user to if they are unauthorized for a given state.
This is useful if you want to show a default "Forbidden" view in these
situations.

Added documentation for the [$stateChangeUnauthenticated] and
[$stateChangeUnauthorized] events!

# 0.4.0

### Breaking Changes

The [ifUserInGroup] and [ifUserNotInGroup] directives now requires you to pass
either a string expression or a reference to a scope variable.  I.E. this will
now throw a parse exception unless `admin` is a reference to a scope property:

```html
<div if-user-in-group="admin">Hello, Administrator</div>
```

It should be re-written to be a string expression with quotes:

```html
<div if-user-in-group="'admin'">Hello, Administrator</div>
```

## New Features

The [ifUserInGroup] and [ifUserNotInGroup] directives now support regular
expressions :)

See the documentation of [ifUserInGroup] for more information

# 0.3.0

### Breaking Changes

* The `logout` directive is renamed to
[`spLogout`](https://docs.stormpath.com/angularjs/sdk/#/api/stormpath.spLogout:spLogout)

* The registration form now uses property names of
`givenName` and `surname`, instead of `firstName` and `lastName`

* Form submissions now use `application/x-www-form-urlencoded` as the Content Type.
Your server needs to negotiate this type, if you are using our server SDKs this happens
for you.  If you wish to continue using `application/json` as the Content
Type you can define `STORMPATH_CONFIG.FORM_CONTENT_TYPE='application/json'` in a
config block

## Deprecation Notices

* [`whileResolvingUser`](https://docs.stormpath.com/angularjs/sdk/#/api/stormpath.whileResolvingUser:while-resolving-user)
is deprecatead.  Use
[`ifUserStateKnown`](https://docs.stormpath.com/angularjs/sdk/#/api/stormpath.ifUserStateKnown:ifUserStateKnown)
instead.

### New Features

* **Custom Data on Registration**.  You can now pass custom data during
registration, simply reference `formModel.customData.myCustomProperty` in your
`ng-model` directive.  This is only possible if you are supplying a custom
template to the directive.  See the
[`spRegistrationForm`](https://docs.stormpath.com/angularjs/sdk/#/api/stormpath.spRegistrationForm:spRegistrationForm)
directive for more detail.

* **Group-Based Access Control**.  This can now control access to UI Routes,
based on group membership.  See
[`SpStateConfig`](https://docs.stormpath.com/angularjs/sdk/#/api/stormpath.SpStateConfig:SpStateConfig)
for examples.  We've also introduced the
[`ifUserInGroup`](https://docs.stormpath.com/angularjs/sdk/#/api/stormpath.ifUserInGroup:ifUserInGroup)
and
[`ifUserNotInGroup`](https://docs.stormpath.com/angularjs/sdk/#/api/stormpath.ifUserNotInGroup:ifUserNotInGroup)
directives.

### Bug Fixes

* [`whileResolvingUser`](https://docs.stormpath.com/angularjs/sdk/#/api/stormpath.whileResolvingUser:while-resolving-user)
would break after logout (user state was not properly reflected after logout)

[Stormpath Express SDK]: https://github.com/stormpath/stormpath-sdk-express
[$stateChangeUnauthenticated]: https://docs.stormpath.com/angularjs/sdk/#/api/stormpath.$stormpath#events_$statechangeunauthenticated
[$stateChangeUnauthorized]: https://docs.stormpath.com/angularjs/sdk/#/api/stormpath.$stormpath#events_$statechangeunauthorized
[ifUserInGroup]: https://docs.stormpath.com/angularjs/sdk/#/api/stormpath.ifUserInGroup:ifUserInGroup
[ifUserNotInGroup]: https://docs.stormpath.com/angularjs/sdk/#/api/stormpath.ifUserNotInGroup:ifUserNotInGroup
[Express-Stormpath]: https://github.com/stormpath/express-stormpath
[Server Configuration]: http://docs.stormpath.com/angularjs/guide/protect_api.html
[Yeoman Guide]: http://docs.stormpath.com/angularjs/guide/
