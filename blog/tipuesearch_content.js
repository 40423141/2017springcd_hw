var tipuesearch = {"pages":[{"url":"./pages/about/","title":"About","text":"2016Fall 修課成員網誌","tags":"misc"},{"url":"./di-liu-zhou-zuo-ye.html","title":"第六週作業","text":"第六週 因為版本更新導致的上傳錯誤,把plugin/liquid_tags裡的READMEMD刪掉就能正常上傳了 W6 組裝 from 黃羿誠 on Vimeo . W6 四連桿 V-rep from 黃羿誠 on Vimeo .","tags":"seat table"},{"url":"./di-qi-zhou-zuo-ye.html","title":"第七週作業","text":"第七週 W7 八連桿組裝 from 黃羿誠 on Vimeo .","tags":"seat table"},{"url":"./di-shi-er-zhou-zuo-ye.html","title":"第十二週作業","text":"第十二週 解釋為何需要減機、何謂漸開線.....等等 繪製齒輪 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } 正齒輪嚙合的協同繪圖 (13t-17t): # 導入 browser 模組中的 document, 並設為 doc 變數 from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) # 準備在 id=\"gear3\" 的 canvas 中繪圖 canvas = doc[\"gear3\"] ctx = canvas.getContext(\"2d\") # 模數決定齒的尺寸大小, 囓合齒輪組必須有相同的模數與壓力角 # 壓力角 pa 單位為角度 pa = 20 # 第1齒輪齒數 n_g1 = 13 # 第2齒輪齒數 n_g2 = 17 # 第3齒輪齒數 n_g3 = 11 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 m = (0.8*canvas.width)/(n_g1+n_g2+n_g3) # 根據模數 m, 計算各齒輪的節圓半徑 rp_g1 = m*n_g1/2 rp_g2 = m*n_g2/2 rp_g3 = m*n_g3/2 #單一正齒輪繪圖呼叫格式 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") # 開始繪製囓合齒輪輪廓 # 繪圖第1齒輪的圓心座標, 因為希望繪圖佔去 canvas.width 的 80%, 所以兩邊各預留 10% 距離 x_g1 = canvas.width*0.1+rp_g1 # y 方向繪圖區域上方預留 canvas.height 的 20% y_g1 = canvas.height*0.2+rp_g1 # 第2齒輪的圓心座標, 假設排列成水平, 表示各齒輪圓心 y 座標相同 x_g2 = x_g1 + rp_g1 + rp_g2 y_g2 = y_g1 # 第3齒輪的圓心座標 x_g3 = x_g1 + rp_g1 + 2*rp_g2 + rp_g3 y_g3 = y_g1 # 將第1齒輪順時鐘轉 90 度, 也就是 math.pi/2 # 使用 ctx.save() 與 ctx.restore() 以確保各齒輪以相對座標進行旋轉繪圖 ctx.save() # translate to the origin of second gear ctx.translate(x_g1, y_g1) # rotate to engage ctx.rotate(math.pi/2) # put it back ctx.translate(-x_g1, -y_g1) # 繪製第一個齒輪輪廓 Spur(ctx).Gear(x_g1, y_g1, rp_g1, n_g1, pa, \"blue\") ctx.restore() # 將第2齒輪逆時鐘轉 90 度之後, 再多轉一齒, 以便與第1齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g2, y_g2) # rotate to engage ctx.rotate(-math.pi/2-math.pi/n_g2) # put it back ctx.translate(-x_g2, -y_g2) Spur(ctx).Gear(x_g2, y_g2, rp_g2, n_g2, pa, \"black\") ctx.restore()","tags":"seat table"},{"url":"./di-wu-zhou-zuo-ye.html","title":"第五週作業","text":"第五週 W5 運轉 from 黃羿誠 on Vimeo . w5 組裝 from 黃羿誠 on Vimeo .","tags":"seat table"},{"url":"./di-si-zhou-zuo-ye.html","title":"第四週作業","text":"第四週 wiki","tags":"seat table"},{"url":"./di-san-zhou-zuo-ye.html","title":"第三週作業","text":"第三週 錄製_2017_03_04_21_24_50_930 from 黃羿誠 on Vimeo .","tags":"seat table"},{"url":"./di-er-zhou-zuo-ye.html","title":"第二週作業","text":"第二週 錄製_2017_03_04_21_16_48_679 from 黃羿誠 on Vimeo .","tags":"seat table"},{"url":"./she-ji-er-jia-zuo-wei-biao.html","title":"設計二甲座位表","text":"設計二甲座位表 seet","tags":"seat table"},{"url":"./xie-tong-chan-pin-she-ji-shi-xi-di-yi-zhou-jian-bao.html","title":"協同產品設計實習 第一周簡報","text":"上課筆記 1.利用solvespace及onshape組裝四連桿機構 2.ipv4和ipv6設定 3.分組方式,如何更有效的決定 4.小組組織跟分工的重要性 5.要主動教導不會的同學 6.ipcofig設定 更改stunnel設定檔ip位址 錄製_2017_03_04_21_00_43_499 from 黃羿誠 on Vimeo . 上課心得:第一周上課,分組應要有更有效率的辦法,小組要多溝通分工,雖然組員都不是很會但相信第二組是可以的","tags":"PPT"}]};