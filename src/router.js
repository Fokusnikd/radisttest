import Vue from "vue";
import Router from "vue-router";
import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage';
import home from './components/Home';
import guard from './router/guard'


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: "/",
      name: "home",
      component: home,
      beforeEnter: guard
    }, {
      path: "/firstpage",
      name: "firstpage",
      component: FirstPage,
    },
    {
      path: "/secondpage",
      name: "secondpage",
      component: SecondPage,
      beforeEnter: guard
    }
  ]
});