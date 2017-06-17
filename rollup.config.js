export default {
    entry: './index.js',
    dest: 'bundles/a4-http.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'a4-http',
    external: [
        '@angular/core',
        '@angular/common',
        '@angular/http',
        '@angular/router',
        'rxjs/Observable',
        'rxjs/add/observable/throw',
        'rxjs/add/operator/finally',
        'rxjs/add/operator/catch',
        'rxjs/add/observable/empty'
    ],
    globals: {
        '@angular/core': 'ng-core',
        '@angular/common': 'ng-common',
        '@angular/http': 'ng-http',
        '@angular/router': 'ng-router',
        'rxjs/Observable': 'rxjs-observable',
        'rxjs/add/observable/throw': 'rxjs-add-observable-throw',
        'rxjs/add/operator/finally': 'rxjs-add-observable-finally',
        'rxjs/add/operator/catch': 'rxjs-add-observable-catch',
        'rxjs/add/observable/empty': 'rxjs-add-observable-empty'
    }
}