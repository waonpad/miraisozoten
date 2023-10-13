FROM node:18.18.0-alpine AS builder
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:18.18.0-alpine AS installer
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json
RUN yarn install --frozen-lockfile

FROM node:18.18.0-alpine AS sourcer
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN yarn turbo run build --scope=api --include-dependencies --no-deps

FROM node:18.18.0-alpine as runner
WORKDIR /app
COPY --from=sourcer /app/ .

# CMD [ "node", "apps/api/dist/main.js" ]

# planetscale使う場合migrateじゃなくてdb pushじゃないといけない
# そもそも別でデータベースは触った方がいいね～

# CMD [ "sh", "-c", "yarn prisma migrate deploy && node apps/api/dist/main.js" ]
CMD [ "sh", "-c", "yarn prisma db push && node apps/api/dist/src/main.js" ]