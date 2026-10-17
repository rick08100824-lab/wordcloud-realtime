# ☁️ 課堂文字雲（即時版）

用 Firebase Firestore 打造的課堂即時文字雲。學生用手機輸入答案，老師的展示頁**馬上**出現（不需要重新整理）。

- 建立日期：2026-10-17
- Firebase 專案：`my-teaching-tools-7cc8a`
- Firestore 集合：`wordcloud_words`

---

## 兩個頁面

| 檔案 | 誰用 | 功能 |
|------|------|------|
| `index.html` | **學生**（手機） | 輸入答案，送出後立即看到統計 |
| `display.html` | **老師**（投影機） | 即時文字雲、熱門字放大、最後更新時間、全螢幕按鈕 |

## 資料怎麼流動

```
學生手機輸入
   ↓  寫入 Firestore：wordcloud_words/{答案}
老師投影畫面
   ←  onSnapshot 監聽 → 有人送出就自動更新（約 0.5 秒內）
```

每一筆文件長這樣（同一個答案送兩次會累加，不會變成兩筆）：

```json
{
  "word": "三角形",
  "count": 5,
  "updatedAt": "2026-10-17T09:13:55Z"
}
```

---

## 本機測試

```powershell
cd C:\Users\n0943\Documents\wordcloud-realtime
python -m http.server 8766
```

- 學生頁：http://localhost:8766/index.html
- 展示頁：http://localhost:8766/display.html

---

## 常用指令（對 AI 說即可）

| 你說的話 | 會做的事 |
|----------|----------|
| 「清空文字雲資料」 | 刪除 `wordcloud_words` 內所有文件 |
| 「文字雲現在有幾個詞、最熱門的是什麼」 | 直接查 Firestore 統計 |
| 「改文字雲的主題色」 | 修改 `display.html` 的 `--accent` 等變數 |
| 「部署 Firestore 規則」 | 執行 `firebase deploy --only firestore:rules` |
| 「把文字雲推上 GitHub Pages」 | 建立 repo、推送、開 Pages |

---

## 安全性與隱私

- **只存答案，不存姓名**：這是刻意的設計，符合去識別化原則
- `firebase-config.js` 裡的 `apiKey` 是**前端公開設定**，不是機密；真正的保護在 `firestore.rules`
- 目前規則（示範用白名單，任何人可讀寫）：

```
match /wordcloud_words/{document} {
  allow read, write: if true;   // 只適合課堂 demo
}
```

> ⚠️ 正式長期使用時，建議改成「只能新增、不能任意修改」或加上班級碼驗證。
> 其他集合在規則中一律 `if false`（禁止存取）。

---

## 已知問題（firebase-tools 15.34.0）

- `firestore_query_collection`（MCP 工具）目前 100% 失敗，回 `The requested 'read_time' cannot be in the future.`
- 這是**上游 bug**，已排除時區因素（`TZ=UTC` 一樣失敗）
- **替代做法**：改用 `firestore_list_documents` 讀取，需要篩選與統計時在程式端處理

---

## 檔案清單

```
wordcloud-realtime/
├── index.html          學生輸入頁
├── display.html        展示頁（即時文字雲）
├── firebase-config.js  Firebase 前端設定 + 集合名稱
└── README.md           本文件
```
