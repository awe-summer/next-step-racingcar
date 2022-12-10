import { FormControlService } from './form-control.service.js';
import { PlayerRule } from '../common/enum.js';
import { ArrayUtil } from '../utils/array.util.js';

export class PlayerFormControlService extends FormControlService {
  validate() {
    return !(this.noValue() || this.#inValidLength());
  }

  #inValidLength() {
    const arr = ArrayUtil.toTrim(this.element.value.split(','));
    return arr.some(el => PlayerRule.MIN_LENGTH > el.length || PlayerRule.MAX_LENGTH < el.length);
  }

  getValue() {
    return ArrayUtil.toTrim(this.element.value.split(','));
  }
}
