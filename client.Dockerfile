FROM node:18-alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_CHANNEL_IO_KEY
ARG NEXT_PUBLIC_IMAGE_URL
ARG NEXT_PUBLIC_STAGE
ARG NEXT_PUBLIC_SHOW_LOGIN_MODAL_FF
ARG NEXT_PUBLIC_NEIS_API_KEY

ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_CHANNEL_IO_KEY=$NEXT_PUBLIC_CHANNEL_IO_KEY
ENV NEXT_PUBLIC_IMAGE_URL=$NEXT_PUBLIC_IMAGE_URL
ENV NEXT_PUBLIC_STAGE=$NEXT_PUBLIC_STAGE
ENV NEXT_PUBLIC_SHOW_LOGIN_MODAL_FF=$NEXT_PUBLIC_SHOW_LOGIN_MODAL_FF
ENV NEXT_PUBLIC_NEIS_API_KEY=$NEXT_PUBLIC_NEIS_API_KEY

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install --frozen-lockfile
RUN pnpm client build

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/apps/client/.next/standalone ./
COPY --from=builder /app/apps/client/.next/static ./apps/client/.next/static
COPY --from=builder /app/apps/client/public ./apps/client/public

CMD ["node", "apps/client/server.js"]
