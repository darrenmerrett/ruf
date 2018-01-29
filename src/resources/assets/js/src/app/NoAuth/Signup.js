"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),_react=require("react"),_react2=_interopRequireDefault(_react),_http=require("rufUtils/http"),_http2=_interopRequireDefault(_http),_reduxConnect=require("rufUtils/redux-connect"),_reduxConnect2=_interopRequireDefault(_reduxConnect),_reactRouterDom=require("react-router-dom"),_DMForm=require("rufUtils/DMForm"),_DMForm2=_interopRequireDefault(_DMForm),Signup=function(e){function t(e){return _classCallCheck(this,t),_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return _inherits(t,e),_createClass(t,[{key:"componentDidMount",value:function(){this.props.website.signups||this.props.history.replace("/")}},{key:"onSubmit",value:function(e){var t=this,r={first_name:e.first_name,email:e.email};return _http2.default.post("/data/join",r).then(function(r){r.joined&&t.props.history.push("/signup?email="+e.email)})}},{key:"render",value:function(){if(!this.props.website.signups)return null;var e=new URLSearchParams(this.props.location.search),t=e.get("email");return _react2.default.createElement("div",{className:"container"},_react2.default.createElement("div",{className:"row"},_react2.default.createElement("div",{className:"col-md-8 offset-md-2"},t?_react2.default.createElement("div",{className:"text-center margin-auto",style:{maxWidth:"600px"}},"An email has been sent to you at",_react2.default.createElement("h1",null,t),_react2.default.createElement("span",{style:{color:"#ac0101",fontWeight:"bold",fontSize:"1.2em"}},"If this email is incorrect, "),_react2.default.createElement(_reactRouterDom.Link,{to:"/signup"},"click here to enter your details again."),".",_react2.default.createElement("br",null),_react2.default.createElement("br",null),"If you do not receive an email within 2 minutes, check your spam/junk folder.",_react2.default.createElement("br",null),_react2.default.createElement("br",null),t.match(/hotmail/)||t.match(/live/)?_react2.default.createElement("div",{style:{color:"#ac0101"}},_react2.default.createElement("b",null,"PLEASE NOTE:")," Due to a recent update to Microsoft Hotmail our emails may end up in your spam or junk folder. To prevent this please add ",this.props.website.name," to your safe senders list."):""):_react2.default.createElement("div",{className:"card"},_react2.default.createElement("div",{className:"card-header"},"Signup"),_react2.default.createElement("div",{className:"card-body"},_react2.default.createElement("div",{className:"card-text"},_react2.default.createElement(_DMForm2.default,{form:{fields:[{name:"first_name",label:"First name",placeHolder:"First name",inputType:"text",dataType:"string",errorMessage:"You must enter your first name",helpMessage:"",required:!0},{name:"email",label:"Email",placeHolder:"Email address",inputType:"email",dataType:"string",errorMessage:"You must enter your email address",helpMessage:"",required:!0}],button:{text:"Join",class:"btn-primary",position:"left"},submit:this.onSubmit.bind(this),clearFormAfterSubmit:!0}})))))))}}]),t}(_react.Component);module.exports=(0,_reactRouterDom.withRouter)((0,_reduxConnect2.default)(Signup,{website:"website"}));