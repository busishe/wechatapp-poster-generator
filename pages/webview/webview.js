// pages/webview/webview.js
Page({
  getMessage(e) {
    //接收webview消息
    console.log("接受到消息")
    console.log(e)
    let img = e.detail.data[0].imgData
    wx.getFileSystemManager().writeFile({
      filePath: wx.env.USER_DATA_PATH + '/tempposter.png',
      data: img.slice(22),
      encoding: 'base64',
      success: res => {
        wx.previewImage({
          urls: [wx.env.USER_DATA_PATH + '/tempposter.png'] // 需要预览的图片http链接列表
        })
        wx.saveImageToPhotosAlbum({
          filePath: wx.env.USER_DATA_PATH + '/tempposter.png',
          success: res => {
            wx.showToast({
              title: '保存成功',
            })
          },
          fail: error => {
            console.log(error)
          }
        })
      },
      fail: error => {
        console.log(error)
      }
    })

  },



  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})