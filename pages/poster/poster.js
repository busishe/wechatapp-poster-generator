// pages/poster/poster.js.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    testList: ["test1", "test2", "test3", "test4"],
    picTempPath: '',
    posterPicPath: [],
    contentList: [{ "title": "测试标题", "content": "长的文本,超级长的文本超级长的文本超级长的文本，超级长的文本，超级长的文本超级长的文本超级长的asdfasdfasdf文本超级长的文本超级asdfasdf长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本，超级3；长的文本超级“长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本,超级长的文本,超级长的文ertw本,超级长的文本,超级长的文本,超级长的文本,超级长的文本,超级长的文本,超级长的文本,超级长的文本超级长的文本超级长的文本，超级长的文本，超级长的文本超级长的文,长的文本，超级长的文本，超级长的文本超级长的文本超级长的asdfasdfasdf文本超级长的文本超级asdfasdf长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本，超级3；长的文本超级“长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本,超级长的文本,超级长的文ertw本,超级长的文本,超级长的文本,超级长的文本,超级长的文本,超级长的文本,超级长的文本,超级长的文本超级长的文本超级长的文本，超级长的文本，超级长的文本超级长的文" }, { "title": "测试标题", "content": "不太长的文本,不太长的文本,不太长的文本,不太长的文本,不太长的文本," }, { "title": "测试标题", "content": "不太长的文本,不太长的文本,不太长的文本,不太长的文本,不太长的文本," }, { "title": "测试标题", "content": "不太长的文本,不太长的文本,不太长的文本,不太长的文本,不太长的文本," }, { "title": "测试标题", "content": "不太长的文本,不太长的文本,不太长的文本,不太长的文本,不太长的文本," }],
    content: '的文本超级长的asdfasdfasdf文本超级长的文本超级asdfasdf长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本，超级3；长的文本超级“长的文本超级长的文本超级长的文本超级长的文本超级长的文本超级长的文本,超级长的文本,超级长的文ertw本,超级长的文本,超级长的文本,超级长的文本,超级长的文本,超级长的文本,超级长的文本,超级长的文本超级长的文本超级长的文本，超级长的文本，超级长的文本超级长的文本超级长的asdfasdfasdf文本超级长的文本超级asdfasdf长的文。本超级长的文本超级长的文本超级长的文本超级长的文本超级',
    style1: { font: "28px 宋体 bold", color: "#000000" }
  },
  onlyDrawPic() {

    //list like [{"title":"标题","content":"正文"}]
    wx.createSelectorQuery().select('#myCanvas').fields({ node: true, size: true })
      .exec((res) => {
        const textCanvas = res[0].node
        let maxRowWidth = 580
        let resp = this.getContentCanvasInfo(textCanvas, this.data.contentList, maxRowWidth)
        console.log(resp)
        this.drawPic(textCanvas, 750, '/pages/images/header.png', '/pages/images/content.png', '/pages/images/footer.png', maxRowWidth, resp)
      })
  },
  getContentCanvasInfo(canvasObj, contentList, maxRowWidth) {
    const charList = new RegExp("[，。,.:：?？!！@()（）;；“”\"\"]")
    let canvas = canvasObj
    canvas.width = 750
    canvas.height = 100
    let textCtx = canvas.getContext('2d')
    textCtx.font = "28px 宋体"
    let contentCanvasInfoList = []
    console.log("maxwidth" + maxRowWidth)

    for (let item of contentList) {
      let contentCanvasInfoItem = { 'rowContentList': [], 'contentRows': 0, 'title': '' }
      let rowContentList = [] //段落数组
      let rowContent = '' //临时行内容
      for (let char of item.content) {
        //todo 判断是否为换行符
        if (textCtx.measureText(rowContent + char).width >= maxRowWidth) {
          //大于宽度，换行
          //标点判断，如果是标点符号则不换行
          if (charList.test(char)) {
            rowContent += char
          } else {
            rowContentList.push(rowContent)
            rowContent = char
          }
        } else {
          //小于宽度，继续加
          rowContent += char
        }
      }
      //若不足一行加到list中
      if (rowContent.length != 0) {
        rowContentList.push(rowContent)
      }
      contentCanvasInfoItem.rowContentList = rowContentList
      contentCanvasInfoItem.contentRows = rowContentList.length
      contentCanvasInfoItem.title = item.title
      contentCanvasInfoList.push(contentCanvasInfoItem)
    }
    return contentCanvasInfoList
  },

  drawPic(canvasObj, picWidth, headerPath, contentPath, footerPath, maxRowWidth, contentCanvasInfoList) {
    for (let i = 0; i < contentCanvasInfoList.length; i++) {
      setTimeout(() => {
        let canvas = canvasObj
        //this.drawPic(canvas, 750, '/pages/images/header.png', '/pages/images/content.png', '/pages/images/footer.png', maxRowWidth, contentCanvasInfoList[i])
        let contentCanvasInfo = contentCanvasInfoList[i]
        let contentTopMargin = 10
        //初始化画布，宽度固定，高度未知
        canvas.height = 10
        canvas.width = picWidth //真实宽度
        let textCtx = canvas.getContext('2d')
        let headerPic = canvas.createImage()
        headerPic.src = headerPath
        let contentPic = canvas.createImage()
        contentPic.src = contentPath
        let footerPic = canvas.createImage()
        footerPic.src = footerPath
        let rowContentList = contentCanvasInfo.rowContentList
        //计算实际图片高度 = header + 文字上边距 + (字体大小+行间距)*行高 + footer
        //绘制header
        headerPic.onload = () => {
          //绘制文字底色
          contentPic.onload = () => {
            //绘制footer
            footerPic.onload = () => {
              canvas.height = headerPic.height + contentTopMargin + contentCanvasInfo.contentRows * (28 + 8) + footerPic.height //真实高度
              canvas.width = picWidth //真实宽度
              textCtx.drawImage(headerPic, 0, 0, picWidth, headerPic.height)
              //Y轴从header下方开始绘制，高度为内容高度
              textCtx.drawImage(contentPic, 0, headerPic.height, picWidth, contentTopMargin + contentCanvasInfo.contentRows * 36)
              //Y轴从文字下方开始绘制
              textCtx.drawImage(footerPic, 0, headerPic.height + contentTopMargin + contentCanvasInfo.contentRows * 36, picWidth, footerPic.height)
            }
          }
        }

        //设置延时，等待图片绘制完成
        setTimeout(() => {
          //绘制文字
          textCtx.font = "28px 宋体 bold"
          textCtx.fillStyle = "#ffffff"
          //绘制标题
          textCtx.fillText(contentCanvasInfo.title, 80, 50)
          //绘制正文
          textCtx.font = "28px 宋体"
          textCtx.fillStyle = "#000000"
          //文字起始X坐标
          let contextStartX = (picWidth - maxRowWidth) / 2
          for (let i = 0; i < rowContentList.length; i++) {
            textCtx.fillText(rowContentList[i], contextStartX, (i + 1) * 36 + headerPic.height + contentTopMargin)
          }

          setTimeout(() => {
            wx.canvasToTempFilePath({
              canvas: canvas,
              success: res => {
                // 生成的图片临时文件路径
                let posterPicPath = this.data.posterPicPath
                posterPicPath.push(res.tempFilePath)
                //this.setData({ picTempPath: res.tempFilePath })
                this.setData({ posterPicPath: posterPicPath })
                console.log(res.tempFilePath)
                //生成成功后，清空画布
                //textCtx.restore()
                textCtx.width = picWidth
                textCtx.height = 100
                console.log(1)
              },
            })
            //等待canvas转图片延时
          }, 1000)
          //绘制背景图延时
        }, 1500)
      }, i * 3000);
    }
  },

  savePic() {
    console.log(this.data.picTempPath)
    wx.saveImageToPhotosAlbum({
      filePath: this.data.picTempPath
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initCanvas
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
    console.log(getCurrentPages())
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