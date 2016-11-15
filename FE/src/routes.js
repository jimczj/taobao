import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import App from './App.vue'
import NotFound from './pages/NotFound.vue'
import MainContainer from './pages/MainContainer.vue'
import GoodStudent from './pages/GoodStudent.vue'
import ViewContainer from './components/ViewContainer.vue'
import Users from './pages/Users.vue'
import Meeting from './pages/Meeting.vue'
import CheckIn from './pages/CheckIn.vue'
import ClassMoney from './pages/ClassMoney.vue'
import Reporting from './pages/Reporting.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component:ViewContainer,
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
            component:Meeting,
            meta:{
              public:false
            }
          },
          {
            path:'checkIn',
            component:CheckIn,
            meta:{
              public:false
            }
          },
          {
            path:'classMoney',
            component:ClassMoney,
            meta:{
              public:false
            }
          },
          {
            path:'reporting',
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
