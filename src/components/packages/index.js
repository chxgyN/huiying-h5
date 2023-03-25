import Actionsheet from "./action-sheet";
import Badge from "./badge";
import Button from "./button";
import Cell from "./cell";
import CellGroup from "./cell-group";
import Checkbox from "./checkbox";
import CheckboxGroup from "./checkbox-group";
import Collapse from "./collapse";
import Divider from "./divider";
import Drawer from "./drawer";
import Grid from "./grid";
import GridItem from "./grid-item";
import HeaderBar from "./header-bar";
import Icon from "./icon";
import Loadmore from "./loadmore";
import Message from "./message";
import Modal from "./modal";
import $Modal from "./modal/modal.js";
import Navbar from "./navbar";
import NavbarGroup from "./navbar-group";
import NoticeBar from "./notice-bar";
import Progress from "./progress";
import Radio from "./radio";
import RadioGroup from "./radio-group";
import Rate from "./rate";
import Slider from "./slider";
import Spinner from "./spinner";
import Sticky from "./sticky";
import StickyButton from "./sticky-button";
import StickyButtonItem from "./sticky-button-item";
import StickyItem from "./sticky-item";
import Swipeout from "./swipeout";
import Switch from "./switch";
import Tag from "./tag";
import Timeline from "./timeline";
import TimelineItem from "./timeline-item";
import Toast from "./toast";

// import "./assets/style/index.scss";

const components = [
  Actionsheet,
  Badge,
  Button,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Collapse,
  Divider,
  Drawer,
  Grid,
  GridItem,
  HeaderBar,
  Icon,
  Loadmore,
  Message,
  Modal,
  $Modal,
  Navbar,
  NavbarGroup,
  NoticeBar,
  Progress,
  Radio,
  RadioGroup,
  Rate,
  Slider,
  Spinner,
  Sticky,
  StickyButton,
  StickyButtonItem,
  StickyItem,
  Swipeout,
  Switch,
  Tag,
  Timeline,
  TimelineItem,
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



