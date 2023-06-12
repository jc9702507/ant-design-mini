async function request() {
  await new Promise(r => setTimeout(r, 1000));
  return ['北京', '上海', '深圳', '广州', '南京', '武汉', '无锡', '苏州'];
}

Page({
  data: {
    value: '',
    list: [],
  },
  onLoad() {
    request().then(list => {
      this.list = list;
      this.setData({
        value: '上海',
        list,
      });
    })
  },
  onVisibleChange(visible) {
    if (visible) {
      this.value = this.data.value;
    }
  },
  onChange(val) {
    val = val.trim();
    const list = this.list.filter(item => item.includes(val));
    this.setData({
      list,
      value: list.length === this.list.length ? this.value : list[0],
    });
  },
  onOk(value) {
    this.setData({
      list: this.list,
      value,
    });
  },
  onCancel() {
    this.setData({
      list: this.list,
      value: this.value,
    });
  },
});
