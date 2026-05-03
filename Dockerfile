# 1. Aşama: React uygulamasını derleme
FROM node:22-alpine AS builder

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılık dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Proje dosyalarını kopyala
COPY . .

# React uygulamasını derle (Vite build)
RUN npm run build

# 2. Aşama: Nginx ile statik dosyaları sunma
FROM nginx:stable-alpine

# Derlenen dosyaları Nginx'in varsayılan dizinine kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx yapılandırması
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 80 portunu dışarı aç
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"]
