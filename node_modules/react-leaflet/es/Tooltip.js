function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

import { Tooltip as LeafletTooltip } from 'leaflet';
import PropTypes from 'prop-types';

import DivOverlay from './DivOverlay';
import layer from './propTypes/layer';
import map from './propTypes/map';

var Tooltip = function (_DivOverlay) {
  _inherits(Tooltip, _DivOverlay);

  function Tooltip() {
    var _temp, _this, _ret;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _DivOverlay.call.apply(_DivOverlay, [this].concat(args))), _this), _this.onTooltipOpen = function (_ref) {
      var tooltip = _ref.tooltip;

      if (tooltip === _this.leafletElement) {
        _this.onOpen();
      }
    }, _this.onTooltipClose = function (_ref2) {
      var tooltip = _ref2.tooltip;

      if (tooltip === _this.leafletElement) {
        _this.onClose();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Tooltip.prototype.createLeafletElement = function createLeafletElement(props) {
    return new LeafletTooltip(this.getOptions(props), this.context.popupContainer);
  };

  Tooltip.prototype.componentWillMount = function componentWillMount() {
    _DivOverlay.prototype.componentWillMount.call(this);
    this.leafletElement = this.createLeafletElement(this.props);

    this.context.popupContainer.on({
      tooltipopen: this.onTooltipOpen,
      tooltipclose: this.onTooltipClose
    });
  };

  Tooltip.prototype.componentDidMount = function componentDidMount() {
    this.context.popupContainer.bindTooltip(this.leafletElement);
  };

  Tooltip.prototype.componentWillUnmount = function componentWillUnmount() {
    var popupContainer = this.context.popupContainer;


    this.removeContent();

    popupContainer.off({
      tooltipopen: this.onTooltipOpen,
      tooltipclose: this.onTooltipClose
    });
    if (popupContainer._map != null) {
      popupContainer.unbindTooltip(this.leafletElement);
    }

    _DivOverlay.prototype.componentWillUnmount.call(this);
  };

  return Tooltip;
}(DivOverlay);

Tooltip.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  onOpen: PropTypes.func
};
Tooltip.contextTypes = {
  map: map,
  popupContainer: layer,
  pane: PropTypes.string
};
Tooltip.defaultProps = {
  pane: 'tooltipPane'
};
export default Tooltip;