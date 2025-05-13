import { config } from '../../../config';

export default function closePage() {
  window.location = `${config.baseUrl}/careline/call/end`;
}
