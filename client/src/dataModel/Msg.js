import { uniqueId, create, bind, cloneDeep } from 'lodash';

class Msg {
  static forType(type, message, opts = {}) {
    const { id = uniqueId(), isRead = false, createdAt = new Date() } = opts;

    const msg = create(Msg.prototype, {
      id,
      isRead,
      createdAt,
      message,
      type
    });

    return msg;
  }

  clone() {
    return create(Msg.prototype, cloneDeep(this));
  }
}

['info', 'success', 'error'].forEach(type => {
  Msg[type] = bind(Msg.forType, this, type);
});

export default Msg;
