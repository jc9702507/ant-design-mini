async function request(keyword) {
  await new Promise(r => setTimeout(r, 1000));
  return new Array(10).fill().map((item, index) => `${index}-${keyword}`);
}

Page({
  data: {
    searchRecommendList: [],
    value: '',
    loading: false,
  },
  async onChange(value, e) {
    this.setData({
      value,
    });
    if (!value) {
      this.setData({
        loading: false,
      });
      return;
    }
    this.setData({
      loading: true,
    });
    const keyword = value;
    try {
      const searchRecommendList = await request(keyword);
      if (keyword !== this.data.value) {
        return;
      }
      this.setData({
        searchRecommendList,
      });
    } catch(err) {
    }
    finally {
      if (keyword !== this.data.value) {
        return;
      }
      this.setData({
        loading: false,
      });
    }
  },
  onConfirm(value) {
    my.alert({
      content: value,
    });
  },
  onTap(e) {
    const index = e.currentTarget.dataset.index;
    const value = this.data.searchRecommendList[index];
    my.alert({
      content: value,
    });
  }
});
