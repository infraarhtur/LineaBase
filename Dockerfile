FROM node as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

# run tests
# This tests may be cover by CI (Jenkins)
#RUN ng test --watch=false
#RUN ng e2e --port 4202

# generate build
RUN ng build --output-path=dist --prod

############
### prod ###
############

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]


#docker build -t almafrtnode:latest -f /home/jhonnatangil/src/almaviva/titulosfront/Dockerfile /home/jhonnatangil/src/almaviva/titulosfront
#docker run -it -p 80:80 --rm almafrtnode:latest
