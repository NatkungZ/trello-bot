# jocular-meow
nodejs facebook api (simple http get)

dependency github.com/schmavery/facebook-chat-api

# use
`docker build -t fb-chat .  `  
Set Username and Password via environment variable and run
```
docker run -d -e FB_LOGIN_EMAIL="my-fb@email.com" -e FB_PASSWORD="my-password" -p 8000:8000 fb-chat
```
Go to localhost:8000
# trello-bot
