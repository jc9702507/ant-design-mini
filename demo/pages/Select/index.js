Page({
  data: {
    value: '上海',
    list: ['北京', '上海', '深圳', '广州', '南京', '武汉', '无锡', '苏州'],
  },
  onChange(val) {
    val = val.trim();
    if (!val) {
      return;
    }
    const value = this.data.list.find(item => {
      if (item.includes(val)) {
        return item;
      }
    });
    if (value) {
      if (!this.lastValue) {
        this.lastValue = this.data.value;
      }
      this.setData({
        value,
      });
    }
  },
  handleOk(value) {
    this.setData({
      value,
    });
  },
  handleCancel() {
    if (this.lastValue) {
      this.setData({
        value: this.lastValue,
      });
    }
  },
});
