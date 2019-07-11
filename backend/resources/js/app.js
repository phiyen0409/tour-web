/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import moment from 'moment';
import VueProgressBar from 'vue-progressbar'
import VueRouter from 'vue-router'
//
import Gate from "./Gate";
Vue.prototype.$gate = new Gate(window.user);
import {
    Form,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess
} from 'vform'

Vue.use(VueRouter)

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component(AlertErrors.name, AlertErrors)
Vue.component(AlertSuccess.name, AlertSuccess)

const routes = [
    { path: '/admin/dashboard', component: require('./components/Dashboard.vue').default },
    { path: '/admin/category', component: require('./components/Category.vue').default },
    { path: '/admin/location', component: require('./components/Location.vue').default },
    { path: '/admin/tourist-route', component: require('./components/TouristRoute.vue').default },
    { path: '/admin/tourist-route/add', component: require('./components/TouristRouteAdd.vue').default },
    { path: '/admin/tourist-route/edit/:tr_id', name: 'editTouristRoute', component: require('./components/TouristRouteEdit.vue').default, props: true },
    { path: '/admin/tour', component: require('./components/Tour.vue').default },
    { path: '/admin/tour/add', component: require('./components/TourAdd.vue').default },
    { path: '/admin/tour/edit/:tour_id', name: 'editTour', component: require('./components/TourEdit.vue').default },
    { path: '/admin/user-client', component: require('./components/UserClient.vue').default },
    { path: '/admin/reviews', component: require('./components/Reviews.vue').default },
    { path: '/admin/promotion', component: require('./components/Promotion.vue').default },
    { path: '/admin/developer', component: require('./components/Developer.vue').default },
    { path: '/admin/users', component: require('./components/Users.vue').default },
    { path: '/admin/profile', component: require('./components/Profile.vue').default },
    { path: '/admin/news', component: require('./components/News.vue').default },
    { path: '/admin/news/add', component: require('./components/NewsAdd.vue').default },
    { path: '/admin/news/edit/:news_id', name: 'editNews', component: require('./components/NewsEdit.vue').default },
    { path: '/admin/booking-tour', component: require('./components/BookingTour.vue').default },
    { path: '/admin/revenue', component: require('./components/Revenue.vue').default },
    { path: '/admin/*', component: require('./components/NotFound.vue').default }
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})


Vue.filter('upText', function (text) {
    let res = text.split(" ");


    for (let index = 0; index < res.length; index++) {
        const element = res[index];
        res[index] = element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
    }

    let result = "";
    for (let index = 0; index < res.length - 1; index++) {
        result = result + res[index] + " ";
    }
    result = result + res[res.length - 1];

    return result;
});

Vue.filter('myDate', function (created) {
    return moment(created).format('DD-MM-YYYY');
});

Vue.filter('formatPrice', function (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
});

window.Fire = new Vue();

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
})

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

window.Swal = Swal;

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000
});

window.Toast = Toast;

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success mr-2',
        cancelButton: 'btn btn-danger mr-2'
    },
    buttonsStyling: false,
})

window.swalWithBootstrapButtons = swalWithBootstrapButtons;


Vue.component('pagination', require('laravel-vue-pagination'));

import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

vSelect.props.components.default = () => ({
    Deselect: {
        render: createElement => createElement('span', '❌'),
    },
    OpenIndicator: {
        render: createElement => createElement('span', '🔽'),
    },
});

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

import VueUploadMultipleImage from 'vue-upload-multiple-image'
Vue.component('vue-upload-multiple-image', VueUploadMultipleImage)

import VCalendar from 'v-calendar';
Vue.use(VCalendar, {
    locales: {
        'vi-VN': {
            firstDayOfWeek: 1,
            masks: {
                L: 'YYYY-MM-DD',
                data: 'YYYY-MM-DD',
                input: 'YYYY-MM-DD'
                // ...optional `title`, `weekdays`, `navMonths`, etc
            }
        }
    }
});

