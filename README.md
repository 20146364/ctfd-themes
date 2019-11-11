# ctfd-themes

## Installation
* Copy `storm/` into your `CTFd/CTFd/themes` folder.
* Copy `assets/view.html` to `CTFd/CTFd/plugins/challenges/assets/view.html`
* Copy `assets/view.js` to `CTFd/CTFd/plugins/challenges/assets/view.js`

## Setting themes
* Login with admin acount
* Go to Admin/Config/Appearance
![Theme Setting](https://github.com/20146364/ctfd-themes/blob/master/screenshots/Untitled.png)

## Update Homepage
* Login with admin acount
* Go to Admin/Config/Page/All Page
* Choose Router index
* Edit content:
	'<div class="row">
		<div class="col-md-6 offset-md-3">
			<img class="w-100 mx-auto d-block img-logo-content-page" src="themes/core/static/img/logo.png" />
			<h3 class="text-center">
				<p>A cool CTF platform from <a href="https://ctfd.io">ctfd.io</a></p>
				<p>Follow us on social media:</p>
				<a href="https://twitter.com/ctfdio"><i class="fa fa-twitter" aria-hidden="true"></i></a>&nbsp;
				<a href="https://facebook.com/ctfdio"><i class="fa fa-facebook" aria-hidden="true"></i></a>&nbsp;
				<a href="https://github.com/ctfd"><i class="fa fa-github" aria-hidden="true"></i></a>
			</h3>
			<br>
			<h4 class="text-center">
				<a href="admin">Click here</a> to login and setup your CTF
			</h4>
		</div>
	</div>'
