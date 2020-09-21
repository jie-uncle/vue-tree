/* eslint-disable */
import './fonts/iconfont.css'
import './css/index.css'
import Tree from "./Tree";
Tree.install = app => {
  app.component(Tree.name, Tree);
};

export default Tree;