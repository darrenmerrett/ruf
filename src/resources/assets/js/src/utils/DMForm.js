"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),_react=require("react"),_react2=_interopRequireDefault(_react),_reactstrap=require("reactstrap"),_availityReactstrapValidation=require("availity-reactstrap-validation"),_classnames=require("classnames"),_classnames2=_interopRequireDefault(_classnames),_DMAv=require("./DMAv"),_DMAv2=_interopRequireDefault(_DMAv),_lodash=require("lodash"),DMForm=function(e){function t(e){_classCallCheck(this,t);var a=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={saving:!1,checkboxesClickedForShowingIf:{},loaded:!1},a}return _inherits(t,e),_createClass(t,[{key:"componentDidMount",value:function(){this.setState({loaded:!0})}},{key:"handleInvalidSubmit",value:function(e){this.props.form.invalidSubmit&&this.props.form.invalidSubmit(e)}},{key:"handleValidSubmit",value:function(e,t){var a=this,l=this.props.form.submit(t);l&&(this.unmounted||this.setState({saving:!0}),l.then(function(e){a.props.form.clearFormAfterSubmit&&!e&&a.refs.formtty&&a.refs.formtty.reset(),a.unmounted||a.setState({saving:!1})}))}},{key:"componentWillUnmount",value:function(){this.unmounted=!0}},{key:"checkValues",value:function(){this.forceUpdate()}},{key:"showField",value:function(e){if(!this.state.loaded)return 0;if(!e.showIf)return 1;var t=this;if((0,_lodash.isString)(e.showIf))return this.showFieldIsString(e.showIf);if((0,_lodash.isArray)(e.showIf)){var a=1;return e.showIf.map(function(e){if((0,_lodash.isString)(e)){var l=t.showFieldIsString(e);a*=l}}),a}}},{key:"showFieldIsString",value:function(e){var t=this.AVFORM.getValue(e);return t&&0!=t?1:0}},{key:"render",value:function(){var e=this.props.form,t=e.fields,a=e.button,l=this,r={};return t.map(function(e,t){"checkbox"==e.inputType&&(r[e.name]=e.value)}),_react2.default.createElement(_availityReactstrapValidation.AvForm,{ref:"formtty",onValidSubmit:this.handleValidSubmit.bind(this),onInvalidSubmit:this.handleInvalidSubmit.bind(this),model:r},_react2.default.createElement(_DMAv2.default,{ref:function(e){l.AVFORM=e}}),e.preText&&_react2.default.createElement("div",{className:"row form-group"},e.preText),t.map(function(t,a){return _react2.default.createElement(_reactstrap.FormGroup,{key:a,className:(0,_classnames2.default)("row",t.rowClassName),style:{display:l.showField(t)?"flex":"none"}},t.label&&_react2.default.createElement("label",{className:(0,_classnames2.default)(e.labelsAboveFields||"subtitle"==t.inputType?"col-md-12":"col-md-4","col-form-label",t.labelClassName,"checkbox"==t.inputType?"col-6":"")},l.showField(t)&&"subtitle"==t.inputType?_react2.default.createElement("h3",null,t.label):t.label),_react2.default.createElement("div",{style:{marginLeft:"checkbox"==t.inputType?"-10px":"",paddingLeft:"checkbox"==t.inputType?"45px":""},className:(0,_classnames2.default)(e.labelsAboveFields||!t.label?"col-md-12":"col-md-8","checkbox"==t.inputType?"col-6":"")},_react2.default.createElement("div",{className:(0,_classnames2.default)(t.elementClassName)},function(){switch(t.inputType){case"select":return _react2.default.createElement(_availityReactstrapValidation.AvField,{name:t.name,required:t.required,disabled:l.state.saving||t.disabled,ref:t.name,type:t.inputType,errorMessage:t.errorMessage,helpMessage:t.helpMessage,value:t.value,placeholder:t.placeHolder,validate:t.validate,onChange:l.checkValues.bind(l)},"select"==t.inputType&&t.values.map(function(e,t){return _react2.default.createElement("option",{value:e.id,key:t},e.name)}));case"checkbox":return _react2.default.createElement(_reactstrap.Label,{check:!0,inline:!0},_react2.default.createElement(_availityReactstrapValidation.AvInput,{type:"checkbox",disabled:l.state.saving||t.disabled,name:t.name,trueValue:t.trueValue,falseValue:t.falseValue,onChange:l.checkValues.bind(l)}));case"subtitle":return"";default:return _react2.default.createElement(_availityReactstrapValidation.AvField,{name:t.name,required:t.required,disabled:l.state.saving||t.disabled,ref:t.name,type:t.inputType,errorMessage:t.errorMessage,helpMessage:t.helpMessage,value:t.value,placeholder:t.placeHolder,validate:t.validate,onChange:l.checkValues.bind(l)})}}())),"checkbox"==t.inputType&&_react2.default.createElement("div",{className:"col-md-12"},_react2.default.createElement("small",{className:"form-text"},t.helpMessage)))}),e.postText&&_react2.default.createElement("div",{className:"row form-group"},e.postText),!a.keepButtonsOutOfFooter&&e.inModal?_react2.default.createElement(_reactstrap.ModalFooter,null,e.showCancelButton&&_react2.default.createElement("button",{disabled:this.state.saving||a.disabled,type:"button",className:"btn btn-default float-left",onClick:e.closeButton},"Cancel"),_react2.default.createElement("button",{disabled:this.state.saving||a.disabled,className:(0,_classnames2.default)("btn",a.class)},a.text)):_react2.default.createElement("div",{className:"row form-group"},e.labelsAboveFields?"":_react2.default.createElement("label",{className:(0,_classnames2.default)("col-md-4")}),_react2.default.createElement("div",{className:(0,_classnames2.default)(e.labelsAboveFields?"col-md-12":"text-center text-md-left col-md-8",a.position?"text-"+a.position:"")},_react2.default.createElement("button",{disabled:this.state.saving||a.disabled,className:(0,_classnames2.default)("btn",a.class)},a.text))))}}]),t}(_react2.default.Component);module.exports=DMForm;