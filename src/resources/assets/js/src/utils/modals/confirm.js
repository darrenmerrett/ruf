"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function confirm(e){(0,_modal2.default)({id:e.id,header:e.header,body:_react2.default.createElement("div",null,_react2.default.createElement("div",{className:"pb-1"},e.message),_react2.default.createElement(_reactstrap.ModalFooter,null,_react2.default.createElement("button",{type:"button",className:"btn btn-default float-left",onClick:_modal2.default.close.bind(this,e.id)},"Cancel"),_react2.default.createElement("button",{className:"btn btn-primary",onClick:e.confirmFunc},e.confirmButtonText))),close:!1,noFooter:!0})}var _react=require("react"),_react2=_interopRequireDefault(_react),_modal=require("./modal"),_modal2=_interopRequireDefault(_modal),_reactstrap=require("reactstrap");confirm.close=function(e){_modal2.default.close(e)},module.exports=confirm;