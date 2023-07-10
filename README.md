### Preview

<div
  style="
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    "
>

![preview](./public/NTTTT_시연영상.gif)

</div>

### Start

- Dev mode: `npm run dev`

### Dependencies

- vite
- react.js
- react-router-dom
- redux
- reduxjs/toolkit
- axios
- tailwind
- framer motion

### States

- User

```
   - session
```

- Artist

```
  - searchParams
  - artist list
    - artist
      - name
      - image_url
```

- Gacha

```
  - refresh_count
  - gacha llist
    - gacha
      - event
        - title
        - publisher
        - total_token
      - artist
      - price
      - image_url
      - watchers
      - description
      - token_id
```

- Payment

```
  - option : ['card', 'eth']
  - phone
  - wallet
  - agree
```

- Mypage

```
  - gacha list # Gacha - gacha list 참고
  - category
```
