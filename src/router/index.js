import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from "../views/SignIn.vue"
import SignUp from "../views/SignUp.vue"
import UserPage from "../views/UserPage.vue"
import AlbumIndex from "../views/album/Index.vue"
import PhotoCreate from "../views/photo/Create.vue"
import store from '../store/index.js'
import { Hub } from "@aws-amplify/core"
import Auth from "@aws-amplify/auth"


let user;

// ユーザー管理
getUser().then((user) => {
    if (user) {
        router.push({path: '/index'});
    }
});

function getUser() {
    return Auth.currentAuthenticatedUser().then((data) => {
        if (data && data.signInUserSession) {
            store.commit('setUser', data);
            return data;
        }
    }).catch(() => {
        store.commit('setUser', null);
        return null;
    });
}

// ログイン状態管理
Hub.listen("auth", async (data) => {
    if (data.payload.event === 'signOut'){
        user = null;
        store.commit('setUser', null);
        router.push({path: '/signin'});
    } else if (data.payload.event === 'signIn') {
        user = await getUser();
        router.push({path: '/index'});
    }
});
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: AlbumIndex,
  },
  {
    path: "/index",
    component: AlbumIndex,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/userpage",
    name: "UserPage",
    component: UserPage,
    meta: { requiresAuth: true },
    
  },
  {
    path: "/photo/create",
    name: "PhotoCreate",
    component: PhotoCreate,
    props: true,
    meta: { requiresAuth: true },
  },

]

const router = new VueRouter({
  routes
})


router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      user = await getUser();
      if (!user) {
          return next({
              path: '/signin'
          });
      }
      return next()
  }
  return next()
});


export default router