import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use(CKEditor);



/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
// Vue.component('my-component', require('./components/MyComponent.vue').default);
Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);

Vue.component(
    'not-found',
    require('./components/NotFound.vue').default
);

Vue.component(
    'destination-add',
    require('./components/tourist_route_add/DestinationsAddComponent.vue').default
);

Vue.component(
    'tourist-route-detail-add',
    require('./components/tourist_route_add/TouristRouteDetailAddComponent.vue').default
);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const api = window.host + '/api';
Vue.prototype.$Api = api;

Vue.prototype.$Host = window.host;

const app = new Vue({
    el: '#app',
    router,
    data: {
        search: ''
    },
    methods: {
        // searchit: _.debounce(() => {
        //     Fire.$emit('searching');
        // }, 1000),

        // printme() {
        //     window.print();
        // }

        initDatatables() {
            // !function (e) { var t = {}; function n(a) { if (t[a]) return t[a].exports; var r = t[a] = { i: a, l: !1, exports: {} }; return e[a].call(r.exports, r, r.exports, n), r.l = !0, r.exports } n.m = e, n.c = t, n.d = function (e, t, a) { n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a }) }, n.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, n.t = function (e, t) { if (1 & t && (e = n(e)), 8 & t) return e; if (4 & t && "object" == typeof e && e && e.__esModule) return e; var a = Object.create(null); if (n.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var r in e) n.d(a, r, function (t) { return e[t] }.bind(null, r)); return a }, n.n = function (e) { var t = e && e.__esModule ? function () { return e.default } : function () { return e }; return n.d(t, "a", t), t }, n.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, n.p = "", n(n.s = 22) }({ 22: function (e, t, n) { e.exports = n(23) }, 23: function (e, t) { function n(e, t) { for (var n = 0; n < t.length; n++) { var a = t[n]; a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a) } } var a = function () { function e() { !function (e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }(this, e) } var t, a, r; return t = e, r = [{ key: "initDataTables", value: function () { jQuery.extend(jQuery.fn.dataTable.ext.classes, { sWrapper: "dataTables_wrapper dt-bootstrap4", sFilterInput: "form-control form-control-sm", sLengthSelect: "form-control form-control-sm" }), jQuery.extend(!0, jQuery.fn.dataTable.defaults, { language: { lengthMenu: "_MENU_", search: "_INPUT_", searchPlaceholder: "Search..", info: "Page <strong>_PAGE_</strong> of <strong>_PAGES_</strong>", paginate: { first: '<i class="fa fa-angle-double-left"></i>', previous: '<i class="fa fa-angle-left"></i>', next: '<i class="fa fa-angle-right"></i>', last: '<i class="fa fa-angle-double-right"></i>' } } }), jQuery(".js-dataTable-full").dataTable({ pageLength: 10, lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]], autoWidth: !1 }), jQuery(".js-dataTable-full-pagination").dataTable({ pagingType: "full_numbers", pageLength: 10, lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]], autoWidth: !1 }), jQuery(".js-dataTable-simple").dataTable({ pageLength: 10, lengthMenu: !1, searching: !1, autoWidth: !1, dom: "<'row'<'col-sm-12'tr>><'row'<'col-sm-6'i><'col-sm-6'p>>" }), jQuery(".js-dataTable-buttons").dataTable({ pageLength: 10, lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]], autoWidth: !1, buttons: [{ extend: "copy", className: "btn btn-sm btn-primary" }, { extend: "csv", className: "btn btn-sm btn-primary" }, { extend: "print", className: "btn btn-sm btn-primary" }], dom: "<'row'<'col-sm-12'<'text-center bg-body-light py-2 mb-2'B>>><'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>" }) } }, { key: "init", value: function () { this.initDataTables() } }], (a = null) && n(t.prototype, a), r && n(t, r), e }(); jQuery(function () { a.init() }) } });
        }
    }
});
