import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import App from './App.vue'
import NotFound from './pages/NotFound.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component:ViewContainer,
    redirect:'main/users',
    meta: {
      crumb: 'Home',
      public: true,
    },
    children:[
      {
        path: 'register',
        name: 'register',
        component: Register,
        meta: {
          public: true,
        },
      },
      {
        path: 'login',
        name: 'login',
        component: Login,
        meta: {
          public: true,
        },
      },
      {
        path:'main',
        name:'main',
        redirect:'main/users',
        component:MainContainer,
        meta: {
          public: false,
        },
        children:[
          {
            path:'good_student',
            name:'good_student',
            component:GoodStudent,
            meta: {
              public: false,
            }
          },
          {
            path:'users',
            name:'users',
            component:Users,
            meta:{
              public:false
            }
          },
          {
            path:'meeting',
            name:'meeting',
            component:Meeting,
            meta:{
              public:false
            }
          },
          {
            path:'checkIn',
            name:'checkIn',
            component:CheckIn,
            meta:{
              public:false
            }
          },
          {
            path:'classMoney',
            name:'classMoney',
            component:ClassMoney,
            meta:{
              public:false
            }
          },
          {
            path:'reporting',
            name:'reporting',
            component:Reporting,
            meta:{
              public:false
            }
          },
        ]

      },

    ]
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      title: 'Page not Found',
      public: true,
    },
  },
]
