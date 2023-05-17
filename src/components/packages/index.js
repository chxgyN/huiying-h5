import Actionsheet from "./action-sheet";
import Badge from "./badge";
import Button from "./button";
import Cell from "./cell";
import CellGroup from "./cell-group";
import Checkbox from "./checkbox";
import CheckboxGroup from "./checkbox-group";
import Icon from "./icon";
import Loadmore from "./loadmore";
import Message from "./message";
import Modal from "./modal";
import $Modal from "./modal/modal.js";
import Navbar from "./navbar";
import NavbarGroup from "./navbar-group";
import Rate from "./rate";
import Spinner from "./spinner";
import Toast from "./toast";
import "./assets/style/index.css";

const components = [
  Actionsheet,
  Badge,
  Button,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Icon,
  Loadmore,
  Message,
  Modal,
  $Modal,
  Navbar,
  NavbarGroup,
  Rate,
  // 搜索加载
  Spinner,
  Toast,
];

const a =  {
  install(Vue){
    components.map((component) => {
      Vue.component(component.name, component);
    })
    Vue.prototype.$message = Message;
    Vue.prototype.$toast = Toast;
    Vue.prototype.$modal = $Modal;
  }
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default a



