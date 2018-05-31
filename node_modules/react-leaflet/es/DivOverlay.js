function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

import PropTypes from 'prop-types';
import { Children } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import MapComponent from './MapComponent';
import updateClassName from './utils/updateClassName';

var DivOverlay = function (_MapComponent) {
  _inherits(DivOverlay, _MapComponent);

  function DivOverlay() {
    var _temp, _this, _ret;

    _classCallCheck(this, DivOverlay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _MapComponent.call.apply(_MapComponent, [this].concat(args))), _this), _this.onClose = function () {
      _this.removeContent();
      if (_this.props.onClose) {
        _this.props.onClose();
      }
    }, _this.onOpen = function () {
      _this.renderContent();
      if (_this.props.onOpen) {
        _this.props.onOpen();
      }
    }, _this.renderContent = function () {
      if (_this.props.children == null) {
        _this.removeContent();
      } else {
        render(Children.only(_this.props.children), _this.leafletElement._contentNode, function () {
          _this.leafletElement.update();
          _this.onRender();
        });
      }
    }, _this.removeContent = function () {
      if (_this.leafletElement._contentNode) {
        unmountComponentAtNode(_this.leafletElement._contentNode);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  DivOverlay.prototype.updateLeafletElement = function updateLeafletElement(prevProps, props) {}; // eslint-disable-line

  DivOverlay.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    updateClassName(this.leafletElement._container, prevProps.className, this.props.className);

    this.updateLeafletElement(prevProps, this.props);

    if (this.leafletElement.isOpen()) {
      this.renderContent();
    }
  };

  DivOverlay.prototype.onRender = function onRender() {};

  DivOverlay.prototype.render = function render() {
    return null;
  };

  return DivOverlay;
}(MapComponent);

DivOverlay.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  onOpen: PropTypes.func
};
export default DivOverlay;