import Vue from 'vue'
import VueRouter from 'vue-router'
import DesignEditor from '../views/editor/index'
import DesignEditorPlus from '../views/editorPlus/index'
import DesignEditorDialog from '../views/editorDialog/index'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/design',
    name: 'r_design_editor',
    component: DesignEditor
  },
  {
    path: '/designPlus',
    name: 'r_design_editor_plus',
    component: DesignEditorPlus
  },
  {
    path: '/designDialog',
    name: 'r_design_editor_dialog',
    component: DesignEditorDialog
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
