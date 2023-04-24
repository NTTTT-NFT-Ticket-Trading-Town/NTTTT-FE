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

- Gatcha

```
  - refresh_count
  - gatcha llist
    - gatcha
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
  - gatcha list # Gatcha - gatcha list 참고
  - category
```
