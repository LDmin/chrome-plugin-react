export default function setNativeValue(element, value) {
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
  if (typeof prototypeValueSetter !== 'undefined') {
    prototypeValueSetter.call(element, value);
  }
  element.dispatchEvent(new Event('input', { bubbles: true }));
}