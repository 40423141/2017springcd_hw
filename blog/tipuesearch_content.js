var tipuesearch = {"pages":[{"text":"2016Fall 修課成員網誌","title":"About","url":"./pages/about/","tags":"misc"},{"text":"第十六週 協同產品設計實習第十六週練習 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } # 導入 browser 模組中的 document, 並設為 doc 變數 from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) # 準備在 id=\"gear4\" 的 canvas 中繪圖 canvas = doc[\"gear4\"] ctx = canvas.getContext(\"2d\") # 模數決定齒的尺寸大小, 囓合齒輪組必須有相同的模數與壓力角 # 壓力角 pa 單位為角度 pa = 20 # 第1齒輪齒數 n_g1 = 14 # 第2齒輪齒數 n_g2 = 16 # 第3齒輪齒數 n_g3 = 18 # 第4齒輪齒數 n_g4 = 20 # 第5齒輪齒數 n_g5 = 22 # 第6齒輪齒數 n_g6 = 24 # 第7齒輪齒數 n_g7 = 26 # 第8齒輪齒數 n_g8 = 28 # 第8齒輪齒數 n_g9 = 30 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 m = (0.6*canvas.width)/(n_g1+n_g2+n_g3+n_g4) # 根據模數 m, 計算各齒輪的節圓半徑 rp_g1 = m*n_g1/2 rp_g2 = m*n_g2/2 rp_g3 = m*n_g3/2 rp_g4 = m*n_g4/2 rp_g5 = m*n_g5/2 rp_g6 = m*n_g6/2 rp_g7 = m*n_g7/2 rp_g8 = m*n_g8/2 rp_g9 = m*n_g9/2 #單一正齒輪繪圖呼叫格式 Spur(ctx).Gear(x, y, r, n, pa, \"red\") # 開始繪製囓合齒輪輪廓 # 繪圖第1齒輪的圓心座標, 因為希望繪圖佔去 canvas.width 的 80%, 所以兩邊各預留 10% 距離 x_g1 = canvas.width*0.05+rp_g1 # y 方向繪圖區域上方預留 canvas.height 的 20% y_g1 = canvas.height*0.1+rp_g1 # 第2齒輪的圓心座標, 假設排列成水平, 表示各齒輪圓心 y 座標相同 x_g2 = x_g1 + rp_g1 + rp_g2 y_g2 = y_g1 # 第3齒輪的圓心座標 x_g3 = x_g1 + rp_g1 + 2*rp_g2 + rp_g3 y_g3 = y_g1 # 第4齒輪的圓心座標 x_g4 = x_g1 + rp_g1 + 2*rp_g2 + 2*rp_g3+rp_g4 y_g4 = y_g1 # 第5齒輪的圓心座標 x_g5 = x_g1 + rp_g1 + 2*rp_g2 + 2*rp_g3+rp_g4 y_g5 = y_g4+rp_g4+rp_g5 # 第6齒輪的圓心座標 x_g6 =x_g1 + rp_g1 + 2*rp_g2 + 2*rp_g3+rp_g4 y_g6 = y_g5+rp_g5+rp_g6 # 第7齒輪的圓心座標 x_g7 =x_g6-rp_g6-rp_g7 y_g7 = y_g5+rp_g5+rp_g6 # 第8齒輪的圓心座標 x_g8 =x_g7-rp_g7-rp_g8 y_g8 = y_g5+rp_g5+rp_g6 # 第8齒輪的圓心座標 x_g8 =x_g7-rp_g7-rp_g8 y_g8 = y_g5+rp_g5+rp_g6 # 第9齒輪的圓心座標 x_g9 =x_g7-rp_g7-rp_g8 y_g9 = y_g8+rp_g8+rp_g9 # 將第1齒輪順時鐘轉 90 度, 也就是 math.pi/2 # 使用 ctx.save() 與 ctx.restore() 以確保各齒輪以相對座標進行旋轉繪圖 ctx.save() # translate to the origin of second gear ctx.translate(x_g1, y_g1) # rotate to engage ctx.rotate(math.pi/2) # put it back ctx.translate(-x_g1, -y_g1) # 繪製第一個齒輪輪廓 Spur(ctx).Gear(x_g1, y_g1, rp_g1, n_g1, pa, \"red\") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#0000FF\" ctx.font = \"20px ScriptS\" ctx.fillText(\"40423114 \",x_g1-20, y_g1) ctx.stroke() # 將第2齒輪逆時鐘轉 90 度之後, 再多轉一齒, 以便與第1齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g2, y_g2) # rotate to engage ctx.rotate(-math.pi/2-math.pi/n_g2) # put it back ctx.translate(-x_g2, -y_g2) Spur(ctx).Gear(x_g2, y_g2, rp_g2, n_g2, pa, \"orange\") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#0000FF\" ctx.font = \"20px ScriptS\" ctx.fillText(\"40423120 \",x_g2-20, y_g2) ctx.stroke() # 將第3齒輪逆時鐘轉 90 度之後, 再往回轉第2齒輪定位帶動轉角, 然後再逆時鐘多轉一齒, 以便與第2齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g3, y_g3) # rotate to engage # math.pi+math.pi/n_g2 為第2齒輪從順時鐘轉 90 度之後, 必須配合目前的標記線所作的齒輪 2 轉動角度, 要轉換到齒輪3 的轉動角度 # 必須乘上兩齒輪齒數的比例, 若齒輪2 大, 則齒輪3 會轉動較快 # 第1個 -math.pi/2 為將原先垂直的第3齒輪定位線逆時鐘旋轉 90 度 # -math.pi/n_g3 則是第3齒與第2齒定位線重合後, 必須再逆時鐘多轉一齒的轉角, 以便進行囓合 # (math.pi+math.pi/n_g2)*n_g2/n_g3 則是第2齒原定位線為順時鐘轉動 90 度, # 但是第2齒輪為了與第1齒輪囓合, 已經距離定位線, 多轉了 180 度, 再加上第2齒輪的一齒角度, 因為要帶動第3齒輪定位, # 這個修正角度必須要再配合第2齒與第3齒的轉速比加以轉換成第3齒輪的轉角, 因此乘上 n_g2/n_g3 ctx.rotate(-math.pi/2-math.pi/n_g3+(math.pi+math.pi/n_g2)*n_g2/n_g3) # put it back ctx.translate(-x_g3, -y_g3) Spur(ctx).Gear(x_g3, y_g3, rp_g3, n_g3, pa, \"yellow\") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#0000FF\" ctx.font = \"20px ScriptS\" ctx.fillText(\"40423123 \",x_g3-20, y_g3) ctx.stroke() # 將第4齒輪逆時鐘轉 90 度之後, 再往回轉第3齒輪定位帶動轉角, 然後再逆時鐘多轉一齒, 以便與第2齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g4, y_g4) # rotate to engage ctx.rotate(math.pi/2-math.pi/n_g4+(math.pi+math.pi/n_g3)*n_g3/n_g4*2) # put it back ctx.translate(-x_g4, -y_g4) Spur(ctx).Gear(x_g4, y_g4, rp_g4, n_g4, pa, \"green\") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#0000FF\" ctx.font = \"20px ScriptS\" ctx.fillText(\"40423124 \",x_g4-20, y_g4) ctx.stroke() # 將第5齒輪逆時鐘轉 90 度之後, 再往回轉第3齒輪定位帶動轉角, 然後再逆時鐘多轉一齒, 以便與第2齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g5, y_g5) # rotate to engage ctx.rotate(math.pi/2-math.pi/n_g5+(math.pi+math.pi/n_g4)*n_g4/n_g5*2) # put it back ctx.translate(-x_g5, -y_g5) Spur(ctx).Gear(x_g5, y_g5, rp_g5, n_g5, pa, \"blue\") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#0000FF\" ctx.font = \"20px ScriptS\" ctx.fillText(\"40423141 \",x_g5-20, y_g5) ctx.stroke() # 將第6齒輪逆時鐘轉 90 度之後, 再往回轉第3齒輪定位帶動轉角, 然後再逆時鐘多轉一齒, 以便與第2齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g6, y_g6) # rotate to engage ctx.rotate(math.pi/2-math.pi/n_g6+(math.pi+math.pi/n_g5)*n_g5/n_g6*2) # put it back ctx.translate(-x_g6, -y_g6) Spur(ctx).Gear(x_g6, y_g6, rp_g6, n_g6, pa, \"green\") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#0000FF\" ctx.font = \"20px ScriptS\" ctx.fillText(\"40423143 \",x_g6-20, y_g6) ctx.stroke() # 將第7齒輪逆時鐘轉 90 度之後, 再往回轉第3齒輪定位帶動轉角, 然後再逆時鐘多轉一齒, 以便與第2齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g7, y_g7) # rotate to engage ctx.rotate(-math.pi/2-math.pi/n_g7+(math.pi+math.pi/n_g6)*n_g6/n_g7) # put it back ctx.translate(-x_g7, -y_g7) Spur(ctx).Gear(x_g7, y_g7, rp_g7, n_g7, pa, \"yellow\") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#0000FF\" ctx.font = \"20px ScriptS\" ctx.fillText(\"40423146 \",x_g7-20, y_g7) ctx.stroke() # 將第8齒輪逆時鐘轉 90 度之後, 再往回轉第3齒輪定位帶動轉角, 然後再逆時鐘多轉一齒, 以便與第2齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g8, y_g8) # rotate to engage ctx.rotate(-math.pi/2-math.pi/n_g8+(math.pi+math.pi/n_g7)*n_g7/n_g8*2) # put it back ctx.translate(-x_g8, -y_g8) Spur(ctx).Gear(x_g8, y_g8, rp_g8, n_g8, pa, \"orange\") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#0000FF\" ctx.font = \"20px ScriptS\" ctx.fillText(\"40443147 \",x_g8-20, y_g8) ctx.stroke() # 將第9齒輪逆時鐘轉 90 度之後, 再往回轉第3齒輪定位帶動轉角, 然後再逆時鐘多轉一齒, 以便與第2齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g9, y_g9) # rotate to engage ctx.rotate(-math.pi/2-math.pi/n_g9+(math.pi+math.pi/n_g7)*n_g7/n_g9*2) # put it back ctx.translate(-x_g9, -y_g9) Spur(ctx).Gear(x_g9, y_g9, rp_g9, n_g9, pa, \"purple\") ctx.restore() ctx.beginPath() ctx.fillStyle = \"#0000FF\" ctx.font = \"20px ScriptS\" ctx.fillText(\"40443154 \",x_g9-20, y_g9) ctx.stroke()","title":"第十六週作業","url":"./di-shi-liu-zhou-zuo-ye.html","tags":"seat table"},{"text":"第十七週 40423141-2017springcd-final-4 from 黃羿誠 on Vimeo .","title":"第十七週作業","url":"./di-shi-qi-zhou-zuo-ye.html","tags":"seat table"},{"text":"第十五週 協同產品設計實習第十五週練習 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } # 導入 browser 模組中的 document, 並設為 doc 變數 from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) # 準備在 id=\"gear3\" 的 canvas 中繪圖 canvas = doc[\"gear3\"] ctx = canvas.getContext(\"2d\") # 模數決定齒的尺寸大小, 囓合齒輪組必須有相同的模數與壓力角 # 壓力角 pa 單位為角度 pa = 20 # 第1齒輪齒數 n_g1 = 36 # 第2齒輪齒數 n_g2 = 11 # 第3齒輪齒數 n_g3 = 13 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 m = (0.8*canvas.width)/(n_g1+n_g2+n_g3) # 根據模數 m, 計算各齒輪的節圓半徑 rp_g1 = 250 rp_g2 = m*n_g2/2 rp_g3 = m*n_g3/2 #單一正齒輪繪圖呼叫格式 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") # 開始繪製囓合齒輪輪廓 # 繪圖第1齒輪的圓心座標, 因為希望繪圖佔去 canvas.width 的 80%, 所以兩邊各預留 10% 距離 x_g1 = canvas.width*0.1+rp_g1 # y 方向繪圖區域上方預留 canvas.height 的 20% y_g1 = canvas.height*0.1+rp_g1 # 第2齒輪的圓心座標, 假設排列成水平, 表示各齒輪圓心 y 座標相同 # 第3齒輪的圓心座標 x_g3 = x_g1 + rp_g1 + 2*rp_g2 + rp_g3 y_g3 = y_g1 # 將第1齒輪順時鐘轉 90 度, 也就是 math.pi/2 # 使用 ctx.save() 與 ctx.restore() 以確保各齒輪以相對座標進行旋轉繪圖 # 繪製第一個齒輪輪廓 Spur(ctx).Gear(x_g1, y_g1, rp_g1, n_g1, pa, \"black\") ctx.restore() # 將第2齒輪逆時鐘轉 90 度之後, 再多轉一齒, 以便與第1齒輪進行囓合 ctx.beginPath() ctx.fillStyle = \"#0000FF\" ctx.font = \"30px ScriptS\" ctx.fillText(\"40423141\",(canvas.width)/2-130,(canvas.height)/2+25) ctx.stroke()","title":"第十五週作業","url":"./di-shi-wu-zhou-zuo-ye.html","tags":"seat table"},{"text":"第十二週 三種正齒輪嚙合 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } # 導入 browser 模組中的 document, 並設為 doc 變數 from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) # 準備在 id=\"gear3\" 的 canvas 中繪圖 canvas = doc[\"gear3\"] ctx = canvas.getContext(\"2d\") # 模數決定齒的尺寸大小, 囓合齒輪組必須有相同的模數與壓力角 # 壓力角 pa 單位為角度 pa = 20 # 第1齒輪齒數 n_g1 = 17 # 第2齒輪齒數 n_g2 = 11 # 第3齒輪齒數 n_g3 = 13 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 m = (0.8*canvas.width)/(n_g1+n_g2+n_g3) # 根據模數 m, 計算各齒輪的節圓半徑 rp_g1 = m*n_g1/2 rp_g2 = m*n_g2/2 rp_g3 = m*n_g3/2 #單一正齒輪繪圖呼叫格式 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") # 開始繪製囓合齒輪輪廓 # 繪圖第1齒輪的圓心座標, 因為希望繪圖佔去 canvas.width 的 80%, 所以兩邊各預留 10% 距離 x_g1 = canvas.width*0.1+rp_g1 # y 方向繪圖區域上方預留 canvas.height 的 20% y_g1 = canvas.height*0.2+rp_g1 # 第2齒輪的圓心座標, 假設排列成水平, 表示各齒輪圓心 y 座標相同 x_g2 = x_g1 + rp_g1 + rp_g2 y_g2 = y_g1 # 第3齒輪的圓心座標 x_g3 = x_g1 + rp_g1 + 2*rp_g2 + rp_g3 y_g3 = y_g1 # 將第1齒輪順時鐘轉 90 度, 也就是 math.pi/2 # 使用 ctx.save() 與 ctx.restore() 以確保各齒輪以相對座標進行旋轉繪圖 ctx.save() # translate to the origin of second gear ctx.translate(x_g1, y_g1) # rotate to engage ctx.rotate(math.pi/2) # put it back ctx.translate(-x_g1, -y_g1) # 繪製第一個齒輪輪廓 Spur(ctx).Gear(x_g1, y_g1, rp_g1, n_g1, pa, \"black\") ctx.restore() # 將第2齒輪逆時鐘轉 90 度之後, 再多轉一齒, 以便與第1齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g2, y_g2) # rotate to engage ctx.rotate(-math.pi/2-math.pi/n_g2) # put it back ctx.translate(-x_g2, -y_g2) Spur(ctx).Gear(x_g2, y_g2, rp_g2, n_g2, pa, \"blue\") ctx.restore() # ctx.save() # translate to the origin of second gear ctx.translate(x_g3, y_g3) # rotate to engage ctx.rotate(-math.pi/2-math.pi/n_g3) # put it back ctx.translate(-x_g3, -y_g3) Spur(ctx).Gear(x_g3, y_g3, rp_g3, n_g3, pa, \"black\") ctx.restore()","title":"第十二週作業","url":"./di-shi-er-zhou-zuo-ye.html","tags":"seat table"},{"text":"第七週 W7 八連桿組裝 from 黃羿誠 on Vimeo .","title":"第七週作業","url":"./di-qi-zhou-zuo-ye.html","tags":"seat table"},{"text":"第六週 因為版本更新導致的上傳錯誤,把plugin/liquid_tags裡的READMEMD刪掉就能正常上傳了 W6 組裝 from 黃羿誠 on Vimeo . W6 四連桿 V-rep from 黃羿誠 on Vimeo .","title":"第六週作業","url":"./di-liu-zhou-zuo-ye.html","tags":"seat table"},{"text":"第五週 W5 運轉 from 黃羿誠 on Vimeo . w5 組裝 from 黃羿誠 on Vimeo .","title":"第五週作業","url":"./di-wu-zhou-zuo-ye.html","tags":"seat table"},{"text":"第四週 wiki","title":"第四週作業","url":"./di-si-zhou-zuo-ye.html","tags":"seat table"},{"text":"第三週 錄製_2017_03_04_21_24_50_930 from 黃羿誠 on Vimeo .","title":"第三週作業","url":"./di-san-zhou-zuo-ye.html","tags":"seat table"},{"text":"第二週 錄製_2017_03_04_21_16_48_679 from 黃羿誠 on Vimeo .","title":"第二週作業","url":"./di-er-zhou-zuo-ye.html","tags":"seat table"},{"text":"設計二甲座位表 seet","title":"設計二甲座位表","url":"./she-ji-er-jia-zuo-wei-biao.html","tags":"seat table"},{"text":"上課筆記 1.利用solvespace及onshape組裝四連桿機構 2.ipv4和ipv6設定 3.分組方式,如何更有效的決定 4.小組組織跟分工的重要性 5.要主動教導不會的同學 6.ipcofig設定 更改stunnel設定檔ip位址 錄製_2017_03_04_21_00_43_499 from 黃羿誠 on Vimeo . 上課心得:第一周上課,分組應要有更有效率的辦法,小組要多溝通分工,雖然組員都不是很會但相信第二組是可以的","title":"協同產品設計實習 第一周簡報","url":"./xie-tong-chan-pin-she-ji-shi-xi-di-yi-zhou-jian-bao.html","tags":"PPT"}]};