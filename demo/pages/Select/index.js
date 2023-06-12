const list = ['北京', '上海', '深圳', '广州', '南京', '武汉', '无锡', '苏州'];

Page({
  data: {
    value: '上海',
    list,
  },
  onVisibleChange(visible) {
    if (visible) {
      this.value = this.data.value;
    }
  },
  onChange(val) {
    val = val.trim();
    const filterList = list.filter(item => item.includes(val));
    this.setData({
      list: filterList,
      value: filterList.length === list.length ? this.value : filterList[0],
    });
  },
  onOk(value) {
    this.setData({
      list,
      value,
    });
  },
  onCancel() {
    this.setData({
      list,
      value: this.value,
    });
  },
});
